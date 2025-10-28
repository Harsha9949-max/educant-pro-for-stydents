// FIX: Import FC type from react to fix 'Cannot find namespace React' error.
import type { FC } from 'react';

export type Page = 'dashboard' | 'syllabus' | 'exams' | 'study-buddy' | 'rewards' | 'profile';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  avatarUrl: string;
  attendanceStreak: number;
  rewardPoints: number;
  upiId?: string;
}

export interface Subject {
  name: string;
  progress: number;
  icon: FC<{ className?: string }>;
  chapters: { name: string; completed: boolean }[];
  color: string;
}

export interface Exam {
  subject: string;
  date: Date;
  venue: string;
  time: string;
}

export interface ClassSchedule {
    subject: string;
    time: string;
    teacher: string;
    status: 'ongoing' | 'upcoming' | 'completed';
}

export interface RecentActivity {
    type: 'chat' | 'submission' | 'grade';
    description: string;
    timestamp: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}