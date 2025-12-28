"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { StorageService } from "@/services/storage";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Note: For simplicity and since requirements didn't specify toggling the Contact form separately
  // or blocking it, I am assuming the "Recruitment Forms" toggle applies mainly to JoinUs (Talent Pipeline).
  // However, I will hook it up to save to internal storage.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
       await new Promise(resolve => setTimeout(resolve, 1000));

       StorageService.addInquiry({
           name,
           company,
           email,
           message
       });

       setIsSubmitting(false);
       setSubmitted(true);
       formRef.current?.reset();
       setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
       console.error(error);
       setIsSubmitting(false);
       alert("An error occurred, please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0b1120] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to <span className="text-blue-500">Collaborate?</span>
            </motion.h2>
            <p className="text-slate-400 text-lg mb-12">
              Companies, Student Activities, and Organization Leaders—let's make your next event legendary.
            </p>

            <div className="space-y-8 mb-12">
              <ContactItem icon={<Mail size={24} />} title="Email Us" value="ya3777250@gmail.com" />
              <ContactItem icon={<Phone size={24} />} title="Call Us" value="+201128209072" />
            </div>

            <a 
              href="https://linktr.ee/Eventology.Link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 shadow-lg shadow-blue-900/50 group"
            >
              Connect with Us
              <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1e293b]/50 p-8 rounded-3xl border border-white/5">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form_type" value="Contact Us" />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company</label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  name="message"
                  required
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white h-32 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Sending...
                  </>
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message <Send size={18} />
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

function ContactItem({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h4>
        <p className="text-slate-400">{value}</p>
      </div>
    </div>
  );
}
