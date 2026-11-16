import React from "react";
import { Text, View } from "react-native";

import { Page, Heading, styles, Button } from "../components/ui";
import { useApp } from "../contexts/authContext";


export default function SportsScreen({
  onSport,
}: {
  onSport: (id: string) => void;
}) {
  const { sports } = useApp();
  return (
    <Page>
      <Heading
        tag="Modalidades"
        title="Encontre seu esporte"
        description="Modalidades cadastradas na plataforma."
      />
      {sports.map((s) => (
        <View style={styles.card} key={s.id}>
          <Text style={styles.overline}>MODALIDADE</Text>
          <Text style={styles.cardTitle}>{s.name}</Text>

          <Button
            title={`Ver peneiras de ${s.name}`}
            onPress={() => onSport(s.id)}
          />
        </View>
      ))}
    </Page>
  );
}
