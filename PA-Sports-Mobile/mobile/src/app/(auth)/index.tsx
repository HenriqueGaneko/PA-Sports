import React from "react";
import { useRouter } from "expo-router";

import HomeScreen from "../../screens/HomeScreen";
import { useApp } from "../../contexts/authContext";

export default function Home() {
  const router = useRouter();
  const { user } = useApp();
  return (
    <HomeScreen
      onTrials={() => router.navigate("/peneiras")}
      onSport={(id) =>
        router.navigate({ pathname: "/peneiras", params: { esporte: id } })
      }
      onLogin={() => router.navigate(user ? "/perfil" : "/register")}
    />
  );
}
