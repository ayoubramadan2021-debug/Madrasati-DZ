import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldLessons } from "../services/worldsService";
import { supabase } from "../lib/supabaseClient";
import { getV2Key } from "../features/lesson-v2/v2Registry";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";

// نزع التشكيل + تحويل الكلمات الرقمية — للعرض في الفهرس فقط
function cleanTitle(s: string): string {
  if (!s) return s;
  return s
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/ستة/g, "6")
    .replace(/تسعة/g, "9");
}

export default function WorldPage() {
  const { t, lang } = useLang();
  const { worldId } = useParams();
  const navigate = useNavigate();
  const [world, setWorld] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
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
    if (isReplay) {
      setIsReplay(false);
      return;
    }
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user && world) {
      await supabase.from("world_intro_views").upsert({
        user_id: userData.user.id,
        world_id: world.id,
      }, { onConflict: "user_id,world_id" });
    }
  };

  const handleReplayIntro = () => {
    setIsReplay(true);
    setShowIntro(true);
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 8 }}>
          <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif" }}>← {t("btn_back")}</button>
          {world?.intro_content && (
            <button onClick={handleReplayIntro} style={{ background: "linear-gradient(135deg,var(--gold),#FFB84D)", border: "none", color: "#fff", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer", boxShadow: "0 4px 12px rgba(232,160,32,.35)" }}>🎬 شاهد المقدمة</button>
          )}
        </div>

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
                onClick={() => { const k = getV2Key(l.id); navigate(k ? `/lesson-v2/${k}` : `/lesson/${l.id}`); }}
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,.3)", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(10px)", transition: `all .4s ease ${i * 0.08}s` }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 15, background: "linear-gradient(135deg,var(--gold),#F4B942)", color: "#1B3A6B", display: "grid", placeItems: "center", fontSize: 22, fontWeight: 900, flexShrink: 0, boxShadow: "0 4px 12px rgba(232,160,32,.35)" }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, marginBottom: 3, letterSpacing: ".3px" }}>الدرس {i + 1}</div>
                  <div style={{ fontWeight: 800, color: "var(--text)", fontSize: 16, lineHeight: 1.3 }}>{lang === "fr" && l.title_fr ? l.title_fr : cleanTitle(l.title)}</div>
                </div>
                <div style={{ width: 11, height: 11, borderLeft: "2.5px solid var(--gold)", borderBottom: "2.5px solid var(--gold)", transform: "rotate(45deg)", flexShrink: 0, marginLeft: 4 }} />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div style={{ marginTop: 28, padding: "22px 18px", background: "linear-gradient(145deg,rgba(232,160,32,.14),rgba(27,58,107,.18))", border: "1px solid var(--gold)33", borderRadius: 22, textAlign: "center" }}>
            <div style={{ width: 60, height: 60, margin: "0 auto 12px", borderRadius: 18, background: "linear-gradient(135deg,#1B3A6B,#264a7d)", border: "2px solid var(--gold)", display: "grid", placeItems: "center", fontSize: 30, boxShadow: "0 4px 16px rgba(0,0,0,.25)" }}>🏆</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text)", marginBottom: 5 }}>اِخْتَبِرْ مَعْرِفَتَك!</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>🔒 اجتَزِ الاختبارَ لتفتحَ العالمَ التالي</div>
            <button
              onClick={() => navigate(`/world/${worldId}/quiz`)}
              style={{ width: "100%", padding: 15, border: "none", borderRadius: 16, background: "linear-gradient(135deg,var(--gold),#F4B942)", color: "#1B3A6B", fontFamily: "Tajawal,sans-serif", fontSize: 16, fontWeight: 900, cursor: "pointer", boxShadow: "0 6px 20px rgba(232,160,32,.4)" }}
            >
              ابدأ اختبار العالم 🏆
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
