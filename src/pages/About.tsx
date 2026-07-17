import React from 'react';
import { ShieldCheck, Target, Heart, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Academic Focus',
      desc: 'Our target is to build clear conceptual roots rather than rote-learning.',
      icon: Target,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Individual Pacing',
      desc: 'No student is left behind; our batches respect the learning speed of each learner.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Verified Results',
      desc: 'We map achievements dynamically with regular online exams, reports, and grades logs.',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Our Vision</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Dedicated To Modern Learning</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Tuition Diary was created with a singular purpose: to bridge the operational gap between tutors, private classes, and students. By combining direct student profiles with notes repositories, attendance systems, and result analysis sheets, we render education smooth and organized.
          </p>
        </div>

        {/* Narrative & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              A Safe, Modern, Structured Classroom Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We started as a local math-tutor-circle and quickly realized that managing papers, handwritten attendance registers, offline fee receipts, and printed assignments was taking hours of valuable teaching time away.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Tuition Diary digitizes this pipeline seamlessly. Built as a fully responsive Web Application integrated with Google Auth and Supabase storage, tutors can upload a study note, enter student marks, or update fee columns in seconds, while students receive instant portal access.
            </p>
            <div className="p-4 bg-white rounded-xl border border-slate-200/80 flex items-start space-x-3 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Row-Level Security Guaranteed</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                  Your personal logs, phone numbers, and exam scores are protected. Students can only log in and see their own profile, attendance files, and notes.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800"
                alt="Classroom lesson"
                className="relative rounded-2xl shadow-lg border border-slate-200/60 object-cover w-full h-[320px] sm:h-[360px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-bold text-slate-950 text-center mb-8">Our Guiding Educational Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className={`p-2.5 rounded-lg inline-block ${val.color} mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{val.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
