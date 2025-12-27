"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ThemeMode } from "@/app/page";
import { cn } from "@/lib/utils";

interface ContactProps {
  mode: ThemeMode;
}

export default function Contact({ mode }: ContactProps) {
  const isCommunity = mode === "community";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
            setSubmitted(true);
            formRef.current?.reset();
            setTimeout(() => setSubmitted(false), 5000);
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
    <section id="contact" className="py-24 relative transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
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
                  <>Ignite Your <span className="text-cyan-400">Event</span></>
              ) : (
                  <>Secure Your <span className="text-amber-400">Success</span></>
              )}
            </motion.h2>
            <p className={cn(
                "text-lg mb-12",
                isCommunity ? "text-cyan-100/70 font-mono text-sm" : "text-slate-400 font-sans"
            )}>
              {isCommunity
               ? "Ready to mobilize the community? Reach out to access our network of student activities and volunteers."
               : "For corporate inquiries and large-scale operations. Contact our senior management team directly."}
            </p>

            <div className="space-y-8 mb-12">
              <ContactItem icon={<Mail size={24} />} title="Email Us" value="ya3777250@gmail.com" mode={mode} />
              <ContactItem icon={<Phone size={24} />} title="Call Us" value="+201128209072" mode={mode} />
            </div>

            <a 
              href="https://linktr.ee/Eventology.Link" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg group",
                  isCommunity
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-900/50"
                  : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/50"
              )}
            >
              Connect with Us
              <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Contact Form */}
          <div className={cn(
              "p-8 rounded-3xl border transition-colors duration-500",
              isCommunity
              ? "bg-slate-900/80 border-cyan-500/20"
              : "bg-black/50 border-amber-500/20"
          )}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form_type" value={isCommunity ? "Community Inquiry" : "Corporate Inquiry"} />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={cn(
                        "w-full bg-slate-900/50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-white transition-all",
                        isCommunity ? "border-cyan-500/20 focus:ring-cyan-500" : "border-amber-500/20 focus:ring-amber-500"
                    )}
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company</label>
                  <input
                    type="text"
                    name="company"
                    required
                    className={cn(
                        "w-full bg-slate-900/50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-white transition-all",
                        isCommunity ? "border-cyan-500/20 focus:ring-cyan-500" : "border-amber-500/20 focus:ring-amber-500"
                    )}
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
                  className={cn(
                      "w-full bg-slate-900/50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-white transition-all",
                      isCommunity ? "border-cyan-500/20 focus:ring-cyan-500" : "border-amber-500/20 focus:ring-amber-500"
                  )}
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  name="message"
                  required
                  className={cn(
                      "w-full bg-slate-900/50 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-white transition-all h-32 resize-none",
                      isCommunity ? "border-cyan-500/20 focus:ring-cyan-500" : "border-amber-500/20 focus:ring-amber-500"
                  )}
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                    "w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait text-white hover:shadow-lg",
                    isCommunity
                    ? "bg-gradient-to-r from-cyan-600 to-pink-600 hover:shadow-cyan-500/25"
                    : "bg-gradient-to-r from-amber-600 to-yellow-600 hover:shadow-amber-500/25"
                )}
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

function ContactItem({ icon, title, value, mode }: { icon: React.ReactNode; title: string; value: string, mode: ThemeMode }) {
    const isCommunity = mode === "community";
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-slate-400 transition-all duration-300",
          isCommunity
          ? "bg-cyan-500/10 group-hover:bg-cyan-600 group-hover:text-white"
          : "bg-amber-500/10 group-hover:bg-amber-600 group-hover:text-white"
      )}>
        {icon}
      </div>
      <div>
        <h4 className={cn(
            "font-bold transition-colors",
            isCommunity ? "text-white group-hover:text-cyan-400" : "text-white group-hover:text-amber-400"
        )}>{title}</h4>
        <p className="text-slate-400">{value}</p>
      </div>
    </div>
  );
}
