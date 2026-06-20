import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { text: "May the Force be with you.", movie: "Star Wars" },
  { text: "There's no place like home.", movie: "The Wizard of Oz" },
  { text: "I'm the king of the world!", movie: "Titanic" },
  { text: "To infinity and beyond!", movie: "Toy Story" },
  { text: "Why so serious?", movie: "The Dark Knight" },
  { text: "Here's looking at you, kid.", movie: "Casablanca" },
  { text: "I'll be back.", movie: "The Terminator" },
  { text: "Life is like a box of chocolates.", movie: "Forrest Gump" },
  { text: "You can't handle the truth!", movie: "A Few Good Men" },
  { text: "I am your father.", movie: "Star Wars: The Empire Strikes Back" }
];

export function AppLoader({ onComplete }: { onComplete: () => void }) {
  // Pick one random quote on mount
  const [currentQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  
  useEffect(() => {
    // Total loading time: 4 seconds
    const timeout = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] animated-striped-bg flex flex-col items-center justify-center p-6 text-center font-body selection:bg-blue-500/30 overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 film-grain opacity-[0.03]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        {/* Animated Brand Logo Placeholder */}
        <div className="mb-8 flex justify-center">
          <img src="/favicon.png" alt="CineNest Favicon" className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse" />
        </div>

        {/* Quotes Carousel */}
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <h2 className="text-2xl sm:text-3xl font-['Playfair_Display'] italic text-white mb-3">"{currentQuote.text}"</h2>
              <p className="text-xs sm:text-sm text-gray-500 tracking-wider uppercase font-medium">— {currentQuote.movie}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Loading Progress Bar */}
        <div className="mt-16 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: "0%" }}
             animate={{ width: "100%" }}
             transition={{ duration: 4, ease: "linear" }}
             className="h-full bg-blue-500/80 rounded-full"
           />
        </div>
      </div>
    </div>
  );
}
