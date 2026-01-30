
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

type TabType = 'hero' | 'statistics' | 'process' | 'localization' | 'labels' | 'general' | 'social';

const SettingsManager: React.FC = () => {
    const {
        siteSettings, updateSiteSettings,
        processSteps, addProcessStep, updateProcessStep, deleteProcessStep,
        statistics, addStatistic, updateStatistic, deleteStatistic
    } = useData();
    const [formData, setFormData] = useState(siteSettings);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('hero');

    React.useEffect(() => {
        setFormData(siteSettings);
    }, [siteSettings]);

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
        { id: 'localization' as TabType, label: 'Bölmələr', icon: Globe },
        { id: 'labels' as TabType, label: 'Bütün Yazılar', icon: MessageCircle },
        { id: 'general' as TabType, label: 'Əlaqə', icon: Phone },
        { id: 'social' as TabType, label: 'Sosial Media', icon: Share2 },
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
                                    <i className={`fas fa-${tab.id === 'hero' ? 'layer-group' : tab.id === 'statistics' ? 'chart-bar' : tab.id === 'process' ? 'tasks' : tab.id === 'localization' ? 'language' : tab.id === 'labels' ? 'font' : tab.id === 'general' ? 'phone' : 'share-alt'} mr-1`}></i>
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body">
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

                            {/* Localization Tab */}
                            {activeTab === 'localization' && (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Sektorlar Bölməsi Başlığı</label>
                                            <input
                                                type="text"
                                                value={formData.homeSectorsTitle}
                                                onChange={e => setFormData({ ...formData, homeSectorsTitle: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>İş Prosesi Başlığı</label>
                                            <input
                                                type="text"
                                                value={formData.homeProcessTitle}
                                                onChange={e => setFormData({ ...formData, homeProcessTitle: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Müştərilər Bölməsi Başlığı</label>
                                            <input
                                                type="text"
                                                value={formData.homeClientsTitle}
                                                onChange={e => setFormData({ ...formData, homeClientsTitle: e.target.value })}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sub Labels Tab */}
                            {activeTab === 'labels' && (
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <h5 className="border-bottom pb-2">Naviqasiya və Ümumi Yazılar</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Ana Səhifə (Nav)</label>
                                            <input type="text" value={formData.uiHome} onChange={e => setFormData({ ...formData, uiHome: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Haqqımızda (Nav)</label>
                                            <input type="text" value={formData.uiAbout} onChange={e => setFormData({ ...formData, uiAbout: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Xidmətlər (Nav)</label>
                                            <input type="text" value={formData.uiServices} onChange={e => setFormData({ ...formData, uiServices: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Akademiya (Nav)</label>
                                            <input type="text" value={formData.uiAcademy} onChange={e => setFormData({ ...formData, uiAcademy: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Bloq (Nav)</label>
                                            <input type="text" value={formData.uiBlog} onChange={e => setFormData({ ...formData, uiBlog: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Əlaqə (Nav)</label>
                                            <input type="text" value={formData.uiContact} onChange={e => setFormData({ ...formData, uiContact: e.target.value })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4 mb-3">
                                        <h5 className="border-bottom pb-2">Butonlar və Kiçik Başlıqlar</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Ətraflı (Buton)</label>
                                            <input type="text" value={formData.uiReadMore} onChange={e => setFormData({ ...formData, uiReadMore: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Təklif Alın (Buton)</label>
                                            <input type="text" value={formData.uiGetOffer} onChange={e => setFormData({ ...formData, uiGetOffer: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Bütün Təlimlər</label>
                                            <input type="text" value={formData.uiAllTrainings} onChange={e => setFormData({ ...formData, uiAllTrainings: e.target.value })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4 mb-3">
                                        <h5 className="border-bottom pb-2">Hero və Stat Bölməsi Yazıları</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Təcrübəmiz (Badge)</label>
                                            <input type="text" value={formData.uiOurExperience} onChange={e => setFormData({ ...formData, uiOurExperience: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Səriştəli Xidmət (Badge)</label>
                                            <input type="text" value={formData.uiCompetentService} onChange={e => setFormData({ ...formData, uiCompetentService: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Uğurlu Audit (Stat)</label>
                                            <input type="text" value={formData.uiSuccessAudit} onChange={e => setFormData({ ...formData, uiSuccessAudit: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Korporativ Müştəri (Stat)</label>
                                            <input type="text" value={formData.uiCorporateClient} onChange={e => setFormData({ ...formData, uiCorporateClient: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>İllik Təcrübə (Stat)</label>
                                            <input type="text" value={formData.uiYearsExperience} onChange={e => setFormData({ ...formData, uiYearsExperience: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Peşəkar Ekspert (Stat)</label>
                                            <input type="text" value={formData.uiProfessionalExpert} onChange={e => setFormData({ ...formData, uiProfessionalExpert: e.target.value })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4 mb-3">
                                        <h5 className="border-bottom pb-2">Haqqımızda Səhifəsi Yazıları</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Missiyamız (Başlıq)</label>
                                            <input type="text" value={formData.uiOurMission} onChange={e => setFormData({ ...formData, uiOurMission: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Xidmət Sahələrimiz (Başlıq)</label>
                                            <input type="text" value={formData.uiServiceAreas} onChange={e => setFormData({ ...formData, uiServiceAreas: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Əməkdaşlar (Tab)</label>
                                            <input type="text" value={formData.uiTeam} onChange={e => setFormData({ ...formData, uiTeam: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Müştəri Rəyləri (Tab)</label>
                                            <input type="text" value={formData.uiTestimonials} onChange={e => setFormData({ ...formData, uiTestimonials: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Komandaya Qoşulun (Başlıq)</label>
                                            <input type="text" value={formData.uiJoinTeam} onChange={e => setFormData({ ...formData, uiJoinTeam: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Karyera Mətni</label>
                                            <input type="text" value={formData.uiKaryeraText} onChange={e => setFormData({ ...formData, uiKaryeraText: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Vakansiyalara Bax (Buton)</label>
                                            <input type="text" value={formData.uiViewVacancies} onChange={e => setFormData({ ...formData, uiViewVacancies: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Güvən Mətni (Başlıq)</label>
                                            <input type="text" value={formData.uiTrustText} onChange={e => setFormData({ ...formData, uiTrustText: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Müştəri Güvəni (Alt Mətn)</label>
                                            <input type="text" value={formData.uiClientTrustSub} onChange={e => setFormData({ ...formData, uiClientTrustSub: e.target.value })} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4 mb-3">
                                        <h5 className="border-bottom pb-2">Xidmət, Akademiya və Bloq Səhifələri</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Xidmət Kataloqu (Sərhədüstü)</label>
                                            <input type="text" value={formData.uiServiceCatalogue} onChange={e => setFormData({ ...formData, uiServiceCatalogue: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Xidmət Başlıq 1</label>
                                            <input type="text" value={formData.uiServiceHeader1} onChange={e => setFormData({ ...formData, uiServiceHeader1: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Xidmət Başlıq 2 (Rəngli)</label>
                                            <input type="text" value={formData.uiServiceHeader2} onChange={e => setFormData({ ...formData, uiServiceHeader2: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Xidmət Alt Mətn</label>
                                            <textarea value={formData.uiServiceSub} onChange={e => setFormData({ ...formData, uiServiceSub: e.target.value })} className="form-control" rows={2} />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Akademiya Başlıq 1</label>
                                            <input type="text" value={formData.uiAcademyHeader1} onChange={e => setFormData({ ...formData, uiAcademyHeader1: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Akademiya Başlıq 2 (Rəngli)</label>
                                            <input type="text" value={formData.uiAcademyHeader2} onChange={e => setFormData({ ...formData, uiAcademyHeader2: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Akademiya Alt Mətn</label>
                                            <textarea value={formData.uiAcademySub} onChange={e => setFormData({ ...formData, uiAcademySub: e.target.value })} className="form-control" rows={2} />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Bloq Başlıq 1</label>
                                            <input type="text" value={formData.uiBlogHeader1} onChange={e => setFormData({ ...formData, uiBlogHeader1: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Bloq Başlıq 2 (Rəngli)</label>
                                            <input type="text" value={formData.uiBlogHeader2} onChange={e => setFormData({ ...formData, uiBlogHeader2: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Bloq Alt Mətn</label>
                                            <textarea value={formData.uiBlogSub} onChange={e => setFormData({ ...formData, uiBlogSub: e.target.value })} className="form-control" rows={2} />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4 mb-3">
                                        <h5 className="border-bottom pb-2">Form və Modal Yazıları</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Ad Soyad (Label)</label>
                                            <input type="text" value={formData.uiFullName} onChange={e => setFormData({ ...formData, uiFullName: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Telefon (Label)</label>
                                            <input type="text" value={formData.uiPhone} onChange={e => setFormData({ ...formData, uiPhone: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Email (Label)</label>
                                            <input type="text" value={formData.uiEmail} onChange={e => setFormData({ ...formData, uiEmail: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Fəaliyyət Növü (Label)</label>
                                            <input type="text" value={formData.uiActivityType} onChange={e => setFormData({ ...formData, uiActivityType: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Vergi Növü (Label)</label>
                                            <input type="text" value={formData.uiTaxType} onChange={e => setFormData({ ...formData, uiTaxType: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Müştəri Statusu (Label)</label>
                                            <input type="text" value={formData.uiCustomerStatus} onChange={e => setFormData({ ...formData, uiCustomerStatus: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Sorğunu Göndər (Buton)</label>
                                            <input type="text" value={formData.uiSubmit} onChange={e => setFormData({ ...formData, uiSubmit: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Müraciət Et (Buton)</label>
                                            <input type="text" value={formData.uiApply} onChange={e => setFormData({ ...formData, uiApply: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Seçin (Placeholder)</label>
                                            <input type="text" value={formData.uiSelect} onChange={e => setFormData({ ...formData, uiSelect: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Təşəkkür Edirik (Başlıq)</label>
                                            <input type="text" value={formData.uiThanks} onChange={e => setFormData({ ...formData, uiThanks: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Əlaqə Saxlanılacaq (Alt Mətn)</label>
                                            <input type="text" value={formData.uiContactSoon} onChange={e => setFormData({ ...formData, uiContactSoon: e.target.value })} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Bağla (Buton)</label>
                                            <input type="text" value={formData.uiClose} onChange={e => setFormData({ ...formData, uiClose: e.target.value })} className="form-control" />
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
