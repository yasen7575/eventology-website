"use client";

import { motion } from 'framer-motion';
import { UserCheck, Zap, Brain, Shield } from 'lucide-react';
import Image from 'next/image';

const CORE_MEMBERS = [
  {
    name: "ALEXANDER V.",
    role: "STRATEGIC OPERATIONS LEAD",
    id: "OP-001",
    specialty: "High-Stakes Coordination",
  },
  {
    name: "SARAH J.",
    role: "TECHNICAL SOLUTIONS ARCHITECT",
    id: "TC-042",
    specialty: "Infrastructure & Logistics",
  },
  {
    name: "MICHAEL R.",
    role: "CRISIS MANAGEMENT SPECIALIST",
    id: "CM-009",
    specialty: "Risk Mitigation",
  },
  {
    name: "ELENA K.",
    role: "HUMAN CAPITAL DIRECTOR",
    id: "HC-101",
    specialty: "Talent Deployment",
  }
];

export default function CoreTeam() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="tech-header">THE OPERATORS</h2>
          <h3 className="text-4xl font-bold text-white mb-4">THE CORE TEAM</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Seasoned professionals responsible for strategy, high-level execution, and direct supervision of the talent pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-1 group relative overflow-hidden"
            >
              <div className="bg-slate-900/50 h-64 rounded-lg mb-4 relative overflow-hidden flex items-end justify-center pb-0">
                 {/* Placeholder Silhouette */}
                 <div className="w-48 h-56 bg-gradient-to-t from-slate-700 to-slate-800 rounded-t-full opacity-50 group-hover:opacity-80 transition-opacity"></div>

                 <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-500/50 border border-cyan-500/20 px-2 py-0.5 rounded">
                    ID: {member.id}
                 </div>
              </div>

              <div className="p-4">
                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{member.name}</h4>
                <p className="text-xs text-cyan-500 font-bold tracking-wider mb-3">{member.role}</p>
                <div className="h-px bg-slate-800 my-3"></div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Brain size={14} />
                  <span>{member.specialty}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
