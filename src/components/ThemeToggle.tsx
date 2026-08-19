import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";


export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Always start in light mode when the website loads
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    setDark(false);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;

    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setDark(newDark);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="
        relative flex h-9 w-9 items-center justify-center
        rounded-full border border-border
        bg-background
        text-foreground
        shadow-sm
        transition-all duration-300
        hover:bg-muted
        hover:scale-105
      "
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          dark
            ? "rotate-90 scale-0"
            : "rotate-0 scale-100"
        }`}
      />

      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          dark
            ? "rotate-0 scale-100"
            : "-rotate-90 scale-0"
        }`}
      />
    </button>
  );
}