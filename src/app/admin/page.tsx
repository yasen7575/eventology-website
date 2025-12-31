"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Application, Inquiry } from "@/services/storage";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Search,
  Link as LinkIcon,
  Shield,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "pipeline" | "users" | "settings";
const SUPER_ADMIN_EMAIL = "ya3777250@gmail.com";

interface Profile {
  id: string;
  role: string;
  full_name: string;
  email: string;
}

interface SupabaseApplication {
    id: number;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    type: "beginner" | "expert";
    university?: string;
    age?: string;
    motivation?: string;
    specialty?: string;
    portfolio?: string;
    experience?: string;
    status: "pending" | "reviewed" | "accepted" | "rejected";
}


export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("pipeline");

  // Data States
  const [applications, setApplications] = useState<SupabaseApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [formsEnabled, setFormsEnabled] = useState<boolean>(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "beginner" | "expert">("all");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      if (!currentUser || currentUser.email !== SUPER_ADMIN_EMAIL) {
        router.push("/");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

    useEffect(() => {
    const fetchTabData = async () => {
      if (activeTab === 'pipeline') {
        setAppsLoading(true);
        try {
          const response = await fetch('/api/applications/get');
          if (!response.ok) throw new Error('Failed to fetch applications');
          const data = await response.json();
          setApplications(data);
        } catch (error) { console.error(error); }
        finally { setAppsLoading(false); }
      } else if (activeTab === 'users') {
        setUsersLoading(true);
        try {
          const response = await fetch('/api/users');
          if (!response.ok) throw new Error('Failed to fetch users');
          const data = await response.json();
          setProfiles(data);
        } catch (error) { console.error(error); }
        finally { setUsersLoading(false); }
      }
    };
    fetchTabData();
  }, [activeTab]);

  const [isUpdating, setIsUpdating] = useState(false);

  const toggleForms = async () => {
    setIsUpdating(true);
    setSettingsSaved(false);
    const newState = !formsEnabled;
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ join_form_locked: newState }),
      });
      if (!response.ok) throw new Error('Failed to update settings');
      setFormsEnabled(newState);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (error) { console.error(error); }
    finally { setIsUpdating(false); }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setProfiles(profiles.map(p => p.id === userId ? { ...p, role: newRole } : p));
  };

  const saveRoleChange = async (userId: string, newRole: string) => {
    try {
        await fetch(`/api/users`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, role: newRole }),
        });
    } catch (error) { console.error(error); }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
                          app.email.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || app.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading || !user || user.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
        <div className="animate-spin text-blue-500"><LayoutDashboard size={40} /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1e293b] border-r border-white/5 flex flex-col z-50">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Mission Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<Users size={20} />} label="Talent Pipeline" active={activeTab === "pipeline"} onClick={() => setActiveTab("pipeline")} />
          <SidebarItem icon={<Shield size={20} />} label="Users" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">
               {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
               <p className="text-sm font-medium text-white">Super Admin</p>
               <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Talent Pipeline</h2>
              {/* Search and filter UI remains the same */}
            </div>
            {appsLoading ? <div className="text-center py-20">Loading...</div> :
            <div className="grid grid-cols-1 gap-4">
              {filteredApps.length === 0 ? <div className="text-center py-20 text-slate-500">No applications found.</div> :
                filteredApps.map(app => <ApplicationCard key={app.id} app={app} />)
              }
            </div>}
          </div>
        )}
        {activeTab === "users" && (
             <div className="space-y-6">
             <h2 className="text-2xl font-bold text-white">User Management</h2>
             {usersLoading ? <div className="text-center py-20">Loading...</div> :
             <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
                 <table className="w-full text-sm text-left">
                     <thead className="bg-[#0f172a] text-slate-400 uppercase font-medium">
                         <tr>
                             <th className="px-6 py-4">User</th>
                             <th className="px-6 py-4">Role</th>
                             <th className="px-6 py-4">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                         {profiles.map(p => (
                             <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                 <td className="px-6 py-4 font-medium text-white">{p.full_name || p.email}</td>
                                 <td className="px-6 py-4">
                                     <select value={p.role} onChange={(e) => handleRoleChange(p.id, e.target.value)} className="bg-slate-700 rounded p-1">
                                         <option value="user">User</option>
                                         <option value="admin">Admin</option>
                                     </select>
                                 </td>
                                 <td className="px-6 py-4">
                                     <button onClick={() => saveRoleChange(p.id, p.role)} className="flex items-center gap-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                                         <Save size={14} /> Save
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>}
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
                       disabled={isUpdating}
                    >
                       <span
                          className={cn(
                             "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                             formsEnabled ? "translate-x-6" : "translate-x-1"
                          )}
                       />
                    </button>
                 </div>
                 {settingsSaved && <p className="text-green-400 text-sm">Settings saved!</p>}
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

function ApplicationCard({ app }: { app: SupabaseApplication }) {
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
                     <span>{new Date(app.created_at).toLocaleDateString()}</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div>
                <span className="text-xs text-slate-500">Email</span>
                <p className="text-white font-medium">{app.email}</p>
            </div>
            <div>
                <span className="text-xs text-slate-500">Phone</span>
                <p className="text-white font-medium">{app.phone}</p>
            </div>
            <div>
                <span className="text-xs text-slate-500">University</span>
                <p className="text-white font-medium">{app.university || 'N/A'}</p>
            </div>
            <div>
                <span className="text-xs text-slate-500">Age</span>
                <p className="text-white font-medium">{app.age || 'N/A'}</p>
            </div>
             <div>
                <span className="text-xs text-slate-500">Specialty</span>
                <p className="text-white font-medium">{app.specialty || 'N/A'}</p>
            </div>
            {app.portfolio && <div>
                <span className="text-xs text-slate-500">Portfolio</span>
                <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                    View Portfolio <LinkIcon size={12} />
                </a>
            </div>}
         </div>
         <div>
            <span className="text-xs text-slate-500">Motivation</span>
            <p className="text-white text-sm bg-black/20 p-3 rounded-lg mt-1">{app.motivation || 'No motivation provided.'}</p>
         </div>
      </div>
   );
}
