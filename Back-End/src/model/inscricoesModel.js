// ============================================================
// inscricoesModel.js  —  camada de acesso ao banco para "inscricoes"
// ============================================================
// Tabela de relacionamento entre users e peneiras (N:N)
// Um usuário pode se inscrever em várias peneiras.
// Uma peneira pode ter vários usuários inscritos.
//
// Campos: id_inscricao (PK), id_user (FK), id_peneira (FK), data_inscricao
// UNIQUE(id_user, id_peneira) — o mesmo user não pode se inscrever duas vezes
// ============================================================

const { db } = require("../databases/DatabaseContext.js");
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets,
} = require("../utils/sqlcomandos.js");

const tableName = "inscricoes";

// ── GET: buscar todas as inscrições ─────────────────────────
// Usamos JOIN triplo: inscricoes + users + peneiras
// Assim a API devolve nomes em vez de IDs
async function Get() {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      users.id_user,
      users.nome        AS nome_atleta,
      users.email       AS email_atleta,
      peneiras.id_peneira,
      peneiras.titulo   AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao
    FROM ${tableName}
    INNER JOIN users    ON inscricoes.id_user    = users.id_user
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    ORDER BY inscricoes.id_inscricao
  `;

  const [result, fields] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

// ── GET BY ID: buscar uma inscrição específica ──────────────
async function GetById(id) {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      users.id_user,
      users.nome        AS nome_atleta,
      users.email       AS email_atleta,
      peneiras.id_peneira,
      peneiras.titulo   AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao
    FROM ${tableName}
    INNER JOIN users    ON inscricoes.id_user    = users.id_user
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    WHERE inscricoes.id_inscricao = ?
  `;

  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// ── GET BY USER: buscar todas as inscrições de um atleta ────
// Rota extra útil: GET /inscricoes/user/5
// Mostra em quais peneiras o usuário 5 está inscrito
async function GetByUser(id_user) {
  const sqlText = `
    SELECT
      inscricoes.id_inscricao,
      inscricoes.data_inscricao,
      peneiras.titulo   AS titulo_peneira,
      peneiras.data_peneira,
      peneiras.localizacao,
      peneiras.vagas
    FROM ${tableName}
    INNER JOIN peneiras ON inscricoes.id_peneira = peneiras.id_peneira
    WHERE inscricoes.id_user = ?
    ORDER BY peneiras.data_peneira
  `;

  const [result, fields] = await db.execute(sqlText, [id_user]);
  return { message: "Success", data: result };
}

// ── POST: inscrever um usuário em uma peneira ───────────────
// Payload esperado:
// {
//   "id_user": 1,
//   "id_peneira": 2,
//   "data_inscricao": "2026-05-26"
// }
// Se o usuário já estiver inscrito nessa peneira,
// o banco vai rejeitar (UNIQUE constraint) e cair no catch do Controller
async function Post(payload) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);
  const local_fields = gerar_sqlFields();
  const local_params = gerar_sqlParams();
  const valuessql = valuesParams();

  const sqlText = `INSERT INTO ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;

  const [result, fields] = await db.execute(sqlText, valuessql);
  return { message: "Success", data: result };
}

// ── PUT: atualizar dados de uma inscrição ───────────────────
// Útil principalmente para alterar a data_inscricao
async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);
  const local_Sets = gerar_sqlSets();
  const local_values = valuesParams();

  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_inscricao = ?`;

  local_values.push(id);
  const [result, fields] = await db.execute(sqlText, local_values);
  return { message: "Success", data: result };
}

// ── DELETE: cancelar uma inscrição ──────────────────────────
async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_inscricao = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

function EndPointName() {
  return tableName;
}

module.exports = { Get, GetById, GetByUser, Post, Put, Delete, EndPointName };
