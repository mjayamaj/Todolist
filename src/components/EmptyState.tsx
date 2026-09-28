import React from 'react';
import { ClipboardList, SearchX, CheckCircle2 } from 'lucide-react';
import { StatusFilter, PriorityFilter } from '../types/todo';

interface EmptyStateProps {
  totalTasksCount: number;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  searchQuery: string;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  totalTasksCount,
  statusFilter,
  priorityFilter,
  searchQuery,
  onClearFilters,
}) => {
  if (totalTasksCount === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <ClipboardList className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No tasks yet
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Start your day with clarity. Use the form above to add your first task and stay organized.
        </p>
      </div>
    );
  }

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
        {searchQuery ? <SearchX className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
        No matching tasks found
      </h3>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        {searchQuery
          ? `We couldn't find any tasks matching "${searchQuery}".`
          : statusFilter === 'completed'
          ? 'No completed tasks yet. Finish a task to see it here!'
          : statusFilter === 'active'
          ? 'All caught up! No active tasks pending.'
          : 'No tasks match your selected filter criteria.'}
      </p>

      {hasActiveFilters && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition focus-ring"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
