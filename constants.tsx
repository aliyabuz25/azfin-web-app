
import { NavItem, ServiceItem, StatisticItem, TrainingItem, BlogItem } from './types';
import { Calculator, FileText, TrendingUp, Users, SearchCheck, Briefcase, Award, Building2, Scale, Users2 } from 'lucide-react';

export const STATISTICS: StatisticItem[] = [
  { id: '1', label: 'Uğurlu Audit', value: '850+', icon: SearchCheck },
  { id: '2', label: 'Korporativ Müştəri', value: '320+', icon: Users },
  { id: '3', label: 'İllik Təcrübə', value: '15+', icon: Award },
  { id: '4', label: 'Peşəkar Ekspert', value: '25+', icon: Building2 },
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Vergi xidmətləri',
    description: 'Vergi risklərinin minimuma endirilməsi və hesabatların dəqiq təqdimatı.',
    content: 'Azfin mütəxəssisləri tərəfindən vergi qanunvericiliyinə tam uyğunluğun təmin edilməsi. Biz müştərilərimizə vergi yükünün optimallaşdırılması və dövlət orqanları ilə münasibətlərin peşəkar tənzimlənməsini təklif edirik.',
    benefits: [
      'Vergi hesabatlarının hazırlanması',
      'Vergi yoxlamalarına hazırlıq',
      'Vergi uçotu üzrə konsultasiya',
      'Vergi planlaması və optimallaşdırma'
    ],
    icon: FileText,
  },
  {
    id: '2',
    title: 'Maliyyə xidmətləri',
    description: 'Biznesinizin maliyyə göstəricilərinin analizi və hesabatlılığın qurulması.',
    content: 'Şirkətin maliyyə vəziyyətinin tam şəffaf şəkildə əks olunması üçün beynəlxalq standartlara uyğun uçot xidmətləri. Gündəlik əməliyyatlardan strateji maliyyə analizlərinə qədər tam dəstək.',
    benefits: [
      'Maliyyə hesabatlarının tərtib edilməsi',
      'Mənfəət və zərərin hazırlanması',
      'Gündəlik əməliyyatların həyata keçirilməsi',
      'Maliyyə fəaliyyətinin analitikası'
    ],
    icon: Calculator,
  },
  {
    id: '3',
    title: 'Audit xidmətləri',
    description: 'Maliyyə hesabatlarının dürüstlüyünün və daxili nəzarətin təsdiqi.',
    content: 'Beynəlxalq Audit Standartlarına (ISA) uyğun olaraq həyata keçirilən kənar və daxili audit yoxlamaları. Biz riskləri aşkarlayır və biznesin səmərəliliyini artırmaq üçün tövsiyələr veririk.',
    benefits: [
      'Maliyyə hesabatlarının auditi',
      'Daxili audit xidmətləri',
      'Xüsusi məqsədli audit yoxlamaları',
      'Risk menecmenti qiymətləndirilməsi'
    ],
    icon: SearchCheck,
  },
  {
    id: '4',
    title: 'Hüquq xidmətləri',
    description: 'Biznes fəaliyyətinin hüquqi cəhətdən tam qorunması və dəstəklənməsi.',
    content: 'Müqavilə münasibətlərindən korporativ məsələlərə qədər peşəkar hüquqi yardım. Biznesinizin qanunvericilik qarşısında hər hansı bir boşluq qalmaması üçün çalışırıq.',
    benefits: [
      'Müqavilələrin hüquqi ekspertizası',
      'Korporativ hüquq xidmətləri',
      'Hüquqi rəylərin hazırlanması',
      'Biznesin qeydiyyatı və ləğvi'
    ],
    icon: Scale,
  },
  {
    id: '5',
    title: 'Kadr uçotu',
    description: 'Əmək qanunvericiliyinə uyğun sənədləşmə və kadr işinin təşkili.',
    content: 'Kadr kargüzarlığının Azərbaycan Respublikasının Əmək Məcəlləsinə uyğun qurulması və idarə edilməsi. İşçi və işəgötürən arasındakı hüquqi münasibətlərin düzgün rəsmiləşdirilməsi.',
    benefits: [
      'Kadr uçotunun təhlili',
      'Kadr uçotunun aparılması',
      'Əmək müqavilələrinin tərtibatı',
      'Əmrlərin və digər normativ sənədlərin hazırlanması',
      'Maddi məsuliyyət və xidmət müqavilələrinin hazırlanması'
    ],
    icon: Users2,
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'ANA\nSƏHİFƏ', path: '/' },
  { label: 'HAQQIMIZDA', path: '/about' },
  {
    label: 'XİDMƏTLƏR',
    path: '/services',
    children: [
      { label: 'Vergi xidmətləri', path: '/services/1' },
      { label: 'Maliyyə xidmətləri', path: '/services/2' },
      { label: 'Audit xidmətləri', path: '/services/3' },
      { label: 'Hüquq xidmətləri', path: '/services/4' },
      { label: 'Kadr uçotu', path: '/services/5' },
    ]
  },
  { label: 'BLOQ VƏ\nXƏBƏRLƏR', path: '/blog' },
  { label: 'AKADEMİYA', path: '/academy' },
  { label: 'AUDİTTV', path: 'https://audittv.az/', isExternal: true },
];

