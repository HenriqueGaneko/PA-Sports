import React from "react";
import { useRouter } from "expo-router";
import AboutScreen from "../../screens/AboutScreen";
export default function Sobre() {
  const router = useRouter();
  return <AboutScreen  />;
}
