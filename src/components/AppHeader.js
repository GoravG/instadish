'use client'

import Image from 'next/image';
import { DarkModeToggle } from './DarkModeToggle';

export function AppHeader({ isDark, toggleDark }) {
  return (
    <nav className="flex items-center justify-between px-4 py-2 mb-6 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
      <div className="flex items-center gap-3">
        <Image
          src="/icon.png"
          alt="Restaurant Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <span className="text-lg font-bold text-gray-800 dark:text-gray-100">InstaDish</span>
      </div>
      <DarkModeToggle isDark={isDark} toggleDark={toggleDark} />
    </nav>
  );
}
