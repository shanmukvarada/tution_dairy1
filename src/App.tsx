import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { dbService } from './services/db';
import { User, StudentProfile } from './types';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import StudentLayout from './components/layouts/StudentLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Protected Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [adminTab, setAdminTab] = useState('overview');
  const [studentTab, setStudentTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const u = dbService.getCurrentUser();
    setCurrentUser(u);
    
    if (u && u.role === 'student') {
      const p = dbService.getStudentByUserId(u.id);
      setStudentProfile(p);
    }
    
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'student') {
      const p = dbService.getStudentByUserId(user.id);
      setStudentProfile(p);
    } else {
      setStudentProfile(null);
    }
  };

  const handleLogout = () => {
    dbService.setCurrentUser(null);
    setCurrentUser(null);
    setStudentProfile(null);
    setAdminTab('overview');
    setStudentTab('overview');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Loading Tuition Diary...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* PUBLIC PAGES PATHS */}
        <Route
          path="/"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <Courses />
            </PublicLayout>
          }
        />
        <Route
          path="/faculty"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <Faculty />
            </PublicLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <Gallery />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout currentUser={currentUser} onLogout={handleLogout}>
              {currentUser ? (
                currentUser.role === 'admin' ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/student/dashboard" replace />
                )
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )}
            </PublicLayout>
          }
        />

        {/* ADMIN WORKSPACE PROTECTED */}
        <Route
          path="/admin/dashboard"
          element={
            currentUser && currentUser.role === 'admin' ? (
              <AdminLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                activeTab={adminTab}
                setActiveTab={setAdminTab}
              >
                <AdminDashboard currentUser={currentUser} activeTab={adminTab} />
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* STUDENT WORKSPACE PROTECTED */}
        <Route
          path="/student/dashboard"
          element={
            currentUser && currentUser.role === 'student' ? (
              <StudentLayout
                currentUser={currentUser}
                studentProfile={studentProfile}
                onLogout={handleLogout}
                activeTab={studentTab}
                setActiveTab={setStudentTab}
              >
                <StudentDashboard currentUser={currentUser} activeTab={studentTab} />
              </StudentLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CATCH-ALL ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
