
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/Layout';
import ImageUpload from '../../components/admin/ImageUpload';
import { useData } from '../../context/DataContext';
import { Check, Info, Users, MessageSquare, Building2, Plus, Trash2 } from 'lucide-react';

const AboutManager: React.FC = () => {
    const { aboutData, updateAboutData } = useData();
    const [formData, setFormData] = useState(aboutData);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFormData(aboutData);
    }, [aboutData]);

    const handleSave = () => {
        updateAboutData(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const addTeamMember = () => {
        setFormData({
            ...formData,
            team: [...formData.team, { id: Date.now().toString(), name: '', role: '', img: '' }]
        });
    };

    const updateTeamMember = (id: string, field: string, value: string) => {
        setFormData({
            ...formData,
            team: formData.team.map((m: any) => m.id === id ? { ...m, [field]: value } : m)
        });
    };

    const deleteTeamMember = (id: string) => {
        setFormData({
            ...formData,
            team: formData.team.filter((m: any) => m.id !== id)
        });
    };

    const addTestimonial = () => {
        setFormData({
            ...formData,
            testimonials: [...formData.testimonials, { id: Date.now().toString(), name: '', company: '', text: '' }]
        });
    };

    const updateTestimonial = (id: string, field: string, value: string) => {
        setFormData({
            ...formData,
            testimonials: formData.testimonials.map((t: any) => t.id === id ? { ...t, [field]: value } : t)
        });
    };

    const deleteTestimonial = (id: string) => {
        setFormData({
            ...formData,
            testimonials: formData.testimonials.filter((t: any) => t.id !== id)
        });
    };

    return (
        <AdminLayout
            title="Haqqımızda"
            actions={
                <button onClick={handleSave} className="bg-accent hover:bg-emerald-600 text-white px-8 py-2 rounded-lg font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Check className="h-4 w-4" /> {success ? 'Yadda Saxlanıldı' : 'Yadda Saxla'}
                </button>
            }
        >
            <div className="max-w-5xl mx-auto space-y-12 pb-20">
                {/* General Info */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Ümumi Məlumat</h3>
                    </div>

                    <div className="space-y-4">
                        <ImageUpload
                            value={formData.image}
                            onChange={url => setFormData({ ...formData, image: url })}
                            label="Əsas Şəkil"
                        />
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Başlıq</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qısa Təsvir (Vurğulanan)</label>
                            <textarea
                                rows={2}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium italic"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tam Məzmun</label>
                            <textarea
                                rows={4}
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Mission & Scope */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-3">Missiyamız</h4>
                        <textarea
                            rows={3}
                            value={formData.mission}
                            onChange={e => setFormData({ ...formData, mission: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                        />
                    </div>
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-3">Xidmət Sahələrimiz (Təsvir)</h4>
                        <textarea
                            rows={3}
                            value={formData.scope}
                            onChange={e => setFormData({ ...formData, scope: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Team Management */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg text-purple-500">
                                <Users className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Əməkdaşlarımız</h3>
                        </div>
                        <button onClick={addTeamMember} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                            <Plus className="h-4 w-4" /> Əlavə Et
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.team.map((member: any) => (
                            <div key={member.id} className="flex flex-col gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100 relative group">
                                <button onClick={() => deleteTeamMember(member.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="w-full h-48 rounded-lg overflow-hidden border border-slate-200">
                                    <ImageUpload
                                        value={member.img}
                                        onChange={url => updateTeamMember(member.id, 'img', url)}
                                        label="Şəkil"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ad və Soyad</label>
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={e => updateTeamMember(member.id, 'name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vəzifə</label>
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={e => updateTeamMember(member.id, 'role', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials Management */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-500">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Müştəri Rəyləri</h3>
                        </div>
                        <button onClick={addTestimonial} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                            <Plus className="h-4 w-4" /> Əlavə Et
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {formData.testimonials.map((testimonial: any) => (
                            <div key={testimonial.id} className="p-6 bg-slate-50 rounded-xl border border-slate-100 relative group space-y-4">
                                <button onClick={() => deleteTestimonial(testimonial.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ad Soyad</label>
                                        <input
                                            type="text"
                                            value={testimonial.name}
                                            onChange={e => updateTestimonial(testimonial.id, 'name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Şirkət</label>
                                        <input
                                            type="text"
                                            value={testimonial.company}
                                            onChange={e => updateTestimonial(testimonial.id, 'company', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rəy Mətni</label>
                                    <textarea
                                        rows={3}
                                        value={testimonial.text}
                                        onChange={e => updateTestimonial(testimonial.id, 'text', e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium italic"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AboutManager;
