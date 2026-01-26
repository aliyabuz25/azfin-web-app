
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    actions?: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, title, actions }) => {
    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar />
            <div className="flex-1 overflow-auto h-screen">
                <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 shadow-sm flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
                    </div>
                    {actions && <div className="flex gap-3">{actions}</div>}
                </header>
                <main className="p-8 pb-20">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
