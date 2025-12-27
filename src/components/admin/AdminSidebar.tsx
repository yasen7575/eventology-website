import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-cyan-400 tracking-wider">EVENTOLOGY</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Mission Control</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" />
        <NavItem href="/admin/users" icon={<Users size={20} />} label="User Management" />
        <NavItem href="/admin/inquiries" icon={<FileText size={20} />} label="Inquiries" />
        <NavItem href="/admin/talent" icon={<Users size={20} />} label="Talent Pipeline" />
        <NavItem href="/admin/settings" icon={<Settings size={20} />} label="System Settings" />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
