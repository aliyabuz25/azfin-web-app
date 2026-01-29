
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
                <button onClick={handleAddNew} className="btn btn-primary btn-sm">
                    <i className="fas fa-plus mr-1"></i> Yeni Yazı
                </button>
            }
        >
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Bloq Siyahısı</h3>
                </div>
                <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>Şəkil</th>
                                <th>Başlıq</th>
                                <th>Kateqoriya</th>
                                <th>Tarix</th>
                                <th style={{ width: '150px' }}>Əməliyyatlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>
                                        <img src={blog.image} alt={blog.title} style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td>
                                        <div className="font-weight-bold" style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {blog.title}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-info">{blog.category}</span>
                                    </td>
                                    <td>
                                        <small className="text-muted">{blog.date}</small>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(blog)} className="btn btn-sm btn-info mr-1">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(blog.id)} className="btn btn-sm btn-danger">
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
