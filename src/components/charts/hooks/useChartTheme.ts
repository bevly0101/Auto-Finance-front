import { useTheme } from '../../../contexts/ThemeContext';

export const useChartTheme = () => {
  const { theme } = useTheme();

  const effectiveTheme = theme === 'system'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    : theme;

  if (effectiveTheme === 'dark') {
    return {
      textColor: '#F9FAFB', // foreground
      gridColor: '#1E293B', // border
      tooltipColor: '#111827', // card
    };
  }

  return {
    textColor: '#1F2937', // foreground
    gridColor: '#F5F7FA', // border
    tooltipColor: '#FFFFFF', // white
  };
};