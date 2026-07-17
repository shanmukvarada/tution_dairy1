import React from 'react';
import { Mail, GraduationCap, Award } from 'lucide-react';

export default function Faculty() {
  const tutors = [
    {
      name: 'Mrs. Sarah Jenkins',
      role: 'Head Tutor & Founder',
      subjects: 'Mathematics & Advanced Calculus',
      degree: 'M.Sc. in Applied Mathematics (Boston University)',
      experience: '12+ Years teaching high school & college entrance syllabi.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Dr. Alistair Vance',
      role: 'Senior Faculty',
      subjects: 'Physics & Thermochemistry',
      degree: 'Ph.D. in Physical Chemistry (Stanford University)',
      experience: '8+ Years researching and coaching senior board candidates.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    {
      name: 'Miss Clara Lindqvist',
      role: 'Associate Faculty',
      subjects: 'Biological Sciences & Foundations',
      degree: 'B.Sc. in Molecular Biology (Uppsala University)',
      experience: '5+ Years crafting visual slide notes, worksheets, and lab setups.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Our Instructors</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Meet the Expert Educators</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Our tuition team consists of highly qualified, patient educators dedicated to mentoring children, hosting regular doubt-clearing sessions, and building confidence.
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutors.map((tutor, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Tutor Photo */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{tutor.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">{tutor.role}</p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                    <li className="flex items-start">
                      <GraduationCap className="h-4.5 w-4.5 text-slate-400 mr-2 flex-shrink-0" />
                      <span>{tutor.degree}</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-4.5 w-4.5 text-slate-400 mr-2 flex-shrink-0" />
                      <span>Subjects: <strong className="text-slate-700">{tutor.subjects}</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bio description */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-xs text-slate-500 italic">
                "{tutor.experience}"
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
