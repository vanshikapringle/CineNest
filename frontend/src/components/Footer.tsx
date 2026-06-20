import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Typography Logo */}
        <div className="flex justify-center mb-16 select-none relative">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] font-bold text-white/10 tracking-tighter leading-none"
          >
            CineNest
          </motion.h1>
          {/* Subtle gradient overlay to mimic the screenshot's fading massive text */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />
        </div>

        {/* Main Links */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-24 relative z-10">
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Career</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">PressKit</a>
          <a href="#movies" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Movies</a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Newsletter</a>
          <a href="#contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contact</a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
          <div className="text-sm text-gray-500">
            CineNest © {new Date().getFullYear()}
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M2.004 22l.406-2.28c-1.396-2.42-1.396-5.36 0-7.78l-.406-2.28 2.302.396c2.327-1.464 5.258-1.464 7.585 0l2.302-.396-.406 2.28c1.396 2.42 1.396 5.36 0 7.78l.406 2.28-2.302-.396c-2.327 1.464-5.258 1.464-7.585 0L2.004 22zm5.414-9.39c-.774 0-1.4.626-1.4 1.4s.626 1.4 1.4 1.4 1.4-.626 1.4-1.4-.626-1.4-1.4-1.4zm6 0c-.774 0-1.4.626-1.4 1.4s.626 1.4 1.4 1.4 1.4-.626 1.4-1.4-.626-1.4-1.4-1.4z"/></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
