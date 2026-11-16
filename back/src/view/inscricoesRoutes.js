const Routes = require("express");
const myController = require("../controller/inscricoesControllers");
const routes = Routes();
const endPoint = `/${myController.EndPointName()}`; // "/inscricoes"

routes.get(endPoint, async (req, res) => {
  res.status(200).json(await myController.Get(req, res));
});

// IMPORTANTE: /atleta/:id_atleta antes de /:id para o Express não confundir
routes.get(`${endPoint}/atleta/:id_atleta`, async (req, res) => {
  res.status(200).json(await myController.GetByAtleta(req, res));
});

routes.get(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.GetById(req, res));
});

routes.post(endPoint, async (req, res) => {
  res.status(201).json(await myController.Post(req, res));
});

routes.put(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Put(req, res));
});

routes.delete(`${endPoint}/:id`, async (req, res) => {
  res.status(200).json(await myController.Delete(req, res));
});

module.exports = routes;
