"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ThemeMode } from "@/app/page";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

interface NavbarProps {
  mode: ThemeMode;
}

export default function Navbar({ mode }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isCommunity = mode === "community";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-4 glass shadow-lg" : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className={cn(
                "text-2xl font-bold tracking-tighter bg-clip-text text-transparent transition-all duration-700",
                isCommunity
                ? "bg-gradient-to-r from-cyan-400 to-pink-500 font-mono"
                : "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 font-sans uppercase tracking-widest"
            )}
          >
            Eventology
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCommunity ? "hover:text-cyan-400 text-slate-300" : "hover:text-amber-400 text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                >
                  <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs",
                      isCommunity ? "bg-gradient-to-r from-cyan-500 to-pink-500" : "bg-gradient-to-r from-amber-500 to-yellow-600"
                  )}>
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className={cn("transition-transform", userMenuOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1e293b] border border-white/10 shadow-xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-white text-slate-300 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/#join"
                  className={cn(
                      "px-5 py-2 rounded-full font-medium text-sm transition-all duration-300",
                      isCommunity
                      ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                      : "bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  )}
                >
                  Join Team
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className={cn(
                "md:hidden p-2 transition-colors",
                isCommunity ? "text-white hover:text-cyan-400" : "text-amber-100 hover:text-amber-400"
            )}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0f172a]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2">
                    {user.name.charAt(0)}
                  </div>
                  <p className="text-xl font-bold">Welcome, {user.name.split(" ")[0]}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-8 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-medium text-slate-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/#join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow"
                >
                  Join Team
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
