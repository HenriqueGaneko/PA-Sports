import { createDatabaseIfNotExists, pool } from "./connections/connectionMysql.js";
import { getDbConnection } from "./connections/connectionSqllite.js";
import { MySQLStrategy, SQLiteStrategy } from "./DatabaseStrategy.js";
import { DatabaseSchema } from "./schema/databaseSchema.js";
import { DatabaseSeeder } from "./seed/databaseSeeder.js"

class DatabaseContext {
    constructor() {
        this.strategy = null;
    }

    async init() {
        // Centraliza a flag de reset (pode vir do .env se quiser)
        const resetarBanco = process.env.DB_RESET?.toLowerCase() === 'true';
        const db_name = process.env.DB_DATABASE?.toLowerCase() || 'apirest';
        const rodarSeed = process.env.DB_SEED?.toLowerCase() === 'true';

        //console.log( ` init- context: ${resetarBanco}`);

        if (process.env.DB_TYPE === 'sqlite') {
            const db = await getDbConnection(resetarBanco);
            
            // CORREÇÃO 1: Instanciar a estratégia correspondente
            this.strategy = new SQLiteStrategy(db);
            
            // GARANTIA: Define o tipo na estratégia para o Schema mapear corretamente
            this.strategy.type = 'sqlite';
            this.strategy.databaseName = db_name ;
            
        } else {

            // Garante que o banco MariaDB/MySQL existe
            await createDatabaseIfNotExists();
            this.strategy = new MySQLStrategy(pool);            
            // GARANTIA: Define o tipo na estratégia para o Schema mapear corretamente
            this.strategy.type = 'mysql';
            this.strategy.databaseName = db_name ;
         
        }
        // 1. Cria/atualiza estrutura na ordem topológica
        await DatabaseSchema.initialize(this.strategy, resetarBanco);
        
        // 2. Popula dados iniciais na mesma ordem topológica
        if (rodarSeed) {
            await DatabaseSeeder.run(this.strategy, resetarBanco);
        }
        //
        console.log(`Ambiente ${this.strategy.type.toUpperCase()} configurado com sucesso.`);
    }
  
    async execute(query, params) {
        if (!this.strategy) {
            throw new Error("Contexto de banco de dados não inicializado.");
        }
        return await this.strategy.execute(query, params);
    }
}

export const db = new DatabaseContext();
await db.init();