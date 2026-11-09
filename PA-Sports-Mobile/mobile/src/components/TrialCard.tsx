import React, { useState } from "react";
import { Text, View } from "react-native";

import { Trial, dateLabel, sportName } from "../data/catalog";
import { Button, colors, styles } from "./ui";
import { useApp } from "../contexts/authContext";
import { enrollmentError } from "../services/rules.mjs";

export default function TrialCard({
  trial,
  onLogin,
}: {
  trial: Trial;
  onLogin: () => void;
}) {
  const { user, enrolled, enroll, busy } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const registered = enrolled.includes(trial.id);
  const unavailable = !!enrollmentError(trial, []);
  async function handleEnroll() {
    if (!user) {
      onLogin();
      return;
    }
    try {
      await enroll(trial.id);
      setMessage("Inscrição confirmada. Veja os detalhes no seu perfil.");
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "Não foi possível realizar a inscrição.",
      );
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.overline}>{sportName(trial.sport)}</Text>
        <Text
          style={{
            color: registered ? colors.green : colors.muted,
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          {registered
            ? "INSCRITO"
            : trial.status === "breve"
              ? "EM BREVE"
              : unavailable
                ? "ENCERRADA"
                : "ABERTA"}
        </Text>
      </View>
      <Text style={styles.cardTitle}>{trial.title}</Text>
      <Text style={styles.subtitle}>{trial.club}</Text>
      <Text style={styles.subtitle}>
        {trial.city}
        {"\n"}
        {dateLabel(trial.date)} · {trial.time}
      </Text>
      <View style={styles.row}>
        <Text style={{ color: colors.text, fontWeight: "700" }}>
          {trial.capacity} vagas na seletiva
        </Text>
        <Text style={{ color: colors.green, fontWeight: "700" }}>
          {trial.price}
        </Text>
      </View>
      {expanded && (
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>FAIXA ETÁRIA: {trial.age}</Text>
          <Text style={styles.subtitle}>{trial.requirements}</Text>
        </View>
      )}
      <Button
        title={expanded ? "Ocultar requisitos" : "Ver requisitos"}
        secondary
        onPress={() => setExpanded(!expanded)}
      />
      <Button
        title={
          registered
            ? "Inscrição confirmada"
            : trial.status === "breve"
              ? "Inscrições em breve"
              : unavailable
                ? "Inscrições encerradas"
                : busy
                  ? "Aguarde…"
                  : "Inscrever-se"
        }
        disabled={registered || unavailable || busy}
        onPress={handleEnroll}
      />
      {!!message && (
        <Text accessibilityLiveRegion="polite" style={styles.subtitle}>
          {message}
        </Text>
      )}
    </View>
  );
}
