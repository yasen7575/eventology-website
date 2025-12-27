"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[#0f172a]" />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#1e293b] to-[#0f172a] opacity-80" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
        >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
                Eventology
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                High-Performance Event Management.<br/>
                <span className="text-blue-400 font-semibold">Scalable Execution. Professional Delivery.</span>
            </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full overflow-hidden transition-all shadow-lg hover:bg-blue-700 hover:shadow-blue-600/30"
          >
            <span className="relative flex items-center gap-2">
              Hire Eventology <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="#services"
            className="px-8 py-4 glass text-slate-200 font-bold rounded-full transition-all border border-white/10 hover:bg-white/10"
          >
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
