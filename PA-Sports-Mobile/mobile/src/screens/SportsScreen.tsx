import React from "react";
import { Text, View } from "react-native";

import { Page, Heading, styles, Button } from "../components/ui";
import { sports } from "../data/catalog";

export default function SportsScreen({
  onSport,
}: {
  onSport: (id: string) => void;
}) {
  return (
    <Page>
      <Heading
        tag="Modalidades"
        title="Encontre seu esporte"
        description="Seis caminhos para descobrir novas oportunidades."
      />
      {sports.map((s) => (
        <View style={styles.card} key={s.id}>
          <Text style={styles.overline}>MODALIDADE {s.mark}</Text>
          <Text style={styles.cardTitle}>{s.name}</Text>
          <Text style={styles.subtitle}>{s.description}</Text>
          <Text style={styles.label}>{s.categories}</Text>
          <Button
            title={`Ver peneiras de ${s.name}`}
            onPress={() => onSport(s.id)}
          />
        </View>
      ))}
    </Page>
  );
}
