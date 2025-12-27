"use client";

import { Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ThemeMode } from "@/app/page";
import { cn } from "@/lib/utils";

interface FooterProps {
  mode: ThemeMode;
}

export default function Footer({ mode }: FooterProps) {
  const isCommunity = mode === "community";

  return (
    <footer className={cn(
        "border-t transition-colors duration-700 py-12 md:py-16",
        isCommunity ? "bg-[#050510] border-cyan-500/10" : "bg-black border-amber-500/10"
    )}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="#home" className={cn(
                "text-2xl font-bold tracking-tighter bg-clip-text text-transparent mb-4 block",
                isCommunity
                ? "bg-gradient-to-r from-cyan-400 to-pink-500 font-mono"
                : "bg-gradient-to-r from-amber-200 to-yellow-600 font-sans uppercase tracking-widest"
            )}>
              Eventology
            </Link>
            <p className={cn(
                "text-sm leading-relaxed mb-6",
                isCommunity ? "text-cyan-100/60 font-mono" : "text-slate-400 font-sans"
            )}>
              {isCommunity
               ? "Forging the next generation of event leaders through action."
               : "Setting the gold standard for corporate event execution in Egypt."}
            </p>
            <a 
              href="https://linktr.ee/Eventology.Link" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 group",
                  isCommunity
                  ? "bg-cyan-900/20 text-cyan-400 hover:bg-cyan-500/20"
                  : "bg-amber-900/20 text-amber-400 hover:bg-amber-500/20"
              )}
            >
              Connect with Us
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={cn("font-bold mb-6 text-white", isCommunity ? "font-mono" : "font-sans")}>Platform</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#about" className={cn("transition-colors", isCommunity ? "hover:text-cyan-400" : "hover:text-amber-400")}>About Us</Link></li>
              <li><Link href="#services" className={cn("transition-colors", isCommunity ? "hover:text-cyan-400" : "hover:text-amber-400")}>Capabilities</Link></li>
              <li><Link href="#join" className={cn("transition-colors", isCommunity ? "hover:text-cyan-400" : "hover:text-amber-400")}>Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={cn("font-bold mb-6 text-white", isCommunity ? "font-mono" : "font-sans")}>Solutions</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>{isCommunity ? "Web Development" : "Enterprise Systems"}</li>
              <li>{isCommunity ? "Media Coverage" : "Media Production"}</li>
              <li>{isCommunity ? "Ushers & Logistics" : "Crisis Management"}</li>
              <li>{isCommunity ? "Viral Marketing" : "Brand Strategy"}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={cn("font-bold mb-6 text-white", isCommunity ? "font-mono" : "font-sans")}>Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className={isCommunity ? "text-cyan-500" : "text-amber-500"} />
                <span>ya3777250@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className={isCommunity ? "text-cyan-500" : "text-amber-500"} />
                <span>+201128209072</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eventology. All rights reserved.</p>
          <p className="mt-2 md:mt-0 opacity-50">
            {isCommunity ? "Powered by Passion." : "Powered by Perfection."}
          </p>
        </div>
      </div>
    </footer>
  );
}
