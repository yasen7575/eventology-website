"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (isScrolledRef.current !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
        isScrolledRef.current = shouldBeScrolled;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const fetchUser = async (sessionUser: User | null) => {
        if (sessionUser) {
            setUser(sessionUser);
            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', sessionUser.id)
                .single();
            setFullName(profile?.full_name || sessionUser.email);
        } else {
            setUser(null);
            setFullName(null);
        }
        setLoading(false);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      fetchUser(session?.user ?? null);
    });

    // Check initial session
    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        fetchUser(session?.user ?? null);
    };
    checkSession();

    return () => {
        window.removeEventListener("scroll", handleScroll)
        authListener?.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFullName(null);
    setUserMenuOpen(false);
  }

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
            className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Eventology
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {!loading && (user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
                    {fullName?.charAt(0).toUpperCase()}
                  </div>
                  <span>{fullName}</span>
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
                        onClick={handleLogout}
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
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow"
                >
                  Join Team
                </Link>
              </div>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 pt-24 pb-8 glass-dark md:hidden z-40"
          >
            <nav className="container mx-auto px-6 flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium hover:text-blue-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-[1px] bg-white/10 my-4"></div>
              {!loading && (user ? (
                <div className="flex flex-col items-center gap-4 w-full">
                   <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {fullName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{fullName}</span>
                   </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center px-6 py-3 text-lg font-medium text-red-400 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full">
                  <Link
                    href="/login"
                    className="w-full text-center px-6 py-3 text-lg font-medium hover:text-white text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/#join"
                    className="w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Our Team
                  </Link>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
