import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appData from "../data/appData";

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
".ex-score{border-radius:20px;padding:24px;text-align:center;color:var(--text);margin-bottom:16px;animation:ex-pop .5s ease}",
"@keyframes ex-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}",
".ex-score-em{font-size:46px}",
".ex-score-n{font-size:32px;font-weight:900;margin-top:4px}",
".ex-score-l{margin-top:4px;opacity:.9;font-size:14px}",
".ex-retry{margin-top:14px;padding:10px 22px;border-radius:12px;border:none;background:var(--text-dim);color:var(--text);font-family:'Tajawal',sans-serif;font-weight:700;cursor:pointer;transition:transform .15s}",
".ex-retry:active{transform:scale(.95)}",
".ex-q{background:var(--surface-2);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-card);transition:border-color .3s}",
".ex-q-head{display:flex;gap:10px;margin-bottom:14px;align-items:flex-start}",
".ex-q-num{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;display:grid;place-items:center;font-weight:800;font-size:13px;flex-shrink:0}",
".ex-q-txt{font-weight:700;color:var(--text);font-size:15px;line-height:1.6;padding-top:3px}",
".ex-opts{display:flex;flex-direction:column;gap:8px}",
".ex-opt{padding:12px 14px;border-radius:12px;font-size:14px;transition:all .2s}",
".ex-correct-btn{margin-top:12px;width:100%;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,#3B82F6,#2563eb);color:var(--text);font-family:'Tajawal',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:transform .15s}",
".ex-correct-btn:active{transform:scale(.97)}",
".ex-finish{width:100%;padding:15px;border-radius:16px;border:none;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
".ex-finish:active{transform:scale(.97)}",
".ex-empty{text-align:center;padding:50px 20px;color:var(--text-faint)}",
".ex-empty-em{font-size:44px;margin-bottom:10px}",
].join("\n");

export default function ExercisePage() {
  const { gradeId, subject, exerciseId } = useParams();
  const navigate = useNavigate();

  const currentSubject = (appData.subjects || []).find((s: any) => s.slug === subject);
  const exercise = (currentSubject?.exercises || []).find((e: any) => String(e.id) === String(exerciseId));
  const questions = exercise?.questions || [];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  function checkAnswer(idx: number, q: any) {
    const correct = answers[idx] === q.correctAnswer;
    setResults((p) => ({ ...p, [idx]: correct }));
  }

  function finish() {
    const correct = Object.values(results).filter(Boolean).length;
    setScore(Math.round((correct / questions.length) * 100));
  }

  const allAnswered = questions.length > 0 && questions.every((_: any, i: number) => answers[i]);

  return (
    <>
      <style>{CSS}</style>
      <div className="ex-root">
        <div className="ex-orb ex-ob" />
        <div className="ex-orb ex-og" />
        <div className="ex-grid" />

        <div className="ex-content">
          <div className="ex-hero">
            <button className="ex-back" onClick={() => navigate(`/grade/${gradeId}/subject/${subject}/section/exercises`)}>← رجوع</button>
            <div className="ex-logo">
              <div className="ex-logo-bg" />
              <span className="ex-logo-em">✏️</span>
            </div>
            <h1 className="ex-title">{exercise?.title || "التمرين"}</h1>
            <div className="ex-sub">{questions.length} سؤال</div>
          </div>

          <div className="ex-body">
            {questions.length === 0 && (
              <div className="ex-empty"><div className="ex-empty-em">📭</div><div>لا توجد أسئلة بعد</div></div>
            )}

            {/* النتيجة */}
            {score !== null && (
              <div className="ex-score" style={{
                background: score >= 60 ? "linear-gradient(135deg,#22C55E,#16a34a)" : "linear-gradient(135deg,#EF4444,#dc2626)",
                boxShadow: "0 8px 28px " + (score >= 60 ? "rgba(34,197,94,.35)" : "rgba(239,68,68,.35)"),
              }}>
                <div className="ex-score-em">{score >= 60 ? "🏆" : "💪"}</div>
                <div className="ex-score-n">{score}%</div>
                <div className="ex-score-l">{score >= 60 ? "نتيجة ممتازة" : "حاول مرة أخرى"}</div>
                <button className="ex-retry" onClick={() => { setAnswers({}); setResults({}); setScore(null); }}>إعادة</button>
              </div>
            )}

            {/* الأسئلة */}
            {questions.map((q: any, idx: number) => {
              const answered = results[idx] !== undefined;
              const border = answered ? (results[idx] ? "1.5px solid rgba(34,197,94,.5)" : "1.5px solid rgba(239,68,68,.5)") : "1px solid var(--border-soft)";
              return (
                <div key={idx} className="ex-q" style={{ border }}>
                  <div className="ex-q-head">
                    <div className="ex-q-num">{idx + 1}</div>
                    <div className="ex-q-txt">{q.question}</div>
                  </div>

                  <div className="ex-opts">
                    {(q.options || []).map((opt: string) => {
                      const selected = answers[idx] === opt;
                      const isCorrect = opt === q.correctAnswer;

                      let bg = "var(--surface-softer)";
                      let bd = "1.5px solid var(--border)";
                      let col = "var(--text)";

                      if (answered && isCorrect) {
                        bg = "rgba(34,197,94,.15)"; bd = "1.5px solid #22C55E"; col = "#4ade80";
                      } else if (answered && selected && !isCorrect) {
                        bg = "rgba(239,68,68,.15)"; bd = "1.5px solid #EF4444"; col = "#f87171";
                      } else if (selected) {
                        bg = "rgba(232,160,32,.12)"; bd = "1.5px solid var(--gold)"; col = "var(--gold)";
                      }

                      return (
                        <div
                          key={opt}
                          className="ex-opt"
                          onClick={() => !answered && setAnswers((p) => ({ ...p, [idx]: opt }))}
                          style={{ background: bg, border: bd, color: col, fontWeight: selected || answered ? 700 : 500, cursor: answered ? "default" : "pointer" }}
                        >
                          {answered && isCorrect ? "✅ " : answered && selected && !isCorrect ? "❌ " : ""}{opt}
                        </div>
                      );
                    })}
                  </div>

                  {answers[idx] && results[idx] === undefined && (
                    <button className="ex-correct-btn" onClick={() => checkAnswer(idx, q)}>تصحيح</button>
                  )}
                </div>
              );
            })}

            {allAnswered && score === null && (
              <button className="ex-finish" onClick={finish}>عرض النتيجة ←</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
