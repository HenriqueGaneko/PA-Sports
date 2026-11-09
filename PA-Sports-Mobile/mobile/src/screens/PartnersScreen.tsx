import React from "react";
import { Text, View } from "react-native";
import { Heading, Page, styles, Button } from "../components/ui";

const partners = [
  ["⚽", "Flamengo", "Clube parceiro · Categorias de base"],
  ["🏊", "SESI-SP", "Instituto parceiro · Natação e esportes aquáticos"],
  ["📋", "CBF Academy", "Federação · Certificação esportiva"],
  ["👟", "Nike Brasil", "Patrocinador · Material esportivo"],
  ["🏀", "Basquete Brasília", "Clube parceiro · Basquete"],
  ["🏐", "Minas Tênis", "Clube parceiro · Vôlei"],
  ["💧", "Gatorade", "Patrocinador · Hidratação"],
  ["🏆", "FPF", "Federação · Futebol paulista"],
];
export default function PartnersScreen({ onAbout }: { onAbout: () => void }) {
  return <Page>
    <Heading tag="Ecossistema" title="Nossos parceiros" description="Lista apresentada no projeto web de referência. Consulte a equipe para confirmar as parcerias atuais." />
    <Heading tag="Clubes e institutos" title="Quem faz parte do esporte" />
    {partners.map(([icon, title, description]) => <View key={title} style={styles.card}>
      <Text style={{ fontSize: 34 }}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.subtitle}>{description}</Text>
    </View>)}
    <View style={styles.card}>
      <Heading tag="Parcerias" title="Seja um parceiro" description="Seu clube ou instituição pode contribuir para revelar talentos. Conheça o projeto e seus objetivos." />
      <Button title="Sobre a plataforma" onPress={onAbout} />
    </View>
  </Page>;
}
