"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/services/storage';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate network
    await new Promise(r => setTimeout(r, 1000));

    db.addInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message
    });

    setFormState('success');
  };

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="tech-header">INITIATE SEQUENCE</h2>
          <h3 className="text-4xl font-bold text-white mb-4">START A PROJECT</h3>
          <p className="text-slate-400">
            Connect with our Strategic Operations team to discuss your event requirements.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12">
          {formState === 'success' ? (
             <div className="text-center py-12">
               <div className="bg-emerald-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                 <CheckCircle2 className="text-emerald-500" size={40} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
               <p className="text-slate-400 mb-8">
                 Our operations team is analyzing your request. <br/>
                 Expected response time: T-Minus 4 Hours.
               </p>
               <button
                 onClick={() => { setFormState('idle'); setFormData({ name: '', email: '', company: '', message: '' }); }}
                 className="btn-outline text-sm"
               >
                 SEND ANOTHER MESSAGE
               </button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Name</label>
                  <input
                    required
                    type="text"
                    className="input-field"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
                  <input
                    required
                    type="email"
                    className="input-field"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Company / Organization</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Project Brief</label>
                <textarea
                  required
                  rows={4}
                  className="input-field resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="btn-primary w-full flex justify-center items-center gap-2"
              >
                {formState === 'submitting' ? 'TRANSMITTING...' : 'SEND INQUIRY'}
                {!formState && <Send size={18} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
