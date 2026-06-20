import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
            Contact
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          Let's Start a <br />
          <span className="text-gray-400">Conversation</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Side: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-4">
            Whether you have a question about booking, corporate events, or just want to say hi, our team is ready to assist you.
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <p className="text-white font-medium">Email Us</p>
              <p className="text-gray-400 text-sm">support@cinenest.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <p className="text-white font-medium">Call Us</p>
              <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <p className="text-white font-medium">Headquarters</p>
              <p className="text-gray-400 text-sm">123 Cinema Blvd, Los Angeles, CA 90028</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#141414] border border-white/5 rounded-3xl p-8 sm:p-10"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] text-gray-400 font-medium ml-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0A0A0A] border border-white/5 focus:border-blue-500/50 text-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] text-gray-400 font-medium ml-1">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0A0A0A] border border-white/5 focus:border-blue-500/50 text-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] text-gray-400 font-medium ml-1">Email</label>
              <input 
                type="email" 
                className="w-full bg-[#0A0A0A] border border-white/5 focus:border-blue-500/50 text-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] text-gray-400 font-medium ml-1">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-[#0A0A0A] border border-white/5 focus:border-blue-500/50 text-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500/50 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button className="w-full bg-white hover:bg-gray-200 text-black py-3.5 rounded-xl font-medium text-sm transition-colors mt-2">
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
