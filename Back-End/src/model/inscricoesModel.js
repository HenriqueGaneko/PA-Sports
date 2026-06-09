const { db } = require("../databases/DatabaseContext.js");
const { valuesParams, extrair_dados, gerar_sqlFields, gerar_sqlParams, gerar_sqlSets } = require("../utils/sqlcomandos.js");

const tableName = "inscricoes";

async function Get() {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      atletas.id_atleta,
      atletas.nome        AS nome_atleta,
      atletas.email       AS email_atleta,
      peneiras.id_peneira,
      peneiras.titulo     AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao
    FROM ${tableName}
    INNER JOIN atletas  ON inscricoes.id_atleta  = atletas.id_atleta
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    ORDER BY inscricoes.id_inscricao
  `;
  const [result] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

async function GetById(id) {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      atletas.id_atleta,
      atletas.nome        AS nome_atleta,
      atletas.email       AS email_atleta,
      peneiras.id_peneira,
      peneiras.titulo     AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao
    FROM ${tableName}
    INNER JOIN atletas  ON inscricoes.id_atleta  = atletas.id_atleta
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    WHERE inscricoes.id_inscricao = ?
  `;
  const [result] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// GET /inscricoes/atleta/:id  — inscrições de um atleta específico
async function GetByAtleta(id_atleta) {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      peneiras.titulo     AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao,
      peneiras.vagas
    FROM ${tableName}
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    WHERE inscricoes.id_atleta = ?
    ORDER BY peneiras.data_peneira
  `;
  const [result] = await db.execute(sqlText, [id_atleta]);
  return { message: "Success", data: result };
}

// Payload: { id_atleta, id_peneira, data_inscricao }
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
  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_inscricao = ?`;
  local_values.push(id);
  const [result] = await db.execute(sqlText, local_values);
  return { message: "Success", data: result };
}

async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_inscricao = ?`;
  const [result] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

function EndPointName() { return tableName; }

module.exports = { Get, GetById, GetByAtleta, Post, Put, Delete, EndPointName };
