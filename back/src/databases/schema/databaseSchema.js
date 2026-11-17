import schemaData from './schema.json' with { type: 'json' };

const TYPE_MAP = {
    sqlite: {
        int: "INTEGER",
        float: "REAL",
        datetime: "TEXT",
        date: "TEXT",
        string: "TEXT",
        text: "TEXT",
        boolean: "INTEGER",
        default: "DEFAULT",
        defaultDatetime: "CURRENT_TIMESTAMP",
        autoIncrement: "AUTOINCREMENT",
        primaryKey: "PRIMARY KEY",
        unique: "UNIQUE",
        foreignKey: "FOREIGN KEY",
        references: "REFERENCES"
    },
    mysql: {
        int: "INT",
        float: "DOUBLE",
        datetime: "DATETIME",
        date: "DATE",
        string: "VARCHAR",
        text: "TEXT",
        boolean: "BOOLEAN",
        size: "100",
        default: "DEFAULT",
        defaultDatetime: "CURRENT_TIMESTAMP",
        autoIncrement: "AUTO_INCREMENT",
        primaryKey: "PRIMARY KEY",
        unique: "UNIQUE",
        foreignKey: "FOREIGN KEY",
        references: "REFERENCES"
    },
    sqlserver: {
        int: "INT",
        float: "FLOAT",
        datetime: "DATETIME2",
        date: "DATE",
        string: "VARCHAR",
        text: "VARCHAR(MAX)",
        boolean: "BIT",
        size: "100",
        default: "DEFAULT",
        defaultDatetime: "GETDATE()",
        autoIncrement: "IDENTITY(1,1)",
        primaryKey: "PRIMARY KEY",
        unique: "UNIQUE",
        foreignKey: "FOREIGN KEY",
        references: "REFERENCES"
    }
};

export class DatabaseSchema {
    /**
     * Ordena as tabelas topologicamente (Algoritmo de Kahn) para que
     * tabelas pai sejam criadas antes das filhas.
     */
    static sortTablesByDependency(tables) {
        const tableNames = Object.keys(tables);
        const inDegree = new Map();
        const dependents = new Map();

        // Inicializa estruturas do grafo
        for (const table of tableNames) {
            inDegree.set(table, 0);
            dependents.set(table, new Set());
        }

        // Mapeia arestas: tabelaPai -> tabelaFilha
        for (const [tableName, tableConfig] of Object.entries(tables)) {
            for (const [colName, colConfig] of Object.entries(tableConfig.columns)) {
                const isFk = colConfig.foreignKey === true || colConfig.foreignkey === true;
                if (!isFk) continue;

                const parentTable = colConfig.references;
                if (!parentTable) {
                    throw new Error(`[ORM] Coluna '${tableName}.${colName}' marcada como FK, mas sem 'references' definido.`);
                }

                if (!tables[parentTable]) {
                    throw new Error(`[ORM] Tabela '${tableName}.${colName}' referencia '${parentTable}', que não existe no schema.json.`);
                }

                // Ignora auto-relacionamento (ex: categorias.parent_id -> categorias.id)
                if (parentTable === tableName) continue;

                // Evita contar duas vezes se houver múltiplas FKs para a mesma tabela pai
                if (!dependents.get(parentTable).has(tableName)) {
                    dependents.get(parentTable).add(tableName);
                    inDegree.set(tableName, inDegree.get(tableName) + 1);
                }
            }
        }

        // Fila inicial com tabelas sem dependências
        const queue = [];
        for (const [table, degree] of inDegree.entries()) {
            if (degree === 0) {
                queue.push(table);
            }
        }

        const sorted = [];
        while (queue.length > 0) {
            const current = queue.shift();
            sorted.push(current);

            for (const childTable of dependents.get(current)) {
                const newDegree = inDegree.get(childTable) - 1;
                inDegree.set(childTable, newDegree);
                if (newDegree === 0) {
                    queue.push(childTable);
                }
            }
        }

        // Se sobraram tabelas fora da lista ordenada, há ciclo de dependência
        if (sorted.length !== tableNames.length) {
            const unresolved = tableNames.filter(t => !sorted.includes(t));
            throw new Error(
                `[ORM] Dependência circular detectada entre as tabelas: ${unresolved.join(', ')}. ` +
                `Remova uma das FKs na criação ou aplique via ALTER TABLE.`
            );
        }

        return sorted;
    }

