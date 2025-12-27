"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, Loader2, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
      } catch (error) {
        console.error("Failed to load emailjs", error);
        setIsSubmitting(false);
        alert("An error occurred, please try again.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#0f172a]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-white"
            >
              Get in Touch
            </motion.h2>
            <p className="text-lg mb-12 text-slate-400">
              Ready to elevate your next event? Contact our team to discuss your requirements.
            </p>

            <div className="space-y-8 mb-12">
              <ContactItem icon={<Mail size={24} />} title="Email Us" value="ya3777250@gmail.com" />
              <ContactItem icon={<Phone size={24} />} title="Call Us" value="+201128209072" />
            </div>

            <a 
              href="https://linktr.ee/Eventology.Link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg group bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/50"
            >
              Connect with Us
              <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl border border-white/10 bg-slate-800/50">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company</label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
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
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  name="message"
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all h-32 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait text-white hover:shadow-lg bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25"
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
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 bg-blue-500/10 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <div>
        <h4 className="font-bold transition-colors text-white group-hover:text-blue-400">{title}</h4>
        <p className="text-slate-400">{value}</p>
      </div>
    </div>
  );
}
