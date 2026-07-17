import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  Calendar, 
  CheckCircle, 
  ShieldCheck, 
  Download, 
  Sparkles,
  Users,
  Clock
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const statistics = [
    { value: '150+', label: 'Active Students' },
    { value: '98.5%', label: 'Board Exam Success Rate' },
    { value: '12+', label: 'Professional Tutors' },
    { value: '1,500+', label: 'Study Notes & PDF Material' }
  ];

  const highlights = [
    {
      title: 'Structured Batches',
      desc: 'Small batch sizes customized for individual attention and active doubt clearance.',
      icon: Users,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Durable Resources',
      desc: 'Download high-quality chapter study notes, revision booklets, and assignment logs anytime.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Digital Grades Tracker',
      desc: 'Real-time grade charts, subject performance reports, and regular progress evaluations.',
      icon: Award,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Online Attendance & Timetable',
      desc: 'Never miss a session with real-time timetable calendars and automatic attendance check-ins.',
      icon: Calendar,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <span className="inline-flex items-center space-x-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="h-3 w-3" />
                <span>The All-In-One Academic Assistant</span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-none mb-6">
                Achieve Academic Excellence with <span className="text-indigo-600">Tuition Diary</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8">
                A modern hub for private tuition management. From homework calendars and study downloads to automated attendance and fees logs, we help student-tutor collaborations flourish.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-100 cursor-pointer"
                >
                  <span>Access Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-6 py-3.5 rounded-xl transition-all"
                >
                  <span>Explore Courses</span>
                </Link>
              </div>

              {/* Badges/Trust elements */}
              <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                  <CheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                  <span>Google Sign-In</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Supabase Secure</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 text-xs font-medium">
                  <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <span>Real-Time Notifications</span>
                </div>
              </div>

            </div>

            {/* Right Media Column */}
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                {/* Decorative gradients */}
                <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl" />
                
                {/* Main Hero Image */}
                <div className="relative bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students learning together"
                    className="rounded-xl w-full h-[320px] sm:h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Absolute Stat Pill overlay */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-lg max-w-[200px] flex items-center space-x-3">
                    <div className="bg-emerald-500 text-white p-2 rounded-lg">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-none">Top Grades</h4>
                      <p className="text-[10px] text-slate-500 mt-1">98% students improved board results!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-indigo-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-indigo-200">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights / Features Section */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3">Tuition Highlights</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Structured For Dynamic Success</h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Discover a robust feature set engineered to simplify class scheduling, homework logging, grade analysis, and notification alerts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3 rounded-xl inline-block ${item.color} mb-5`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Information Callout */}
      <section className="bg-slate-100 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Connect Google Classroom, Auth, and Supabase Directly
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Our system utilizes Supabase Row-Level Security (RLS) to keep data shielded. Students have a streamlined viewport showing only their records, while Administrators enjoy access to full analytics, attendance lists, courses, and grading controls.
            </p>
            <ul className="space-y-3 text-xs text-slate-600 font-medium mb-8">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                <span>Google OAuth Login and instant Session Authorization</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                <span>Supabase PostgreSQL storage with instant real-time sync</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                <span>Secure Storage buckets to organize notes and study material files</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Demo User Profiles</h4>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-mono font-semibold">Ready to Test</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                You can try the full system in the live preview right away! Choose a demo role to test out all functionalities:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Admin/Tutor Dashboard</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">admin@gmail.com</p>
                  </div>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                  >
                    Quick Log
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Student Dashboard</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">vprasad102938@gmail.com</p>
                  </div>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                  >
                    Quick Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-indigo-600 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Take the Hassle Out of Tuition Tracking</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto text-sm sm:text-base mb-8">
            Start managing schedules, tracking payments, organizing notes, and analyzing students' results from one centralized academic dashboard.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-white hover:bg-slate-100 text-indigo-700 text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg"
          >
            Access Dashboard Now
          </button>
        </div>
      </section>

    </div>
  );
}
