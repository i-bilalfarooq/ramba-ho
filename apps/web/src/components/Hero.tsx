'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, Car, MapPin, X, Heart } from 'lucide-react';

const CATEGORIES = [
  { id: 'japanese', name: 'Japanese Market', brands: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Lexus', 'Infiniti', 'Acura'] },
  { id: 'german', name: 'German Market', brands: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche', 'Opel'] },
  { id: 'american', name: 'American Market', brands: ['Ford', 'Chevrolet', 'GMC', 'Dodge', 'Ram', 'Jeep', 'Tesla', 'Cadillac', 'Lincoln', 'Buick'] },
  { id: 'korean', name: 'Korean Market', brands: ['Hyundai', 'Kia', 'Genesis'] },
];

const DUMMY_PARTS = [
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

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Select Brand');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'aftermarket' | 'used'>('new');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);
    return DUMMY_PARTS.filter(item => {
      const itemTitle = item.title.toLowerCase();
      
      // Filter by search terms
      const matchesSearch = searchTerms.every(term => itemTitle.includes(term));
      if (!matchesSearch) return false;

      // Filter by active tab (for demonstration)
      if (activeTab === 'new') return true;
      if (activeTab === 'aftermarket') return itemTitle.includes('brake');
      if (activeTab === 'used') return itemTitle.includes('engine');

      return true;
    });
  }, [searchQuery, activeTab]);

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      setIsSearchOverlayOpen(false);
      setIsSearchModalOpen(true);
    }
  };

  const handleTrendingClick = (query: string) => {
    setSearchQuery(query);
    setIsSearchOverlayOpen(false);
    setIsSearchModalOpen(true);
  };

  return (
    <section className="relative w-full h-[450px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight">
          Find Genuine Parts for Your Vehicle in UAE
        </h1>

        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20">
          <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row items-stretch gap-2">
            
            {/* Market Category Dropdown */}
            <div className="relative flex-1 group">
              <button 
                onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsBrandOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border-b md:border-b-0 md:border-r border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Car size={18} className="text-blue-600" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Market</p>
                    <p className="text-sm font-semibold truncate">{selectedCategory.name}</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedBrand('Select Brand');
                        setIsCategoryOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                    >
                      {cat.name}
                      {selectedCategory.id === cat.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="relative flex-1 group">
              <button 
                onClick={() => {
                    setIsBrandOpen(!isBrandOpen);
                    setIsCategoryOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border-b md:border-b-0 md:border-r border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4.5 h-4.5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">B</div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Brand</p>
                    <p className="text-sm font-semibold truncate">{selectedBrand}</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isBrandOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBrandOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 grid grid-cols-2 gap-1 p-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                  {selectedCategory.brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setIsBrandOpen(false);
                      }}
                      className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="flex-[2] flex items-center px-4 relative group/search">
              <Search size={20} className="text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search for parts like 'Brake Pads' or 'V6 Engine'..."
                className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-sm placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOverlayOpen(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchQuery.length > 0 && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}

              {/* Step 2: Search Overlay */}
              {isSearchOverlayOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSearchOverlayOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Search size={16} className="text-blue-600" />
                      Trending searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((query) => (
                        <button
                          key={query}
                          onClick={() => handleTrendingClick(query)}
                          className="px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full text-xs font-semibold transition-all border border-gray-100 hover:border-blue-100 flex items-center gap-2"
                        >
                          <Search size={12} />
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results Modal / Overlay */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSearchModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-8 py-4 border-b border-gray-100 flex items-center gap-4 bg-white sticky top-0 z-10">
              <button 
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setIsSearchOverlayOpen(true);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border border-gray-200">
                  <Search size={18} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">{searchQuery}</span>
                </div>
              </div>
            </div>

            {/* Tabs & Filters Bar (Noon Style) */}
            <div className="px-8 border-b border-gray-100 bg-white pt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-12">
                  <div 
                    onClick={() => setActiveTab('new')}
                    className={`flex flex-col items-center pb-4 border-b-2 cursor-pointer relative transition-all ${activeTab === 'new' ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="bg-[#4ADE80] px-3 py-0.5 rounded text-[13px] font-black lowercase text-black mb-1">new</div>
                    <span className="text-[10px] font-medium text-gray-500">genuine parts</span>
                  </div>
                  
                  <div 
                    onClick={() => setActiveTab('aftermarket')}
                    className={`flex flex-col items-center pb-4 border-b-2 cursor-pointer transition-all ${activeTab === 'aftermarket' ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="bg-[#FFE000] px-3 py-0.5 rounded text-[13px] font-black italic lowercase text-black mb-1">aftermarket</div>
                    <span className="text-[10px] font-medium text-gray-500">quality alternatives</span>
                  </div>

                  <div 
                    onClick={() => setActiveTab('used')}
                    className={`flex flex-col items-center pb-4 border-b-2 cursor-pointer transition-all ${activeTab === 'used' ? 'border-black' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <div className="bg-[#94A3B8] px-3 py-0.5 rounded text-[13px] font-black lowercase text-white mb-1">used</div>
                    <span className="text-[10px] font-medium text-gray-500">pre-owned parts</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1">
                    Deals <ChevronDown size={12} />
                  </button>
                  <button className="px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1">
                    Brand <ChevronDown size={12} />
                  </button>
                  <button className="px-4 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center gap-1">
                    Compatibility <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30">
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
                    >
                      <div className="aspect-square overflow-hidden relative bg-gray-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                          <Heart size={18} />
                        </button>
                        <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-2 py-0.5 rounded">
                          FEATURED
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-xs font-bold text-green-600">★ 4.5</span>
                          <span className="text-[10px] text-gray-400">(1.2k)</span>
                        </div>
                        <div className="mt-auto">
                          <p className="text-lg font-black text-gray-900">{item.price}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-green-600">Free Delivery</span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5">
                            <span className="bg-yellow-100 text-yellow-800 text-[9px] font-black px-1.5 py-0.5 rounded italic">express</span>
                            <span className="text-[10px] text-gray-500 font-semibold">Get it tomorrow</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mb-8">
                    We couldn't find any parts matching "{searchQuery}". Try different keywords.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
