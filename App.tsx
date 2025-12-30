import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ListingCard } from "./src/components/ListingCard";
import { SectionHeader } from "./src/components/SectionHeader";

const categories = [
  { id: "1", label: "Engines", icon: "⚙️" },
  { id: "2", label: "Transmission", icon: "🧰" },
  { id: "3", label: "Brakes", icon: "🛞" },
  { id: "4", label: "Lights", icon: "💡" },
];

const listings = [
  {
    id: "l1",
    title: "Toyota 2GR-FE Engine",
    price: "AED 2,650",
    seller: "Sharjah Auto Hub",
    condition: "Used • 3-month warranty",
    eta: "Delivery in 4-6 hrs",
  },
  {
    id: "l2",
    title: "Nissan CVT Transmission",
    price: "AED 3,400",
    seller: "Ras Al Khor Parts",
    condition: "Refurbished • 6-month warranty",
    eta: "Delivery in 6 hrs",
  },
];

const stats = [
  { id: "s1", label: "Verified sellers", value: "320+" },
  { id: "s2", label: "Avg. sourcing time", value: "45 mins" },
  { id: "s3", label: "Escrow protection", value: "100%" },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.overline}>Ramba ho</Text>
              <Text style={styles.headline}>
                UAE Auto Parts{`\n`}Marketplace
              </Text>
            </View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80",
              }}
              style={styles.heroImage}
            />
          </View>
          <Text style={styles.subhead}>
            Verified sellers, transparent fees, and 3PL delivery across the UAE.
          </Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search by part, make, or model"
              placeholderTextColor="#A3A3A3"
              style={styles.searchInput}
            />
          </View>
          <View style={styles.ctaRow}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Find Parts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sell on Ramba</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Popular categories" actionLabel="View all" />
        <View style={styles.categoryRow}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Recommended listings" actionLabel="See more" />
        <View style={styles.listings}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </View>

        <SectionHeader title="Why buyers trust us" />
        <View style={styles.trustCard}>
          <Text style={styles.trustTitle}>Transparent pricing</Text>
          <Text style={styles.trustBody}>
            See platform markup, service fees, and delivery costs before checkout.
          </Text>
          <View style={styles.feeRow}>
            <View style={styles.feeChip}>
              <Text style={styles.feeLabel}>Markup</Text>
              <Text style={styles.feeValue}>5% / 3%</Text>
            </View>
            <View style={styles.feeChip}>
              <Text style={styles.feeLabel}>Service</Text>
              <Text style={styles.feeValue}>AED 45</Text>
            </View>
            <View style={styles.feeChip}>
              <Text style={styles.feeLabel}>Delivery</Text>
              <Text style={styles.feeValue}>3PL quote</Text>
            </View>
          </View>
        </View>

        <SectionHeader title="Seller onboarding" />
        <View style={styles.onboardingCard}>
          <View>
            <Text style={styles.onboardingTitle}>Get verified in 48 hours</Text>
            <Text style={styles.onboardingBody}>
              Upload your trade license, Emirates ID, and bank details to start
              selling.
            </Text>
          </View>
          <TouchableOpacity style={styles.onboardingButton}>
            <Text style={styles.onboardingButtonText}>Start verification</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overline: {
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  headline: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  subhead: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 12,
    lineHeight: 20,
  },
  heroImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  searchBar: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  ctaRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#111827",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  listings: {
    marginTop: 12,
    gap: 14,
  },
  trustCard: {
    marginTop: 12,
    backgroundColor: "#0F172A",
    borderRadius: 20,
    padding: 18,
  },
  trustTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  trustBody: {
    color: "#CBD5F5",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
  feeRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
  },
  feeChip: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  feeLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#9CA3AF",
  },
  feeValue: {
    marginTop: 4,
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  onboardingCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  onboardingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  onboardingBody: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    lineHeight: 18,
  },
  onboardingButton: {
    marginLeft: "auto",
    backgroundColor: "#EEF2FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  onboardingButtonText: {
    color: "#4338CA",
    fontWeight: "600",
    fontSize: 12,
  },
});
