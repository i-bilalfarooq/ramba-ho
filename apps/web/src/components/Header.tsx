import { Bell, Search, Heart, MessageSquare, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
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
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <ul className="flex items-center gap-8 text-sm font-semibold text-gray-700 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <li className="relative">
            <Link href="#" className="hover:text-blue-600 flex items-center gap-1 group">
              Motors <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-full uppercase">New</span>
            </Link>
          </li>
          <li><Link href="#" className="hover:text-blue-600">Japanese Market</Link></li>
          <li><Link href="#" className="hover:text-blue-600">German Market</Link></li>
          <li><Link href="#" className="hover:text-blue-600">American Market</Link></li>
          <li><Link href="#" className="hover:text-blue-600">Korean Market</Link></li>
          <li><Link href="#" className="hover:text-blue-600">British Market</Link></li>
          <li><Link href="#" className="hover:text-blue-600">Luxury Parts</Link></li>
          <li><Link href="#" className="hover:text-blue-600">Community</Link></li>
        </ul>
      </nav>
    </header>
  );
}
