import { motion } from 'framer-motion';
import { Sparkles, Calendar, Ticket, CreditCard, Apple, Share2, Users, LayoutDashboard } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
            Innovations
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          Innovation That Works <br />
          <span className="text-gray-400">as Hard as You Do</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed"
        >
          Every feature is designed to keep you ahead of the curve and elevate your cinematic experience.
        </motion.p>
      </div>

      {/* Grid Layout matching the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
        
        {/* Left Column (Span 4) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4 rounded-3xl bg-[#141414] border border-white/5 p-8 flex flex-col relative overflow-hidden group"
        >
          <h3 className="text-xl font-medium text-white mb-3">AI-Powered Recommendations</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
            Let AI handle the heavy lifting — from auto-generating watchlists to smart genre prioritization.
          </p>
          
          <div className="mt-auto space-y-4 relative z-10">
            <div className="w-full rounded-2xl bg-[#0A0A0A] border border-white/10 p-4 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-white" />
              <div className="text-xs text-gray-500 font-medium">Suggest a thriller like Inception...</div>
            </div>
            <div className="w-full rounded-2xl bg-[#0A0A0A] border border-white/10 p-4 h-24 flex flex-col justify-center gap-2">
               <div className="w-1/3 h-2 bg-white/10 rounded-full"></div>
               <div className="w-2/3 h-2 bg-white/5 rounded-full"></div>
            </div>
            <div className="w-full rounded-2xl bg-[#0A0A0A] border border-white/10 p-4 h-24 flex flex-col justify-center gap-2">
               <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
               <div className="w-3/4 h-2 bg-white/5 rounded-full"></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent z-20 pointer-events-none" />
        </motion.div>

        {/* Middle Column (Span 4) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Top Half */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 rounded-3xl bg-[#141414] border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden"
          >
            {/* Mock Integration Icons */}
            <div className="absolute top-8 left-0 right-0 flex justify-center opacity-30">
              <div className="grid grid-cols-3 gap-3">
                {[Apple, Calendar, Ticket, CreditCard, Share2, LayoutDashboard].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-medium text-white mb-3 relative z-10">All-In-One Integrations</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed relative z-10">
              Connect your favorite tools — Apple Wallet, GCal, and more — for seamless workflows in one place.
            </p>
          </motion.div>

          {/* Bottom Half */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 rounded-3xl bg-[#141414] border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden"
          >
            {/* Mock Avatars */}
            <div className="absolute top-8 left-0 right-0 flex justify-center items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center relative">
                 <Users className="w-4 h-4 text-gray-300" />
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 px-2 py-0.5 rounded text-[10px] text-white">Eren</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <Users className="w-4 h-4 text-gray-500" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <span className="text-gray-400 text-sm">+</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center relative">
                 <Users className="w-4 h-4 text-gray-300" />
                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/20 px-2 py-0.5 rounded text-[10px] text-white">Rainer</div>
              </div>
            </div>

            <h3 className="text-xl font-medium text-white mb-3 relative z-10">Group Bookings</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed relative z-10">
              Work together, live. Comment, assign seats, and split payments without waiting or refreshing.
            </p>
          </motion.div>

        </div>

        {/* Right Column (Span 4) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-4 rounded-3xl bg-[#141414] border border-white/5 p-8 flex flex-col relative overflow-hidden group"
        >
          <h3 className="text-xl font-medium text-white mb-3">Live Seat Mapping</h3>
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
            Go beyond standard lists with interactive theater layouts and custom views tailored to your party.
          </p>

          <div className="mt-auto relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
            {/* Mock Seat Map Layout */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-4 h-1 bg-white/20 rounded"></div></div>
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-6 h-1 bg-white/20 rounded"></div></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-5 h-1 bg-white/20 rounded"></div></div>
              <div className="h-16 rounded-lg bg-blue-500/20 border border-blue-500/40 relative flex items-center px-3 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <div className="w-8 h-1 bg-blue-400/80 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-4 h-1 bg-white/20 rounded"></div></div>
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-6 h-1 bg-white/20 rounded"></div></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-5 h-1 bg-white/20 rounded"></div></div>
              <div className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center px-3 gap-2"><div className="w-4 h-1 bg-white/20 rounded"></div></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent z-20 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
