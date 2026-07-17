import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  CheckSquare, 
  FileText, 
  BookOpen, 
  Award, 
  CreditCard, 
  Calendar, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { User, StudentProfile } from '../../types';

interface StudentLayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  studentProfile: StudentProfile | null;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function StudentLayout({ 
  children, 
  currentUser, 
  studentProfile,
  onLogout, 
  activeTab, 
  setActiveTab 
}: StudentLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', name: 'Student Overview', icon: LayoutDashboard },
    { id: 'attendance', name: 'My Attendance', icon: CheckSquare },
    { id: 'assignments', name: 'My Assignments', icon: FileText },
    { id: 'notes', name: 'Study Materials', icon: BookOpen },
    { id: 'results', name: 'Academic Results', icon: Award },
    { id: 'fees', name: 'My Fees Log', icon: CreditCard },
    { id: 'timetable', name: 'Class Timetable', icon: Calendar },
    { id: 'notifications', name: 'Announcements', icon: Bell },
    { id: 'profile', name: 'My Profile', icon: UserIcon }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-68 bg-slate-900 text-slate-400 border-r border-slate-800 flex-shrink-0">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight block leading-none">Tuition Diary</span>
              <span className="text-[9px] text-teal-400 font-mono tracking-wider uppercase">Student Portal</span>
            </div>
          </Link>
        </div>

        {/* Student Profile Card */}
        <div className="px-4 py-4 border-b border-slate-800 bg-slate-900/50 flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <img 
              src={currentUser?.photo || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentUser?.name || '')}`} 
              alt="Student" 
              className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-500/30"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{currentUser?.name || 'Student'}</p>
              <span className="inline-flex items-center text-[10px] bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded-md font-mono mt-0.5">
                {studentProfile?.roll_no || 'TD-STUDENT'}
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 font-medium pl-1 flex flex-col space-y-0.5">
            <span>Class: {studentProfile?.class || 'N/A'}</span>
            <span className="truncate">Batch: {studentProfile?.batch || 'N/A'}</span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className={`mr-3 h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-xs font-medium rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 flex-shrink-0">
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <h2 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
              <span>My Portal</span>
              <span className="text-slate-300 font-normal">/</span>
              <span className="text-indigo-600 capitalize">{activeTab.replace('-', ' ')}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end text-right font-mono text-[10px] text-slate-500">
              <span>Connected to Tuition Center</span>
              <span>UTC: {new Date().toISOString().split('T')[0]}</span>
            </div>

            {/* Quick Link to Home */}
            <Link 
              to="/" 
              className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3 py-1.5 rounded-lg text-slate-600 transition-all font-medium"
            >
              View Public Website
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Sidebar menu */}
            <div className="relative flex flex-col w-64 max-w-xs bg-slate-900 text-slate-400">
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Brand Header */}
              <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white leading-none block">Tuition Diary</span>
                    <span className="text-[9px] text-teal-400 font-mono tracking-wider">Student Portal</span>
                  </div>
                </div>
              </div>

              {/* Student Profile */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center space-x-3">
                  <img 
                    src={currentUser?.photo || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentUser?.name || '')}`} 
                    alt="Student" 
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white truncate">{currentUser?.name || 'Student'}</p>
                    <span className="text-[9px] text-teal-400 font-mono">{studentProfile?.roll_no || 'TD-STUDENT'}</span>
                  </div>
                </div>
              </div>

              {/* Menu Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/40">
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Work Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50">
          {children}
        </main>

      </div>
    </div>
  );
}