export const TRAININGS: TrainingItem[] = [
  {
    id: '1',
    title: 'Peşəkar Mühasib Təlimi',
    description: 'Mühasibat uçotunun əsasları, Vergi Məcəlləsi, 1C 8.3 proqramı və Bəyannamələrin hazırlanması üzrə kompleks təlim.',
    fullContent: 'İnsan Resursları və Kadr kargüzarlığı üzrə ixtisaslaşmaq istəyənlər üçün ideal proqramdır. Təlim çərçivəsində Əmək Məcəlləsinin tələbləri, işə qəbul və işdən azad etmə prosedurları, əmrlərin hazırlanması, iş vaxtının uçotu və ƏMAS altsistemi ilə işləmək qaydaları öyrənilir.',
    syllabus: [
      'Azərbaycan Respublikasının Əmək Məcəlləsi',
      'Əmək müqavilələrinin bağlanması və xitam verilməsi',
      'Əmək kitabçalarının yazılması qaydaları',
      'Məzuniyyət və ezamiyyətlərin rəsmiləşdirilməsi',
      'ƏMAS (Əmək Münasibətləri Alt Sistemi) üzrə əməliyyatlar'
    ],
    startDate: '15 Noyabr 2024',
    duration: '3 ay',
    level: 'Başlanğıc və Orta',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Vergi Məcəlləsi və Tətbiqi',
    description: 'Vergi qanunvericiliyindəki son dəyişikliklər, riskli əməliyyatlar və vergi planlaması üzrə praktiki seminar.',
    fullContent: 'Vergi sahəsində dərin biliklər əldə etmək və praktiki tətbiq bacarıqlarını inkişaf etdirmək üçün nəzərdə tutulmuşdur. Təlim vergi qanunvericiliyinin bütün aspektlərini əhatə edir.',
    syllabus: [
      'Gəlir və mənfəət vergisi üzrə hesablamalar',
      'Əlavə Dəyər Vergisi (ƏDV) administrasiyası',
      'Sadələşdirilmiş vergi rejimi',
      'Vergi hesabatlarının (Bəyannamələrin) tərtibi',
      'Vergi yoxlamaları və audit prosesləri'
    ],
    startDate: '01 Dekabr 2024',
    duration: '1 ay',
    level: 'Orta',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Daxili Audit Standartları',
    description: 'Risklərin idarə edilməsi və daxili nəzarət sistemlərinin qurulması üzrə ixtisaslaşmış proqram.',
    fullContent: 'Daxili audit peşəsinə yiyələnmək istəyənlər üçün beynəlxalq standartlar əsasında hazırlanmış təlimdir. Risklərin qiymətləndirilməsi və nəzarət mexanizmlərinin effektivliyinin təhlili öyrədilir.',
    syllabus: [
      'Daxili Audit Beynəlxalq Standartları (IIA)',
      'Risklərin idarə olunması (COSO Framework)',
      'Audit proqramının hazırlanması',
      'Hesabatlılıq və tövsiyələrin verilməsi',
      'Fırıldaqçılıq hallarının qarşısının alınması'
    ],
    startDate: '10 Dekabr 2024',
    duration: '2 ay',
    level: 'Professional',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Maliyyə Hesabatlarının Analizi',
    description: 'MHBS əsasında maliyyə hesabatlarının oxunması, təhlili və qərar qəbuletmə mexanizmləri.',
    fullContent: 'Rəhbər şəxslər və maliyyəçilər üçün biznesin real vəziyyətini anlamaq üçün vacib alətlər təqdim edilir. Rəqəmlərin arxasındakı hekayəni oxumaq bacarığı aşılanır.',
    syllabus: [
      'MHBS üzrə əsas maliyyə hesabatları',
      'Maliyyə əmsallarının (ratios) analizi',
      'Pul vəsaitlərinin hərəkəti (Cash Flow) təhlili',
      'Rentabellik və likvidlik göstəriciləri',
      'İnvestisiya layihələrinin qiymətləndirilməsi'
    ],
    startDate: '15 Dekabr 2024',
    duration: '1.5 ay',
    level: 'Orta və İrəli',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    status: 'upcoming'
  }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: '1',
    title: 'Yeni Vergi Məcəlləsinə Dəyişikliklər 2024',
    excerpt: 'Biznes sahibləri və mühasiblər üçün 2024-cü ildə qüvvəyə minən əsas vergi dəyişikliklərinin icmalı.',
    content: '2024-cü il üçün Vergi Məcəlləsində bir sıra mühüm dəyişikliklər nəzərdə tutulub. Bu dəyişikliklər əsasən mikro və kiçik sahibkarlıq subyektlərinə yönəlib...',
    date: '10 Avqust 2024',
    author: 'Azfin Ekspert',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
    category: 'Vergi'
  },
  {
    id: '2',
    title: 'Daxili Audit Niyə Vacibdir?',
    excerpt: 'Şirkətin daxili nəzarət sistemlərinin effektivliyini artırmaq üçün auditin rolu.',
    content: 'Daxili audit yalnız səhvlərin aşkar edilməsi deyil, həm də biznes proseslərinin təkmilləşdirilməsi üçün bir alətdir...',
    date: '05 Avqust 2024',
    author: 'Azfin Ekspert',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    category: 'Audit'
  },
  {
    id: '3',
    title: 'Mühasibat Uçotunda Rəqəmsallaşma',
    excerpt: 'Bulud texnologiyalarının müasir mühasibatlığa gətirdiyi üstünlüklər və gələcək trendlər.',
    content: 'Rəqəmsal transformasiya artıq mühasibatlıq sahəsinə də dərindən nüfuz etmişdir...',
    date: '01 Avqust 2024',
    author: 'Azfin Ekspert',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1000',
    category: 'Maliyyə'
  }
];
