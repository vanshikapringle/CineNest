import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMovies, searchMovies } from '../services/api';
import { MovieCard } from '../components/MovieCard';
import { Search, Home, Star, Bookmark, Settings, LogOut, Bell, Calendar, Ticket, Filter } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Any Year');
  const [activeTab, setActiveTab] = useState('Home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const queryClient = useQueryClient();

  useEffect(() => {
    // Invalidate movies cache on mount to ensure fresh UUIDs
    queryClient.invalidateQueries({ queryKey: ['movies'] });
  }, [queryClient]);

  const years = ["Any Year", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: movies, isLoading, isError, error } = useQuery({
    queryKey: ['movies', debouncedQuery, selectedYear],
    queryFn: async () => {
      if (debouncedQuery.trim()) {
        return searchMovies(debouncedQuery);
      }
      return getMovies(undefined, undefined, selectedYear === 'Any Year' ? undefined : selectedYear);
    }
  });

  // Pagination Logic
  const totalPages = movies ? Math.ceil(movies.length / itemsPerPage) : 0;
  const currentMovies = movies ? movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  // Reset page when search or year changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, selectedYear]);

  return (
    <div 
      className="min-h-[100vh] font-body flex flex-col pb-20 md:pb-0 relative bg-cover bg-center bg-fixed text-white -mt-20"
      style={{ backgroundImage: `url('/dashboard-bg.jpg.jpeg')` }}
    >
      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0a0a0a]/80 to-[#050505] pointer-events-none"></div>
      
      {/* Unified Top Navbar */}
      <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex items-center justify-between z-[100] bg-transparent backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="CineNest Logo" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        </Link>
        
        {/* Middle: Capsule Navbar */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 shadow-inner">
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button 
              onClick={() => setActiveTab('For You')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'For You' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <Star className="w-4 h-4" /> For You
            </button>
            <button 
              onClick={() => setActiveTab('Search')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Search' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <Search className="w-4 h-4" /> Search
            </button>
            <Link 
              to="/bookings"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10`}
            >
              <Bookmark className="w-4 h-4" /> My Bookings
            </Link>
            <button 
              onClick={() => setActiveTab('Settings')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Settings' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
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
                  <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-300 font-medium mb-1">Upcoming Premiere</p>
                    <p className="text-xs text-gray-500">Don't miss the midnight release of Oppenheimer this weekend.</p>
                    <span className="text-[10px] text-gray-600 mt-2 block">1 day ago</span>
                  </div>
                </div>
                <div className="p-3 text-center border-t border-white/10 bg-black/50 hover:bg-white/5 transition-colors cursor-pointer">
                  <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Mark all as read</span>
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
                      setActiveTab('Settings');
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
          
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 px-4 py-2 rounded-full text-sm font-medium transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-32 relative z-10 w-full">

        {/* Settings View */}
        {activeTab === 'Settings' && (
          <div className="max-w-4xl mx-auto w-full px-6 mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
            <div 
              className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/20 rounded-3xl p-10 shadow-2xl relative overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url('/film-grain-overlay.jpeg')`, backgroundBlendMode: 'overlay' }}
            >
              <h2 className="text-3xl font-light text-white mb-6 border-b border-white/10 pb-4">Account Settings</h2>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 uppercase tracking-widest">Name</label>
                  <input type="text" value={user?.name} disabled className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 uppercase tracking-widest">Email</label>
                  <input type="text" value={user?.email || 'user@cinenest.com'} disabled className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none" />
                </div>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold mt-4 hover:scale-105 transition-all w-full md:w-auto uppercase tracking-widest text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cinematic Welcome Section */}
        {activeTab !== 'Settings' && (
          <div className="w-full text-center mb-12 px-4">
            <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-500 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] font-light tracking-tight mb-4">
              Welcome back, {user?.name || 'Vanshika'}.
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-light tracking-widest uppercase">Your Cinematic Universe Awaits</p>
          </div>
        )}

        {/* Search Bar */}
        {activeTab === 'Search' && (
          <div className="max-w-4xl mx-auto w-full px-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover:blur-xl transition-all duration-500"></div>
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 z-10" />
              <input 
                type="text" 
                placeholder="Search your next masterpiece..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050505]/60 backdrop-blur-2xl border border-white/20 text-white pl-20 pr-8 py-5 rounded-full focus:outline-none focus:border-white/50 transition-all shadow-2xl text-xl relative z-0"
              />
            </div>
          </div>
        )}

        {/* Only show movies if not in settings */}
        {activeTab !== 'Settings' && (
          <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 flex-1">
            
            {/* Section Header */}
            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
              <h2 className="text-2xl font-light text-white tracking-wide">
                {searchQuery ? 'Search Results' : 'Now Showing'}
              </h2>
              <button className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                View All <span className="text-xl leading-none">&rsaquo;</span>
              </button>
            </div>

          {/* Movies Grid */}
          {isLoading ? (
            <div className="flex justify-center py-32">
              <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white animate-spin shadow-[0_0_30px_rgba(255,255,255,0.5)]"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-32 text-red-400 bg-red-900/20 border border-red-500/30 rounded-3xl m-8">
              <p className="text-2xl font-semibold mb-2">Error loading movies</p>
              <p className="text-sm">{(error as any)?.message || 'Please check if your backend services are running and hard refresh (Ctrl+F5) the page.'}</p>
            </div>
          ) : currentMovies && currentMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
                {currentMovies.map((movie: any, idx: number) => (
                  <div 
                    key={movie.id} 
                    className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 border border-white/5 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#050505]"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* NEW Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-black text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] tracking-widest">
                      NEW
                    </div>
                    
                    {/* Image */}
                    <div className="aspect-[2/3] w-full overflow-hidden">
                      <img 
                        src={movie.posterUrl || 'https://picsum.photos/400/600'} 
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    
                    {/* Ultra-Premium Gradient Overlay & Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white leading-snug mb-2 font-heading">{movie.title}</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold text-white/70 tracking-widest uppercase border border-white/20 px-2 py-1 rounded">
                            {movie.genres && movie.genres.length > 0 ? movie.genres[0].name : 'Drama'}
                          </span>
                          <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400" /> {movie.imdbRating}
                          </span>
                        </div>
                        <Link to={`/movie/${movie.id}`} className="w-full bg-white text-black text-center py-3 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-200 hover:scale-105 transition-all block uppercase tracking-widest">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pb-32">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-white"
                  >
                    Prev
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      // Simple logic to show current, first, last, and neighbors
                      if (
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                              currentPage === pageNum 
                                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                                : 'bg-white/5 hover:bg-white/10 text-white'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 || 
                        pageNum === currentPage + 2
                      ) {
                        return <span key={pageNum} className="text-white/50 w-10 h-10 flex items-center justify-center">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white/5 hover:bg-white/10 text-white"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-32 text-gray-300">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-3xl font-light mb-4">No movies found</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedYear('Any Year'); }}
                className="text-black bg-white px-8 py-3 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all tracking-widest uppercase text-sm mt-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        )}
      </main>
    </div>
  );
}
