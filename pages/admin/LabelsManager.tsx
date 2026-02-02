
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import {
    Layout,
    Type,
    MousePointer2,
    Navigation,
    ClipboardList,
    CheckCircle2,
    MessageSquare,
    Save
} from 'lucide-react';

type LabelSection = 'navigation' | 'common' | 'services' | 'academy' | 'blog' | 'about' | 'forms';

const LabelsManager: React.FC = () => {
    const { siteSettings, updateSiteSettings } = useData();
    const [formData, setFormData] = useState(siteSettings);
    const [activeSection, setActiveSection] = useState<LabelSection>('navigation');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setFormData(siteSettings);
    }, [siteSettings]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSiteSettings(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const sections = [
        { id: 'navigation', label: 'Naviqasiya', icon: Navigation },
        { id: 'common', label: 'Butonlar və Ümumi', icon: MousePointer2 },
        { id: 'services', label: 'Xidmətlər Səhifəsi', icon: Layout },
        { id: 'academy', label: 'Akademiya Səhifəsi', icon: Type },
        { id: 'blog', label: 'Bloq Səhifəsi', icon: Type },
        { id: 'about', label: 'Haqqımızda Bölməsi', icon: ClipboardList },
        { id: 'forms', label: 'Form və Modallar', icon: MessageSquare },
    ];

    const renderField = (key: keyof typeof formData, label: string, isTextArea = false) => (
        <div className="form-group mb-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 d-block">{label}</label>
            {isTextArea ? (
                <textarea
                    rows={3}
                    value={(formData[key] as string) || ''}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                    className="form-control"
                />
            ) : (
                <input
                    type="text"
                    value={(formData[key] as string) || ''}
                    onChange={(e) => handleChange(key as string, e.target.value)}
                    className="form-control"
                />
            )}
        </div>
    );

    return (
        <AdminLayout title="Səhifə Yazılarının İdarə Edilməsi">
            <div className="row">
                <div className="col-md-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white border-bottom py-3">
                            <h3 className="card-title font-weight-bold text-primary">Bölmələr</h3>
                        </div>
                        <div className="card-body p-0">
                            <ul className="nav nav-pills flex-column">
                                {sections.map((section) => (
                                    <li key={section.id} className="nav-item border-bottom last:border-0">
                                        <button
                                            onClick={() => setActiveSection(section.id as LabelSection)}
                                            className={`nav-link text-left w-100 rounded-0 border-0 py-3 px-4 flex items-center gap-3 transition-colors ${activeSection === section.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <section.icon size={18} />
                                            <span className="font-bold text-sm">{section.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <form onSubmit={handleSubmit} className="card shadow-sm border-0">
                        <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                            <h3 className="card-title font-weight-bold text-primary tracking-tight">
                                {sections.find(s => s.id === activeSection)?.label}
                            </h3>
                            <button type="submit" className="btn btn-primary btn-sm flex items-center gap-2 px-4">
                                <Save size={16} />
                                <span className="font-bold">{success ? 'Yadda Saxlanıldı' : 'Yadda Saxla'}</span>
                            </button>
                        </div>
                        <div className="card-body p-4 p-md-5">
                            {activeSection === 'navigation' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiHome', 'Ana Səhifə')}</div>
                                    <div className="col-md-6">{renderField('uiAbout', 'Haqqımızda')}</div>
                                    <div className="col-md-6">{renderField('uiServices', 'Xidmətlər')}</div>
                                    <div className="col-md-6">{renderField('uiAcademy', 'Akademiya')}</div>
                                    <div className="col-md-6">{renderField('uiBlog', 'Bloq')}</div>
                                    <div className="col-md-6">{renderField('uiContact', 'Əlaqə')}</div>
                                    <div className="col-md-6">{renderField('uiAuditTV', 'AuditTV Link Yazısı')}</div>
                                    <div className="col-md-6">{renderField('uiNavigation', 'Naviqasiya (Başlıq)')}</div>
                                </div>
                            )}

                            {activeSection === 'common' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiReadMore', 'Ətraflı (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiGetOffer', 'Təklif Alın (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiAllTrainings', 'Bütün Təlimlər (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiApply', 'Müraciət Et (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiSubmit', 'Göndər (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiClose', 'Bağla (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiCopyright', 'Copyright Yazısı')}</div>
                                    <div className="col-md-6">{renderField('uiSocialMedia', 'Sosial Media (Başlıq)')}</div>
                                    <div className="col-12">{renderField('footerDescription', 'Footer Təsvir', true)}</div>
                                </div>
                            )}

                            {activeSection === 'services' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiServiceCatalogue', 'Xidmət Kataloqu (Sərhədüstü)')}</div>
                                    <div className="col-md-6">{renderField('uiServiceHeader1', 'Xidmət Başlıq 1')}</div>
                                    <div className="col-md-6">{renderField('uiServiceHeader2', 'Xidmət Başlıq 2 (Rəngli)')}</div>
                                    <div className="col-12">{renderField('uiServiceSub', 'Xidmət Alt Mətn', true)}</div>
                                    <div className="col-md-6">{renderField('homeServicesTitle', 'Ana Səhifə Xidmətlər Başlığı')}</div>
                                    <div className="col-md-6">{renderField('homeServicesSubtitle', 'Ana Səhifə Xidmətlər Alt Başlığı')}</div>
                                </div>
                            )}

                            {activeSection === 'academy' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiAcademyHeader1', 'Akademiya Başlıq 1')}</div>
                                    <div className="col-md-6">{renderField('uiAcademyHeader2', 'Akademiya Başlıq 2 (Rəngli)')}</div>
                                    <div className="col-12">{renderField('uiAcademySub', 'Akademiya Alt Mətn', true)}</div>
                                </div>
                            )}

                            {activeSection === 'blog' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiBlogHeader1', 'Bloq Başlıq 1')}</div>
                                    <div className="col-md-6">{renderField('uiBlogHeader2', 'Bloq Başlıq 2 (Rəngli)')}</div>
                                    <div className="col-12">{renderField('uiBlogSub', 'Bloq Alt Mətn', true)}</div>
                                </div>
                            )}

                            {activeSection === 'about' && (
                                <div className="row">
                                    <div className="col-md-6">{renderField('uiOurMission', 'Missiyamız (Başlıq)')}</div>
                                    <div className="col-md-6">{renderField('uiServiceAreas', 'Xidmət Sahələrimiz (Başlıq)')}</div>
                                    <div className="col-md-6">{renderField('uiTeam', 'Əməkdaşlar (Tab)')}</div>
                                    <div className="col-md-6">{renderField('uiTestimonials', 'Müştəri Rəyləri (Tab)')}</div>
                                    <div className="col-md-12">{renderField('uiJoinTeam', 'Komandaya Qoşulun (Başlıq)')}</div>
                                    <div className="col-md-12">{renderField('uiKaryeraText', 'Karyera Mətni')}</div>
                                    <div className="col-md-6">{renderField('uiViewVacancies', 'Vakansiyalara Bax (Buton)')}</div>
                                    <div className="col-md-6">{renderField('uiTrustText', 'Güvən Mətni (Başlıq)')}</div>
                                    <div className="col-12">{renderField('uiClientTrustSub', 'Müştəri Güvəni (Alt Mətn)', true)}</div>
                                </div>
                            )}

                            {activeSection === 'forms' && (
                                <div className="row">
                                    <div className="col-md-4">{renderField('uiFullName', 'Ad Soyad (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiPhone', 'Telefon (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiEmail', 'Email (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiActivityType', 'Fəaliyyət Növü (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiTaxType', 'Vergi Növü (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiCustomerStatus', 'Müştəri Statusu (Label)')}</div>
                                    <div className="col-md-4">{renderField('uiSelect', 'Seçin (Placeholder)')}</div>
                                    <div className="col-md-4">{renderField('uiThanks', 'Təşəkkür Edirik (Başlıq)')}</div>
                                    <div className="col-12">{renderField('uiContactSoon', 'Əlaqə Saxlanılacaq (Alt Mətn)')}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LabelsManager;
