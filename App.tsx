import React, { useState, useEffect, useMemo } from 'react';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Syllabus from './pages/Syllabus';
import Exams from './pages/Exams';
import StudyBuddy from './pages/StudyBuddy';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { Page, Theme, User } from './types';
import { MOCK_USER } from './constants';
import { HomeIcon, BookOpenIcon, CalendarIcon, SparklesIcon, UserCircleIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleLogin = (username: string, dob: string) => {
    // In a real app, you'd verify credentials here.
    // For this demo, we'll just check if fields are non-empty and create the user.
    if (username && dob) {
      setUser({
        ...MOCK_USER,
        name: username,
      });
      setActivePage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const navItems = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpenIcon },
    { id: 'exams', label: 'Exams', icon: CalendarIcon },
    { id: 'study-buddy', label: 'Study Buddy', icon: SparklesIcon },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
  ], []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user!} setActivePage={setActivePage} />;
      case 'syllabus':
        return <Syllabus />;
      case 'exams':
        return <Exams />;
      case 'study-buddy':
        return <StudyBuddy />;
      case 'rewards':
        // This is not in nav, accessed from dashboard or elsewhere
        return <Rewards />;
      case 'profile':
        return <Profile user={user!} onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />;
      default:
        return <Dashboard user={user!} setActivePage={setActivePage} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="h-full bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark font-sans flex flex-col">
      <Header setActivePage={setActivePage} />
      <main className="flex-grow pt-16 pb-20 md:pb-0 md:pl-20 overflow-y-auto overscroll-contain">
        <div className="p-4 sm:p-6 lg:p-8 animate-fadeIn h-full">
          {renderPage()}
        </div>
      </main>
      <BottomNav 
        items={navItems}
        activePage={activePage} 
        setActivePage={setActivePage} 
      />
    </div>
  );
};

export default App;
