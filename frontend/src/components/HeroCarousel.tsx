import { motion } from 'framer-motion';
import { ArrowRight, Star, Film, MonitorPlay, Video, Clapperboard, MonitorUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroCarousel() {
  const studios = [
    { name: "Marvel", logo: "/Marvel_Logo.svg" },
    { name: "Paramount", logo: "/Paramount_logo.svg" },
    { name: "Pixar", logo: "/Pixar_logo.svg" },
    { name: "Sony Pictures", logo: "/Sony_Pictures_logo.svg" },
    { name: "Lionsgate", logo: "/Lionsgate_logo.svg" },
    { name: "Warner Bros", logo: "/warner_bros_logo.svg" },
    { name: "Universal", logo: "/universal_logo.png" },
    { name: "Disney", logo: "/Disney_logo.svg" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] flex flex-col items-center pt-32 sm:pt-40">
      {/* Background Image: Official Asset (kept subtle to match the dark aesthetic) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen"
        style={{ backgroundImage: 'url("/hero-cinematic-glow.png")' }}
      />
      
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 film-grain opacity-[0.03]" />

      {/* Tiny Sparkle Accents (like in the reference) */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)] animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)] animate-pulse delay-75" />
      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.5)] animate-pulse delay-150" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.6)] animate-pulse delay-300" />
      <div className="absolute top-[15%] right-[15%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.9)] animate-pulse delay-200" />
      <div className="absolute top-[45%] right-[10%] w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] animate-pulse delay-500" />
      <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.7)] animate-pulse delay-700" />
      <div className="absolute top-[80%] right-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_12px_2px_rgba(255,255,255,0.5)] animate-pulse delay-[1000ms]" />
      <div className="absolute top-[30%] left-[5%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_18px_4px_rgba(255,255,255,0.8)] animate-pulse delay-[1200ms]" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 sm:px-6">
        
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <Star className="w-3.5 h-3.5 text-gray-300 fill-gray-300" />
          <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
            1M+ moviegoers trust us
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="text-5xl sm:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          Experience Cinema <br />
          <span className="font-['Playfair_Display'] italic text-gray-300 font-medium">That Truly Matters</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed mb-10"
        >
          Track, book, and elevate your movie experience based on real-time availability and premium seating options.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link to="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-8 py-3.5 rounded-full font-medium text-sm transition-colors">
              Begin Booking
            </button>
          </Link>
          <a href="#movies" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3.5 rounded-full font-medium text-sm transition-colors backdrop-blur-md">
              Explore Movies
              <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </motion.div>
      </div>

      {/* Curved Horizon & Studio Carousel Wrapper */}
      <div className="relative w-full flex-grow mt-20 flex flex-col items-center justify-end overflow-hidden pb-12">
        {/* Massive curved glow mimicking a planet horizon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[1000px] rounded-[100%] bg-white/[0.02] border-t border-white/10 shadow-[0_-30px_100px_rgba(255,255,255,0.03)] backdrop-blur-[2px] z-10" />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-20 w-full max-w-5xl px-4 flex flex-col items-center pt-16"
        >
          <p className="text-gray-500 text-xs sm:text-sm mb-8 tracking-wider font-medium">
            Trusted By Leading Cinema Brands
          </p>
          
          {/* Studios Marquee */}
          <div className="w-[200%] sm:w-[150%] max-w-none flex overflow-hidden mask-image-linear-fade">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-4 sm:gap-6 pr-4 sm:pr-6"
            >
              {[...studios, ...studios, ...studios, ...studios].map((studio, idx) => {
                return (
                  <div 
                    key={idx}
                    className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1A1A1A]/80 border border-white/5 backdrop-blur-md hover:bg-white/5 transition-colors cursor-default"
                  >
                    <img src={studio.logo} alt={studio.name} className="w-auto h-6 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to blend with the rest of the page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-black to-transparent z-30 pointer-events-none" />
    </div>
  );
}
