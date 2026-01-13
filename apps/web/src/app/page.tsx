import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Image from 'next/image';

const RECENT_ITEMS = [
  { id: 1, title: 'Toyota Camry Brake Pads', price: 'AED 150', location: 'Sharjah Industrial', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'BMW E46 M3 Front Bumper', price: 'AED 1,200', location: 'Musaffah, Abu Dhabi', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Nissan Patrol V8 Engine', price: 'AED 8,500', location: 'Sajja, Sharjah', image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Mercedes G-Wagon Grill', price: 'AED 450', location: 'Al Quoz, Dubai', image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=400' },
  { id: 5, title: 'Honda Civic Headlights', price: 'AED 300', location: 'Ajman', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=400' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Recently added parts</h2>
          <button className="text-blue-600 font-semibold hover:underline">View all</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {RECENT_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg font-bold text-blue-600 mb-1">{item.price}</p>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Looking to sell your spare parts?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Reach thousands of buyers in UAE. List your items for free today.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95">
              Get started now
            </button>
          </div>
          <div className="relative h-64 w-full md:w-1/2">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
             <img 
               src="https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=800" 
               alt="Auto Parts"
               className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
             />
          </div>
        </div>
      </div>
    </main>
  );
}
