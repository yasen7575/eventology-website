"use client";

import { useEffect, useState } from 'react';
import { db } from '@/services/storage';
import { CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';

export default function TalentPipeline() {
  const [pipelineOpen, setPipelineOpen] = useState(true);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Updated state to match unified schema
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
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
    <section className="py-24 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Info */}
        <div>
          <h2 className="text-blue-800 font-bold uppercase tracking-widest text-sm mb-3">CAREERS</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Join Our Team</h3>
          <div className="space-y-6 text-slate-600 mb-8 text-lg">
            <p>
              Eventology builds its workforce through rigorous internal development. We are looking for dedicated individuals to join our professional network.
            </p>
            <ul className="space-y-4 text-base">
              {[
                "Professional training and development.",
                "Work with industry experts.",
                "Career advancement opportunities."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-600" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
             <div className="flex items-center gap-4 mb-2">
               <Briefcase className="text-blue-800" size={24} />
               <h4 className="text-slate-900 font-bold">Standard of Excellence</h4>
             </div>
             <p className="text-sm text-slate-500">
               We select only the most committed individuals to represent the Eventology brand.
             </p>
          </div>
        </div>

        {/* Right: Functional Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 relative">
           {!pipelineOpen ? (
             <div className="text-center py-12">
               <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Briefcase className="text-slate-400" size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Applications Closed</h3>
               <p className="text-slate-500">
                 We are not currently accepting new applications. <br/>
                 Please check back later.
               </p>
             </div>
           ) : formState === 'success' ? (
             <div className="text-center py-12">
               <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                 <CheckCircle2 className="text-green-600" size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received</h3>
               <p className="text-slate-500">
                 Your profile has been submitted for review.
               </p>
               <button
                 onClick={handleReset}
                 className="mt-6 text-sm text-blue-600 hover:text-blue-800 underline"
               >
                 Submit another application
               </button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="space-y-4">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Apply Now</h3>

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
                  className="input-field text-slate-500"
                  value={formData.experienceLevel}
                  onChange={e => setFormData({...formData, experienceLevel: e.target.value})}
               >
                 <option value="Entry">Entry Level (0-2 Years)</option>
                 <option value="Mid">Experienced (2-5 Years)</option>
                 <option value="Senior">Specialist (5+ Years)</option>
               </select>

               <textarea
                 required
                 placeholder="Briefly describe your skills..."
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
                 {formState === 'submitting' ? 'Sending...' : 'Submit Application'}
                 {!formState && <ChevronRight size={18} />}
               </button>
             </form>
           )}
        </div>
      </div>
    </section>
  );
}
