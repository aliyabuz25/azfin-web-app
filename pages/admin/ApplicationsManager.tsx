
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { Trash2, CheckCircle, Clock, Mail, Phone, User, MessageSquare, Briefcase, GraduationCap } from 'lucide-react';
import { Application } from '../../types';

const ApplicationsManager: React.FC = () => {
    const { applications, deleteApplication, updateApplicationStatus } = useData();
    const [filter, setFilter] = useState<Application['type'] | 'all'>('all');

    const filteredApps = filter === 'all'
        ? applications
        : applications.filter(app => app.type === filter);

    const getIcon = (type: Application['type']) => {
        switch (type) {
            case 'service': return Briefcase;
            case 'academy': return GraduationCap;
            case 'contact': return MessageSquare;
            default: return Mail;
        }
    };

    const getTypeLabel = (type: Application['type']) => {
        switch (type) {
            case 'service': return 'Xidmət Təklifi';
            case 'academy': return 'Akademiya Müraciəti';
            case 'contact': return 'Əlaqə Formu';
            default: return 'Müraciət';
        }
    };

    const getStatusBadge = (status: Application['status']) => {
        switch (status) {
            case 'new': return <span className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Yeni</span>;
            case 'read': return <span className="bg-amber-100 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Oxundu</span>;
            case 'contacted': return <span className="bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Əlaqə Saxlanıldı</span>;
        }
    };

    return (
        <AdminLayout title="Müraciətlər">
            <div className="space-y-8">
                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all ${filter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
                    >
                        Hamısı ({applications.length})
                    </button>
                    {(['service', 'academy', 'contact'] as const).map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all ${filter === type ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'}`}
                        >
                            {getTypeLabel(type)} ({applications.filter(a => a.type === type).length})
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredApps.length === 0 ? (
                        <div className="bg-white p-20 text-center rounded-2xl border border-slate-100">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 uppercase italic">Müraciət tapılmadı</h3>
                            <p className="text-slate-400 font-medium">Bu kateqoriyada hələ ki heç bir müraciət yoxdur.</p>
                        </div>
                    ) : (
                        filteredApps.map((app) => {
                            const Icon = getIcon(app.type);
                            return (
                                <div key={app.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-8 group">
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${app.type === 'service' ? 'bg-blue-50 text-blue-500' :
                                        app.type === 'academy' ? 'bg-purple-50 text-purple-500' :
                                            'bg-emerald-50 text-emerald-500'
                                        }`}>
                                        <Icon className="h-8 w-8" />
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-black text-slate-800 lowercase tracking-tight">
                                                {app.data.name || app.data.fullName || 'Adsız Müraciət'}
                                            </h3>
                                            {getStatusBadge(app.status)}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
                                            {app.data.email && (
                                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                    <Mail className="h-4 w-4 text-slate-400" /> {app.data.email}
                                                </div>
                                            )}
                                            {app.data.phone && (
                                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                    <Phone className="h-4 w-4 text-slate-400" /> {app.data.phone}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                                <Clock className="h-4 w-4 text-slate-400" /> {app.date}
                                            </div>
                                        </div>

                                        {app.data.message && (
                                            <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg italic border-l-4 border-slate-200">
                                                "{app.data.message}"
                                            </p>
                                        )}

                                        {/* Dynamic data display for all types */}
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                                            {Object.entries(app.data).map(([key, value]) => {
                                                // Skip standard fields already shown above
                                                if (['name', 'fullName', 'email', 'phone', 'message'].includes(key)) return null;
                                                if (!value) return null;

                                                const labelMap: Record<string, string> = {
                                                    activity: 'Fəaliyyət',
                                                    taxType: 'Vergi növü',
                                                    status: 'Müştəri statusu',
                                                    subject: 'Mövzu',
                                                    trainingTitle: 'Təlim',
                                                    serviceTitle: 'Xidmət',
                                                    note: 'Qeyd'
                                                };

                                                return (
                                                    <div key={key} className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{labelMap[key] || key}:</span>
                                                        <span className="text-xs font-bold text-primary italic uppercase">{String(value)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2 shrink-0">
                                        {app.status !== 'contacted' && (
                                            <button
                                                onClick={() => updateApplicationStatus(app.id, 'contacted')}
                                                className="flex-1 md:flex-none p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all"
                                                title="Əlaqə saxlanıldı olaraq qeyd et"
                                            >
                                                <CheckCircle className="h-5 w-5 mx-auto" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Bu müraciəti silmək istədiyinizə əminsiniz?')) {
                                                    deleteApplication(app.id);
                                                }
                                            }}
                                            className="flex-1 md:flex-none p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all"
                                            title="Sil"
                                        >
                                            <Trash2 className="h-5 w-5 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationsManager;
