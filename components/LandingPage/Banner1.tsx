'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { BriefcaseBusiness, Sparkles, TrendingUp } from 'lucide-react';

export default function Banner1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    const rotateX = ((0.5 - y / rect.height)) * 15;
    card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section ref={containerRef} id="banner" className="relative min-h-screen overflow-hidden pt-24 text-white">
      {/* Parallax Background Orbs */}
      <motion.div style={{ y: yOrb1 }} className="absolute left-8 top-28 h-40 w-40 rounded-full bg-[#4b79ff]/30 blur-[100px]" />
      <motion.div style={{ y: yOrb2 }} className="absolute right-12 top-20 h-32 w-32 rounded-full bg-[#2ed5c8]/30 blur-[80px]" />
      <div className="mesh-overlay absolute inset-0 opacity-40 mix-blend-screen" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-14 md:px-16">
        <motion.div style={{ y: yText }} className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2b3f69] bg-[#0e1729]/80 backdrop-blur-md px-5 py-2 text-sm font-semibold text-[#bcd0f0] shadow-[0_0_20px_rgba(46,213,200,0.15)]"
          >
            <Sparkles className="h-4 w-4 text-[#2ed5c8]" />
            AI profile intelligence for job seekers
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Match better
            <span className="block bg-gradient-to-r from-[#2ed5c8] to-[#4b79ff] bg-clip-text text-transparent drop-shadow-2xl">
              roles with precision
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-lg font-medium leading-relaxed text-[#9fb1cc]"
          >
            ResumeMatch analyzes your resume, extracts skills and experience, then ranks relevant jobs using an explainable match score.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col gap-4 sm:flex-row">
            <Link href="/resume" className="w-full sm:w-auto">
              <button className="solid-btn-primary w-full rounded-2xl px-8 py-4 text-lg">Upload Resume</button>
            </Link>
            <Link href="https://github.com/KhachiSahil/jobeasy" className="w-full sm:w-auto">
              <button className="solid-btn-secondary w-full rounded-2xl px-8 py-4 text-lg">Learn More</button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yImage }} className="flex justify-center perspective-[2000px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            className="glass-panel w-full max-w-[680px] rounded-[2rem] p-5 transition-transform duration-200 ease-out will-change-transform"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl border border-[#2b3f69] bg-[#0d1729] px-4 py-3 shadow-inner">
              <p className="text-xs font-bold uppercase tracking-widest text-[#89a9dc]">Live Match Preview</p>
              <span className="flex items-center gap-2 rounded-full bg-[#2ed5c8]/10 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#2ed5c8] border border-[#2ed5c8]/30">
                <span className="h-2 w-2 rounded-full bg-[#2ed5c8] animate-pulse" /> AI Active
              </span>
            </div>
            <Image
              src="/resume.jpg"
              alt="Dashboard"
              width={600} height={420}
              className="h-auto w-full rounded-xl border border-[#2d416a] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}