import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What kind of customer support is available?",
    answer: "We offer 24/7 email and live chat support, plus a full Help Center and onboarding resources to ensure you get the most out of your cinematic experience."
  },
  {
    question: "How long does it take to set up?",
    answer: "You can create an account and book your first movie ticket in under 2 minutes. Our onboarding is designed to be seamless and intuitive."
  },
  {
    question: "Can I invite my friends to book together?",
    answer: "Yes! Our group booking feature allows you to share a session link, select seats together in real-time, and split payments easily."
  },
  {
    question: "Do you offer integrations with other tools?",
    answer: "Absolutely. We integrate directly with Apple Wallet, Google Calendar, and various payment gateways to make your movie-going experience frictionless."
  },
  {
    question: "Is there a loyalty program or membership available?",
    answer: "Yes, we offer a premium membership tier that provides early access to blockbuster tickets, waived convenience fees, and exclusive discounts."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Side: Sticky Header */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A2E]/50 border border-blue-500/20 backdrop-blur-md mb-6"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                FAQs
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
            >
              Got Questions? We've Got You Covered.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg max-w-md font-light leading-relaxed"
            >
              Here are the answers to the most common questions about pricing, features, and support. Still need help? Our team's just a <a href="#contact" className="text-white underline underline-offset-4 hover:text-blue-400 transition-colors">click away.</a>
            </motion.p>
          </div>
        </div>

        {/* Right Side: Accordions */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`w-full rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen 
                    ? 'bg-[#141414] border-white/10' 
                    : 'bg-[#0A0A0A] border-white/5 hover:bg-[#141414]'
                }`}
              >
                <div className="px-6 py-5 flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-medium text-gray-200">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                    isOpen ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
