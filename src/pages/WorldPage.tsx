import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldLessons } from "../services/worldsService";

export default function WorldPage() {
  const { t, lang } = useLang();
  const { worldId } = useParams();
  const navigate = useNavigate();
  const [world, setWorld] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (!worldId) return;
    setLoading(true);
    Promise.all([getWorldById(worldId), getWorldLessons(worldId)])
      .then(([w, ls]) => { setWorld(w); setLessons(ls); })
      .catch((e) => console.error("خطأ تحميل العالم:", e))
      .finally(() => setLoading(false));
  }, [worldId]);

  const title = world ? (lang === "fr" && world.title_fr ? world.title_fr : world.title_ar) : "";

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Tajawal,sans-serif", direction: "rtl", paddingBottom: 100 }}>
      <div style={{ padding: "24px 16px", position: "relative", zIndex: 2 }}>
        <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", marginBottom: 18 }}>← {t("btn_back")}</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 10 }}>{world?.icon || "🌟"}</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--text)", margin: 0 }}>{title}</h1>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "var(--gold)", padding: 40 }}>⏳ جارٍ التحميل...</div>
        ) : lessons.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--text-faint)", padding: 40 }}>لا توجد دروس في هذا العالم بعد</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lessons.map((l, i) => (
              <div
                key={l.id}
                onClick={() => navigate(`/lesson/${l.id}`)}
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,.3)", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)", transition: `all .4s ease ${i * 0.08}s` }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(145deg,var(--gold)26,var(--gold)12)", border: "1px solid var(--gold)33", display: "grid", placeItems: "center", fontSize: 20, flexShrink: 0 }}>📖</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 15 }}>{lang === "fr" && l.title_fr ? l.title_fr : l.title}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>الدرس {i + 1}</div>
                </div>
                <div style={{ color: "var(--gold)", fontSize: 18 }}>←</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
