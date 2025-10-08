import { useTheme } from './useTheme';

export function useThemeColors() {
    const { theme } = useTheme();

    if (theme === 'dark') {
        return {
            line: '#6366f1',
            area: 'rgba(99, 102, 241, 0.15)',
            grid: 'rgba(255, 255, 255, 0.05)',
            text: '#e6e6ff',
        };
    }

    return {
        line: '#4f46e5',
        area: 'rgba(79, 70, 229, 0.1)',
        grid: 'rgba(0, 0, 0, 0.08)',
        text: '#1e293b',
    };
}