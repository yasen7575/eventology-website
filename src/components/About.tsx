"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Trophy, Target, Shield, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0f172a]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Who We Are
          </motion.h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400">
            Eventology is a full-service event management entity. We operate on a unique tiered workforce structure designed for scalability and quality control. From our high-energy Talent Pipeline to our seasoned Core Team, we have the right people for every job.
          </p>
        </div>

        {/* Unified Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Card 1: The Talent Pipeline */}
            <div className="group relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 hover:bg-white/5 transition-colors border border-blue-500/20 bg-blue-900/5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-blue-500/20 text-blue-400">
                    <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">The Talent Pipeline</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                    Our rigorous internal development program. We recruit and train top-performing students and juniors to provide high-energy, cost-effective manpower for large-scale operations.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Vetted & Trained Staff</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Cost-Effective Execution</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> High Energy & Passion</li>
                </ul>
            </div>

            {/* Card 2: The Core Team */}
            <div className="group relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 hover:bg-white/5 transition-colors border border-purple-500/20 bg-purple-900/5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-purple-500/20 text-purple-400">
                    <Shield size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">The Core Team</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                    Industry veterans and project managers who lead strategy and high-stakes execution. They ensure every event meets global standards of precision and safety.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Strategic Planning</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Crisis Management</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Quality Assurance</li>
                </ul>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            <StatItem end={500} label="Active Staff" icon={<Users size={20} />} suffix="+" />
            <StatItem end={50} label="Mega Events" icon={<Trophy size={20} />} suffix="+" />
            <StatItem end={15} label="Years Exp" icon={<Briefcase size={20} />} suffix="+" />
            <StatItem end={100} label="Success Rate" icon={<Target size={20} />} suffix="%" />
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';

function StatItem({ end, label, icon, suffix }: { end: number; label: string; icon: React.ReactNode; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
      let start = 0;
      const duration = 2000;
      const increment = end === 0 ? 0 : end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="flex justify-center items-center text-slate-500 mb-2 opacity-50">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
        {count}{suffix}
      </div>
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
