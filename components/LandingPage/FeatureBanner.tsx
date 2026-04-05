'use client';

import { motion } from 'framer-motion';
import { Bolt, Search, Shield } from 'lucide-react';

const featureItems = [
  {
    title: 'AI-Powered Matching',
    description:
      'Structured parsing plus skill intelligence identifies jobs aligned to your profile instead of only keyword overlap.',
    icon: Bolt,
    accent: 'text-[#2ed5c8]',
  },
  {
    title: 'Decision-Ready Search',
    description:
      'Recommendations are organized with readable match percentages so users can choose quickly and confidently.',
    icon: Search,
    accent: 'text-[#7ea3ff]',
  },
  {
    title: 'Privacy-Centered Flow',
    description:
      'User sessions are protected through NextAuth and resume data handling stays tightly scoped to user actions.',
    icon: Shield,
    accent: 'text-[#2ed5c8]',
  },
];

export default function FeaturesBanner() {
  return (
    <section id="features" className="relative overflow-hidden px-6 py-24 text-white md:px-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#04070d] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(75,121,255,0.2),transparent_30%),radial-gradient(circle_at_90%_25%,rgba(46,213,200,0.14),transparent_32%),radial-gradient(circle_at_50%_95%,rgba(63,79,158,0.22),transparent_38%)]" />
      <div className="mesh-overlay pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#04070d]" />
      <div className="pointer-events-none absolute -left-12 top-24 h-44 w-44 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-56 w-56 rounded-full border border-[#2ed5c8]/20" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="mb-14 space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <span className="rounded-full border border-[#2b3f69] bg-[#0e1729] px-5 py-1.5 text-base text-[#9fb1cc]">
              Features
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
          >
            Designed for
            <span className="block text-[#2ed5c8]">real hiring outcomes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true, amount: 0.35 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-[#9fb1cc]"
          >
            Every screen is tuned for speed: quick resume upload, transparent matching,
            and immediate role exploration on desktop and mobile.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featureItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.55, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8 }}
                className="glass-panel elevated-3d group rounded-3xl border border-[#355387]/30 p-8"
              >
                <div className="mb-5 inline-flex rounded-xl border border-[#263963] bg-[#0c1425] p-3 transition duration-300 group-hover:shadow-[0_14px_30px_rgba(46,213,200,0.2)]">
                  <Icon className={`h-7 w-7 ${item.accent}`} />
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-[#ecf3ff]">{item.title}</h3>
                <p className="text-base leading-relaxed text-[#9fb1cc]">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
