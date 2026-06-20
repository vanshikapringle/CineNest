import { MapPin, Menu, UserCircle, LogOut } from 'lucide-react';
import { useCityStore } from '../store/useCityStore';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useLocation } from 'react-router-dom';

export function Navbar() {
  const selectedCity = useCityStore((state) => state.selectedCity);
  const clearCity = useCityStore((state) => state.clearCity);
  const { user, isAuthenticated, isDevAuth, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/bookings') || 
    location.pathname.startsWith('/booking') || 
    location.pathname.startsWith('/book') || 
    location.pathname.startsWith('/movie') ||
    location.pathname.startsWith('/payment') ||
    location.pathname.startsWith('/ticket') ||
    location.pathname.startsWith('/summary');

  if (isDashboardRoute) {
    return null;
  }

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="flex items-center hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="CineNest Logo" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
            </Link>
          </div>

          {/* Anchor Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
            <a href="#movies" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Movies</a>
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQs</a>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              onClick={clearCity}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {selectedCity || 'Select City'}
              <MapPin className="ml-1 h-4 w-4" />
            </button>
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <UserCircle className="w-4 h-4" />
                      My Bookings
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="block">
                <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md">
                  Sign In
                </button>
              </Link>
            )}
            <button className="text-gray-400 hover:text-white p-2 md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>
    </nav>
    </>
  );
}
