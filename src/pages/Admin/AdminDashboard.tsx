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
  Announcement 
} from '../../types';
import { 
  Users, 
  BookOpen, 
  CheckSquare, 
  CreditCard, 
  FileText, 
  Award, 
  Bell, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  PlusCircle, 
  Calendar, 
  Check, 
  X, 
  Download,
  AlertCircle,
  TrendingUp,
  Mail,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

interface AdminDashboardProps {
  currentUser: User | null;
  activeTab: string;
}

export default function AdminDashboard({ currentUser, activeTab }: AdminDashboardProps) {
  // State from DB Service
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  // Search, Filters & Modals
  const [studentSearch, setStudentSearch] = useState('');
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    name: '', email: '', roll_no: '', class: 'Grade 10', batch: 'Evening Batch A (Maths & Science)', phone: ''
  });

  // Course Form State
  const [courseForm, setCourseForm] = useState({
    name: '', description: '', hours: '3 hrs/week', fee: 150
  });

  // Attendance Date
  const [attendanceDate, setAttendanceDate] = useState('2026-07-17');
  const [markedAttendance, setMarkedAttendance] = useState<{ [studentId: string]: 'Present' | 'Absent' }>({});

  // Assignment Form State
  const [asgForm, setAsgForm] = useState({
    title: '', description: '', due_date: '2026-07-25'
  });

  // Note Form State
  const [noteForm, setNoteForm] = useState({
    title: '', subject: 'Mathematics'
  });

  // Result Form State
  const [resultForm, setResultForm] = useState({
    studentId: '', subject: 'Mathematics', marks: 80, totalMarks: 100
  });

  // Announcement Form State
  const [annForm, setAnnForm] = useState({
    title: '', content: '', category: 'General' as any
  });

  // Load Data
  const reloadData = () => {
    setStudents(dbService.getStudents());
    setCourses(dbService.getCourses());
    setFees(dbService.getFees());
    setAssignments(dbService.getAssignments());
    setNotes(dbService.getNotes());
    setResults(dbService.getResults());
    setAnnouncements(dbService.getAnnouncements());
    setAttendance(dbService.getAttendance());
  };

  useEffect(() => {
    reloadData();
  }, [activeTab]);

  // Set initial attendance marking hash when date changes
  useEffect(() => {
    const list = dbService.getStudents();
    const existingRecs = dbService.getAttendance(attendanceDate);
    
    const hash: { [studentId: string]: 'Present' | 'Absent' } = {};
    list.forEach(student => {
      const match = existingRecs.find(r => r.student_id === student.id);
      hash[student.id] = match ? match.status : 'Present'; // default present
    });
    setMarkedAttendance(hash);
  }, [attendanceDate, students.length]);

  // Handle Student Submit (Add/Edit)
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedStudentId) {
      dbService.editStudent(selectedStudentId, studentForm);
    } else {
      dbService.addStudent(studentForm);
    }
    setStudentModalOpen(false);
    setIsEditMode(false);
    setSelectedStudentId(null);
    setStudentForm({ name: '', email: '', roll_no: '', class: 'Grade 10', batch: 'Evening Batch A (Maths & Science)', phone: '' });
    reloadData();
  };

  const triggerEditStudent = (stud: StudentProfile) => {
    setIsEditMode(true);
    setSelectedStudentId(stud.id);
    setStudentForm({
      name: stud.user?.name || '',
      email: stud.user?.email || '',
      roll_no: stud.roll_no,
      class: stud.class,
      batch: stud.batch,
      phone: stud.phone
    });
    setStudentModalOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student? This removes all associated attendance, grades, and fee history.')) {
      dbService.deleteStudent(id);
      reloadData();
    }
  };

  // Handle Course Submit
  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.addCourse(courseForm.name, courseForm.description, courseForm.hours, courseForm.fee);
    setCourseForm({ name: '', description: '', hours: '3 hrs/week', fee: 150 });
    reloadData();
  };

  // Save Attendance
  const handleSaveAttendance = () => {
    const records = Object.entries(markedAttendance).map(([student_id, status]) => ({
      student_id,
      date: attendanceDate,
      status: status as 'Present' | 'Absent'
    }));
    dbService.saveAttendance(records);
    alert('Attendance saved successfully!');
    reloadData();
  };

  // Update Fees
  const toggleFeeStatus = (feeId: string, current: 'Paid' | 'Pending') => {
    const next = current === 'Paid' ? 'Pending' : 'Paid';
    dbService.updateFeeStatus(feeId, next);
    reloadData();
  };

  const [feeStudentId, setFeeStudentId] = useState('');
  const [feeAmount, setFeeAmount] = useState(150);
  const handleIssueFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeStudentId) return;
    dbService.addFeeRecord(feeStudentId, feeAmount, 'Pending', '2026-07-31');
    setFeeStudentId('');
    alert('Invoice issued successfully!');
    reloadData();
  };

  // Handle Assignment Submit
  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.addAssignment(asgForm.title, asgForm.description, asgForm.due_date);
    setAsgForm({ title: '', description: '', due_date: '2026-07-25' });
    reloadData();
  };

  // Handle Note Submit
  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.addNote(noteForm.title, noteForm.subject);
    setNoteForm({ title: '', subject: 'Mathematics' });
    reloadData();
  };

  // Handle Result Submit
  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultForm.studentId) return;
    
    // Auto calculate grade
    const percentage = (resultForm.marks / resultForm.totalMarks) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    dbService.addResult(resultForm.studentId, resultForm.subject, resultForm.marks, resultForm.totalMarks, grade);
    setResultForm({ studentId: '', subject: 'Mathematics', marks: 80, totalMarks: 100 });
    alert('Result published successfully!');
    reloadData();
  };

  // Handle Announcement Submit
  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.addAnnouncement(annForm.title, annForm.content, annForm.category);
    setAnnForm({ title: '', content: '', category: 'General' });
    reloadData();
  };

  // Dashboard calculations
  const totalStudents = students.length;
  
  // Present today
  const attendanceToday = attendance.filter(a => a.date === '2026-07-17');
  const presentToday = attendanceToday.filter(a => a.status === 'Present').length;
  const presentRate = attendanceToday.length ? Math.round((presentToday / attendanceToday.length) * 100) : 85;

  // Fees collected
  const totalFees = fees.reduce((sum, item) => sum + item.amount, 0);
  const feesCollected = fees.filter(f => f.status === 'Paid').reduce((sum, item) => sum + item.amount, 0);
  const pendingFees = fees.filter(f => f.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);

  // Growth Chart & Stats
  const attendanceChartData = [
    { day: 'Mon 13', rate: 75 },
    { day: 'Tue 14', rate: 75 },
    { day: 'Wed 15', rate: 100 },
    { day: 'Thu 16', rate: 75 },
    { day: 'Fri 17', rate: 50 },
  ];

  const feePieData = [
    { name: 'Collected', value: feesCollected, color: '#4F46E5' },
    { name: 'Pending', value: pendingFees, color: '#F43F5E' }
  ];

  const resultsPerformance = [
    { name: 'A+ Grade', count: results.filter(r => r.grade === 'A+').length },
    { name: 'A Grade', count: results.filter(r => r.grade === 'A').length },
    { name: 'B Grade', count: results.filter(r => r.grade === 'B' || r.grade === 'B+').length },
    { name: 'C Grade', count: results.filter(r => r.grade === 'C').length },
  ];

  // Render Sub-Views
  return (
    <div className="space-y-6">
      
      {/* Overview View */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Students</span>
                <span className="text-xl font-bold text-slate-900">{totalStudents}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Present Today</span>
                <span className="text-xl font-bold text-slate-900">{presentRate}%</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Fees Collected</span>
                <span className="text-xl font-bold text-emerald-600">${feesCollected}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="bg-rose-50 p-3 rounded-xl text-rose-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Pending Fees</span>
                <span className="text-xl font-bold text-rose-600">${pendingFees}</span>
              </div>
            </div>

          </div>

          {/* Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Attendance Chart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-indigo-600" />
                <span>Attendance Graph (Past 5 Days)</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} unit="%" />
                    <Tooltip cursor={{ fill: '#F8FAFC' }} />
                    <Bar dataKey="rate" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Present %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fee Status Pie */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Fee Collection Ratio</h3>
              <div className="h-64 flex flex-col justify-between">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feePieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {feePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-around text-xs font-semibold pt-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-3 w-3 rounded-full bg-indigo-600 block" />
                    <span className="text-slate-600">Collected: ${feesCollected}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500 block" />
                    <span className="text-slate-600">Pending: ${pendingFees}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Recent Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent announcements list */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Announcements</h3>
                <span className="text-[10px] text-slate-400">{announcements.length} Published</span>
              </div>
              <div className="space-y-3.5">
                {announcements.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className="text-[9px] bg-slate-200/60 text-slate-600 font-mono px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student grade performance */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Result Analysis (Grade Blocks)</h3>
              <div className="h-48 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resultsPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} allowDecimals={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#10B981" fill="#D1FAE5" name="Students count" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Students Management View */}
      {activeTab === 'students' && (
        <div className="space-y-4 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search student details..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none"
              />
              <Search className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-400" />
            </div>

            <button
              onClick={() => {
                setIsEditMode(false);
                setStudentForm({ name: '', email: '', roll_no: '', class: 'Grade 10', batch: 'Evening Batch A (Maths & Science)', phone: '' });
                setStudentModalOpen(true);
              }}
              className="inline-flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Student</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-3.5">Roll No</th>
                    <th className="px-6 py-3.5">Student Details</th>
                    <th className="px-6 py-3.5">Class / Batch</th>
                    <th className="px-6 py-3.5">Contact Details</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {students
                    .filter(s => {
                      const search = studentSearch.toLowerCase();
                      return (
                        s.user?.name.toLowerCase().includes(search) ||
                        s.roll_no.toLowerCase().includes(search) ||
                        s.class.toLowerCase().includes(search)
                      );
                    })
                    .map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-mono font-bold text-indigo-600">{student.roll_no}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={student.user?.photo || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(student.user?.name || '')}`}
                              alt="" 
                              className="h-8 w-8 rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{student.user?.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{student.user?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-700">{student.class}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[180px]">{student.batch}</p>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">{student.phone}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => triggerEditStudent(student)}
                              className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg"
                              title="Edit student profile"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg"
                              title="Delete student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add / Edit Student Modal */}
          {studentModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl relative">
                <button 
                  onClick={() => setStudentModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>

                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  {isEditMode ? 'Edit Student Profile' : 'Add New Tuition Student'}
                </h3>

                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      placeholder="e.g. Rachel Adams"
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Student Email</label>
                    <input
                      type="email"
                      required
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      placeholder="student@gmail.com"
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Roll Number</label>
                      <input
                        type="text"
                        required
                        value={studentForm.roll_no}
                        onChange={(e) => setStudentForm({ ...studentForm, roll_no: e.target.value })}
                        placeholder="TD2026-025"
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Grade Class</label>
                      <select
                        value={studentForm.class}
                        onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                      >
                        <option>Grade 10</option>
                        <option>Grade 11</option>
                        <option>Grade 12</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Batch Schedule</label>
                    <select
                      value={studentForm.batch}
                      onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                    >
                      <option>Evening Batch A (Maths & Science)</option>
                      <option>Morning Batch B (Physics & Chemistry)</option>
                      <option>Weekend Batch C (Calculus)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={studentForm.phone}
                      onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStudentModalOpen(false)}
                      className="w-1/2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-100"
                    >
                      {isEditMode ? 'Save Edits' : 'Register Student'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tuition Course Listing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{course.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{course.description}</p>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span>Hours: {course.hours}</span>
                    <span className="text-indigo-600 font-bold">${course.fee}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Course Form */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Add Course Module</h3>
            <form onSubmit={handleCourseSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  placeholder="e.g. Advanced Biology (Grade 12)"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Syllabus Description</label>
                <textarea
                  required
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Covering biochemistry, genetics, and ecology..."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Hours / Week</label>
                  <input
                    type="text"
                    required
                    value={courseForm.hours}
                    onChange={(e) => setCourseForm({ ...courseForm, hours: e.target.value })}
                    placeholder="e.g. 4 hrs/week"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Monthly Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.fee}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: Number(e.target.value) })}
                    placeholder="150"
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Publish Course
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Attendance Registry View */}
      {activeTab === 'attendance' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm max-w-3xl mx-auto space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Mark Tuition Attendance</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Select a calendar date and verify student status.</p>
            </div>
            
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="text-xs px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="space-y-3.5">
            {students.map(stud => {
              const status = markedAttendance[stud.id] || 'Present';
              return (
                <div key={stud.id} className="flex items-center justify-between p-3 bg-slate-50/70 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-indigo-600 font-mono font-bold w-16">{stud.roll_no}</span>
                    <p className="text-xs font-bold text-slate-800">{stud.user?.name}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setMarkedAttendance({ ...markedAttendance, [stud.id]: 'Present' })}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        status === 'Present'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => setMarkedAttendance({ ...markedAttendance, [stud.id]: 'Absent' })}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        status === 'Absent'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleSaveAttendance}
              className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
            >
              <Check className="h-4 w-4" />
              <span>Save Attendance Logs</span>
            </button>
          </div>

        </div>
      )}

      {/* Fees Management Tab */}
      {activeTab === 'fees' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fee Invoices</h3>
              <div className="flex space-x-1 text-[10px] bg-slate-100 p-0.5 rounded-lg">
                <span className="px-2 py-1 bg-white text-slate-800 rounded-md font-bold shadow-sm">All Records</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-5 py-3">Student</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3">Due Date</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {fees.map((fee) => {
                      const stud = students.find(s => s.id === fee.student_id);
                      return (
                        <tr key={fee.id} className="hover:bg-slate-50/50">
                          <td className="px-5 py-3.5">
                            <p className="font-bold text-slate-900">{stud?.user?.name || 'Loading...'}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{stud?.roll_no}</p>
                          </td>
                          <td className="px-5 py-3.5 font-bold font-mono text-slate-800">${fee.amount}</td>
                          <td className="px-5 py-3.5 font-medium text-slate-500">{fee.due_date}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full ${
                              fee.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}>
                              {fee.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => toggleFeeStatus(fee.id, fee.status)}
                              className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg font-semibold transition-all"
                            >
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Issue invoice */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Issue Fee Invoice</h3>
            <form onSubmit={handleIssueFee} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Target Student</label>
                <select
                  required
                  value={feeStudentId}
                  onChange={(e) => setFeeStudentId(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="">Select Student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.user?.name} ({s.roll_no})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Invoice Amount ($)</label>
                <input
                  type="number"
                  required
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Issue Invoice
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Assignments View */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Uploaded Assignments</h3>
            <div className="space-y-3.5">
              {assignments.map(asg => (
                <div key={asg.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-950 mb-1">{asg.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{asg.description}</p>
                    <div className="text-[9px] text-slate-400 font-mono">
                      Published: {new Date(asg.created_at).toLocaleDateString()} | Due Date: {asg.due_date}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dbService.deleteAssignment(asg.id);
                      reloadData();
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Assignment Form */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Create New Homework</h3>
            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Homework Title</label>
                <input
                  type="text"
                  required
                  value={asgForm.title}
                  onChange={(e) => setAsgForm({ ...asgForm, title: e.target.value })}
                  placeholder="e.g. Calculus Practice Sheet 3"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Instructions</label>
                <textarea
                  required
                  rows={3}
                  value={asgForm.description}
                  onChange={(e) => setAsgForm({ ...asgForm, description: e.target.value })}
                  placeholder="Write clear task directions for students..."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Submission Deadline</label>
                <input
                  type="date"
                  required
                  value={asgForm.due_date}
                  onChange={(e) => setAsgForm({ ...asgForm, due_date: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Publish Assignment
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Notes / Materials Tab */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Uploaded Notes & Material</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map(note => (
                <div key={note.id} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{note.title}</h4>
                    <span className="inline-block mt-1 text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                      {note.subject}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      dbService.deleteNote(note.id);
                      reloadData();
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Study Material */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Upload Study PDF</h3>
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  placeholder="e.g. Chapter 1 Formula Sheet"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Subject Tag</label>
                <select
                  value={noteForm.subject}
                  onChange={(e) => setNoteForm({ ...noteForm, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                >
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biological Sciences</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Publish Note Material
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Results Publishing Tab */}
      {activeTab === 'results' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recently Published Marks</h3>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-5 py-3">Student</th>
                      <th className="px-5 py-3">Exam Subject / Test</th>
                      <th className="px-5 py-3">Marks Obtained</th>
                      <th className="px-5 py-3 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {results.slice().reverse().map((res) => {
                      const stud = students.find(s => s.id === res.student_id);
                      return (
                        <tr key={res.id} className="hover:bg-slate-50/50">
                          <td className="px-5 py-3 font-bold text-slate-900">{stud?.user?.name || 'Loading...'}</td>
                          <td className="px-5 py-3 text-slate-600">{res.subject}</td>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-700">
                            {res.marks} / {res.total_marks}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold font-mono px-2.5 py-0.5 rounded-lg">
                              {res.grade}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results Upload Form */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Publish Student Grade</h3>
            <form onSubmit={handleResultSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Target Student</label>
                <select
                  required
                  value={resultForm.studentId}
                  onChange={(e) => setResultForm({ ...resultForm, studentId: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="">Select Student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.user?.name} ({s.roll_no})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Exam Description / Title</label>
                <input
                  type="text"
                  required
                  value={resultForm.subject}
                  onChange={(e) => setResultForm({ ...resultForm, subject: e.target.value })}
                  placeholder="e.g. Mathematics (Trigonometry Test)"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Marks Scored</label>
                  <input
                    type="number"
                    required
                    value={resultForm.marks}
                    onChange={(e) => setResultForm({ ...resultForm, marks: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Total Possible Marks</label>
                  <input
                    type="number"
                    required
                    value={resultForm.totalMarks}
                    onChange={(e) => setResultForm({ ...resultForm, totalMarks: Number(e.target.value) })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Publish Score
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Announcements / Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Posted Board Announcements</h3>
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
                    Posted: {new Date(ann.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post Announcement Form */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Write New Announcement</h3>
            <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Subject / Header</label>
                <input
                  type="text"
                  required
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  placeholder="e.g. Center closed for Holiday"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Announcement Details</label>
                <textarea
                  required
                  rows={4}
                  value={annForm.content}
                  onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                  placeholder="Write clear instructions for students..."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Category Type</label>
                <select
                  value={annForm.category}
                  onChange={(e) => setAnnForm({ ...annForm, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white"
                >
                  <option>General</option>
                  <option>Exam</option>
                  <option>Fee</option>
                  <option>Holiday</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Publish Broadcast
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Detailed Student Growth & Metrics</h3>
            <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
              Below is an analytical distribution of tuition class sizes and score percentages. These metrics update in real-time as students register and log scores.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Student Attendance consistency (%)</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#4F46E5" strokeWidth={2.5} name="Attendance Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700">Exam Results Marks distribution</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultsPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} name="Students Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings View */}
      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Portal Settings</h3>
            <div className="flex items-center space-x-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <img
                src={currentUser?.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                alt=""
                className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold text-slate-950">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser?.email}</p>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed">
              You are currently logged in with complete Tutor/Admin permissions. You have permission to register students, post notes, and issue invoice balances.
            </div>
          </div>

          {/* Supabase connection guide */}
          <div className="bg-indigo-900 text-white p-5 rounded-2xl border border-indigo-800 shadow-sm space-y-3.5">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-indigo-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Supabase Live Connection Guide</h4>
                <p className="text-[10px] text-indigo-200 mt-1 leading-relaxed">
                  The system is currently running on a robust, in-memory **Local Storage fallback database** inside the sandbox. To connect to your live Supabase PostgreSQL database, follow these steps:
                </p>
              </div>
            </div>

            <ol className="text-[10px] text-indigo-200 list-decimal pl-4 space-y-1">
              <li>Deploy your tables using our schema format in <code>src/services/db.ts</code>.</li>
              <li>Navigate to your Netlify or system Settings panel.</li>
              <li>Define the following environment variables:</li>
            </ol>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[9px] text-slate-300 space-y-1">
              <p>VITE_SUPABASE_URL="your_supabase_project_url"</p>
              <p>VITE_SUPABASE_ANON_KEY="your_supabase_anon_api_key"</p>
            </div>

            <div className="flex items-center space-x-2 text-[9px] text-indigo-300 pt-1.5 border-t border-indigo-800">
              <span className={`inline-block h-2 w-2 rounded-full ${dbService.getCurrentUser() ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span>Status: {dbService.getCurrentUser() ? 'Active Simulator Session' : 'Offline'}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
