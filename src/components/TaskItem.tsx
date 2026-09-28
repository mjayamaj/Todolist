import React, { useState } from 'react';
import { Todo, Priority, UpdateTodoInput } from '../types/todo';
import { isOverdue, formatDueDate } from '../utils/dates';
import {
  Check,
  Calendar,
  AlertTriangle,
  Edit2,
  Trash2,
  X,
  Save,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface TaskItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editError, setEditError] = useState<string | null>(null);

  const overdue = isOverdue(todo.dueDate, todo.completed);

  const handleStartEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setEditError(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditError(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError('Task title cannot be empty');
      return;
    }

    onUpdate(todo.id, {
      title: trimmed,
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  // Priority badge styling
  const priorityConfig = {
    high: {
      label: 'High',
      badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
    },
    medium: {
      label: 'Medium',
      badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    },
    low: {
      label: 'Low',
      badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    },
  }[todo.priority];

  if (isEditing) {
    return (
      <form
        onSubmit={handleSaveEdit}
        className="bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-600 rounded-2xl p-4 shadow-md space-y-3 transition"
      >
        <div>
          <label htmlFor={`edit-title-${todo.id}`} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Edit Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            id={`edit-title-${todo.id}`}
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (editError) setEditError(null);
            }}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus-ring"
            autoFocus
          />
          {editError && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {editError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`edit-desc-${todo.id}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            Description
          </label>
          <input
            id={`edit-desc-${todo.id}`}
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus-ring"
            placeholder="Add details..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label htmlFor={`edit-priority-${todo.id}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Priority
            </label>
            <select
              id={`edit-priority-${todo.id}`}
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus-ring"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor={`edit-duedate-${todo.id}`} className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Due Date
            </label>
            <input
              id={`edit-duedate-${todo.id}`}
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus-ring"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleCancelEdit}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus-ring"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm focus-ring"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      data-testid={`todo-item-${todo.id}`}
      className={`group relative flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-75'
          : overdue
          ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/70 shadow-sm shadow-rose-500/5 ring-1 ring-rose-400/20'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Checkbox button */}
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? `Mark "${todo.title}" incomplete` : `Mark "${todo.title}" complete`}
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-lg border flex items-center justify-center transition-colors focus-ring ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500 bg-white dark:bg-slate-800'
        }`}
      >
        {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm font-semibold break-words leading-snug transition-all ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {todo.title}
          </p>

          {/* Action buttons (Edit & Delete) */}
          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
            <button
              type="button"
              onClick={handleStartEdit}
              aria-label={`Edit task "${todo.title}"`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition focus-ring"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete task "${todo.title}"`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition focus-ring"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task description */}
        {todo.description && (
          <p
            className={`mt-1 text-xs break-words leading-relaxed ${
              todo.completed
                ? 'line-through text-slate-400 dark:text-slate-600'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {todo.description}
          </p>
        )}

        {/* Meta tags: Priority & Due Date */}
        <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs">
          {/* Priority Badge */}
          <span
            data-testid={`priority-badge-${todo.priority}`}
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priorityConfig.badgeClass}`}
          >
            {priorityConfig.label} Priority
          </span>

          {/* Due Date Indicator */}
          {todo.dueDate && (
            <span
              data-testid="due-date-badge"
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                todo.completed
                  ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800'
                  : overdue
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900 font-semibold'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {overdue && !todo.completed ? (
                <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              ) : (
                <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
              )}
              <span>{formatDueDate(todo.dueDate)}</span>
            </span>
          )}

          {/* Overdue visual alert banner */}
          {overdue && !todo.completed && (
            <span
              data-testid="overdue-highlight"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900"
            >
              <Clock className="w-3 h-3" />
              Overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
