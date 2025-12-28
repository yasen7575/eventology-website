"use client";

import { Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="#home" className="text-2xl font-bold tracking-tight text-blue-900 mb-4 block">
              Eventology
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-600">
              Setting the gold standard for corporate event execution and student development in Egypt.
            </p>
            <a 
              href="https://linktr.ee/Eventology.Link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 group bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              Connect with Us
              <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-slate-900">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="#mission" className="transition-colors hover:text-blue-700">Mission</Link></li>
              <li><Link href="#core-team" className="transition-colors hover:text-blue-700">Team</Link></li>
              <li><Link href="#pipeline" className="transition-colors hover:text-blue-700">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-6 text-slate-900">Solutions</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>Enterprise Systems</li>
              <li>Media Production</li>
              <li>Crisis Management</li>
              <li>Brand Strategy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-6 text-slate-900">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-600" />
                <span>ya3777250@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-600" />
                <span>+201128209072</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eventology. All rights reserved.</p>
          <p className="mt-2 md:mt-0 opacity-50">
            Powered by Perfection.
          </p>
        </div>
      </div>
    </footer>
  );
}
