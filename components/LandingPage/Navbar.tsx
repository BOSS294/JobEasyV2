'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    router.push('/');
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#223255]/70 bg-[#050913]/70 text-white backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-4 md:px-12">
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative overflow-hidden rounded-xl border border-[#2f446f] bg-[#0b1426]/85 px-4 py-2 text-left"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -left-12 top-0 h-full w-10 rotate-12 bg-white/15 blur-md"
            animate={{ x: [-20, 180, -20] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative text-2xl font-black tracking-wide text-[#ecf3ff] sm:text-3xl">
            JobEasy V2
          </span>
        </motion.button>

        <div className="hidden items-center gap-8 text-base font-semibold text-[#9fb1cc] md:flex">
          <Link href="#banner" className="rounded-lg px-3 py-1.5 transition hover:bg-[#101a2d] hover:text-white">Home</Link>
          <Link href="#features" className="rounded-lg px-3 py-1.5 transition hover:bg-[#101a2d] hover:text-white">Features</Link>
          <button onClick={() => alert('Coming soon!')} className="rounded-lg px-3 py-1.5 transition hover:bg-[#101a2d] hover:text-white">Pricing</button>
          <button
            onClick={handleSignOut}
            className="solid-btn-secondary rounded-xl px-4 py-2 transition"
          >
            Sign out
          </button>
          <button
            onClick={() => signIn('credentials')}
            className="solid-btn-primary rounded-xl px-4 py-2 transition"
          >
            Sign in
          </button>
        </div>

        <button className="rounded-lg p-1 text-[#d9e7ff] transition hover:bg-[#101a2d] md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel absolute left-0 top-full w-full border-t border-[#223255] px-6 py-6 md:hidden"
          >
            <div className="space-y-4 text-lg font-semibold text-[#d9e7ff]">
              <Link href="#banner" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 transition hover:bg-[#101a2d]">Home</Link>
              <Link href="#features" onClick={() => setIsOpen(false)} className="block rounded-lg px-3 py-2 transition hover:bg-[#101a2d]">Features</Link>
              <button onClick={() => alert('Coming soon!')} className="block rounded-lg px-3 py-2 text-left transition hover:bg-[#101a2d]">Pricing</button>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={handleSignOut} className="solid-btn-secondary w-full rounded-xl px-4 py-2">
                Sign out
              </button>
              <button onClick={() => signIn('credentials')} className="solid-btn-primary w-full rounded-xl px-4 py-2">
                Sign in
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
}
