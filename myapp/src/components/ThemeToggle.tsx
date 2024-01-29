// src/components/ThemeToggle.tsx
'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <IconButton
      aria-label='toggle theme'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <LightModeIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <DarkModeIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  );
}
