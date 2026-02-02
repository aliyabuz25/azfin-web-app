
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Send, Instagram, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteSettings, addApplication } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: siteSettings.uiHomeServicesTitle || 'Maliyyə Auditi',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addApplication('contact', {
      ...formData
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      service: siteSettings.uiHomeServicesTitle || 'Maliyyə Auditi',
      message: ''
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactItems = [
    { icon: MapPin, title: siteSettings.uiAddressLabel || "Baş Ofis", detail: siteSettings.address },
    { icon: Phone, title: siteSettings.uiPhoneLabel || "Əlaqə nömrəsi", detail: siteSettings.phoneNumber },
    { icon: Mail, title: siteSettings.uiEmailLabel || "E-poçt ünvanı", detail: siteSettings.email },
    { icon: Clock, title: siteSettings.uiWorkingHoursLabel || "İş rejimi", detail: siteSettings.workingHours }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-accent mb-6 font-bold uppercase tracking-[0.4em] text-[10px]">
              <span className="w-8 h-[1px] bg-accent"></span>
              {siteSettings.uiContactUs || 'Bizimlə Əlaqə'}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight uppercase italic">
              {siteSettings.uiContactTitle1 || 'Maliyyə gələcəyinizi'} <br />
              <span className="text-accent">{siteSettings.uiContactTitle2 || 'birlikdə'}</span> {siteSettings.uiContactTitle3 || 'quraq'}
            </h1>
            <p className="text-base text-slate-500 font-bold leading-relaxed max-w-xl italic">
              {siteSettings.uiContactSub || 'Audit xidmətləri, vergi planlaması və ya peşəkar təlimlər barədə hər hansı sualınız varsa, komandamız hər zaman dəstəyə hazırdır.'}
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
                {contactItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 border-l-2 border-slate-100 pl-8 py-2 group hover:border-accent transition-colors">
                    <div className="text-accent mt-1 group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{item.title}</h4>
                      <p className="text-lg font-black text-primary tracking-tight uppercase italic">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 italic">{siteSettings.uiFollowUs || 'Bizi izləyin'}</h4>
                <div className="flex gap-4">
                  <a href={siteSettings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-10 md:p-16 rounded-sm border border-slate-100">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{siteSettings.uiFullName || 'Ad və Soyadınız'}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                        placeholder="Nümunə: Elvin Məmmədov"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{siteSettings.uiYourEmail || 'E-poçt ünvanınız'}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                        placeholder="Nümunə: name@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{siteSettings.uiInterestArea || 'Müraciət etdiyiniz sahə'}</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all cursor-pointer rounded-sm"
                    >
                      <option>Maliyyə Auditi</option>
                      <option>Mühasibat Autsorsinqi</option>
                      <option>Vergi Konsultasiyası</option>
                      <option>Akademiya Təlimləri</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{siteSettings.uiMesageLabel || 'Mesajınız'}</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all resize-none rounded-sm"
                      placeholder={siteSettings.uiMesagePlaceholder || "Necə kömək edə bilərik?"}
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-accent text-white py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-medium transition-all shadow-xl flex items-center justify-center gap-3">
                    {siteSettings.uiSendMessage || 'Mesajı göndərin'} <Send className="h-4 w-4" />
                  </button>

                  {submitted && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-sm animate-in fade-in slide-in-from-top-2">
                      <p className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> {siteSettings.uiThanks || 'Mesajınız göndərildi. Təşəkkür edirik!'}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
