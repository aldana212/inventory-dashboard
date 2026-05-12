import { useThemeStore } from "../store/themeStore";

export const useTheme = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { darkMode, toggleTheme };
};