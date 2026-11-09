import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export const colors = {
  bg: "#0A0A0A",
  card: "#141614",
  green: "#00C853",
  text: "#F5F5F5",
  muted: "#A7B0A8",
  border: "#2A302B",
  red: "#FF8585",
};
export const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: 22,
    paddingBottom: 36,
    gap: 20,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
  },
  overline: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.green,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.text,
  },
  subtitle: { fontSize: 15, lineHeight: 23, color: colors.muted },
  card: {
    padding: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    gap: 12,
  },
  cardTitle: { fontSize: 20, fontWeight: "800", color: colors.text },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1B201C",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    color: colors.text,
    padding: 14,
    fontSize: 16,
    minHeight: 50,
  },
  button: {
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  buttonText: { fontSize: 14, fontWeight: "800", color: "#061A0B" },
  secondary: {
    backgroundColor: "transparent",
    borderColor: colors.border,
    borderWidth: 1,
  },
  secondaryText: { color: colors.text },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 30,
    borderColor: colors.border,
    borderWidth: 1,
  },
  chipOn: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontSize: 13, fontWeight: "700", color: colors.muted },
  chipTextOn: { color: "#061A0B" },
  error: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#361B1B",
    color: colors.red,
    lineHeight: 22,
  },
});
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function Heading({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description?: string;
}) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.overline}>{tag}</Text>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {description && <Text style={styles.subtitle}>{description}</Text>}
    </View>
  );
}

export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        { opacity: disabled ? 0.45 : pressed ? 0.75 : 1 },
      ]}
    >
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#7C877F"
        selectionColor={colors.green}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.chip, active && styles.chipOn]}
    >
      <Text style={[styles.chipText, active && styles.chipTextOn]}>
        {label}
      </Text>
    </Pressable>
  );
}
