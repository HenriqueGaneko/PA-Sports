import React, { useState } from "react";
import { View, Text } from "react-native";

import { Page, Heading, Chip, Field, styles } from "../components/ui";
import { sports } from "../data/catalog";
import TrialCard from "../components/TrialCard";
import { useApp } from "../contexts/authContext";
import { Button } from "../components/ui";

export default function TrialsScreen({
  filter,
  setFilter,
  onLogin,
}: {
  filter: string;
  setFilter: (id: string) => void;
  onLogin: () => void;
}) {
  const [query, setQuery] = useState("");
  const { trials, trialsLoading, trialsError, refreshTrials } = useApp();
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const list = trials.filter(
    (t) =>
      (filter === "todos" || t.sport === filter) &&
      normalize(`${t.city} ${t.title} ${t.club}`).includes(normalize(query)),
  );
  return (
    <Page>
      <Heading
        tag="Seletivas"
        title="Sua próxima chance"
        description="Filtre a modalidade e encontre oportunidades por cidade."
      />
      <Field
        label="Buscar cidade ou seletiva"
        placeholder="Ex.: São Paulo"
        value={query}
        onChangeText={setQuery}
      />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Chip
          label="Todas"
          active={filter === "todos"}
          onPress={() => setFilter("todos")}
        />
        {sports.map((s) => (
          <Chip
            key={s.id}
            label={s.name}
            active={filter === s.id}
            onPress={() => setFilter(s.id)}
          />
        ))}
      </View>
      {trialsLoading && <Text style={styles.subtitle}>Carregando peneiras…</Text>}
      {!!trialsError && <Text style={styles.error}>{trialsError}</Text>}
      {!!trialsError && <Button title="Tentar novamente" secondary onPress={() => void refreshTrials()} />}
      <Text style={styles.label}>
        {list.length}{" "}
        {list.length === 1 ? "seletiva encontrada" : "seletivas encontradas"}
      </Text>
      {list.length ? (
        list.map((t) => <TrialCard key={t.id} trial={t} onLogin={onLogin} />)
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nenhuma seletiva encontrada</Text>
          <Text style={styles.subtitle}>Tente outra cidade ou modalidade.</Text>
        </View>
      )}
    </Page>
  );
}
