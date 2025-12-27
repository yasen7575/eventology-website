"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { ThemeMode } from "@/app/page";

type FormMode = "beginner" | "expert";

interface JoinUsProps {
  mode: ThemeMode;
}

export default function JoinUs({ mode: siteMode }: JoinUsProps) {
  // Sync form mode with site mode
  const [formMode, setFormMode] = useState<FormMode>(siteMode === 'community' ? 'beginner' : 'expert');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isCommunity = siteMode === 'community';

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    age: "",
    motivation: "",
    specialty: "Web Development",
    portfolio: "",
    experience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      emailjs
        .sendForm(
          "service_eprnvim",
          "template_scrsv1p",
          formRef.current,
          "ivm-LYIlxfzPm0nFk"
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({
              name: "",
              email: "",
              phone: "",
              university: "",
              age: "",
              motivation: "",
              specialty: "Web Development",
              portfolio: "",
              experience: "",
            });
            setTimeout(() => setIsSuccess(false), 5000);
          },
          (error) => {
            console.log(error.text);
            setIsSubmitting(false);
            alert("An error occurred, please try again.");
          }
        );
    }
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden transition-colors duration-700">
      {/* Background Elements */}
      {isCommunity ? (
        <>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-pink-600/5 blur-[120px] pointer-events-none" />
        </>
      ) : (
        <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-amber-600/5 blur-[120px] pointer-events-none" />
        </>
      )}


      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className={cn("text-3xl md:text-5xl font-bold mb-6", isCommunity ? "font-mono" : "font-sans")}>
            {isCommunity ? "Join the Movement" : "Join the Elite Core"}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            {isCommunity
             ? "Start your journey. Gain real-world experience. Level up."
             : "We are always scouting for top-tier talent. If you have the experience, we have the platform."}
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center bg-slate-800/50 rounded-full p-1 border border-white/10 mb-8">
            <button
              onClick={() => setFormMode("beginner")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                formMode === "beginner"
                    ? (isCommunity ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-700 text-white")
                    : "text-slate-400 hover:text-white"
              )}
            >
              Start as Learner
            </button>
            <button
              onClick={() => setFormMode("expert")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                formMode === "expert"
                    ? (isCommunity ? "bg-pink-600 text-white shadow-lg" : "bg-amber-600 text-white shadow-lg")
                    : "text-slate-400 hover:text-white"
              )}
            >
              Apply as Expert
            </button>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <div className={cn(
              "glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden transition-colors duration-500",
              isCommunity ? "border-cyan-500/20" : "border-amber-500/20"
          )}>
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                  <p className="text-slate-400">We&apos;ll be in touch shortly to kickstart your journey.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Hidden field to identify the mode in EmailJS */}
              <input type="hidden" name="form_type" value={formMode === "beginner" ? "Beginner Application" : "Expert Application"} />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                    placeholder="+20..."
                  />
                </div>
              </div>

              {formMode === "beginner" ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">University</label>
                      <input
                        type="text"
                        name="university"
                        required
                        value={formData.university}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                        placeholder="Nile University"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 ml-1">Age</label>
                      <input
                        type="number"
                        name="age"
                        required
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                        placeholder="20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Why do you want to join?</label>
                    <textarea
                      name="motivation"
                      required
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600 h-32 resize-none"
                      placeholder="Tell us about your passion for events..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Specialty</label>
                    <div className="relative">
                      <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white appearance-none cursor-pointer"
                      >
                        <option>Web Development</option>
                        <option>Media Production</option>
                        <option>Event Management</option>
                        <option>Graphic Design</option>
                        <option>Logistics & Operations</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Portfolio / CV Link</label>
                    <input
                      type="url"
                      name="portfolio"
                      required
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder:text-slate-600"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Years of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder:text-slate-600"
                      placeholder="3"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2",
                  formMode === "beginner"
                    ? (isCommunity ? "bg-cyan-600 hover:bg-cyan-700" : "bg-slate-600 hover:bg-slate-700")
                    : (isCommunity ? "bg-pink-600 hover:bg-pink-700" : "bg-amber-600 hover:bg-amber-700"),
                  isSubmitting && "opacity-70 cursor-wait"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending...
                  </>
                ) : (
                  <>
                    Submit Application <ChevronRight size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
