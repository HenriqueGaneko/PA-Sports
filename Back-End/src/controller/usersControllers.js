// ============================================================
// usersControllers.js  —  camada de controle para "users"
// ============================================================
// O Controller fica ENTRE a Route e o Model.
// Responsabilidade dele:
//   1. Pegar os dados da requisição (req.body, req.params)
//   2. Chamar o Model passando esses dados
//   3. Devolver o resultado para a Route
//
// O Controller NÃO fala com o banco — isso é papel do Model.
// O Controller NÃO envia a resposta HTTP — isso é papel da Route.
// Ele só repassa dados entre as duas camadas.
// ============================================================

// Importa o Model — é ele quem executa o SQL no banco
const myModel = require("../model/usersModel");

// ── GET: buscar todos os usuários ───────────────────────────
// req → objeto da requisição (não usamos nada dele aqui)
// res → objeto de resposta (não usamos aqui, a Route cuida disso)
async function Get(req, res) {
  const responseData = await myModel.Get();
  return responseData;
}

// ── GET BY ID: buscar um usuário pelo id ────────────────────
// req.params.id → vem da URL  ex.: GET /users/3  →  id = "3"
async function GetById(req, res) {
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}

// ── POST: criar um novo usuário ─────────────────────────────
// req.body → vem do corpo da requisição em formato JSON
// Exemplo de body:
// {
//   "nome": "João",
//   "email": "joao@email.com",
//   "senha": "123456",
//   "tipo_usuario": "atleta",
//   "telefone": "13999999999",
//   "cidade": "Santos"
// }
async function Post(req, res) {
  const payload = req.body; // captura o body completo
  const responseData = await myModel.Post(payload);
  return responseData;
}

// ── PUT: atualizar um usuário existente ─────────────────────
// Combina req.params.id (qual registro) + req.body (o que mudar)
// Exemplo: PUT /users/3  com body { "cidade": "São Paulo" }
async function Put(req, res) {
  const id = req.params.id;
  const payload = req.body;
  const responseData = await myModel.Put(payload, id);
  return responseData;
}

// ── DELETE: remover um usuário ──────────────────────────────
// Só precisa do id que vem pela URL: DELETE /users/3
async function Delete(req, res) {
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}

// ── EndPointName: repassa o nome da tabela para a Route ─────
// A Route usa isso para montar o caminho automaticamente
function EndPointName() {
  return myModel.EndPointName();
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };