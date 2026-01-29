import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/Layout';

interface FormRequest {
    id: string;
    date: string;
    status: 'pending' | 'read' | 'contacted';
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    type?: string;
}

const ApplicationsManager: React.FC = () => {
    const [requests, setRequests] = useState<FormRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('/api/requests');
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRequest = async (id: string) => {
        if (!window.confirm('Bu müraciəti silmək istədiyinizə əminsiniz?')) return;
        try {
            await fetch(`/api/requests/${id}`, { method: 'DELETE' });
            setRequests(requests.filter(r => r.id !== id));
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/requests/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            setRequests(requests.map(r => r.id === id ? { ...r, status: status as any } : r));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="badge badge-warning">Gözləyir</span>;
            case 'read': return <span className="badge badge-info">Oxunub</span>;
            case 'contacted': return <span className="badge badge-success">Əlaqə saxlanılıb</span>;
            default: return <span className="badge badge-secondary">{status}</span>;
        }
    };

    return (
        <AdminLayout title="Müraciətlər">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Müraciətlər Siyahısı (request.json)</h3>
                    <div className="card-tools">
                        <button className="btn btn-tool" onClick={fetchRequests}>
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
                            {loading ? (
                                <tr><td colSpan={5} className="text-center p-4">Yüklənir...</td></tr>
                            ) : requests.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-4">Müraciət tapılmadı</td></tr>
                            ) : requests.map((req) => (
                                <React.Fragment key={req.id}>
                                    <tr>
                                        <td>{new Date(req.date).toLocaleString('az-AZ')}</td>
                                        <td>
                                            <div className="font-weight-bold">{req.name}</div>
                                            <div className="text-xs text-muted">{req.email}</div>
                                        </td>
                                        <td>
                                            <span className="text-sm">{req.subject || 'Mövzu yoxdur'}</span>
                                            {req.type && <span className="badge badge-light ml-2">{req.type}</span>}
                                        </td>
                                        <td>{getStatusBadge(req.status)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info mr-1"
                                                data-toggle="collapse"
                                                data-target={`#req-${req.id}`}
                                                title="Detallar"
                                                onClick={() => req.status === 'pending' && updateStatus(req.id, 'read')}
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => deleteRequest(req.id)} title="Sil">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr id={`req-${req.id}`} className="collapse bg-light">
                                        <td colSpan={5}>
                                            <div className="p-3">
                                                <p><strong>Telefon:</strong> {req.phone || 'Göstərilməyib'}</p>
                                                <p><strong>Mesaj:</strong></p>
                                                <div className="bg-white p-3 border rounded shadow-sm mb-3">
                                                    {req.message}
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => updateStatus(req.id, 'contacted')}
                                                    >
                                                        <i className="fas fa-check mr-1"></i> Əlaqə saxlanıldı olaraq qeyd et
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
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
