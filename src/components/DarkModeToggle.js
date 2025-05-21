'use client'

import { Sun, Moon } from "lucide-react";

export function DarkModeToggle({ isDark, toggleDark }) {
  return (
    <div className="flex justify-end mb-2">
      <button
        onClick={toggleDark}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
      >
        {isDark ? (
          <Moon className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Sun className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
