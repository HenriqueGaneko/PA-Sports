const Routes = require("express");

const atletasRoutes      = require("./atletasRoutes");
const instituicoesRoutes = require("./instituicoesRoutes");
const esportesRoutes     = require("./esportesRoutes");
const peneirasRoutes     = require("./peneirasRoutes");
const inscricoesRoutes   = require("./inscricoesRoutes");

const routes = Routes();

routes.use(atletasRoutes);
routes.use(instituicoesRoutes);
routes.use(esportesRoutes);
routes.use(peneirasRoutes);
routes.use(inscricoesRoutes);

routes.get("/test", (req, res) => {
  res.status(200).json({ message: "Servidor rodando!" });
});

module.exports = routes;
