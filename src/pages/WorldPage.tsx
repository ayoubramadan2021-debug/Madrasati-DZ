import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldLessons } from "../services/worldsService";
import { supabase } from "../lib/supabaseClient";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";

export default function WorldPage() {
  const { t, lang } = useLang();
  const { worldId } = useParams();
  const navigate = useNavigate();
  const [world, setWorld] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (!worldId) return;
    setLoading(true);
    Promise.all([getWorldById(worldId), getWorldLessons(worldId)])
      .then(async ([w, ls]) => {
        setWorld(w);
        setLessons(ls);
        // check if user has seen the intro
        if (w?.intro_content) {
          const { data: userData } = await supabase.auth.getUser();
          if (userData?.user) {
            const { data: viewed } = await supabase
              .from("world_intro_views")
              .select("viewed_at")
              .eq("user_id", userData.user.id)
              .eq("world_id", w.id)
              .maybeSingle();
            if (!viewed) setShowIntro(true);
          }
        }
        setIntroChecked(true);
      })
      .catch((e) => console.error("خطأ تحميل العالم:", e))
      .finally(() => setLoading(false));
  }, [worldId]);

  const title = world ? (lang === "fr" && world.title_fr ? world.title_fr : world.title_ar) : "";

  const handleIntroDone = async () => {
    setShowIntro(false);
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user && world) {
      await supabase.from("world_intro_views").insert({
        user_id: userData.user.id,
        world_id: world.id,
      });
    }
  };

  // Show intro scene if not viewed
  if (showIntro && world?.intro_content) {
    return (
      <WorldIntroSceneV2
        audio_base={world.intro_content.audio_base}
        slides={world.intro_content.slides}
        onDone={handleIntroDone}
      />
    );
  }

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

        {!loading && (
          <div style={{ marginTop: 28, padding: "22px 18px", background: "linear-gradient(145deg,rgba(168,85,247,.12),rgba(168,85,247,.04))", border: "1px solid rgba(168,85,247,.3)", borderRadius: 20, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>اختبر معرفتك!</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>اجتز الاختبار لتفتح العالم التالي 🔓</div>
            <button
              onClick={() => navigate(`/world/${worldId}/quiz`)}
              style={{ width: "100%", padding: 15, border: "none", borderRadius: 14, background: "linear-gradient(135deg,#a855f7,#7c3aed)", color: "#fff", fontFamily: "Tajawal,sans-serif", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 18px rgba(168,85,247,.35)" }}
            >
              ابدأ اختبار العالم 🎯
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
