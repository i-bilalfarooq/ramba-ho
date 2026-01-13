'use client';

import { useState } from 'react';
import { Search, ChevronDown, Car } from 'lucide-react';

const CATEGORIES = [
  { id: 'japanese', name: 'Japanese Market', brands: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Mitsubishi', 'Subaru', 'Lexus'] },
  { id: 'german', name: 'German Market', brands: ['Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Porsche', 'Opel'] },
  { id: 'american', name: 'American Market', brands: ['Ford', 'Chevrolet', 'Dodge', 'Jeep', 'GMC', 'Tesla', 'Cadillac'] },
  { id: 'korean', name: 'Korean Market', brands: ['Hyundai', 'Kia', 'Genesis'] },
  { id: 'british', name: 'British Market', brands: ['Land Rover', 'Jaguar', 'Mini', 'Bentley', 'Rolls-Royce', 'Aston Martin'] },
];

export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('Select Brand');

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
            <div className="flex-[2] flex items-center px-4">
              <Search size={20} className="text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search for parts like 'Brake Pads' or 'V6 Engine'..."
                className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-sm placeholder-gray-400"
              />
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
