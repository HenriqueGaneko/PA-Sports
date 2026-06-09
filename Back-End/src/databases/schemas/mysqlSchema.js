class DatabaseSchemaMysql {
    static async initialize(dbStrategy) {
        console.log("Verificando estrutura do banco de dados...");
        
        const queries = [
            // Tabela de atletas (antes: users sem tipo_usuario)
            `CREATE TABLE IF NOT EXISTS atletas (
                id_atleta INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                senha VARCHAR(255),
                data_nascimento DATE,
                telefone VARCHAR(20),
                cidade VARCHAR(100),
                esporte VARCHAR(50)
            )`,

            // Tabela de esportes
            `CREATE TABLE IF NOT EXISTS esportes (
                id_esporte INT PRIMARY KEY AUTO_INCREMENT,
                nome_esporte VARCHAR(50)
            )`,

            // Nova tabela de instituições (5ª tabela)
            `CREATE TABLE IF NOT EXISTS instituicoes (
                id_instituicao INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                senha VARCHAR(255),
                telefone VARCHAR(20),
                cidade VARCHAR(100)
            )`,

            // Peneiras agora ligadas a instituicoes, não a users
            `CREATE TABLE IF NOT EXISTS peneiras (
                id_peneira INT PRIMARY KEY AUTO_INCREMENT,
                titulo VARCHAR(100),
                descricao TEXT,
                data_peneira DATE,
                localizacao VARCHAR(150),
                vagas INT,
                id_esporte INT,
                id_instituicao INT,
                FOREIGN KEY (id_esporte) REFERENCES esportes(id_esporte),
                FOREIGN KEY (id_instituicao) REFERENCES instituicoes(id_instituicao)
            )`,

            // Inscrições agora ligadas a atletas
            `CREATE TABLE IF NOT EXISTS inscricoes (
                id_inscricao INT PRIMARY KEY AUTO_INCREMENT,
                id_atleta INT,
                id_peneira INT,
                data_inscricao DATE,
                FOREIGN KEY (id_atleta) REFERENCES atletas(id_atleta),
                FOREIGN KEY (id_peneira) REFERENCES peneiras(id_peneira),
                UNIQUE (id_atleta, id_peneira)
            )`
        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }

        // Inserts iniciais de esportes (só se não existirem)
        await dbStrategy.execute(`
            INSERT IGNORE INTO esportes (id_esporte, nome_esporte) VALUES
            (1, 'Futebol'), (2, 'Vôlei'), (3, 'Basquete')
        `);
    }
}

module.exports = { DatabaseSchemaMysql };
