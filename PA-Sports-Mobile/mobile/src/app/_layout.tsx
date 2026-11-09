import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, Text, View } from "react-native";

import AuthProvider, { useAuth } from "../contexts/authContext";
import { colors, styles } from "../components/ui";

function Routes() {
  const { isLoggedIn, isReading, error } = useAuth();
  if (isReading) {
    return (
      <View
        style={[
          styles.page,
          { alignItems: "center", justifyContent: "center", gap: 16 },
        ]}
      >
        <ActivityIndicator color={colors.green} />
        <Text style={styles.subtitle}>Carregando PA-Sports…</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.page, { justifyContent: "center", padding: 24 }]}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <Routes />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
