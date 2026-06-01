// ============================================================
// inscricoesRoutes.js  —  rotas HTTP para "inscricoes"
// ============================================================
// Rotas disponíveis:
//   GET    /inscricoes               → lista todas
//   GET    /inscricoes/:id           → busca uma pelo id_inscricao
//   GET    /inscricoes/user/:id_user → todas inscrições de um atleta  ← ROTA EXTRA
//   POST   /inscricoes               → inscreve atleta em peneira
//   PUT    /inscricoes/:id           → atualiza inscrição
//   DELETE /inscricoes/:id           → cancela inscrição
//
// ATENÇÃO na ordem das rotas:
//   /inscricoes/user/:id_user  DEVE vir ANTES de /inscricoes/:id
//   Se vier depois, o Express vai interpretar "user" como um id
//   e chamar GetById("user") em vez de GetByUser — bug difícil de achar!
// ============================================================

const Routes = require("express");
const myController = require("../controller/inscricoesControllers");

const routes = Routes();

const endPoint = `/${myController.EndPointName()}`; // "/inscricoes"

// ── GET /inscricoes ──────────────────────────────────────────
routes.get(endPoint, async (req, res) => {
  const responseData = await myController.Get(req, res);
  res.status(200).json(responseData);
});

// ── GET /inscricoes/user/:id_user ────────────────────────────
// IMPORTANTE: essa rota vem ANTES de /:id por causa da ordem de leitura do Express
// Exemplo: GET /inscricoes/user/5  →  todas inscrições do atleta 5
routes.get(`${endPoint}/user/:id_user`, async (req, res) => {
  const responseData = await myController.GetByUser(req, res);
  res.status(200).json(responseData);
});

// ── GET /inscricoes/:id ──────────────────────────────────────
// Exemplo: GET /inscricoes/3
routes.get(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.GetById(req, res);
  res.status(200).json(responseData);
});

// ── POST /inscricoes ─────────────────────────────────────────
routes.post(endPoint, async (req, res) => {
  const responseData = await myController.Post(req, res);
  res.status(201).json(responseData);
});

// ── PUT /inscricoes/:id ──────────────────────────────────────
routes.put(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Put(req, res);
  res.status(200).json(responseData);
});

// ── DELETE /inscricoes/:id ───────────────────────────────────
routes.delete(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Delete(req, res);
  res.status(200).json(responseData);
});

module.exports = routes;
