"use client";

import { motion } from "framer-motion";
import { Monitor, Camera, Users, Megaphone, CheckCircle2 } from "lucide-react";

export default function Services() {
  const services = [
    {
        title: "Digital & Tech",
        icon: <Monitor size={24} />,
        description: "From custom landing pages to scalable enterprise registration systems. We handle the full digital lifecycle of your event.",
        features: ["Registration Systems", "Event Apps", "On-site Check-in"]
    },
    {
        title: "Media Production",
        icon: <Camera size={24} />,
        description: "Capture the moment with professional photography, videography, and live broadcasting capabilities.",
        features: ["Event Coverage", "Aftermovies", "Live Streaming"]
    },
    {
        title: "On-Ground Operations",
        icon: <Users size={24} />,
        description: "The backbone of any successful event. We provide tiered staffing solutions ranging from energetic volunteers to expert project managers.",
        features: ["Crowd Management", "VIP Protocol", "Logistics & Security"]
    },
    {
        title: "Marketing & Strategy",
        icon: <Megaphone size={24} />,
        description: "Drive attendance and engagement with data-driven marketing campaigns and viral social strategies.",
        features: ["Social Media Management", "Brand Activation", "Community Outreach"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Our Capabilities
          </motion.h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-400">
            Comprehensive solutions tailored to your needs. Whether you need a student team for energy or industry experts for precision, we scale to fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-8 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 transition-all hover:bg-slate-800/80 group"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            {service.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 pl-16">
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                                <CheckCircle2 size={14} className="text-blue-500" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
