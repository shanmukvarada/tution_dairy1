import { createClient } from '@supabase/supabase-js';
import { 
  User, 
  StudentProfile, 
  Attendance, 
  FeeRecord, 
  Assignment, 
  Note, 
  Result, 
  TimetableEntry, 
  Announcement,
  UserRole
} from '../types';

// Supabase configuration detection
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url');

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null;

// ==========================================
// MOCK & LOCAL STORAGE PERSISTENCE LAYER
// ==========================================

// Initial Seed Data
const DEFAULT_USERS: User[] = [
  {
    id: 'u-admin-1',
    name: 'Mrs. Sarah Jenkins (Tutor)',
    email: 'admin@gmail.com',
    role: 'admin',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    created_at: new Date('2026-01-10').toISOString()
  },
  {
    id: 'u-student-1',
    name: 'Vikas Prasad',
    email: 'vprasad102938@gmail.com',
    role: 'student',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    created_at: new Date('2026-02-15').toISOString()
  },
  {
    id: 'u-student-2',
    name: 'Emily Watson',
    email: 'emily@gmail.com',
    role: 'student',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    created_at: new Date('2026-02-16').toISOString()
  },
  {
    id: 'u-student-3',
    name: 'Aarav Mehta',
    email: 'aarav@gmail.com',
    role: 'student',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    created_at: new Date('2026-02-20').toISOString()
  },
  {
    id: 'u-student-4',
    name: 'Chloe Chen',
    email: 'chloe@gmail.com',
    role: 'student',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    created_at: new Date('2026-02-22').toISOString()
  }
];

const DEFAULT_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 's-1',
    user_id: 'u-student-1',
    roll_no: 'TD2026-001',
    class: 'Grade 10',
    batch: 'Evening Batch A (Maths & Science)',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 's-2',
    user_id: 'u-student-2',
    roll_no: 'TD2026-002',
    class: 'Grade 10',
    batch: 'Evening Batch A (Maths & Science)',
    phone: '+1 (555) 987-6543'
  },
  {
    id: 's-3',
    user_id: 'u-student-3',
    roll_no: 'TD2026-003',
    class: 'Grade 12',
    batch: 'Morning Batch B (Physics & Chemistry)',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 's-4',
    user_id: 'u-student-4',
    roll_no: 'TD2026-004',
    class: 'Grade 11',
    batch: 'Weekend Batch C (Calculus)',
    phone: '+1 (555) 789-0123'
  }
];

const DEFAULT_COURSES = [
  { id: 'c-1', name: 'Mathematics (Grade 10)', description: 'Algebra, Geometry, Trigonometry, and Statistics fundamentals.', hours: '3 hrs/week', fee: 150 },
  { id: 'c-2', name: 'Science (Grade 10)', description: 'Physics, Chemistry, and Biology core topics with experiments.', hours: '3 hrs/week', fee: 150 },
  { id: 'c-3', name: 'Physics & Chemistry (Grade 12)', description: 'Advanced mechanics, thermodynamics, electromagnetism, and organic chemistry.', hours: '4.5 hrs/week', fee: 200 },
  { id: 'c-4', name: 'Calculus (Grade 11)', description: 'Limits, derivatives, integrals, and differential equations.', hours: '2 hrs/week', fee: 120 }
];

