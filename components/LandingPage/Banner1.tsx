'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { BriefcaseBusiness, Sparkles, TrendingUp } from 'lucide-react';

export default function Banner1() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((0.5 - y / rect.height)) * 12;

    card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="banner" className="mesh-overlay relative min-h-screen overflow-hidden pt-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(75,121,255,0.2),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(46,213,200,0.18),transparent_30%),radial-gradient(circle_at_50%_95%,rgba(63,79,158,0.2),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#04070d]" />
      <div className="floating-orb absolute left-8 top-28 h-28 w-28 rounded-full bg-[#4b79ff]/20 blur-2xl" />
      <div className="floating-orb absolute right-12 top-20 h-24 w-24 rounded-full bg-[#2ed5c8]/20 blur-2xl" />
      <div className="floating-orb absolute bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#3f4f9e]/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-48 w-48 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-64 w-64 rounded-full border border-[#2ed5c8]/20" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-14 md:px-16 md:py-24">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2b3f69] bg-[#0e1729] px-4 py-2 text-sm font-semibold text-[#bcd0f0]">
            <Sparkles className="h-4 w-4 text-[#2ed5c8]" />
            AI profile intelligence for job seekers
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Match better
            <span className="block text-[#2ed5c8]">roles with precision</span>
          </h1>

          <p className="max-w-2xl text-base font-medium leading-relaxed text-[#9fb1cc] sm:text-lg">
            ResumeMatch analyzes your resume, extracts skills and experience, then ranks relevant jobs using an explainable match score.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/resume">
              <button className="solid-btn-primary w-full rounded-xl px-6 py-3 transition sm:w-auto">
                Upload Resume
              </button>
            </Link>
            <Link href="https://github.com/KhachiSahil/jobeasy">
              <button className="solid-btn-secondary w-full rounded-xl px-6 py-3 transition sm:w-auto">
                Learn More
              </button>
            </Link>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
            <div className="glass-panel elevated-3d rounded-2xl p-4 transition duration-300 hover:shadow-[0_22px_45px_rgba(46,213,200,0.15)]">
              <BriefcaseBusiness className="h-5 w-5 text-[#2ed5c8]" />
              <p className="mt-2 text-sm font-semibold text-[#dbe8ff]">Smart role matching</p>
            </div>
            <div className="glass-panel elevated-3d rounded-2xl p-4 transition duration-300 hover:shadow-[0_22px_45px_rgba(75,121,255,0.15)]">
              <TrendingUp className="h-5 w-5 text-[#7ea3ff]" />
              <p className="mt-2 text-sm font-semibold text-[#dbe8ff]">Skill-gap visibility</p>
            </div>
            <div className="glass-panel elevated-3d rounded-2xl p-4 transition duration-300 hover:shadow-[0_22px_45px_rgba(46,213,200,0.15)]">
              <Sparkles className="h-5 w-5 text-[#2ed5c8]" />
              <p className="mt-2 text-sm font-semibold text-[#dbe8ff]">Resume insights</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex justify-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={resetTilt}
            className="glass-panel w-full max-w-[680px] rounded-3xl border border-[#38568d]/45 p-4 transition-transform duration-200 will-change-transform"
          >
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#2b3f69] bg-[#0d1729]/90 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#89a9dc]">Live Match Preview</p>
              <span className="rounded-full bg-[#2ed5c8] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#06211d]">AI Active</span>
            </div>
            <Image
              src="/resume.jpg"
              alt="Resume analysis dashboard"
              width={600}
              height={420}
              className="h-auto w-full rounded-2xl border border-[#2d416a] object-cover shadow-2xl"
            />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-[#223255] bg-[#0b1426] p-3">
                <p className="text-xl font-black text-[#2ed5c8]">94%</p>
                <p className="text-xs text-[#9fb1cc]">Parsing accuracy</p>
              </div>
              <div className="rounded-xl border border-[#223255] bg-[#0b1426] p-3">
                <p className="text-xl font-black text-[#7ea3ff]">6s</p>
                <p className="text-xs text-[#9fb1cc]">Avg processing</p>
              </div>
              <div className="rounded-xl border border-[#223255] bg-[#0b1426] p-3">
                <p className="text-xl font-black text-[#2ed5c8]">10k+</p>
                <p className="text-xs text-[#9fb1cc]">Active users</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
