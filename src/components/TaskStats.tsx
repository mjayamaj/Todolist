import React from 'react';
import { TodoStats } from '../types/todo';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';

interface TaskStatsProps {
  stats: TodoStats;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Tasks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</span>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <Layers className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white" data-testid="stat-total">
              {stats.total}
            </span>
            <span className="text-xs text-slate-500">tasks</span>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Active</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Clock className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400" data-testid="stat-active">
              {stats.active}
            </span>
            <span className="text-xs text-slate-500">pending</span>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Completed</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400" data-testid="stat-completed">
              {stats.completed}
            </span>
            <span className="text-xs text-slate-500">done</span>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div
          className={`border rounded-2xl p-4 shadow-sm transition-colors ${
            stats.overdue > 0
              ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${
                stats.overdue > 0
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Overdue
            </span>
            <div
              className={`p-1.5 rounded-lg ${
                stats.overdue > 0
                  ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold tracking-tight ${
                stats.overdue > 0
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
              data-testid="stat-overdue"
            >
              {stats.overdue}
            </span>
            <span className="text-xs text-slate-500">urgent</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 px-4 shadow-sm flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Overall Progress</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
                role="progressbar"
                aria-valuenow={completionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Overall task completion progress: ${completionPercentage}%`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
