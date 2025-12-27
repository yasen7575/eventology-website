"use client";

import { useEffect, useState } from 'react';
import { db, Inquiry } from '@/services/storage';
import { Mail, Calendar, User } from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    setInquiries(db.getInquiries());
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Inquiries</h1>
          <p className="text-slate-400 text-sm">Manage incoming project requests.</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-sm text-slate-300">
          Total: <span className="text-white font-bold">{inquiries.length}</span>
        </div>
      </header>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
            <p className="text-slate-500">No inquiries received yet.</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-900/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{inquiry.name}</h3>
                    <p className="text-sm text-cyan-400">{inquiry.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar size={12} />
                    <span>{new Date(inquiry.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} />
                    <span>{inquiry.email}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-lg text-slate-300 text-sm leading-relaxed border border-slate-800/50">
                {inquiry.message}
              </div>
              <div className="mt-4 flex gap-2">
                 <button className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded transition-colors">
                   Mark as Read
                 </button>
                 <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors">
                   Archive
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
