import React from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
    const { services, blogs, statistics, trainings } = useData();

    const stats = [
        { label: 'Xidmətlər', value: services.length, icon: 'fas fa-briefcase', color: 'bg-info' },
        { label: 'Bloq Yazıları', value: blogs.length, icon: 'fas fa-file-alt', color: 'bg-success' },
        { label: 'Təlimlər', value: trainings.length, icon: 'fas fa-graduation-cap', color: 'bg-warning' },
        { label: 'Statistikalar', value: statistics.length, icon: 'fas fa-chart-pie', color: 'bg-danger' }
    ];

    return (
        <AdminLayout title="İdarə Paneli">
            <div className="row">
                {stats.map((stat, idx) => (
                    <div key={idx} className="col-lg-3 col-6">
                        <div className={`small-box ${stat.color}`}>
                            <div className="inner">
                                <h3 className="text-white">{stat.value}</h3>
                                <p className="text-white">{stat.label}</p>
                            </div>
                            <div className="icon">
                                <i className={stat.icon}></i>
                            </div>
                            <a href="#" className="small-box-footer">Ətraflı <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title font-weight-bold">Xoş Gəlmisiniz!</h3>
                </div>
                <div className="card-body">
                    <p className="text-muted leading-relaxed">
                        Azfin Consulting idarəetmə panelinə xoş gəlmisiniz. Sol tərəfdəki menyudan saytın məzmununu idarə edə bilərsiniz.
                        Xidmətlər, bloq yazıları və statistik dəyişikliklər dərhal saytda əks olunacaqdır.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
