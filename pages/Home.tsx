
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Award, ChevronRight,
  Plane, Utensils, GraduationCap, Factory, Building, Cpu,
  ReceiptText, BarChartBig, Search, Gavel, UsersRound,
  Lightbulb, Rocket, Calendar, Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';
import CalculationModal from '../components/CalculationModal';
import { getIcon } from '../utils/icons';

const Home: React.FC = () => {
  const {
    services: SERVICES,
    statistics: STATISTICS,
    sectors: SECTORS,
    processSteps: PROCESS_STEPS,
    siteSettings: SETTINGS
  } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  const clients = ["Company A", "Group B", "Holding C", "LLC D", "Corp E", "A-Group", "B-Tech", "C-Logistics", "D-Invest", "E-Food"];

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      <CalculationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceType="audit" />

      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] items-center gap-16 py-16">
            <div className="space-y-8 relative z-10 transition-all duration-1000 transform">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3" />
                {SETTINGS.heroBadge}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-primary leading-[1.1] tracking-tighter" dangerouslySetInnerHTML={{ __html: SETTINGS.heroTitle }}>
              </h1>
              <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                {SETTINGS.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to={SETTINGS.heroButtonLink} className="bg-accent text-white px-10 py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-medium transition-all flex items-center gap-3 shadow-xl">
                  {SETTINGS.heroButtonText} <ArrowRight className="h-4 w-4" />
                </Link>
                <button onClick={() => setIsModalOpen(true)} className="bg-white border border-slate-200 text-primary px-10 py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm">
                  {SETTINGS.uiGetOffer}
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-full border-[40px] border-slate-100 absolute -top-20 -right-20 w-[120%] h-[120%] -z-0 animate-pulse"></div>
              <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-[12px] border-white">
                <img src={SETTINGS.heroImage} alt="Work" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-12 bg-white p-10 shadow-2xl border border-slate-50 max-w-[280px] z-20 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{SETTINGS.uiOurExperience}</span>
                </div>
                <div className="text-3xl font-black text-primary tracking-tighter italic uppercase">15+ İl</div>
                <div className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-widest">{SETTINGS.uiCompetentService}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={addToRefs} className="py-20 bg-white transition-all duration-1000 transform opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 gap-12 ${STATISTICS.length === 1 ? 'md:grid-cols-1 max-w-xs mx-auto' :
            STATISTICS.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
              STATISTICS.length === 3 ? 'md:grid-cols-3 max-w-5xl mx-auto' :
                'md:grid-cols-4'
            }`}>
            {STATISTICS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center md:items-start md:text-left">
                  <span className="text-4xl font-black text-primary tracking-tighter italic uppercase mb-1">{stat.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-t border-accent pt-2">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={addToRefs} className="py-24 bg-slate-50 transition-all duration-1000 transform opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="text-accent font-black text-[10px] uppercase tracking-[0.6em] mb-4">{SETTINGS.homeServicesTitle}</div>
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter uppercase italic">{SETTINGS.homeServicesSubtitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.id} to={`/services/${service.id}`} className="group bg-white p-10 rounded-sm border border-slate-100 hover:border-accent transition-all duration-500 flex flex-col items-start shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary text-accent rounded-sm flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-colors shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-lg font-black text-primary uppercase tracking-tight italic group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-bold">{service.description}</p>
                  </div>
                  <div className="mt-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                      {SETTINGS.uiReadMore} <ChevronRight className="h-3 w-3 text-accent" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                      className="bg-accent text-white px-4 py-2 rounded-sm font-black text-[9px] uppercase tracking-widest hover:bg-primary-medium transition-all shadow-sm"
                    >
                      {SETTINGS.uiGetOffer}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section ref={addToRefs} className="py-24 bg-white transition-all duration-1000 transform opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tighter leading-tight max-w-2xl relative">
              {SETTINGS.homeSectorsTitle}
              <div className="absolute -bottom-6 left-0 w-24 h-1.5 bg-accent"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {SECTORS.map((sector) => {
              const Icon = getIcon(sector.iconName);
              return (
                <div key={sector.id} className="group flex flex-col space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-400 group-hover:text-accent transition-colors">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-lg font-black text-primary tracking-tight uppercase group-hover:text-accent transition-colors">{sector.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed border-l-2 border-slate-100 pl-6 group-hover:border-accent transition-colors">{sector.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={addToRefs} className="py-24 bg-slate-50 transition-all duration-1000 transform opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">
              {SETTINGS.homeProcessTitle}
            </h2>
            <p className="mt-6 text-slate-500 font-medium max-w-2xl mx-auto">{SETTINGS.homeProcessSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => {
              const Icon = getIcon(step.iconName);
              return (
                <div key={step.id} className="relative group bg-white p-10 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden text-left">
                  <span className="absolute top-6 right-8 text-8xl font-black text-slate-50 group-hover:text-slate-100 transition-colors z-0">{step.stepNumber}</span>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform"><Icon className="h-6 w-6" /></div>
                    <h3 className="text-xl font-black text-primary mb-4 tracking-tight uppercase">{step.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moving Clients */}
      <section ref={addToRefs} className="py-20 bg-white transition-all duration-1000 transform opacity-0 translate-y-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">{SETTINGS.homeClientsTitle}</span>
        </div>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[...clients, ...clients].map((client, idx) => (
              <div key={idx} className="bg-slate-50 px-12 py-8 rounded-sm text-primary/40 font-bold text-2xl uppercase tracking-tighter grayscale hover:grayscale-0 transition-all cursor-default">{client}</div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .animate-marquee { animation: marquee 40s linear infinite; display: flex; width: max-content; }
            .animate-marquee:hover { animation-play-state: paused; }
          `}} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 blur-[120px] -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            {SETTINGS.ctaTitle}
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-accent text-white px-16 py-5 rounded-sm font-black text-[13px] uppercase tracking-[0.3em] hover:bg-[#2d8c73] transition-all shadow-2xl whitespace-nowrap"
          >
            {SETTINGS.ctaButtonText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
