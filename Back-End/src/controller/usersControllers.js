// ============================================================
// usersControllers.js  —  camada de controle para "users"
// ============================================================
// O Controller fica ENTRE a Route e o Model.
// Responsabilidade dele:
//   1. Pegar os dados da requisição (req.body, req.params)
//   2. VALIDAR esses dados antes de repassar ao Model
//   3. Chamar o Model só com dados já validados e "limpos"
//   4. Devolver o resultado para a Route
//
// O Controller NÃO fala com o banco — isso é papel do Model.
// O Controller NÃO envia a resposta HTTP — isso é papel da Route.
// ============================================================
 
// Importa o Model — é ele quem executa o SQL no banco
const myModel = require("../model/usersModel");
 
// Importa as validações — nunca confie só no que o front-end validou
const { validarCadastroUser } = require("../utils/validators");
 
// ── GET: buscar todos os usuários ───────────────────────────
async function Get(req, res) {
  const responseData = await myModel.Get();
  return responseData;
}
 
// ── GET BY ID: buscar um usuário pelo id ────────────────────
async function GetById(req, res) {
  const id = req.params.id;
  const responseData = await myModel.GetById(id);
  return responseData;
}
 
// ── POST: criar um novo usuário (cadastro) ──────────────────
// Aqui é onde a maior parte da segurança do cadastro vive:
//   1. Validamos cada campo (formato, tamanho, obrigatoriedade)
//   2. Montamos um payload "seguro" só com os campos permitidos
//      (isso evita que alguém injete tipo_usuario, id_user, etc.
//       mandando campos extras no corpo da requisição)
//   3. Só então chamamos o Model
async function Post(req, res) {
  const payload = req.body;
 
  if (!payload) {
    return { message: "Error", data: "Dados não informados!" };
  }
 
  const erros = validarCadastroUser(payload);
  if (erros.length > 0) {
    return { message: "Error", data: erros };
  }
 
  // Whitelist: cadastro público só pode definir estes campos.
  // "tipo_usuario" é sempre forçado para "atleta" aqui — se um dia
  // vocês quiserem permitir cadastro de "instituicao", isso deve
  // vir de uma rota separada e autenticada, nunca de um campo livre
  // no body do cadastro público.
  const payloadSeguro = {
    nome: payload.nome.trim(),
    email: payload.email.trim().toLowerCase(),
    senha: payload.senha,
    telefone: payload.telefone.replace(/\D/g, ""),
    cidade: payload.cidade.trim(),
    tipo_usuario: "atleta",
  };
 
  const responseData = await myModel.Post(payloadSeguro);
  return responseData;
}
 
// ── PUT: atualizar um usuário existente ─────────────────────
// Aqui também vale aplicar validação nos campos que vierem,
// mas só validamos os que existirem no payload (update parcial).
async function Put(req, res) {
  const id = req.params.id;
  const payload = req.body;
 
  if (!payload) {
    return { message: "Error", data: "Dados não informados!" };
  }
 
  // Bloqueia explicitamente campos sensíveis que não devem
  // ser alterados por essa rota (ex.: tipo_usuario, id_user)
  const { tipo_usuario, id_user, ...payloadPermitido } = payload;
 
  const responseData = await myModel.Put(payloadPermitido, id);
  return responseData;
}
 
// ── DELETE: remover um usuário ──────────────────────────────
async function Delete(req, res) {
  const id = req.params.id;
  const responseData = await myModel.Delete(id);
  return responseData;
}
 
// ── EndPointName: repassa o nome da tabela para a Route ─────
function EndPointName() {
  return myModel.EndPointName();
}
 
module.exports = { Get, GetById, Post, Put, Delete, EndPointName };