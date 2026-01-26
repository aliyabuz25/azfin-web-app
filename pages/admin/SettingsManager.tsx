
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import ImageUpload from '../../components/admin/ImageUpload';
import { useData } from '../../context/DataContext';
import {
    Check, Info, Link as LinkIcon, Phone, Mail, MapPin, Clock,
    FileText, Globe, Share2, MessageCircle, Layout as LayoutIcon,
    Award, Rocket, Edit2, Trash2, Plus, X
} from 'lucide-react';
import { iconMap } from '../../utils/icons';

type TabType = 'hero' | 'statistics' | 'process' | 'localization' | 'general' | 'social';

const SettingsManager: React.FC = () => {
    const {
        siteSettings, updateSiteSettings,
        processSteps, addProcessStep, updateProcessStep, deleteProcessStep,
        statistics, addStatistic, updateStatistic, deleteStatistic
    } = useData();
    const [formData, setFormData] = useState(siteSettings);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('hero');

    // Modals for Lists
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [editingType, setEditingType] = useState<'stat' | 'process' | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [listFormData, setListFormData] = useState<any>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSiteSettings(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const handleEditList = (type: 'stat' | 'process', item: any) => {
        setEditingType(type);
        setEditingId(item.id);
        setListFormData(item);
        setIsListModalOpen(true);
    };

    const handleAddList = (type: 'stat' | 'process') => {
        setEditingType(type);
        setEditingId(null);
        if (type === 'stat') {
            setListFormData({ label: '', value: '', iconName: 'Award' });
        } else {
            setListFormData({ stepNumber: (processSteps.length + 1).toString().padStart(2, '0'), title: '', description: '', iconName: 'Search' });
        }
        setIsListModalOpen(true);
    };

    const handleListSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingType === 'stat') {
            if (editingId) updateStatistic(editingId, listFormData);
            else addStatistic(listFormData);
        } else {
            if (editingId) updateProcessStep(editingId, listFormData);
            else addProcessStep(listFormData);
        }
        setIsListModalOpen(false);
    };

    const tabs = [
        { id: 'hero' as TabType, label: 'Hero (Giriş)', icon: LayoutIcon },
        { id: 'statistics' as TabType, label: 'Statistikalar', icon: Award },
        { id: 'process' as TabType, label: 'İş Prosesi', icon: Rocket },
        { id: 'localization' as TabType, label: 'Mətnlər', icon: Globe },
        { id: 'general' as TabType, label: 'Əlaqə', icon: Phone },
        { id: 'social' as TabType, label: 'Sosial Media', icon: Share2 },
    ];

    return (
        <AdminLayout title="Ana Səhifə Tənzimləmələri">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-1 rounded-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-slate-500 hover:text-primary hover:bg-white/50'
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 pb-20">
                    {/* Hero Tab */}
                    {activeTab === 'hero' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                    <LayoutIcon className="h-5 w-5 text-accent" />
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Giriş Bölməsi</h3>
                                </div>
                                <div className="space-y-4">
                                    <ImageUpload
                                        value={formData.heroImage}
                                        onChange={url => setFormData({ ...formData, heroImage: url })}
                                        label="Hero Şəkli"
                                    />
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Başlıq</label>
                                        <textarea
                                            rows={2}
                                            value={formData.heroTitle}
                                            onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hero Alt Başlıq</label>
                                        <textarea
                                            rows={3}
                                            value={formData.heroSubtitle}
                                            onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buton Mətni</label>
                                            <input
                                                type="text"
                                                value={formData.heroButtonText}
                                                onChange={e => setFormData({ ...formData, heroButtonText: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buton Linki</label>
                                            <input
                                                type="text"
                                                value={formData.heroButtonLink}
                                                onChange={e => setFormData({ ...formData, heroButtonLink: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Statistics Tab */}
                    {activeTab === 'statistics' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase italic">Statistik Göstəricilər</h3>
                                <button type="button" onClick={() => handleAddList('stat')} className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> Yeni Əlavə Et
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {statistics.map(stat => (
                                    <div key={stat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-slate-50 p-3 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                                <Award className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-black text-primary">{stat.value}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handleEditList('stat', stat)} className="p-2 text-slate-400 hover:text-blue-500">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button type="button" onClick={() => deleteStatistic(stat.id)} className="p-2 text-slate-400 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Process Tab */}
                    {activeTab === 'process' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase italic">İş Prosesi Rezimi</h3>
                                <button type="button" onClick={() => handleAddList('process')} className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                    <Plus className="h-4 w-4" /> Yeni Addım
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {processSteps.map(step => (
                                    <div key={step.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between group">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/5 h-12 w-12 rounded-full flex items-center justify-center text-accent font-black text-lg">
                                                {step.stepNumber}
                                            </div>
                                            <div>
                                                <div className="text-md font-black text-primary uppercase italic">{step.title}</div>
                                                <div className="text-sm text-slate-500 font-medium">{step.description}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => handleEditList('process', step)} className="p-2 text-slate-400 hover:text-blue-500">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button type="button" onClick={() => deleteProcessStep(step.id)} className="p-2 text-slate-400 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Localization Tab */}
                    {activeTab === 'localization' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                    <Globe className="h-5 w-5 text-emerald-500" />
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Ana Səhifə Mətnləri</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sektorlar Bölməsi Başlığı</label>
                                        <input
                                            type="text"
                                            value={formData.homeSectorsTitle}
                                            onChange={e => setFormData({ ...formData, homeSectorsTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İş Prosesi Başlığı</label>
                                        <input
                                            type="text"
                                            value={formData.homeProcessTitle}
                                            onChange={e => setFormData({ ...formData, homeProcessTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Müştərilər Bölməsi Başlığı</label>
                                        <input
                                            type="text"
                                            value={formData.homeClientsTitle}
                                            onChange={e => setFormData({ ...formData, homeClientsTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* General / Contact Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                    <Phone className="h-5 w-5 text-blue-500" />
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Əlaqə Məlumatları</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefon</label>
                                        <input
                                            type="text"
                                            value={formData.phoneNumber}
                                            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-poçt</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ünvan</label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İş Saatları</label>
                                        <input
                                            type="text"
                                            value={formData.workingHours}
                                            onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Tab */}
                    {activeTab === 'social' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                                    <Share2 className="h-5 w-5 text-blue-500" />
                                    <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Sosial Media</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instagram URL</label>
                                        <input
                                            type="text"
                                            value={formData.instagramUrl}
                                            onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn URL</label>
                                        <input
                                            type="text"
                                            value={formData.linkedinUrl}
                                            onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Nömrəsi</label>
                                        <input
                                            type="text"
                                            value={formData.whatsappNumber}
                                            onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="sticky bottom-6 left-0 right-0 z-20">
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-2xl flex justify-end">
                            <button
                                type="submit"
                                className="bg-accent hover:bg-emerald-600 text-white px-12 py-4 rounded-xl font-black text-sm shadow-xl shadow-accent/20 transition-all flex items-center gap-3"
                            >
                                <Check className="h-5 w-5" />
                                {success ? 'Məlumatlar Yadda Saxlanıldı!' : 'Bütün Dəyişiklikləri Yadda Saxla'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* List Item Modal */}
                {isListModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-primary tracking-tight uppercase italic font-sans">
                                    {editingId ? 'Düzəliş Et' : 'Yeni Əlavə Et'}
                                </h3>
                                <button type="button" onClick={() => setIsListModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                                    <X className="h-6 w-6 text-slate-400" />
                                </button>
                            </div>
                            <form onSubmit={handleListSubmit} className="p-8 space-y-6">
                                {editingType === 'stat' ? (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dəyər (Məs: 850+)</label>
                                            <input
                                                required
                                                type="text"
                                                value={listFormData.value}
                                                onChange={e => setListFormData({ ...listFormData, value: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Açıqlama</label>
                                            <input
                                                required
                                                type="text"
                                                value={listFormData.label}
                                                onChange={e => setListFormData({ ...listFormData, label: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-bold"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sıra №</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={listFormData.stepNumber}
                                                    onChange={e => setListFormData({ ...listFormData, stepNumber: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-bold"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">İkon</label>
                                                <select
                                                    value={listFormData.iconName}
                                                    onChange={e => setListFormData({ ...listFormData, iconName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-bold"
                                                >
                                                    {Object.keys(iconMap).map(name => <option key={name} value={name}>{name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Başlıq</label>
                                            <input
                                                required
                                                type="text"
                                                value={listFormData.title}
                                                onChange={e => setListFormData({ ...listFormData, title: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-bold"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Təsvir</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={listFormData.description}
                                                onChange={e => setListFormData({ ...listFormData, description: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-accent text-sm font-medium"
                                            />
                                        </div>
                                    </>
                                )}
                                <button type="submit" className="w-full bg-accent text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-accent/20">
                                    Yadda Saxla
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default SettingsManager;
