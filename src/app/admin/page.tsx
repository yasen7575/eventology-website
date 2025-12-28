"use client";

import { useEffect, useState } from 'react';
import { db } from '@/services/storage';
import { Users, FileText, CheckCircle, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    inquiries: 0,
    applications: 0,
    activePipeline: false,
  });

  useEffect(() => {
    // In a real app with backend, we'd fetch this.
    // Since it's localStorage, we just read it directly on mount.
    const inquiries = db.getInquiries();
    const apps = db.getApplications();
    const settings = db.getSettings();

    setStats({
      inquiries: inquiries.length,
      applications: apps.length,
      activePipeline: settings.pipelineOpen,
    });
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of system activity and performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Inquiries"
          value={stats.inquiries}
          icon={<FileText className="text-blue-600" size={24} />}
          trend="+12% this week"
        />
        <StatCard
          title="Talent Applications"
          value={stats.applications}
          icon={<Users className="text-purple-600" size={24} />}
          trend="High Volume"
        />
        <StatCard
          title="Applications Open"
          value={stats.activePipeline ? "YES" : "NO"}
          icon={<Activity className={stats.activePipeline ? "text-green-600" : "text-red-500"} size={24} />}
          trend="System Setting"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
             {/* Mock activity log */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center gap-4 text-sm">
                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 <span className="text-slate-600">User login detected.</span>
                 <span className="ml-auto text-slate-400 font-mono">10:4{i} AM</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <HealthBar label="Database Integrity" percent={100} color="bg-green-500" />
            <HealthBar label="Server Load" percent={24} color="bg-blue-500" />
            <HealthBar label="Memory Usage" percent={45} color="bg-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">{trend}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-sm text-slate-500">{title}</p>
    </div>
  );
}

function HealthBar({ label, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-600 font-mono">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
