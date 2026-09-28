# AGENT.md

## Project Overview
TaskFlow is a client-side modern To-Do list web application built with React 18, TypeScript, Tailwind CSS, and Vite. It provides full task lifecycle management (create, edit, delete, toggle completion), priority levels with due dates and overdue highlighting, dynamic search and filtering, and automatic persistence using browser `localStorage` without requiring any backend.

## Tech Stack & Versions
- **Core**: React `^18.3.1`, React DOM `^18.3.1`
- **Language**: TypeScript `^5.6.3` with strict mode enabled
- **Build Tool / Dev Server**: Vite `^5.4.11` with `@vitejs/plugin-react`
- **Styling**: Tailwind CSS `^3.4.15`, PostCSS `^8.4.49`, Autoprefixer `^10.4.20`
- **Icons**: Lucide React `^0.468.0`
- **Testing**: Vitest `^2.1.8`, `@testing-library/react` `^16.1.0`, `@testing-library/jest-dom` `^6.6.3`, `@testing-library/user-event` `^14.5.2`, `jsdom` `^25.0.1`

## Setup & Run Commands
All commands should be executed from the project root. On Windows PowerShell, use `npm.cmd` if script execution is restricted.

- **Install dependencies**: `npm install` (or `npm.cmd install`)
- **Start development server**: `npm run dev` (runs Vite dev server on `http://localhost:5173`)
- **Run tests**: `npm run test` (single-pass test run with Vitest)
- **Run tests in watch mode**: `npm run test:watch`
- **Typecheck / Lint**: `npm run lint` (`tsc --noEmit`)
- **Production Build**: `npm run build` (`tsc && vite build`)
- **Preview Production Build**: `npm run preview`

## Folder Structure
```
Todo list/
├── .gitignore               # Git ignored patterns
├── AGENT.md                 # Agent guidance and conventions (this file)
├── README.md                # User setup and documentation
├── index.html               # Main HTML entry with typography and SEO metadata
├── package.json             # Scripts and dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS theme and palette configuration
├── tsconfig.json            # Client TypeScript configuration
├── tsconfig.node.json       # Build tool TypeScript configuration
├── vite.config.ts           # Vite and Vitest configuration
└── src/
    ├── main.tsx             # React application DOM root mount
    ├── App.tsx              # Main application layout and coordinator
    ├── index.css            # Tailwind directives and base design system rules
    ├── types/
    │   └── todo.ts          # Core domain models, interfaces, and filter types
    ├── utils/
    │   ├── storage.ts       # Safe localStorage read/write helpers and defaults
    │   └── dates.ts         # Date formatting, comparison, and overdue calculation
    ├── hooks/
    │   ├── useTodos.ts      # Custom hook managing todo state, filtering, and persistence
    │   └── useTodos.test.ts # Unit tests for useTodos hook
    ├── components/
    │   ├── Header.tsx       # App bar with branding and dark/light mode toggle
    │   ├── TaskStats.tsx    # Summary metrics cards and visual progress bar
    │   ├── TaskForm.tsx     # New task input form with validation and date presets
    │   ├── TaskFilter.tsx   # Filter tabs (All/Active/Completed), priority selector, and live search
    │   ├── TaskItem.tsx     # Individual task card with edit mode, overdue badge, priority tag
    │   ├── TaskList.tsx     # List renderer and clear completed actions
    │   └── EmptyState.tsx   # Contextual empty state illustrations and messages
    └── test/
        ├── setup.ts         # Vitest test setup and localStorage/mediaQuery mocks
        └── App.test.tsx     # Comprehensive component tests covering the 3 core features
```

## Coding Conventions
1. **TypeScript Strictness**:
   - Strict mode is enabled (`strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`).
   - Do not use `any`; use strongly typed interfaces in `src/types/todo.ts`.
   - All component props must be explicitly typed with TypeScript interfaces.
2. **Component Architecture**:
   - Keep components modular, focused, and small.
   - Separate state and persistence logic into custom hooks (`src/hooks/useTodos.ts`).
   - Use semantic HTML (`<main>`, `<header>`, `<section>`, `<form>`, `<button>`, `<label>`).
   - Ensure complete accessibility: accessible labels (`aria-label`, `aria-checked`, `role="checkbox"`, `role="tab"`), keyboard navigation, and proper contrast ratios.
3. **Styling with Tailwind CSS**:
   - Use Tailwind utility classes for consistent spacing, colors, and responsive layouts.
   - Support both light and dark themes using the `dark:` variant.
   - Use custom focus ring utility (`focus-ring`) on all interactive elements.
4. **Naming Conventions**:
   - PascalCase for React components and files (`TaskItem.tsx`).
   - camelCase for functions, hooks (`useTodos.ts`), utilities, and variable names.
   - UPPER_SNAKE_CASE for constant values (e.g. `STORAGE_KEY`).

## Testing Expectations
- **Framework**: Vitest with React Testing Library (`@testing-library/react`) and `@testing-library/user-event`.
- **Scope**:
  - Test custom hooks (`src/hooks/useTodos.test.ts`) for state transitions and persistence.
  - Test component interactions (`src/test/App.test.tsx`) for user workflows: adding tasks, validation errors, editing, toggling completion, deleting, priority tags, overdue alerts, and live search filtering.
- **Rules**:
  - Never modify tests solely to make a broken implementation pass. Fix the underlying code.
  - Always run `npm run test` and `npm run lint` before finishing any task.

## Rules for AI Agents
1. **Make Small, Focused Changes**: Keep modifications surgical and explain the rationale for edits.
2. **Do Not Add Dependencies Without Asking**: Only use the pre-configured dependencies. If an additional library is strictly required, ask the user first.
3. **Do Not Modify Existing Tests to Force Passes**: If a test fails, examine why the application logic deviated and resolve the application bug.
4. **Run Verification Before Finishing**: Always ensure `npm run lint` and `npm run test` pass with zero errors before handing work back to the user.
5. **Preserve User Accessibility & Responsiveness**: Test keyboard navigation, touch targets, and responsive breakpoints on any UI change.

## Core Features (Do Not Break)
1. **Task Management**:
   - Add task with validation (empty or whitespace-only titles must be rejected).
   - Edit existing task title, description, priority, and due date.
   - Delete task.
   - Mark task complete / incomplete (toggles visual styling and strike-through).
2. **Due Dates & Priority**:
   - Optional due date picker with quick presets (Today, Tomorrow).
   - Priority selection: Low, Medium, High with distinct color badges.
   - Overdue visual highlighting: tasks with due dates before today that are not completed must be visually highlighted with an overdue warning badge and accent styling.
3. **Filter & Search**:
   - Status filters: All, Active, Completed tabs with badge counts.
   - Priority filter: All, Low, Medium, High.
   - Live text search: instant real-time filtering across titles and descriptions as the user types.
