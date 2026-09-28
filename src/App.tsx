import React, { useState, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskForm } from './components/TaskForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';

export const App: React.FC = () => {
  const {
    todos,
    filteredTodos,
    stats,
    statusFilter,
    priorityFilter,
    searchQuery,
    sortBy,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery,
    setSortBy,
  } = useTodos();

  // Dark mode state persisted in localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('taskflow_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('taskflow_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('taskflow_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Sticky Header */}
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Statistics Dashboard */}
        <section aria-label="Task Statistics">
          <TaskStats stats={stats} />
        </section>

        {/* Task Creation Form */}
        <section aria-label="Create New Task">
          <TaskForm onAddTask={addTodo} />
        </section>

        {/* Filter, Search & Sort Control Bar */}
        <section aria-label="Filter and Search Tasks">
          <TaskFilter
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            stats={stats}
          />
        </section>

        {/* Task Items List */}
        <section aria-label="Tasks List">
          <TaskList
            todos={filteredTodos}
            totalTasksCount={todos.length}
            completedTasksCount={stats.completed}
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            searchQuery={searchQuery}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onClearCompleted={clearCompleted}
            onClearFilters={handleClearFilters}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>TaskFlow • Built with React 18, TypeScript, Tailwind CSS & Vite</p>
      </footer>
    </div>
  );
};

export default App;
