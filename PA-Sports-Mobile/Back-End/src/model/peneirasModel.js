const { db } = require("../databases/DatabaseContext.js");
const { valuesParams, extrair_dados, gerar_sqlFields, gerar_sqlParams, gerar_sqlSets } = require("../utils/sqlcomandos.js");

const tableName = "peneiras";

async function Get() {
  const sqlText = `
    SELECT 
      peneiras.id_peneira,
      peneiras.titulo,
      peneiras.descricao,
      peneiras.data_peneira,
      peneiras.localizacao,
      peneiras.vagas,
      esportes.nome_esporte,
      instituicoes.nome AS nome_instituicao
    FROM ${tableName}
    INNER JOIN esportes    ON peneiras.id_esporte     = esportes.id_esporte
    INNER JOIN instituicoes ON peneiras.id_instituicao = instituicoes.id_instituicao
    ORDER BY peneiras.id_peneira
  `;
  const [result] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

async function GetById(id) {
  const sqlText = `
    SELECT 
      peneiras.id_peneira,
      peneiras.titulo,
      peneiras.descricao,
      peneiras.data_peneira,
      peneiras.localizacao,
      peneiras.vagas,
      esportes.nome_esporte,
      instituicoes.nome AS nome_instituicao
    FROM ${tableName}
    INNER JOIN esportes    ON peneiras.id_esporte     = esportes.id_esporte
    INNER JOIN instituicoes ON peneiras.id_instituicao = instituicoes.id_instituicao
    WHERE peneiras.id_peneira = ?
  `;
  const [result] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// Payload esperado:
// { titulo, descricao, data_peneira, localizacao, vagas, id_esporte, id_instituicao }
async function Post(payload) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };
  extrair_dados(payload);
  const local_fields = gerar_sqlFields();
  const local_params = gerar_sqlParams();
  const valuessql = valuesParams();
  const sqlText = `INSERT INTO ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;
  const [result] = await db.execute(sqlText, valuessql);
  return { message: "Success", data: result };
}

async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };
  extrair_dados(payload);
  const local_Sets = gerar_sqlSets();
  const local_values = valuesParams();
  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_peneira = ?`;
  local_values.push(id);
  const [result] = await db.execute(sqlText, local_values);
  return { message: "Success", data: result };
}

async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_peneira = ?`;
  const [result] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

function EndPointName() { return tableName; }

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
