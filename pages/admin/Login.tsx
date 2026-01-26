
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register, hasAdmin, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/services');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Zəhmət olmasa bütün xanaları doldurun');
            return;
        }

        try {
            let success;
            if (!hasAdmin) {
                // First time setup - Register
                success = await register(username, password);
            } else {
                // Login
                success = await login(username, password);
            }

            if (success) {
                navigate('/admin/services');
            } else {
                setError('İstifadəçi adı və ya şifrə yanlışdır');
            }
        } catch (err) {
            setError('Xəta baş verdi');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-emerald-400"></div>

                <div className="p-8 pt-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                        <ShieldCheck className="h-8 w-8 text-accent" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
                        {hasAdmin ? 'Admin Paneli Giriş' : 'Admin Hesabı Yarat'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        {hasAdmin ? 'Davam etmək üçün hesabınıza daxil olun' : 'Sistemi idarə etmək üçün ilk admin hesabını yaradın'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-5">
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">İstifadəçi Adı</label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-medium text-slate-800 transition-all"
                                placeholder="Admin istifadəçi adı"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Şifrə</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-medium text-slate-800 transition-all"
                                placeholder="********"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-4"
                    >
                        {hasAdmin ? 'Giriş Et' : 'Hesabı Yarat'}
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </form>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">© 2024 Azfin Consulting Admin Panel</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
