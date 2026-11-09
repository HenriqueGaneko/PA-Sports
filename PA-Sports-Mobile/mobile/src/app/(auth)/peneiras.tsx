import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

import TrialsScreen from "../../screens/TrialsScreen";
import { sports } from "../../data/catalog";

export default function Peneiras() {
  const router = useRouter();
  const { esporte } = useLocalSearchParams<{ esporte?: string }>();
  const filter =
    typeof esporte === "string" && sports.some((s) => s.id === esporte)
      ? esporte
      : "todos";
  return (
    <TrialsScreen
      filter={filter}
      setFilter={(id) => router.setParams({ esporte: id })}
      onLogin={() => router.navigate("/login")}
    />
  );
}
