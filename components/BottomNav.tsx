
import React from 'react';
import { Page } from '../types';

interface NavItem {
  id: Page;
  label: string;
  icon: React.FC<{ className?: string }>;
}

interface BottomNavProps {
  items: NavItem[];
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ items, activePage, setActivePage }) => {
  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card dark:bg-card-dark/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 rounded-t-2xl">
        <div className="flex justify-around items-center h-16">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center w-full transition-all duration-300 ease-in-out group ${
                activePage === item.id ? 'text-primary' : 'text-text-secondary dark:text-text-secondary-dark hover:text-primary'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1 transition-transform group-hover:scale-110" />
              <span className={`text-xs font-medium ${activePage === item.id ? 'opacity-100' : 'opacity-0'} h-0 -translate-y-1 group-hover:opacity-100 group-hover:h-auto group-hover:translate-y-0 transition-all`}>
                {activePage === item.id && item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Side Nav */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen bg-card dark:bg-card-dark w-20 flex-col items-center justify-center shadow-lg z-50">
        <div className="text-primary text-2xl font-bold mb-10">
          E<span className="text-secondary">P</span>
        </div>
        <div className="flex flex-col items-center space-y-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 ease-in-out group ${
                activePage === item.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-text-secondary dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary'
              }`}
              title={item.label}
            >
              <item.icon className="w-7 h-7" />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-card dark:bg-card-dark text-text-primary dark:text-text-primary-dark rounded-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
