'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, Zap, Search,
  Hexagon, Star, Cpu, Globe, Users, Clock3, BrainCircuit, FileCheck2, Lock 
} from 'lucide-react';
import Banner1 from './Banner1';
import Navbar from './Navbar';

// --- 3D BACKGROUND COMPONENTS (React Three Fiber) ---
function Scene() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1, 100, 100]} position={[3, 0, -5]}>
          <MeshDistortMaterial color="#2ed5c8" speed={3} distort={0.4} radius={1} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.5, 64, 64]} position={[-4, 2, -8]}>
          <MeshDistortMaterial color="#4b79ff" speed={2} distort={0.5} radius={1} />
        </Sphere>
      </Float>
    </>
  );
}

type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  delay: number;
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: FeatureCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="group relative rounded-3xl border border-white/10 bg-[#0a111f]/60 p-8 hover:bg-[#0a111f]/80 transition-all overflow-hidden"
  >
    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#2ed5c8]/10 blur-2xl group-hover:bg-[#2ed5c8]/20" />
    <Icon className="mb-4 h-10 w-10 text-[#2ed5c8]" />
    <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-[#9fb1cc]">{desc}</p>
  </motion.div>
);

const pipelineSteps = [
  {
    title: 'Upload in Seconds',
    desc: 'Drop your PDF or DOCX and we structure core profile data immediately.',
    icon: FileCheck2,
  },
  {
    title: 'AI Skill Graphing',
    desc: 'Skill clusters and experience depth are mapped against live job demand.',
    icon: BrainCircuit,
  },
  {
    title: 'Prioritized Matches',
    desc: 'You get ranked opportunities with transparent score signals.',
    icon: Clock3,
  },
  {
    title: 'Private by Design',
    desc: 'Session-scoped handling keeps resume analysis tightly controlled.',
    icon: Lock,
  },
];

const faqs = [
  {
    q: 'How is this different from keyword matching?',
    a: 'We combine extracted skills, role context, and experience signals to score fit, not just term overlap.',
  },
  {
    q: 'Do I need to fill long forms manually?',
    a: 'No. Resume parsing handles most inputs automatically so you can focus on selecting roles.',
  },
  {
    q: 'Can I use this on mobile?',
    a: 'Yes. The landing and recommendation workflow are optimized for both desktop and mobile screens.',
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#04070d] text-white selection:bg-[#2ed5c8]/30">
      
      {/* 1. 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <Navbar />

      {/* 2. HERO SECTION */}
      <Banner1 />

      {/* 3. BENTO FEATURES */}
      <section id="features" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black md:text-6xl">Supercharged by <span className="text-[#4b79ff]">Intelligence.</span></h2>
            <p className="mt-4 text-[#9fb1cc]">Engineered for speed, privacy, and real-world hiring outcomes.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard 
              icon={Cpu} title="AI-Powered Matching" 
              desc="Deep semantic parsing identifies job alignment beyond simple keyword matching." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield} title="Privacy-First" 
              desc="Your data is encrypted and stays scoped to your session. We never sell your profile." 
              delay={0.2}
            />
            <FeatureCard 
              icon={Zap} title="Instant Analysis" 
              desc="Process complex multi-page resumes and thousands of jobs in under 6 seconds." 
              delay={0.3}
            />
            <FeatureCard 
              icon={Search} title="Skill-Gap Visibility" 
              desc="Instantly see what skills are missing for your target roles to improve your profile." 
              delay={0.4}
            />
            <FeatureCard 
              icon={Globe} title="Worldwide Support" 
              desc="Multi-language parsing and global job market intelligence at your fingertips." 
              delay={0.5}
            />
            <FeatureCard 
              icon={Users} title="Decision Ready" 
              desc="Organized match percentages help you choose roles quickly and confidently." 
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* 4.5 HOW IT WORKS */}
      <section className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-black md:text-6xl">How It Works</h2>
            <p className="mx-auto mt-4 max-w-3xl text-[#9fb1cc]">
              A focused pipeline built for speed and clarity from upload to actionable job shortlist.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-white/10 bg-[#0a111f]/70 p-7"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[#2ed5c8]/10 p-3 text-[#2ed5c8]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[#9fb1cc]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION (STICKY PARALLAX) */}
      <section id="stats" className="relative z-10 px-6 py-32 bg-[#050913]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-5xl font-black mb-8">Trusted by serious <br/><span className="text-[#2ed5c8]">professionals.</span></h2>
            <p className="text-[#9fb1cc] text-lg mb-12">Join over 10,000+ experts who have optimized their career paths using our transparent matching technology.</p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Match Rate', val: '85%' },
                { label: 'Active Users', val: '10K+' },
                { label: 'Companies', val: '5000+' },
                { label: 'Satisfaction', val: '92%' }
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-[#2ed5c8] pl-6">
                  <p className="text-4xl font-black">{stat.val}</p>
                  <p className="text-sm text-[#9fb1cc] uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
             {/* 3D Visual Decorative Element */}
             <div className="h-[400px] w-full rounded-[3rem] bg-gradient-to-br from-[#2ed5c8]/20 to-[#4b79ff]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <motion.div 
                  animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="h-64 w-64 rounded-full border border-white/10 flex items-center justify-center"
                >
                  <div className="h-48 w-48 rounded-full border border-[#2ed5c8]/30 flex items-center justify-center">
                    <Star className="text-[#2ed5c8] h-12 w-12 fill-[#2ed5c8]/20" />
                  </div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS */}
      <section id="reviews" className="relative z-10 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black md:text-6xl">Proof In Outcomes</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9fb1cc]">
              Teams and candidates use JobEasy to focus effort where conversion probability is highest.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: 'A. Patel', role: 'Data Analyst', quote: 'My response rate jumped after prioritizing high-fit roles.', score: '95%' },
              { name: 'R. Mehta', role: 'Frontend Engineer', quote: 'Skill-gap visibility made my resume updates objective.', score: '93%' },
              { name: 'K. Rao', role: 'Product Ops', quote: 'Fast parsing and clean rankings saved hours every week.', score: '97%' },
            ].map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/10 bg-[#0b1324]/70 p-8"
              >
                <p className="text-lg leading-relaxed text-white">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-7 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-[#9fb1cc]">{review.role}</p>
                  </div>
                  <p className="text-2xl font-black text-[#2ed5c8]">{review.score}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="relative z-10 px-6 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-[#071022]/80 p-8 md:p-12">
          <h2 className="mb-8 text-center text-4xl font-black md:text-5xl">Frequently Asked</h2>
          <div className="space-y-5">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-[#0b1427] p-5">
                <h3 className="text-lg font-bold text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9fb1cc]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="relative z-10 px-6 py-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-5xl rounded-[3rem] bg-gradient-to-b from-[#2ed5c8] to-[#1aa399] px-8 py-24 text-center text-[#04070d]"
        >
          <h2 className="text-5xl font-black md:text-7xl">Ready to upgrade?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-bold opacity-80">
            Upload your resume now and start seeing roles that actually align with your expertise.
          </p>
          <button className="mt-10 rounded-2xl bg-[#04070d] px-12 py-5 text-xl font-black text-white shadow-2xl transition-transform hover:scale-105 active:scale-95">
            Analyze Resume Now
          </button>
        </motion.div>
      </section>

      {/* 9. FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Hexagon className="h-6 w-6 text-[#2ed5c8]" />
            <span className="text-xl font-black">JobEasy V2</span>
          </div>
          <p className="text-[#9fb1cc] text-sm">© 2026 JobEasy AI. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-bold text-[#9fb1cc]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  );
}