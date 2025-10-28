
import { User, Subject, Exam, ClassSchedule, RecentActivity } from './types';
import { MathIcon, PhysicsIcon, ChemistryIcon, BiologyIcon } from './components/icons/SubjectIcons';

export const MOCK_USER: User = {
  name: 'Alex Johnson',
  avatarUrl: 'https://picsum.photos/seed/alex/200',
  attendanceStreak: 14,
  rewardPoints: 1250,
  upiId: 'alexj@okbank',
};

export const MOCK_SUBJECTS: Subject[] = [
  {
    name: 'Mathematics',
    progress: 80,
    icon: MathIcon,
    color: 'bg-blue-500',
    chapters: [
      { name: 'Algebra', completed: true },
      { name: 'Calculus', completed: true },
      { name: 'Trigonometry', completed: true },
      { name: 'Geometry', completed: false },
      { name: 'Statistics', completed: false },
    ],
  },
  {
    name: 'Physics',
    progress: 50,
    icon: PhysicsIcon,
    color: 'bg-purple-500',
    chapters: [
      { name: 'Mechanics', completed: true },
      { name: 'Thermodynamics', completed: true },
      { name: 'Electromagnetism', completed: false },
      { name: 'Optics', completed: false },
      { name: 'Quantum Physics', completed: false },
    ],
  },
  {
    name: 'Chemistry',
    progress: 70,
    icon: ChemistryIcon,
    color: 'bg-green-500',
    chapters: [
      { name: 'Organic Chemistry', completed: true },
      { name: 'Inorganic Chemistry', completed: true },
      { name: 'Physical Chemistry', completed: true },
      { name: 'Biochemistry', completed: false },
    ],
  },
    {
    name: 'Biology',
    progress: 90,
    icon: BiologyIcon,
    color: 'bg-emerald-500',
    chapters: [
      { name: 'Cell Biology', completed: true },
      { name: 'Genetics', completed: true },
      { name: 'Ecology', completed: true },
      { name: 'Anatomy', completed: true },
    ],
  },
];

export const MOCK_EXAMS: Exam[] = [
    {
        subject: 'Physics Mid-term',
        date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        venue: 'Hall A-12',
        time: '09:00 AM - 12:00 PM',
    },
    {
        subject: 'Mathematics Final',
        date: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        venue: 'Main Auditorium',
        time: '10:00 AM - 01:00 PM',
    },
     {
        subject: 'Chemistry Practical',
        date: new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000), // 28 days from now
        venue: 'Chemistry Lab 2',
        time: '02:00 PM - 05:00 PM',
    },
];

export const MOCK_CLASSES: ClassSchedule[] = [
    { subject: 'Mathematics', time: '09:00 - 10:00 AM', teacher: 'Dr. Evelyn Reed', status: 'completed'},
    { subject: 'Physics', time: '10:15 - 11:15 AM', teacher: 'Prof. Alan Grant', status: 'ongoing'},
    { subject: 'Lunch Break', time: '11:15 - 12:15 PM', teacher: '', status: 'upcoming'},
    { subject: 'Chemistry', time: '12:15 - 01:15 PM', teacher: 'Ms. Marie Curie', status: 'upcoming'},
];

export const MOCK_ACTIVITY: RecentActivity[] = [
    { type: 'chat', description: 'Asked Study Buddy about "Quantum Entanglement"', timestamp: '2h ago'},
    { type: 'submission', description: 'Submitted "Calculus Assignment 3"', timestamp: '1d ago'},
    { type: 'grade', description: 'Received A+ in "Algebra Quiz"', timestamp: '2d ago'},
];

export const REWARD_MILESTONE = 2000;
