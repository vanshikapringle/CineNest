import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-midnight-black">
      
      {/* Animated Background Asset */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/auth-green-beam.jpeg")' }}
      />
      
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 film-grain" />
      
      {/* Dark Vignette to focus attention to center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-midnight-black/80 to-midnight-black" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Favicon Logo Animation */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex justify-center"
        >
          <img src="/favicon.png" alt="CineNest Favicon" className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl font-bold tracking-widest text-white uppercase"
        >
          CineNest
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-emerald-400 text-sm mt-2 tracking-[0.3em] uppercase"
        >
          Preparing Experience
        </motion.p>
      </div>
    </div>
  );
}
