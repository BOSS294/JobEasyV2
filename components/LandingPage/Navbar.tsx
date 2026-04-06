'use client';

import { Menu, X, Home, LayoutGrid, CreditCard, LogIn, LogOut, Hexagon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dynamic glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    router.push('/');
    await signOut({ callbackUrl: '/' });
  };

  const navLinks = [
    { name: 'Home', href: '#banner', icon: Home },
    { name: 'Features', href: '#features', icon: LayoutGrid },
    { name: 'Pricing', href: '#', icon: CreditCard, onClick: () => alert('Coming soon!') },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'bg-[#050913]/80 border-b border-[#223255]/70 backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-4 md:px-12">
        {/* Brand */}
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.05, rotateZ: -1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[#2f446f]/50 bg-gradient-to-br from-[#0b1426]/90 to-[#050913]/90 px-4 py-2 shadow-lg backdrop-blur-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Hexagon className="h-6 w-6 text-[#2ed5c8] fill-[#2ed5c8]/20" />
          </motion.div>
          <span className="relative text-2xl font-black tracking-wide text-[#ecf3ff]">
            JobEasy<span className="text-[#4b79ff]">V2</span>
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-1.5 backdrop-blur-lg md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return link.onClick ? (
              <button key={link.name} onClick={link.onClick} className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[#9fb1cc] transition-all hover:bg-white/10 hover:text-white">
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-[#2ed5c8]" /> {link.name}
              </button>
            ) : (
              <Link key={link.name} href={link.href} className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[#9fb1cc] transition-all hover:bg-white/10 hover:text-white">
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-[#4b79ff]" /> {link.name}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={handleSignOut} className="flex items-center gap-2 rounded-xl border border-[#2f446f] bg-transparent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/5">
            <LogOut className="h-4 w-4" /> Sign out
          </motion.button>
          <motion.button whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(46,213,200,0.4)" }} whileTap={{ scale: 0.95 }} onClick={() => signIn('credentials')} className="solid-btn-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm">
            <LogIn className="h-4 w-4" /> Sign in
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#d9e7ff] backdrop-blur-md transition hover:bg-white/10 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="glass-panel overflow-hidden border-b border-[#223255] md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div key={link.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    {link.onClick ? (
                      <button onClick={() => { link.onClick(); setIsOpen(false); }} className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-lg font-semibold text-[#d9e7ff] hover:bg-white/10">
                        <Icon className="h-5 w-5 text-[#2ed5c8]" /> {link.name}
                      </button>
                    ) : (
                      <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl p-3 text-lg font-semibold text-[#d9e7ff] hover:bg-white/10">
                        <Icon className="h-5 w-5 text-[#4b79ff]" /> {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                <button onClick={handleSignOut} className="flex items-center justify-center gap-2 rounded-xl border border-[#2f446f] bg-transparent py-3 font-bold text-white"><LogOut className="h-5 w-5"/> Sign out</button>
                <button onClick={() => signIn('credentials')} className="solid-btn-primary flex items-center justify-center gap-2 rounded-xl py-3 text-lg"><LogIn className="h-5 w-5"/> Sign in</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}