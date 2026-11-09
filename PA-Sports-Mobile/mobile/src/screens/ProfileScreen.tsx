import React, { useState } from "react";
import { Text, View } from "react-native";

import { useApp } from "../contexts/authContext";
import { Page, Heading, Button, styles, colors } from "../components/ui";
import { sportName, dateLabel } from "../data/catalog";

export default function ProfileScreen({
  onLogin,
  onTrials,
}: {
  onLogin: () => void;
  onTrials: () => void;
}) {
  const { user, enrolled, logout, cancel, busy, trials } = useApp();
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  async function attempt(action: () => Promise<void>) {
    try {
      await action();
      setError("");
      setConfirm(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível concluir.");
    }
  }
  if (!user) {
    return (
      <Page>
        <Heading
          tag="Perfil do atleta"
          title="Seu espaço no esporte"
          description="Entre na sua conta para ver seus dados e acompanhar suas inscrições."
        />
        <Button title="Entrar ou cadastrar" onPress={onLogin} />
      </Page>
    );
  }
  const list = trials.filter((t) => enrolled.includes(t.id));
  return (
    <Page>
      <View
        style={{
          width: 78,
          height: 78,
          borderRadius: 39,
          backgroundColor: "#123C22",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: colors.green,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "800", color: colors.green }}>
          {user.name
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </Text>
      </View>
      <Heading
        tag="Perfil do atleta"
        title={user.name}
        description={sportName(user.sport)}
      />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados pessoais</Text>
        {[
          ["E-mail", user.email],
          ["Nascimento", user.birth],
          ["Cidade", user.city],
          ["Telefone", user.phone],
        ].map(([label, value]) => (
          <View key={label}>
            <Text style={styles.label}>{label}</Text>
            <Text selectable style={{ color: colors.text, fontSize: 16 }}>
              {value}
            </Text>
          </View>
        ))}
      </View>
      <Heading
        tag={`${list.length} ${list.length === 1 ? "inscrição" : "inscrições"}`}
        title="Minhas inscrições"
      />
      {list.length ? (
        list.map((t) => (
          <View style={styles.card} key={t.id}>
            <Text style={styles.overline}>INSCRIÇÃO CONFIRMADA</Text>
            <Text style={styles.cardTitle}>{t.title}</Text>
            <Text style={styles.subtitle}>
              {t.city}
              {"\n"}
              {dateLabel(t.date)} · {t.time}
            </Text>
            {confirm === t.id ? (
              <>
                <Text style={styles.subtitle}>
                  Deseja cancelar esta inscrição?
                </Text>
                <Button
                  title="Confirmar cancelamento"
                  disabled={busy}
                  onPress={() => attempt(() => cancel(t.id))}
                />
                <Button
                  title="Manter inscrição"
                  secondary
                  onPress={() => setConfirm(null)}
                />
              </>
            ) : (
              <Button
                title="Cancelar inscrição"
                secondary
                disabled={busy}
                onPress={() => setConfirm(t.id)}
              />
            )}
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.subtitle}>
            Você ainda não se inscreveu. Encontre sua primeira oportunidade.
          </Text>
          <Button title="Explorar peneiras" onPress={onTrials} />
        </View>
      )}
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button
        title="Sair da conta"
        secondary
        disabled={busy}
        onPress={() => attempt(logout)}
      />
    </Page>
  );
}
