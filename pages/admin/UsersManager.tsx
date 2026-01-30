
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/Layout';
import { useAuth, User } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Check, Shield, User as UserIcon, Lock } from 'lucide-react';

const UsersManager: React.FC = () => {
    const { users, user: currentUser, addUser, updateUser, deleteUser } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'editor' as 'admin' | 'editor'
    });

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setFormData({
            username: user.username,
            password: '', // Don't show password
            role: user.role
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string, username: string) => {
        if (currentUser?.id === id) {
            alert('Öz hesabınızı silə bilməzsiniz!');
            return;
        }
        if (window.confirm(`${username} istifadəçisini silmək istədiyinizə əminsiniz?`)) {
            deleteUser(id);
        }
    };

    const handleAddNew = () => {
        setEditingId(null);
        setFormData({
            username: '',
            password: '',
            role: 'editor'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            const updateData: Partial<User> = {
                username: formData.username,
                role: formData.role
            };
            if (formData.password) updateData.password = formData.password;
            updateUser(editingId, updateData);
        } else {
            if (!formData.password) {
                alert('Yeni istifadəçi üçün şifrə tələb olunur!');
                return;
            }
            addUser(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <AdminLayout
            title="İstifadəçilərin İdarə Edilməsi"
            actions={
                <button onClick={handleAddNew} className="bg-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-accent/20">
                    <Plus className="h-4 w-4" /> Yeni İstifadəçi
                </button>
            }
        >
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">İstifadəçi</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Rol</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Son Giriş</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Əməliyyatlar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                            <UserIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-800">{u.username}</div>
                                            {currentUser?.id === u.id && <span className="text-[10px] text-accent font-bold uppercase">(Siz)</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                        <Shield className="h-3 w-3" />
                                        {u.role === 'admin' ? 'Admin' : 'Editor'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                    {u.lastLogin ? new Date(u.lastLogin).toLocaleString('az-AZ') : 'Giriş edilməyib'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(u)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        {currentUser?.id !== u.id && (
                                            <button onClick={() => handleDelete(u.id, u.username)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                {editingId ? 'İstifadəçini Redaktə Et' : 'Yeni İstifadəçi'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">İstifadəçi Adı</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">
                                    {editingId ? 'Yeni Şifrə (boş qalsa dəyişməz)' : 'Şifrə'}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                                    <input
                                        required={!editingId}
                                        type="password"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase">Rol</label>
                                <select
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value as 'admin' | 'editor' })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm font-medium"
                                >
                                    <option value="admin">Admin (Tam Səlahiyyət)</option>
                                    <option value="editor">Editor (Yalnız Məzmun)</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-lg font-bold text-sm text-slate-500 hover:bg-slate-100 transition-all">Ləğv Et</button>
                                <button type="submit" className="bg-accent hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-xl shadow-accent/20 transition-all flex items-center gap-2">
                                    <Check className="h-4 w-4" /> {editingId ? 'Yadda Saxla' : 'Yarat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UsersManager;
