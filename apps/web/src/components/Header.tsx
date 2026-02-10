'use client';

import { Bell, Search, Heart, MessageSquare, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const markets = [
  {
    name: 'Japanese Market',
    brands: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Lexus (Toyota)', 'Infiniti (Nissan)', 'Acura (Honda)']
  },
  {
    name: 'German Market',
    brands: ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Porsche', 'Opel']
  },
  {
    name: 'American Market',
    brands: ['Ford', 'Chevrolet (GM)', 'GMC (GM)', 'Dodge', 'Ram', 'Jeep', 'Tesla', 'Cadillac (GM)', 'Lincoln (Ford)', 'Buick (GM)']
  },
  {
    name: 'Korean Market',
    brands: ['Hyundai', 'Kia', 'Genesis']
  },
  { name: 'Community', brands: [] }
];

function NavDropdown({ name, brands, isNew }: { name: string; brands: string[]; isNew?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`
          flex items-center gap-1.5 py-3 transition-all duration-200 font-semibold text-[13px] tracking-tight
          ${isOpen ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {name}
        {isNew && (
          <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
            NEW
          </span>
        )}
        {brands.length > 0 && (
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} 
          />
        )}
      </button>

      {brands.length > 0 && (
        <>
          {/* Invisible bridge to prevent closing when moving mouse to dropdown */}
          <div className="absolute top-full left-0 w-full h-2 z-40" />
          
          <div className={`
            absolute top-[calc(100%-4px)] left-0 w-72 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 py-4 px-2
            transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top
            ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
          `}>
            <div className="mb-3 px-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Brand</span>
              <div className="h-[1px] flex-1 bg-gray-100 ml-4" />
            </div>
            <div className="grid grid-cols-1 gap-0.5">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/search?brand=${brand.split(' ')[0].toLowerCase()}`}
                  className="group flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="group-hover:text-blue-700 group-hover:font-semibold transition-all">
                    {brand}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 px-4">
              <Link 
                href="/search" 
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 justify-center"
              >
                View all parts for {name.split(' ')[0]}
              </Link>
            </div>
          </div>
        </>
      )}
    </li>
  );
}


export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            AutoPartX
          </Link>
          <div className="hidden md:flex items-center text-sm text-gray-600 gap-1 cursor-pointer hover:text-blue-600">
            <span>Abu Dhabi</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-gray-600 text-sm font-medium">
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="text-[11px]">Notifications</span>
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
              <Search size={20} />
              <span className="text-[11px]">My Searches</span>
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
              <Heart size={20} />
              <span className="text-[11px]">Favorites</span>
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors">
              <MessageSquare size={20} />
              <span className="text-[11px]">Chats</span>
            </button>
          </div>

          <div className="h-8 w-[1px] bg-gray-200 hidden lg:block mx-2"></div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={18} />
              </div>
              <span className="hidden sm:inline">Login or Sign up</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-sm">
              Place Your Ad
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <nav className="max-w-7xl mx-auto px-4 border-t border-gray-50">
        <ul className="flex flex-wrap items-center justify-center gap-x-12 text-sm font-semibold text-gray-700">
          {markets.map((market) => (
            <NavDropdown key={market.name} name={market.name} brands={market.brands} />
          ))}
        </ul>
      </nav>
    </header>
  );
}


