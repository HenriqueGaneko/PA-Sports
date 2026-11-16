// ============================================================
// validators.js — validação server-side dos dados de cadastro
// ============================================================
// Nunca confie só na validação do front-end (HTML5 required, etc).
// Qualquer pessoa pode chamar a API direto (Postman, curl, DevTools)
// e pular o formulário inteiro. Por isso validamos tudo de novo aqui.
// ============================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarNome(nome) {
  if (typeof nome !== "string") return "Nome é obrigatório.";
  const limpo = nome.trim();
  if (limpo.length < 3) return "Nome deve ter pelo menos 3 caracteres.";
  if (limpo.length > 100) return "Nome muito longo (máx. 100 caracteres).";
  return null;
}

function validarEmail(email) {
  if (typeof email !== "string") return "Email é obrigatório.";
  const limpo = email.trim().toLowerCase();
  if (limpo.length > 100) return "Email muito longo.";
  if (!EMAIL_REGEX.test(limpo)) return "Email inválido.";
  return null;
}

function validarSenha(senha) {
  if (typeof senha !== "string") return "Senha é obrigatória.";
  if (senha.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
  // bcrypt ignora qualquer caractere além do 72º byte, então limitamos aqui
  if (senha.length > 72) return "Senha muito longa (máx. 72 caracteres).";
  if (!/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) {
    return "Senha deve conter letras e números.";
  }
  return null;
}

function validarTelefone(telefone) {
  if (typeof telefone !== "string") return "Telefone é obrigatório.";
  const somenteNumeros = telefone.replace(/\D/g, "");
  if (somenteNumeros.length < 10 || somenteNumeros.length > 11) {
    return "Telefone inválido. Use DDD + número (10 ou 11 dígitos).";
  }
  return null;
}

function validarCidade(cidade) {
  if (typeof cidade !== "string") return "Cidade é obrigatória.";
  const limpo = cidade.trim();
  if (limpo.length < 2) return "Cidade inválida.";
  if (limpo.length > 100) return "Cidade muito longa.";
  return null;
}

// Valida o payload inteiro recebido em POST /users (cadastro público)
// Retorna um array de mensagens de erro. Array vazio = tudo válido.
function validarCadastroUser(payload) {
  const erros = [];

  const erroNome = validarNome(payload.nome);
  if (erroNome) erros.push(erroNome);

  const erroEmail = validarEmail(payload.email);
  if (erroEmail) erros.push(erroEmail);

  const erroSenha = validarSenha(payload.senha);
  if (erroSenha) erros.push(erroSenha);

  const erroTelefone = validarTelefone(payload.telefone);
  if (erroTelefone) erros.push(erroTelefone);

  const erroCidade = validarCidade(payload.cidade);
  if (erroCidade) erros.push(erroCidade);

  return erros;
}

module.exports = {
  validarNome,
  validarEmail,
  validarSenha,
  validarTelefone,
  validarCidade,
  validarCadastroUser,
};