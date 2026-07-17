import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, LogIn, GraduationCap, Check } from 'lucide-react';
import { User } from '../../types';

interface PublicLayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  onLogout: () => void;
}

export default function PublicLayout({ children, currentUser, onLogout }: PublicLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleDashboardRedirect = () => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        🌟 Transforming education with personalized guidance. New batches starting August 2026!
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-200">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 tracking-tight block leading-none">Tuition Diary</span>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Learning Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDashboardRedirect}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-100"
                  >
                    {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}
                  </button>
                  <button
                    onClick={onLogout}
                    className="text-slate-500 hover:text-slate-800 text-xs font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleDashboardRedirect();
                    }}
                    className="w-full bg-indigo-600 text-white text-center py-2.5 rounded-xl font-semibold text-sm shadow-md"
                  >
                    {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-center py-2.5 rounded-xl font-medium text-sm transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 text-white text-center py-2.5 rounded-xl font-semibold text-sm shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Stage */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-indigo-600 text-white p-2 rounded-xl">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Tuition Diary</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              A comprehensive student tuition log, calendar, study materials hub, and grades diary designed for modern personalized education.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-all">Home Hub</Link></li>
              <li><Link to="/about" className="hover:text-white transition-all">About Our Center</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-all">Syllabus & Courses</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-all">Get in Touch</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support & Config</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-indigo-400">● Live Preview Active</span></li>
              <li><span className="text-emerald-400">✓ Supabase Enabled (Local Fallback)</span></li>
              <li><Link to="/login" className="hover:text-white transition-all">Admin Credentials & Demo Login</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-1">Contact Details</h4>
            <p>📍 104 Academic Avenue, Education Plaza, Suite 4B</p>
            <p>📞 +1 (555) 880-LEARN</p>
            <p>✉️ support@tuitiondiary.com</p>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Tuition Diary Hub. Built with React, Tailwind CSS, and Supabase PostgreSQL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
