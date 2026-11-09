export function validateRegistration(values) {
  if (!values.name?.trim() || values.name.trim().length < 3) {
    return "Informe seu nome completo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email?.trim() || "")) {
    return "Informe um e-mail válido.";
  }
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(values.birth || "")) {
    return "Use DD/MM/AAAA na data de nascimento.";
  }
  const [day, month, year] = values.birth.split("/").map(Number);
  const birth = new Date(year, month - 1, day);
  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day ||
    birth > new Date() ||
    year < 1900
  ) {
    return "Informe uma data de nascimento válida.";
  }
  if (!values.city?.trim()) {
    return "Informe sua cidade.";
  }
  if (!/^\d{10,11}$/.test((values.phone || "").replace(/\D/g, ""))) {
    return "Informe telefone com DDD.";
  }
  if (!values.sport) {
    return "Escolha seu esporte.";
  }
  if (
    values.password?.length < 8 ||
    !/[A-Za-z]/.test(values.password || "") ||
    !/\d/.test(values.password || "")
  ) {
    return "A senha precisa de 8 caracteres, letras e números.";
  }
  if (values.password !== values.confirm) {
    return "As senhas não conferem.";
  }
  return null;
}

export function enrollmentError(trial, registered, now = new Date()) {
  if (!trial) {
    return "Peneira não encontrada.";
  }
  if (registered.includes(trial.id)) {
    return "Você já está inscrito nesta peneira.";
  }
  if (trial.status !== "aberta") {
    return "Esta peneira não está aberta para inscrições.";
  }
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  if (trial.date < today) {
    return "O prazo desta peneira já terminou.";
  }
  if (trial.capacity <= 0) {
    return "Não há vagas disponíveis.";
  }
  return null;
}
