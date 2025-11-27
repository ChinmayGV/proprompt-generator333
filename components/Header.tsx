import React from 'react';
import { SparklesIcon, MoonIcon, SunIcon } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg text-white shadow-lg shadow-primary-500/30">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              ProPrompt AI
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;