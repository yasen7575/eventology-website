"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on Admin pages
  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Mission', href: '/#mission' },
    { name: 'Core Team', href: '/#core' },
    { name: 'Pipeline', href: '/#pipeline' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 rounded-full border-2 border-cyan-500 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
              <span className="text-cyan-400 font-bold text-lg">E</span>
           </div>
           <span className="text-xl font-bold tracking-tight text-white">EVENTOLOGY</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 uppercase tracking-wider transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth / Action */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
               {user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? (
                 <Link href="/admin" className="flex items-center gap-2 text-xs font-mono text-cyan-400 border border-cyan-900 bg-cyan-900/10 px-3 py-1.5 rounded hover:bg-cyan-900/20 transition-colors">
                   <Terminal size={14} />
                   MISSION CONTROL
                 </Link>
               ) : (
                 <span className="text-sm text-slate-400">Welcome, {user.name}</span>
               )}
               <button onClick={() => logout()} className="text-sm text-slate-500 hover:text-white">Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              LOGIN
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-cyan-400 uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
             <div className="h-px bg-slate-800 my-2"></div>
             {user ? (
               <button onClick={() => logout()} className="text-left text-slate-400">Sign Out</button>
             ) : (
               <Link href="/login" onClick={() => setIsOpen(false)} className="text-cyan-400">Login</Link>
             )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