    static async initialize(dbStrategy, forceRefresh = false) {
        const dialect = dbStrategy.type;

        if (!dialect || !TYPE_MAP[dialect]) {
            throw new Error(`[ORM] Dialeto '${dialect}' não suportado pelo Schema.`);
        }

        console.log(`[ORM] Verificando estrutura para: ${dialect.toUpperCase()}...`);

        const dbName = dbStrategy.databaseName;
        const map = TYPE_MAP[dialect];
        const queries = [];

        // Ordena tabelas: pais primeiro, filhas depois
        const orderedTables = this.sortTablesByDependency(schemaData.tables);
        console.log(`[ORM] Ordem de criação definida: ${orderedTables.join(' -> ')}`);

        // 1. Preparação do ambiente / banco
        if (dialect === 'sqlite') {
            queries.push(`PRAGMA foreign_keys = ON;`);
        }

        if (forceRefresh && dbName) {
            if (dialect === 'mysql') {
                queries.push(`SET FOREIGN_KEY_CHECKS = 0;`);
            } else if (dialect === 'sqlserver') {
                queries.push(`USE master;`);
                queries.push(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'${dbName}') CREATE DATABASE [${dbName}];`);
                queries.push(`USE [${dbName}];`);
            }
        }

        // 2. DROP na ordem inversa (filhas primeiro, pais por último)
        if (forceRefresh) {
            const dropOrder = [...orderedTables].reverse();
            for (const tableName of dropOrder) {
                queries.push(`DROP TABLE IF EXISTS ${tableName};`);
            }
        }

        // 3. CREATE na ordem topológica (pais primeiro, filhas depois)
        for (const tableName of orderedTables) {
            const tableConfig = schemaData.tables[tableName];
            const columnDefinitions = [];
            const tableConstraints = [];

            for (const [columnName, colConfig] of Object.entries(tableConfig.columns)) {
                const sqlType = map[colConfig.type];
                if (!sqlType) {
                    throw new Error(`[ORM] Tipo '${colConfig.type}' não mapeado para o dialeto '${dialect}'.`);
                }

                let def = `${columnName} ${sqlType}`;

                if (colConfig.type === 'string' && map.size) {
                    const colSize = colConfig.size || map.size;
                    def += `(${colSize})`;
                }

                if (colConfig.primaryKey) def += ` ${map.primaryKey}`;
                if (colConfig.autoIncrement) def += ` ${map.autoIncrement}`;
                if (colConfig.unique) def += ` ${map.unique}`;

                if (colConfig.nullable === false && !colConfig.primaryKey) {
                    def += " NOT NULL";
                } else if (colConfig.nullable === true) {
                    def += " NULL";
                }

                if (map.default && colConfig.default !== undefined && colConfig.default !== null) {
                    switch (colConfig.type) {
                        case "datetime":
                        case "date":
                            def += ` DEFAULT (${map.defaultDatetime})`;
                            break;
                        case "boolean":
                            def += ` DEFAULT ${colConfig.default === true ? 1 : 0}`;
                            break;
                        case "string":
                        case "text":
                            def += ` DEFAULT '${colConfig.default}'`;
                            break;
                        case "int":
                        case "float":
                            def += ` DEFAULT ${colConfig.default}`;
                            break;
                        default:
                            def += ` DEFAULT (${colConfig.default})`;
                            break;
                    }
                }

                columnDefinitions.push(def);

                const isFk = colConfig.foreignKey === true || colConfig.foreignkey === true;
                if (isFk) {
                    const refTable = colConfig.references;
                    const refColumn = colConfig.idReference || colConfig.idreference || 'id';

                    const constraintName = `fk_${tableName}_${columnName}`;
                    let fkSql = `CONSTRAINT ${constraintName} ${map.foreignKey} (${columnName}) ${map.references} ${refTable}(${refColumn})`;

                    if (colConfig.onDelete) {
                        fkSql += ` ON DELETE ${colConfig.onDelete.toUpperCase()}`;
                    }
                    if (colConfig.onUpdate) {
                        fkSql += ` ON UPDATE ${colConfig.onUpdate.toUpperCase()}`;
                    }

                    tableConstraints.push(fkSql);
                }
            }

            const tableBody = [...columnDefinitions, ...tableConstraints].join(',\n    ');

            let createSql = '';
            if (dialect === 'sqlserver') {
                createSql = `IF OBJECT_ID(N'${tableName}', N'U') IS NULL\nBEGIN\nCREATE TABLE ${tableName} (\n    ${tableBody}\n);\nEND;`;
            } else {
                createSql = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    ${tableBody}\n);`;
            }

            queries.push(createSql);
        }

        // Reativa verificação de FKs no MySQL
        if (forceRefresh && dialect === 'mysql') {
            queries.push(`SET FOREIGN_KEY_CHECKS = 1;`);
        }

        // 4. Log e Execução
        for (const query of queries) {
            console.log(query);
            await dbStrategy.execute(query);
        }

        console.log(`[ORM] Tabelas sincronizadas com sucesso no ${dialect.toUpperCase()}.`);
    }
}