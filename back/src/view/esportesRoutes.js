// ============================================================
// esportesRoutes.js  —  rotas HTTP para "esportes"
// ============================================================
// Mesma estrutura das usersRoutes.
// Rotas disponíveis:
//   GET    /esportes        → lista todos
//   GET    /esportes/:id    → busca um pelo id
//   POST   /esportes        → cria novo
//   PUT    /esportes/:id    → atualiza existente
//   DELETE /esportes/:id    → remove
// ============================================================

const Routes = require("express");
const myController = require("../controller/esportesControllers");

const routes = Routes();

const endPoint = `/${myController.EndPointName()}`; // "/esportes"

routes.get(endPoint, async (req, res) => {
  const responseData = await myController.Get(req, res);
  res.status(200).json(responseData);
});

routes.get(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.GetById(req, res);
  res.status(200).json(responseData);
});

routes.post(endPoint, async (req, res) => {
  const responseData = await myController.Post(req, res);
  res.status(201).json(responseData);
});

routes.put(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Put(req, res);
  res.status(200).json(responseData);
});

routes.delete(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Delete(req, res);
  res.status(200).json(responseData);
});

module.exports = routes;
