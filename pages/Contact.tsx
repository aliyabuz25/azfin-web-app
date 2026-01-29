import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Send, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const { siteSettings: SETTINGS, addApplication } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Maliyyə Auditi',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'Maliyyə Auditi', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    }
  };

  const contactInfo = [
    { icon: MapPin, title: "Ünvan", detail: SETTINGS.address },
    { icon: Phone, title: "Telefon", detail: SETTINGS.phoneNumber },
    { icon: Mail, title: "E-poçt", detail: SETTINGS.email },
    { icon: Clock, title: "İş Saatları", detail: SETTINGS.workingHours }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-accent mb-6 font-bold uppercase tracking-[0.4em] text-[10px]">
              <span className="w-8 h-[1px] bg-accent"></span>
              {SETTINGS.contactTitle}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight uppercase italic leading-tight" dangerouslySetInnerHTML={{ __html: SETTINGS.heroTitle.includes('span') ? SETTINGS.heroTitle : SETTINGS.contactTitle + ' <br/><span class="text-accent">Azfin</span>' }}></h1>
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
                {contactInfo.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 border-l-2 border-slate-100 pl-8 py-2 group hover:border-accent transition-colors">
                    <div className="text-accent mt-1 group-hover:scale-110 transition-transform">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{item.title}</h4>
                      <p className="text-lg font-black text-primary tracking-tight uppercase italic whitespace-pre-line">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 italic">Bizi izləyin</h4>
                <div className="flex gap-4">
                  <a href={SETTINGS.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={SETTINGS.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={SETTINGS.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-sm hover:bg-accent transition-colors shadow-lg shadow-primary/10">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 p-10 md:p-16 rounded-sm border border-slate-100">
                {submitted ? (
                  <div className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                      <Send className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-primary uppercase italic">Təşəkkür edirik!</h3>
                      <p className="text-slate-500 font-bold italic">Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="text-accent font-black text-xs uppercase tracking-widest hover:underline">Yenisini göndər</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ad və Soyadınız</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                          placeholder="Nümunə: Elvin Məmmədov"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">E-poçt ünvanınız</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all rounded-sm"
                          placeholder="Nümunə: name@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Müraciət etdiyiniz sahə</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all cursor-pointer rounded-sm"
                      >
                        <option>Maliyyə Auditi</option>
                        <option>Mühasibat Autsorsinqi</option>
                        <option>Vergi Konsultasiyası</option>
                        <option>Akademiya Təlimləri</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mesajınız</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-slate-200 p-4 focus:outline-none focus:border-accent font-bold text-xs transition-all resize-none rounded-sm"
                        placeholder="Necə kömək edə bilərik?"
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-accent text-white py-5 rounded-sm font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary-medium transition-all shadow-xl flex items-center justify-center gap-3">
                      Mesajı göndərin <Send className="h-4 w-4" />
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
