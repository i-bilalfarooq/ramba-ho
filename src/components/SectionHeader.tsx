import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
};

export function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  action: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4338CA",
  },
});
