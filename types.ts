
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  content: string;
  benefits?: string[];
  icon: LucideIcon;
  iconName?: string;
  summary?: {
    standard: string;
    duration: string;
  };
  scope?: string[];
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  quote?: string;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  iconName?: string;
}

export interface TrainingItem {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  syllabus?: string[];
  startDate: string;
  duration: string;
  level: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  badgeText?: string;
  syllabusTitle?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
}

export interface SectorItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  iconName: string;
  title: string;
  description: string;
}

export interface Application {
  id: string;
  type: 'contact' | 'academy' | 'service';
  data: any;
  date: string;
  status: 'new' | 'read' | 'contacted';
}

export interface SiteSettings {
  phoneNumber: string;
  email: string;
  address: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  heroImage?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  whatsappNumber: string;
  messengerUsername?: string;
  navbarButtonText?: string;
  navbarButtonLink?: string;
  footerDescription?: string;
  footerText: string;
  homeServicesTitle: string;
  homeServicesSubtitle: string;
  homeSectorsTitle: string;
  homeProcessTitle: string;
  homeProcessSubtitle: string;
  homeClientsTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  uiAbout?: string;
  uiServices?: string;
  uiAcademy?: string;
  uiBlog?: string;
  uiContact?: string;
  uiAuditTV?: string;
  uiHome?: string;
  uiNavigation?: string;
  uiReadMore?: string;
  uiGetOffer?: string;
  uiAllTrainings?: string;
  uiCopyright?: string;
  uiSocialMedia?: string;
  uiOurExperience?: string;
  uiCompetentService?: string;
  uiSuccessAudit?: string;
  uiCorporateClient?: string;
  uiYearsExperience?: string;
  uiProfessionalExpert?: string;
  uiOurMission?: string;
  uiServiceAreas?: string;
  uiTeam?: string;
  uiTestimonials?: string;
  uiJoinTeam: string;
  uiKaryeraText: string;
  uiViewVacancies: string;
  uiTrustText: string;
  uiClientTrustSub: string;
  uiServiceCatalogue: string;
  uiServiceHeader1: string;
  uiServiceHeader2?: string;
  uiServiceSub?: string;
  uiAcademyHeader1?: string;
  uiAcademyHeader2?: string;
  uiAcademySub?: string;
  uiBlogHeader1?: string;
  uiBlogHeader2?: string;
  uiBlogSub?: string;
  uiFullName?: string;
  uiPhone?: string;
  uiEmail?: string;
  uiActivityType?: string;
  uiTaxType?: string;
  uiCustomerStatus?: string;
  uiSubmit?: string;
  uiApply: string;
  uiSelect: string;
  uiThanks: string;
  uiContactSoon: string;
  uiClose: string;
  auditTvUrl: string;
}

export interface AboutData {
  title: string;
  description: string;
  content: string;
  mission: string;
  scope: string;
  image: string;
  team: {
    id: string;
    name: string;
    role: string;
    img: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    company: string;
    text: string;
  }[];
}

export interface AuditBenefitItem {
  title: string;
  description: string;
}
