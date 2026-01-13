import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Heart, MessageSquare, Search, User, ChevronDown, Car, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'motors', name: 'Motors', isNew: true },
  { id: 'japanese', name: 'Japanese' },
  { id: 'german', name: 'German' },
  { id: 'american', name: 'American' },
  { id: 'korean', name: 'Korean' },
];

const RECENT_ITEMS = [
  { id: 1, title: 'Toyota Camry Brake Pads', price: 'AED 150', location: 'Sharjah', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'BMW E46 M3 Front Bumper', price: 'AED 1,200', location: 'Abu Dhabi', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>AutoPartX</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}><Bell size={22} color="#4B5563" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Heart size={22} color="#4B5563" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><MessageSquare size={22} color="#4B5563" /></TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <User size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.locationSelector}>
          <MapPin size={14} color="#2563EB" />
          <Text style={styles.locationText}>Abu Dhabi</Text>
          <ChevronDown size={14} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Horizontal */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{cat.name}</Text>
              {cat.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.heroTitle}>Find Genuine Parts in UAE</Text>
            
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <Search size={18} color="#9CA3AF" />
                <TextInput 
                  placeholder="Search for parts..." 
                  style={styles.searchInput}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Quick Filter</Text>
          <View style={styles.filterGrid}>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterLabel}>Market</Text>
              <View style={styles.filterValueRow}>
                <Text style={styles.filterValue}>Japanese</Text>
                <ChevronDown size={16} color="#4B5563" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterDropdown}>
              <Text style={styles.filterLabel}>Brand</Text>
              <View style={styles.filterValueRow}>
                <Text style={styles.filterValue}>Toyota</Text>
                <ChevronDown size={16} color="#4B5563" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Items */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently added</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentScroll}>
            {RECENT_ITEMS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.cardLocation}>
                    <MapPin size={10} color="#9CA3AF" />
                    <Text style={styles.cardLocationText}>{item.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sell Banner */}
        <TouchableOpacity style={styles.sellBanner}>
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            style={styles.sellBannerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sellBannerTextContainer}>
              <Text style={styles.sellBannerTitle}>Sell your spare parts</Text>
              <Text style={styles.sellBannerSubtitle}>List for free today</Text>
              <View style={styles.sellBannerButton}>
                <Text style={styles.sellBannerButtonText}>Get started</Text>
              </View>
            </View>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=400' }}
              style={styles.sellBannerImage}
            />
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2563EB',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  newBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#2563EB',
  },
  heroSection: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'center',
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  filterSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  filterGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  filterDropdown: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  filterValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  recentSection: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  seeAll: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  recentScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    width: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    height: 32,
    marginBottom: 8,
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardLocationText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  sellBanner: {
    margin: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sellBannerGradient: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
  },
  sellBannerTextContainer: {
    flex: 1,
  },
  sellBannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  sellBannerSubtitle: {
    color: '#DBEAFE',
    fontSize: 14,
    marginBottom: 16,
  },
  sellBannerButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  sellBannerButtonText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 12,
  },
  sellBannerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  }
});
