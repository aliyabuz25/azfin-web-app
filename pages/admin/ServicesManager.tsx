
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { iconMap } from '../../utils/icons';

const ServicesManager: React.FC = () => {
    const { services, addService, updateService, deleteService } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        iconName: 'ShieldCheck',
        benefits: '',
        summaryStandard: '',
        summaryDuration: '',
        scope: ''
    });

    const handleEdit = (service: any) => {
        setEditingId(service.id);
        setFormData({
            title: service.title,
            description: service.description,
            content: service.content,
            iconName: service.iconName || 'ShieldCheck',
            benefits: service.benefits ? service.benefits.join('\n') : '',
            summaryStandard: service.summary?.standard || '',
            summaryDuration: service.summary?.duration || '',
            scope: service.scope ? service.scope.join('\n') : ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) {
            deleteService(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            content: '',
            iconName: 'ShieldCheck',
            benefits: '',
            summaryStandard: '',
            summaryDuration: '',
            scope: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const benefitsArray = formData.benefits.split('\n').filter(line => line.trim() !== '');
        const scopeArray = formData.scope.split('\n').filter(line => line.trim() !== '');

        const payload = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            iconName: formData.iconName,
            benefits: benefitsArray,
            summary: {
                standard: formData.summaryStandard,
                duration: formData.summaryDuration
            },
            scope: scopeArray
        };

        if (editingId) {
            updateService(editingId, payload);
        } else {
            addService(payload);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="Xidmətlər"
            actions={
                <button onClick={handleAddNew} className="btn btn-primary btn-sm">
                    <i className="fas fa-plus mr-1"></i> Yeni Xidmət
                </button>
            }
        >
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Xidmətlər Siyahısı</h3>
                </div>
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Təsvir</th>
                                <th>Üstünlüklər</th>
                                <th style={{ width: '150px' }}>Əməliyyatlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <i className={`fas fa-${service.iconName || 'shield-alt'} mr-2 text-primary`}></i>
                                            <span className="font-weight-bold">{service.title}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {service.description}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-info">{service.benefits?.length || 0} Üstünlük</span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(service)} className="btn btn-sm btn-info mr-1">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="btn btn-sm btn-danger">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {editingId ? 'Xidməti Redaktə Et' : 'Yeni Xidmət Əlavə Et'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Xidmət Adı</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: Vergi Xidmətləri"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">İkon</label>
                                    <select
                                        value={formData.iconName}
                                        onChange={e => setFormData({ ...formData, iconName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium appearance-none"
                                    >
                                        {Object.keys(iconMap).map(name => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Qısa Təsvir</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium resize-none"
                                    placeholder="Xidmət haqqında qısa məlumat..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Tam Məzmun</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Xidmətin detallı izahı..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Üstünlüklər (Hər biri yeni sətirdə)</label>
                                <textarea
                                    rows={3}
                                    value={formData.benefits}
                                    onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium font-mono"
                                    placeholder="- Sürətli xidmət&#10;- Dəqiq hesabatlar"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Standart (Summary)</label>
                                    <input
                                        type="text"
                                        value={formData.summaryStandard}
                                        onChange={e => setFormData({ ...formData, summaryStandard: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: IFRS / ISA COMPLIANT"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Müddət (Summary)</label>
                                    <input
                                        type="text"
                                        value={formData.summaryDuration}
                                        onChange={e => setFormData({ ...formData, summaryDuration: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: LAYİHƏYƏ GÖRƏ"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Xidmət Əhatə Dairəsi (Hər biri yeni sətirdə)</label>
                                <textarea
                                    rows={3}
                                    value={formData.scope}
                                    onChange={e => setFormData({ ...formData, scope: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Məs: Maliyyə auditi&#10;Vergi yoxlaması"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all"
                                >
                                    Ləğv Et
                                </button>
                                <button
                                    type="submit"
                                    className="bg-accent hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-xl shadow-accent/20 transition-all flex items-center gap-2"
                                >
                                    <Check className="h-4 w-4" />
                                    {editingId ? 'Yadda Saxla' : 'Əlavə Et'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ServicesManager;
