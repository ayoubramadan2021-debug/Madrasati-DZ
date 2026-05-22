import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizzes, submitQuiz } from "../services/quizService";
import { supabase } from "../lib/supabaseClient";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".qz-root *,.qz-root *::before,.qz-root *::after{box-sizing:border-box;margin:0;padding:0}",
".qz-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".qz-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".qz-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:qz-d1 14s ease-in-out infinite alternate}",
".qz-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:qz-d2 11s ease-in-out infinite alternate}",
"@keyframes qz-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes qz-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".qz-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".qz-content{position:relative;z-index:2}",
".qz-hero{position:relative;padding:24px 20px 28px;text-align:center}",
".qz-back{position:absolute;top:20px;right:16px;background:var(--border-faint);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:background .2s}",
".qz-back:active{background:var(--border-soft)}",
".qz-logo{position:relative;display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;margin:12px 0 12px}",
".qz-logo-bg{position:absolute;inset:0;border-radius:24px;background:linear-gradient(145deg,#1a3d73,#0c1e3a);border:1px solid rgba(232,160,32,.4);box-shadow:var(--shadow-strong)}",
".qz-logo-em{position:relative;font-size:38px;filter:drop-shadow(0 0 14px rgba(232,160,32,.6))}",
".qz-title{font-size:24px;font-weight:900;line-height:1;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".qz-body{padding:0 16px}",
".qz-score{border-radius:20px;padding:24px;text-align:center;color:var(--text);margin-bottom:16px;animation:qz-pop .5s ease}",
"@keyframes qz-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}",
".qz-score-em{font-size:46px}",
".qz-score-n{font-size:32px;font-weight:900;margin-top:4px}",
".qz-score-l{margin-top:4px;opacity:.9;font-size:14px}",
".qz-q{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-card)}",
".qz-q-txt{font-weight:700;color:var(--text);font-size:15px;line-height:1.6;margin-bottom:12px}",
".qz-opt{padding:12px 14px;border-radius:12px;margin-bottom:8px;font-size:14px;cursor:pointer;transition:all .2s;color:var(--text)}",
".qz-correct-btn{width:100%;margin-top:10px;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,#3B82F6,#2563eb);color:var(--text);font-family:'Tajawal',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:transform .15s}",
".qz-correct-btn:active{transform:scale(.97)}",
".qz-verdict{margin-top:10px;font-weight:800;font-size:14px;text-align:center}",
".qz-finish{width:100%;padding:15px;border-radius:16px;border:none;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
".qz-finish:active{transform:scale(.97)}",
".qz-empty{text-align:center;padding:50px 20px;color:var(--text-faint)}",
".qz-empty-em{font-size:44px;margin-bottom:10px}",
].join("\n");

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!lessonId) return;
    getQuizzes(lessonId).then(setQuizzes);
  }, [lessonId]);

  async function check(q: any) {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    const res = await submitQuiz(user.id, lessonId!, q.id, selected[q.id], q.correct_answer);
    setResult((p) => ({ ...p, [q.id]: res.correct }));
  }

  function finish() {
    const correct = Object.values(result).filter(Boolean).length;
    setScore(Math.round((correct / quizzes.length) * 100));
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="qz-root">
        <div className="qz-orb qz-ob" />
        <div className="qz-orb qz-og" />
        <div className="qz-grid" />

        <div className="qz-content">
          <div className="qz-hero">
            <button className="qz-back" onClick={() => navigate(-1)}>← رجوع</button>
            <div className="qz-logo">
              <div className="qz-logo-bg" />
              <span className="qz-logo-em">🧠</span>
            </div>
            <h1 className="qz-title">الاختبار</h1>
          </div>

          <div className="qz-body">
            {quizzes.length === 0 && score === null && (
              <div className="qz-empty"><div className="qz-empty-em">📭</div><div>لا توجد اختبارات بعد</div></div>
            )}

            {/* النتيجة */}
            {score !== null && (
              <div className="qz-score" style={{
                background: score >= 60 ? "linear-gradient(135deg,#22C55E,#16a34a)" : "linear-gradient(135deg,#EF4444,#dc2626)",
                boxShadow: "0 8px 28px " + (score >= 60 ? "rgba(34,197,94,.35)" : "rgba(239,68,68,.35)"),
              }}>
                <div className="qz-score-em">{score >= 60 ? "🏆" : "💪"}</div>
                <div className="qz-score-n">{score}%</div>
                <div className="qz-score-l">{score >= 60 ? "نتيجة ممتازة" : "حاول مرة أخرى"}</div>
              </div>
            )}

            {/* الأسئلة */}
            {quizzes.map((q) => {
              const answered = result[q.id] !== undefined;
              return (
                <div key={q.id} className="qz-q" style={{
                  border: answered ? (result[q.id] ? "1.5px solid rgba(34,197,94,.5)" : "1.5px solid rgba(239,68,68,.5)") : "1px solid var(--border-soft)",
                }}>
                  <div className="qz-q-txt">{q.question}</div>

                  {(q.options || []).map((opt: string) => {
                    const sel = selected[q.id] === opt;
                    return (
                      <div
                        key={opt}
                        className="qz-opt"
                        onClick={() => setSelected((p) => ({ ...p, [q.id]: opt }))}
                        style={{
                          background: sel ? "rgba(232,160,32,.12)" : "var(--surface-softer)",
                          border: sel ? "1.5px solid var(--gold)" : "1.5px solid var(--border)",
                          color: sel ? "var(--gold)" : "var(--text)",
                          fontWeight: sel ? 700 : 500,
                        }}
                      >
                        {opt}
                      </div>
                    );
                  })}

                  <button className="qz-correct-btn" onClick={() => check(q)}>تصحيح</button>

                  {result[q.id] !== undefined && (
                    <div className="qz-verdict" style={{ color: result[q.id] ? "#4ade80" : "#f87171" }}>
                      {result[q.id] ? "✅ صحيح" : "❌ خطأ"}
                    </div>
                  )}
                </div>
              );
            })}

            {quizzes.length > 0 && (
              <button className="qz-finish" onClick={finish}>عرض النتيجة ←</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
