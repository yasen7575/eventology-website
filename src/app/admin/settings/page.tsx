"use client";

import { useEffect, useState } from 'react';
import { db } from '@/services/storage';
import { ToggleLeft, ToggleRight, ShieldAlert } from 'lucide-react';

export default function SettingsPage() {
  const [pipelineOpen, setPipelineOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const settings = db.getSettings();
    setPipelineOpen(settings.pipelineOpen);
  }, []);

  const handleToggle = () => {
    setIsSaving(true);
    // Simulate network delay for effect
    setTimeout(() => {
      const newState = !pipelineOpen;
      db.updateSettings({ pipelineOpen: newState });
      setPipelineOpen(newState);
      setIsSaving(false);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-slate-400 text-sm">Configure operational parameters.</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-xl ${pipelineOpen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            <ShieldAlert size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">Talent Pipeline Access</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Control the public visibility of the "Join the Pipeline" application form.
              <br/>
              <span className="text-slate-500 italic">
                When <strong>Closed</strong>, candidates will see a "Deployment Full / Waitlist" message instead of the form.
              </span>
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleToggle}
                disabled={isSaving}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg border font-semibold transition-all ${
                  pipelineOpen
                    ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/40'
                    : 'bg-red-900/20 border-red-500/50 text-red-400 hover:bg-red-900/40'
                }`}
              >
                {isSaving ? (
                  <span className="animate-pulse">UPDATING SYSTEM...</span>
                ) : (
                  <>
                    {pipelineOpen ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    {pipelineOpen ? 'PIPELINE OPEN' : 'PIPELINE CLOSED'}
                  </>
                )}
              </button>

              <span className={`text-xs font-mono px-3 py-1 rounded ${
                pipelineOpen ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
              }`}>
                STATUS: {pipelineOpen ? 'ACCEPTING APPLICANTS' : 'RESTRICTED ACCESS'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 opacity-75 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
         <h3 className="text-white font-semibold mb-2">SMTP Configuration (External Email)</h3>
         <p className="text-xs text-slate-500">Disabled in Mock Mode. All messages are routed to internal storage.</p>
      </div>
    </div>
  );
}
