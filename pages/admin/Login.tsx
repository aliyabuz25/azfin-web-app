
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
        <div className="hold-transition login-page bg-dark">
            <div className="login-box">
                <div className="login-logo">
                    <a href="/" className="text-white"><b>Azfin</b>Consulting</a>
                </div>
                <div className="card card-outline card-primary shadow-lg">
                    <div className="card-header text-center">
                        <h1 className="h4 font-weight-bold text-dark">
                            {hasAdmin ? 'Admin Paneli Giriş' : 'Admin Hesabı Yarat'}
                        </h1>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg text-dark">
                            {hasAdmin ? 'Davam etmək üçün hesabınıza daxil olun' : 'Sistemi idarə etmək üçün ilk admin hesabını yaradın'}
                        </p>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-danger alert-dismissible py-2 mb-3">
                                    <h6 className="m-0"><i className="icon fas fa-ban mr-2"></i> {error}</h6>
                                </div>
                            )}

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    placeholder="Admin istifadəçi adı"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="********"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        {hasAdmin ? 'Giriş Et' : 'Hesabı Yarat'}
                                        <i className="fas fa-sign-in-alt ml-2"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center bg-light">
                        <p className="text-xs text-muted m-0">© 2024 Azfin Consulting Admin Panel</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
