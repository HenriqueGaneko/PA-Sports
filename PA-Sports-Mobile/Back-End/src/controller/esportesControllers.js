// ============================================================
// esportesControllers.js  —  camada de controle para "esportes"
// ============================================================
// Mesma estrutura do usersControllers.
// Só muda o Model importado e o que cada função precisa da requisição.
// ============================================================

const myModel = require("../model/esportesModel");

async function Get(req, res) {
  const responseData = await myModel.Get();
  return responseData;
}

async function GetById(req, res) {
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

// POST: criar um novo esporte
// Body esperado: { "nome_esporte": "Futebol" }
async function Post(req, res) {
  const payload = req.body;
  const responseData = await myModel.Post(payload);
  return responseData;
}

// PUT: atualizar um esporte
// URL: PUT /esportes/2
// Body: { "nome_esporte": "Voleibol" }
async function Put(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const responseData = await myModel.Put(payload, id);
  return responseData;
}

// DELETE: remover um esporte
// URL: DELETE /esportes/2
// Atenção: vai falhar se houver peneiras vinculadas a esse esporte (FK)
async function Delete(req, res) {
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

function EndPointName() {
  return myModel.EndPointName();
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
