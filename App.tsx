
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Public Components
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

// Admin Components
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import BlogManager from './pages/admin/BlogManager';
import AcademyManager from './pages/admin/AcademyManager';
import AboutManager from './pages/admin/AboutManager';
import ContactManager from './pages/admin/ContactManager';
import ApplicationsManager from './pages/admin/ApplicationsManager';
import SettingsManager from './pages/admin/SettingsManager';
import StatisticsManager from './pages/admin/StatisticsManager';
import ProcessManager from './pages/admin/ProcessManager';
import UsersManager from './pages/admin/UsersManager';
import LabelsManager from './pages/admin/LabelsManager';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans text-gray-800 antialiased selection:bg-accent selection:text-white">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />
              <Route path="/admin/blogs" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
              <Route path="/admin/academy" element={<ProtectedRoute><AcademyManager /></ProtectedRoute>} />
              <Route path="/admin/about" element={<ProtectedRoute><AboutManager /></ProtectedRoute>} />
              <Route path="/admin/contact" element={<ProtectedRoute><ContactManager /></ProtectedRoute>} />
              <Route path="/admin/applications" element={<ProtectedRoute><ApplicationsManager /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
              <Route path="/admin/statistics" element={<ProtectedRoute><StatisticsManager /></ProtectedRoute>} />
              <Route path="/admin/process" element={<ProtectedRoute><ProcessManager /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><UsersManager /></ProtectedRoute>} />
              <Route path="/admin/labels" element={<ProtectedRoute><LabelsManager /></ProtectedRoute>} />

              {/* Public Routes */}
              <Route path="*" element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/services/:id" element={<ServiceDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route path="/academy" element={<Academy />} />
                      <Route path="/academy/:id" element={<TrainingDetail />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                  <FloatingContact />
                </>
              } />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
