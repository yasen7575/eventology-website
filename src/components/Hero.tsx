"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          {/* Using the Atom Logo Concept - Ideally this would be an Image, but using CSS representation or the uploaded image if I had a URL for it.
              Since I can't hotlink the uploaded image easily without a public URL, I will simulate the "Atom" vibe with a placeholder or Icon.
              Wait, I can use the image if I put it in public. But for now, let's use a high-tech SVG representation.
          */}
          <div className="relative w-32 h-32 md:w-48 md:h-48">
             <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
             <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full rotate-60 animate-[spin_12s_linear_infinite]"></div>
             <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full -rotate-60 animate-[spin_15s_linear_infinite]"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={48} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
             </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6"
        >
          EVENTOLOGY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-light"
        >
          Precision Engineering for <span className="text-cyan-400 font-medium">Elite Events</span>.
          <br/>
          From Strategic Core to Massive Scale Execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link href="#contact" className="btn-primary flex items-center justify-center gap-2 group">
            INITIATE PROJECT
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
          <Link href="#pipeline" className="btn-outline">
            JOIN THE PIPELINE
          </Link>
        </motion.div>

        {/* Stats / Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-800 pt-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Execution Rate</div>
          </div>
          <div className="text-center border-l border-r border-slate-800">
            <div className="text-3xl font-bold text-white mb-1">TIER-1</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Personnel Standard</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">GLOBAL</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Operational Reach</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
