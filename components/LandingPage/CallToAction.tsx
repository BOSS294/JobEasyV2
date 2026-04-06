"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { FileText, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  
  // Parallax scale and fade for the CTA box
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Magnetic Button Logic
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.2); // Strength of magnetic pull
    y.set((e.clientY - centerY) * 0.2);
  };

  return (
    <section ref={ref} className="relative overflow-hidden px-6 pb-12 pt-32 text-center text-white md:pt-40">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#04070d] via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,213,200,0.1),transparent_50%)]" />

      <motion.div 
        style={{ scale, opacity }}
        className="glass-panel elevated-3d relative z-20 mx-auto w-full max-w-[1200px] rounded-[3rem] border border-[#365488]/40 bg-gradient-to-b from-[#101b2e]/80 to-[#070d18]/90 px-8 py-20 md:px-20 md:py-24 overflow-hidden"
      >
        {/* Decorative inner glow */}
        <div className="absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2ed5c8] to-transparent opacity-50" />
        <div className="absolute left-1/2 top-0 h-32 w-full -translate-x-1/2 bg-[#2ed5c8]/10 blur-[100px]" />

        <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} className="relative z-10">
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            Ready to find your
            <span className="block mt-2 bg-gradient-to-r from-white to-[#9fb1cc] bg-clip-text text-transparent">next role with confidence?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#9fb1cc]">
            Upload your resume and instantly see relevant jobs with clear matching scores, skills alignment, and focused search.
          </p>

          <div className="mt-12 flex justify-center perspective-1000">
            <motion.button
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
              onClick={() => router.push('/resume')}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#2ed5c8] to-[#1aa399] px-12 py-5 text-xl font-black text-[#04070d] shadow-[0_20px_50px_rgba(46,213,200,0.3)] transition-all hover:shadow-[0_20px_60px_rgba(46,213,200,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <Rocket className="relative z-10 h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              <span className="relative z-10">Get Started Free</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Area */}
      <div className="relative z-20 mx-auto mt-24 flex w-full max-w-[1500px] flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-[#7f94b7] md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <FileText className="h-5 w-5 text-[#2ed5c8]" />
          </div>
          <span className="text-xl font-black text-white tracking-wide">JobEasy</span>
        </div>
        <p className="font-medium text-[#9fb1cc]">© 2026 ResumeMatch. All rights reserved.</p>
        <div className="flex gap-6 font-semibold">
          <a href="#" className="transition hover:text-white hover:underline decoration-[#2ed5c8] underline-offset-4">Privacy</a>
          <a href="#" className="transition hover:text-white hover:underline decoration-[#2ed5c8] underline-offset-4">Terms</a>
          <a href="#" className="transition hover:text-white hover:underline decoration-[#2ed5c8] underline-offset-4">Contact</a>
        </div>
      </div>
    </section>
  );
}