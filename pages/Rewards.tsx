
import React from 'react';
import Card from '../components/Card';
import { MOCK_USER, REWARD_MILESTONE } from '../constants';
import ProgressBar from '../components/ProgressBar';
import { FireIcon } from '../components/icons/Icons';

const CalendarDay: React.FC<{ day: number; isPresent?: boolean; isToday?: boolean }> = ({ day, isPresent, isToday }) => {
    let dayClass = 'w-10 h-10 flex items-center justify-center rounded-full';
    if(isToday) dayClass += ' border-2 border-primary';
    if(isPresent === true) dayClass += ' bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200';
    else if(isPresent === false) dayClass += ' bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200';
    else dayClass += ' text-text-secondary dark:text-text-secondary-dark';

    return (
        <div className={dayClass}>
            {day}
        </div>
    );
};

const Rewards: React.FC = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth });
    
    const rewardProgress = (MOCK_USER.rewardPoints / REWARD_MILESTONE) * 100;
    const canWithdraw = MOCK_USER.rewardPoints >= REWARD_MILESTONE;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Attendance & Rewards</h1>
                <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
                    Your consistency is paying off. Keep it up!
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-xl font-semibold mb-4">{today.toLocaleString('default', { month: 'long' })} Attendance</h2>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-text-secondary dark:text-text-secondary-dark mb-2">
                            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
                            {calendarDays.map(day => {
                                const isPresent = day < today.getDate() ? Math.random() > 0.1 : undefined; // Random attendance for past days
                                return <CalendarDay key={day} day={day} isPresent={isPresent} isToday={day === today.getDate()} />
                            })}
                        </div>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="flex flex-col items-center text-center">
                         <div className="relative">
                            <FireIcon className="w-20 h-20 text-orange-500" />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-orange-600">
                                {MOCK_USER.attendanceStreak}
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mt-2">Day Streak!</h2>
                        <p className="text-text-secondary dark:text-text-secondary-dark">You are on fire!</p>
                    </Card>
                    <Card>
                        <h2 className="text-xl font-semibold mb-2">Reward Meter</h2>
                        <ProgressBar progress={rewardProgress} colorClass="bg-secondary" className="h-4" />
                        <p className="text-center mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">
                            {MOCK_USER.rewardPoints} / {REWARD_MILESTONE} points
                        </p>
                    </Card>
                </div>
            </div>

            <Card>
                <h2 className="text-2xl font-semibold mb-4">UPI Withdrawal</h2>
                {canWithdraw ? (
                    <div className="space-y-4">
                        <p className="text-green-600 dark:text-green-400">Congratulations! You're eligible for a reward of ₹{REWARD_MILESTONE / 100}.</p>
                        <p>Your UPI ID: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{MOCK_USER.upiId}</span></p>
                        <button className="px-6 py-3 bg-secondary text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
                            Withdraw Now
                        </button>
                    </div>
                ) : (
                    <p className="text-text-secondary dark:text-text-secondary-dark">
                        You need {REWARD_MILESTONE - MOCK_USER.rewardPoints} more points to unlock withdrawal. Keep attending classes!
                    </p>
                )}
            </Card>

            <Card>
                <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
                <ul className="space-y-3">
                    <li className="flex justify-between p-3 bg-background dark:bg-background-dark rounded-lg">
                        <span>Reward Withdrawal</span>
                        <span className="font-semibold text-red-500">-₹50.00</span>
                    </li>
                     <li className="flex justify-between p-3 bg-background dark:bg-background-dark rounded-lg">
                        <span>Streak Bonus</span>
                        <span className="font-semibold text-green-500">+250 points</span>
                    </li>
                     <li className="flex justify-between p-3 bg-background dark:bg-background-dark rounded-lg">
                        <span>Achievement: Syllabus Master</span>
                        <span className="font-semibold text-green-500">+500 points</span>
                    </li>
                </ul>
            </Card>
        </div>
    );
};

export default Rewards;
