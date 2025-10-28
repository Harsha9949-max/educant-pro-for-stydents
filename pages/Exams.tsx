
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { MOCK_EXAMS } from '../constants';

const Countdown: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
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
        <div className="flex items-center justify-center space-x-4 md:space-x-8 my-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center bg-background dark:bg-background-dark p-3 rounded-lg w-20">
                    <div className="text-4xl font-bold text-primary dark:text-primary-light">{String(value).padStart(2, '0')}</div>
                    <div className="text-xs uppercase text-text-secondary dark:text-text-secondary-dark">{unit}</div>
                </div>
            ))}
        </div>
    );
};

const Exams: React.FC = () => {
    const nextExam = MOCK_EXAMS[0];
    const upcomingExams = MOCK_EXAMS.slice(1);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Examination Hub</h1>
                <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
                    Your guide to upcoming exams and preparation.
                </p>
            </div>

            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white animate-fadeIn">
                <h2 className="text-2xl font-semibold text-center">Next Exam Spotlight</h2>
                <div className="text-center mt-4">
                    <p className="text-4xl font-bold">{nextExam.subject}</p>
                    <p className="text-lg opacity-90 mt-1">
                        {nextExam.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <Countdown targetDate={nextExam.date} />
                <div className="text-center text-lg opacity-90">
                    <span>{nextExam.time} at {nextExam.venue}</span>
                </div>
            </Card>

            <Card>
                <h2 className="text-2xl font-semibold mb-4">Full Exam Schedule</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b dark:border-gray-700">
                            <tr>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[nextExam, ...upcomingExams].map((exam, index) => (
                                <tr key={index} className={`border-b dark:border-gray-700 transition-colors ${index === 0 ? 'bg-primary/10' : 'hover:bg-primary/5'}`}>
                                    <td className="p-4 font-semibold">{exam.subject}</td>
                                    <td className="p-4">{exam.date.toLocaleDateString()}</td>
                                    <td className="p-4">{exam.time}</td>
                                    <td className="p-4">{exam.venue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card>
                <h2 className="text-2xl font-semibold mb-4">Preparation Timeline</h2>
                <p className="text-text-secondary dark:text-text-secondary-dark">
                    Based on your syllabus, focus on these topics for the upcoming Physics exam:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Electromagnetism (Review concepts)</li>
                    <li>Optics (Practice problems)</li>
                    <li>Quantum Physics (Start new chapter)</li>
                </ul>
            </Card>
        </div>
    );
};

export default Exams;
