// ============================================================
// mysqlSchema.js  —  criação automática das tabelas no MySQL
// ============================================================
// Esse arquivo é chamado uma vez quando o servidor inicia.
// O CREATE TABLE IF NOT EXISTS garante que ele só cria
// a tabela se ela ainda não existir — sem apagar dados.
//
// A ORDEM das queries importa:
// tabelas com FK devem vir DEPOIS das tabelas que elas referenciam.
//   users      → sem dependências, vem primeiro
//   esportes   → sem dependências, vem segundo
//   peneiras   → depende de users e esportes
//   inscricoes → depende de users e peneiras
// ============================================================

class DatabaseSchemaMysql {
  static async initialize(dbStrategy) {
    console.log("Verificando estrutura do banco de dados...");

    const queries = [

      // 1. Tabela users — sem FK, criada primeiro
      `CREATE TABLE IF NOT EXISTS users (
        id_user      INT          PRIMARY KEY AUTO_INCREMENT,
        nome         VARCHAR(100) NOT NULL,
        email        VARCHAR(100) NOT NULL UNIQUE,
        senha        VARCHAR(255) NOT NULL,
        tipo_usuario VARCHAR(20),
        telefone     VARCHAR(20),
        cidade       VARCHAR(100)
      )`,

      // 2. Tabela esportes — sem FK, criada junto com users
      `CREATE TABLE IF NOT EXISTS esportes (
        id_esporte   INT         PRIMARY KEY AUTO_INCREMENT,
        nome_esporte VARCHAR(50) NOT NULL
      )`,

      // 3. Tabela peneiras — depende de users e esportes
      `CREATE TABLE IF NOT EXISTS peneiras (
        id_peneira   INT          PRIMARY KEY AUTO_INCREMENT,
        titulo       VARCHAR(100) NOT NULL,
        descricao    TEXT,
        data_peneira DATE,
        localizacao  VARCHAR(150),
        vagas        INT,
        id_esporte   INT,
        id_user      INT,
        FOREIGN KEY (id_esporte) REFERENCES esportes(id_esporte),
        FOREIGN KEY (id_user)    REFERENCES users(id_user)
      )`,

      // 4. Tabela inscricoes — depende de users e peneiras
      `CREATE TABLE IF NOT EXISTS inscricoes (
        id_inscricao INT  PRIMARY KEY AUTO_INCREMENT,
        id_user      INT  NOT NULL,
        id_peneira   INT  NOT NULL,
        data_inscricao DATE,
        FOREIGN KEY (id_user)    REFERENCES users(id_user),
        FOREIGN KEY (id_peneira) REFERENCES peneiras(id_peneira),
        UNIQUE (id_user, id_peneira)
      )`,

    ];

    // Executa cada query em sequência (await dentro do for garante a ordem)
    for (const query of queries) {
      await dbStrategy.execute(query);
    }

    console.log("Tabelas verificadas com sucesso!");
  }
}

module.exports = { DatabaseSchemaMysql };
