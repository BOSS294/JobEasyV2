'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: "Alex P.", role: "Software Engineer", text: "The match percentage completely changed how I apply to jobs. I landed interviews 3x faster.", score: 98 },
  { name: "Sarah M.", role: "Product Manager", text: "Finally, an AI that actually understands context. It found the gap in my resume instantly.", score: 95 },
  { name: "David K.", role: "Data Scientist", text: "The structured parsing is no joke. It pulled nested details from my complex PDF perfectly.", score: 99 },
];

export default function Reviews() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-[1500px]">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Trusted by <span className="text-[#2ed5c8]">professionals</span></h2>
          <p className="text-[#9fb1cc] text-xl max-w-2xl mx-auto">Join thousands who discover higher-fit roles through focused resume analysis.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="glass-panel elevated-3d rounded-3xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-[#2ed5c8] text-[#2ed5c8]" />)}
              </div>
              <p className="text-lg text-white mb-8 italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex justify-between items-end border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-bold text-[#ecf3ff]">{review.name}</h4>
                  <p className="text-sm text-[#9fb1cc]">{review.role}</p>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-[#4b79ff]">{review.score}%</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#9fb1cc]">Match Score</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}