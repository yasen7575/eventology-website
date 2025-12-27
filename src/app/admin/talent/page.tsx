"use client";

import { useEffect, useState } from 'react';
import { db, Application } from '@/services/storage';
import { Briefcase, Phone, Mail, Clock } from 'lucide-react';

export default function TalentPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  const loadApplications = () => {
    setApplications(db.getApplications());
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = (id: string, status: Application['status']) => {
    db.updateApplicationStatus(id, status);
    loadApplications();
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Talent Pipeline</h1>
          <p className="text-slate-400 text-sm">Review applications for The Core and Field Operations.</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-sm text-slate-300">
          Candidates: <span className="text-white font-bold">{applications.length}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
            <p className="text-slate-500">Pipeline is empty. No candidates pending.</p>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-purple-900/50 transition-colors">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {app.fullName}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        app.experienceLevel === 'Senior' ? 'border-purple-500 text-purple-400 bg-purple-500/10' :
                        app.experienceLevel === 'Mid' ? 'border-blue-500 text-blue-400 bg-blue-500/10' :
                        'border-slate-500 text-slate-400 bg-slate-500/10'
                      }`}>
                        {app.experienceLevel.toUpperCase()}
                      </span>
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-slate-400">
                       <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                       <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} /> {new Date(app.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-800 text-sm text-slate-300">
                  <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Expertise / Skills</span>
                  {app.expertise}
                </div>
              </div>

              <div className="flex md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                {app.status !== 'accepted' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'accepted')}
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/50 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    APPROVE
                  </button>
                )}
                {app.status !== 'reviewed' && app.status !== 'accepted' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'reviewed')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    WAITLIST
                  </button>
                )}
                {app.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(app.id, 'rejected')}
                    className="flex-1 bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/50 py-2 rounded text-xs font-semibold transition-colors"
                  >
                    REJECT
                  </button>
                )}
                <div className="mt-2 text-center text-xs uppercase tracking-wider font-bold text-slate-500">
                    Status: <span className={
                        app.status === 'accepted' ? 'text-emerald-400' :
                        app.status === 'rejected' ? 'text-red-400' :
                        'text-slate-400'
                    }>{app.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
