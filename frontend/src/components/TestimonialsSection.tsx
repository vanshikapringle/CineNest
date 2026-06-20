import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sophia Johnson",
    role: "Movie Critic",
    content: "As a film critic, I need to book tickets internationally frequently. This app has simplified the process for me. It's fast, reliable, and the seating charts are unbeatable."
  },
  {
    name: "Emily Chen",
    role: "Film Student",
    content: "Running a small film club, I need a booking app that's easy to use and cost-effective. This app ticks all the boxes. It's saved me time and money! The group booking feature is especially helpful."
  },
  {
    name: "Jessica Thompson",
    role: "Blogger",
    content: "As a travel blogger, I'm constantly on the go. This app has made it so easy for me to book premieres from anywhere in the world!"
  },
  {
    name: "Alex Ramirez",
    role: "Designer",
    content: "Being a freelancer, I rely on this app to catch late-night showings. It's convenient, secure, and the transaction history feature helps me keep track of all my entertainment expenses."
  },
  {
    name: "David Patel",
    role: "Software Engineer",
    content: "I've tried several other booking apps, but none compare to this one. The user interface is intuitive, and the ability to seamlessly split payments is a game-changer."
  },
  {
    name: "Michael Davis",
    role: "Business Owner",
    content: "I've been using this app to organize company movie nights, and I couldn't be happier. The transactions are seamless. Highly recommended! This app has truly streamlined my event planning."
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
            Testimonials
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6"
        >
          Reviews from 1000+ <br />
          <span className="text-gray-400">customers</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl font-light leading-relaxed"
        >
          Discover what our users have to say about their experience with our platform.
        </motion.p>
      </div>

      {/* Grid Layout matching the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-3xl bg-[#141414] border border-white/5 p-8 flex flex-col ${idx === 1 || idx === 4 ? 'md:-translate-y-6' : ''} ${idx === 4 ? 'md:mb-12' : ''}`}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-white fill-white" />
              ))}
            </div>

            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 flex-grow">
              "{testimonial.content}"
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <span className="text-white text-sm font-medium">{testimonial.name}</span>
                <span className="text-gray-600 text-sm mx-2">|</span>
                <span className="text-gray-500 text-sm">{testimonial.role}</span>
              </div>
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-gray-500" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
