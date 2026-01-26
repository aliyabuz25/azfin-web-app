
import { 
  FileText, Calculator, SearchCheck, Scale, Users2, 
  ShieldCheck, Award, Building2, Users, ReceiptText, 
  BarChartBig, Search, Gavel, UsersRound, BookOpen,
  Briefcase, TrendingUp, Lightbulb, Rocket, Globe
} from 'lucide-react';

export const iconMap: Record<string, any> = {
  FileText, Calculator, SearchCheck, Scale, Users2,
  ShieldCheck, Award, Building2, Users, ReceiptText,
  BarChartBig, Search, Gavel, UsersRound, BookOpen,
  Briefcase, TrendingUp, Lightbulb, Rocket, Globe
};

export const getIcon = (name: string) => {
  return iconMap[name] || ShieldCheck;
};
