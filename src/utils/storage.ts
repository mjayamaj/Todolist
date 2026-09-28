import { Todo } from '../types/todo';
import { getTodayString } from './dates';

const STORAGE_KEY = 'taskflow_todos_v1';

// Initial starter tasks to demonstrate all features out-of-the-box
const getInitialDefaultTodos = (): Todo[] => {
  const today = new Date();
  
  // Yesterday's date for an overdue task
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // In 3 days
  const later = new Date(today);
  later.setDate(today.getDate() + 3);
  const laterStr = later.toISOString().split('T')[0];

  return [
    {
      id: 'task-1',
      title: 'Review team pull requests and code review comments',
      description: 'Check GitHub notifications and verify integration test coverage.',
      completed: false,
      priority: 'high',
      dueDate: yesterdayStr, // Demonstrates OVERDUE visual highlight
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'task-2',
      title: 'Prepare slides for sprint retrospective meeting',
      description: 'Highlight key achievements, roadmap updates, and velocity metrics.',
      completed: false,
      priority: 'medium',
      dueDate: getTodayString(), // Due today
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'task-3',
      title: 'Plan weekend hiking trip itinerary',
      description: 'Pack essentials and check weather forecast.',
      completed: true,
      priority: 'low',
      dueDate: tomorrowStr,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-4',
      title: 'Optimize bundle size and dynamic imports in Vite build',
      description: 'Analyze dist chunks and configure vendor chunk splitting.',
      completed: false,
      priority: 'high',
      dueDate: laterStr,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

export function loadTodosFromStorage(): Todo[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      const defaults = getInitialDefaultTodos();
      saveTodosToStorage(defaults);
      return defaults;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return getInitialDefaultTodos();
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return getInitialDefaultTodos();
  }
}

export function saveTodosToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}
