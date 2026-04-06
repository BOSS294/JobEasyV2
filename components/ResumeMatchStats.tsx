"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, Building2, Target, Heart, MousePointer2 } from 'lucide-react';

const stats = [
  { value: '85%', label: 'Match Rate', icon: Target, color: '#2ed5c8', shadow: 'rgba(46,213,200,0.3)' },
  { value: '10K+', label: 'Active Users', icon: Users, color: '#4b79ff', shadow: 'rgba(75,121,255,0.3)' },
  { value: '5K+', label: 'Companies', icon: Building2, color: '#a855f7', shadow: 'rgba(168,85,247,0.3)' },
  { value: '92%', label: 'Satisfaction', icon: Heart, color: '#ec4899', shadow: 'rgba(236,72,153,0.3)' },
];

// --- 3D TILT CARD COMPONENT ---
const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex h-64 w-full cursor-none flex-col items-center justify-center rounded-[2.5rem] border border-white/10 bg-[#0a111f]/60 p-8 backdrop-blur-xl transition-colors hover:border-white/20"
    >
      {/* Dynamic Background Beam */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" 
        style={{ background: `radial-gradient(circle at center, ${stat.shadow} 0%, transparent 70%)` }}
      />

      {/* 3D Elements */}
      <div style={{ transform: "translateZ(50px)" }} className="relative flex flex-col items-center">
        <div 
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner transition-transform group-hover:scale-110"
        >
          <Icon className="h-7 w-7" style={{ color: stat.color }} />
        </div>
        
        <motion.span
          className="text-6xl font-black tracking-tighter text-white"
          style={{ textShadow: `0 0 20px ${stat.shadow}` }}
        >
          {stat.value}
        </motion.span>
        
        <span className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#9fb1cc]">
          {stat.label}
        </span>
      </div>

      {/* Hover Cursor Follower Inside Card */}
      <motion.div
        style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [-50, 50]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-50, 50]) }}
        className="pointer-events-none absolute h-24 w-24 rounded-full bg-white/5 blur-3xl"
      />
    </motion.div>
  );
};

const ResumeMatchStats: React.FC = () => {
  return (
    <section id="stats" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#04070d] px-6 py-32 text-white">
      
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-20 space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2ed5c8]"
          >
            <MousePointer2 className="h-3 w-3" /> Global Impact Metrics
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl"
          >
            The proof is in the <br />
            <span className="bg-gradient-to-r from-[#2ed5c8] via-[#4b79ff] to-[#a855f7] bg-clip-text text-transparent">
              Match Intelligence.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-[#9fb1cc] md:text-xl"
          >
            We don't just find jobs; we engineer career alignment. Join thousands of professionals making data-driven moves.
          </motion.p>
        </div>

        {/* 3D Bento Grid */}
        <div className="grid grid-cols-1 gap-8 perspective-1000 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex flex-col items-center justify-center gap-6 border-t border-white/5 pt-12 text-center"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-12 rounded-full border-2 border-[#04070d] bg-gradient-to-tr from-[#2ed5c8] to-[#4b79ff]" />
            ))}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#04070d] bg-[#0a111f] text-xs font-bold">
              +10k
            </div>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#5e769b]">
            Trusted by candidates from Google, Meta, and Netflix
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeMatchStats;