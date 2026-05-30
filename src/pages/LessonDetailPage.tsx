import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { supabase } from "../lib/supabaseClient";
import { getExercises } from "../services/exerciseService";

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
      supabase.from("lessons").select("*").eq("id", lessonId).single(),
      getExercises(lessonId),
    ])
      .then(([l, ex]) => { setLesson(l.data); setExercises(ex || []); })
      .catch((e) => console.error("خطأ تحميل الدرس:", e))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const title = lesson ? (lang === "fr" && lesson.title_fr ? lesson.title_fr : lesson.title) : "";
  const typeLabels: Record<string, string> = { arithmetic: "حساب", count: "عدّ", order: "ترتيب", mcq: "اختيار", color: "تلوين", sequence: "تسلسل", link: "ربط" };

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Tajawal,sans-serif", direction: "rtl", paddingBottom: 100 }}>
      <div style={{ padding: "24px 16px", position: "relative", zIndex: 2 }}>
        <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif", marginBottom: 18 }}>← {t("btn_back")}</button>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📖</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", margin: 0 }}>{title}</h1>
          {lesson?.content && <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{lesson.content}</p>}
        </div>

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
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(145deg,var(--gold)26,var(--gold)12)", border: "1px solid var(--gold)33", display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0 }}>✏️</div>
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
