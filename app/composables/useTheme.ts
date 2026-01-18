import { onMounted, watch } from "vue";

export type ThemeMode = "light" | "dark";

export const useTheme = () => {
  const theme = useState<ThemeMode>("theme", () => "light");

  const applyTheme = (mode: ThemeMode) => {
    if (!process.client) return;
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  };

  const setTheme = (mode: ThemeMode) => {
    theme.value = mode;
  };

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  onMounted(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    theme.value = initialTheme;
    applyTheme(initialTheme);
  });

  watch(theme, (value) => {
    applyTheme(value);
  });

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
