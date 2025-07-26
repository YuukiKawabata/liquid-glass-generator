import { Theme } from '@/lib/types';

export const defaultThemes: Theme[] = [
  {
    id: 'light',
    name: 'Light Theme',
    mode: 'light',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
    },
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    mode: 'dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      accent: '#a78bfa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    mode: 'dark',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#f59e0b',
      background: '#1c1917',
      surface: '#292524',
      text: '#fef7ed',
      textSecondary: '#a3a3a3',
      border: '#44403c',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    mode: 'light',
    colors: {
      primary: '#0284c7',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#0c4a6e',
      textSecondary: '#0369a1',
      border: '#7dd3fc',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    mode: 'dark',
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#65a30d',
      background: '#052e16',
      surface: '#14532d',
      text: '#f0fdf4',
      textSecondary: '#86efac',
      border: '#166534',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    mode: 'dark',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      border: '#3f3f46',
    },
  },
];

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--theme-primary', theme.colors.primary);
  root.style.setProperty('--theme-secondary', theme.colors.secondary);
  root.style.setProperty('--theme-accent', theme.colors.accent);
  root.style.setProperty('--theme-background', theme.colors.background);
  root.style.setProperty('--theme-surface', theme.colors.surface);
  root.style.setProperty('--theme-text', theme.colors.text);
  root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--theme-border', theme.colors.border);
  
  // Apply dark/light mode class
  if (theme.mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Store theme preference
  localStorage.setItem('selected-theme', theme.id);
};

export const getThemeFromStorage = (): string | null => {
  return localStorage.getItem('selected-theme');
};

export const generateGradientBackground = (theme: Theme, isDark: boolean = false) => {
  if (isDark || theme.mode === 'dark') {
    return {
      background: `
        linear-gradient(135deg, ${theme.colors.surface} 0%, ${theme.colors.background} 100%),
        radial-gradient(circle at 20% 80%, ${theme.colors.primary}20 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${theme.colors.accent}15 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, ${theme.colors.secondary}10 0%, transparent 50%)
      `,
    };
  }
  
  return {
    background: `
      linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%),
      radial-gradient(circle at 20% 80%, ${theme.colors.background}10 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.colors.accent}15 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${theme.colors.secondary}10 0%, transparent 50%)
    `,
  };
};

export const getThemeById = (id: string): Theme | undefined => {
  return defaultThemes.find(theme => theme.id === id);
};

export const createCustomTheme = (
  name: string,
  colors: Theme['colors'],
  mode: Theme['mode'] = 'light'
): Theme => {
  return {
    id: `custom-${Date.now()}`,
    name,
    colors,
    mode,
  };
};