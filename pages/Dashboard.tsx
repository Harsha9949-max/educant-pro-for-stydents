
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import Card from '../components/Card';
import { User, Page } from '../types';
import { MOCK_SUBJECTS, MOCK_EXAMS, MOCK_CLASSES, MOCK_ACTIVITY, REWARD_MILESTONE } from '../constants';
import { FireIcon, CurrencyRupeeIcon, ChartPieIcon, ClockIcon } from '../components/icons/Icons';
import { SparklesIcon, BookOpenIcon, CalendarIcon } from '../components/icons/Icons';

interface DashboardProps {
  user: User;
  setActivePage: (page: Page) => void;
}

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex space-x-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <span className="text-2xl md:text-3xl font-bold text-text-primary dark:text-text-primary-dark">{String(value).padStart(2, '0')}</span>
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark uppercase">{unit}</span>
        </div>
      ))}
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ user, setActivePage }) => {

  const overallProgress = Math.round(MOCK_SUBJECTS.reduce((acc, s) => acc + s.progress, 0) / MOCK_SUBJECTS.length);
  const pieData = [
    { name: 'Completed', value: overallProgress },
    { name: 'Remaining', value: 100 - overallProgress },
  ];
  const COLORS = ['#4F46E5', '#E5E7EB'];
  const nextExam = MOCK_EXAMS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-text-secondary dark:text-text-secondary-dark">Let's make today productive.</p>
        </div>
        <img src={user.avatarUrl} alt="User Avatar" className="w-14 h-14 rounded-full shadow-md" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center space-x-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white hover:scale-105">
          <FireIcon className="w-10 h-10" />
          <div>
            <div className="text-2xl font-bold">{user.attendanceStreak} Days</div>
            <div className="text-sm opacity-90">Attendance Streak</div>
          </div>
        </Card>
        <Card className="flex items-center space-x-4 bg-gradient-to-br from-emerald-400 to-green-500 text-white hover:scale-105">
          <CurrencyRupeeIcon className="w-10 h-10" />
          <div>
            <div className="text-2xl font-bold">{user.rewardPoints}</div>
            <div className="text-sm opacity-90">Reward Balance</div>
          </div>
        </Card>
        <Card className="flex items-center space-x-4 bg-gradient-to-br from-indigo-400 to-purple-500 text-white hover:scale-105">
          <ChartPieIcon className="w-10 h-10" />
          <div>
            <div className="text-2xl font-bold">{REWARD_MILESTONE - user.rewardPoints}</div>
            <div className="text-sm opacity-90">Points to next reward</div>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="col-span-1 lg:col-span-2" onClick={() => setActivePage('study-buddy')}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">AI Study Buddy</h2>
                    <SparklesIcon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-text-secondary dark:text-text-secondary-dark mt-2">Stuck on a problem? Get instant help from your AI companion.</p>
                <div className="mt-4 p-4 bg-background dark:bg-background-dark rounded-lg">
                    <p className="text-sm text-gray-500">AI: "Hello Alex! I'm ready to help. What subject are we focusing on today?"</p>
                </div>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card onClick={() => setActivePage('syllabus')}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Syllabus Progress</h2>
                         <BookOpenIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="w-full h-40">
                    <ResponsiveContainer>
                        <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                            {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-text-primary dark:fill-text-primary-dark">
                            {`${overallProgress}%`}
                        </text>
                        </PieChart>
                    </ResponsiveContainer>
                    </div>
                </Card>
                <Card onClick={() => setActivePage('exams')}>
                    <div className="flex items-center justify-between mb-4">
                         <h2 className="text-xl font-semibold">Next Exam</h2>
                        <CalendarIcon className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="font-bold text-lg text-primary dark:text-primary-light">{nextExam.subject}</p>
                    <div className="my-4">
                        <CountdownTimer targetDate={nextExam.date} />
                    </div>
                </Card>
            </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
            <div className="space-y-4">
              {MOCK_CLASSES.map((c, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-1 w-3 h-3 rounded-full ${c.status === 'completed' ? 'bg-gray-400' : c.status === 'ongoing' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                  <div>
                    <p className="font-semibold">{c.subject}</p>
                    <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{c.time}</p>
                  </div>
                   {c.status === 'ongoing' && <button className="ml-auto text-sm bg-secondary text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors">Join</button>}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
             <ul className="space-y-3">
                 {MOCK_ACTIVITY.map((activity, index) => (
                    <li key={index} className="flex items-center space-x-3 text-sm">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'chat' ? 'bg-blue-100 dark:bg-blue-900' : activity.type === 'submission' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'}`}>
                            {activity.type === 'chat' && <SparklesIcon className="w-5 h-5 text-blue-500"/>}
                            {activity.type === 'submission' && <BookOpenIcon className="w-5 h-5 text-green-500"/>}
                            {activity.type === 'grade' && <span className="font-bold text-yellow-600">A+</span>}
                        </span>
                        <div>
                            <p className="text-text-primary dark:text-text-primary-dark">{activity.description}</p>
                            <p className="text-xs text-text-secondary dark:text-text-secondary-dark">{activity.timestamp}</p>
                        </div>
                    </li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
