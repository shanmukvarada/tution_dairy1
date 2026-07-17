import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { User } from '../types';
import { GraduationCap, Sparkles, Mail, ShieldAlert } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    {
      name: 'Mrs. Sarah Jenkins',
      email: 'admin@gmail.com',
      role: 'admin',
      desc: 'Tutor / Admin Access',
      color: 'border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/20'
    },
    {
      name: 'Vikas Prasad',
      email: 'vprasad102938@gmail.com',
      role: 'student',
      desc: 'Student Access (Roll TD2026-001)',
      color: 'border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/20'
    }
  ];

  const handleDemoClick = (email: string) => {
    setLoading(true);
    setTimeout(() => {
      const user = dbService.loginAs(email);
      setLoading(false);
      if (user) {
        onLoginSuccess(user);
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setLoading(true);
    
    setTimeout(() => {
      const name = nameInput || emailInput.split('@')[0].replace('.', ' ');
      const user = dbService.registerAndLoginGoogle(emailInput, name);
      setLoading(false);
      onLoginSuccess(user);
      
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
        
        {/* Decorative corner flash */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-10 -mt-10 blur-xl" />

        {/* Title Hub */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-slate-900 tracking-tight">Sign In to Tuition Diary</h2>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            Continue using secure authentication methods.
          </p>
        </div>

        {/* Main Google Trigger */}
        <div className="space-y-4 pt-4">
          <button
            onClick={() => setShowGooglePrompt(true)}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 border border-slate-300 rounded-xl transition-all shadow-sm focus:outline-none cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-xs">Continue with Google</span>
          </button>
        </div>

        {/* OR Spacer */}
        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Demo Portal Entries
          </span>
        </div>

        {/* Demo Accounts List */}
        <div className="grid grid-cols-1 gap-3">
          {demoAccounts.map((account, idx) => (
            <button
              key={idx}
              onClick={() => handleDemoClick(account.email)}
              disabled={loading}
              className={`flex items-start text-left p-3 border rounded-xl transition-all ${account.color} cursor-pointer`}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800 leading-none">{account.name}</p>
                  <span className={`text-[9px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full ${
                    account.role === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {account.role}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-1.5">{account.email}</p>
                <p className="text-[9px] text-slate-400 mt-1">{account.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Input Google Simulation Prompt Modal */}
        {showGooglePrompt && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative">
              
              <div className="text-center mb-5">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Google Authentication</h3>
                <p className="text-[10px] text-slate-500 mt-1">
                  Type any email to simulate Google single sign-on.
                </p>
              </div>

              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. custom_student@gmail.com"
                      className="w-full text-xs pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <Mail className="absolute left-2.5 top-3.5 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start space-x-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[9px] text-slate-500 leading-normal">
                    <strong>Rule:</strong> Emails containing <code>admin</code> gain complete tutor tools. Other emails register as a standard student profile.
                  </p>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGooglePrompt(false)}
                    className="w-1/2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow-md"
                  >
                    Simulate Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
