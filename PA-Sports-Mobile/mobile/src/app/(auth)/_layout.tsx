import React from "react";
import { Tabs, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../components/ui";

export default function AuthLayout() {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["top"]}
    >
      <View style={s.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="PA-Sports, início"
          onPress={() => router.navigate("/")}
        >
          <Text style={s.logo}>
            PA<Text style={{ color: colors.green }}>–SPORTS</Text>
          </Text>
        </Pressable>
        <Text style={s.tag}>PORTAL DO ATLETA</Text>
      </View>
      {!process.env.EXPO_PUBLIC_API_URL && <View style={s.demo}>
        <Text style={s.notice}>MODO DEMONSTRAÇÃO · configure a API para dados reais</Text>
      </View>}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
          tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="esportes"
          options={{
            title: "Esportes",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sports" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="peneiras"
          options={{
            title: "Peneiras",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen name="parceiros" options={{ title: "Parceiros", tabBarIcon: ({color,size}) => <MaterialIcons name="groups" color={color} size={size} /> }} />
        <Tabs.Screen name="sobre" options={{ title: "Sobre", tabBarIcon: ({color,size}) => <MaterialIcons name="info-outline" color={color} size={size} /> }} />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  logo: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.7,
    color: colors.text,
  },
  tag: { fontSize: 9, letterSpacing: 1.4, color: colors.muted },
  demo: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#102217",
  },
  notice: { fontSize: 11, color: "#ACBEAF", textAlign: "center" },
});
