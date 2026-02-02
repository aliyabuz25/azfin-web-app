
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';

const ApplicationsManager: React.FC = () => {
    const { applications, deleteApplication, updateApplicationStatus, refreshData } = useData();
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'contact' | 'academy' | 'service'>('contact');

    const toggleRow = (id: string) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(rowId => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
            const request = applications.find(r => r.id === id);
            if (request && request.status === 'new') {
                updateApplicationStatus(id, 'read');
            }
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return <span className="badge badge-warning">Gözləyir</span>;
            case 'read': return <span className="badge badge-info">Oxunub</span>;
            case 'contacted': return <span className="badge badge-success">Əlaqə saxlanılıb</span>;
            default: return <span className="badge badge-secondary">{status}</span>;
        }
    };

    const filteredApplications = applications.filter(r => (r.type || 'contact') === activeTab);

    return (
        <AdminLayout title="Müraciətlər">
            <div className="card">
                <div className="card-header p-0 pt-1 border-bottom-0">
                    <ul className="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                                onClick={() => setActiveTab('contact')}
                            >
                                <i className="fas fa-envelope mr-1"></i> Əlaqə
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'academy' ? 'active' : ''}`}
                                onClick={() => setActiveTab('academy')}
                            >
                                <i className="fas fa-graduation-cap mr-1"></i> Akademiya
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'service' ? 'active' : ''}`}
                                onClick={() => setActiveTab('service')}
                            >
                                <i className="fas fa-briefcase mr-1"></i> Xidmətlər
                            </button>
                        </li>
                    </ul>
                    <div className="card-tools p-2">
                        <button className="btn btn-tool" onClick={refreshData}>
                            <i className="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>Tarix</th>
                                <th>Ad Soyad</th>
                                <th>Mövzu / Növ</th>
                                <th>Status</th>
                                <th>Əməliyyatlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-4">Müraciət tapılmadı</td></tr>
                            ) : filteredApplications.map((req) => (
                                <React.Fragment key={req.id}>
                                    <tr style={{ cursor: 'pointer' }} onClick={() => toggleRow(req.id)}>
                                        <td>{req.date.includes('-') ? req.date : new Date(req.date).toLocaleString('az-AZ')}</td>
                                        <td>
                                            <div className="font-weight-bold">{req.data?.name || req.name || 'Adsız'}</div>
                                            <div className="text-xs text-muted">{req.data?.email || req.email || '-'}</div>
                                        </td>
                                        <td>
                                            <span className="text-sm">{req.data?.subject || req.subject || 'Mövzu yoxdur'}</span>
                                            {req.type && <span className="badge badge-light ml-2">{req.type}</span>}
                                        </td>
                                        <td>{getStatusBadge(req.status)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mr-1"
                                                title="Detallar"
                                                onClick={(e) => { e.stopPropagation(); toggleRow(req.id); }}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); deleteApplication(req.id); }} title="Sil">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows.includes(req.id) && (
                                        <tr className="bg-light">
                                            <td colSpan={5}>
                                                <div className="p-3">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <p><strong>Telefon:</strong> {req.data?.phone || req.phone || 'Göstərilməyib'}</p>
                                                            <p><strong>E-poçt:</strong> {req.data?.email || req.email || 'Göstərilməyib'}</p>
                                                            {req.data?.trainingName && <p><strong>Təlim:</strong> {req.data.trainingName}</p>}
                                                            {req.data?.serviceName && <p><strong>Xidmət:</strong> {req.data.serviceName}</p>}
                                                        </div>
                                                        <div className="col-md-6 border-left">
                                                            {req.data?.activityType && <p><strong>Fəaliyyət növü:</strong> {req.data.activityType}</p>}
                                                            {req.data?.taxType && <p><strong>Vergi növü:</strong> {req.data.taxType}</p>}
                                                            {req.data?.customerStatus && <p><strong>Müştəri statusu:</strong> {req.data.customerStatus}</p>}
                                                        </div>
                                                    </div>
                                                    <p className="mt-2"><strong>Mesaj / Qeyd:</strong></p>
                                                    <div className="bg-white p-3 border rounded shadow-sm mb-3 whitespace-pre-line">
                                                        {req.data?.message || req.message || req.data?.note || 'Mesaj yoxdur'}
                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        {req.status !== 'contacted' && (
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => updateApplicationStatus(req.id, 'contacted')}
                                                            >
                                                                <i className="fas fa-check mr-1"></i> Əlaqə saxlanıldı
                                                            </button>
                                                        )}
                                                        {req.status !== 'new' && (
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                onClick={() => updateApplicationStatus(req.id, 'new')}
                                                            >
                                                                <i className="fas fa-undo mr-1"></i> Yenidən gözləyir et
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationsManager;
