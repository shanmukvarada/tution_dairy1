export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  roll_no: string;
  class: string; // e.g. Grade 10
  batch: string; // e.g. Evening Batch A
  phone: string;
  user?: User; // Joined user data
}

export interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: 'Present' | 'Absent';
}

export interface FeeRecord {
  id: string;
  student_id: string;
  amount: number;
  status: 'Paid' | 'Pending';
  due_date: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  file_url?: string;
  created_at: string;
  due_date?: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  pdf_url?: string;
  created_at?: string;
}

export interface Result {
  id: string;
  student_id: string;
  subject: string;
  marks: number;
  total_marks: number;
  grade: string;
}

export interface TimetableEntry {
  id: string;
  day: string; // Monday, Tuesday, etc.
  subject: string;
  time: string;
  tutor: string;
  room?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  category: 'General' | 'Exam' | 'Fee' | 'Holiday';
}
