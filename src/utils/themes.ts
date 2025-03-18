
export type ThemeOption = 'default' | 'hacker' | 'synthwave' | 'terminal' | 'ocean' | 'sunset';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  muted: string;
}

export const themeColors: Record<ThemeOption, ThemeColors> = {
  default: {
    background: '#111827', // Dark gray
    foreground: '#c9d1d9', // Light gray
    primary: '#58a6ff', // Blue
    secondary: '#1f2937', // Medium gray
    accent: '#58a6ff', // Blue
    success: '#3fb950', // Green
    warning: '#d29922', // Yellow
    error: '#f85149', // Red
    muted: '#8b949e', // Medium gray
  },
  hacker: {
    background: '#000000', // Black
    foreground: '#00ff00', // Bright green
    primary: '#00ff00', // Bright green
    secondary: '#003300', // Dark green
    accent: '#00dd00', // Green
    success: '#00ff00', // Bright green
    warning: '#ffff00', // Yellow
    error: '#ff0000', // Red
    muted: '#006600', // Medium green
  },
  synthwave: {
    background: '#241b2f', // Dark purple
    foreground: '#f8f8f2', // Light gray
    primary: '#ff7edb', // Pink
    secondary: '#2d1b3a', // Medium purple
    accent: '#f92aad', // Hot pink
    success: '#72f1b8', // Teal
    warning: '#fede5d', // Yellow
    error: '#fe4450', // Red
    muted: '#7970a9', // Medium purple
  },
  terminal: {
    background: '#0d1117', // Very dark blue
    foreground: '#c9d1d9', // Light gray
    primary: '#58a6ff', // Blue
    secondary: '#1f2937', // Medium dark gray
    accent: '#79c0ff', // Light blue
    success: '#3fb950', // Green
    warning: '#d29922', // Yellow
    error: '#f85149', // Red
    muted: '#8b949e', // Medium gray
  },
  ocean: {
    background: '#0f2d3d', // Dark blue
    foreground: '#e0f7fa', // Light blue
    primary: '#48b6f1', // Blue
    secondary: '#164b5e', // Medium blue
    accent: '#03dac5', // Teal
    success: '#00c853', // Green
    warning: '#ffd600', // Yellow
    error: '#ff5252', // Red
    muted: '#607d8b', // Blue gray
  },
  sunset: {
    background: '#2d142c', // Dark purple
    foreground: '#f5f5f5', // White
    primary: '#ff9e64', // Orange
    secondary: '#3d1e3c', // Medium purple
    accent: '#ff5757', // Red
    success: '#9cd326', // Green
    warning: '#ffdd33', // Yellow
    error: '#ff3333', // Red
    muted: '#9a6e9e', // Medium purple
  }
};

export const getThemeDescription = (theme: ThemeOption): string => {
  const descriptions: Record<ThemeOption, string> = {
    default: 'The default dark theme with blue accents',
    hacker: 'Classic green-on-black terminal style',
    synthwave: 'Retro 80s inspired with neon pink accents',
    terminal: 'Professional terminal look with blue highlights',
    ocean: 'Calming blue theme inspired by the deep sea',
    sunset: 'Warm purple and orange inspired by twilight skies'
  };
  
  return descriptions[theme];
};

export const applyTheme = (theme: ThemeOption): void => {
  const colors = themeColors[theme];
  const root = document.documentElement;
  
  // Set CSS variables
  root.style.setProperty('--terminal-background', colors.background);
  root.style.setProperty('--terminal-text', colors.foreground);
  root.style.setProperty('--terminal-accent', colors.primary);
  root.style.setProperty('--terminal-success', colors.success);
  root.style.setProperty('--terminal-warning', colors.warning);
  root.style.setProperty('--terminal-error', colors.error);
  root.style.setProperty('--terminal-muted', colors.muted);
  
  // Set system colors
  root.style.setProperty('--system-darkgray', colors.background);
  root.style.setProperty('--system-gray', colors.secondary);
  root.style.setProperty('--system-lightgray', colors.muted);
  
  // Set data attribute for theme-specific CSS
  root.setAttribute('data-theme', theme);
};
