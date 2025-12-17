import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="#home" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4 block">
              Eventology
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The ultimate bridge between ambitious students and world-class events. From learning to leading.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link></li>
              <li><Link href="#join" className="hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Event Management</li>
              <li>Web Development</li>
              <li>Creative Media</li>
              <li>Logistics & Ushers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-500" />
                <span>hello@eventology.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <span>+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-500" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Eventology. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}
