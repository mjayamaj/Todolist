import React from 'react';
import { Todo, UpdateTodoInput, StatusFilter, PriorityFilter } from '../types/todo';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { Trash2 } from 'lucide-react';

interface TaskListProps {
  todos: Todo[];
  totalTasksCount: number;
  completedTasksCount: number;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  searchQuery: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
  onClearCompleted: () => void;
  onClearFilters: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  todos,
  totalTasksCount,
  completedTasksCount,
  statusFilter,
  priorityFilter,
  searchQuery,
  onToggle,
  onDelete,
  onUpdate,
  onClearCompleted,
  onClearFilters,
}) => {
  if (todos.length === 0) {
    return (
      <EmptyState
        totalTasksCount={totalTasksCount}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        searchQuery={searchQuery}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Header bar of the list */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>

        {completedTasksCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            aria-label="Clear all completed tasks"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear completed ({completedTasksCount})</span>
          </button>
        )}
      </div>

      {/* Task items list */}
      <div role="list" className="space-y-2.5" aria-label="Task list">
        {todos.map((todo) => (
          <div key={todo.id} role="listitem">
            <TaskItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
