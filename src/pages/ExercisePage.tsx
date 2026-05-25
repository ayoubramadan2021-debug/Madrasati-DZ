import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciseById, submitExercise } from "../services/exerciseService";
import { getCurrentUser } from "../services/authService";

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
  ".ex-root *,.ex-root *::before,.ex-root *::after{box-sizing:border-box;margin:0;padding:0}",
  ".ex-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
  ".ex-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
  ".ex-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:ex-d1 14s ease-in-out infinite alternate}",
  ".ex-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:ex-d2 11s ease-in-out infinite alternate}",
  "@keyframes ex-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
  "@keyframes ex-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
  ".ex-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
  ".ex-content{position:relative;z-index:2}",
  ".ex-hero{position:relative;padding:24px 20px 28px;text-align:center}",
  ".ex-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
  ".ex-back:active{background:var(--border-soft)}",
  ".ex-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px}",
  ".ex-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
  ".ex-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
  ".ex-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:6px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
  ".ex-sub{font-size:13px;color:var(--text-faint)}",
  ".ex-body{padding:0 16px}",
  ".ex-q{background:var(--surface-2);border-radius:18px;padding:22px 18px;margin-bottom:14px;box-shadow:var(--shadow-card);transition:border-color .3s}",
  ".ex-q-txt{font-weight:800;color:var(--text);font-size:18px;line-height:1.6;text-align:center;margin-bottom:18px}",
  ".ex-opts{display:flex;flex-direction:column;gap:10px}",
  ".ex-opt{padding:14px 16px;border-radius:12px;font-size:15px;font-weight:600;transition:all .2s}",
  ".ex-check{margin-top:16px;width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
  ".ex-check:active{transform:scale(.97)}",
  ".ex-check:disabled{opacity:.5;cursor:default;box-shadow:none}",
  ".ex-result{border-radius:18px;padding:22px;text-align:center;color:var(--text);margin-bottom:14px;animation:ex-pop .5s ease}",
  "@keyframes ex-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}",
  ".ex-result-em{font-size:46px}",
  ".ex-result-l{font-size:18px;font-weight:900;margin-top:6px}",
  ".ex-result-p{font-size:14px;margin-top:4px;opacity:.9}",
  ".ex-next{margin-top:14px;padding:11px 24px;border-radius:12px;border:none;background:rgba(255,255,255,.15);color:var(--text);font-family:'Tajawal',sans-serif;font-weight:700;font-size:14px;cursor:pointer}",
  ".ex-empty{text-align:center;padding:50px 20px;color:var(--text-faint)}",
  ".ex-empty-em{font-size:44px;margin-bottom:10px}",
  ".ex-load{text-align:center;padding:60px 20px;color:var(--gold);font-size:15px}",
].join("\n");

export default function ExercisePage() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exercise, setExercise] = useState<any>(null);
  const [selected, setSelected] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!exerciseId) { setError(true); setLoading(false); return; }
      try {
        const data = await getExerciseById(exerciseId);
        if (alive) { setExercise(data); setLoading(false); }
      } catch {
        if (alive) { setError(true); setLoading(false); }
      }
    })();
    return () => { alive = false; };
  }, [exerciseId]);

  async function handleCheck() {
    if (!selected || checked || !exercise) return;
    const correct = selected.trim() === String(exercise.correct_answer).trim();
    setIsCorrect(correct);
    setChecked(true);
    // تسجيل النتيجة في Supabase (لا يوقف الواجهة إن فشل)
    try {
      const u = await getCurrentUser();
      if (u) {
        await submitExercise(u.id, exercise.lesson_id, exercise.id, selected, String(exercise.correct_answer));
      }
    } catch { /* تجاهل بصمت */ }
  }

  function reset() {
    setSelected(""); setChecked(false); setIsCorrect(false);
  }

  const options: string[] = Array.isArray(exercise?.options) ? exercise.options : [];

  return (
    <>
      <style>{CSS}</style>
      <div className="ex-root">
        <div className="ex-orb ex-ob" />
        <div className="ex-orb ex-og" />
        <div className="ex-grid" />
        <div className="ex-content">
          <div className="ex-hero">
            <button className="ex-back" onClick={() => navigate(-1)}>← رجوع</button>
            <div className="ex-logo">
              <div className="ex-logo-bg" />
              <span className="ex-logo-em">✏️</span>
            </div>
            <h1 className="ex-title">{exercise?.title || "تمرين"}</h1>
            <div className="ex-sub">تمرين تفاعلي</div>
          </div>

          <div className="ex-body">
            {loading && <div className="ex-load">⏳ جاري التحميل...</div>}

            {!loading && error && (
              <div className="ex-empty">
                <div className="ex-empty-em">⚠️</div>
                <div>تعذّر تحميل التمرين</div>
              </div>
            )}

            {!loading && !error && exercise && (
              <>
                {checked && (
                  <div className="ex-result" style={{
                    background: isCorrect ? "linear-gradient(135deg,#22C55E,#16a34a)" : "linear-gradient(135deg,#EF4444,#dc2626)",
                    boxShadow: "0 8px 28px " + (isCorrect ? "rgba(34,197,94,.35)" : "rgba(239,68,68,.35)"),
                  }}>
                    <div className="ex-result-em">{isCorrect ? "🏆" : "💪"}</div>
                    <div className="ex-result-l">{isCorrect ? "إجابة صحيحة!" : "حاول مرة أخرى"}</div>
                    <div className="ex-result-p">{isCorrect ? "أحسنت يا بطل! +10 نقاط" : "لا بأس، التعلّم بالمحاولة"}</div>
                    {!isCorrect && <button className="ex-next" onClick={reset}>إعادة المحاولة</button>}
                  </div>
                )}

                <div className="ex-q">
                  <div className="ex-q-txt">{exercise.question}</div>
                  <div className="ex-opts">
                    {options.map((opt) => {
                      const isSel = selected === opt;
                      const isAns = opt === String(exercise.correct_answer);
                      let bg = "var(--surface-softer)";
                      let bd = "1.5px solid var(--border)";
                      let col = "var(--text)";
                      if (checked && isAns) { bg = "rgba(34,197,94,.15)"; bd = "1.5px solid #22C55E"; col = "#4ade80"; }
                      else if (checked && isSel && !isAns) { bg = "rgba(239,68,68,.15)"; bd = "1.5px solid #EF4444"; col = "#f87171"; }
                      else if (isSel) { bg = "rgba(232,160,32,.12)"; bd = "1.5px solid var(--gold)"; col = "var(--gold)"; }
                      return (
                        <div
                          key={opt}
                          className="ex-opt"
                          onClick={() => !checked && setSelected(opt)}
                          style={{ background: bg, border: bd, color: col, cursor: checked ? "default" : "pointer" }}
                        >
                          {checked && isAns ? "✅ " : checked && isSel && !isAns ? "❌ " : ""}{opt}
                        </div>
                      );
                    })}
                  </div>
                  {!checked && (
                    <button className="ex-check" onClick={handleCheck} disabled={!selected}>تصحيح ✓</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
