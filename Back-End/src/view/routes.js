// ============================================================
// routes.js  —  centralizador de todas as rotas da API
// ============================================================
// Esse arquivo é importado pelo server.js com:
//   const routes = require("./view/routes");
//   app.use(routes);
//
// Aqui você registra TODAS as rotas do projeto.
// Cada vez que criar uma tabela nova, basta:
//   1. Criar o arquivo de routes dela (ex: novaRoutes.js)
//   2. Importar aqui com require
//   3. Registrar com routes.use(novaRoutes)
// ============================================================

const Routes = require("express");

// Importa os arquivos de rotas de cada entidade
const usersRoutes      = require("./usersRoutes");
const esportesRoutes   = require("./esportesRoutes");
const peneirasRoutes   = require("./peneirasRoutes");
const inscricoesRoutes = require("./inscricoesRoutes");

const routes = Routes();

// Registra cada grupo de rotas no Express
// routes.use() é o que "ativa" as rotas para a aplicação
routes.use(usersRoutes);
routes.use(esportesRoutes);
routes.use(peneirasRoutes);
routes.use(inscricoesRoutes);

// Rota de teste — útil para verificar se o servidor está no ar
// Acesse: GET http://localhost:3600/test
routes.get("/test", (req, res) => {
  res.status(200).json({ message: "Servidor rodando!" });
});

module.exports = routes;