// ============================================================
// esportesModel.js  —  camada de acesso ao banco para "esportes"
// ============================================================
// Tabela simples, sem chaves estrangeiras.
// Campos: id_esporte (PK AUTO_INCREMENT), nome_esporte
// ============================================================

const { db } = require("../databases/DatabaseContext.js");
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets,
} = require("../utils/sqlcomandos.js");

const tableName = "esportes";

// ── GET: buscar todos os esportes ───────────────────────────
async function Get() {
  const sqlText = `SELECT * FROM ${tableName} ORDER BY id_esporte`;
  const [result, fields] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

// ── GET BY ID: buscar um esporte pelo id ────────────────────
async function GetById(id) {
  const sqlText = `SELECT * FROM ${tableName} WHERE id_esporte = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// ── POST: inserir um novo esporte ───────────────────────────
// Payload esperado:  { "nome_esporte": "Futebol" }
// O nome da chave deve ser IGUAL ao nome da coluna no banco
async function Post(payload) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);
  const local_fields = gerar_sqlFields();
  const local_params = gerar_sqlParams();
  const valuessql = valuesParams();

  // SQL gerado: INSERT INTO esportes ( nome_esporte ) VALUES ( ? )
  const sqlText = `INSERT INTO ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;

  const [result, fields] = await db.execute(sqlText, valuessql);
  return { message: "Success", data: result };
}

// ── PUT: atualizar um esporte ───────────────────────────────
// Payload esperado:  { "nome_esporte": "Voleibol" }
async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);
  const local_Sets = gerar_sqlSets();
  const local_values = valuesParams();

  // SQL gerado: UPDATE esportes SET nome_esporte = ? WHERE id_esporte = ?
  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_esporte = ?`;

  local_values.push(id); // id vai por último!
  const [result, fields] = await db.execute(sqlText, local_values);
  return { message: "Success", data: result };
}

// ── DELETE: remover um esporte ──────────────────────────────
// ATENÇÃO: só funciona se não houver peneiras usando esse esporte (FK)
// Se quiser deletar mesmo assim, remova as peneiras antes
async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_esporte = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

function EndPointName() {
  return tableName;
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
