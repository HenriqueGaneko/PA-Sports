import React from "react";
import { useRouter } from "expo-router";
import PartnersScreen from "../../screens/PartnersScreen";
export default function Parceiros() {
  const router = useRouter();
  return <PartnersScreen onAbout={() => router.navigate("/sobre")} />;
}
