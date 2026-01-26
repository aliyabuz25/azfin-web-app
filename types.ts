
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
  iconName?: string; // For storage
  buttonText?: string;
  buttonLink?: string;
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
  iconName?: string; // For storage
}

export interface TrainingItem {
  id: string;
  title: string;
  description: string;
  badgeText?: string;
  fullContent?: string;
  syllabusTitle?: string;
  syllabus?: string[];
  startDate: string;
  duration: string;
  level: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface SiteSettings {
  phoneNumber: string;
  email: string;
  address: string;
  workingHours: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  heroButtonText: string;
  heroButtonLink: string;
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  whatsappNumber: string;
  messengerUsername: string;
  navbarButtonText: string;
  navbarButtonLink: string;
  footerDescription: string;
  footerText: string;
  // Localization fields
  homeServicesTitle: string;
  homeServicesSubtitle: string;
  homeSectorsTitle: string;
  homeProcessTitle: string;
  homeProcessSubtitle: string;
  homeClientsTitle: string;
  contactTitle: string;
  contactSubtitle: string;
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
  type: 'service' | 'academy' | 'contact' | 'audit';
  data: any;
  date: string;
  status: 'new' | 'read' | 'contacted';
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
