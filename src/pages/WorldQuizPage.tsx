import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";
import { getWorldById, getWorldQuiz, getWorlds, completeWorld } from "../services/worldsService";
import { addXp } from "../services/profileService";
import { supabase } from "../lib/supabaseClient";

export default function WorldQuizPage() {
  const { t, lang } = useLang();
  const { worldId } = useParams();
  const navigate = useNavigate();
  const [world, setWorld] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!worldId) return;
    setLoading(true);
    Promise.all([getWorldById(worldId), getWorldQuiz(worldId)])
      .then(([w, q]) => { setWorld(w); setQuiz(q); })
      .catch((e) => console.error("خطأ تحميل الاختبار:", e))
      .finally(() => setLoading(false));
  }, [worldId]);

  const questions = quiz?.data?.questions || [];
  const total = questions.length;
  const passThreshold = quiz?.pass_threshold || 70;

  function pickAnswer(optIdx: number) {
    const next = [...answers];
    next[current] = optIdx;
    setAnswers(next);
    if (current + 1 < total) {
      setTimeout(() => setCurrent(current + 1), 200);
    } else {
      setTimeout(() => setFinished(true), 200);
    }
  }

  const correctCount = questions.reduce((acc: number, q: any, i: number) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = percent >= passThreshold;

  // عند النجاح: أكمل العالم وافتح التالي
  useEffect(() => {
    if (!finished || !passed || !world || !worldId) return;
    (async () => {
      try {
        const all = await getWorlds(world.subject, world.grade);
        const idx = all.findIndex((w: any) => w.id === worldId);
        const next = idx >= 0 && idx + 1 < all.length ? all[idx + 1].id : null;
        await completeWorld(worldId, percent, next);
        const { data: auth } = await supabase.auth.getUser();
        if (auth.user?.id) await addXp(auth.user.id, percent);
      } catch (e) {
        console.error("خطأ فتح العالم التالي:", e);
      }
    })();
  }, [finished, passed, world, worldId, percent]);

  function restart() {
    setCurrent(0); setAnswers([]); setFinished(false);
  }

  const box = { minHeight: "100dvh", background: "var(--bg)", fontFamily: "Tajawal,sans-serif", direction: "rtl" as const, display: "flex", flexDirection: "column" as const, padding: 20 };

  if (loading) return <div style={{ ...box, alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>⏳ {t("loading")}</div>;

  if (!quiz || total === 0) return (
    <div style={{ ...box, alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-muted)" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
      <div>لا يوجد اختبار لهذا العالم بعد</div>
      <button onClick={() => navigate(-1)} style={{ marginTop: 20, padding: "12px 24px", border: "none", borderRadius: 12, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal,sans-serif", fontWeight: 800 }}>← {t("btn_back")}</button>
    </div>
  );

  if (finished) return (
    <div style={{ ...box, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{passed ? "🎉" : "💪"}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginBottom: 10 }}>{passed ? "نجحت!" : "اقتربت، تدرّب أكثر وحاول مجدّداً"}</div>
      <div style={{ fontSize: 40, fontWeight: 900, color: passed ? "#4ade80" : "var(--gold)", marginBottom: 6 }}>{percent}%</div>
      <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: passed ? 14 : 28 }}>{correctCount} من {total} صحيحة</div>
      {passed && (
        <div style={{ fontSize: 22, fontWeight: 900, color: "var(--gold)", marginBottom: 28, filter: "drop-shadow(0 0 10px rgba(232,160,32,.5))" }}>+{percent} XP 🌟</div>
      )}
      {passed ? (
        <button onClick={() => navigate(-1)} style={{ padding: "14px 32px", border: "none", borderRadius: 14, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontFamily: "Tajawal,sans-serif", fontWeight: 800, fontSize: 15 }}>تابع 🎉</button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
          <button onClick={() => navigate(`/world/${worldId}`)} style={{ padding: "14px 28px", border: "none", borderRadius: 14, background: "linear-gradient(135deg,var(--gold),var(--gold-deep))", color: "#000", fontFamily: "Tajawal,sans-serif", fontWeight: 800, fontSize: 15, boxShadow: "0 6px 18px rgba(232,160,32,.35)" }}>📚 تدرّب على التمارين</button>
          <button onClick={restart} style={{ padding: "13px 28px", borderRadius: 14, border: "1.5px solid var(--border)", background: "transparent", color: "var(--text-muted)", fontFamily: "Tajawal,sans-serif", fontWeight: 700, fontSize: 14 }}>🔄 أعد الاختبار</button>
        </div>
      )}
    </div>
  );

  const q = questions[current];
  const qText = typeof q.q === "object" ? (q.q[lang] || q.q.ar) : q.q;

  return (
    <div style={box}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button onClick={() => navigate(-1)} style={{ background: "var(--border-faint)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700, fontFamily: "Tajawal,sans-serif" }}>← {t("btn_back")}</button>
        <div style={{ color: "var(--gold)", fontWeight: 800, fontSize: 15 }}>{current + 1} / {total}</div>
      </div>

      <div style={{ height: 6, background: "var(--surface-softer)", borderRadius: 99, marginBottom: 32, overflow: "hidden" }}>
        <div style={{ height: "100%", width: ((current) / total * 100) + "%", background: "linear-gradient(90deg,var(--gold),var(--gold-deep))", transition: "width .3s" }} />
      </div>

      <div style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", textAlign: "center", marginBottom: 36, lineHeight: 1.5 }}>{qText}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {q.options.map((opt: any, i: number) => {
          const optText = typeof opt === "object" ? (opt[lang] || opt.ar) : opt;
          return (
            <button
              key={i}
              onClick={() => pickAnswer(i)}
              style={{ padding: "18px", borderRadius: 16, border: "2px solid var(--border)", background: "var(--surface-2)", color: "var(--text)", fontFamily: "Tajawal,sans-serif", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}
            >
              {optText}
            </button>
          );
        })}
      </div>
    </div>
  );
}
