'use client';

import React, { useState } from 'react';
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
  Search,
  MoreVertical,
  Bell
} from 'lucide-react';

interface SellerDashboardProps {
  onBackToUser: () => void;
}

export default function SellerDashboard({ onBackToUser }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'add'>('dashboard');

  const stats = [
    { label: 'Total Sales', value: 'AED 12,450', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Orders', value: '48', icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Inventory Items', value: '156', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Views', value: '2.4k', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentOrders = [
    { id: '#ORD-7829', part: 'Toyota Camry Brake Pads', price: 'AED 150', status: 'Processing', time: '2 hours ago' },
    { id: '#ORD-7825', part: 'BMW E46 Front Bumper', price: 'AED 1,200', status: 'Shipped', time: '5 hours ago' },
    { id: '#ORD-7821', part: 'Nissan Patrol V8 Engine', price: 'AED 8,500', status: 'Delivered', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-black text-blue-600">Ramba-ho</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Seller Central</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Package size={20} />
            My Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ShoppingBag size={20} />
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'add' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <PlusCircle size={20} />
            Add New Part
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onBackToUser}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <ArrowLeft size={20} />
            Switch to Buyer
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
            <p className="text-gray-500">Welcome back, Bilal Farooq</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              BF
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Recent Orders</h3>
                  <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <ShoppingBag size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{order.part}</p>
                          <p className="text-xs text-gray-500">{order.id} • {order.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">{order.price}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Sell More Parts</h3>
                    <p className="text-blue-100 text-sm mb-4">Complete your seller profile to boost visibility by 40%.</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all">Complete Profile</button>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                    <TrendingUp size={120} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('add')} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex flex-col items-center gap-2 group">
                    <PlusCircle size={32} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="font-bold text-sm">Add Item</span>
                  </button>
                  <button className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex flex-col items-center gap-2 group">
                    <Settings size={32} className="text-gray-400 group-hover:text-blue-600" />
                    <span className="font-bold text-sm">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
             <h3 className="text-xl font-bold text-gray-900 mb-6">List a New Spare Part</h3>
             <div className="space-y-6">
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Part Photos</label>
                 <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all cursor-pointer">
                   <Camera size={48} strokeWidth={1.5} />
                   <p className="mt-2 font-medium">Click to upload photos</p>
                   <p className="text-xs">Supports JPG, PNG (Max 5MB)</p>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                 <input type="text" placeholder="e.g. Toyota Camry 2018-2023 Brake Pads" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Price (AED)</label>
                   <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
                   <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                     <option>New</option>
                     <option>Aftermarket</option>
                     <option>Used</option>
                   </select>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                 <textarea rows={4} placeholder="Describe your item..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"></textarea>
               </div>

               <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
                 List Item Now
               </button>
             </div>
          </div>
        )}

        {(activeTab === 'inventory' || activeTab === 'orders') && (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-300 mb-4">
               {activeTab === 'inventory' ? <Package size={40} /> : <ShoppingBag size={40} />}
             </div>
             <h3 className="text-xl font-bold text-gray-900">No {activeTab} yet</h3>
             <p className="text-gray-500 max-w-xs mx-auto mt-2">When you start selling, your {activeTab} will appear here for you to manage.</p>
             <button onClick={() => setActiveTab('add')} className="mt-6 bg-white border border-gray-200 px-6 py-2 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
               Add your first item
             </button>
           </div>
        )}
      </div>
    </div>
  );
}