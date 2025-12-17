"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "All" | "University Events" | "Conferences" | "Media Production";

const projects = [
  {
    id: 1,
    title: "Nile University Tech Fest",
    category: "University Events",
    image: "bg-gradient-to-br from-blue-600 to-indigo-800",
    description: "Managed the entire logistics and registration system for over 3,000 attendees. Provided a seamless digital entry experience.",
  },
  {
    id: 2,
    title: "Global Climate Conference",
    category: "Conferences",
    image: "bg-gradient-to-br from-emerald-600 to-teal-800",
    description: "Executed high-level security protocols and VIP ushering for international delegates.",
  },
  {
    id: 3,
    title: "Eventology Promo 2024",
    category: "Media Production",
    image: "bg-gradient-to-br from-purple-600 to-pink-800",
    description: "Directed, shot, and edited a cinematic brand reveal video showcasing our elite team capabilities.",
  },
  {
    id: 4,
    title: "Startup Summit Cairo",
    category: "Conferences",
    image: "bg-gradient-to-br from-orange-600 to-red-800",
    description: "Developed a custom networking app and managed stage production for 50+ speakers.",
  },
  {
    id: 5,
    title: "Graduation Ceremony '23",
    category: "University Events",
    image: "bg-gradient-to-br from-cyan-600 to-blue-800",
    description: "Coordinated 200+ volunteers to ensure a smooth ceremony for 1,500 graduates and their families.",
  },
  {
    id: 6,
    title: "Digital Art Exhibition",
    category: "Media Production",
    image: "bg-gradient-to-br from-fuchsia-600 to-rose-800",
    description: "Created immersive projection mapping and digital displays for the main gallery.",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-[#0b1120]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Proof of Work</h2>
            <p className="text-slate-400 max-w-xl">
              From campus activations to international summits, we deliver excellence at every scale.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {(["All", "University Events", "Conferences", "Media Production"] as Category[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                {/* Placeholder for Image */}
                <div className={`w-full h-full ${project.image} transition-transform duration-500 group-hover:scale-110`} />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold text-white flex items-center justify-between">
                    {project.title}
                    <ExternalLink size={18} />
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className={`h-64 w-full ${selectedProject.image}`} />
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase">
                    {selectedProject.category}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg mb-8">
                  {selectedProject.description}
                </p>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                    View Case Study
                  </button>
                  <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">
                    Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
