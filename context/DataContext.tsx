
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES, STATISTICS, BLOG_POSTS, TRAININGS } from '../constants';
import { ServiceItem, StatisticItem, BlogItem, TrainingItem, SiteSettings, SectorItem, ProcessStep, Application, AboutData } from '../types';
import { getIcon } from '../utils/icons';
import { useAuth } from './AuthContext';

interface DataContextType {
    services: ServiceItem[];
    statistics: StatisticItem[];
    blogs: BlogItem[];
    trainings: TrainingItem[];
    processSteps: ProcessStep[];
    siteSettings: SiteSettings;
    aboutData: AboutData;
    applications: Application[];

    // CRUD Actions
    addService: (item: any) => void;
    updateService: (id: string, item: any) => void;
    deleteService: (id: string) => void;

    addBlog: (item: any) => void;
    updateBlog: (id: string, item: any) => void;
    deleteBlog: (id: string) => void;

    addTraining: (item: any) => void;
    updateTraining: (id: string, item: any) => void;
    deleteTraining: (id: string) => void;

    addSector: (item: any) => void;
    updateSector: (id: string, item: any) => void;
    deleteSector: (id: string) => void;

    addProcessStep: (item: any) => void;
    updateProcessStep: (id: string, item: any) => void;
    deleteProcessStep: (id: string) => void;

    addStatistic: (item: any) => void;
    updateStatistic: (id: string, item: any) => void;
    deleteStatistic: (id: string) => void;

    addApplication: (type: Application['type'], data: any) => void;
    deleteApplication: (id: string) => void;
    updateApplicationStatus: (id: string, status: Application['status']) => void;

