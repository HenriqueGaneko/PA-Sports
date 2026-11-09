import React from "react";
import { Text, View } from "react-native";
import { Heading, Page, styles, colors } from "../components/ui";

const purpose = [
  ["01", "Missão", "Democratizar o acesso às oportunidades esportivas do Brasil e aproximar jovens talentos de clubes e equipes."],
  ["02", "Visão", "Ser uma plataforma de referência no desenvolvimento e na revelação de talentos esportivos, com acesso justo e transparente."],
  ["03", "Valores", "Transparência, inclusão, excelência e compromisso com o desenvolvimento do esporte brasileiro."],
];
export default function AboutScreen() {
  return <Page>
    <Heading tag="Desde 2025" title="Sobre o PA-Sports" description="Uma plataforma feita para transformar a forma como jovens atletas encontram oportunidades esportivas." />
    <Heading tag="Propósito" title="O que nos move" />
    {purpose.map(([number,title,description]) => <View key={number} style={styles.card}>
      <Text style={{ color: colors.green, fontSize: 29, fontWeight: "900" }}>{number}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>)}
    <Heading tag="Equipe" title="Quem faz o PA-Sports" />
    <View style={styles.card}><Text style={styles.cardTitle}>Henrique Ganeko Ligeiro</Text><Text style={styles.subtitle}>CEO, fundador e desenvolvedor Full-Stack</Text></View>
    <View style={styles.card}><Text style={styles.cardTitle}>Bruno Sergio Mendes de Oliveira</Text><Text style={styles.subtitle}>Designer UX/UI</Text></View>
    <Heading tag="História" title="Nossa jornada" />
    <View style={styles.card}><Text style={styles.overline}>2025 · Fundação</Text><Text style={styles.subtitle}>O PA-Sports nasce na Fatec Taquaritinga para digitalizar a busca por peneiras esportivas.</Text></View>
  </Page>;
}
