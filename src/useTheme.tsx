import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem("app-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, setTheme, toggle };
}

const TT_CSS = [
".tt-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:999px;border:1px solid var(--border);background:var(--surface-soft);color:var(--text-muted);font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .25s;-webkit-tap-highlight-color:transparent}",
".tt-btn:active{transform:scale(.94)}",
".tt-ic{font-size:17px;line-height:1;display:inline-block;animation:tt-pop .4s cubic-bezier(.34,1.56,.64,1)}",
"@keyframes tt-pop{from{transform:scale(0) rotate(-90deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}",
].join("\n");

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <>
      <style>{TT_CSS}</style>
      <button className="tt-btn" onClick={toggle} aria-label="تبديل الثيم">
        <span className="tt-ic" key={theme}>{isDark ? "☀️" : "🌙"}</span>
        {!compact && <span>{isDark ? "الوضع الفاتح" : "الوضع الغامق"}</span>}
      </button>
    </>
  );
}

export default ThemeToggle;
