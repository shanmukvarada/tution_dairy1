import React, { useState } from 'react';
import { dbService } from '../services/db';
import { BookOpen, Clock, CreditCard, Send, CheckCircle2 } from 'lucide-react';

export default function Courses() {
  const courses = dbService.getCourses();
  const [inquirySent, setInquirySent] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', courseId: '' });

  const handleSendInquiry = (courseName: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setInquirySent(courseName);
    setTimeout(() => {
      setInquirySent(null);
      setFormData({ name: '', email: '', courseId: '' });
    }, 4000);
  };

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Curriculum Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Active Tuition Batches</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Our tuition programs focus on clear conceptual learning, board exam strategies, and continuous practice worksheets. Review schedules, hours, and fee details below.
          </p>
        </div>

        {/* Main Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {courses.map((course: any) => (
            <div 
              key={course.id} 
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{course.name}</h3>
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full font-mono">
                    Active Batch
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {course.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3.5">
                <div className="flex items-center text-xs text-slate-600 font-medium">
                  <Clock className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span>Duration: <strong className="text-slate-800">{course.hours}</strong></span>
                </div>
                <div className="flex items-center text-xs text-slate-600 font-medium">
                  <CreditCard className="h-4 w-4 text-slate-400 mr-2.5 flex-shrink-0" />
                  <span>Tuition Fee: <strong className="text-indigo-600">${course.fee} / month</strong></span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setFormData({ ...formData, courseId: course.id })}
                    className="w-full text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Send Enrollment Inquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollment Inquiry Form */}
        {formData.courseId && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg relative">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
              <BookOpen className="h-4.5 w-4.5 text-indigo-600 mr-2" />
              <span>Inquire for {courses.find((c: any) => c.id === formData.courseId)?.name}</span>
            </h3>

            {inquirySent ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold">Inquiry Sent Successfully!</p>
                <p className="text-[10px] leading-relaxed">
                  Thank you. Tutors will reach out to you at {formData.email} regarding the {inquirySent} schedule soon.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => handleSendInquiry(courses.find((c: any) => c.id === formData.courseId)?.name || '', e)} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@gmail.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ name: '', email: '', courseId: '' })}
                    className="w-1/2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 inline-flex items-center justify-center space-x-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100"
                  >
                    <Send className="h-3 w-3" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
