"use client";

import { motion } from 'framer-motion';
import { User, Briefcase, Award } from 'lucide-react';

const CORE_MEMBERS = [
  {
    name: "Alexander V.",
    role: "Strategic Operations Lead",
    specialty: "Event Coordination",
  },
  {
    name: "Sarah J.",
    role: "Technical Solutions Architect",
    specialty: "Infrastructure & Logistics",
  },
  {
    name: "Michael R.",
    role: "Crisis Management Specialist",
    specialty: "Risk Mitigation",
  },
  {
    name: "Elena K.",
    role: "Human Resources Director",
    specialty: "Talent Management",
  }
];

export default function CoreTeam() {
  return (
    <section className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-800 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-4">Leadership Team</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Seasoned professionals responsible for strategy and execution excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_MEMBERS.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full mb-6 flex items-center justify-center mx-auto text-slate-300">
                 <User size={40} />
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                <p className="text-sm text-blue-700 font-medium mb-4">{member.role}</p>
                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Award size={16} />
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
