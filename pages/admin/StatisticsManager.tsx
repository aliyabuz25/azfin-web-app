
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { iconMap } from '../../utils/icons';

const StatisticsManager: React.FC = () => {
    const { statistics, addStatistic, updateStatistic, deleteStatistic } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        label: '',
        value: '',
        iconName: 'Award'
    });

    const handleEdit = (stat: any) => {
        setEditingId(stat.id);
        setFormData({
            label: stat.label,
            value: stat.value,
            iconName: stat.iconName || 'Award'
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bu statistikanı silmək istədiyinizə əminsiniz?')) {
            deleteStatistic(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            label: '',
            value: '',
            iconName: 'Award'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateStatistic(editingId, formData);
        } else {
            addStatistic(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="Statistikalar"
            actions={
                <button onClick={handleAddNew} className="btn btn-primary btn-sm">
                    <i className="fas fa-plus mr-1"></i> Yeni Statistika
                </button>
            }
        >
            <div className="row">
                {statistics.map((stat) => (
                    <div key={stat.id} className="col-12 col-sm-6 col-md-3">
                        <div className="info-box shadow-sm mb-4">
                            <span className="info-box-icon bg-info elevation-1">
                                <i className={`fas fa-${stat.iconName || 'award'}`}></i>
                            </span>
                            <div className="info-box-content">
                                <span className="info-box-text">{stat.label}</span>
                                <span className="info-box-number">{stat.value}</span>
                                <div className="mt-2">
                                    <button onClick={() => handleEdit(stat)} className="btn btn-xs btn-outline-info mr-1">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => handleDelete(stat.id)} className="btn btn-xs btn-outline-danger">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {editingId ? 'Statistikanı Redaktə Et' : 'Yeni Statistika Əlavə Et'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Dəyər (Məs: 850+)</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.value}
                                        onChange={e => setFormData({ ...formData, value: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: 850+"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Etiket (Başlıq)</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.label}
                                        onChange={e => setFormData({ ...formData, label: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: Uğurlu Audit"
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

export default StatisticsManager;
