import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "../screens/AuthScreen";
import { colors } from "../components/ui";

export default function Register() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <AuthScreen
        initialMode="cadastro"
        onSwitchMode={() => router.replace("/login")}
        onSuccess={() => router.replace("/")}
      />
    </SafeAreaView>
  );
}
