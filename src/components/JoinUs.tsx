"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/services/storage";

export default function JoinUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form States - Feature Rich Schema
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    age: "",
    specialty: "Web Development",
    motivation: "",
    portfolio: "",
    experience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      try {
        // 1. Send Email Notification
        const emailjs = (await import("@emailjs/browser")).default;
        await emailjs.sendForm(
            "service_eprnvim",
            "template_scrsv1p",
            formRef.current,
            "ivm-LYIlxfzPm0nFk"
        );

        // 2. Save to Mission Control Database
        db.addApplication({
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            specialty: formData.specialty,
            university: formData.university,
            age: formData.age,
            motivation: formData.motivation,
            portfolio: formData.portfolio,
            experience: formData.experience,
        });

        // Success Handler
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
            name: "",
            email: "",
            phone: "",
            university: "",
            age: "",
            specialty: "Web Development",
            motivation: "",
            portfolio: "",
            experience: "",
        });
        setTimeout(() => setIsSuccess(false), 5000);

      } catch (error) {
        console.error("Submission failed", error);
        setIsSubmitting(false);
        alert("An error occurred, please try again.");
      }
    }
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
            Join Our Network
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-8">
            We are always looking for passionate individuals to join our team. Whether you are a student starting out or a seasoned pro, there is a place for you at Eventology.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-200 relative overflow-hidden">
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900">Application Received!</h3>
                  <p className="text-slate-600">We&apos;ll be in touch shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 ml-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      required
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="21"
                    />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="+20..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">University / Organization</label>
                <input
                    type="text"
                    name="university"
                    required
                    value={formData.university}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="University of ..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Specialty</label>
                <div className="relative">
                    <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="input-field appearance-none cursor-pointer"
                    >
                        <option>Web Development</option>
                        <option>Graphic Design</option>
                        <option>Content Creation</option>
                        <option>Marketing</option>
                        <option>Logistics</option>
                        <option>Other</option>
                    </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="rotate-90" size={16} />
                      </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Portfolio / LinkedIn (Optional)</label>
                <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://..."
                />
              </div>

               <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Experience & Skills</label>
                <textarea
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="input-field h-24 resize-none"
                  placeholder="Tell us about your technical skills and past projects..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Why do you want to join Eventology?</label>
                <textarea
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleInputChange}
                  className="input-field h-24 resize-none"
                  placeholder="I am passionate about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 btn-primary",
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
