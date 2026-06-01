import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { pickLang } from "../lib/pickLang";
import { supabase } from "../lib/supabaseClient";
import { getExercises } from "../services/exerciseService";
import IntroScene from "../features/exercises/templates/IntroScene";

const NAVY = "#1B3A6B";
const GOLD = "#E8A020";

export default function LessonDetailPage() {
  const { t, lang } = useLang();
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);
    Promise.all([
      supabase.from("lessons").select("*").eq("id", lessonId).maybeSingle(),
      getExercises(lessonId),
    ])
      .then(([l, ex]) => { setLesson(l.data); setExercises(ex || []); })
      .catch((e) => console.error("خطأ تحميل الدرس:", e))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const title = lesson ? (lang === "fr" && lesson.title_fr ? lesson.title_fr : lesson.title) : "";
  const typeLabels: Record<string, string> = { arithmetic: "حساب", count: "عدّ", order: "ترتيب", mcq: "اختيار", color: "تلوين", sequence: "تسلسل", link: "ربط" };

  // content قد يكون نصًا عاديًا (قديم) أو كائنًا منظّمًا (جديد)
  let structured: any = null;
  let plainText = "";
  const c = lesson?.content;
  if (c) {
    if (typeof c === "object") structured = c;
    else if (typeof c === "string") {
      const s = c.trim();
      if (s.startsWith("{")) {
        try { structured = JSON.parse(s); } catch { plainText = c; }
      } else plainText = c;
    }
  }

  const cx = (...a: (string | false)[]) => a.filter(Boolean).join(" ");

  // فرع الوضعية الانطلاقية
  if (lesson?.lesson_type === "intro" && structured?.hotspots) {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Tajawal,sans-serif", direction: "rtl", paddingBottom: 100 }}>
        <div style={{ padding: "16px 8px", position: "relative", zIndex: 2 }}>
          <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", marginBottom: 10, marginRight: 8 }}>← {t("btn_back")}</button>
          <IntroScene
            narrator={structured.narrator}
            hotspots={structured.hotspots}
            background_image={structured.background_image}
            onDone={() => {
              const first = exercises[0];
              if (first) navigate(`/exercise/${first.id}`);
              else navigate(-1);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Tajawal,sans-serif", direction: "rtl", paddingBottom: 100 }}>
      <div style={{ padding: "24px 16px", position: "relative", zIndex: 2 }}>
        <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", marginBottom: 18 }}>← {t("btn_back")}</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📖</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", margin: 0 }}>{title}</h1>
          {structured?.intro && <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 10, lineHeight: 1.7 }}>{pickLang(structured.intro, lang)}</p>}
          {plainText && <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{plainText}</p>}
        </div>

        {/* الشرح البصري بالبطاقات */}
        {structured?.cards && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {structured.cards.map((card: any, i: number) => (
              <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)", borderRadius: 18, padding: "16px 12px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,.25)" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: GOLD, lineHeight: 1 }}>{card.number}</div>
                {card.word && <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginTop: 4 }}>{pickLang(card.word, lang)}</div>}
                {card.items && <div style={{ fontSize: 22, marginTop: 8, lineHeight: 1.4, wordBreak: "break-all" }}>{card.items}</div>}
              </div>
            ))}
          </div>
        )}

        {/* خلاصة تعلّمت */}
        {structured?.summary && (
          <div style={{ background: "linear-gradient(135deg,rgba(232,160,32,.14),rgba(201,125,10,.06))", border: "1px solid rgba(232,160,32,.35)", borderRadius: 16, padding: "16px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 22 }}>⭐</span>
            <div>
              <div style={{ fontWeight: 800, color: GOLD, fontSize: 14, marginBottom: 4 }}>تعلّمت</div>
              <div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{pickLang(structured.summary, lang)}</div>
            </div>
          </div>
        )}

        {/* التمارين */}
        {loading ? (
          <div style={{ textAlign: "center", color: "var(--gold)", padding: 40 }}>⏳ جارٍ التحميل...</div>
        ) : exercises.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--text-faint)", padding: 40 }}>لا توجد تمارين في هذا الدرس بعد</div>
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--gold)", marginBottom: 12 }}>التمارين ({exercises.length})</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {exercises.map((ex) => {
                const exTitle = ex.data?.title?.[lang] || ex.data?.title?.ar || ex.title || "تمرين";
                return (
                  <div
                    key={ex.id}
                    onClick={() => navigate(`/exercise/${ex.id}`)}
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border-soft)", borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,.3)" }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(232,160,32,.15)", border: "1px solid rgba(232,160,32,.3)", display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0 }}>✏️</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 15 }}>{exTitle}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>{typeLabels[ex.type] || ex.type}</div>
                    </div>
                    <div style={{ color: "var(--gold)", fontSize: 18 }}>←</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
