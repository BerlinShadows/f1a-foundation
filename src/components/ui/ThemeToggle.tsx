'use client';

import { useTheme } from '@/hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        padding: '0.25rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
      }}
    >
      {theme === 'dark' ? (
        <SunIcon style={{ width: '18px', height: '18px' }} />
      ) : (
        <MoonIcon style={{ width: '18px', height: '18px' }} />
      )}
    </button>
  );
}