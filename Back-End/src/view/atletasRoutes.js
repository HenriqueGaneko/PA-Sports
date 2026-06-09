const Routes = require("express");
const myController = require("../controller/atletasControllers");
const routes = Routes();
const endPoint = `/${myController.EndPointName()}`;

// GET /atletas
routes.get(endPoint, async (req, res) => {
  res.status(200).json(await myController.Get(req, res));
});

// GET /atletas/:id
routes.get(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.GetById(req, res));
});

// POST /atletas/login  — verifica email+senha
routes.post(`${endPoint}/login`, async (req, res) => {
  res.status(200).json(await myController.GetByEmailSenha(req, res));
});

// POST /atletas  — cadastra novo atleta
routes.post(endPoint, async (req, res) => {
  res.status(201).json(await myController.Post(req, res));
});

// PUT /atletas/:id
routes.put(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Put(req, res));
});

// DELETE /atletas/:id
routes.delete(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Delete(req, res));
});

module.exports = routes;
