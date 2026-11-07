import { cn } from "../../../lib/cn";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { MoonIcon } from "./MoonIcon";
import SunIcon from "./SunIcon";

export interface ColorThemeTogglerProps {
  className?: string;
}

const ColorThemeToggler = ({ className }: ColorThemeTogglerProps) => {
  const { mode, toggleMode } = useThemeSwitcher();

  return (
    <button
      onClick={toggleMode}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "h-10 w-10 rounded-full bg-black p-1 text-white dark:bg-white dark:text-black",
        className
      )}
    >
      {mode === "dark" ? (
        <div>
          <SunIcon />
        </div>
      ) : (
        <MoonIcon />
      )}
    </button>
  );
};
export default ColorThemeToggler;
