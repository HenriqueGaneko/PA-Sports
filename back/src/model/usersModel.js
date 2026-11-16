// ============================================================
// usersModel.js  —  camada de acesso ao banco para "users"
// ============================================================
// O Model é responsável SOMENTE por falar com o banco de dados.
// Ele recebe dados já validados/limpos do Controller.
// ============================================================

// 1. Importa a conexão com o banco
const { db } = require("../databases/DatabaseContext.js");

// 2. Funções auxiliares que montam o SQL dinamicamente
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets,
} = require("../utils/sqlcomandos.js");

// 3. bcryptjs para hash de senha — NUNCA armazenar senha em texto puro.
//    É "js" puro (sem binário nativo), então não precisa compilar nada.
//    Instale com: npm install bcryptjs
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

const tableName = "users";

// Campos que podem ser retornados com segurança para o cliente.
// "senha" (mesmo com hash) NUNCA deve ir na resposta.
const CAMPOS_PUBLICOS = "id_user, nome, email, tipo_usuario, telefone, cidade";

// ── GET: buscar todos os usuários ───────────────────────────
async function Get() {
  const sqlText = `SELECT ${CAMPOS_PUBLICOS} FROM ${tableName} ORDER BY id_user`;
  const [result, fields] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

// ── GET BY ID: buscar um único usuário pelo id ──────────────
async function GetById(id) {
  const sqlText = `SELECT ${CAMPOS_PUBLICOS} FROM ${tableName} WHERE id_user = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// ── POST: inserir um novo usuário ───────────────────────────
// payload já vem validado e "whitelisted" do Controller.
async function Post(payload) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  try {
    // Gera o hash da senha ANTES de montar o SQL.
    // O hash inclui o salt, então não precisamos guardar salt separado.
    const senhaHash = await bcrypt.hash(payload.senha, SALT_ROUNDS);
    const payloadParaSalvar = { ...payload, senha: senhaHash };

    extrair_dados(payloadParaSalvar);

    const local_fields = gerar_sqlFields();
    const local_params = gerar_sqlParams();
    const valuessql = valuesParams();

    const sqlText = `INSERT INTO ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;

    const [result, fields] = await db.execute(sqlText, valuessql);

    // Não devolvemos o hash da senha na resposta
    return { message: "Success", data: { id_user: result.insertId } };
  } catch (err) {
    // email é UNIQUE na tabela — trata esse erro com uma mensagem amigável
    // em vez de vazar detalhe interno do banco pro cliente
    const mensagem = String(err && err.message);
    if (mensagem.includes("UNIQUE") || err.code === "SQLITE_CONSTRAINT") {
      return { message: "Error", data: "Este email já está cadastrado." };
    }
    console.error("Erro ao criar usuário:", err);
    return { message: "Error", data: "Erro ao criar usuário." };
  }
}

// ── PUT: atualizar um usuário existente ─────────────────────
async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  try {
    // Se a senha estiver sendo atualizada, também precisa de hash
    const payloadParaSalvar = { ...payload };
    if (payloadParaSalvar.senha) {
      payloadParaSalvar.senha = await bcrypt.hash(payloadParaSalvar.senha, SALT_ROUNDS);
    }

    extrair_dados(payloadParaSalvar);

    const local_Sets = gerar_sqlSets();
    const local_values = valuesParams();

    const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_user = ?`;

    local_values.push(id);

    const [result, fields] = await db.execute(sqlText, local_values);

    return { message: "Success", data: result };
  } catch (err) {
    const mensagem = String(err && err.message);
    if (mensagem.includes("UNIQUE") || err.code === "SQLITE_CONSTRAINT") {
      return { message: "Error", data: "Este email já está cadastrado." };
    }
    console.error("Erro ao atualizar usuário:", err);
    return { message: "Error", data: "Erro ao atualizar usuário." };
  }
}

// ── DELETE: remover um usuário pelo id ──────────────────────
async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_user = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// ── EndPointName: retorna o nome da tabela ──────────────────
function EndPointName() {
  return tableName;
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };