import test from "node:test";
import assert from "node:assert/strict";
import {
  validateRegistration,
  enrollmentError,
} from "../src/services/rules.mjs";
const account = {
  name: "Atleta Teste",
  email: "teste@example.com",
  birth: "15/05/2005",
  city: "Jaboticabal / SP",
  phone: "16999999999",
  sport: "futebol",
  password: "teste1234",
  confirm: "teste1234",
};
test("cadastro válido e datas inexistentes", () => {
  assert.equal(validateRegistration(account), null);
  assert.match(
    validateRegistration({ ...account, birth: "31/02/2005" }),
    /válida/,
  );
});
test("senhas e e-mail inválidos são recusados", () => {
  assert.match(validateRegistration({ ...account, email: "teste" }), /e-mail/);
  assert.match(
    validateRegistration({ ...account, confirm: "outra123" }),
    /conferem/,
  );
  assert.match(
    validateRegistration({ ...account, password: "12345678" }),
    /letras/,
  );
});
const trial = {
  id: "demo",
  date: "2027-05-01",
  capacity: 20,
  status: "aberta",
};
const now = new Date(2026, 9, 1);
test("inscrição aberta é aceita e duplicada recusada", () => {
  assert.equal(enrollmentError(trial, [], now), null);
  assert.match(enrollmentError(trial, ["demo"], now), /já/);
});
test("bloqueia encerrada, futura sem abertura, vencida e lotada", () => {
  assert.ok(enrollmentError({ ...trial, status: "encerrada" }, [], now));
  assert.ok(enrollmentError({ ...trial, status: "breve" }, [], now));
  assert.match(
    enrollmentError({ ...trial, date: "2025-05-01" }, [], now),
    /terminou/,
  );
  assert.match(enrollmentError({ ...trial, capacity: 0 }, [], now), /vagas/);
});
