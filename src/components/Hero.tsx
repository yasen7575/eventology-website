"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)',
          backgroundSize: '30px 30px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Eventology
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            Professional Event Management & Staffing Solutions.
            <br/>
            Delivering excellence from strategy to execution.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <Link href="#contact" className="btn-primary flex items-center justify-center gap-2">
              Start a Project
              <ArrowRight size={18} />
            </Link>
            <Link href="#pipeline" className="btn-outline">
              Join Our Team
            </Link>
          </div>
        </motion.div>

        {/* Stats / Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-200 pt-12"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">100%</div>
            <div className="text-sm text-slate-500 font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center md:border-l md:border-r border-slate-200">
            <div className="text-4xl font-bold text-blue-900 mb-2">Premium</div>
            <div className="text-sm text-slate-500 font-medium">Staffing Standards</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">Nationwide</div>
            <div className="text-sm text-slate-500 font-medium">Operational Reach</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