const DEFAULT_ATTENDANCE: Attendance[] = [
  // Vikas Prasad (s-1) Attendance
  { id: 'att-1', student_id: 's-1', date: '2026-07-13', status: 'Present' },
  { id: 'att-2', student_id: 's-1', date: '2026-07-14', status: 'Present' },
  { id: 'att-3', student_id: 's-1', date: '2026-07-15', status: 'Present' },
  { id: 'att-4', student_id: 's-1', date: '2026-07-16', status: 'Present' },
  { id: 'att-5', student_id: 's-1', date: '2026-07-17', status: 'Present' },

  // Emily Watson (s-2) Attendance
  { id: 'att-6', student_id: 's-2', date: '2026-07-13', status: 'Present' },
  { id: 'att-7', student_id: 's-2', date: '2026-07-14', status: 'Absent' },
  { id: 'att-8', student_id: 's-2', date: '2026-07-15', status: 'Present' },
  { id: 'att-9', student_id: 's-2', date: '2026-07-16', status: 'Present' },
  { id: 'att-10', student_id: 's-2', date: '2026-07-17', status: 'Present' },

  // Aarav Mehta (s-3) Attendance
  { id: 'att-11', student_id: 's-3', date: '2026-07-13', status: 'Present' },
  { id: 'att-12', student_id: 's-3', date: '2026-07-14', status: 'Present' },
  { id: 'att-13', student_id: 's-3', date: '2026-07-15', status: 'Present' },
  { id: 'att-14', student_id: 's-3', date: '2026-07-16', status: 'Absent' },
  { id: 'att-15', student_id: 's-3', date: '2026-07-17', status: 'Present' },

  // Chloe Chen (s-4) Attendance
  { id: 'att-16', student_id: 's-4', date: '2026-07-13', status: 'Absent' },
  { id: 'att-17', student_id: 's-4', date: '2026-07-14', status: 'Present' },
  { id: 'att-18', student_id: 's-4', date: '2026-07-15', status: 'Present' },
  { id: 'att-19', student_id: 's-4', date: '2026-07-16', status: 'Present' },
  { id: 'att-20', student_id: 's-4', date: '2026-07-17', status: 'Absent' }
];

const DEFAULT_FEES: FeeRecord[] = [
  // July Fees (Due end of month)
  { id: 'fee-1', student_id: 's-1', amount: 150, status: 'Paid', due_date: '2026-07-31' },
  { id: 'fee-2', student_id: 's-2', amount: 150, status: 'Pending', due_date: '2026-07-31' },
  { id: 'fee-3', student_id: 's-3', amount: 200, status: 'Paid', due_date: '2026-07-31' },
  { id: 'fee-4', student_id: 's-4', amount: 120, status: 'Pending', due_date: '2026-07-31' },
  // June Fees (Past due / paid)
  { id: 'fee-5', student_id: 's-1', amount: 150, status: 'Paid', due_date: '2026-06-30' },
  { id: 'fee-6', student_id: 's-2', amount: 150, status: 'Paid', due_date: '2026-06-30' },
  { id: 'fee-7', student_id: 's-3', amount: 200, status: 'Paid', due_date: '2026-06-30' },
  { id: 'fee-8', student_id: 's-4', amount: 120, status: 'Paid', due_date: '2026-06-30' }
];

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Algebra: Quadratic Equations',
    description: 'Solve problems on page 42-45 of the Mathematics textbook. Submit step-by-step working showing discriminant calculation.',
    created_at: '2026-07-12T10:00:00Z',
    due_date: '2026-07-20'
  },
  {
    id: 'asg-2',
    title: 'Physics: Newton\'s Laws & Friction',
    description: 'Complete the lab questions and worksheet on sliding/static friction coefficients. Include diagram analysis.',
    created_at: '2026-07-14T09:00:00Z',
    due_date: '2026-07-22'
  },
  {
    id: 'asg-3',
    title: 'Chemistry: Balancing Redox Reactions',
    description: 'Balance the given 15 chemical equations in acidic and basic solutions using the half-reaction method.',
    created_at: '2026-07-16T11:30:00Z',
    due_date: '2026-07-25'
  }
];

const DEFAULT_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'Linear Programming & Optimization Notes',
    subject: 'Mathematics',
    pdf_url: '#',
    created_at: '2026-07-05T08:00:00Z'
  },
  {
    id: 'note-2',
    title: 'Electromagnetic Induction Formulas & Concept Sheet',
    subject: 'Physics',
    pdf_url: '#',
    created_at: '2026-07-10T14:20:00Z'
  },
  {
    id: 'note-3',
    title: 'Organic Chemistry: Hydrocarbons Quick Guide',
    subject: 'Chemistry',
    pdf_url: '#',
    created_at: '2026-07-12T11:10:00Z'
  }
];

