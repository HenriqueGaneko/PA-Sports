// ============================================================
// peneirasControllers.js  —  camada de controle para "peneiras"
// ============================================================

const myModel = require("../model/peneirasModel");

async function Get(req, res) {
  const responseData = await myModel.Get();
  return responseData;
}

async function GetById(req, res) {
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

// POST: criar uma nova peneira
// Body esperado:
// {
//   "titulo": "Peneira Sub-17",
//   "descricao": "Seleção de novos atletas",
//   "data_peneira": "2026-06-10",
//   "localizacao": "Vila Belmiro",
//   "vagas": 50,
//   "id_esporte": 1,
//   "id_user": 3
// }
async function Post(req, res) {
  const payload = req.body;
  const responseData = await myModel.Post(payload);
  return responseData;
}

// PUT: atualizar uma peneira
// URL: PUT /peneiras/1
// Body: qualquer campo que quiser alterar, ex.: { "vagas": 30 }
async function Put(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const responseData = await myModel.Put(payload, id);
  return responseData;
}

// DELETE: remover uma peneira
// URL: DELETE /peneiras/1
// Atenção: vai falhar se houver inscrições vinculadas (FK)
async function Delete(req, res) {
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

function EndPointName() {
  return myModel.EndPointName();
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
