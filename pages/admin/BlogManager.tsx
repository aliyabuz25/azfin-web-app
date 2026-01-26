
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import ImageUpload from '../../components/admin/ImageUpload';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const BlogManager: React.FC = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: 'Azfin Ekspert',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
        quote: ''
    });

    const handleEdit = (blog: any) => {
        setEditingId(blog.id);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            author: blog.author,
            image: blog.image,
            quote: blog.quote || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bu bloq yazısını silmək istədiyinizə əminsiniz?')) {
            deleteBlog(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: '',
            author: 'Azfin Ekspert',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
            quote: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            date: new Date().toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })
        };

        if (editingId) {
            updateBlog(editingId, payload);
        } else {
            addBlog(payload);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="Bloq Yazıları"
            actions={
                <button onClick={handleAddNew} className="bg-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Plus className="h-4 w-4" /> Yeni Yazı
                </button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800">
                                {blog.category}
                            </div>
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{blog.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">{blog.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                <span className="text-xs font-bold text-slate-400">{blog.date}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(blog)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
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
                                {editingId ? 'Yazını Redaktə Et' : 'Yeni Yazı Əlavə Et'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Başlıq</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Yazının başlığı"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Kateqoriya</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                        placeholder="Məs: Vergi"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase">Müəllif</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <ImageUpload
                                value={formData.image}
                                onChange={url => setFormData({ ...formData, image: url })}
                                label="Blog Şəkli"
                            />

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Qısa Xülasə</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium resize-none"
                                    placeholder="Yazının qısa məzmunu..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Tam Məzmun</label>
                                <textarea
                                    required
                                    rows={8}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Yazının tam mətni..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Sitat (Quote)</label>
                                <textarea
                                    rows={3}
                                    value={formData.quote}
                                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    placeholder="Yazının içində vurğulanacaq sitat..."
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

export default BlogManager;
