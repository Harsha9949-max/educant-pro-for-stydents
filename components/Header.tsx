import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SUBJECTS, MOCK_EXAMS } from '../constants';
import { Page } from '../types';
import { SearchIcon } from './icons/Icons';

interface HeaderProps {
  setActivePage: (page: Page) => void;
}

interface SearchResult {
  type: 'Syllabus' | 'Exam' | 'Chapter';
  name: string;
  page: Page;
  context?: string;
}

const Header: React.FC<HeaderProps> = ({ setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search subjects and chapters
    MOCK_SUBJECTS.forEach(subject => {
      if (subject.name.toLowerCase().includes(term)) {
        newResults.push({ type: 'Syllabus', name: subject.name, page: 'syllabus' });
      }
      subject.chapters.forEach(chapter => {
        if (chapter.name.toLowerCase().includes(term)) {
          newResults.push({ type: 'Chapter', name: chapter.name, context: subject.name, page: 'syllabus' });
        }
      });
    });

    // Search exams
    MOCK_EXAMS.forEach(exam => {
      if (exam.subject.toLowerCase().includes(term)) {
        newResults.push({ type: 'Exam', name: exam.subject, page: 'exams' });
      }
    });

    setResults(newResults);
  }, [searchTerm]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResultClick = (page: Page) => {
    setActivePage(page);
    setSearchTerm('');
    setResults([]);
    setIsFocused(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-20 h-16 bg-card dark:bg-card-dark shadow-md z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="text-xl font-bold text-text-primary dark:text-text-primary-dark md:hidden">
        EDUCANT <span className="text-primary">PRO</span>
      </div>
      <div className="relative w-full max-w-xs ml-auto" ref={searchContainerRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search syllabus, exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full pl-10 pr-4 py-2 bg-background dark:bg-background-dark rounded-full border-2 border-transparent focus:border-primary focus:ring-0 transition-all"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-text-secondary-dark pointer-events-none" />
        </div>
        
        {isFocused && (searchTerm.length > 1) && (
          <div className="absolute top-full mt-2 w-full bg-card dark:bg-card-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fadeIn">
            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto">
                {results.map((result, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleResultClick(result.page)}
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors"
                    >
                      <p className="font-semibold text-text-primary dark:text-text-primary-dark">{result.name}</p>
                      <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                        {result.type} {result.context && `in ${result.context}`}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
                <div className="p-4 text-center text-text-secondary dark:text-text-secondary-dark">No results found for "{searchTerm}".</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
