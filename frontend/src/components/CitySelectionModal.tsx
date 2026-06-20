import { useState } from 'react';
import { useCityStore } from '../store/useCityStore';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POPULAR_CITIES = ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Hyderabad', 'Chandigarh', 'Chennai', 'Pune', 'Kolkata'];

export function CitySelectionModal() {
  const setCity = useCityStore((state) => state.setCity);
  const [search, setSearch] = useState('');

  const handleCitySelect = (city: string) => {
    setCity(city);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-black/90 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-crimson-red/10"
        >
          {/* Header */}
          <div className="p-6 text-center border-b border-white/10">
            <h2 className="text-2xl font-heading font-semibold text-white">Select Your City</h2>
            <p className="text-gray-400 mt-2 text-sm">Choose your location to find movies and events near you.</p>
          </div>

          {/* Search Bar */}
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for your city..."
                className="w-full bg-midnight-black border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent transition-all"
              />
            </div>
            <button className="flex items-center justify-center w-full mt-4 text-crimson-red hover:text-rose-400 font-medium text-sm transition-colors py-2">
              <MapPin className="h-4 w-4 mr-2" /> Detect my location automatically
            </button>
          </div>

          {/* Popular Cities */}
          <div className="bg-midnight-black p-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Popular Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {POPULAR_CITIES.filter(c => c.toLowerCase().includes(search.toLowerCase())).map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-gray-900/50 hover:bg-gray-800 hover:border-crimson-red/50 hover:shadow-lg hover:shadow-crimson-red/5 transition-all group"
                >
                  <span className="text-gray-300 group-hover:text-white font-medium">{city}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
