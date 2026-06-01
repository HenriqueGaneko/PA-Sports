// ============================================================
// usersModel.js  —  camada de acesso ao banco para "users"
// ============================================================
// O Model é responsável SOMENTE por falar com o banco de dados.
// Ele recebe dados já prontos, monta o SQL e devolve o resultado.
// Quem chama o Model é o Controller.
// ============================================================

// 1. Importa a conexão com o banco (é o mesmo objeto db para todos os models)
const { db } = require("../databases/DatabaseContext.js");

// 2. Importa as funções auxiliares que montam o SQL dinamicamente
//    extrair_dados  → lê o objeto payload e separa campos e valores
//    gerar_sqlFields → monta "nome , email , senha , ..."
//    gerar_sqlParams → monta " ? , ? , ? , ..."    (para INSERT)
//    gerar_sqlSets   → monta "nome = ? , email = ?" (para UPDATE)
//    valuesParams    → retorna o array de valores na mesma ordem dos campos
const {
  valuesParams,
  extrair_dados,
  gerar_sqlFields,
  gerar_sqlParams,
  gerar_sqlSets,
} = require("../utils/sqlcomandos.js");

// 3. Nome da tabela — usado em todas as queries
//    Mude aqui e tudo se ajusta automaticamente
const tableName = "users";

// ── GET: buscar todos os usuários ───────────────────────────
// SELECT * FROM users ORDER BY id_user
// Não recebe parâmetros, devolve todos os registros.
async function Get() {
  const sqlText = `SELECT * FROM ${tableName} ORDER BY id_user`;

  // db.execute devolve um array com dois elementos:
  //   result → array de linhas retornadas pelo banco
  //   fields → metadados das colunas (raramente usamos)
  const [result, fields] = await db.execute(sqlText);

  // Padronizamos a resposta com message + data
  // O Controller vai pegar esse objeto e enviar ao cliente
  return { message: "Success", data: result };
}

// ── GET BY ID: buscar um único usuário pelo id ──────────────
// SELECT * FROM users WHERE id_user = ?
// O ? é substituído pelo valor de "id" de forma segura (evita SQL Injection)
async function GetById(id) {
  const sqlText = `SELECT * FROM ${tableName} WHERE id_user = ?`;

  // Passamos [id] como segundo argumento — o mysql2 substitui o ? por esse valor
  const [result, fields] = await db.execute(sqlText, [id]);

  return { message: "Success", data: result };
}

// ── POST: inserir um novo usuário ───────────────────────────
// O payload chega como objeto JSON do body da requisição, ex.:
//   { "nome": "João", "email": "j@email.com", "senha": "123", "tipo_usuario": "atleta", "telefone": "...", "cidade": "..." }
// As funções de sqlcomandos.js montam o SQL baseado NAS CHAVES desse objeto.
// Por isso o nome das chaves do JSON deve ser IGUAL ao nome das colunas no banco.
async function Post(payload) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  // Preenche as variáveis internas do sqlcomandos com os campos e valores do payload
  extrair_dados(payload);

  // gerar_sqlFields() → "nome , email , senha , tipo_usuario , telefone , cidade"
  const local_fields = gerar_sqlFields();

  // gerar_sqlParams() → " ? , ? , ? , ? , ? , ?"
  const local_params = gerar_sqlParams();

  // valuesParams() → ["João", "j@email.com", "123", "atleta", "999...", "Santos"]
  const valuessql = valuesParams();

  // Resultado final: INSERT INTO users ( nome , email , ... ) VALUES ( ? , ? , ... )
  const sqlText = `INSERT INTO ${tableName} ( ${local_fields} ) VALUES ( ${local_params} )`;

  const [result, fields] = await db.execute(sqlText, valuessql);

  // result.insertId contém o id gerado automaticamente pelo AUTO_INCREMENT
  return { message: "Success", data: result };
}

// ── PUT: atualizar um usuário existente ─────────────────────
// Recebe o payload (campos que serão atualizados) e o id do registro
// Exemplo de payload: { "nome": "João Silva", "cidade": "Santos" }
// Só precisa mandar os campos que quer alterar!
async function Put(payload, id) {
  if (!payload) return { message: "Error", data: "Dados não informados!" };

  extrair_dados(payload);

  // gerar_sqlSets() → "nome = ? , cidade = ?"
  const local_Sets = gerar_sqlSets();

  // valuesParams() → ["João Silva", "Santos"]
  const local_values = valuesParams();

  // Resultado: UPDATE users SET nome = ? , cidade = ? WHERE id_user = ?
  const sqlText = `UPDATE ${tableName} SET ${local_Sets} WHERE id_user = ?`;

  // IMPORTANTE: o id deve ser o ÚLTIMO valor do array
  // porque na query o WHERE id_user = ? aparece por último
  local_values.push(id);

  const [result, fields] = await db.execute(sqlText, local_values);

  return { message: "Success", data: result };
}

// ── DELETE: remover um usuário pelo id ──────────────────────
async function Delete(id) {
  const sqlText = `DELETE FROM ${tableName} WHERE id_user = ?`;

  const [result, fields] = await db.execute(sqlText, [id]);

  return { message: "Success", data: result };
}

// ── EndPointName: retorna o nome da tabela ──────────────────
// Usado nas Routes para montar o endpoint automaticamente
// Ex.: se tableName = "users", a rota será GET /users
function EndPointName() {
  return tableName;
}

// 4. Exporta todas as funções para o Controller usar
module.exports = { Get, GetById, Post, Put, Delete, EndPointName };
