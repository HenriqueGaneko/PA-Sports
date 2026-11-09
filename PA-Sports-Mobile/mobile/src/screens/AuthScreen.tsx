import React, { useState } from "react";
import { View, Text } from "react-native";

import { Page, Heading, Chip, Field, styles } from "../components/ui";
import { useApp, Registration } from "../contexts/authContext";
import { sports } from "../data/catalog";
import { ButtonFatec } from "../components/Button";

export default function AuthScreen({
  initialMode,
  onSuccess,
  onSwitchMode,
}: {
  initialMode: "login" | "cadastro";
  onSuccess: () => void;
  onSwitchMode?: (mode: "login" | "cadastro") => void;
}) {
  const { register, login, busy } = useApp();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Registration>({
    name: "",
    email: "",
    birth: "",
    city: "",
    phone: "",
    sport: "futebol",
    password: "",
    confirm: "",
  });
  const change = (key: keyof Registration) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setError("");
  };
  async function submit() {
    setError("");
    try {
      if (mode === "cadastro") {
        await register(values);
      } else {
        if (!values.email || !values.password) {
          throw new Error("Preencha e-mail e senha.");
        }
        await login(values.email, values.password);
      }
      onSuccess();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Não foi possível salvar os dados.",
      );
    }
  }
  return (
    <Page>
      <Heading
        tag="Portal do atleta"
        title={
          mode === "login" ? "Bem-vindo de volta" : "Sua jornada começa aqui"
        }
        description={
          mode === "login"
            ? "Entre para acompanhar suas inscrições."
            : "Preencha seus dados e crie seu perfil esportivo."
        }
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Chip
          label="Entrar"
          active={mode === "login"}
          onPress={() => {
            if (mode !== "login" && onSwitchMode) {
              onSwitchMode("login");
              return;
            }
            setMode("login");
            setError("");
          }}
        />
        <Chip
          label="Cadastrar"
          active={mode === "cadastro"}
          onPress={() => {
            if (mode !== "cadastro" && onSwitchMode) {
              onSwitchMode("cadastro");
              return;
            }
            setMode("cadastro");
            setError("");
          }}
        />
      </View>
      <View style={styles.card}>
        {mode === "cadastro" && (
          <Field
            label="Nome completo"
            placeholder="Seu nome"
            value={values.name}
            onChangeText={change("name")}
            autoCapitalize="words"
          />
        )}
        <Field
          label="E-mail"
          placeholder="seu@email.com"
          value={values.email}
          onChangeText={change("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
        {mode === "cadastro" && (
          <>
            <Field
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              value={values.birth}
              onChangeText={(v) =>
                change("birth")(
                  v
                    .replace(/\D/g, "")
                    .slice(0, 8)
                    .replace(/^(\d{2})(\d)/, "$1/$2")
                    .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2"),
                )
              }
              keyboardType="number-pad"
              maxLength={10}
            />
            <Field
              label="Cidade / UF"
              placeholder="Jaboticabal / SP"
              value={values.city}
              onChangeText={change("city")}
            />
            <Field
              label="Telefone com DDD"
              placeholder="11999999999"
              value={values.phone}
              onChangeText={change("phone")}
              keyboardType="phone-pad"
              maxLength={16}
            />
            <Text style={styles.label}>ESPORTE PRINCIPAL</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {sports.map((s) => (
                <Chip
                  key={s.id}
                  label={s.name}
                  active={values.sport === s.id}
                  onPress={() => change("sport")(s.id)}
                />
              ))}
            </View>
          </>
        )}
        <Field
          label="Senha"
          placeholder={
            mode === "cadastro" ? "8 caracteres, letras e números" : "Sua senha"
          }
          value={values.password}
          onChangeText={change("password")}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete={
            mode === "cadastro" ? "new-password" : "current-password"
          }
        />
        {mode === "cadastro" && (
          <Field
            label="Confirmar senha"
            placeholder="Repita a senha"
            value={values.confirm}
            onChangeText={change("confirm")}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
        {!!error && (
          <Text
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            style={styles.error}
          >
            {error}
          </Text>
        )}
        <ButtonFatec
          text={
            busy
              ? "Aguarde…"
              : mode === "login"
                ? "Entrar na conta"
                : "Criar conta"
          }
          action={submit}
          disabled={busy}
        />
      </View>
      <Text style={styles.subtitle}>
        Versão de demonstração: sua conta e suas inscrições ficam apenas neste
        dispositivo. Use dados de teste.
      </Text>
    </Page>
  );
}
