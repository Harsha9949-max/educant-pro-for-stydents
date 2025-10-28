import React, { useState } from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import { MOCK_SUBJECTS } from '../constants';
import { Subject } from '../types';
import { CheckCircleIcon } from '../components/icons/Icons';

const SubjectCard: React.FC<{
  subject: Subject;
  onToggleChapter: (subjectName: string, chapterIndex: number) => void;
}> = ({ subject, onToggleChapter }) => {
  return (
    <Card className="animate-slideInUp">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${subject.color}`}>
            <subject.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold">{subject.name}</h3>
        </div>
        <span className="font-bold text-lg text-primary dark:text-primary-light">{subject.progress}%</span>
      </div>
      <div className="mt-4">
        <ProgressBar progress={subject.progress} colorClass={subject.color} />
      </div>
      <div className="mt-6 space-y-3">
        <h4 className="font-semibold text-text-secondary dark:text-text-secondary-dark">Chapters</h4>
        {subject.chapters.map((chapter, index) => (
          <div
            key={index}
            onClick={() => onToggleChapter(subject.name, index)}
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer bg-background dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02]"
          >
            <span className={`${chapter.completed ? 'line-through text-text-secondary dark:text-text-secondary-dark' : ''}`}>
              {chapter.name}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${chapter.completed ? 'bg-secondary border-secondary' : 'border-gray-300 dark:border-gray-600'}`}>
              {chapter.completed && <CheckCircleIcon className="w-5 h-5 text-white" />}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Syllabus: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() =>
    MOCK_SUBJECTS.map(subject => {
      const completedChapters = subject.chapters.filter(c => c.completed).length;
      const totalChapters = subject.chapters.length;
      const progress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
      return { ...subject, progress };
    })
  );

  const handleToggleChapter = (subjectName: string, chapterIndex: number) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (subject.name === subjectName) {
          const newChapters = [...subject.chapters];
          newChapters[chapterIndex].completed = !newChapters[chapterIndex].completed;
          
          const completedChapters = newChapters.filter(c => c.completed).length;
          const totalChapters = newChapters.length;
          const progress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
          
          return { ...subject, chapters: newChapters, progress };
        }
        return subject;
      })
    );
  };

  const overallProgress = subjects.length > 0 
    ? Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)
    : 0;


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Syllabus Tracker</h1>
        <p className="text-text-secondary dark:text-text-secondary-dark mt-1">
          Stay on top of your subjects and chapters.
        </p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-primary dark:text-primary-light">{overallProgress}%</span>
          <ProgressBar progress={overallProgress} className="h-3" />
        </div>
        <p className="text-sm text-text-secondary dark:text-text-secondary-dark mt-2">
          {100 - overallProgress}% Remaining to complete your syllabus. Keep going!
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject.name} subject={subject} onToggleChapter={handleToggleChapter} />
        ))}
      </div>
    </div>
  );
};

export default Syllabus;