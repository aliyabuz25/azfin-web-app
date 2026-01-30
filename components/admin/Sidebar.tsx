
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', label: 'Panel' },
        { path: '/admin/applications', icon: 'fas fa-envelope', label: 'Müraciətlər' },
        { label: 'SƏHİFƏLƏRİ İDARƏ ET', isHeader: true },
        { path: '/admin/settings', icon: 'fas fa-home', label: 'Ana Səhifə' },
        { path: '/admin/about', icon: 'fas fa-info-circle', label: 'Haqqımızda' },
        { path: '/admin/services', icon: 'fas fa-briefcase', label: 'Xidmətlər' },
        { path: '/admin/academy', icon: 'fas fa-graduation-cap', label: 'Akademiya' },
        { path: '/admin/blogs', icon: 'fas fa-newspaper', label: 'Bloq' },
        { path: '/admin/contact', icon: 'fas fa-address-book', label: 'Əlaqə' },
        { label: 'SİSTEM', isHeader: true },
        { path: '/admin/users', icon: 'fas fa-users-cog', label: 'İstifadəçilər' },
    ];

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/admin/dashboard" className="brand-link">
                <span className="brand-text font-weight-light ml-3 text-white font-weight-bold">Azfin Admin</span>
            </Link>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {menuItems.map((item, idx) => {
                            if (item.isHeader) {
                                return (
                                    <li key={idx} className="nav-header">
                                        {item.label}
                                    </li>
                                );
                            }
                            return (
                                <li key={item.path} className="nav-item">
                                    <Link
                                        to={item.path!}
                                        className={`nav-link ${isActive(item.path!) ? 'active' : ''}`}
                                    >
                                        <i className={`nav-icon ${item.icon}`}></i>
                                        <p>{item.label}</p>
                                    </Link>
                                </li>
                            )
                        })}

                        <li className="nav-header">ƏMƏLİYYATLAR</li>
                        <li className="nav-item">
                            <Link to="/" target="_blank" className="nav-link">
                                <i className="nav-icon fas fa-globe"></i>
                                <p>Sayta Keç</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={logout}
                                className="nav-link btn-link text-left w-100 border-0 bg-transparent py-2 px-3 text-white"
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="nav-icon fas fa-sign-out-alt"></i>
                                <p>Çıxış</p>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
