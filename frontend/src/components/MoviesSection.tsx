import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';

interface MoviesSectionProps {
  movies: any[];
  isLoading: boolean;
  isError: boolean;
  isClickable?: boolean;
}

export function MoviesSection({ movies, isLoading, isError, isClickable = true }: MoviesSectionProps) {
  return (
    <section id="movies" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
            Now Showing
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          Trending <span className="text-blue-400">Blockbusters</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed"
        >
          Discover what everyone's talking about. Book tickets for the biggest cinematic events of the year.
        </motion.p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {isError && (
        <div className="text-center py-20 text-red-400 bg-red-400/10 rounded-2xl border border-red-500/20">
          Failed to load movies. Ensure the backend services are running.
        </div>
      )}
      
      {!isLoading && !isError && movies && movies.length === 0 && (
        <div className="text-center py-20 text-gray-400 bg-white/5 rounded-2xl border border-white/10">
          No movies currently available in your selected city.
        </div>
      )}

      {!isLoading && !isError && movies && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.slice(0, 8).map((movie: any, idx: number) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <MovieCard 
                id={movie.id}
                title={movie.title}
                imageUrl={movie.posterUrl || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop'}
                rating={movie.imdbRating || 9.0} 
                genre={movie.genres && movie.genres.length > 0 ? movie.genres[0].name : 'Drama'} 
                isClickable={isClickable}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
