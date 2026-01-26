
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import ImageUpload from '../../components/admin/ImageUpload';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Check, Calendar, Clock, Award } from 'lucide-react';

const AcademyManager: React.FC = () => {
    const { trainings, addTraining, updateTraining, deleteTraining } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        duration: '',
        level: 'Başlanğıc',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
        status: 'upcoming' as const,
        badgeText: 'Peşəkar Sertifikat',
        fullContent: '',
        syllabusTitle: 'Tədris Proqramı',
        syllabus: ''
    });

    const handleEdit = (training: any) => {
        setEditingId(training.id);
        setFormData({
            title: training.title,
            description: training.description,
            startDate: training.startDate,
            duration: training.duration,
            level: training.level,
            image: training.image,
            status: training.status,
            badgeText: training.badgeText || '',
            fullContent: training.fullContent || '',
            syllabusTitle: training.syllabusTitle || 'Tədris Proqramı',
            syllabus: training.syllabus ? training.syllabus.join('\n') : ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bu təlimi silmək istədiyinizə əminsiniz?')) {
            deleteTraining(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            startDate: '',
            duration: '',
            level: 'Başlanğıc',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
            status: 'upcoming',
            badgeText: 'Peşəkar Sertifikat',
            fullContent: '',
            syllabusTitle: 'Tədris Proqramı',
            syllabus: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const syllabusArray = formData.syllabus.split('\n').filter(line => line.trim() !== '');
        const payload = {
            ...formData,
            syllabus: syllabusArray
        };
        if (editingId) {
            updateTraining(editingId, payload);
        } else {
            addTraining(payload);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="Akademiya Təlimləri"
            actions={
                <button onClick={handleAddNew} className="bg-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Plus className="h-4 w-4" /> Yeni Təlim
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainings.map((training) => (
                    <div key={training.id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
                        <div className="h-40 overflow-hidden relative">
                            <img src={training.image} alt={training.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800">
                                {training.status === 'upcoming' ? 'Aktiv' : training.status}
                            </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{training.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                    <Calendar className="h-3 w-3" /> {training.startDate}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                    <Clock className="h-3 w-3" /> {training.duration}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider">{training.level}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(training)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(training.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {editingId ? 'Təlimi Redaktə Et' : 'Yeni Təlim Əlavə Et'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Təlim Adı</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Badge (Məs: Peşəkar Sertifikat)</label>
                                    <input
                                        type="text"
                                        value={formData.badgeText}
                                        onChange={e => setFormData({ ...formData, badgeText: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Boş qoysanız görünməyəcək"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Başlama Tarixi</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: 15 Noyabr 2024"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Müddət</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: 3 ay"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Səviyyə</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.level}
                                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: Başlanğıc və Orta"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    >
                                        <option value="upcoming">Gələcək (upcoming)</option>
                                        <option value="ongoing">Davam edən (ongoing)</option>
                                        <option value="completed">Bitmiş (completed)</option>
                                    </select>
                                </div>
                            </div>

                            <ImageUpload
                                value={formData.image}
                                onChange={url => setFormData({ ...formData, image: url })}
                                label="Təlim Şəkli"
                            />

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Qısa Təsvir (List görünüşü üçün)</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Tam Məzmun (Detallı səhifə üçün)</label>
                                <textarea
                                    rows={4}
                                    value={formData.fullContent}
                                    onChange={e => setFormData({ ...formData, fullContent: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Təlim haqqında detallı məlumat..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Proqram Başlığı (Məs: Tədris Proqramı)</label>
                                <input
                                    type="text"
                                    value={formData.syllabusTitle}
                                    onChange={e => setFormData({ ...formData, syllabusTitle: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Məs: Tədris Proqramı"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Tədris Proqramı (Hər sətirdə bir bənd)</label>
                                <textarea
                                    rows={6}
                                    value={formData.syllabus}
                                    onChange={e => setFormData({ ...formData, syllabus: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Azərbaycan Respublikasının Əmək Məcəlləsi&#10;Əmək müqavilələrinin bağlanması..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all">Ləğv Et</button>
                                <button type="submit" className="bg-accent hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-xl shadow-accent/20 transition-all flex items-center gap-2">
                                    <Check className="h-4 w-4" /> {editingId ? 'Yadda Saxla' : 'Əlavə Et'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AcademyManager;
