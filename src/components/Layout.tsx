import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { getCurrentUser } from "../services/sessionService";
import { isAdmin } from "../services/adminService";
import { useUserProgress } from "../features/progress/hooks/useUserProgress";

export default function Layout({ children, theme }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const u = await getCurrentUser();
        setUser(u);

        if (u) {
          const a = await isAdmin(u.id);
          setAdmin(!!a);
        }
      } catch {
        setUser(null);
        setAdmin(false);
      }
    }

    load();
  }, []);

  const { data: progress = [] } = useUserProgress(user?.id);

  const points = progress.reduce((s, p) => s + Number(p.points || 0), 0);
  const completed = progress.filter(p => p.completed).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: theme?.bg,
      color: theme?.text
    }}>
      <header style={{
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        background: theme?.headerBg
      }}>
        <strong>{t?.appName || "تعليم ديزاد"}</strong>
        <span>
          {admin ? "ADMIN" : user ? "USER" : "GUEST"} | {points} | {completed}
        </span>
        <button onClick={() => setOpen(!open)}>☰</button>
      </header>

      {open && (
        <div style={{ padding: 20 }}>
          {t?.menu || "MENU"}
        </div>
      )}

      <main style={{ padding: 20 }}>
        {children}
      </main>
    </div>
  );
}
