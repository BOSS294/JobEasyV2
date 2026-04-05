"use client";
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '85%', label: 'Higher match rate', color: 'purple' },
  { value: '10K+', label: 'Active users', color: 'pink' },
  { value: '5,000+', label: 'Companies', color: 'cyan' },
  { value: '92%', label: 'Satisfaction rate', color: 'purple' },
];

const colorMap: Record<string, string> = {
  purple: 'text-purple-400 shadow-purple-500/70',
  pink: 'text-pink-400 shadow-pink-500/70',
  cyan: 'text-cyan-400 shadow-cyan-500/70',
};

// Animation variant for each card
const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const ResumeMatchStats: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl font-black sm:text-5xl md:text-6xl"
      >
        Trusted by serious
        <span className="block text-[#2ed5c8]">job seekers worldwide</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mt-6 max-w-3xl text-center text-lg text-[#9fb1cc] md:text-xl"
      >
        Join professionals who discover higher-fit roles through focused resume analysis and transparent matching.
      </motion.p>

      <div className="mt-16 grid w-full max-w-7xl grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="glass-panel elevated-3d flex cursor-default flex-col items-center rounded-3xl p-8"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className={`text-5xl font-black drop-shadow-lg ${colorMap[stat.color]}`}
            >
              {stat.value}
            </span>
            <span className="mt-4 text-center text-lg text-[#c9d7ee]">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResumeMatchStats;
