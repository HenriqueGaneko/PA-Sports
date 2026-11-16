
class DatabaseSchemaSqlite {
    static async initialize(dbStrategy) {
        console.log("Verificando estrutura do banco de dados...");
        
        const queries = [
            `CREATE TABLE users (
                id_user INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                senha VARCHAR(255),
                tipo_usuario VARCHAR(20), -- atleta ou instituicao
                telefone VARCHAR(20),
                cidade VARCHAR(100)
            )`,
            `CREATE TABLE esportes (
                id_esporte INT PRIMARY KEY AUTO_INCREMENT,
                nome_esporte VARCHAR(50)
            )`,
            `CREATE TABLE peneiras (
                id_peneira INT PRIMARY KEY AUTO_INCREMENT,
                titulo VARCHAR(100),
                descricao TEXT,
                data_peneira DATE,
                localizacao VARCHAR(150),
                vagas INT,

                id_esporte INT,
                id_user INT,

                FOREIGN KEY (id_esporte) REFERENCES esportes(id_esporte),
                FOREIGN KEY (id_user) REFERENCES users(id_user)
            )`,
            `CREATE TABLE inscricoes (
                id_inscricao INT PRIMARY KEY AUTO_INCREMENT,

                id_user INT,
                id_peneira INT,

                data_inscricao DATE,

                FOREIGN KEY (id_user) REFERENCES users(id_user),
                FOREIGN KEY (id_peneira) REFERENCES peneiras(id_peneira),

                UNIQUE (id_user, id_peneira)
            )`,
        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = {DatabaseSchemaSqlite }