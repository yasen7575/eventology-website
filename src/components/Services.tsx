"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Users, Zap, Star, Layout, UserCog, User } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            One Platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Two Levels of Execution.</span>
          </motion.h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            We offer the same comprehensive full-service capabilities across both tiers.
            The difference is in the workforce: <strong>Choose the execution integration that fits your scale and budget.</strong>
          </p>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Tier 1: Community */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-1 rounded-3xl bg-gradient-to-br from-white/5 to-white/10"
          >
            <div className="h-full bg-[#0f172a] rounded-[22px] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Users size={200} />
              </div>

              {/* Header */}
              <div className="relative z-10 mb-8 border-b border-white/10 pb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                  Tier 1
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">The Community</h3>
                <p className="text-slate-400 text-sm mb-4">Ideally suits student activities & non-profits.</p>
                <div className="text-2xl font-bold text-white">Free / Low Cost</div>
                <p className="text-xs text-slate-500 mt-1">Covered by "The Talent Pipeline"</p>
              </div>

              {/* Execution Specs */}
              <div className="space-y-6 relative z-10">
                <ServiceRow
                  title="Tech Solutions"
                  detail="Custom Websites & forms"
                  executor="Junior Developers"
                  isElite={false}
                />
                <ServiceRow
                  title="Guest Experience"
                  detail="Ushers & Crowd Mgmt"
                  executor="Student Volunteers"
                  isElite={false}
                />
                <ServiceRow
                  title="Creative Media"
                  detail="Photo/Video Coverage"
                  executor="Media Students"
                  isElite={false}
                />
                <ServiceRow
                  title="Operations"
                  detail="On-site Logistics"
                  executor="Learners (Supervised)"
                  isElite={false}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mt-1">
                    <Star size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">The Trade-off</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Work is performed by enthusiastic learners gaining experience. High effort, strict supervision, but standard turnover risks apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tier 2: Elite */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_50px_rgba(79,70,229,0.2)]"
          >
            {/* "Recommended" Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg z-20">
              Recommended for Corporate
            </div>

            <div className="h-full bg-[#0b1121] rounded-[22px] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield size={200} />
              </div>

              {/* Header */}
              <div className="relative z-10 mb-8 border-b border-white/10 pb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
                  Tier 2
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">The Elite</h3>
                <p className="text-slate-400 text-sm mb-4">For corporate events requiring perfection.</p>
                <div className="text-2xl font-bold text-white">Premium</div>
                <p className="text-xs text-slate-500 mt-1">Covered by "The Core Team"</p>
              </div>

              {/* Execution Specs */}
              <div className="space-y-6 relative z-10">
                <ServiceRow
                  title="Tech Solutions"
                  detail="Custom Websites & forms"
                  executor="Senior Tech Leads"
                  isElite={true}
                />
                <ServiceRow
                  title="Guest Experience"
                  detail="Call Centers & RSVP"
                  executor="Pro Event Managers"
                  isElite={true}
                />
                <ServiceRow
                  title="Creative Media"
                  detail="Cinema-grade Production"
                  executor="Creative Directors"
                  isElite={true}
                />
                <ServiceRow
                  title="Operations"
                  detail="Crisis Management"
                  executor="Industry Experts"
                  isElite={true}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500 mt-1">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">The Promise</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Zero-fail guarantee. Dedicated project managers, crisis handling, and agency-level quality assurance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ServiceRow({ title, detail, executor, isElite }: { title: string, detail: string, executor: string, isElite: boolean }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-lg mt-0.5 ${isElite ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
          <Check size={14} />
        </div>
        <div>
          <div className="font-semibold text-slate-200 text-sm">{title}</div>
          <div className="text-xs text-slate-500">{detail}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-xs font-bold px-2 py-1 rounded-md ${isElite ? 'bg-purple-500/10 text-purple-300' : 'bg-slate-800 text-slate-400'}`}>
          {executor}
        </div>
      </div>
    </div>
  );
}
