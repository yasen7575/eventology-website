"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, GraduationCap, Users, Trophy } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            The <span className="text-blue-500">Eventology</span> Concept
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            We are more than just an agency. We are an ecosystem that nurtures talent and delivers excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* The Bridge */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 hover:bg-white/5 transition-colors border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">The Bridge</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Connecting ambitious students to real-world volunteering opportunities. We provide the training, mentorship, and platform for the next generation of event leaders to shine.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Hands-on experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Networking with industry pros
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Skill development workshops
                </li>
              </ul>
            </div>
          </motion.div>

          {/* The Elite Team */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 hover:bg-white/5 transition-colors border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Briefcase size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">The Elite Team</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                A full-service agency for large-scale events. From management and logistics to high-end web dev and media production, our elite members deliver perfection.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Professional Management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Tech & Creative Solutions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Executing Major Conferences
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          <StatItem end={50} label="Events Organized" icon={<Trophy size={20} />} suffix="+" />
          <StatItem end={2000} label="Volunteers" icon={<Users size={20} />} suffix="+" />
          <StatItem end={24} label="Elite Members" icon={<Briefcase size={20} />} suffix="" />
          <StatItem end={100} label="Client Satisfaction" icon={<Users size={20} />} suffix="%" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ end, label, icon, suffix }: { end: number; label: string; icon: React.ReactNode; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      
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
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center items-center text-slate-500 mb-2">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
