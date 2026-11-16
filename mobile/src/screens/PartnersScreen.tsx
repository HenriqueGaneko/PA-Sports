import React from "react";
import { Text, View } from "react-native";
import { Heading, Page, styles, Button } from "../components/ui";
import { useApp } from "../contexts/authContext";
export default function PartnersScreen({onAbout}:{onAbout:()=>void}) {
  const {institutions} = useApp();
  return <Page>
    <Heading tag="Ecossistema" title="Instituições cadastradas" description="Instituições presentes no cadastro da plataforma. O cadastro não significa parceria formal." />
    {institutions.length ? institutions.map(i => <View key={i.id} style={styles.card}>
      <Text style={styles.cardTitle}>{i.name}</Text><Text style={styles.subtitle}>{i.city || "Localidade não informada"}</Text>
    </View>) : <Text style={styles.subtitle}>Nenhuma instituição disponível no momento.</Text>}
    <View style={styles.card}><Heading tag="Instituições" title="Conheça o projeto" description="Saiba mais sobre a plataforma PA-Sports." /><Button title="Sobre a plataforma" onPress={onAbout}/></View>
  </Page>;
}
