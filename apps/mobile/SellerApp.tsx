import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  TextInput
} from 'react-native';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  PlusCircle, 
  ArrowLeft,
  Settings,
  TrendingUp,
  Clock,
  ChevronRight,
  Camera,
  CheckCircle2,
  X,
  Send,
  Bell
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal } from 'react-native';

const { width } = Dimensions.get('window');

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

interface SellerAppProps {
  onBackToUser: () => void;
  activeRequests?: BiddingRequest[];
  onSendQuote?: (quote: Quote) => void;
}

export default function SellerApp({ onBackToUser, activeRequests = [], onSendQuote }: SellerAppProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'requests' | 'add'>('dashboard');
  const [selectedRequest, setSelectedRequest] = useState<BiddingRequest | null>(null);
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);
  const [quoteData, setQuoteData] = useState({ price: '', condition: 'new' as const });

  const activeSearchingRequests = activeRequests.filter(r => r.status === 'searching' || r.status === 'quotes_received');

  const handleSendQuote = () => {
    if (!onSendQuote || !selectedRequest) return;
    
    const newQuote: Quote = {
      id: Math.random().toString(36).substr(2, 9),
      sellerName: 'Al Baraka Spare Parts',
      price: `AED ${quoteData.price}`,
      condition: quoteData.condition,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400',
      status: 'pending'
    };

    onSendQuote(newQuote);
    setIsQuoteModalVisible(false);
    setSelectedRequest(null);
    setQuoteData({ price: '', condition: 'new' });
  };

  const renderDashboard = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
      {/* Real-time Bidding Requests Notification */}
      {activeRequests.length > 0 && activeRequests.some(r => r.status === 'searching') && (
        <View style={styles.notificationBanner}>
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            style={styles.notificationGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.notificationIcon}>
              <Bell size={20} color="#FFF" />
            </View>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationTitle}>New Part Request!</Text>
              <Text style={styles.notificationSubtitle}>A customer is looking for {activeRequests[0].partName}</Text>
            </View>
            <TouchableOpacity 
              style={styles.quoteNowButton}
              onPress={() => setSelectedRequest(activeRequests[0])}
            >
              <Text style={styles.quoteNowText}>Quote Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Seller Dashboard</Text>
        <Text style={styles.welcomeSubtitle}>Track your sales and inventory</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <TouchableOpacity 
          style={styles.statCard}
          onPress={() => setActiveTab('requests')}
        >
          <View style={[styles.statIconContainer, { backgroundColor: '#EEF2FF' }]}>
            <Bell size={20} color="#4F46E5" />
          </View>
          <Text style={styles.statValue}>{activeSearchingRequests.length}</Text>
          <Text style={styles.statLabel}>Live Requests</Text>
        </TouchableOpacity>
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, { backgroundColor: '#E0F2FE' }]}>
            <TrendingUp size={20} color="#0369A1" />
          </View>
          <Text style={styles.statValue}>AED 12,450</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </View>
      </View>

      {/* Recent Orders Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
      </View>

      <View style={styles.orderItem}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>#ORD-7829</Text>
          <View style={styles.statusBadge}><Text style={styles.statusText}>Processing</Text></View>
        </View>
        <Text style={styles.orderPartName}>Toyota Camry Brake Pads</Text>
        <View style={styles.orderFooter}>
          <Text style={styles.orderPrice}>AED 150</Text>
          <Text style={styles.orderTime}>2 hours ago</Text>
        </View>
      </View>

      <View style={styles.orderItem}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>#ORD-7825</Text>
          <View style={[styles.statusBadge, { backgroundColor: '#F0FDF4' }]}><Text style={[styles.statusText, { color: '#15803D' }]}>Shipped</Text></View>
        </View>
        <Text style={styles.orderPartName}>BMW E46 Front Bumper</Text>
        <View style={styles.orderFooter}>
          <Text style={styles.orderPrice}>AED 1,200</Text>
          <Text style={styles.orderTime}>5 hours ago</Text>
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  const renderAddProduct = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>List New Part</Text>
        <Text style={styles.welcomeSubtitle}>Fill in the details to list your spare part</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Part Photos</Text>
        <View style={styles.photoUploadGrid}>
          <TouchableOpacity style={styles.photoUploadBox}>
            <Camera size={24} color="#9CA3AF" />
            <Text style={styles.photoUploadText}>Add Photo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>Part Title</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="e.g. Toyota Corolla 2020 Left Headlight"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.inputLabel}>Category</Text>
        <TouchableOpacity style={styles.selectorButton}>
          <Text style={styles.selectorButtonText}>Select Category</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={styles.rowInputs}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.inputLabel}>Price (AED)</Text>
            <TextInput 
              style={styles.textInput} 
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.inputLabel}>Condition</Text>
            <TouchableOpacity style={styles.selectorButton}>
              <Text style={styles.selectorButtonText}>New</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput 
          style={[styles.textInput, { height: 100, textAlignVertical: 'top' }]} 
          placeholder="Describe the condition and fitment details..."
          multiline
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>List Part Now</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBackToUser} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ramba-ho Seller</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Settings size={22} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'add' && renderAddProduct()}

      {/* Incoming Request Details Modal */}
      <Modal
        visible={!!selectedRequest}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedRequest(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Incoming Request</Text>
              <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                <X size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {selectedRequest && (
              <ScrollView style={{ padding: 20 }}>
                <View style={styles.requestDetailCard}>
                  <Text style={styles.requestPartName}>{selectedRequest.partName}</Text>
                  <View style={styles.requestSpecs}>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Make</Text>
                      <Text style={styles.specValue}>{selectedRequest.make}</Text>
                    </View>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Model</Text>
                      <Text style={styles.specValue}>{selectedRequest.model}</Text>
                    </View>
                    <View style={styles.specItem}>
                      <Text style={styles.specLabel}>Year</Text>
                      <Text style={styles.specValue}>{selectedRequest.year}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.inputLabel}>Quote Price (AED)</Text>
                <TextInput 
                  style={styles.textInput} 
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={quoteData.price}
                  onChangeText={(val) => setQuoteData(prev => ({ ...prev, price: val }))}
                />

                <Text style={styles.inputLabel}>Part Condition</Text>
                <View style={styles.conditionRow}>
                  {(['new', 'aftermarket', 'used'] as const).map((cond) => (
                    <TouchableOpacity 
                      key={cond}
                      style={[
                        styles.conditionChip, 
                        quoteData.condition === cond && styles.conditionChipActive
                      ]}
                      onPress={() => setQuoteData(prev => ({ ...prev, condition: cond }))}
                    >
                      <Text style={[
                        styles.conditionChipText,
                        quoteData.condition === cond && styles.conditionChipTextActive
                      ]}>{cond.toUpperCase()}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                  style={[styles.submitButton, !quoteData.price && { opacity: 0.5 }]}
                  onPress={handleSendQuote}
                  disabled={!quoteData.price}
                >
                  <Send size={18} color="#FFF" style={{ marginRight: 8 }} />
                  <Text style={styles.submitButtonText}>Submit Quote</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {activeTab === 'inventory' && (
        <View style={styles.emptyState}>
          <Package size={64} color="#E5E7EB" />
          <Text style={styles.emptyStateTitle}>No Inventory Yet</Text>
          <Text style={styles.emptyStateSubtitle}>Start listing your parts to see them here.</Text>
          <TouchableOpacity onPress={() => setActiveTab('add')} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Add First Part</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab === 'orders' && (
        <View style={styles.emptyState}>
          <ShoppingBag size={64} color="#E5E7EB" />
          <Text style={styles.emptyStateTitle}>No Active Orders</Text>
          <Text style={styles.emptyStateSubtitle}>When customers buy your parts, orders will appear here.</Text>
        </View>
      )}
      {activeTab === 'requests' && (
        <ScrollView style={styles.scrollContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Live Requests</Text>
            <Text style={styles.welcomeSubtitle}>Active parts requests from customers</Text>
          </View>
          
          {activeSearchingRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Bell size={64} color="#E5E7EB" />
              <Text style={styles.emptyStateTitle}>No Live Requests</Text>
              <Text style={styles.emptyStateSubtitle}>Active customer requests will appear here in real-time.</Text>
            </View>
          ) : (
            <View style={{ padding: 20 }}>
              {activeSearchingRequests.map((request) => (
                <TouchableOpacity 
                  key={request.id} 
                  style={styles.requestItem}
                  onPress={() => setSelectedRequest(request)}
                >
                  <View style={styles.requestItemHeader}>
                    <Text style={styles.requestItemPartName}>{request.partName}</Text>
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  </View>
                  <Text style={styles.requestItemDetails}>
                    {request.make} {request.model} • {request.year}
                  </Text>
                  <TouchableOpacity 
                    style={styles.itemQuoteButton}
                    onPress={() => setSelectedRequest(request)}
                  >
                    <Text style={styles.itemQuoteButtonText}>Send Quote</Text>
                    <ChevronRight size={16} color="#2563EB" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={24} color={activeTab === 'dashboard' ? '#2563EB' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'dashboard' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('requests')}
        >
          <View>
            <Bell size={24} color={activeTab === 'requests' ? '#2563EB' : '#9CA3AF'} />
            {activeSearchingRequests.length > 0 && <View style={styles.navBadge} />}
          </View>
          <Text style={[styles.navText, activeTab === 'requests' && styles.navTextActive]}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('inventory')}
        >
          <Package size={24} color={activeTab === 'inventory' ? '#2563EB' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'inventory' && styles.navTextActive]}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('orders')}
        >
          <ShoppingBag size={24} color={activeTab === 'orders' ? '#2563EB' : '#9CA3AF'} />
          <Text style={[styles.navText, activeTab === 'orders' && styles.navTextActive]}>Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: -8,
  },
  scrollContent: {
    flex: 1,
  },
  welcomeSection: {
    padding: 24,
    backgroundColor: '#FFF',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: '#F3F4F6',
    borderBottomColor: '#E5E7EB',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  orderItem: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  statusBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  orderPartName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  orderTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  navBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  requestItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  requestItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestItemPartName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EF4444',
  },
  requestItemDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  itemQuoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  itemQuoteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  addNavItem: {
    marginTop: -40,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  formContainer: {
    padding: 24,
    backgroundColor: '#FFF',
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
  photoUploadGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  photoUploadBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '600',
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
  },
  selectorButtonText: {
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
  notificationBanner: {
    padding: 16,
    paddingBottom: 0,
  },
  notificationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  notificationSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  quoteNowButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quoteNowText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '60%',
    maxHeight: '90%',
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  requestDetailCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  requestPartName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  requestSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    flex: 1,
  },
  specLabel: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 2,
  },
  conditionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  conditionChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  conditionChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  conditionChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  conditionChipTextActive: {
    color: '#FFF',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
  }
});