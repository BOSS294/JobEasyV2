'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Bolt, Search, Shield } from 'lucide-react';

const featureItems = [
  {
    title: 'AI-Powered Matching',
    description: 'Structured parsing plus skill intelligence identifies jobs aligned to your profile instead of only keyword overlap.',
    icon: Bolt,
    accent: 'text-[#2ed5c8]',
    shadow: 'rgba(46,213,200,0.3)'
  },
  {
    title: 'Decision-Ready Search',
    description: 'Recommendations are organized with readable match percentages so users can choose quickly and confidently.',
    icon: Search,
    accent: 'text-[#4b79ff]',
    shadow: 'rgba(75,121,255,0.3)'
  },
  {
    title: 'Privacy-Centered Flow',
    description: 'User sessions are protected through NextAuth and resume data handling stays tightly scoped to user actions.',
    icon: Shield,
    accent: 'text-[#2ed5c8]',
    shadow: 'rgba(46,213,200,0.3)'
  },
];

export default function FeaturesBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yCards = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} id="features" className="relative overflow-hidden px-6 py-32 text-white md:px-20">
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="mb-20 space-y-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl drop-shadow-lg"
          >
            Designed for <br/>
            <span className="bg-gradient-to-r from-[#2ed5c8] to-[#4b79ff] bg-clip-text text-transparent">real hiring outcomes</span>
          </motion.h2>
        </div>

        <motion.div style={{ y: yCards }} className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {featureItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, rotateX: 20, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 * index, type: "spring" }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass-panel elevated-3d group rounded-[2rem] p-10 relative overflow-hidden"
              >
                <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[80px] bg-[${item.accent.match(/#\w+/)?.[0]}] opacity-20 transition-opacity duration-500 group-hover:opacity-40`} />
                
                <div className="mb-6 inline-flex rounded-2xl border border-[#263963] bg-[#0c1425] p-4 shadow-xl relative z-10">
                  <Icon className={`h-10 w-10 ${item.accent}`} style={{ filter: `drop-shadow(0 0 10px ${item.shadow})` }} />
                </div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-[#ecf3ff] relative z-10">{item.title}</h3>
                <p className="text-lg leading-relaxed text-[#9fb1cc] relative z-10">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}