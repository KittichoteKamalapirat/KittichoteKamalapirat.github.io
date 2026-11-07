import { useEffect, useState } from "react";

type Mode = "light" | "dark" | null;

const preferDarkQuery = "(prefers-color-scheme: dark)";

const applyMode = (mode: "light" | "dark") =>
  document.documentElement.classList.toggle("dark", mode === "dark");

export const useThemeSwitcher = () => {
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const handleChange = () => {
      // user's explicit choice wins over the system preference
      const userPref = window.localStorage.getItem("theme");
      if (userPref === "dark" || userPref === "light") {
        setMode(userPref);
      } else {
        setMode(mediaQuery.matches ? "dark" : "light");
      }
    };

    // run first time to set from null => userPref, or systemPref
    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mode) return;
    applyMode(mode);
  }, [mode]);

  // only persist when the user toggles, so system changes keep working otherwise
  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    setMode(next);
  };

  return { mode, toggleMode };
};
