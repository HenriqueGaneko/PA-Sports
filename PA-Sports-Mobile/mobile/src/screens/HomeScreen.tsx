import React from "react";
import { Text, View, Pressable } from "react-native";

import { Button, Heading, Page, styles, colors } from "../components/ui";
import { sports } from "../data/catalog";
import TrialCard from "../components/TrialCard";
import { useApp } from "../contexts/authContext";

export default function HomeScreen({
  onTrials,
  onSport,
  onLogin,
}: {
  onTrials: () => void;
  onSport: (id: string) => void;
  onLogin: () => void;
}) {
  const { user, trials, trialsLoading, trialsError } = useApp();
  return (
    <Page>
      <View style={{ paddingVertical: 20, gap: 22 }}>
        <Heading
          tag="Portal do atleta"
          title={"SEU TALENTO\nMERECE UMA\nCHANCE."}
          description="Encontre seu esporte, descubra seletivas e dê o próximo passo na sua jornada."
        />
        <Button title="Explorar peneiras" onPress={onTrials} />
        {!user && (
          <Button title="Criar meu perfil" secondary onPress={onLogin} />
        )}
      </View>
      <View style={[styles.card, { borderColor: "#14592C" }]}>
        <Text style={styles.overline}>Seu próximo passo</Text>
        <Text style={styles.subtitle}>
          {user
            ? `Olá, ${user.name.split(" ")[0]}. Suas oportunidades estão aqui.`
            : "Escolha uma modalidade. Confira os requisitos. Faça sua inscrição."}
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {[["2.400+", "Atletas"], ["84", "Peneiras"], ["36", "Clubes"], ["6", "Esportes"]].map(([number,label]) => (
          <View key={label} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 10, width: "47%", gap: 3 }}>
            <Text style={{ color: colors.green, fontSize: 25, fontWeight: "900" }}>{number}</Text>
            <Text style={styles.subtitle}>{label}</Text>
          </View>
        ))}
      </View>
      <Heading tag="Modalidades" title="Escolha seu esporte" />
      <View style={{ gap: 10 }}>
        {sports.map((s) => (
          <Pressable
            key={s.id}
            accessibilityRole="button"
            accessibilityLabel={`Ver peneiras de ${s.name}`}
            onPress={() => onSport(s.id)}
            style={[styles.card, styles.row]}
          >
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={styles.cardTitle}>{s.name}</Text>
              <Text style={styles.subtitle}>{s.categories}</Text>
            </View>
            <Text style={{ color: colors.green, fontSize: 24 }}>→</Text>
          </Pressable>
        ))}
      </View>
      <Heading tag="Em destaque" title="Peneiras abertas" />
      {trialsLoading && <Text style={styles.subtitle}>Carregando oportunidades…</Text>}
      {!!trialsError && <Text style={styles.error}>{trialsError}</Text>}
      {trials
        .filter((t) => t.status === "aberta")
        .slice(0, 3)
        .map((t) => (
          <TrialCard key={t.id} trial={t} onLogin={onLogin} />
        ))}
      <Button title="Ver todas as peneiras" secondary onPress={onTrials} />
      <View style={styles.card}>
        <Heading tag="Comece agora" title="Pronto para dar o próximo passo?" description="Crie seu perfil de atleta e candidate-se às seletivas abertas." />
        <Button title={user ? "Ver meu perfil" : "Criar conta"} onPress={onLogin} />
      </View>
    </Page>
  );
}
