import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ListingCardProps = {
  title: string;
  price: string;
  seller: string;
  condition: string;
  eta: string;
};

export function ListingCard({
  title,
  price,
  seller,
  condition,
  eta,
}: ListingCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Verified</Text>
        </View>
      </View>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.meta}>{seller}</Text>
      <Text style={styles.meta}>{condition}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.eta}>{eta}</Text>
        <TouchableOpacity style={styles.cta}>
          <Text style={styles.ctaText}>View details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#111827",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    backgroundColor: "#E0E7FF",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 10,
    color: "#4338CA",
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  footerRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eta: {
    fontSize: 11,
    color: "#4B5563",
  },
  cta: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
});
