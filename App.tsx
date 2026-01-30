import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import Academy from './pages/Academy';
import TrainingDetail from './pages/TrainingDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

// Admin Imports
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import BlogManager from './pages/admin/BlogManager';
import AcademyManager from './pages/admin/AcademyManager';
import SettingsManager from './pages/admin/SettingsManager';
import UsersManager from './pages/admin/UsersManager';
import StatisticsManager from './pages/admin/StatisticsManager';
import ProcessManager from './pages/admin/ProcessManager';
import AboutManager from './pages/admin/AboutManager';
import ApplicationsManager from './pages/admin/ApplicationsManager';
import ContactManager from './pages/admin/ContactManager';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col font-sans text-brand-800 antialiased selection:bg-accent selection:text-white">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <FloatingContact />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/services/:id" element={<Layout><ServiceDetail /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} />
            <Route path="/academy" element={<Layout><Academy /></Layout>} />
            <Route path="/academy/:id" element={<Layout><TrainingDetail /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/academy" element={<ProtectedRoute><AcademyManager /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersManager /></ProtectedRoute>} />
            <Route path="/admin/statistics" element={<ProtectedRoute><StatisticsManager /></ProtectedRoute>} />
            <Route path="/admin/process" element={<ProtectedRoute><ProcessManager /></ProtectedRoute>} />
            <Route path="/admin/about" element={<ProtectedRoute><AboutManager /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><ApplicationsManager /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><ContactManager /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
