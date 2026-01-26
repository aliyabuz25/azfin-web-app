
import React from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { FileText, Briefcase, Users2, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { services, blogs, statistics, trainings } = useData();

    const stats = [
        { label: 'Ümumi Xidmətlər', value: services.length, icon: Briefcase, color: 'bg-blue-500' },
        { label: 'Bloq Yazıları', value: blogs.length, icon: FileText, color: 'bg-emerald-500' },
        { label: 'Təlimlər', value: trainings.length, icon: Award, color: 'bg-purple-500' },
        { label: 'Statistikalar', value: statistics.length, icon: Users2, color: 'bg-orange-500' }
    ];

    return (
        <AdminLayout title="İdarə Paneli">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                        <div className={`${stat.color} p-4 rounded-lg text-white shadow-lg shadow-black/5`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Xoş Gəlmisiniz!</h3>
                <p className="text-slate-600 leading-relaxed">
                    Azfin Consulting idarəetmə panelinə xoş gəlmisiniz. Sol tərəfdəki menyudan saytın məzmununu idarə edə bilərsiniz.
                    Xidmətlər, bloq yazıları və statistik dəyişikliklər dərhal saytda əks olunacaqdır.
                </p>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
