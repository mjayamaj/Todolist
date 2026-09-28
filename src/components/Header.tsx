import React from 'react';
import { CheckCircle2, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <CheckCircle2 className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                TaskFlow
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Sparkles className="w-3 h-3" /> Focus
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {todayFormatted}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition focus-ring"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
