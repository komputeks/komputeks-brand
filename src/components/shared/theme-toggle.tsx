'use client';

import { useTheme } from './theme-provider';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 border border-white/10">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`rounded-md p-1.5 transition-all duration-300 ${
            theme === value
              ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`}
          aria-label={label}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}