import React from 'react';
import { StatusFilter, PriorityFilter, SortOption, TodoStats } from '../types/todo';
import { Search, X, Filter, ArrowUpDown } from 'lucide-react';

interface TaskFilterProps {
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  priorityFilter: PriorityFilter;
  onPriorityChange: (priority: PriorityFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortByChange: (sortBy: SortOption) => void;
  stats: TodoStats;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
  stats,
}) => {
  const statusTabs: { id: StatusFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: stats.total },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative">
        <label htmlFor="search-tasks-input" className="sr-only">
          Search tasks
        </label>
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="h-4 w-4" aria-hidden="true" />
        </div>
        <input
          id="search-tasks-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title or description..."
          className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-ring shadow-sm transition"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search input"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs & Secondary Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Status Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex items-center p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-xl text-xs font-medium self-start sm:self-auto overflow-x-auto max-w-full"
        >
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap focus-ring ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'bg-slate-300/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Priority Filter and Sort Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="priority-filter-select" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span className="hidden xs:inline">Priority:</span>
            </label>
            <select
              id="priority-filter-select"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value as PriorityFilter)}
              aria-label="Filter tasks by priority"
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium focus-ring shadow-sm"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Sort By Option */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="sort-by-select" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span className="hidden xs:inline">Sort:</span>
            </label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortOption)}
              aria-label="Sort tasks by"
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium focus-ring shadow-sm"
            >
              <option value="createdAt">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
