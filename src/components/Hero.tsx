"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ThemeMode } from "@/app/page";
import { cn } from "@/lib/utils";

interface HeroProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

export default function Hero({ mode, toggleMode }: HeroProps) {
  const isCommunity = mode === "community";

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden transition-colors duration-1000">
      {/* Dynamic Backgrounds */}
      <AnimatePresence mode="popLayout">
        {isCommunity ? (
          <motion.div
            key="bg-community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
             {/* Cyber/Matrix Grid */}
            <div className="absolute inset-0 bg-[#050510]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

            {/* Neon Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse delay-1000 mix-blend-screen" />
          </motion.div>
        ) : (
          <motion.div
            key="bg-elite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            {/* Luxury Gradient */}
            <div className="absolute inset-0 bg-[#000000]" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black opacity-90" />

            {/* Gold Dust / Subtle Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">

        {/* THE ENGINE SWITCH */}
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 relative"
        >
            <div className="flex items-center gap-6 p-2 rounded-full glass border-white/10 relative z-10">
                <button
                    onClick={() => mode !== 'community' && toggleMode()}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2",
                        isCommunity
                        ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/50"
                        : "text-slate-500 hover:text-white"
                    )}
                >
                    <Zap size={16} /> Passion
                </button>

                <div className="h-6 w-px bg-white/10" />

                <button
                    onClick={() => mode !== 'elite' && toggleMode()}
                    className={cn(
                        "px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2",
                        !isCommunity
                        ? "bg-amber-500/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/50"
                        : "text-slate-500 hover:text-white"
                    )}
                >
                    <ShieldCheck size={16} /> Perfection
                </button>
            </div>
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-slate-500 whitespace-nowrap">
                Choose Your Execution Engine
            </p>
        </motion.div>

        {/* Dynamic Headings */}
        <div className="min-h-[200px] flex flex-col items-center justify-center mb-8">
            <AnimatePresence mode="wait">
                {isCommunity ? (
                    <motion.div
                        key="content-community"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 font-mono uppercase glitch" data-text="Rising Energy">
                            Rising <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Energy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-cyan-100/70 max-w-2xl mx-auto font-mono">
                            Powered by the next generation of talent. <br/>
                            <span className="text-pink-400">High Passion. Low Cost. Limitless Potential.</span>
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content-elite"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 font-sans">
                            Absolute <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Mastery</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
                            Executed by industry veterans. <br/>
                            <span className="text-amber-400">Zero Failure. Military Precision. Global Standards.</span>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          layout
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className={cn(
                "group relative px-8 py-4 text-white font-bold rounded-full overflow-hidden transition-all shadow-lg",
                isCommunity
                ? "bg-cyan-600 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
                : "bg-amber-600 hover:shadow-[0_0_40px_rgba(217,119,6,0.6)]"
            )}
          >
            <div className={cn(
                "absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r",
                isCommunity ? "from-cyan-600 to-pink-600" : "from-amber-600 to-yellow-600"
            )} />
            <span className="relative flex items-center gap-2">
              {isCommunity ? "Start a Project" : "Request Proposal"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="#services"
            className={cn(
                "group px-8 py-4 glass font-bold rounded-full transition-all border hover:bg-white/5 flex items-center gap-2",
                isCommunity
                ? "text-cyan-400 border-cyan-500/30 hover:border-cyan-400"
                : "text-amber-400 border-amber-500/30 hover:border-amber-400"
            )}
          >
            Explore Capabilities
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className={cn(
            "w-[30px] h-[50px] rounded-full border-2 flex justify-center p-2 transition-colors duration-500",
            isCommunity ? "border-cyan-500/50" : "border-amber-500/50"
        )}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={cn(
                "w-1.5 h-1.5 rounded-full mb-1",
                isCommunity ? "bg-cyan-400" : "bg-amber-400"
            )}
          />
        </div>
      </motion.div>
    </section>
  );
}
