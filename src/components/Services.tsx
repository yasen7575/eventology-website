"use client";

import { motion } from "framer-motion";
import { Calendar, Code, MonitorPlay, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Event Planning",
    description: "End-to-end management for conferences, concerts, and university events. We handle the chaos so you don't have to.",
    icon: <Calendar size={32} />,
    color: "from-blue-500 to-cyan-400",
    highlight: false,
  },
  {
    title: "Tech Solutions",
    description: "Cutting-edge web development, registration systems, and digital experiences that elevate your event's brand.",
    icon: <Code size={32} />,
    color: "from-purple-500 to-pink-500",
    highlight: true,
  },
  {
    title: "Creative Media",
    description: "High-end graphic design, video editing, and content creation to capture every moment in style.",
    icon: <MonitorPlay size={32} />,
    color: "from-orange-500 to-red-500",
    highlight: false,
  },
  {
    title: "On-ground Logistics",
    description: "Professional ushers, security coordination, and seamless crowd management for large-scale gatherings.",
    icon: <ShieldCheck size={32} />,
    color: "from-green-500 to-emerald-500",
    highlight: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Capabilities</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We are a tech-driven creative hub. Our services go beyond basic organizing to deliver immersive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 group ${
                service.highlight
                  ? "bg-gradient-to-b from-slate-800 to-slate-900 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                  : "glass-card border-white/5 hover:border-white/10"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white shadow-lg">
                  POPULAR
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-0.5 mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center text-white">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
