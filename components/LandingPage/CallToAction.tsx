"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const CallToAction: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden px-6 pb-6 pt-24 text-center text-white md:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#04070d] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(75,121,255,0.2),transparent_34%),radial-gradient(circle_at_85%_30%,rgba(46,213,200,0.16),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(63,79,158,0.22),transparent_40%)]" />
      <div className="mesh-overlay pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#03050a]" />
      <div className="pointer-events-none absolute -left-20 top-20 h-52 w-52 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full border border-[#2ed5c8]/20" />

      <div className="glass-panel elevated-3d relative z-10 mx-auto w-full max-w-[1500px] rounded-3xl border border-[#365488]/35 px-8 py-14 md:px-14 md:py-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
      >
        Ready to find your
        <span className="block text-[#2ed5c8]">next role with confidence?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#9fb1cc] md:text-xl"
      >
        Upload your resume and instantly see relevant jobs with clear matching scores, skills alignment, and focused search.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        viewport={{ once: true }}
        onClick={() => router.push('/resume')}
        className="solid-btn-primary mt-10 rounded-xl px-10 py-4 text-lg shadow-[0_14px_34px_rgba(46,213,200,0.28)] transition md:text-xl"
      >
        Get Started
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 flex w-full max-w-2xl items-center justify-center gap-3 rounded-2xl border border-[#2b3f69] bg-[#0d1729]/85 px-4 py-3 text-sm text-[#9fb1cc]"
      >
        <span className="h-2 w-2 rounded-full bg-[#2ed5c8]" />
        <span>Average profile analysis in under 6 seconds</span>
      </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[1500px] flex-col items-center justify-between gap-6 border-t border-[#223255] pt-8 text-sm text-[#7f94b7] md:flex-row">
        <div className="flex items-center gap-2">
          <span className="glass-panel rounded-lg p-1.5">
            <FileText className="h-5 w-5 text-[#2ed5c8]" />
          </span>
          <span className="text-lg font-bold text-[#dbe8ff]">ResumeMatch</span>
        </div>
        <p className="text-center">© 2026 ResumeMatch. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="rounded-md px-2 py-1 transition hover:bg-[#101a2d] hover:text-[#dbe8ff]">Privacy</a>
          <a href="#" className="rounded-md px-2 py-1 transition hover:bg-[#101a2d] hover:text-[#dbe8ff]">Terms</a>
          <a href="#" className="rounded-md px-2 py-1 transition hover:bg-[#101a2d] hover:text-[#dbe8ff]">Contact</a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
