import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Connect with Tutors</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Reach Out to Tuition Diary</h1>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed">
            Have questions about tuition batches, monthly rates, notes, or grading timelines? Shoot us a message or call us directly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Our Academic Center</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tutors are generally present at the center from 15:30 to 20:30 on weekdays, and 09:00 to 13:00 on Saturdays. Stop by anytime for direct curriculum consultation or counseling.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-600 mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Center Address</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    104 Academic Avenue, Education Plaza, Suite 4B<br />
                    Boston, MA 02116
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-600 mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Phone Support</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">+1 (555) 880-LEARN</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-rose-50 p-2.5 rounded-lg text-rose-600 mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Correspondence</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">support@tuitiondiary.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Send an Online Message</h3>

            {sent ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="h-9 w-9 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold">Message Received!</h4>
                <p className="text-[10px] leading-relaxed">
                  Thank you, {formData.name}. We have logged your request. Our administration team will respond to {formData.email} in less than 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
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
                      placeholder="jane@gmail.com"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Batch timings query, pricing..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-100"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="text-xs">Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
