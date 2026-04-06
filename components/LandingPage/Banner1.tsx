'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react';

export default function Banner1() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Physics-based Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D card
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });

  // Floating background elements
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), { damping: 40, stiffness: 100 });
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), { damping: 40, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="banner" 
      className="relative min-h-screen overflow-hidden pt-32 pb-20 text-white flex items-center"
    >
      {/* Interactive Parallax Background Orbs */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute left-10 top-1/4 h-64 w-64 rounded-full bg-[#4b79ff]/20 blur-[120px] pointer-events-none" />
      <motion.div style={{ x: useTransform(bgX, v => -v), y: useTransform(bgY, v => -v) }} className="absolute right-10 bottom-1/4 h-80 w-80 rounded-full bg-[#2ed5c8]/15 blur-[150px] pointer-events-none" />
      
      <div className="mesh-overlay absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
        
        {/* Left Content */}
        <motion.div style={{ y: yText, opacity: opacityFade }} className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2ed5c8]/30 bg-[#2ed5c8]/10 px-5 py-2 text-sm font-bold text-[#2ed5c8] shadow-[0_0_30px_rgba(46,213,200,0.15)]"
          >
            <BrainCircuit className="h-4 w-4 animate-pulse" />
            V2 AI Engine is Now Live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl font-black leading-[1.05] tracking-tight lg:text-[5.5rem]"
          >
            Match better
            <span className="block mt-2 bg-gradient-to-r from-[#2ed5c8] via-[#4b79ff] to-[#a855f7] bg-clip-text text-transparent drop-shadow-2xl">
              roles with precision
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-xl font-medium leading-relaxed text-[#9fb1cc]"
          >
            ResumeMatch analyzes your resume, extracts skills, and ranks relevant jobs using an explainable match score. No more guessing.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col gap-4 sm:flex-row pt-4">
            <Link href="/resume" className="w-full sm:w-auto group">
              <button className="solid-btn-primary flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg">
                Upload Resume <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link href="https://github.com/KhachiSahil/jobeasy" className="w-full sm:w-auto">
              <button className="solid-btn-secondary w-full rounded-2xl px-8 py-4 text-lg">
                View Documentation
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Physics Card */}
        <motion.div 
          style={{ opacity: opacityFade }}
          className="flex justify-center perspective-[2000px]"
        >
          <motion.div
            style={{ rotateX, rotateY, z: 100 }}
            className="glass-panel w-full max-w-[680px] rounded-[2rem] p-4 shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/10"
          >
            <div className="mb-4 flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-5 py-3 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="flex items-center gap-2 rounded-full bg-[#2ed5c8]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#2ed5c8]">
                <Sparkles className="h-3 w-3" /> Live Analysis
              </span>
            </div>
            
            <motion.div
              style={{ translateZ: 50 }} // Pushes image closer to camera for 3D pop
              className="relative rounded-xl overflow-hidden border border-white/5"
            >
              <Image src="/resume.jpg" alt="Dashboard" width={600} height={420} className="h-auto w-full object-cover" priority />
              {/* Overlay gradient to blend image into the dark theme better */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070d]/80 via-transparent to-transparent mix-blend-multiply" />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}