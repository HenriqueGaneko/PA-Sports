import React from "react";
import { useRouter } from "expo-router";

import SportsScreen from "../../screens/SportsScreen";

export default function Esportes() {
  const router = useRouter();
  return (
    <SportsScreen
      onSport={(id) =>
        router.navigate({ pathname: "/peneiras", params: { esporte: id } })
      }
    />
  );
}
