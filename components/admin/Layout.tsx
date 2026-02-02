import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    actions?: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, title, actions }) => {
    useEffect(() => {
        // Add CSS for Admin Panel
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        faLink.id = 'admin-fa-css';
        document.head.appendChild(faLink);

        const lteLink = document.createElement('link');
        lteLink.rel = 'stylesheet';
        lteLink.href = 'https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css';
        lteLink.id = 'admin-lte-css';
        document.head.appendChild(lteLink);

        // Add AdminLTE body classes
        document.body.classList.add('sidebar-mini');
        document.body.classList.add('layout-fixed');

        return () => {
            document.getElementById('admin-fa-css')?.remove();
            document.getElementById('admin-lte-css')?.remove();
            document.body.classList.remove('sidebar-mini');
            document.body.classList.remove('layout-fixed');
        };
    }, []);

    return (
        <div className="wrapper">
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/admin/dashboard" className="nav-link">Home</Link>
                    </li>
                </ul>

                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {actions && (
                        <li className="nav-item">
                            <div className="d-flex align-items-center h-100">
                                {actions}
                            </div>
                        </li>
                    )}
                </ul>
            </nav>

            <Sidebar />

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        {children}
                    </div>
                </section>
            </div>

            <footer className="main-footer">
                <div className="float-right d-none d-sm-block">
                    <b>Version</b> 1.0.0
                </div>
                <strong>&copy; {new Date().getFullYear()} <a href="/">Azfin Consulting</a>.</strong> All rights reserved.
            </footer>
        </div>
    );
};

export default AdminLayout;
