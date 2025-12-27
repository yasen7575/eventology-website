"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, GraduationCap, Users, Trophy, Zap, Shield, Cpu, Target } from "lucide-react";
import { ThemeMode } from "@/app/page";
import { cn } from "@/lib/utils";

interface AboutProps {
  mode: ThemeMode;
}

export default function About({ mode }: AboutProps) {
  const isCommunity = mode === "community";

  return (
    <section id="about" className="py-24 relative overflow-hidden transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "text-3xl md:text-5xl font-bold mb-6",
                isCommunity ? "font-mono tracking-tighter" : "font-sans tracking-tight"
            )}
          >
            {isCommunity ? (
                <>The <span className="text-cyan-400">Talent Pipeline</span></>
            ) : (
                <>The <span className="text-amber-400">Core Expertise</span></>
            )}
          </motion.h2>
          <motion.p
            key={`desc-${mode}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={cn(
                "max-w-2xl mx-auto text-lg",
                isCommunity ? "text-cyan-100/70 font-mono text-sm" : "text-slate-400 font-sans"
            )}
          >
            {isCommunity
                ? "We don't just find volunteers; we forge them. Our rigorous development program turns ambitious students into field-ready agents."
                : "A curated collective of industry veterans. Our project managers and technical leads bring decades of combined experience to your high-stakes events."
            }
          </motion.p>
        </div>

        {/* Dynamic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {isCommunity ? (
                <>
                    {/* Card 1: The Academy */}
                    <AboutCard
                        title="The Academy"
                        description="Intensive workshops and real-world simulations. We filter for grit, speed, and problem-solving before they ever touch your event."
                        icon={<GraduationCap size={28} />}
                        accent="cyan"
                        bullets={["Bootcamp Training", "Crisis Simulation", "Skill Verification"]}
                        delay={0}
                    />
                    {/* Card 2: Field Deployment */}
                    <AboutCard
                        title="Field Deployment"
                        description="Junior agents operate under strict SOPs. They bring the energy and manpower; we provide the command structure."
                        icon={<Zap size={28} />}
                        accent="pink"
                        bullets={["SOP Compliance", "Real-time Supervision", "High-Energy Execution"]}
                        delay={0.2}
                    />
                </>
            ) : (
                <>
                    {/* Card 1: Strategic Planning */}
                    <AboutCard
                        title="Strategic Planning"
                        description="We align every logistical detail with your brand's higher objectives. It's not just an event; it's a statement."
                        icon={<Target size={28} />}
                        accent="amber"
                        bullets={["Risk Assessment", "Brand Alignment", "Resource Optimization"]}
                        delay={0}
                    />
                    {/* Card 2: Operational Command */}
                    <AboutCard
                        title="Operational Command"
                        description="On-site directors with authority. We handle VIP protocols, technical failures, and crowd dynamics without you breaking a sweat."
                        icon={<Shield size={28} />}
                        accent="slate"
                        bullets={["VIP Protocol", "Technical Redundancy", "Crisis Neutralization"]}
                        delay={0.2}
                    />
                </>
            )}
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
            {isCommunity ? (
                <>
                    <StatItem end={500} label="Active Agents" icon={<Users size={20} />} suffix="+" color="text-cyan-400" />
                    <StatItem end={50} label="Uni Partners" icon={<GraduationCap size={20} />} suffix="" color="text-pink-400" />
                    <StatItem end={12000} label="Hours Logged" icon={<Cpu size={20} />} suffix="+" color="text-cyan-400" />
                    <StatItem end={100} label="Passion Level" icon={<Zap size={20} />} suffix="%" color="text-pink-400" />
                </>
            ) : (
                <>
                    <StatItem end={15} label="Years Avg Exp" icon={<Briefcase size={20} />} suffix="+" color="text-amber-400" />
                    <StatItem end={50} label="Mega Events" icon={<Trophy size={20} />} suffix="+" color="text-slate-300" />
                    <StatItem end={0} label="Critical Failures" icon={<Shield size={20} />} suffix="" color="text-amber-400" />
                    <StatItem end={100} label="Client Retention" icon={<Target size={20} />} suffix="%" color="text-slate-300" />
                </>
            )}
        </div>
      </div>
    </section>
  );
}

function AboutCard({ title, description, icon, accent, bullets, delay }: { title: string, description: string, icon: React.ReactNode, accent: string, bullets: string[], delay: number }) {
    const isCyan = accent === "cyan";
    const isPink = accent === "pink";
    const isAmber = accent === "amber";

    let bgClass = "bg-slate-800/50";
    let iconBg = "bg-slate-700/50 text-slate-300";
    let bulletColor = "bg-slate-400";

    if (isCyan) {
        bgClass = "bg-cyan-900/10 border-cyan-500/20";
        iconBg = "bg-cyan-500/20 text-cyan-400";
        bulletColor = "bg-cyan-400";
    } else if (isPink) {
        bgClass = "bg-pink-900/10 border-pink-500/20";
        iconBg = "bg-pink-500/20 text-pink-400";
        bulletColor = "bg-pink-400";
    } else if (isAmber) {
        bgClass = "bg-amber-900/10 border-amber-500/20";
        iconBg = "bg-amber-500/20 text-amber-400";
        bulletColor = "bg-amber-400";
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={cn("group relative rounded-3xl overflow-hidden glass-card p-8 md:p-12 hover:bg-white/5 transition-colors border", bgClass)}
        >
            <div className="relative z-10">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", iconBg)}>
                {icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {description}
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                {bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", bulletColor)} /> {b}
                    </li>
                ))}
              </ul>
            </div>
        </motion.div>
    )
}

function StatItem({ end, label, icon, suffix, color }: { end: number; label: string; icon: React.ReactNode; suffix: string, color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
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
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center items-center text-slate-500 mb-2 opacity-50">
        {icon}
      </div>
      <div className={cn("text-4xl md:text-5xl font-bold mb-2", color)}>
        {count}{suffix}
      </div>
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
