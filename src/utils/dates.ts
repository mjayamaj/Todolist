/**
 * Converts a Date object or YYYY-MM-DD string to start of day in local time.
 */
export function parseLocalDate(dateStr: string): Date {
  // If format is YYYY-MM-DD, parse parts manually to avoid UTC shift
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  }
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a task is overdue:
 * Has a due date, is not completed, and due date is strictly before today's start of day.
 */
export function isOverdue(dueDate?: string, completed: boolean = false): boolean {
  if (!dueDate || completed) return false;
  
  const due = parseLocalDate(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return due.getTime() < today.getTime();
}

/**
 * Checks if a task is due today
 */
export function isDueToday(dueDate?: string): boolean {
  if (!dueDate) return false;
  return dueDate === getTodayString();
}

/**
 * Returns a human-friendly label for a due date
 */
export function formatDueDate(dueDate?: string): string {
  if (!dueDate) return '';

  const due = parseLocalDate(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < -1) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays > 1 && diffDays <= 6) return `In ${diffDays} days`;

  // Standard short date e.g. "Oct 15" or "Oct 15, 2027"
  const isThisYear = due.getFullYear() === today.getFullYear();
  return due.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: isThisYear ? undefined : 'numeric',
  });
}
