
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, ArrowRight, ShieldCheck, Waves } from 'lucide-react';

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
                success = await register(username, password);
            } else {
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
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="w-full max-w-[440px] px-6 relative z-10">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10 group">
                    <div className="w-16 h-16 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight italic">
                        AZFIN<span className="text-accent not-italic font-light ml-1 text-2xl tracking-widest uppercase">Consulting</span>
                    </h1>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {hasAdmin ? 'Xoş Gəlmisiniz' : 'Sistemi Quraşdırın'}
                        </h2>
                        <p className="text-slate-400 text-sm font-medium">
                            {hasAdmin ? 'Daxil olmaq üçün məlumatlarınızı daxil edin.' : 'İlk admin hesabınızı yaradaraq idarəetməyə başlayın.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">İstifadəçi Adı</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl text-sm font-medium focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-slate-600"
                                    placeholder="admin_user"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Şifrə</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl text-sm font-medium focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-primary-medium hover:from-primary-medium hover:to-accent text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                        >
                            {hasAdmin ? 'Giriş Et' : 'Hesabı Yarat'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        © 2024 AZFIN CONSULTING • ADMIN PANEL
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
