import React, { useState, useEffect } from 'react';
import { dbService } from '../../services/db';
import { 
  User, 
  StudentProfile, 
  Attendance, 
  FeeRecord, 
  Assignment, 
  Note, 
  Result, 
  Announcement,
  TimetableEntry
} from '../../types';
import { 
  BookOpen, 
  CheckSquare, 
  FileText, 
  Award, 
  CreditCard, 
  Calendar, 
  Bell, 
  User as UserIcon, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard as PayIcon,
  Check
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User | null;
  activeTab: string;
}

export default function StudentDashboard({ currentUser, activeTab }: StudentDashboardProps) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Simulation states
  const [isPaying, setIsPaying] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [downloadingNote, setDownloadingNote] = useState<string | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    phone: '',
    class: 'Grade 10',
    batch: 'Evening Batch A (Maths & Science)'
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Load Data
  const reloadData = () => {
    if (!currentUser) return;
    
    // Find matching student profile
    const currentStud = dbService.getStudentByUserId(currentUser.id);
    setProfile(currentStud);

    if (currentStud) {
      setAttendance(dbService.getAttendanceForStudent(currentStud.id));
      setResults(dbService.getResultsForStudent(currentStud.id));
      setFees(dbService.getFeesForStudent(currentStud.id));
      
      setProfileForm({
        phone: currentStud.phone,
        class: currentStud.class,
        batch: currentStud.batch
      });
    }

    setAssignments(dbService.getAssignments());
    setNotes(dbService.getNotes());
    setTimetable(dbService.getTimetable());
    setAnnouncements(dbService.getAnnouncements());
  };

  useEffect(() => {
    reloadData();
  }, [currentUser, activeTab]);

  // Calculations
  const totalClasses = attendance.length;
  const presentClasses = attendance.filter(a => a.status === 'Present').length;
  const attendanceRate = totalClasses ? Math.round((presentClasses / totalClasses) * 100) : 100;

  const pendingInvoices = fees.filter(f => f.status === 'Pending');
  const outstandingAmount = pendingInvoices.reduce((sum, item) => sum + item.amount, 0);

  const latestAssignment = assignments[0] || null;
  const latestResult = results[results.length - 1] || null;

  // Handle Payment Simulation
  const triggerPayment = (feeId: string) => {
    setIsPaying(feeId);
  };

  const executePaymentSimulation = (feeId: string) => {
    setIsPaying(null);
    setPaymentSuccess(true);
    dbService.updateFeeStatus(feeId, 'Paid');
    setTimeout(() => {
      setPaymentSuccess(false);
      reloadData();
    }, 3000);
  };

  // Handle Note Download simulation
  const triggerDownload = (noteId: string) => {
    setDownloadingNote(noteId);
    setTimeout(() => {
      setDownloadingNote(null);
      alert('Note PDF downloaded successfully!');
    }, 1500);
  };

  // Handle Profile Update
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    dbService.editStudent(profile.id, {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      roll_no: profile.roll_no,
      class: profileForm.class,
      batch: profileForm.batch,
      phone: profileForm.phone
    });

    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
    reloadData();
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Attendance Rate</span>
                <span className="text-xl font-bold text-slate-900">{attendanceRate}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Pending Fees</span>
                <span className="text-xl font-bold text-rose-600">${outstandingAmount}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Assignments</span>
                <span className="text-xl font-bold text-indigo-600">{assignments.length} Total</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Recent Grade</span>
                <span className="text-xl font-bold text-emerald-600">{latestResult ? latestResult.grade : 'N/A'}</span>
              </div>
            </div>

          </div>

          {/* Detailed Row Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Class Timetable Overview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                <Calendar className="h-4.5 w-4.5 mr-2 text-indigo-600" />
                <span>My Weekly Classes Timetable</span>
              </h3>
              
              <div className="space-y-3">
                {timetable.slice(0, 3).map((slot) => (
                  <div key={slot.id} className="flex justify-between items-center p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{slot.subject}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{slot.time} | {slot.room}</p>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {slot.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices & Quick payment simulator */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Outstanding Tuition Invoice</h3>
                
                {paymentSuccess && (
                  <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center space-y-1 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold">Simulator Payment Complete!</p>
                    <p className="text-[10px]">Your fee ledger has been updated instantly.</p>
                  </div>
                )}

                {pendingInvoices.length > 0 ? (
                  <div className="space-y-3">
                    {pendingInvoices.map(fee => (
                      <div key={fee.id} className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-800">Monthly Tuition Tuition Fee</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Due date: {fee.due_date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-rose-600 font-mono">${fee.amount}</p>
                          <button
                            onClick={() => triggerPayment(fee.id)}
                            className="text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg mt-2 transition-all cursor-pointer"
                          >
                            Pay Simulator
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-slate-800">Your ledger is clear!</p>
                    <p className="text-[10px] text-slate-500">All tuition fee invoices are fully paid.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Row: Homework and Bulletin */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Homework Handout */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Next Handout Homework</h3>
              {latestAssignment ? (
                <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">{latestAssignment.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{latestAssignment.description}</p>
                  <p className="text-[10px] text-indigo-700 font-mono font-bold">Submit by: {latestAssignment.due_date}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No pending assignments listed.</p>
              )}
            </div>

            {/* Bulletin Board announcements */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Academic Bulletin Board</h3>
              <div className="space-y-3">
                {announcements.slice(0, 2).map((ann) => (
                  <div key={ann.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                    <div className="bg-amber-100 p-1.5 rounded-lg text-amber-700 flex-shrink-0 mt-0.5">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{ann.title}</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{ann.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Attendance Log View */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-slate-900">My Tuition Attendance History</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Check your presence timeline log updated daily by tutors.</p>
          </div>

          <div className="space-y-3">
            {attendance.slice().reverse().map((att) => (
              <div key={att.id} className="flex items-center justify-between p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                <span className="text-xs font-bold text-slate-700 font-mono">{att.date}</span>
                <span className={`text-[10px] font-bold uppercase font-mono px-3 py-1 rounded-full ${
                  att.status === 'Present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {att.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assignments Handout View */}
      {activeTab === 'assignments' && (
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tuition Assignments Handouts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map(asg => (
              <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5">{asg.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{asg.description}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-indigo-600 font-bold">Due Date: {asg.due_date}</span>
                  <span className="text-slate-400">Created: {new Date(asg.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Materials Tab */}
      {activeTab === 'notes' && (
        <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Chapter Revision Notes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map(note => (
              <div key={note.id} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{note.title}</h4>
                  <span className="inline-block text-[9px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold font-mono mt-1">
                    {note.subject}
                  </span>
                </div>

                <button
                  onClick={() => triggerDownload(note.id)}
                  className="inline-flex items-center space-x-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Results Tab */}
      {activeTab === 'results' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Academic Score Diary</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Your subject marks and grade evaluations recorded by Mrs. Sarah Jenkins.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Subject / Evaluation</th>
                  <th className="px-5 py-3">Score obtained</th>
                  <th className="px-5 py-3 text-right">Grade Card</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {results.map((res) => (
                  <tr key={res.id}>
                    <td className="px-5 py-3.5 font-bold text-slate-900">{res.subject}</td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-slate-600">
                      {res.marks} / {res.total_marks}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold font-mono px-3 py-0.5 rounded-lg">
                        {res.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fees ledger tab */}
      {activeTab === 'fees' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Tuition Fees Ledger</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Timeline track of monthly invoices issued and status.</p>
          </div>

          {paymentSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-center space-y-1">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold">Simulator Payment Complete!</p>
              <p className="text-[10px]">Your fee ledger has been updated instantly.</p>
            </div>
          )}

          <div className="space-y-4">
            {fees.map((fee) => (
              <div key={fee.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-950">Monthly Tuition Tuition</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Invoice Due: {fee.due_date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800 font-mono">${fee.amount}</p>
                    <span className={`inline-block text-[9px] font-mono font-bold uppercase mt-1 px-2 py-0.5 rounded-full ${
                      fee.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {fee.status}
                    </span>
                  </div>
                  {fee.status === 'Pending' && (
                    <button
                      onClick={() => triggerPayment(fee.id)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      Pay Simulator
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Schedule Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Academic Timetable Calendar</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium text-indigo-600">Active Schedule: Summer Batch 2026</p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {timetable.map((slot) => (
              <div key={slot.id} className="flex justify-between items-center p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl">
                <div>
                  <span className="inline-block bg-indigo-50 text-indigo-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5">
                    {slot.day}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{slot.subject}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Tutor: {slot.tutor} | Room: {slot.room}</p>
                </div>
                <p className="text-xs font-mono font-bold text-indigo-600">{slot.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Board Tab */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Posted Bulletins & Notifications</h3>
          
          <div className="space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                  <span className="text-[9px] bg-slate-100 font-mono font-bold text-slate-500 px-2 py-0.5 rounded-full">
                    {ann.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{ann.content}</p>
                <div className="text-[9px] text-slate-400 font-mono">
                  Broadcast: {new Date(ann.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Profile Editor Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto space-y-6 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Student Profile Settings</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Maintain up-to-date phone numbers and schedule streams.</p>
          </div>

          <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100">
            <img 
              src={currentUser?.photo || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentUser?.name || '')}`} 
              alt="" 
              className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/20"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser?.email}</p>
            </div>
          </div>

          {profileSaved && (
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-center text-xs font-bold flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
              <span>Contact details updated instantly!</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">My Class (Grade)</label>
              <select
                value={profileForm.class}
                onChange={(e) => setProfileForm({ ...profileForm, class: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
              >
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">My Active Batch Schedule</label>
              <select
                value={profileForm.batch}
                onChange={(e) => setProfileForm({ ...profileForm, batch: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
              >
                <option>Evening Batch A (Maths & Science)</option>
                <option>Morning Batch B (Physics & Chemistry)</option>
                <option>Weekend Batch C (Calculus)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">My Contact Phone</label>
              <input
                type="text"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Simulator Payment Gateway Modal */}
      {isPaying && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl relative space-y-4">
            
            <div className="text-center">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <PayIcon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Tuition Payment Simulator</h3>
              <p className="text-[10px] text-slate-500 mt-1">
                Amount: <strong>${fees.find(f => f.id === isPaying)?.amount}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start space-x-2">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-[9px] text-slate-500 leading-normal">
                This is a fully reactive simulator bypass. Clicking Pay below will simulate a secure payment connection and mark this fee invoice as paid.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Simulated Card Details</label>
                <input
                  type="text"
                  disabled
                  value="4111 2222 3333 4444"
                  className="w-full text-xs px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">Expiry</label>
                  <input
                    type="text"
                    disabled
                    value="12 / 2029"
                    className="w-full text-xs px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1">CVV</label>
                  <input
                    type="text"
                    disabled
                    value="***"
                    className="w-full text-xs px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPaying(null)}
                className="w-1/2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executePaymentSimulation(isPaying)}
                className="w-1/2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow-md"
              >
                Simulate Pay
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
