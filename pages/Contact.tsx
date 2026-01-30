
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Send, Instagram } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteSettings: SETTINGS, services: SERVICES } = useData();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-accent mb-6 font-bold uppercase tracking-[0.4em] text-[10px]">
              <span className="w-8 h-[1px] bg-accent"></span>
              {SETTINGS.uiContact}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand mb-6 tracking-tight uppercase italic" dangerouslySetInnerHTML={{ __html: SETTINGS.contactTitle }}></h1>
            <p className="text-base text-slate-500 font-bold leading-relaxed max-w-xl italic">
              {SETTINGS.contactSubtitle}
            </p>
          </div>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

            {/* Information Grid */}
            <div className="lg:col-span-5 space-y-12">
              <div className="grid grid-cols-1 gap-10">
                {[
                  { icon: MapPin, title: "Baş Ofis", detail: SETTINGS.address },
                  { icon: Phone, title: "Əlaqə nömrəsi", detail: SETTINGS.phoneNumber },
                  { icon: Mail, title: "E-poçt ünvanı", detail: SETTINGS.email },
                  { icon: Clock, title: "İş rejimi", detail: SETTINGS.workingHours }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 border-l-2 border-slate-100 pl-8 py-2 group hover:border-accent transition-colors">
                    <div className="text-accent mt-1 group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{item.title}</h4>
                      <p className="text-lg font-black text-brand tracking-tight uppercase italic">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 italic">{SETTINGS.uiSocialMedia}</h4>
                <div className="flex gap-4">
                  <a href={SETTINGS.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={SETTINGS.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={SETTINGS.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-brand text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-10 md:p-16 rounded-sm border border-slate-100">
                {status === 'success' ? (
                  <div className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-black text-brand uppercase italic">{SETTINGS.uiThanks}</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">{SETTINGS.uiContactSoon}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="bg-brand text-white px-8 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-brand-medium transition-all"
                    >
                      {SETTINGS.uiClose}
                    </button>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{SETTINGS.uiFullName}</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                          placeholder="Nümunə: Elvin Məmmədov"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{SETTINGS.uiEmail}</label>
                        <input
                          required
                          type="email"
                          className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                          placeholder="Nümunə: name@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{SETTINGS.uiServices}</label>
                      <select className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all cursor-pointer rounded-sm">
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{SETTINGS.uiReadMore}</label>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all resize-none rounded-sm"
                        placeholder="Necə kömək edə bilərik?"
                      ></textarea>
                    </div>

                    <button className="w-full bg-accent text-white py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-medium transition-all shadow-xl flex items-center justify-center gap-3">
                      {SETTINGS.uiSubmit} <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
