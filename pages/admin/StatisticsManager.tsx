
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
                <button onClick={handleAddNew} className="bg-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Plus className="h-4 w-4" /> Yeni Statistika
                </button>
            }
        >
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
                {statistics.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-slate-50 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(stat)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(stat.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-2xl font-black text-slate-800 mb-1">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    );
                })}
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
