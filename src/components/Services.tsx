"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Monitor, Camera, Megaphone, Terminal, Award } from "lucide-react";
import { ThemeMode } from "@/app/page";
import { cn } from "@/lib/utils";

interface ServicesProps {
  mode: ThemeMode;
}

export default function Services({ mode }: ServicesProps) {
  const isCommunity = mode === "community";

  const services = [
    {
        title: "Digital & Tech",
        icon: <Monitor size={24} />,
        community: {
            detail: "Websites & Reg Forms",
            executor: "Junior Developers",
            desc: "Custom landing pages built by our rising tech talent."
        },
        elite: {
            detail: "Enterprise Platforms",
            executor: "Senior Engineers",
            desc: "Scalable, secure registration systems with API integrations."
        }
    },
    {
        title: "Media Production",
        icon: <Camera size={24} />,
        community: {
            detail: "Event Coverage",
            executor: "Media Students",
            desc: "Photo/Video documentation to capture the vibe."
        },
        elite: {
            detail: "Cinema-Grade",
            executor: "Creative Directors",
            desc: "High-end commercials, live broadcasting, and post-production."
        }
    },
    {
        title: "On-Ground Ops",
        icon: <Users size={24} />,
        community: {
            detail: "Crowd Management",
            executor: "Volunteers",
            desc: "Energetic ushers to guide guests and manage flow."
        },
        elite: {
            detail: "White-Glove Service",
            executor: "Pro Managers",
            desc: "VIP protocol, security coordination, and crisis handling."
        }
    },
    {
        title: "Marketing",
        icon: <Megaphone size={24} />,
        community: {
            detail: "Social Buzz",
            executor: "Content Creators",
            desc: "Viral campaigns driven by youth trends."
        },
        elite: {
            detail: "Brand Strategy",
            executor: "Marketing Leads",
            desc: "Data-driven campaigns with measurable ROI."
        }
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden transition-colors duration-700">
        {/* Background Elements */}
        {isCommunity ? (
            <>
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[128px] pointer-events-none" />
            </>
        ) : (
            <>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
            </>
        )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "text-3xl md:text-5xl font-bold mb-6",
                isCommunity ? "font-mono" : "font-sans"
            )}
          >
            {isCommunity ? (
                <>Level 1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Capabilities</span></>
            ) : (
                <>Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Solutions</span></>
            )}
          </motion.h2>
          <p className={cn(
              "max-w-3xl mx-auto text-lg",
              isCommunity ? "text-cyan-100/60 font-mono text-sm" : "text-slate-400 font-sans"
          )}>
            {isCommunity
             ? "High energy execution powered by the Talent Pipeline. Perfect for student activities, non-profits, and budget-friendly activations."
             : "Flawless delivery by the Core Team. Designed for corporate summits, international conferences, and high-stakes launches."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => {
                const data = isCommunity ? service.community : service.elite;
                return (
                    <motion.div
                        key={`${mode}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={cn(
                            "group p-1 rounded-2xl relative overflow-hidden",
                            isCommunity ? "bg-gradient-to-br from-cyan-500/20 to-pink-500/20" : "bg-gradient-to-br from-white/5 to-white/10 hover:from-amber-500/20 hover:to-amber-600/20 transition-all"
                        )}
                    >
                        <div className={cn(
                            "h-full rounded-[14px] p-6 relative overflow-hidden flex flex-col justify-between",
                            isCommunity ? "bg-slate-900/90" : "bg-black/90"
                        )}>
                            {/* Icon & Title */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className={cn(
                                    "p-3 rounded-xl",
                                    isCommunity ? "bg-cyan-500/20 text-cyan-400" : "bg-amber-500/10 text-amber-400"
                                )}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className={cn("text-xl font-bold text-white", isCommunity ? "font-mono" : "font-sans")}>{service.title}</h3>
                                    <div className={cn("text-xs font-bold uppercase tracking-wider", isCommunity ? "text-pink-400" : "text-slate-500")}>
                                        {data.executor}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {data.desc}
                                </p>
                            </div>

                            {/* Badge */}
                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className={cn("text-sm font-medium", isCommunity ? "text-cyan-200" : "text-amber-200")}>
                                    {data.detail}
                                </span>
                                {isCommunity ? (
                                    <Terminal size={16} className="text-cyan-500 opacity-50" />
                                ) : (
                                    <Award size={16} className="text-amber-500 opacity-50" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
}
