import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('TaskFlow To-Do List Application', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  // FEATURE 1: TASK MANAGEMENT
  describe('Feature 1: Task Management', () => {
    it('adds a new task when valid input is submitted', async () => {
      const user = userEvent.setup();
      render(<App />);

      const titleInput = screen.getByLabelText(/new task title/i);
      const submitButton = screen.getByRole('button', { name: /add task/i });

      await user.type(titleInput, 'Buy groceries for the week');
      await user.click(submitButton);

      // Verify the new task appears in the list
      expect(screen.getByText('Buy groceries for the week')).toBeInTheDocument();
      // Input should be cleared
      expect(titleInput).toHaveValue('');
    });

    it('validates task input and prevents adding empty or whitespace-only tasks', async () => {
      const user = userEvent.setup();
      render(<App />);

      const titleInput = screen.getByLabelText(/new task title/i);
      const submitButton = screen.getByRole('button', { name: /add task/i });

      // Attempt empty submission
      await user.click(submitButton);
      expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task title/i);

      // Attempt whitespace-only submission
      await user.type(titleInput, '   ');
      await user.click(submitButton);
      expect(screen.getByRole('alert')).toHaveTextContent(/please enter a task title/i);
    });

    it('marks a task complete and incomplete', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Find the first task checkbox
      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];
      const initialChecked = firstCheckbox.getAttribute('aria-checked') === 'true';

      await user.click(firstCheckbox);
      expect(firstCheckbox.getAttribute('aria-checked')).toBe(String(!initialChecked));

      // Toggle back
      await user.click(firstCheckbox);
      expect(firstCheckbox.getAttribute('aria-checked')).toBe(String(initialChecked));
    });

    it('edits an existing task and saves updates', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Find edit button for first task
      const editButtons = screen.getAllByLabelText(/edit task/i);
      await user.click(editButtons[0]);

      // Form should have edit input
      const editInput = screen.getByLabelText(/edit task title/i);
      await user.clear(editInput);
      await user.type(editInput, 'Renamed Task Title');

      const saveButton = screen.getByRole('button', { name: /save changes/i });
      await user.click(saveButton);

      expect(screen.getByText('Renamed Task Title')).toBeInTheDocument();
    });

    it('deletes a task from the list', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Create a unique task to delete
      const titleInput = screen.getByLabelText(/new task title/i);
      await user.type(titleInput, 'Temporary Task To Be Deleted');
      await user.click(screen.getByRole('button', { name: /add task/i }));

      expect(screen.getByText('Temporary Task To Be Deleted')).toBeInTheDocument();

      // Click delete button for this task
      const deleteButton = screen.getByLabelText(/delete task "Temporary Task To Be Deleted"/i);
      await user.click(deleteButton);

      expect(screen.queryByText('Temporary Task To Be Deleted')).not.toBeInTheDocument();
    });
  });

  // FEATURE 2: DUE DATES & PRIORITY
  describe('Feature 2: Due Dates & Priority', () => {
    it('creates a task with specific priority and due date', async () => {
      const user = userEvent.setup();
      render(<App />);

      const titleInput = screen.getByLabelText(/new task title/i);
      await user.type(titleInput, 'High Priority Urgent Task');

      // Select priority
      const prioritySelect = screen.getByLabelText(/task priority/i);
      await user.selectOptions(prioritySelect, 'high');

      // Set due date
      const dueDateInput = screen.getByLabelText(/task due date/i);
      await user.type(dueDateInput, '2026-11-20');

      await user.click(screen.getByRole('button', { name: /add task/i }));

      expect(screen.getByText('High Priority Urgent Task')).toBeInTheDocument();
      // Should show high priority badge
      const highBadges = screen.getAllByTestId('priority-badge-high');
      expect(highBadges.length).toBeGreaterThan(0);
    });

    it('visually highlights overdue tasks with warning alert and styling', () => {
      render(<App />);

      // The default sample tasks include an overdue task
      const overdueHighlight = screen.getAllByTestId('overdue-highlight');
      expect(overdueHighlight.length).toBeGreaterThan(0);
      expect(overdueHighlight[0]).toHaveTextContent(/overdue/i);
    });
  });

  // FEATURE 3: FILTER & SEARCH
  describe('Feature 3: Filter & Search', () => {
    it('filters tasks by status: All, Active, and Completed', async () => {
      const user = userEvent.setup();
      render(<App />);

      // Click "Active" tab
      const activeTab = screen.getByRole('tab', { name: /active/i });
      await user.click(activeTab);

      // All visible tasks should be incomplete
      let checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((cb) => {
        expect(cb.getAttribute('aria-checked')).toBe('false');
      });

      // Click "Completed" tab
      const completedTab = screen.getByRole('tab', { name: /completed/i });
      await user.click(completedTab);

      // All visible tasks should be completed
      checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((cb) => {
        expect(cb.getAttribute('aria-checked')).toBe('true');
      });

      // Return to "All"
      const allTab = screen.getByRole('tab', { name: /all/i });
      await user.click(allTab);
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(1);
    });

    it('filters tasks by priority dropdown', async () => {
      const user = userEvent.setup();
      render(<App />);

      const priorityFilterSelect = screen.getByLabelText(/filter tasks by priority/i);
      await user.selectOptions(priorityFilterSelect, 'high');

      // Check that all visible priority badges are high
      const badges = screen.getAllByTestId(/^priority-badge-/);
      badges.forEach((badge) => {
        expect(badge).toHaveAttribute('data-testid', 'priority-badge-high');
      });
    });

    it('filters tasks dynamically in real time as the user types in the search box', async () => {
      const user = userEvent.setup();
      render(<App />);

      const searchInput = screen.getByPlaceholderText(/search tasks by title or description/i);

      // Search for specific word from initial sample tasks
      await user.type(searchInput, 'retrospective');

      expect(screen.getByText(/prepare slides for sprint retrospective meeting/i)).toBeInTheDocument();
      expect(screen.queryByText(/optimize bundle size/i)).not.toBeInTheDocument();

      // Clear search
      const clearSearchBtn = screen.getByLabelText(/clear search input/i);
      await user.click(clearSearchBtn);

      // Other tasks reappear
      expect(screen.getByText(/optimize bundle size/i)).toBeInTheDocument();
    });
  });
});
