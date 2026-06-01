// ============================================================
// inscricoesControllers.js  —  camada de controle para "inscricoes"
// ============================================================
// Este controller tem uma função extra: GetByUser
// Ela permite buscar todas as peneiras de um atleta específico
// usando a rota GET /inscricoes/user/:id_user
// ============================================================

const myModel = require("../model/inscricoesModel");

async function Get(req, res) {
  const responseData = await myModel.Get();
  return responseData;
}

async function GetById(req, res) {
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

// ── GetByUser: inscrições de um atleta específico ───────────
// Diferente do GetById (que busca por id_inscricao),
// essa função busca TODAS as inscrições de um id_user
// URL: GET /inscricoes/user/5  →  id_user = "5"
async function GetByUser(req, res) {
  const id_user = req.params.id_user;
  const responseData = await myModel.GetByUser(id_user);
  return responseData;
}

// POST: inscrever um atleta em uma peneira
// Body esperado:
// {
//   "id_user": 1,
//   "id_peneira": 2,
//   "data_inscricao": "2026-05-26"
// }
async function Post(req, res) {
  const payload = req.body;
  const responseData = await myModel.Post(payload);
  return responseData;
}

// PUT: atualizar uma inscrição
// URL: PUT /inscricoes/3
// Body: { "data_inscricao": "2026-06-01" }
async function Put(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const responseData = await myModel.Put(payload, id);
  return responseData;
}

// DELETE: cancelar uma inscrição
// URL: DELETE /inscricoes/3
async function Delete(req, res) {
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

function EndPointName() {
  return myModel.EndPointName();
}

module.exports = { Get, GetById, GetByUser, Post, Put, Delete, EndPointName };
