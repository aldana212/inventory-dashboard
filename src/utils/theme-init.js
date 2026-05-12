// src/theme-init.js
export const initTheme = () => {
  const saved = localStorage.getItem("theme-storage");

  let isDark = true;

  if (saved) {
    const parsed = JSON.parse(saved);
    isDark = parsed?.state?.darkMode;
  } else {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // 🔥 SOLO visual antes de React
  document.documentElement.classList.toggle("dark", isDark);
};
