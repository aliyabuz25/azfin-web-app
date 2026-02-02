
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

type TabType = 'hero' | 'statistics' | 'process' | 'localization' | 'labels' | 'general' | 'social' | 'smtp';

const SettingsManager: React.FC = () => {
    const {
        siteSettings, updateSiteSettings,
        processSteps, addProcessStep, updateProcessStep, deleteProcessStep,
        statistics, addStatistic, updateStatistic, deleteStatistic
    } = useData();
    const [formData, setFormData] = useState(siteSettings);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('hero');

    // SMTP State
    const [smtpData, setSmtpData] = useState({
        host: '',
        port: 587,
        user: '',
        pass: '',
        secure: false,
        fromEmail: '',
        toEmail: ''
    });

    React.useEffect(() => {
        setFormData(siteSettings);
        fetchSmtpSettings();
    }, [siteSettings]);

    const fetchSmtpSettings = async () => {
        try {
            // Use relative path or configured base URL
            const res = await fetch('/api/settings/smtp');
            if (res.ok) {
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setSmtpData(data);
                }
            }
        } catch (error) {
            console.error('Error fetching SMTP settings:', error);
        }
    };

    const handleSmtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/settings/smtp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(smtpData)
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error saving SMTP settings:', error);
        }
    };

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
        { id: 'general' as TabType, label: 'Əlaqə', icon: Phone },
        { id: 'social' as TabType, label: 'Sosial Media', icon: Share2 },
        { id: 'smtp' as TabType, label: 'SMTP (Email)', icon: Mail },
    ];

    return (
        <AdminLayout title="Ana Səhifə Tənzimləmələri">
            <div className="card card-primary card-tabs">
                <div className="card-header p-0 pt-1">
                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                        {tabs.map((tab) => (
                            <li key={tab.id} className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    role="tab"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className={`fas fa-${tab.id === 'hero' ? 'layer-group' : tab.id === 'statistics' ? 'chart-bar' : tab.id === 'process' ? 'tasks' : tab.id === 'general' ? 'phone' : tab.id === 'social' ? 'share-alt' : 'envelope'} mr-1`}></i>
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === 'smtp' ? (
                        <form onSubmit={handleSmtpSubmit}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <h5 className="border-bottom pb-2">SMTP Server Tənzimləmələri</h5>
                                    <p className="text-muted text-sm">Saytdan gələn müraciətlərin email vasitəsilə göndərilməsi üçün.</p>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>SMTP Host</label>
                                        <input
                                            type="text"
                                            value={smtpData.host}
                                            onChange={e => setSmtpData({ ...smtpData, host: e.target.value })}
                                            className="form-control"
                                            placeholder="mail.example.com"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Port</label>
                                        <input
                                            type="number"
                                            value={smtpData.port}
                                            onChange={e => setSmtpData({ ...smtpData, port: parseInt(e.target.value) })}
                                            className="form-control"
                                            placeholder="587"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>SSL/TLS (Secure)</label>
                                        <div className="custom-control custom-switch mt-2">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="secureSwitch"
                                                checked={smtpData.secure}
                                                onChange={e => setSmtpData({ ...smtpData, secure: e.target.checked })}
                                            />
                                            <label className="custom-control-label" htmlFor="secureSwitch">{smtpData.secure ? 'Aktiv' : 'Passiv'}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>İstifadəçi Adı (User)</label>
                                        <input
                                            type="text"
                                            value={smtpData.user}
                                            onChange={e => setSmtpData({ ...smtpData, user: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Şifrə (Password)</label>
                                        <input
                                            type="password"
                                            value={smtpData.pass}
                                            onChange={e => setSmtpData({ ...smtpData, pass: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Kimdən (From Email)</label>
                                        <input
                                            type="email"
                                            value={smtpData.fromEmail}
                                            onChange={e => setSmtpData({ ...smtpData, fromEmail: e.target.value })}
                                            className="form-control"
                                            placeholder="noreply@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Kimə (Bildiriş Email)</label>
                                        <input
                                            type="email"
                                            value={smtpData.toEmail}
                                            onChange={e => setSmtpData({ ...smtpData, toEmail: e.target.value })}
                                            className="form-control"
                                            placeholder="admin@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-primary float-right">
                                        <i className="fas fa-save mr-1"></i> SMTP Yadda Saxla
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="tab-content">
                                {/* Form content will be inside individual tab sections */}
                                {/* Hero Tab */}
                                {activeTab === 'hero' && (
                                    <div className="row">
                                        <div className="col-md-4">
                                            <ImageUpload
                                                value={formData.heroImage}
                                                onChange={url => setFormData({ ...formData, heroImage: url })}
                                                label="Hero Şəkli"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>Hero Başlıq</label>
                                                <textarea
                                                    rows={2}
                                                    value={formData.heroTitle}
                                                    onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Hero Alt Başlıq</label>
                                                <textarea
                                                    rows={3}
                                                    value={formData.heroSubtitle}
                                                    onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Buton Mətni</label>
                                                        <input
                                                            type="text"
                                                            value={formData.heroButtonText}
                                                            onChange={e => setFormData({ ...formData, heroButtonText: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Buton Linki</label>
                                                        <input
                                                            type="text"
                                                            value={formData.heroButtonLink}
                                                            onChange={e => setFormData({ ...formData, heroButtonLink: e.target.value })}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Statistics Tab */}
                                {activeTab === 'statistics' && (
                                    <div className="row">
                                        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                                            <h5>Statistik Göstəricilər</h5>
                                            <button type="button" onClick={() => handleAddList('stat')} className="btn btn-primary btn-sm">
                                                <i className="fas fa-plus mr-1"></i> Yeni
                                            </button>
                                        </div>
                                        {statistics.map(stat => (
                                            <div key={stat.id} className="col-md-6">
                                                <div className="info-box shadow-sm border">
                                                    <span className="info-box-icon bg-info"><i className={`fas fa-${stat.iconName || 'award'}`}></i></span>
                                                    <div className="info-box-content">
                                                        <span className="info-box-text">{stat.label}</span>
                                                        <span className="info-box-number">{stat.value}</span>
                                                    </div>
                                                    <div className="text-right p-2">
                                                        <button type="button" onClick={() => handleEditList('stat', stat)} className="btn btn-xs btn-link p-0 mr-2">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button type="button" onClick={() => deleteStatistic(stat.id)} className="btn btn-xs btn-link p-0 text-danger">
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Process Tab */}
                                {activeTab === 'process' && (
                                    <div className="row">
                                        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                                            <h5>İş Prosesi Addımları</h5>
                                            <button type="button" onClick={() => handleAddList('process')} className="btn btn-primary btn-sm">
                                                <i className="fas fa-plus mr-1"></i> Yeni
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <div className="timeline">
                                                {processSteps.map(step => (
                                                    <div key={step.id}>
                                                        <i className={`fas fa-${step.iconName || 'check'} bg-blue`}></i>
                                                        <div className="timeline-item shadow-none border">
                                                            <span className="time"><i className="fas fa-hashtag"></i> {step.stepNumber}</span>
                                                            <h3 className="timeline-header font-weight-bold">{step.title}</h3>
                                                            <div className="timeline-body">{step.description}</div>
                                                            <div className="timeline-footer">
                                                                <button type="button" onClick={() => handleEditList('process', step)} className="btn btn-primary btn-xs mr-1">Redaktə</button>
                                                                <button type="button" onClick={() => deleteProcessStep(step.id)} className="btn btn-danger btn-xs">Sil</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* General / Contact Tab */}
                                {activeTab === 'general' && (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Telefon</label>
                                                <input
                                                    type="text"
                                                    value={formData.phoneNumber}
                                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>E-poçt</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Ünvan</label>
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>İş Saatları</label>
                                                <input
                                                    type="text"
                                                    value={formData.workingHours}
                                                    onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Social Tab */}
                                {activeTab === 'social' && (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Instagram URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.instagramUrl}
                                                    onChange={e => setFormData({ ...formData, instagramUrl: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>LinkedIn URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.linkedinUrl}
                                                    onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Facebook URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.facebookUrl}
                                                    onChange={e => setFormData({ ...formData, facebookUrl: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>WhatsApp Nömrəsi</label>
                                                <input
                                                    type="text"
                                                    value={formData.whatsappNumber}
                                                    onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 border-top pt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary float-right"
                                >
                                    <i className="fas fa-save mr-1"></i>
                                    {success ? 'Məlumatlar Yadda Saxlanıldı!' : 'Bütün Dəyişiklikləri Yadda Saxla'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

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
        </AdminLayout>
    );
};

export default SettingsManager;
