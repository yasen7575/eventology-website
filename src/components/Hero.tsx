"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f172a] opacity-90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 z-0 animate-pulse" />
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob mix-blend-screen" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-blue-200">The #1 Event Community in Egypt</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          From Learning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            to Leading.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The ultimate bridge between ambitious students and world-class events. 
          Join the elite team delivering high-tech, full-service event solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Hire Eventology <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="#join"
            className="group px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/10 hover:border-blue-500/50 flex items-center gap-2"
          >
            <Users size={20} className="text-blue-400" />
            Join the Community
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-slate-500 flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-blue-400 rounded-full mb-1"
          />
        </div>
      </motion.div>
    </section>
  );
}
