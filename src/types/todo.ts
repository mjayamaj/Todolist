export type Priority = 'low' | 'medium' | 'high';

export type StatusFilter = 'all' | 'active' | 'completed';

export type PriorityFilter = 'all' | Priority;

export type SortOption = 'createdAt' | 'dueDate' | 'priority' | 'title';

export type SortOrder = 'asc' | 'desc';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // Format: YYYY-MM-DD
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type NewTodoInput = {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
};

export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt'>>;

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}
