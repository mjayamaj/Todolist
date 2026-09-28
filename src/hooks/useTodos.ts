import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Todo,
  NewTodoInput,
  UpdateTodoInput,
  StatusFilter,
  PriorityFilter,
  SortOption,
  SortOrder,
  TodoStats,
} from '../types/todo';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage';
import { isOverdue } from '../utils/dates';

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `todo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodosFromStorage());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Persist to localStorage whenever todos change
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  // Add new task
  const addTodo = useCallback((input: NewTodoInput): Todo => {
    const trimmedTitle = input.title.trim();
    if (!trimmedTitle) {
      throw new Error('Task title cannot be empty');
    }

    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: generateId(),
      title: trimmedTitle,
      description: input.description?.trim() || undefined,
      priority: input.priority,
      dueDate: input.dueDate || undefined,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  // Update existing task
  const updateTodo = useCallback((id: string, updates: UpdateTodoInput) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;
        const newTitle = updates.title !== undefined ? updates.title.trim() : todo.title;
        if (!newTitle) {
          throw new Error('Task title cannot be empty');
        }
        return {
          ...todo,
          ...updates,
          title: newTitle,
          description:
            updates.description !== undefined
              ? updates.description.trim() || undefined
              : todo.description,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  // Toggle complete / incomplete
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Delete task
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Clear all completed tasks
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  // Compute stats
  const stats: TodoStats = useMemo(() => {
    let active = 0;
    let completed = 0;
    let overdue = 0;

    for (const todo of todos) {
      if (todo.completed) {
        completed++;
      } else {
        active++;
        if (isOverdue(todo.dueDate, todo.completed)) {
          overdue++;
        }
      }
    }

    return {
      total: todos.length,
      active,
      completed,
      overdue,
    };
  }, [todos]);

  // Filtered and sorted tasks
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        // Status filter
        if (statusFilter === 'active' && todo.completed) return false;
        if (statusFilter === 'completed' && !todo.completed) return false;

        // Priority filter
        if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

        // Search query (case-insensitive against title and description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = todo.title.toLowerCase().includes(q);
          const descMatch = todo.description?.toLowerCase().includes(q) ?? false;
          if (!titleMatch && !descMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'dueDate': {
            // Tasks without due dates placed at the end
            if (!a.dueDate && !b.dueDate) comparison = 0;
            else if (!a.dueDate) comparison = 1;
            else if (!b.dueDate) comparison = -1;
            else comparison = a.dueDate.localeCompare(b.dueDate);
            break;
          }
          case 'priority': {
            const weights = { high: 3, medium: 2, low: 1 };
            comparison = weights[b.priority] - weights[a.priority];
            break;
          }
          case 'title': {
            comparison = a.title.localeCompare(b.title);
            break;
          }
          case 'createdAt':
          default: {
            comparison = a.createdAt.localeCompare(b.createdAt);
            break;
          }
        }

        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [todos, statusFilter, priorityFilter, searchQuery, sortBy, sortOrder]);

  return {
    todos,
    filteredTodos,
    stats,
    statusFilter,
    priorityFilter,
    searchQuery,
    sortBy,
    sortOrder,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setTodos,
  };
}
