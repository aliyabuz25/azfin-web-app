
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Settings, Users,
    Briefcase, GraduationCap, LogOut, Globe, MessageSquare, Rocket, Award,
    LucideIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Panel' },
        { path: '/admin/applications', icon: MessageSquare, label: 'Müraciətlər' },
        { label: 'Saytın Məzmunu', isHeader: true },
        { path: '/admin/services', icon: Briefcase, label: 'Xidmətlər' },
        { path: '/admin/blogs', icon: FileText, label: 'Bloq' },
        { path: '/admin/academy', icon: GraduationCap, label: 'Akademiya' },
        { label: 'Səhifələr', isHeader: true },
        { path: '/admin/settings', icon: Globe, label: 'Ana Səhifə' },
        { path: '/admin/about', icon: Users, label: 'Haqqımızda' },
        { label: 'Sistem', isHeader: true },
        { path: '/admin/users', icon: Users, label: 'İstifadəçilər' },
    ];

    return (
        <div className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-lg">
                    <Settings className="text-accent h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg tracking-tight">Admin Paneli</h1>
                    <p className="text-xs text-slate-500">Azfin Consulting</p>
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item, idx) => {
                    if (item.isHeader) {
                        return (
                            <div key={idx} className="px-4 pt-6 pb-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                {item.label}
                            </div>
                        );
                    }
                    const Icon = item.icon as LucideIcon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path!}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive(item.path!)
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`h-5 w-5 ${isActive(item.path!) ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    )
                })}

                <div className="pt-6 mt-6 border-t border-slate-800">
                    <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                        <Globe className="h-5 w-5 text-slate-400" />
                        <span className="font-medium text-sm">Sayta Keç</span>
                    </Link>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 hover:text-red-500 text-slate-400 transition-all font-medium text-sm"
                >
                    <LogOut className="h-5 w-5" />
                    Çıxış
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
