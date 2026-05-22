import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import { getQuizzes } from "../services/quizService";
import ProgressBar from "../shared/components/ProgressBar";
import ResultMessage from "../shared/components/ResultMessage";
import QuizResult from "../shared/components/QuizResult";

const CSS = [
"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');",
".lf-root *,.lf-root *::before,.lf-root *::after{box-sizing:border-box;margin:0;padding:0}",
".lf-root{min-height:100dvh;background:var(--bg);font-family:'Tajawal',sans-serif;direction:rtl;overflow-x:hidden;position:relative;padding-bottom:100px}",
".lf-orb{position:fixed;pointer-events:none;border-radius:50%;z-index:0}",
".lf-ob{width:480px;height:480px;top:-180px;left:-120px;background:radial-gradient(circle,rgba(27,58,107,.6) 0%,transparent 70%);animation:lf-d1 14s ease-in-out infinite alternate}",
".lf-og{width:360px;height:360px;bottom:-100px;right:-80px;background:radial-gradient(circle,rgba(232,160,32,.13) 0%,transparent 70%);animation:lf-d2 11s ease-in-out infinite alternate}",
"@keyframes lf-d1{from{transform:translate(0,0)}to{transform:translate(6%,5%)}}",
"@keyframes lf-d2{from{transform:translate(0,0)}to{transform:translate(-5%,-7%)}}",
".lf-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:44px 44px}",
".lf-content{position:relative;z-index:2;padding:20px 16px}",
".lf-head{text-align:center;margin-bottom:18px}",
".lf-title{font-size:24px;font-weight:900;line-height:1;margin-bottom:14px;background:linear-gradient(135deg,#fff 25%,var(--gold) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}",
".lf-steps{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px}",
".lf-step-dot{width:10px;height:10px;border-radius:50%;background:var(--border-soft);transition:all .3s}",
".lf-step-dot.active{background:var(--gold);box-shadow:0 0 10px var(--gold);transform:scale(1.3)}",
".lf-bar-wrap{padding:0 4px;margin-bottom:18px}",
".lf-q{background:var(--surface-2);border:1px solid var(--border-soft);border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-card)}",
".lf-q-txt{font-weight:700;color:var(--text);font-size:15px;line-height:1.6;margin-bottom:12px}",
".lf-input{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid var(--border);background:var(--surface-softer);color:var(--text);font-family:'Tajawal',sans-serif;font-size:14px;outline:none;direction:rtl;transition:border-color .2s}",
".lf-input:focus{border-color:rgba(232,160,32,.5)}",
".lf-opt{display:block;padding:12px 14px;border-radius:12px;margin-bottom:8px;background:var(--surface-softer);border:1.5px solid var(--border);color:var(--text);font-size:14px;cursor:pointer;transition:all .2s}",
".lf-opt input{margin-left:10px;accent-color:var(--gold)}",
".lf-check{margin-top:12px;width:100%;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,#3B82F6,#2563eb);color:var(--text);font-family:'Tajawal',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:transform .15s}",
".lf-check:active{transform:scale(.97)}",
".lf-next{width:100%;margin-top:8px;padding:15px;border:none;border-radius:16px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#000;font-family:'Tajawal',sans-serif;font-weight:800;font-size:16px;cursor:pointer;box-shadow:0 6px 18px rgba(232,160,32,.35);transition:transform .15s}",
".lf-next:active{transform:scale(.97)}",
".lf-done{background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(16,163,74,.05));border:1.5px solid rgba(34,197,94,.4);border-radius:22px;padding:40px 24px;text-align:center;box-shadow:0 0 28px rgba(34,197,94,.15)}",
".lf-done-em{font-size:64px;margin-bottom:14px;animation:lf-bob 2s ease-in-out infinite}",
"@keyframes lf-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}",
".lf-done-t{font-size:22px;font-weight:900;color:#4ade80;margin-bottom:8px}",
".lf-done-d{font-size:14px;color:var(--text-muted)}",
].join("\n");

export default function LessonFlowPage({ lessonId }: any) {
  const [step, setStep] = useState(0);
  const [exercises, setExercises] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>({});

  useEffect(() => {
    if (!lessonId) return;
    getExercises(lessonId).then(setExercises);
    getQuizzes(lessonId).then(setQuizzes);
  }, [lessonId]);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <>
      <style>{CSS}</style>
      <div className="lf-root">
        <div className="lf-orb lf-ob" /><div className="lf-orb lf-og" /><div className="lf-grid" />
        <div className="lf-content">
          <div className="lf-head">
            <h1 className="lf-title">رحلة الدرس</h1>
            <div className="lf-steps">
              {[0, 1, 2].map((s) => (
                <div key={s} className={"lf-step-dot" + (s <= step ? " active" : "")} />
              ))}
            </div>
          </div>

          <div className="lf-bar-wrap">
            <ProgressBar value={progress} />
          </div>

          {/* الخطوة 1: التمارين */}
          {step === 0 && exercises.map((ex) => (
            <div key={ex.id} className="lf-q">
              <div className="lf-q-txt">{ex.question}</div>
              <input
                className="lf-input"
                placeholder="اكتب إجابتك..."
                onChange={(e) => setAnswers({ ...answers, [ex.id]: e.target.value })}
              />
              <button
                className="lf-check"
                onClick={() => {
                  const correct = answers[ex.id] === ex.answer;
                  setResult({ ...result, [ex.id]: correct });
                }}
              >
                تصحيح
              </button>
              {result[ex.id] !== undefined && <ResultMessage correct={result[ex.id]} />}
            </div>
          ))}
          {step === 0 && <button className="lf-next" onClick={() => setStep(1)}>التالي ←</button>}

          {/* الخطوة 2: الكويز */}
          {step === 1 && quizzes.map((q) => (
            <div key={q.id} className="lf-q">
              <div className="lf-q-txt">{q.question}</div>
              {q.options.map((opt: string) => (
                <label key={opt} className="lf-opt">
                  <input
                    type="radio"
                    name={q.id}
                    onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  />
                  {opt}
                </label>
              ))}
              <button
                className="lf-check"
                onClick={() => {
                  const correct = answers[q.id] === q.correct_answer;
                  setResult({ ...result, [q.id]: correct });
                }}
              >
                إرسال
              </button>
              {result[q.id] !== undefined && <QuizResult correct={result[q.id]} />}
            </div>
          ))}
          {step === 1 && <button className="lf-next" onClick={() => setStep(2)}>إنهاء ←</button>}

          {/* الخطوة 3: الإكمال */}
          {step === 2 && (
            <div className="lf-done">
              <div className="lf-done-em">🎉</div>
              <div className="lf-done-t">أكملت الدرس!</div>
              <div className="lf-done-d">عمل رائع، واصل التميّز 👏</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
