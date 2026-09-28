import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTodos } from './useTodos';

describe('useTodos hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('initializes with default tasks and saves to localStorage', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos.length).toBeGreaterThan(0);
    expect(window.localStorage.getItem('taskflow_todos_v1')).toBeTruthy();
  });

  it('Feature 1: adds a new task with validation', () => {
    const { result } = renderHook(() => useTodos());
    const initialCount = result.current.todos.length;

    act(() => {
      result.current.addTodo({
        title: 'New Unit Test Task',
        description: 'Test description',
        priority: 'high',
        dueDate: '2026-12-31',
      });
    });

    expect(result.current.todos.length).toBe(initialCount + 1);
    expect(result.current.todos[0].title).toBe('New Unit Test Task');
    expect(result.current.todos[0].priority).toBe('high');
    expect(result.current.todos[0].completed).toBe(false);

    // Validation: cannot add empty task
    expect(() => {
      act(() => {
        result.current.addTodo({
          title: '   ',
          priority: 'low',
        });
      });
    }).toThrow('Task title cannot be empty');
  });

  it('Feature 1: toggles completion, updates, and deletes tasks', () => {
    const { result } = renderHook(() => useTodos());
    const targetId = result.current.todos[0].id;
    const initialCompleted = result.current.todos[0].completed;

    // Toggle completion
    act(() => {
      result.current.toggleTodo(targetId);
    });
    expect(result.current.todos[0].completed).toBe(!initialCompleted);

    // Update task
    act(() => {
      result.current.updateTodo(targetId, {
        title: 'Updated Title',
        priority: 'low',
      });
    });
    expect(result.current.todos[0].title).toBe('Updated Title');
    expect(result.current.todos[0].priority).toBe('low');

    // Delete task
    act(() => {
      result.current.deleteTodo(targetId);
    });
    expect(result.current.todos.some((t) => t.id === targetId)).toBe(false);
  });

  it('Feature 3: filters tasks by status and priority', () => {
    const { result } = renderHook(() => useTodos());

    // Filter by active
    act(() => {
      result.current.setStatusFilter('active');
    });
    result.current.filteredTodos.forEach((todo) => {
      expect(todo.completed).toBe(false);
    });

    // Filter by completed
    act(() => {
      result.current.setStatusFilter('completed');
    });
    result.current.filteredTodos.forEach((todo) => {
      expect(todo.completed).toBe(true);
    });

    // Filter by priority
    act(() => {
      result.current.setStatusFilter('all');
      result.current.setPriorityFilter('high');
    });
    result.current.filteredTodos.forEach((todo) => {
      expect(todo.priority).toBe('high');
    });
  });

  it('Feature 3: filters tasks live by search query', () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo({
        title: 'UniqueSearchTerm123',
        priority: 'low',
      });
      result.current.setSearchQuery('uniquesearchterm123');
    });

    expect(result.current.filteredTodos.length).toBe(1);
    expect(result.current.filteredTodos[0].title).toBe('UniqueSearchTerm123');
  });
});
