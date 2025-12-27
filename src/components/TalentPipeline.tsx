"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/services/storage';
import { ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function TalentPipeline() {
  const [pipelineOpen, setPipelineOpen] = useState(true);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Updated state to match unified schema
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '', // Renamed from expertise
    experienceLevel: 'Entry'
  });

  useEffect(() => {
    const settings = db.getSettings();
    setPipelineOpen(settings.pipelineOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate network
    await new Promise(r => setTimeout(r, 1000));

    db.addApplication({
      ...formData,
      experienceLevel: formData.experienceLevel as any
    });

    setFormState('success');
  };

  const handleReset = () => {
    setFormState('idle');
    setFormData({
        fullName: '',
        email: '',
        phone: '',
        specialty: '',
        experienceLevel: 'Entry'
    });
  }

  return (
    <section id="pipeline" className="py-24 bg-slate-900/30 relative border-y border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Info */}
        <div>
          <h2 className="tech-header">QUALITY ASSURANCE</h2>
          <h3 className="text-4xl font-bold text-white mb-6">THE TALENT PIPELINE</h3>
          <div className="space-y-6 text-slate-400 mb-8">
            <p>
              Eventology does not rely on random staffing agencies. We build our own workforce through a rigorous internal development program.
            </p>
            <ul className="space-y-4">
              {[
                "Vetted background checks & skill verification.",
                "Direct supervision under Core Team experts.",
                "Performance-based promotion system."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-cyan-500" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cyan-900/10 border border-cyan-500/20 p-6 rounded-xl">
             <div className="flex items-center gap-4 mb-2">
               <ShieldCheck className="text-cyan-400" size={24} />
               <h4 className="text-white font-bold">Standard of Excellence</h4>
             </div>
             <p className="text-sm text-cyan-200/70">
               Only top-performing individuals from the pipeline are scouted and promoted into the professional Core Team.
             </p>
          </div>
        </div>

        {/* Right: Functional Form */}
        <div className="glass-card p-8 relative">
           {/* Decorative corner */}
           <div className="absolute top-0 right-0 p-4">
             <div className={`w-3 h-3 rounded-full ${pipelineOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
           </div>

           {!pipelineOpen ? (
             <div className="text-center py-12">
               <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <ShieldCheck className="text-slate-500" size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Deployment Full</h3>
               <p className="text-slate-400">
                 The Talent Pipeline is currently at capacity. <br/>
                 Please check back next quarter for intake opportunities.
               </p>
             </div>
           ) : formState === 'success' ? (
             <div className="text-center py-12">
               <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                 <CheckCircle2 className="text-emerald-500" size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Application Received</h3>
               <p className="text-slate-400">
                 Your profile has been entered into the review queue. <br/>
                 ID: {crypto.randomUUID().split('-')[0].toUpperCase()}
               </p>
               <button
                 onClick={handleReset}
                 className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 underline"
               >
                 Submit another application
               </button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-4">
               <h3 className="text-xl font-bold text-white mb-6">Join The Pipeline</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input
                   required
                   type="text"
                   placeholder="Full Name"
                   className="input-field"
                   value={formData.fullName}
                   onChange={e => setFormData({...formData, fullName: e.target.value})}
                 />
                 <input
                   required
                   type="email"
                   placeholder="Email Address"
                   className="input-field"
                   value={formData.email}
                   onChange={e => setFormData({...formData, email: e.target.value})}
                 />
               </div>

               <input
                 required
                 type="tel"
                 placeholder="Phone Number"
                 className="input-field"
                 value={formData.phone}
                 onChange={e => setFormData({...formData, phone: e.target.value})}
               />

               <select
                  className="input-field text-slate-400"
                  value={formData.experienceLevel}
                  onChange={e => setFormData({...formData, experienceLevel: e.target.value})}
               >
                 <option value="Entry">Entry Level (0-2 Years)</option>
                 <option value="Mid">Experienced (2-5 Years)</option>
                 <option value="Senior">Specialist (5+ Years)</option>
               </select>

               <textarea
                 required
                 placeholder="Briefly describe your expertise..."
                 rows={3}
                 className="input-field resize-none"
                 value={formData.specialty}
                 onChange={e => setFormData({...formData, specialty: e.target.value})}
               ></textarea>

               <button
                 type="submit"
                 disabled={formState === 'submitting'}
                 className="btn-primary w-full flex justify-center items-center gap-2"
               >
                 {formState === 'submitting' ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                 {!formState && <ChevronRight size={18} />}
               </button>
             </form>
           )}
        </div>
      </div>
    </section>
  );
}
