import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-midnight-black my-20">
      {/* Background Image: Official Asset */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: 'url("/cinema-light-beam.jpeg")' }}
      />
      
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 film-grain" />

      {/* Radial Gradient for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-midnight-black/60 to-midnight-black/95" />

      <div className="absolute inset-0 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Ready to upgrade your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Cinematic Experience?
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Join CineNest today and unlock exclusive premieres, priority seating, and member-only discounts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)]"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
