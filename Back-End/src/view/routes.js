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

routes.get("/estatisticas", async (req, res) => {
  try {
    const { db } = require("../databases/DatabaseContext");
    const [a] = await db.execute("SELECT COUNT(*) AS total FROM atletas");
    res.json({ message: "Success", data: { atletas: Number(a[0]?.total || 0) } });
  } catch (error) { res.status(500).json({ message: "Error", data: "Erro ao consultar estatísticas" }); }
});

routes.get("/test", (req, res) => {
  res.status(200).json({ message: "Servidor rodando!" });
});

module.exports = routes;
