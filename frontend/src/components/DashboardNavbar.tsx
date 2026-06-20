import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Star, Bookmark, Settings, LogOut, Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function DashboardNavbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Derive active tab from location or just default
  let activeTab = 'Home';
  if (location.pathname.startsWith('/bookings')) activeTab = 'Bookings';
  else if (location.pathname === '/dashboard') activeTab = 'For You';

  return (
    <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex items-center justify-between z-[100] bg-transparent backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* Left: Logo */}
      <div className="flex-1 flex items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="CineNest Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </Link>
      </div>
      
      {/* Middle: Capsule Navbar */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 shadow-inner">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10`}
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'For You' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Star className="w-4 h-4" /> For You
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Search' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Search className="w-4 h-4" /> Search
          </button>
          <Link 
            to="/bookings"
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Bookings' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <Bookmark className="w-4 h-4" /> My Bookings
          </Link>
      </div>

      {/* Right: User Profile & Sign Out */}
      <div className="flex items-center gap-4">
        <div 
          className="relative cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors mr-2"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[200]">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-bold text-white text-sm tracking-widest uppercase">Notifications</h3>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">2 New</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <p className="text-sm text-white font-medium mb-1 group-hover:text-red-400 transition-colors">Booking Confirmed! 🍿</p>
                  <p className="text-xs text-gray-400">Your tickets for Barbie are confirmed. Get ready for a cinematic experience!</p>
                  <span className="text-[10px] text-gray-500 mt-2 block">Just now</span>
                </div>
                <div className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                  <p className="text-sm text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">Exclusive Offer 🎟️</p>
                  <p className="text-xs text-gray-400">Grab 50% off on all large popcorn combos today! Use code POP50.</p>
                  <span className="text-[10px] text-gray-500 mt-2 block">2 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <div 
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-white to-gray-300 text-black flex items-center justify-center text-xs font-bold shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || 'V'}
            </div>
            <span className="text-sm font-medium hidden sm:block tracking-wide">{user?.name || 'Vanshika'}</span>
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm text-white font-medium">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <div className="py-2">
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/dashboard?tab=Settings');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
              <div className="pt-2 border-t border-white/5">
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
