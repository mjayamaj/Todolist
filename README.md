# TaskFlow — Modern To-Do & Task Manager

A responsive, accessible, and modern To-Do List web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**, with offline persistence via `localStorage` and a comprehensive test suite powered by **Vitest** and **React Testing Library**.

---

## ✨ Features

### 1. Task Management
- **Add Tasks**: Create tasks with titles, optional descriptions, priorities, and due dates. Includes input validation to prevent empty tasks.
- **Edit Tasks**: Inline editing mode for instant title, description, priority, and date adjustments.
- **Delete Tasks**: Remove individual tasks or clear all completed tasks in one click.
- **Completion Toggle**: Accessible checkbox with strikethrough styling and status tracking.

### 2. Due Dates & Priority
- **Priority Levels**: Color-coded badges for **Low** (Emerald), **Medium** (Amber), and **High** (Rose) priorities.
- **Due Date Scheduling**: Date picker with quick presets (*Today*, *Tomorrow*, or custom calendar date).
- **Overdue Highlighting**: Automatic visual alert badges and subtle warning border highlights for tasks that are past their due date and not yet completed.

### 3. Live Filter & Search
- **Status Filter**: Switch between **All**, **Active**, and **Completed** tasks with live count badges.
- **Priority Filter**: Filter down to High, Medium, or Low priority items.
- **Instant Search**: Real-time filtering as you type into the search bar across both titles and descriptions.
- **Sorting Options**: Sort tasks by Date Created, Due Date, Priority, or Title (A-Z).

### Additional Highlights
- **localStorage Persistence**: All tasks and user preferences (including theme mode) persist automatically across browser refreshes.
- **Dark Mode**: Built-in toggle between light and dark themes with system preference detection.
- **Accessible & Responsive**: Fully keyboard navigable, semantic HTML, ARIA attributes, and responsive design for mobile and desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + `@testing-library/user-event` + jsdom

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
Clone or navigate to the repository directory:
```bash
cd "Todo list"
npm install
```
*(On Windows PowerShell, use `npm.cmd install` if script execution policies apply.)*

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Running Unit and Integration Tests
```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Type Checking & Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```
The compiled production bundle will be generated in the `dist/` directory. You can preview it with:
```bash
npm run preview
```

---

## 📁 Project Structure

```
Todo list/
├── AGENT.md                 # Rules and guidelines for AI agents working in this repo
├── README.md                # Project documentation and quickstart
├── package.json             # Scripts and dependencies
├── tailwind.config.js       # Tailwind design tokens and theme extensions
├── vite.config.ts           # Vite and Vitest configuration
├── src/
│   ├── types/               # TypeScript data models and interfaces
│   │   └── todo.ts
│   ├── utils/               # Date utilities and localStorage helpers
│   │   ├── dates.ts
│   │   └── storage.ts
│   ├── hooks/               # Custom state and persistence hook
│   │   ├── useTodos.ts
│   │   └── useTodos.test.ts
│   ├── components/          # Small, reusable React UI components
│   │   ├── Header.tsx
│   │   ├── TaskStats.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskFilter.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   └── EmptyState.tsx
│   ├── test/                # Vitest test setup and integration suites
│   │   ├── setup.ts
│   │   └── App.test.tsx
│   ├── App.tsx              # Main application component
│   ├── index.css            # Tailwind directives and utility classes
│   └── main.tsx             # React root mount entry point
```

---

## 🤖 AI Agent Guidelines
See [AGENT.md](./AGENT.md) for coding conventions, constraints, and architecture guidelines when collaborating with AI coding assistants on this repository.
