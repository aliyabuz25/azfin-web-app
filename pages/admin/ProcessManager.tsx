
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { iconMap } from '../../utils/icons';

const ProcessManager: React.FC = () => {
    const { processSteps, addProcessStep, updateProcessStep, deleteProcessStep } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        stepNumber: '',
        title: '',
        description: '',
        iconName: 'Search'
    });

    const handleEdit = (step: any) => {
        setEditingId(step.id);
        setFormData({
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description,
            iconName: step.iconName || 'Search'
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bu proses adımını silmək istədiyinizə əminsiniz?')) {
            deleteProcessStep(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            stepNumber: (processSteps.length + 1).toString().padStart(2, '0'),
            title: '',
            description: '',
            iconName: 'Search'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateProcessStep(editingId, formData);
        } else {
            addProcessStep(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="İş Prosesimiz"
            actions={
                <button onClick={handleAddNew} className="bg-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Plus className="h-4 w-4" /> Yeni Addım
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step) => {
                    return (
                        <div key={step.id} className="relative group bg-white p-8 rounded-[30px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-left">
                            <span className="absolute top-4 right-6 text-6xl font-black text-slate-50 group-hover:text-slate-100 transition-colors z-0">{step.stepNumber}</span>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-primary/5 p-3 rounded-xl text-accent">
                                        {step.title.length > 0 && <Check className="h-5 w-5" />}
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(step)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(step.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-primary mb-3 tracking-tight uppercase">{step.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {editingId ? 'Addımı Redaktə Et' : 'Yeni Addım Əlavə Et'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 uppercase">Sıra (Məs: 01)</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.stepNumber}
                                            onChange={e => setFormData({ ...formData, stepNumber: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                            placeholder="01"
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
                                    <label className="text-xs font-bold text-slate-700 uppercase">Başlıq</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: Diaqnostika"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Təsvir</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium resize-none"
                                        placeholder="Məs: Biznesin cari vəziyyətinin dərindən analizi."
                                    />
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

export default ProcessManager;
