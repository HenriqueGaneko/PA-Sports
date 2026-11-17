import schemaData from '../schema/schema.json' with { type: 'json' };
import seedData from './seed.json' with { type: 'json' };
import { DatabaseSchema } from '../schema/databaseSchema.js';

export class DatabaseSeeder {
    /**
     * Adapta os placeholders de parâmetros preparados conforme o dialeto.
     */
    static formatPlaceholders(dialect, count) {
        if (dialect === 'sqlserver') {
            return Array.from({ length: count }, (_, i) => `@p${i}`).join(', ');
        }
        return Array(count).fill('?').join(', ');
    }

    /**
     * Normaliza valores JS para o formato aceito pelo driver de cada banco.
     */
    static normalizeValue(dialect, value) {
        if (value === undefined) return null;
        if (typeof value === 'boolean') {
            return dialect === 'mysql' ? value : (value ? 1 : 0);
        }
        return value;
    }

    /**
     * Verifica se o seed informa explicitamente uma coluna autoIncrement
     * (necessário para habilitar IDENTITY_INSERT no SQL Server).
     */
    static hasExplicitAutoIncrement(tableConfig, records) {
        const autoIncCols = Object.entries(tableConfig.columns)
            .filter(([, cfg]) => cfg.autoIncrement === true)
            .map(([colName]) => colName);

        if (autoIncCols.length === 0) return false;

        return records.some(record =>
            autoIncCols.some(col => record[col] !== undefined && record[col] !== null)
        );
    }

    /**
     * Verifica se a tabela já contém dados para evitar duplicação em restarts.
     */
    static async isTableEmpty(dbStrategy, tableName) {
        const result = await dbStrategy.execute(`SELECT COUNT(*) AS total FROM ${tableName};`);
        // Trata diferentes formatos de retorno dos drivers (sqlite, mysql2, mssql)
        const rows = Array.isArray(result) ? result : (result?.recordset || result?.rows || []);
        const total = rows[0]?.total ?? rows[0]?.['COUNT(*)'] ?? 0;
        return Number(total) === 0;
    }

    static async run(dbStrategy, forceRefresh = false) {
        const dialect = dbStrategy.type;
        console.log(`[SEED] Iniciando população de dados para ${dialect.toUpperCase()}...`);

        // Reutiliza a ordenação topológica do Schema (pais primeiro, filhas depois)
        const orderedTables = DatabaseSchema.sortTablesByDependency(schemaData.tables);

        for (const tableName of orderedTables) {
            const records = seedData[tableName];
            if (!records || records.length === 0) continue;

            // Se não for reset forçado, pula tabelas que já possuem registros
            if (!forceRefresh) {
                const empty = await this.isTableEmpty(dbStrategy, tableName);
                if (!empty) {
                    console.log(`[SEED] Tabela '${tableName}' já possui dados. Pulando...`);
                    continue;
                }
            }

            const tableConfig = schemaData.tables[tableName];
            const needsIdentityInsert =
                dialect === 'sqlserver' && this.hasExplicitAutoIncrement(tableConfig, records);

            if (needsIdentityInsert) {
                await dbStrategy.execute(`SET IDENTITY_INSERT ${tableName} ON;`);
            }

            try {
                for (const record of records) {
                    const columns = Object.keys(record);
                    const values = columns.map(col => this.normalizeValue(dialect, record[col]));
                    const placeholders = this.formatPlaceholders(dialect, columns.length);

                    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders});`;
                    await dbStrategy.execute(sql, values);
                }

                console.log(`[SEED] ${records.length} registro(s) inserido(s) em '${tableName}'.`);
            } finally {
                if (needsIdentityInsert) {
                    await dbStrategy.execute(`SET IDENTITY_INSERT ${tableName} OFF;`);
                }
            }
        }

        console.log(`[SEED] População inicial concluída com sucesso.`);
    }
}