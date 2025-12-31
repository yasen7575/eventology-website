"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { StorageService } from "@/services/storage";

type FormMode = "beginner" | "expert";

export default function JoinUs() {
  const [mode, setMode] = useState<FormMode>("beginner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    try {
      const settings = StorageService.getSettings();
      setIsEnabled(settings.formsEnabled);
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to StorageService
      StorageService.addApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: mode,
        university: mode === "beginner" ? formData.university : undefined,
        age: mode === "beginner" ? formData.age : undefined,
        motivation: mode === "beginner" ? formData.motivation : undefined,
        specialty: mode === "expert" ? formData.specialty : undefined,
        portfolio: mode === "expert" ? formData.portfolio : undefined,
        experience: mode === "expert" ? formData.experience : undefined
      });

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
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("An error occurred, please try again.");
    }
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Movement</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Whether you&apos;re starting your journey or looking to lead the industry, there&apos;s a place for you at Eventology.
          </p>

          {!isEnabled ? (
            <div className="max-w-xl mx-auto mt-12">
              <div className="glass-card p-12 rounded-3xl text-center border border-white/10 bg-slate-900/50">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Applications Closed</h3>
                <p className="text-slate-400">
                  We are currently not accepting new applications. Please check back later or follow our social media for updates.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Toggle Switch */}
              <div className="inline-flex items-center bg-slate-800/50 rounded-full p-1 border border-white/10 mb-8">
                <button
                  onClick={() => setMode("beginner")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                    mode === "beginner" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  )}
                >
                  I am a Beginner
                </button>
                <button
                  onClick={() => setMode("expert")}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                    mode === "expert" ? "bg-purple-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  )}
                >
                  I am an Expert
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-slate-300 text-sm font-medium"
                >
                  {mode === "beginner"
                    ? "Join our training program to gain real-world experience."
                    : "Ready for the big leagues? Join the Eventology Elite Team."}
                </motion.p>
              </AnimatePresence>

              <div className="max-w-xl mx-auto mt-8">
                <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden">
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

                  <form onSubmit={handleSubmit} className="space-y-5">

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

                    {mode === "beginner" ? (
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
                        mode === "beginner"
                          ? "bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                          : "bg-purple-600 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]",
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