const DEFAULT_RESULTS: Result[] = [
  // Vikas Prasad (s-1) Results
  { id: 'res-1', student_id: 's-1', subject: 'Mathematics (Algebra Test)', marks: 92, total_marks: 100, grade: 'A+' },
  { id: 'res-2', student_id: 's-1', subject: 'Science (Chemistry Mock)', marks: 85, total_marks: 100, grade: 'A' },

  // Emily Watson (s-2) Results
  { id: 'res-3', student_id: 's-2', subject: 'Mathematics (Algebra Test)', marks: 78, total_marks: 100, grade: 'B+' },
  { id: 'res-4', student_id: 's-2', subject: 'Science (Chemistry Mock)', marks: 82, total_marks: 100, grade: 'A-' },

  // Aarav Mehta (s-3) Results
  { id: 'res-5', student_id: 's-3', subject: 'Physics (Mechanics Test)', marks: 95, total_marks: 100, grade: 'A+' },
  { id: 'res-6', student_id: 's-3', subject: 'Chemistry (Organic Intro)', marks: 89, total_marks: 100, grade: 'A' },

  // Chloe Chen (s-4) Results
  { id: 'res-7', student_id: 's-4', subject: 'Mathematics (Algebra Test)', marks: 65, total_marks: 100, grade: 'C' }
];

const DEFAULT_TIMETABLE: TimetableEntry[] = [
  { id: 'tt-1', day: 'Monday', subject: 'Mathematics (Grade 10)', time: '17:00 - 18:30', tutor: 'Mrs. Sarah Jenkins', room: 'Room A' },
  { id: 'tt-2', day: 'Tuesday', subject: 'Science (Physics Focus)', time: '17:00 - 18:30', tutor: 'Mrs. Sarah Jenkins', room: 'Room A' },
  { id: 'tt-3', day: 'Wednesday', subject: 'Mathematics (Grade 10)', time: '17:00 - 18:30', tutor: 'Mrs. Sarah Jenkins', room: 'Room A' },
  { id: 'tt-4', day: 'Thursday', subject: 'Science (Chemistry Focus)', time: '17:00 - 18:30', tutor: 'Mrs. Sarah Jenkins', room: 'Room A' },
  { id: 'tt-5', day: 'Friday', subject: 'Special Doubt Clearing Session', time: '16:30 - 18:00', tutor: 'Mrs. Sarah Jenkins', room: 'Seminar Hall' },
  { id: 'tt-6', day: 'Saturday', subject: 'Calculus (Grade 11 Special)', time: '10:00 - 12:00', tutor: 'Mrs. Sarah Jenkins', room: 'Room B' }
];

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Monthly Algebra Evaluation on Monday!',
    content: 'Please make sure to review all chapters on Quadratic Equations and Polynomials. The test will be exactly 45 minutes long, starting right at class hour.',
    created_at: '2026-07-16T12:00:00Z',
    category: 'Exam'
  },
  {
    id: 'ann-2',
    title: 'Summer Fee Statement Issued',
    content: 'Tuition fees invoice for July 2026 has been generated. Kindly clear pending payments by July 31st to ensure continuous system access.',
    created_at: '2026-07-15T09:00:00Z',
    category: 'Fee'
  },
  {
    id: 'ann-3',
    title: 'New Chapter PDF Notes Uploaded',
    content: 'Study notes on Linear Programming and Optimizations are now live. Students can download them from the Study Materials tab.',
    created_at: '2026-07-10T10:00:00Z',
    category: 'General'
  }
];

// LocalStorage Keys
const KEYS = {
  USERS: 'td_users',
  PROFILES: 'td_student_profiles',
  COURSES: 'td_courses',
  ATTENDANCE: 'td_attendance',
  FEES: 'td_fees',
  ASSIGNMENTS: 'td_assignments',
  NOTES: 'td_notes',
  RESULTS: 'td_results',
  TIMETABLE: 'td_timetable',
  ANNOUNCEMENTS: 'td_announcements',
  CURRENT_USER: 'td_current_user'
};