    updateSiteSettings: (settings: SiteSettings) => void;
    updateAboutData: (data: AboutData) => void;
    refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const DEFAULT_SETTINGS: SiteSettings = {
    phoneNumber: '+994 50 200 00 00',
    email: 'office@azfin.az',
    address: 'Bakı, Azərbaycan',
    workingHours: 'B.e - Cümə: 09:00 - 18:00',
    heroTitle: 'Biznesiniz üçün Professional Audit',
    heroSubtitle: 'Azfin Consulting olaraq şirkətlərin maliyyə hesabatlılığında şəffaflığı təmin edir, vergi risklərini minimuma endirir və strateji inkişaf yollarını müəyyən edirik.',
    heroBadge: 'Lisenziyalı Audit Xidmətləri',
    heroImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000',
    heroButtonText: 'Xidmətlər',
    heroButtonLink: '/services',
    ctaTitle: 'XİDMƏT MÜRACİƏTİ',
    ctaButtonText: 'MÜRACİƏT ET',
    ctaButtonLink: '/contact',
    instagramUrl: 'https://instagram.com/azfin',
    linkedinUrl: 'https://linkedin.com/company/azfin',
    facebookUrl: 'https://facebook.com/azfin',
    whatsappNumber: '994502000000',
    messengerUsername: 'azfin',
    navbarButtonText: 'Təklif Alın',
    navbarButtonLink: '/contact',
    footerDescription: 'Azərbaycanın ən innovativ audit və konsalting mərkəzi. Biznesinizin maliyyə gələcəyini beynəlxalq güclə quraq.',
    footerText: '© 2024 Azfin Consulting. Bütün hüquqlar qorunur.',
    homeServicesTitle: 'Əsas Xidmətlərimiz',
    homeServicesSubtitle: 'Professional Həllər',
    homeSectorsTitle: 'Konsalting Sahəsində Bir Çox Sektor Üzrə Peşəkarıq',
    homeProcessTitle: 'İş Prosesimiz',
    homeProcessSubtitle: 'Hər bir layihəyə elmi əsaslarla və beynəlxalq audit metodologiyası ilə yanaşırıq.',
    homeClientsTitle: 'BİZƏ GÜVƏNƏN MÜŞTƏRİLƏRİMİZ',
    contactTitle: 'Bizimlə Əlaqə',
    contactSubtitle: 'Suallarınız var? Bizə yazın və peşəkar komandamız sizə ən qısa zamanda cavab versin.',
    uiAbout: 'Haqqımızda',
    uiServices: 'Xidmətlər',
    uiAcademy: 'Akademiya',
    uiBlog: 'Bloq və Xəbərlər',
    uiContact: 'Əlaqə',
    uiAuditTV: 'AuditTV',
    uiHome: 'Ana Səhifə',
    uiNavigation: 'Naviqasiya',
    uiReadMore: 'Ətraflı',
    uiGetOffer: 'XİDMƏT MÜRACİƏTİ',
    uiAllTrainings: 'Bütün Təlimlər',
    uiCopyright: 'Bütün hüquqlar qorunur',
    uiSocialMedia: 'Sosial Media',
    uiOurExperience: 'Təcrübəmiz',
    uiCompetentService: 'Səriştəli Xidmət',
    uiSuccessAudit: 'Uğurlu Audit',
    uiCorporateClient: 'Korporativ Müştəri',
    uiYearsExperience: 'İllik Təcrübə',
    uiProfessionalExpert: 'Peşəkar Ekspert',
    uiOurMission: 'Missiyamız',
    uiServiceAreas: 'Xidmət Sahələrimiz',
    uiTeam: 'Əməkdaşlar',
    uiTestimonials: 'Müştəri rəyləri',
    uiJoinTeam: 'Peşəkar komandamıza qoşulun',
    uiKaryeraText: 'Karyeranızı Azfin ilə birlikdə inkişaf etdirin',
    uiViewVacancies: 'Vakansiyalara Bax',
    uiTrustText: 'Sizin güvəniniz, bizim uğurumuzdur',
    uiClientTrustSub: 'Bizimlə əməkdaşlıq edən 300-dən çox korporativ müştəri sırasına siz də qoşulun.',
    uiServiceCatalogue: 'Xidmət Kataloqumuz',
    uiServiceHeader1: 'Biznesiniz üçün',
    uiServiceHeader2: 'İxtisaslaşmış Həllər',
    uiServiceSub: 'Azfin Consulting hər bir müəssisəyə fərdi yanaşaraq, maliyyə dayanıqlığını təmin edən dəqiq strategiyalar hazırlayır.',
    uiAcademyHeader1: 'Bilik və',
    uiAcademyHeader2: 'Karyera Mərkəzi',
    uiAcademySub: 'Peşəkar inkişafınız üçün maliyyə və mühasibatlıq sahəsində ən son yenilikləri öyrənin.',
    uiBlogHeader1: 'Bloq və',
    uiBlogHeader2: 'Xəbərlər',
    uiBlogSub: 'Maliyyə və vergi dünyasındakı mühüm yeniliklərdən anında xəbərdar olun.',
    uiFullName: 'Ad Soyad',
    uiPhone: 'Telefon',
    uiEmail: 'Email',
    uiActivityType: 'Fəaliyyət növü',
    uiTaxType: 'Vergi növü',
    uiCustomerStatus: 'Müştəri statusu',
    uiSubmit: 'Sorğunu Göndər',
    uiApply: 'Müraciət Et',
    uiSelect: 'Seçin',
    uiThanks: 'Təşəkkür edirik!',
    uiContactSoon: 'Ən qısa zamanda sizinlə əlaqə saxlanılacaq.',
    uiClose: 'Tamam',
    auditTvUrl: 'https://audittv.az/'
};

const DEFAULT_ABOUT: AboutData = {
    title: 'Azfin Group MMC',
    description: 'Azfin Group MMC 2017-ci ildə təsis edilmişdir. Məqsədimiz Sahibkarlara mühasibatlıqla bağlı məsələlərdə dəstək olmaq və onlara uyğun həll yolları təqdim etmədir.',
    content: 'Hazırda kiçik, orta və iri sahibkarlıq subyektlərinə bütün növ maliyyə, mühasibatlıq, vergi və konsalting xidmətləri göstəririk. Bununla yanaşı müəssisə və fərdi sahibkarların qeydiyyatı, hüquq xidmətləri, audit xidmətləri, tender sənədlərinin hazırlanması, lisenziyaların alınması və konsalting xidmətləri də fəaliyyət sahəmizə daxildir.',
    mission: 'Sahibkarların maliyyə və hüquqi məsələlərdə güvənli tərəfdaşı olmaq, onların inkişafı üçün doğru həlləri tətbiq etmək.',
    scope: 'Mühasibatlıq, audit, vergi, tender sənədləşməsi və hüquqi dəstək üzrə geniş spektrli professional xidmətlər.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    team: [
        { id: '1', name: "Elvin Məmmədov", role: "Direktor / Ekspert Auditor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
        { id: '2', name: "Leyla Qasımova", role: "Baş Mühasib", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
        { id: '3', name: "Fuad Əliyev", role: "Vergi Departamentinin Rəhbəri", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" }
    ],
    testimonials: [
        { id: '1', name: "Arzu Vəliyev", company: "Global Logistics LLC", text: "Azfin Consulting ilə 3 ildir əməkdaşlıq edirik." }
    ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [statistics, setStatistics] = useState<StatisticItem[]>([]);
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [trainings, setTrainings] = useState<TrainingItem[]>([]);
    const [sectors, setSectors] = useState<SectorItem[]>([]);
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
    const [aboutData, setAboutData] = useState<AboutData>(DEFAULT_ABOUT);
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchAllData = async () => {
        try {
            const token = user?.token || (localStorage.getItem('azfin_active_user') ? JSON.parse(localStorage.getItem('azfin_active_user')!).token : null);

            const response = await fetch('/api/data');
            const serverData = await response.json();

            if (serverData.services) setServices(enrichServices(serverData.services));
            else {
                const serviceIconNames: Record<string, string> = {
                    '1': 'FileText',
                    '2': 'Calculator',
                    '3': 'SearchCheck',
                    '4': 'Scale',
                    '5': 'Users2'
                };
                const initialServices = SERVICES.map(s => ({
                    ...s,
                    iconName: serviceIconNames[s.id] || 'ShieldCheck'
                }));
                setServices(enrichServices(initialServices));
            }

            if (serverData.statistics) setStatistics(enrichStats(serverData.statistics));
            else {
                const statIconNames: Record<string, string> = {
                    '1': 'SearchCheck',
                    '2': 'Users',
                    '3': 'Award',
                    '4': 'Building2'
                };
                const initialStats = STATISTICS.map(s => ({
                    ...s,
                    iconName: statIconNames[s.id] || 'Award'
                }));
                setStatistics(initialStats);
            }

            if (serverData.blogs) setBlogs(serverData.blogs);
            else setBlogs(BLOG_POSTS);

            if (serverData.trainings) setTrainings(serverData.trainings);
            else setTrainings(TRAININGS);

            if (serverData.sectors) setSectors(serverData.sectors);
            else {
                const initialSectors = [
                    { id: '1', iconName: 'Plane', title: "LOGİSTİKA VƏ NƏQLİYYAT", description: "Beynəlxalq daşımalar və tədarük zənciri üzrə maliyyə auditi və strateji planlama." },
                    { id: '2', iconName: 'Utensils', title: "İAŞƏ", description: "Restoran şəbəkələri və qida xidmətləri sektoru üçün xərclərin optimallaşdırılması və vergi uçotu." },
                    { id: '3', iconName: 'GraduationCap', title: "TƏHSİL", description: "Özəl təhsil müəssisələri və təlim mərkəzləri üçün maliyyə idarəetməsi və audit xidmətləri." },
                    { id: '4', iconName: 'Factory', title: "İSTEHSALAT VƏ SƏNAYE", description: "Ağır sənaye müəssisələrinin istehsalat maliyyəsi və maya dəyəri analizi." },
                    { id: '5', iconName: 'Building', title: "DAŞINMAZ ƏMLAK", description: "Tikinti layihələrinin maliyyə nəzarəti, audit və investisiya məsləhətləri." },
                    { id: '6', iconName: 'Cpu', title: "TEXNOLOGİYA VƏ IT", description: "Yüksək texnologiya şirkətləri üçün vergi optimallaşdırılması və startap maliyyəsi." }
                ];
                setSectors(initialSectors);
            }

            if (serverData.processSteps) setProcessSteps(serverData.processSteps);
            else {
                const initialProcess = [
                    { id: '1', stepNumber: '01', iconName: 'Search', title: "Diaqnostika", description: "Biznesin cari vəziyyətinin dərindən analizi." },
                    { id: '2', stepNumber: '02', iconName: 'Lightbulb', title: "Strategiya", description: "Mümkün risklərin və həll yollarının planlanması." },
                    { id: '3', stepNumber: '03', iconName: 'Rocket', title: "İcraat", description: "Müasir texnoloji alətlərlə auditin həyata keçirilməsi." },
                    { id: '4', stepNumber: '04', iconName: 'ShieldCheck', title: "Təsdiqləmə", description: "Yekun rəy və gələcək inkişaf tövsiyələri." }
                ];
                setProcessSteps(initialProcess);
            }

            if (serverData.siteSettings) {
                setSiteSettings({ ...DEFAULT_SETTINGS, ...serverData.siteSettings });
            } else {
                setSiteSettings(DEFAULT_SETTINGS);
            }

            if (serverData.aboutData) setAboutData(serverData.aboutData);
            else setAboutData(DEFAULT_ABOUT);

            // Always fetch applications from dedicated API for consistency if logged in
            if (token) {
                console.log('Fetching applications with token...');
                try {
                    const reqRes = await fetch('/api/requests', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (reqRes.ok) {
                        const reqData = await reqRes.json();
                        console.log('Successfully fetched applications:', reqData.length);
                        setApplications(reqData);
                    } else {
                        console.error('Failed to fetch applications:', reqRes.status);
                        if (serverData.applications) setApplications(serverData.applications);
                    }
                } catch (e) {
                    console.error('Error fetching applications separately:', e);
                    if (serverData.applications) setApplications(serverData.applications);
                }
            } else {
                console.log('No token found, skipping applications fetch');
                if (serverData.applications) setApplications(serverData.applications);
            }

            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallback to local constants if server is down initially
            if (!isLoaded) {
                setServices(enrichServices(SERVICES));
                setStatistics(enrichStats(STATISTICS));
                setBlogs(BLOG_POSTS);
                setTrainings(TRAININGS);
                setIsLoaded(true);
            }
        }
    };

    useEffect(() => {
        fetchAllData();
    }, [user?.id]);

    const refreshData = async () => {
        await fetchAllData();
    };

    const enrichServices = (data: any[]): ServiceItem[] => {
        return data.map(item => ({
            ...item,
            icon: getIcon(item.iconName || 'ShieldCheck')
        }));
    };

    const enrichStats = (data: any[]): StatisticItem[] => {
        return data.map(item => ({
            ...item,
            icon: getIcon(item.iconName || 'Award')
        }));
    };

    const syncWithServer = async (updatedData: any) => {
        const storedActiveUser = localStorage.getItem('azfin_active_user');
        const token = storedActiveUser ? JSON.parse(storedActiveUser).token : null;

        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server xətası');
            }
        } catch (error: any) {
            console.error('Error syncing with server:', error);
            alert('Məlumat yadda saxlanılmadı: ' + error.message);
        }
    };

    const getAllDataForSync = () => {
        return {
            services: services.map(({ icon, ...rest }) => rest),
            statistics: statistics.map(({ icon, ...rest }) => rest),
            blogs,
            trainings,
            sectors,
            processSteps,
            siteSettings,
            aboutData,
            applications
        };
    };

    const addService = (item: any) => {
        const newItem = { ...item, id: Date.now().toString(), icon: getIcon(item.iconName) };
        const updated = [...services, newItem];
        setServices(updated);
        syncWithServer({ ...getAllDataForSync(), services: updated.map(({ icon, ...rest }) => rest) });
    };

    const updateService = (id: string, item: any) => {
        const updated = services.map(s => s.id === id ? { ...item, id, icon: getIcon(item.iconName) } : s);
        setServices(updated);
        syncWithServer({ ...getAllDataForSync(), services: updated.map(({ icon, ...rest }) => rest) });
    };

    const deleteService = (id: string) => {
        const updated = services.filter(s => s.id !== id);
        setServices(updated);
        syncWithServer({ ...getAllDataForSync(), services: updated.map(({ icon, ...rest }) => rest) });
    };

    const addBlog = (item: any) => {
        const newItem = { ...item, id: Date.now().toString() };
        const updated = [...blogs, newItem];
        setBlogs(updated);
        syncWithServer({ ...getAllDataForSync(), blogs: updated });
    };

    const updateBlog = (id: string, item: any) => {
        const updated = blogs.map(b => b.id === id ? { ...item, id } : b);
        setBlogs(updated);
        syncWithServer({ ...getAllDataForSync(), blogs: updated });
    };

    const deleteBlog = (id: string) => {
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        syncWithServer({ ...getAllDataForSync(), blogs: updated });
    };

    const addTraining = (item: any) => {
        const newItem = { ...item, id: Date.now().toString() };
        const updated = [...trainings, newItem];
        setTrainings(updated);
        syncWithServer({ ...getAllDataForSync(), trainings: updated });
    };

    const updateTraining = (id: string, item: any) => {
        const updated = trainings.map(t => t.id === id ? { ...item, id } : t);
        setTrainings(updated);
        syncWithServer({ ...getAllDataForSync(), trainings: updated });
    };

    const deleteTraining = (id: string) => {
        const updated = trainings.filter(t => t.id !== id);
        setTrainings(updated);
        syncWithServer({ ...getAllDataForSync(), trainings: updated });
    };

    const addSector = (item: any) => {
        const newItem = { ...item, id: Date.now().toString() };
        const updated = [...sectors, newItem];
        setSectors(updated);
        syncWithServer({ ...getAllDataForSync(), sectors: updated });
    };

    const updateSector = (id: string, item: any) => {
        const updated = sectors.map(s => s.id === id ? { ...item, id } : s);
        setSectors(updated);
        syncWithServer({ ...getAllDataForSync(), sectors: updated });
    };

    const deleteSector = (id: string) => {
        const updated = sectors.filter(s => s.id !== id);
        setSectors(updated);
        syncWithServer({ ...getAllDataForSync(), sectors: updated });
    };

    const addProcessStep = (item: any) => {
        const newItem = { ...item, id: Date.now().toString() };
        const updated = [...processSteps, newItem];
        setProcessSteps(updated);
        syncWithServer({ ...getAllDataForSync(), processSteps: updated });
    };

    const updateProcessStep = (id: string, item: any) => {
        const updated = processSteps.map(p => p.id === id ? { ...item, id } : p);
        setProcessSteps(updated);
        syncWithServer({ ...getAllDataForSync(), processSteps: updated });
    };

    const deleteProcessStep = (id: string) => {
        const updated = processSteps.filter(p => p.id !== id);
        setProcessSteps(updated);
        syncWithServer({ ...getAllDataForSync(), processSteps: updated });
    };

    const addStatistic = (item: any) => {
        const newItem = { ...item, id: Date.now().toString(), icon: getIcon(item.iconName) };
        const updated = [...statistics, newItem];
        setStatistics(updated);
        syncWithServer({ ...getAllDataForSync(), statistics: updated.map(({ icon, ...rest }) => rest) });
    };

    const updateStatistic = (id: string, item: any) => {
        const updated = statistics.map(s => s.id === id ? { ...item, id, icon: getIcon(item.iconName) } : s);
        setStatistics(updated);
        syncWithServer({ ...getAllDataForSync(), statistics: updated.map(({ icon, ...rest }) => rest) });
    };

    const deleteStatistic = (id: string) => {
        const updated = statistics.filter(s => s.id !== id);
        setStatistics(updated);
        syncWithServer({ ...getAllDataForSync(), statistics: updated.map(({ icon, ...rest }) => rest) });
    };

    const addApplication = async (type: Application['type'], data: any) => {
        try {
            const requestPayload = {
                type,
                name: data.name,
                email: data.email,
                phone: data.phone || data.phoneNumber,
                subject: type === 'academy' ? `Təlim: ${data.trainingName || 'Seçilməyib'}` : (type === 'service' ? 'Xidmət Sorğusu' : 'Əlaqə Mesajı'),
                message: data.message || data.note || (type === 'academy' ? `Təlim qeydiyyatı: ${data.trainingName}` : 'Xidmət müraciəti'),
                ...data
            };

            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload)
            });

            if (response.ok) {
                const newApp = await response.json();
                setApplications(prev => [newApp, ...prev]);
            }
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };

    const deleteApplication = async (id: string) => {
        if (!window.confirm('Bu müraciəti silmək istədiyinizə əminsiniz?')) return;
        const token = user?.token || (localStorage.getItem('azfin_active_user') ? JSON.parse(localStorage.getItem('azfin_active_user')!).token : null);
        try {
            const response = await fetch(`/api/requests/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });
            if (response.ok) {
                setApplications(prev => prev.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const updateApplicationStatus = async (id: string, status: Application['status']) => {
        const token = user?.token || (localStorage.getItem('azfin_active_user') ? JSON.parse(localStorage.getItem('azfin_active_user')!).token : null);
        try {
            const response = await fetch(`/api/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            }
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const updateSiteSettings = (settings: SiteSettings) => {
        setSiteSettings(settings);
        syncWithServer({ ...getAllDataForSync(), siteSettings: settings });
    };

    const updateAboutData = (data: AboutData) => {
        setAboutData(data);
        syncWithServer({ ...getAllDataForSync(), aboutData: data });
    };

    return (
        <DataContext.Provider value={{
            services, statistics, blogs, trainings, sectors, processSteps, siteSettings, aboutData,
            addService, updateService, deleteService,
            addBlog, updateBlog, deleteBlog,
            addTraining, updateTraining, deleteTraining,
            addSector, updateSector, deleteSector,
            addProcessStep, updateProcessStep, deleteProcessStep,
            addStatistic, updateStatistic, deleteStatistic,
            applications, addApplication, deleteApplication, updateApplicationStatus,
            updateSiteSettings, updateAboutData, refreshData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be used within a DataProvider');
    return context;
};
