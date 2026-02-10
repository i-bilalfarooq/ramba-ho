import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, StyleSheet, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Heart, MessageSquare, Search, User, ChevronDown, Car, MapPin, X, ArrowLeft, Camera, SlidersHorizontal, Share2, Send, Loader2, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SellerApp from './SellerApp';

const { width } = Dimensions.get('window');

const API_URL = 'http://10.10.10.33:3001';

interface Quote {
  id: string;
  sellerName: string;
  price: string;
  condition: 'new' | 'aftermarket' | 'used';
  image: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface BiddingRequest {
  id: string;
  partName: string;
  make: string;
  model: string;
  year: string;
  status: 'searching' | 'quotes_received' | 'accepted' | 'declined';
  quotes: Quote[];
}

const CATEGORIES = [
  { 
    id: 'japanese', 
    name: 'Japanese Market', 
    brands: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Lexus (Toyota)', 'Infiniti (Nissan)', 'Acura (Honda)'] 
  },
  { 
    id: 'german', 
    name: 'German Market', 
    brands: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche', 'Opel'] 
  },
  { 
    id: 'american', 
    name: 'American Market', 
    brands: ['Ford', 'Chevrolet (GM)', 'GMC (GM)', 'Dodge', 'Ram', 'Jeep', 'Tesla', 'Cadillac (GM)', 'Lincoln (Ford)', 'Buick (GM)'] 
  },
  { 
    id: 'korean', 
    name: 'Korean Market', 
    brands: ['Hyundai', 'Kia', 'Genesis'] 
  },
];

const RECENT_ITEMS = [
  { id: 1, title: 'Toyota Camry Brake Pads', price: 'AED 150', location: 'Sharjah Industrial', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'BMW E46 M3 Front Bumper', price: 'AED 1,200', location: 'Musaffah, Abu Dhabi', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Nissan Patrol V8 Engine', price: 'AED 8,500', location: 'Sajja, Sharjah', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Mercedes G-Wagon Grill', price: 'AED 450', location: 'Al Quoz, Dubai', image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'Honda Civic Headlights', price: 'AED 300', location: 'Ajman', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400' },
  { id: 6, title: 'Toyota Land Cruiser Radiator', price: 'AED 850', location: 'Al Ain', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
];

const TRENDING_SEARCHES = [
  'Toyota Camry', 'BMW Brake Pads', 'Nissan Patrol Engine', 'Honda Civic Bumper', 'Mercedes Grill', 'Lexus Radiator'
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [mainSearchQuery, setMainSearchQuery] = useState('');
  const [isSearchInterfaceVisible, setIsSearchInterfaceVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'aftermarket' | 'used' | 'quotes'>('new');
  const [isSellerMode, setIsSellerMode] = useState(false);
  const [activeRequest, setActiveRequest] = useState<BiddingRequest | null>(null);
  const [allRequests, setAllRequests] = useState<BiddingRequest[]>([]);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [requestFormData, setRequestFormData] = useState({ partName: '', make: '', model: '', year: '' });

  // Polling for real-time updates
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/requests`);
        const data = await response.json();
        if (data) {
          setAllRequests(data);
          
          // If the user has an active request, update its specific state (for quotes etc)
          if (activeRequest) {
            const latestState = data.find((r: BiddingRequest) => r.id === activeRequest.id);
            if (latestState && JSON.stringify(latestState) !== JSON.stringify(activeRequest)) {
              setActiveRequest(latestState);
            }
          }
        }
      } catch (e) {
        console.log('Polling error:', e);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [activeRequest]);

  const handleRaiseRequest = async () => {
    const newRequest: BiddingRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...requestFormData,
      status: 'searching',
      quotes: []
    };
    
    try {
      await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      setActiveRequest(newRequest);
      setIsRequestModalVisible(false);
      setRequestFormData({ partName: '', make: '', model: '', year: '' });
    } catch (e) {
      // Fallback to local state if server is down
      setActiveRequest(newRequest);
      setIsRequestModalVisible(false);
      setRequestFormData({ partName: '', make: '', model: '', year: '' });
    }
  };

  const handleAcceptQuote = (quoteId: string) => {
    if (!activeRequest) return;
    const updatedRequest = {
      ...activeRequest,
      status: 'accepted' as const,
      quotes: activeRequest.quotes.map(q => 
        q.id === quoteId ? { ...q, status: 'accepted' as const } : { ...q, status: 'declined' as const }
      )
    };
    setActiveRequest(updatedRequest);
  };

  const handleDeclineQuote = (quoteId: string) => {
    if (!activeRequest) return;
    const updatedRequest = {
      ...activeRequest,
      quotes: activeRequest.quotes.map(q => 
        q.id === quoteId ? { ...q, status: 'declined' as const } : q
      )
    };
    setActiveRequest(updatedRequest);
  };

  const handleIncomingQuote = async (quote: Quote) => {
    if (!activeRequest) return;
    
    try {
      await fetch(`${API_URL}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: activeRequest.id, quote })
      });
      // The poll interval will pick up the change and update state
    } catch (e) {
      // Fallback to local update
      setActiveRequest(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'quotes_received',
          quotes: [...prev.quotes, quote]
        };
      });
    }
  };

  const filteredBrands = selectedCategory?.brands.filter(brand => 
    brand.toLowerCase().includes(brandSearchQuery.toLowerCase())
  ) || [];

  const searchResults = RECENT_ITEMS.filter(item => {
    const searchTerms = mainSearchQuery.toLowerCase().trim().split(/\s+/);
    const itemTitle = item.title.toLowerCase();
    
    // Filter by search terms
    const matchesSearch = searchTerms.every(term => itemTitle.includes(term));
    if (!matchesSearch) return false;

    // Filter by active tab (for demonstration, we'll assign types to items)
    // In a real app, items would have a 'condition' or 'type' property
    if (activeTab === 'new') return true; // Show everything in 'New' for now or filter by item.condition === 'new'
    if (activeTab === 'aftermarket') return item.title.toLowerCase().includes('brake'); // Just an example filter
    if (activeTab === 'used') return item.title.toLowerCase().includes('engine'); // Just an example filter
    
    return true;
  });

  const handleSearch = () => {
    if (mainSearchQuery.trim().length > 0) {
      setActiveTab('new');
      setIsSearchInterfaceVisible(false);
      setIsSearchModalVisible(true);
    }
  };

  const handleTrendingClick = (query: string) => {
    setMainSearchQuery(query);
    setActiveTab('new');
    setIsSearchInterfaceVisible(false);
    setIsSearchModalVisible(true);
  };

  if (isSellerMode) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <SellerApp 
            onBackToUser={() => setIsSellerMode(false)} 
            activeRequests={allRequests}
            onSendQuote={(quote) => handleIncomingQuote(quote)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Active Request Overlay */}
        {activeRequest && (
          <View style={styles.activeRequestBanner}>
            <View style={styles.bannerInfo}>
              <Loader2 size={16} color="#2563EB" style={activeRequest.status === 'searching' && { transform: [{ rotate: '0deg' }] }} />
              <Text style={styles.bannerText}>
                {activeRequest.status === 'searching' 
                  ? `Searching for ${activeRequest.partName}...` 
                  : `${activeRequest.quotes.length} quotes received for ${activeRequest.partName}`}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.viewQuotesButton}
              onPress={() => {
                setActiveTab('quotes');
                setIsSearchModalVisible(true);
              }}
            >
              <Text style={styles.viewQuotesText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveRequest(null)}>
              <X size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        )}

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
            <TouchableOpacity 
              key={cat.id} 
              style={[
                styles.categoryItem,
                selectedCategory?.id === cat.id && styles.categoryItemActive
              ]}
              onPress={() => cat.brands.length > 0 && setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory?.id === cat.id && styles.categoryTextActive
              ]}>{cat.name}</Text>
              {cat.brands.length > 0 && (
                <ChevronDown 
                  size={12} 
                  color={selectedCategory?.id === cat.id ? "#2563EB" : "#9CA3AF"} 
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Brand Selection Modal */}
        <Modal
          visible={!!selectedCategory}
          transparent
          animationType="slide"
          onRequestClose={() => {
            setSelectedCategory(null);
            setBrandSearchQuery('');
          }}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => {
              setSelectedCategory(null);
              setBrandSearchQuery('');
            }}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>{selectedCategory?.name}</Text>
                  <Text style={styles.modalSubtitle}>Choose a brand to browse parts</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => {
                    setSelectedCategory(null);
                    setBrandSearchQuery('');
                  }}
                  style={styles.closeButton}
                >
                  <X size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalSearchContainer}>
                <Search size={18} color="#9CA3AF" />
                <TextInput
                  placeholder={`Search ${selectedCategory?.name.split(' ')[0]} brands...`}
                  style={styles.modalSearchInput}
                  value={brandSearchQuery}
                  onChangeText={setBrandSearchQuery}
                  placeholderTextColor="#9CA3AF"
                />
                {brandSearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setBrandSearchQuery('')}>
                    <X size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>

              <ScrollView style={styles.brandList} showsVerticalScrollIndicator={false}>
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand) => (
                    <TouchableOpacity 
                      key={brand} 
                      style={styles.brandItem}
                      onPress={() => {
                        setSelectedCategory(null);
                        setBrandSearchQuery('');
                      }}
                    >
                      <View style={styles.brandIconPlaceholder}>
                        <Text style={styles.brandInitial}>{brand[0]}</Text>
                      </View>
                      <Text style={styles.brandText}>{brand}</Text>
                      <ChevronDown size={16} color="#E5E7EB" style={{ transform: [{ rotate: '-90deg' }] }} />
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Search size={40} color="#E5E7EB" />
                    <Text style={styles.emptyStateText}>No brands found matching "{brandSearchQuery}"</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>


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
            
            <TouchableOpacity 
              style={styles.searchContainer}
              onPress={() => setIsSearchInterfaceVisible(true)}
              activeOpacity={0.9}
            >
              <View style={styles.searchInputWrapper}>
                <Search size={18} color="#9CA3AF" />
                <View style={styles.searchInput}>
                  <Text style={{ color: '#9CA3AF' }}>Search for parts...</Text>
                </View>
              </View>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.biddingButton}
              onPress={() => setIsRequestModalVisible(true)}
            >
              <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.biddingButtonGradient}
              >
                <Send size={18} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.biddingButtonText}>Can't find it? Raise a Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Raise Request Modal */}
        <Modal
          visible={isRequestModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsRequestModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Request a Part</Text>
                <TouchableOpacity onPress={() => setIsRequestModalVisible(false)}>
                  <X size={24} color="#4B5563" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={{ padding: 20 }}>
                <Text style={styles.inputLabel}>What part do you need?</Text>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="e.g. Camry 2022 Headlights"
                  value={requestFormData.partName}
                  onChangeText={(val) => setRequestFormData(prev => ({ ...prev, partName: val }))}
                />

                <View style={styles.rowInputs}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Make</Text>
                    <TextInput 
                      style={styles.textInput} 
                      placeholder="e.g. Toyota"
                      value={requestFormData.make}
                      onChangeText={(val) => setRequestFormData(prev => ({ ...prev, make: val }))}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>Model</Text>
                    <TextInput 
                      style={styles.textInput} 
                      placeholder="e.g. Camry"
                      value={requestFormData.model}
                      onChangeText={(val) => setRequestFormData(prev => ({ ...prev, model: val }))}
                    />
                  </View>
                </View>

                <Text style={styles.inputLabel}>Year</Text>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="e.g. 2022"
                  value={requestFormData.year}
                  onChangeText={(val) => setRequestFormData(prev => ({ ...prev, year: val }))}
                />

                <TouchableOpacity 
                  style={[styles.submitButton, !requestFormData.partName && { opacity: 0.5 }]}
                  onPress={handleRaiseRequest}
                  disabled={!requestFormData.partName}
                >
                  <Text style={styles.submitButtonText}>Raise Request to Suppliers</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Step 2: Search Interface Modal */}
        <Modal
          visible={isSearchInterfaceVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsSearchInterfaceVisible(false)}
        >
          <View style={[styles.modalOverlay, { backgroundColor: '#FFF' }]}>
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
              <View style={styles.searchInterfaceHeader}>
                <TouchableOpacity 
                  onPress={() => setIsSearchInterfaceVisible(false)}
                  style={styles.backButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <View style={styles.interfaceSearchWrapper}>
                  <Search size={20} color="#9CA3AF" />
                  <TextInput 
                    placeholder="Search for parts..." 
                    style={styles.interfaceInput}
                    placeholderTextColor="#9CA3AF"
                    value={mainSearchQuery}
                    onChangeText={setMainSearchQuery}
                    onSubmitEditing={handleSearch}
                    autoFocus
                  />
                  {mainSearchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setMainSearchQuery('')}>
                      <X size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <ScrollView style={styles.interfaceContent}>
                <Text style={styles.trendingTitle}>Trending searches</Text>
                <View style={styles.trendingContainer}>
                  {TRENDING_SEARCHES.map((query) => (
                    <TouchableOpacity 
                      key={query} 
                      style={styles.trendingChip}
                      onPress={() => handleTrendingClick(query)}
                    >
                      <Search size={14} color="#4B5563" style={{ marginRight: 6 }} />
                      <Text style={styles.trendingText}>{query}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>

        {/* Search Results Modal */}
        <Modal
          visible={isSearchModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsSearchModalVisible(false)}
        >
          <View style={[styles.modalOverlay, { backgroundColor: '#FFF' }]}>
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
              {/* Step 3 Header */}
              <View style={styles.resultsHeader}>
                <TouchableOpacity 
                  onPress={() => {
                    setIsSearchModalVisible(false);
                    if (activeRequest) {
                      setIsSearchInterfaceVisible(false);
                    } else {
                      setIsSearchInterfaceVisible(true);
                    }
                  }}
                  style={styles.backButton}
                >
                  <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.resultsSearchInput}
                  onPress={() => {
                    setIsSearchModalVisible(false);
                    setIsSearchInterfaceVisible(true);
                  }}
                >
                  <Text style={styles.resultsSearchText}>{mainSearchQuery}</Text>
                  <Camera size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>

              {/* Market Tabs (Noon Style) */}
              <View style={styles.noonTabsContainer}>
                {activeTab === 'quotes' && activeRequest && (
                  <TouchableOpacity 
                    style={[styles.noonTab, activeTab === 'quotes' && styles.noonTabActive, { borderColor: '#2563EB' }]}
                    onPress={() => setActiveTab('quotes')}
                  >
                    <View style={[styles.noonBadgeContainer, { backgroundColor: '#2563EB' }]}>
                      <Text style={[styles.noonBadgeText, { color: '#FFF' }]}>Quotes ({activeRequest.quotes.length})</Text>
                    </View>
                    <Text style={styles.noonTabSubtitle}>Bidding results</Text>
                    {activeTab === 'quotes' && <View style={styles.noonTabIndicator} />}
                  </TouchableOpacity>
                )}

                {activeTab !== 'quotes' && (
                  <>
                    <TouchableOpacity 
                      style={[styles.noonTab, activeTab === 'new' && styles.noonTabActive]}
                      onPress={() => setActiveTab('new')}
                    >
                      <View style={[styles.noonBadgeContainer, { backgroundColor: '#4ADE80' }]}>
                        <Text style={styles.noonBadgeText}>new</Text>
                      </View>
                      <Text style={styles.noonTabSubtitle}>genuine parts</Text>
                      {activeTab === 'new' && <View style={styles.noonTabIndicator} />}
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.noonTab, activeTab === 'aftermarket' && styles.noonTabActive]}
                      onPress={() => setActiveTab('aftermarket')}
                    >
                      <View style={[styles.noonBadgeContainer, { backgroundColor: '#FFE000' }]}>
                        <Text style={[styles.noonBadgeText, { fontStyle: 'italic' }]}>aftermarket</Text>
                      </View>
                      <Text style={styles.noonTabSubtitle}>quality alternatives</Text>
                      {activeTab === 'aftermarket' && <View style={styles.noonTabIndicator} />}
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.noonTab, activeTab === 'used' && styles.noonTabActive]}
                      onPress={() => setActiveTab('used')}
                    >
                      <View style={[styles.noonBadgeContainer, { backgroundColor: '#94A3B8' }]}>
                        <Text style={[styles.noonBadgeText, { color: '#FFF' }]}>used</Text>
                      </View>
                      <Text style={styles.noonTabSubtitle}>pre-owned parts</Text>
                      {activeTab === 'used' && <View style={styles.noonTabIndicator} />}
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Filter Pills */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.filterPillsScroll}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
              >
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterPillText}>Deals</Text>
                  <ChevronDown size={14} color="#4B5563" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterPillText}>Brand</Text>
                  <ChevronDown size={14} color="#4B5563" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterPill}>
                  <Text style={styles.filterPillText}>Compatibility</Text>
                  <ChevronDown size={14} color="#4B5563" />
                </TouchableOpacity>
              </ScrollView>

              <ScrollView 
                style={{ flex: 1 }} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              >
                {activeRequest && activeTab === 'quotes' ? (
                  <View style={{ padding: 16 }}>
                    <View style={styles.requestSummaryCard}>
                      <Text style={styles.requestSummaryTitle}>Your Request: {activeRequest.partName}</Text>
                      <Text style={styles.requestSummarySubtitle}>{activeRequest.make} {activeRequest.model} • {activeRequest.year}</Text>
                      <View style={styles.searchingStatus}>
                        {activeRequest.status === 'searching' ? (
                          <>
                            <Loader2 size={16} color="#2563EB" />
                            <Text style={styles.searchingText}>Searching for suppliers...</Text>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} color="#10B981" />
                            <Text style={[styles.searchingText, { color: '#10B981' }]}>Found {activeRequest.quotes.length} suppliers</Text>
                          </>
                        )}
                      </View>
                    </View>

                    {activeRequest.quotes.length > 0 ? (
                      activeRequest.quotes.map((quote) => (
                        <View key={quote.id} style={styles.quoteCard}>
                          <View style={styles.quoteHeader}>
                            <Image source={{ uri: quote.image }} style={styles.quoteImage} />
                            <View style={styles.quoteMainInfo}>
                              <Text style={styles.sellerName}>{quote.sellerName}</Text>
                              <View style={[styles.conditionBadge, { backgroundColor: quote.condition === 'new' ? '#F0FDF4' : '#F9FAFB' }]}>
                                <Text style={[styles.conditionText, { color: quote.condition === 'new' ? '#15803D' : '#6B7280' }]}>
                                  {quote.condition.toUpperCase()}
                                </Text>
                              </View>
                            </View>
                            <Text style={styles.quotePrice}>{quote.price}</Text>
                          </View>
                          
                          {quote.status === 'pending' ? (
                            <View style={styles.quoteActions}>
                              <TouchableOpacity 
                                style={styles.declineButton}
                                onPress={() => handleDeclineQuote(quote.id)}
                              >
                                <Text style={styles.declineButtonText}>Decline</Text>
                              </TouchableOpacity>
                              <TouchableOpacity 
                                style={styles.acceptButton}
                                onPress={() => handleAcceptQuote(quote.id)}
                              >
                                <Text style={styles.acceptButtonText}>Accept Offer</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View style={[styles.statusBanner, { backgroundColor: quote.status === 'accepted' ? '#F0FDF4' : '#FEF2F2' }]}>
                              <Text style={[styles.statusBannerText, { color: quote.status === 'accepted' ? '#15803D' : '#991B1B' }]}>
                                Offer {quote.status.toUpperCase()}
                              </Text>
                            </View>
                          )}
                        </View>
                      ))
                    ) : (
                      <View style={styles.emptyQuotes}>
                        <Loader2 size={40} color="#E5E7EB" />
                        <Text style={styles.emptyQuotesText}>Waiting for sellers to quote...</Text>
                      </View>
                    )}
                  </View>
                ) : searchResults.length > 0 ? (
                  <View style={styles.resultsGrid}>
                    {searchResults.map((item) => (
                      <TouchableOpacity 
                        key={item.id} 
                        style={styles.noonCard}
                        onPress={() => setIsSearchModalVisible(false)}
                      >
                        <View style={styles.noonCardImageContainer}>
                          <Image source={{ uri: item.image }} style={styles.noonCardImage} />
                          <TouchableOpacity style={styles.wishlistButton}>
                            <Heart size={18} color="#4B5563" />
                          </TouchableOpacity>
                          <View style={styles.noonBadge}>
                            <Text style={styles.noonCardBadgeText}>Featured</Text>
                          </View>
                        </View>
                        <View style={styles.noonCardContent}>
                          <Text style={styles.noonCardTitle} numberOfLines={2}>{item.title}</Text>
                          <View style={styles.ratingRow}>
                            <Text style={styles.ratingText}>★ 4.5</Text>
                            <Text style={styles.ratingCount}>(1.2k)</Text>
                          </View>
                          <Text style={styles.noonCardPrice}>{item.price}</Text>
                          <View style={styles.deliveryRow}>
                            <Text style={styles.deliveryText}>Free Delivery</Text>
                          </View>
                          <View style={styles.expressBadge}>
                            <Text style={styles.expressText}>express</Text>
                            <Text style={styles.expressDate}>Get it tomorrow</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View style={styles.emptyResults}>
                    <Search size={48} color="#E5E7EB" />
                    <Text style={styles.emptyResultsText}>No parts found for "{mainSearchQuery}"</Text>
                    <TouchableOpacity 
                      style={styles.clearSearchButton}
                      onPress={() => {
                        setIsSearchModalVisible(false);
                        setMainSearchQuery('');
                      }}
                    >
                      <Text style={styles.clearSearchText}>Clear and try again</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>

              {/* Floating Action Button */}
              {searchResults.length > 0 && (
                <View style={styles.fabContainer}>
                  <TouchableOpacity style={styles.fabButton}>
                    <Text style={styles.fabText}>Sort</Text>
                    <View style={styles.fabDivider} />
                    <Text style={styles.fabText}>Filter</Text>
                    <SlidersHorizontal size={16} color="#FFF" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.fabShare}>
                    <Share2 size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}
            </SafeAreaView>
          </View>
        </Modal>

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
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.recentScroll}
          >
            {RECENT_ITEMS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card}
              >
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
        <TouchableOpacity 
          style={styles.sellBanner}
          onPress={() => setIsSellerMode(true)}
        >
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
    justifyContent: 'center',
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
  searchResultsVertical: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  searchResultCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  emptyResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyResultsText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  clearSearchButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  clearSearchText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  searchInterfaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
    marginRight: 4,
  },
  interfaceSearchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  interfaceInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 8,
    padding: 0,
  },
  interfaceContent: {
    flex: 1,
    padding: 20,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  trendingText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#FFF',
  },
  resultsSearchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultsSearchText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  noonTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
    paddingTop: 12,
  },
  noonTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  noonTabActive: {
    position: 'relative',
  },
  noonBadgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  noonBadgeText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000',
    textTransform: 'lowercase',
  },
  noonTabSubtitle: {
    fontSize: 10,
    color: '#4B5563',
    fontWeight: '500',
  },
  noonTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '15%',
    right: '15%',
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  filterPillsScroll: {
    paddingVertical: 12,
    maxHeight: 60,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  noonCard: {
    width: (width - 16) / 2,
    padding: 8,
  },
  noonCardImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    position: 'relative',
  },
  noonCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noonBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  noonCardBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  noonCardContent: {
    paddingVertical: 8,
  },
  noonCardTitle: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
    height: 36,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  ratingCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  noonCardPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  deliveryRow: {
    marginBottom: 4,
  },
  deliveryText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  expressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expressText: {
    backgroundColor: '#FEF08A',
    color: '#854D0E',
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 4,
    borderRadius: 2,
    fontStyle: 'italic',
  },
  expressDate: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  activeRequestBanner: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  bannerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: '600',
    marginLeft: 8,
  },
  viewQuotesButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
  },
  viewQuotesText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  biddingButton: {
    marginTop: 16,
    width: '100%',
  },
  biddingButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  biddingButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  requestSummaryCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  requestSummaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  requestSummarySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  searchingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 8,
  },
  searchingText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    marginLeft: 8,
  },
  quoteCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  quoteMainInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  conditionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  conditionText: {
    fontSize: 10,
    fontWeight: '800',
  },
  quotePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563EB',
  },
  quoteActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  statusBanner: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusBannerText: {
    fontSize: 12,
    fontWeight: '800',
  },
  emptyQuotes: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyQuotesText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 16,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#111827',
  },
  rowInputs: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  fabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  fabText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  fabDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 12,
  },
  fabShare: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
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
  },
  categoryTextActive: {
    color: '#2563EB',
  },
  categoryItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 10,
    marginBottom: -12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: '85%',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 48,
    gap: 12,
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  brandList: {
    paddingHorizontal: 12,
  },
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 16,
  },
  brandIconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F9FAFB',
  },
  brandInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  brandText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});


