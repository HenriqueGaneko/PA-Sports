import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthScreen from "../screens/AuthScreen";
import { colors } from "../components/ui";

export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <AuthScreen
        initialMode="login"
        onSwitchMode={() => router.replace("/register")}
        onSuccess={() => router.replace("/")}
      />
    </SafeAreaView>
  );
}
