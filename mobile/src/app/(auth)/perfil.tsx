import React from "react";
import { useRouter } from "expo-router";

import ProfileScreen from "../../screens/ProfileScreen";

export default function Perfil() {
  const router = useRouter();
  return (
    <ProfileScreen
      onLogin={() => router.navigate("/login")}
      onTrials={() => router.navigate("/peneiras")}
    />
  );
}
