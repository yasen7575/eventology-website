"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on Admin pages
  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Mission', href: '/#mission' },
    { name: 'Team', href: '/#core' },
    { name: 'Careers', href: '/#pipeline' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
           {/* Text Logo as requested for clean professional look */}
           <span className="text-2xl font-bold tracking-tight text-blue-900">Eventology</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-800 transition-colors"
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
                 <Link href="/admin" className="flex items-center gap-2 text-xs font-medium text-white bg-blue-800 px-4 py-2 rounded hover:bg-blue-900 transition-colors">
                   <LayoutDashboard size={14} />
                   Admin Dashboard
                 </Link>
               ) : (
                 <span className="text-sm text-slate-600">Welcome, {user.name}</span>
               )}
               <button onClick={() => logout()} className="text-sm text-slate-500 hover:text-blue-800">Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-800 transition-colors">
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-blue-800"
              >
                {link.name}
              </Link>
            ))}
             <div className="h-px bg-slate-100 my-2"></div>
             {user ? (
               <button onClick={() => logout()} className="text-left text-slate-600">Sign Out</button>
             ) : (
               <Link href="/login" onClick={() => setIsOpen(false)} className="text-blue-800 font-medium">Log In</Link>
             )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
