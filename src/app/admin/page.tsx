"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { StorageService, Application, Inquiry } from "@/services/storage";
import { User } from "@/services/storage";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "pipeline" | "inquiries" | "settings" | "users";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("pipeline");

  // Data States
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [formsEnabled, setFormsEnabled] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "beginner" | "expert">("all");

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    // Strict Role Check
    if (user.role !== 'super_admin') {
      router.push("/");
      return;
    }

    loadData();
  }, [user, isAuthenticated, isLoading, router]);

  const loadData = async () => {
    const [apps, inqs, settings, users] = await Promise.all([
      StorageService.getApplications(),
      StorageService.getInquiries(),
      StorageService.getSettings(),
      StorageService.getUsers(),
    ]);
    setApplications(apps);
    setInquiries(inqs);
    setFormsEnabled(settings.formsEnabled);
    setUsers(users);
  };

  const toggleForms = async () => {
    const newState = !formsEnabled;
    await StorageService.updateSettings({ formsEnabled: newState });
    setFormsEnabled(newState);
  };

  const handlePromote = async (userId: string) => {
    await StorageService.promoteUser(userId);
    loadData();
  };

  const handleDemote = async (userId: string) => {
    await StorageService.demoteUser(userId);
    loadData();
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
                          app.email.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || app.type === filterType;
    return matchesSearch && matchesType;
  });

  // Prevent rendering if not authorized (avoids flash of content)
  if (isLoading || !isAuthenticated || user?.role !== 'super_admin') {
    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
        <div className="animate-spin text-blue-500">
           <LayoutDashboard size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Sidebar / Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1e293b] border-r border-white/5 flex flex-col z-50">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Mission Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem
            icon={<Users size={20} />}
            label="Talent Pipeline"
            active={activeTab === "pipeline"}
            onClick={() => setActiveTab("pipeline")}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Inquiries"
            active={activeTab === "inquiries"}
            onClick={() => setActiveTab("inquiries")}
            badge={inquiries.filter(i => i.status === 'new').length}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">
               {user?.name.charAt(0)}
            </div>
            <div>
               <p className="text-sm font-medium text-white">{user?.name}</p>
               <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Talent Pipeline</h2>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#1e293b] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
                <div className="flex bg-[#1e293b] rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setFilterType("all")}
                    className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", filterType === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType("beginner")}
                    className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", filterType === "beginner" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}
                  >
                    Beginners
                  </button>
                  <button
                    onClick={() => setFilterType("expert")}
                    className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", filterType === "expert" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white")}
                  >
                    Experts
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredApps.length === 0 ? (
                 <div className="text-center py-20 text-slate-500">No applications found.</div>
              ) : (
                filteredApps.map(app => (
                  <ApplicationCard key={app.id} app={app} />
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "inquiries" && (
          <div className="space-y-6">
             <h2 className="text-2xl font-bold text-white">Inquiries</h2>
             <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-sm text-left">
                   <thead className="bg-[#0f172a] text-slate-400 uppercase font-medium">
                      <tr>
                         <th className="px-6 py-4">Name</th>
                         <th className="px-6 py-4">Company</th>
                         <th className="px-6 py-4">Email</th>
                         <th className="px-6 py-4">Message</th>
                         <th className="px-6 py-4">Date</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {inquiries.map(inq => (
                         <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{inq.name}</td>
                            <td className="px-6 py-4">{inq.company}</td>
                            <td className="px-6 py-4 text-blue-400">{inq.email}</td>
                            <td className="px-6 py-4 max-w-xs truncate" title={inq.message}>{inq.message}</td>
                            <td className="px-6 py-4 text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                         </tr>
                      ))}
                      {inquiries.length === 0 && (
                          <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No inquiries yet.</td>
                          </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === "settings" && (
           <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>

              <div className="bg-[#1e293b] p-6 rounded-xl border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <h3 className="font-bold text-white mb-1">Recruitment Forms</h3>
                       <p className="text-sm text-slate-400">Enable or disable public access to the Join Us application forms.</p>
                    </div>
                    <button
                       onClick={toggleForms}
                       className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1e293b]",
                          formsEnabled ? "bg-green-500" : "bg-slate-600"
                       )}
                    >
                       <span
                          className={cn(
                             "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                             formsEnabled ? "translate-x-6" : "translate-x-1"
                          )}
                       />
                    </button>
                 </div>

                 <div className="pt-6 border-t border-white/5">
                    <p className="text-xs text-slate-500">
                        System Version 2.1.0 • Built with Next.js & Tailwind CSS
                    </p>
                 </div>
              </div>
           </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#0f172a] text-slate-400 uppercase font-medium">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                      <td className="px-6 py-4 text-blue-400">{u.email}</td>
                      <td className="px-6 py-4">{u.role}</td>
                      <td className="px-6 py-4">
                        {u.role === 'user' && (
                          <button onClick={() => handlePromote(u.id)} className="text-green-400">Promote</button>
                        )}
                        {u.role === 'admin' && (
                          <button onClick={() => handleDemote(u.id)} className="text-red-400">Demote</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
        active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge ? (
         <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
      ) : null}
    </button>
  );
}

function ApplicationCard({ app }: { app: Application }) {
   return (
      <div className="bg-[#1e293b] p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group">
         <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
               <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg", app.type === 'expert' ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400")}>
                  {app.name.charAt(0)}
               </div>
               <div>
                  <h3 className="font-bold text-white">{app.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                     <span className={cn("px-2 py-0.5 rounded-full font-medium", app.type === 'expert' ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400")}>
                        {app.type.toUpperCase()}
                     </span>
                     <span>•</span>
                     <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-2">
               {/* Actions could go here */}
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div className="space-y-1">
               <p className="text-slate-500 text-xs">Email</p>
               <p className="text-slate-300 truncate" title={app.email}>{app.email}</p>
            </div>
            <div className="space-y-1">
               <p className="text-slate-500 text-xs">Phone</p>
               <p className="text-slate-300">{app.phone}</p>
            </div>
            {app.type === 'beginner' ? (
                <>
                    <div className="space-y-1">
                        <p className="text-slate-500 text-xs">University</p>
                        <p className="text-slate-300">{app.university}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-slate-500 text-xs">Age</p>
                        <p className="text-slate-300">{app.age}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="space-y-1">
                        <p className="text-slate-500 text-xs">Specialty</p>
                        <p className="text-slate-300">{app.specialty}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-slate-500 text-xs">Experience</p>
                        <p className="text-slate-300">{app.experience} Years</p>
                    </div>
                </>
            )}
         </div>

         <div className="bg-[#0f172a] p-4 rounded-lg text-sm text-slate-400">
            {app.type === 'beginner' ? (
                <p className="italic">"{app.motivation}"</p>
            ) : (
                <div className="flex items-center gap-2">
                   <LinkIcon size={16} className="text-blue-500" />
                   <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate block">
                      {app.portfolio}
                   </a>
                </div>
            )}
         </div>
      </div>
   );
}
