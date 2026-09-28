import React, { useState } from 'react';
import { Priority, NewTodoInput } from '../types/todo';
import { Plus, Calendar, AlertCircle, ChevronDown } from 'lucide-react';
import { getTodayString } from '../utils/dates';

interface TaskFormProps {
  onAddTask: (input: NewTodoInput) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Please enter a task title');
      return;
    }

    try {
      onAddTask({
        title: trimmedTitle,
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setErrorMessage(null);
      setIsExpanded(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to add task');
      }
    }
  };

  const setDatePreset = (preset: 'today' | 'tomorrow' | 'clear') => {
    if (preset === 'clear') {
      setDueDate('');
      return;
    }

    const target = new Date();
    if (preset === 'tomorrow') {
      target.setDate(target.getDate() + 1);
    }
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setDueDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500"
      noValidate
    >
      {/* Primary Input Line */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            id="new-task-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done? (e.g., Deploy release v2.0)"
            className={`w-full px-4 py-2.5 rounded-xl border ${
              errorMessage
                ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-400'
                : 'border-slate-200 dark:border-slate-700'
            } bg-slate-50/60 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-ring transition`}
            aria-label="New task title"
            aria-required="true"
            aria-invalid={errorMessage ? 'true' : 'false'}
            aria-describedby={errorMessage ? 'task-error-msg' : undefined}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm shadow-sm shadow-indigo-600/30 transition focus-ring whitespace-nowrap"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Validation Error Banner */}
      {errorMessage && (
        <div
          id="task-error-msg"
          role="alert"
          className="mt-2.5 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Optional details drawer - visible when active or button toggled */}
      <div className={`mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 transition-all ${isExpanded ? 'block' : 'hidden sm:block'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Optional Description */}
          <div className="sm:col-span-6">
            <label htmlFor="new-task-desc" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              id="new-task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, notes, or links..."
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus-ring"
            />
          </div>

          {/* Priority selector */}
          <div className="sm:col-span-3">
            <label htmlFor="new-task-priority" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Priority
            </label>
            <div className="relative">
              <select
                id="new-task-priority"
                aria-label="Task priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-1.5 pr-8 appearance-none rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus-ring font-medium"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Due date */}
          <div className="sm:col-span-3">
            <label htmlFor="new-task-duedate" className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Due Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="new-task-duedate"
                aria-label="Task due date"
                value={dueDate}
                min={getTodayString()}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs focus-ring font-medium"
              />
            </div>
          </div>
        </div>

        {/* Quick Date Presets */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Quick set:
          </span>
          <button
            type="button"
            onClick={() => setDatePreset('today')}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium transition"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setDatePreset('tomorrow')}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium transition"
          >
            Tomorrow
          </button>
          {dueDate && (
            <button
              type="button"
              onClick={() => setDatePreset('clear')}
              className="text-[11px] px-2 py-0.5 rounded-md text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition"
            >
              Clear date
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
