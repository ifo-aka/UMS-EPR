import { useTheme } from "../store/Theme";
import { Sun, Moon } from "lucide-react"; // nice icons
import styles from "../StyleSheets/ThemeToggle.module.css"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.box}
    >
      {theme === "dark" ? (
        <Sun className={styles.icon}/>
      ) : (
        <Moon className="w-5 h-5 text-[var(--accent-color)]" />
      )}
    </button>
  );
}

