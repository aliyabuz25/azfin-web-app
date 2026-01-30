
import React, { useState } from 'react';
import { Target, Building2, Globe, Users, MessageSquare, ShieldCheck, ChevronRight, UserPlus } from 'lucide-react';
import { useData } from '../context/DataContext';

type TabType = 'about' | 'team' | 'testimonials';

const About: React.FC = () => {
  const { aboutData: ABOUT, siteSettings: SETTINGS } = useData();
  const [activeTab, setActiveTab] = useState<TabType>('about');

  const tabs = [
    { id: 'about' as TabType, label: SETTINGS.uiAbout, icon: Building2 },
    { id: 'team' as TabType, label: SETTINGS.uiTeam, icon: Users },
    { id: 'testimonials' as TabType, label: SETTINGS.uiTestimonials, icon: MessageSquare },
  ];

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || '';
  const firstWord = currentTabLabel.split(' ')[0];
  const otherWords = currentTabLabel.split(' ').slice(1).join(' ');

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-accent mb-6 text-[10px] font-bold uppercase tracking-[0.4em]">
                <span className="w-8 h-[1px] bg-accent"></span>
                Azfin Consulting
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-brand tracking-tight leading-tight uppercase italic">
                {firstWord} <span className="text-accent">{otherWords}</span>
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-xs max-w-xs border-l-2 border-accent pl-6 pb-2 uppercase tracking-widest leading-relaxed">
              Azərbaycanın maliyyə sektorunda peşəkar və şəffaf xidmət mərkəzi.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="sticky top-40 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-sm transition-all group ${activeTab === tab.id
                        ? 'bg-brand text-white shadow-xl translate-x-2'
                        : 'bg-slate-50 text-brand hover:bg-slate-100'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-accent' : 'text-slate-400 group-hover:text-brand'}`} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                    <ChevronRight className={`h-3 w-3 transition-transform ${activeTab === tab.id ? 'text-accent rotate-90' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 animate-in fade-in slide-in-from-right-4 duration-700">

              {activeTab === 'about' && (
                <div className="space-y-16">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-black text-brand uppercase italic tracking-tight">{ABOUT.title}</h2>
                    <p className="text-slate-600 text-lg font-bold leading-relaxed border-l-4 border-accent pl-8 italic">
                      {ABOUT.description}
                    </p>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {ABOUT.content}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-10 border border-slate-100 group hover:border-accent transition-colors">
                      <Target className="h-8 w-8 text-accent mb-6" />
                      <h3 className="text-xl font-black text-brand uppercase italic mb-4">{SETTINGS.uiOurMission}</h3>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed">{ABOUT.mission}</p>
                    </div>
                    <div className="bg-slate-50 p-10 border border-slate-100 group hover:border-accent transition-colors">
                      <Globe className="h-8 w-8 text-accent mb-6" />
                      <h3 className="text-xl font-black text-brand uppercase italic mb-4">{SETTINGS.uiServiceAreas}</h3>
                      <p className="text-slate-500 text-sm font-bold leading-relaxed">{ABOUT.scope}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border-[10px] border-slate-50 shadow-2xl">
                    <img
                      src={ABOUT.image}
                      alt="Azfin Office"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ABOUT.team.map((person, idx) => (
                      <div key={idx} className="group flex flex-col items-center text-center">
                        <div className="w-full aspect-[4/5] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl mb-6">
                          <img src={person.img} alt={person.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <h4 className="text-lg font-black text-brand uppercase italic tracking-tight mb-1 group-hover:text-accent transition-colors">{person.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{person.role}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-brand p-12 text-center rounded-sm">
                    <UserPlus className="h-10 w-10 text-accent mx-auto mb-6" />
                    <h3 className="text-white text-2xl font-black uppercase italic mb-4">{SETTINGS.uiJoinTeam}</h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">{SETTINGS.uiKaryeraText}</p>
                    <button className="bg-accent text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand-medium transition-all">{SETTINGS.uiViewVacancies}</button>
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ABOUT.testimonials.map((review, idx) => (
                      <div key={idx} className="bg-slate-50 p-10 border-l-4 border-accent hover:shadow-xl transition-all duration-500">
                        <MessageSquare className="h-6 w-6 text-accent mb-6 opacity-20" />
                        <p className="text-slate-600 font-bold italic leading-relaxed mb-8">"{review.text}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-accent font-black text-xs">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="text-[11px] font-black text-brand uppercase tracking-widest">{review.name}</h5>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{review.company}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center py-12 border-t border-slate-100 text-center">
                    <ShieldCheck className="h-12 w-12 text-accent mb-6" />
                    <h3 className="text-2xl font-black text-brand uppercase italic mb-4">{SETTINGS.uiTrustText}</h3>
                    <p className="text-slate-500 max-w-lg text-sm font-bold uppercase tracking-widest leading-relaxed">{SETTINGS.uiClientTrustSub}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