// Initialization utility
function initLocalStorage() {
  if (!localStorage.getItem(KEYS.USERS)) localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  if (!localStorage.getItem(KEYS.PROFILES)) localStorage.setItem(KEYS.PROFILES, JSON.stringify(DEFAULT_STUDENT_PROFILES));
  if (!localStorage.getItem(KEYS.COURSES)) localStorage.setItem(KEYS.COURSES, JSON.stringify(DEFAULT_COURSES));
  if (!localStorage.getItem(KEYS.ATTENDANCE)) localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
  if (!localStorage.getItem(KEYS.FEES)) localStorage.setItem(KEYS.FEES, JSON.stringify(DEFAULT_FEES));
  if (!localStorage.getItem(KEYS.ASSIGNMENTS)) localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(DEFAULT_ASSIGNMENTS));
  if (!localStorage.getItem(KEYS.NOTES)) localStorage.setItem(KEYS.NOTES, JSON.stringify(DEFAULT_NOTES));
  if (!localStorage.getItem(KEYS.RESULTS)) localStorage.setItem(KEYS.RESULTS, JSON.stringify(DEFAULT_RESULTS));
  if (!localStorage.getItem(KEYS.TIMETABLE)) localStorage.setItem(KEYS.TIMETABLE, JSON.stringify(DEFAULT_TIMETABLE));
  if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
  
  // Set default current user to Admin on first visit so they don't get stuck, 
  // but they can logout or choose student anytime.
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0])); // Sarah Jenkins
  }
}

// Perform initialization immediately on load
if (typeof window !== 'undefined') {
  initLocalStorage();
}

// Helpers
function getStore<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function setStore<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ==========================================
// DB SERVICE METHODS (BRIDGED & FALLBACK)
// ==========================================

