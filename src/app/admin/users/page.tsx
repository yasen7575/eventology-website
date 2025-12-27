"use client";

import { useEffect, useState } from "react";
import { db, User } from "@/services/storage";
import { useAuth } from "@/context/AuthContext";
import { Shield, ShieldAlert, ShieldCheck, Search } from "lucide-react";

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = () => {
      setUsers(db.getUsers());
    };
    loadUsers();
    // Poll for updates or just load once
    const interval = setInterval(loadUsers, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (userId: string, newRole: 'ADMIN' | 'USER') => {
    if (confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      db.updateUserRole(userId, newRole);
      setUsers(db.getUsers()); // Reload
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          User Management
        </h1>
        <p className="text-slate-400 mt-2">Manage access levels and permissions.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 text-slate-400 font-medium">User</th>
              <th className="p-4 text-slate-400 font-medium">Role</th>
              <th className="p-4 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div>
                    <div className="font-medium text-white">{u.name}</div>
                    <div className="text-sm text-slate-400">{u.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                    u.role === 'SUPER_ADMIN'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : u.role === 'ADMIN'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    {u.role === 'SUPER_ADMIN' && <ShieldAlert size={12} />}
                    {u.role === 'ADMIN' && <ShieldCheck size={12} />}
                    {u.role === 'USER' && <Shield size={12} />}
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  {u.role !== 'SUPER_ADMIN' && u.id !== currentUser?.id && (
                    <div className="flex items-center gap-2">
                      {u.role === 'USER' ? (
                        <button
                          onClick={() => handleRoleChange(u.id, 'ADMIN')}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-medium transition-colors"
                        >
                          Promote to Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(u.id, 'USER')}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors"
                        >
                          Demote to User
                        </button>
                      )}
                    </div>
                  )}
                  {u.role === 'SUPER_ADMIN' && (
                    <span className="text-xs text-slate-500 italic">Immutable</span>
                  )}
                  {u.id === currentUser?.id && (
                    <span className="text-xs text-slate-500 italic">Current User</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-slate-500">
                  No users found matching "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
