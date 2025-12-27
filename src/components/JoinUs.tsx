"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function JoinUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Volunteer / Student",
    portfolio: "",
    motivation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      try {
        const emailjs = (await import("@emailjs/browser")).default;
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
      } catch (error) {
        console.error("Failed to load emailjs", error);
        setIsSubmitting(false);
        alert("An error occurred, please try again.");
      }
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
              role: "Volunteer / Student",
              portfolio: "",
              motivation: "",
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
    <section id="join" className="py-24 relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Join Our Network
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            We are always looking for passionate individuals to join our team. Whether you are a student starting out or a seasoned pro, there is a place for you at Eventology.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden border-white/10">
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
                  <p className="text-slate-400">We&apos;ll be in touch shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
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
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
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
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                    placeholder="+20..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">I am applying as...</label>
                <div className="relative">
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white appearance-none cursor-pointer"
                    >
                        <option>Volunteer / Student</option>
                        <option>Professional / Expert</option>
                        <option>Freelancer</option>
                    </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" size={16} />
                      </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Portfolio / LinkedIn (Optional)</label>
                <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600"
                    placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Why Eventology?</label>
                <textarea
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-600 h-24 resize-none"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700",
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
