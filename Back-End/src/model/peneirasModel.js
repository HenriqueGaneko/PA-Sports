// ============================================================
// peneirasModel.js  —  camada de acesso ao banco para "peneiras"
// ============================================================
// Tabela com CHAVES ESTRANGEIRAS:
//   id_esporte → referencia esportes(id_esporte)
//   id_user    → referencia users(id_user)
//
// Por isso, nas queries de busca usamos JOIN para trazer
// os dados relacionados junto com a peneira.
// ============================================================

const { db } = require("../databases/DatabaseContext.js");
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets,
} = require("../utils/sqlcomandos.js");

const tableName = "peneiras";

// ── GET: buscar todas as peneiras ───────────────────────────
// Usamos JOIN para já trazer o nome do esporte e o nome do usuário
// em vez de só mostrar os ids (que não dizem nada pra quem consome a API)
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
      users.nome AS nome_organizador
    FROM ${tableName}
    INNER JOIN esportes ON peneiras.id_esporte = esportes.id_esporte
    INNER JOIN users    ON peneiras.id_user    = users.id_user
    ORDER BY peneiras.id_peneira
  `;
  // INNER JOIN: só traz registros onde a FK existe nos dois lados
  // Se uma peneira tiver id_esporte inválido, ela não aparece
  // (use LEFT JOIN se quiser aparecer mesmo sem o dado relacionado)

  const [result, fields] = await db.execute(sqlText);
  return { message: "Success", data: result };
}

// ── GET BY ID: buscar uma peneira com JOIN ──────────────────
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
      users.nome AS nome_organizador
    FROM ${tableName}
    INNER JOIN esportes ON peneiras.id_esporte = esportes.id_esporte
    INNER JOIN users    ON peneiras.id_user    = users.id_user
    WHERE peneiras.id_peneira = ?
  `;

  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

// ── POST: inserir uma nova peneira ──────────────────────────
// Payload esperado:
// {
//   "titulo": "Peneira Sub-17",
//   "descricao": "Seleção de novos atletas",
//   "data_peneira": "2026-06-10",
//   "localizacao": "Vila Belmiro",
//   "vagas": 50,
//   "id_esporte": 1,
//   "id_user": 3
// }
// IMPORTANTE: id_esporte e id_user precisam existir nas tabelas relacionadas
// senão o MySQL rejeita por violação de chave estrangeira (FK)
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

// ── PUT: atualizar uma peneira ──────────────────────────────
// Só mande no payload os campos que quer alterar
async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);
  const local_Sets = gerar_sqlSets();
  const local_values = valuesParams();

  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_peneira = ?`;

  local_values.push(id);
  const [result, fields] = await db.execute(sqlText, local_values);
  return { message: "Success", data: result };
}

// ── DELETE: remover uma peneira ─────────────────────────────
// ATENÇÃO: se houver inscrições vinculadas a essa peneira, 
// o MySQL vai rejeitar a exclusão por causa da FK em "inscricoes"
// Exclua as inscrições primeiro, ou delete em cascata (configurado no banco)
async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_peneira = ?`;
  const [result, fields] = await db.execute(sqlText, [id]);
  return { message: "Success", data: result };
}

function EndPointName() {
  return tableName;
}

module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
