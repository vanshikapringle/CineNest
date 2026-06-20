import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Star, Clock, Calendar, Share2, Heart, Home, Search, Bookmark, Settings, Play, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

export function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });

  const fallbackCrew = [
    { name: "Timothée Chalamet", role: "Actor", photoUrl: "https://image.tmdb.org/t/p/w200/npscVnADx5O7H8a9Q4wWd7K9I5s.jpg" }
  ];

  const displayCrew = movie?.crew && movie.crew.length > 0 ? movie.crew : fallbackCrew;

  if (isLoading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-gray-400">Loading movie details...</div>;
  }

  if (isError || !movie) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-crimson-red">Failed to load movie. Is the backend running?</div>;
  }

  // Ensure certification and duration exist
  const certification = movie.certification || 'U/A';
  const language = movie.language || 'English';
  const hours = Math.floor((movie.duration || 120) / 60);
  const minutes = (movie.duration || 120) % 60;
  const durationText = `${hours}h ${minutes}m`;

  return (
    <div className="min-h-screen bg-[#050505] pb-20 relative font-body text-soft-white">
      
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex items-center justify-between z-[100] bg-transparent backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="CineNest Logo" className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 shadow-inner backdrop-blur-md">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"><Home className="w-4 h-4" /> Home</button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-white bg-white/10 shadow-lg"><Star className="w-4 h-4" /> Movies</button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"><Search className="w-4 h-4" /> Search</button>
            <Link to="/bookings" className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"><Bookmark className="w-4 h-4" /> Bookings</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-white to-gray-300 text-black flex items-center justify-center text-xs font-bold shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || 'V'}
            </div>
            <span className="text-sm font-medium hidden sm:block tracking-wide text-white">{user?.name || 'User'}</span>
          </div>
        </div>
      </header>

      {/* Hero Banner Section (Zomato Style) */}
      <div className="relative w-full h-[65vh] lg:h-[75vh] flex items-center">
        {/* Background Banner */}
        <div className="absolute inset-0 z-0">
          <img 
            src={movie.bannerUrl || movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000'} 
            alt="Banner" 
            onError={(e) => { e.currentTarget.src = movie.posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000'; }}
            className="w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 mt-20 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          
          {/* Left Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-tight drop-shadow-xl">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 text-lg text-gray-300 mb-6 font-medium">
              <span className="bg-white/10 px-3 py-1 rounded text-white border border-white/10 backdrop-blur-md">{certification}</span>
              <span>|</span>
              <span>{language}</span>
              <span>|</span>
              <span>{durationText}</span>
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 line-clamp-4">
              {movie.description || "A modern look at love, friendship, and emotional entanglements. This cinematic journey builds on relationships in a vibrant world."}
            </p>

            {/* Ratings Section */}
            <div className="flex items-center gap-6 mb-6">
              {movie.imdbRating && (
                <div className="flex items-center gap-2">
                  <img src="/IMDb.svg" alt="IMDb" className="h-6 object-contain" />
                  <span className="text-xl font-bold text-white">{movie.imdbRating}/10</span>
                </div>
              )}
              {movie.rottenTomatoesRating && (
                <div className="flex items-center gap-2">
                  <img src="/RT.svg" alt="Rotten Tomatoes" className="h-7 object-contain" />
                  <span className="text-xl font-bold text-white">{movie.rottenTomatoesRating}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              {movie.genres?.map((g: any) => (
                <span key={g.name} className="px-4 py-1.5 bg-gray-800/50 rounded-full border border-gray-600/50 text-sm text-gray-200">
                  {g.name}
                </span>
              ))}
              {(!movie.genres || movie.genres.length === 0) && (
                <>
                  <span className="px-4 py-1.5 bg-gray-800/50 rounded-full border border-gray-600/50 text-sm text-gray-200">Drama</span>
                  <span className="px-4 py-1.5 bg-gray-800/50 rounded-full border border-gray-600/50 text-sm text-gray-200">Romance</span>
                </>
              )}
            </div>

            <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Releasing {movie.releaseDate || '19 June 2026'}
            </div>

            <Link 
              to={`/booking/${id}`}
              className="inline-flex items-center justify-center px-10 py-4 text-white rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
              style={{ backgroundColor: movie.accentColor || '#14b8a6' }}
            >
              Book Tickets
            </Link>
          </motion.div>

          {/* Right Floating Poster */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block relative w-72 lg:w-80 shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border-4 border-white/10 group">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              
              {/* Play Trailer Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                 <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                 </div>
              </div>

              {/* Title Bar at bottom like Zomato */}
              <div className="absolute bottom-0 w-full p-4 text-center" style={{ backgroundColor: movie.accentColor || '#14b8a6' }}>
                <span className="text-white font-heading font-bold text-xl uppercase tracking-wider shadow-sm">{movie.title}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Cast & Crew Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-4">Cast & Crew</h2>
        
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {displayCrew.map((member: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center shrink-0 w-28 group">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#14b8a6] transition-colors duration-300 shadow-xl">
                <img 
                  src={member.photoUrl || member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} 
                  alt={member.name} 
                  onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=14b8a6&color=fff&size=200`; }}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-white text-sm font-semibold text-center leading-tight mb-1">{member.name}</span>
              <span className="text-gray-400 text-xs text-center uppercase tracking-wider">{member.role}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
