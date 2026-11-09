const Routes = require("express");
const myController = require("../controller/instituicoesControllers");
const routes = Routes();
const endPoint = `/${myController.EndPointName()}`;

// GET /instituicoes
routes.get(endPoint, async (req, res) => {
  res.status(200).json(await myController.Get(req, res));
});

// GET /instituicoes/:id
routes.get(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.GetById(req, res));
});

// POST /instituicoes
routes.post(endPoint, async (req, res) => {
  res.status(201).json(await myController.Post(req, res));
});

// PUT /instituicoes/:id
routes.put(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Put(req, res));
});

// DELETE /instituicoes/:id
routes.delete(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Delete(req, res));
});

module.exports = routes;