export const dbService = {
  // Authentication
  getCurrentUser(): User | null {
    try {
      const u = localStorage.getItem(KEYS.CURRENT_USER);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  getAvailableUsers(): User[] {
    return getStore<User>(KEYS.USERS);
  },

  loginAs(email: string): User | null {
    const users = getStore<User>(KEYS.USERS);
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      this.setCurrentUser(matched);
      return matched;
    }
    return null;
  },

  registerAndLoginGoogle(email: string, name: string): User {
    const users = getStore<User>(KEYS.USERS);
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      this.setCurrentUser(existing);
      return existing;
    }

    // Assign student by default, unless email contains admin
    const role: UserRole = email.includes('admin') ? 'admin' : 'student';
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    setStore(KEYS.USERS, users);

    // If student, create a matching student profile
    if (role === 'student') {
      const profiles = getStore<StudentProfile>(KEYS.PROFILES);
      const newProfile: StudentProfile = {
        id: `s-${Date.now()}`,
        user_id: newUser.id,
        roll_no: `TD2026-${String(profiles.length + 1).padStart(3, '0')}`,
        class: 'Grade 10',
        batch: 'Evening Batch A (Maths & Science)',
        phone: '+1 (555) 000-0000'
      };
      profiles.push(newProfile);
      setStore(KEYS.PROFILES, profiles);
    }

    this.setCurrentUser(newUser);
    return newUser;
  },

  // Student details & listing
  getStudents(): StudentProfile[] {
    const profiles = getStore<StudentProfile>(KEYS.PROFILES);
    const users = getStore<User>(KEYS.USERS);

    return profiles.map(p => {
      const matchedUser = users.find(u => u.id === p.user_id);
      return {
        ...p,
        user: matchedUser || {
          id: p.user_id,
          name: 'Unknown Student',
          email: '',
          role: 'student',
          created_at: ''
        }
      };
    });
  },

  getStudentByUserId(userId: string): StudentProfile | null {
    const students = this.getStudents();
    return students.find(s => s.user_id === userId) || null;
  },

  addStudent(data: { name: string; email: string; roll_no: string; class: string; batch: string; phone: string; photoUrl?: string }): StudentProfile {
    const users = getStore<User>(KEYS.USERS);
    const profiles = getStore<StudentProfile>(KEYS.PROFILES);

    const newUserId = `u-stud-${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      name: data.name,
      email: data.email,
      role: 'student',
      photo: data.photoUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(data.name)}`,
      created_at: new Date().toISOString()
    };

    const newProfile: StudentProfile = {
      id: `s-${Date.now()}`,
      user_id: newUserId,
      roll_no: data.roll_no || `TD2026-${String(profiles.length + 1).padStart(3, '0')}`,
      class: data.class,
      batch: data.batch,
      phone: data.phone
    };

    users.push(newUser);
    profiles.push(newProfile);

    setStore(KEYS.USERS, users);
    setStore(KEYS.PROFILES, profiles);

    // Seed defaults for new student (Fees, Results)
    const fees = getStore<FeeRecord>(KEYS.FEES);
    fees.push({
      id: `fee-new-${Date.now()}`,
      student_id: newProfile.id,
      amount: 150,
      status: 'Pending',
      due_date: '2026-07-31'
    });
    setStore(KEYS.FEES, fees);

    return {
      ...newProfile,
      user: newUser
    };
  },

  editStudent(studentId: string, data: { name: string; email: string; roll_no: string; class: string; batch: string; phone: string }): StudentProfile | null {
    const profiles = getStore<StudentProfile>(KEYS.PROFILES);
    const users = getStore<User>(KEYS.USERS);

    const profileIndex = profiles.findIndex(p => p.id === studentId);
    if (profileIndex === -1) return null;

    profiles[profileIndex].roll_no = data.roll_no;
    profiles[profileIndex].class = data.class;
    profiles[profileIndex].batch = data.batch;
    profiles[profileIndex].phone = data.phone;

    const userIndex = users.findIndex(u => u.id === profiles[profileIndex].user_id);
    if (userIndex !== -1) {
      users[userIndex].name = data.name;
      users[userIndex].email = data.email;
    }

    setStore(KEYS.PROFILES, profiles);
    setStore(KEYS.USERS, users);

    return {
      ...profiles[profileIndex],
      user: users[userIndex]
    };
  },

  deleteStudent(studentId: string): boolean {
    let profiles = getStore<StudentProfile>(KEYS.PROFILES);
    let users = getStore<User>(KEYS.USERS);

    const targetProfile = profiles.find(p => p.id === studentId);
    if (!targetProfile) return false;

    // Remove profile & user
    profiles = profiles.filter(p => p.id !== studentId);
    users = users.filter(u => u.id !== targetProfile.user_id);

    setStore(KEYS.PROFILES, profiles);
    setStore(KEYS.USERS, users);

    // Cascade delete attendance, fees, results
    let attendance = getStore<Attendance>(KEYS.ATTENDANCE);
    attendance = attendance.filter(a => a.student_id !== studentId);
    setStore(KEYS.ATTENDANCE, attendance);

    let fees = getStore<FeeRecord>(KEYS.FEES);
    fees = fees.filter(f => f.student_id !== studentId);
    setStore(KEYS.FEES, fees);

    let results = getStore<Result>(KEYS.RESULTS);
    results = results.filter(r => r.student_id !== studentId);
    setStore(KEYS.RESULTS, results);

    return true;
  },

  // Courses
  getCourses() {
    return getStore<any>(KEYS.COURSES);
  },

  addCourse(name: string, description: string, hours: string, fee: number) {
    const courses = getStore<any>(KEYS.COURSES);
    const newCourse = {
      id: `c-${Date.now()}`,
      name,
      description,
      hours,
      fee
    };
    courses.push(newCourse);
    setStore(KEYS.COURSES, courses);
    return newCourse;
  },

  // Attendance
  getAttendance(date?: string): Attendance[] {
    const records = getStore<Attendance>(KEYS.ATTENDANCE);
    if (date) {
      return records.filter(r => r.date === date);
    }
    return records;
  },

  getAttendanceForStudent(studentId: string): Attendance[] {
    const records = getStore<Attendance>(KEYS.ATTENDANCE);
    return records.filter(r => r.student_id === studentId);
  },

  saveAttendance(records: { student_id: string; date: string; status: 'Present' | 'Absent' }[]): void {
    const store = getStore<Attendance>(KEYS.ATTENDANCE);
    
    records.forEach(newRec => {
      const existingIdx = store.findIndex(r => r.student_id === newRec.student_id && r.date === newRec.date);
      if (existingIdx !== -1) {
        store[existingIdx].status = newRec.status;
      } else {
        store.push({
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          ...newRec
        });
      }
    });

    setStore(KEYS.ATTENDANCE, store);
  },

  // Fees
  getFees(): FeeRecord[] {
    return getStore<FeeRecord>(KEYS.FEES);
  },

  getFeesForStudent(studentId: string): FeeRecord[] {
    const records = getStore<FeeRecord>(KEYS.FEES);
    return records.filter(r => r.student_id === studentId);
  },

  addFeeRecord(student_id: string, amount: number, status: 'Paid' | 'Pending', due_date: string): FeeRecord {
    const records = getStore<FeeRecord>(KEYS.FEES);
    const newFee: FeeRecord = {
      id: `fee-${Date.now()}`,
      student_id,
      amount,
      status,
      due_date
    };
    records.push(newFee);
    setStore(KEYS.FEES, records);
    return newFee;
  },

  updateFeeStatus(feeId: string, status: 'Paid' | 'Pending'): boolean {
    const records = getStore<FeeRecord>(KEYS.FEES);
    const idx = records.findIndex(r => r.id === feeId);
    if (idx === -1) return false;

    records[idx].status = status;
    setStore(KEYS.FEES, records);
    return true;
  },

  // Assignments
  getAssignments(): Assignment[] {
    return getStore<Assignment>(KEYS.ASSIGNMENTS);
  },

  addAssignment(title: string, description: string, due_date: string, file_url?: string): Assignment {
    const list = getStore<Assignment>(KEYS.ASSIGNMENTS);
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      title,
      description,
      file_url: file_url || '#',
      created_at: new Date().toISOString(),
      due_date
    };
    list.unshift(newAsg);
    setStore(KEYS.ASSIGNMENTS, list);
    return newAsg;
  },

  deleteAssignment(id: string): boolean {
    let list = getStore<Assignment>(KEYS.ASSIGNMENTS);
    const length = list.length;
    list = list.filter(item => item.id !== id);
    setStore(KEYS.ASSIGNMENTS, list);
    return list.length < length;
  },

  // Notes (Study Materials)
  getNotes(): Note[] {
    return getStore<Note>(KEYS.NOTES);
  },

  addNote(title: string, subject: string, pdf_url?: string): Note {
    const list = getStore<Note>(KEYS.NOTES);
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      subject,
      pdf_url: pdf_url || '#',
      created_at: new Date().toISOString()
    };
    list.unshift(newNote);
    setStore(KEYS.NOTES, list);
    return newNote;
  },

  deleteNote(id: string): boolean {
    let list = getStore<Note>(KEYS.NOTES);
    const length = list.length;
    list = list.filter(item => item.id !== id);
    setStore(KEYS.NOTES, list);
    return list.length < length;
  },

  // Results
  getResults(): Result[] {
    return getStore<Result>(KEYS.RESULTS);
  },

  getResultsForStudent(studentId: string): Result[] {
    const list = getStore<Result>(KEYS.RESULTS);
    return list.filter(r => r.student_id === studentId);
  },

  addResult(student_id: string, subject: string, marks: number, total_marks: number, grade: string): Result {
    const list = getStore<Result>(KEYS.RESULTS);
    const newRes: Result = {
      id: `res-${Date.now()}`,
      student_id,
      subject,
      marks,
      total_marks,
      grade
    };
    list.push(newRes);
    setStore(KEYS.RESULTS, list);
    return newRes;
  },

  // Timetable
  getTimetable(): TimetableEntry[] {
    return getStore<TimetableEntry>(KEYS.TIMETABLE);
  },

  // Announcements
  getAnnouncements(): Announcement[] {
    return getStore<Announcement>(KEYS.ANNOUNCEMENTS);
  },

  addAnnouncement(title: string, content: string, category: 'General' | 'Exam' | 'Fee' | 'Holiday'): Announcement {
    const list = getStore<Announcement>(KEYS.ANNOUNCEMENTS);
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      created_at: new Date().toISOString(),
      category
    };
    list.unshift(newAnn);
    setStore(KEYS.ANNOUNCEMENTS, list);
    return newAnn;
  }
};
