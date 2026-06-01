// ============================================================
// usersRoutes.js  —  rotas HTTP para "users"
// ============================================================
// A Route é a camada mais externa da API.
// Responsabilidade dela:
//   1. Definir qual URL + método HTTP aciona qual função
//   2. Chamar o Controller passando req e res
//   3. Enviar a resposta HTTP ao cliente (res.status().json())
//
// Fluxo completo:
//   Cliente → Route → Controller → Model → Banco de dados
//                ←           ←         ←
// ============================================================

const Routes = require("express");
const myController = require("../controller/usersControllers");

const routes = Routes();

// EndPointName() retorna "users", então endPoint = "/users"
// Centralizar assim evita escrever "/users" em todo lugar
const endPoint = `/${myController.EndPointName()}`;

// ── GET /users ───────────────────────────────────────────────
// Retorna todos os usuários cadastrados
routes.get(endPoint, async (req, res) => {
  const responseData = await myController.Get(req, res);
  res.status(200).json(responseData);
});

// ── GET /users/:id ──────────────────────────────────────────
// Retorna um usuário específico pelo id
// Exemplo: GET /users/3
// O :id é um parâmetro dinâmico — o Express coloca em req.params.id
routes.get(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.GetById(req, res);
  res.status(200).json(responseData);
});

// ── POST /users ──────────────────────────────────────────────
// Cria um novo usuário
// O body da requisição deve vir em JSON
routes.post(endPoint, async (req, res) => {
  const responseData = await myController.Post(req, res);
  res.status(201).json(responseData); // 201 = Created
});

// ── PUT /users/:id ───────────────────────────────────────────
// Atualiza um usuário existente
// Exemplo: PUT /users/3  com body { "cidade": "São Paulo" }
routes.put(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Put(req, res);
  res.status(200).json(responseData);
});

// ── DELETE /users/:id ────────────────────────────────────────
// Remove um usuário pelo id
// Exemplo: DELETE /users/3
routes.delete(`${endPoint}/:id`, async (req, res) => {
  const responseData = await myController.Delete(req, res);
  res.status(200).json(responseData);
});

module.exports = routes;