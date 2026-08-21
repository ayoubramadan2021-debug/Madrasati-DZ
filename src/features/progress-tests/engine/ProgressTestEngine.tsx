import { useMemo, useRef, useState } from "react";
import { scoreProgressTest } from "../scoring";
import { recordProgressTestResult } from "../storage";
import type { ProgressActivity, ProgressAnswer, ProgressTestDefinition, ProgressTestResult } from "../types";
import "../progress-tests.css";

interface Props {
  test: ProgressTestDefinition;
  onContinue: () => void;
  onReview: () => void;
}

function hasAnswer(activity: ProgressActivity, answer: ProgressAnswer | undefined): boolean {
  if (answer === undefined) return false;
  if (activity.type === "choice") return typeof answer === "string" && answer.length > 0;
  return Array.isArray(answer) && answer.length > 0;
}

export default function ProgressTestEngine({ test, onContinue, onReview }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ProgressAnswer>>({});
  const [result, setResult] = useState<ProgressTestResult | null>(null);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [rankingAdded, setRankingAdded] = useState(0);
  const [serverSynced, setServerSynced] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activity = test.activities[index];
  const answer = activity ? answers[activity.id] : undefined;
  const progress = Math.round(((index + 1) / test.activities.length) * 100);
  const skillLabels = useMemo(
    () => Object.fromEntries(test.skills.map((skill) => [skill.id, skill.label])),
    [test.skills],
  );

  function setAnswer(value: ProgressAnswer) {
    setAnswers((current) => ({ ...current, [activity.id]: value }));
  }

  function playPrompt() {
    audioRef.current?.pause();
    const audio = new Audio(`/audio/progress-tests/pt-01/${activity.audioKey}.mp3`);
    audioRef.current = audio;
    void audio.play();
  }

  async function next() {
    if (!hasAnswer(activity, answer) || submitting) return;

    const finalAnswers = { ...answers, [activity.id]: answer as ProgressAnswer };
    if (index < test.activities.length - 1) {
      setAnswers(finalAnswers);
      setIndex((value) => value + 1);
      return;
    }

    const scored = scoreProgressTest(test, finalAnswers);
    setSubmitting(true);
    try {
      const stored = await recordProgressTestResult(scored);
      setAnswers(finalAnswers);
      setResult(scored);
      setXpAwarded(stored.xpAwardedNow);
      setRankingAdded(stored.rankingAddedNow);
      setServerSynced(stored.record.serverSynced);
    } finally {
      setSubmitting(false);
    }
  }

  function restart() {
    setIndex(0); setAnswers({}); setResult(null); setXpAwarded(0); setRankingAdded(0); setServerSynced(null);
  }

  if (result) {
    return (
      <main className="pt-shell" dir="rtl">
        <section className="pt-result-card">
          <div className="pt-celebration">{result.passed ? "🎉" : "🌱"}</div>
          <p className="pt-kicker">تعليم ديزاد</p>
          <h1>{result.passed ? "أحسنت!" : "بقيت خطوة صغيرة"}</h1>
          <div className="pt-score-ring"><strong>{result.score}%</strong><span>إتقان</span></div>
          <div className="pt-stars" aria-label={`${result.stars} نجوم`}>
            {"★".repeat(result.stars)}<span>{"★".repeat(3 - result.stars)}</span>
          </div>

          <div className="pt-reward-row">
            <div><b>+{xpAwarded}</b><span>XP جديد</span></div>
            <div><b>+{rankingAdded}</b><span>تحسن الترتيب</span></div>
            <div><b>{result.correct}/{result.total}</b><span>إجابات صحيحة</span></div>
          </div>

          <div className="pt-skill-grid">
            {test.skills.map((skill) => {
              const value = result.skillScores[skill.id];
              return (
                <div className="pt-skill" key={skill.id}>
                  <div><strong>{skillLabels[skill.id]}</strong><span>{value}%</span></div>
                  <div className="pt-skill-bar"><i style={{ width: `${value}%` }} /></div>
                  <small>{value >= 85 ? "متقن" : value >= 70 ? "جيد" : "يحتاج مراجعة"}</small>
                </div>
              );
            })}
          </div>

          {serverSynced === false && <p className="pt-sync-note">تم حفظ النتيجة على الجهاز، وتعذر مزامنة سجل الاختبار مع الخادم.</p>}

          <div className="pt-result-actions">
            {result.passed
              ? <button className="pt-primary" onClick={onContinue}>🔓 الدرس 11</button>
              : <button className="pt-primary" onClick={onReview}>🎯 راجع مهاراتي</button>}
            <button className="pt-secondary" onClick={restart}>🔄 إعادة الاختبار</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-shell" dir="rtl">
      <section className="pt-card">
        <header className="pt-header">
          <div><p className="pt-kicker">🟣 {test.title}</p><h1>{test.subtitle}</h1></div>
          <div className="pt-counter">{index + 1} / {test.activities.length}</div>
        </header>

        <div className="pt-progress-track"><div style={{ width: `${progress}%` }} /></div>

        <div className="pt-prompt-row">
          <button className="pt-audio" onClick={playPrompt} aria-label="اسمع التعليمة">🔊</button>
          <h2>{activity.prompt}</h2>
        </div>

        {activity.visual && <div className="pt-visual">{activity.visual}</div>}

        {activity.type === "choice" && (
          <div className="pt-options">
            {activity.options.map((option) => (
              <button
                key={option.id}
                className={`pt-option ${answer === option.id ? "selected" : ""}`}
                onClick={() => setAnswer(option.id)}
              >
                {option.visual && <span className="pt-option-visual">{option.visual}</span>}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {activity.type === "tap-count" && (
          <div>
            <div className="pt-tap-grid">
              {activity.items.map((item, itemIndex) => {
                const selected = Array.isArray(answer) && answer.map(String).includes(String(itemIndex));
                return (
                  <button
                    key={`${activity.id}-${itemIndex}`}
                    className={`pt-tap-item ${selected ? "selected" : ""}`}
                    onClick={() => {
                      const current = Array.isArray(answer) ? answer.map(String) : [];
                      const id = String(itemIndex);
                      setAnswer(current.includes(id) ? current.filter((v) => v !== id) : [...current, id]);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="pt-selection-count">اخترت: {Array.isArray(answer) ? answer.length : 0}</p>
          </div>
        )}

        {activity.type === "order" && (
          <div>
            <div className="pt-order-target">
              {(Array.isArray(answer) ? answer.map(String) : []).map((token, tokenIndex) => (
                <button
                  key={`${token}-${tokenIndex}`}
                  onClick={() => {
                    const current = Array.isArray(answer) ? answer.map(String) : [];
                    setAnswer(current.filter((_, i) => i !== tokenIndex));
                  }}
                >
                  {token}
                </button>
              ))}
            </div>
            <div className="pt-order-source">
              {activity.tokens
                .filter((token) => !(Array.isArray(answer) && answer.map(String).includes(token)))
                .map((token) => (
                  <button
                    key={token}
                    onClick={() => {
                      const current = Array.isArray(answer) ? answer.map(String) : [];
                      setAnswer([...current, token]);
                    }}
                  >
                    {token}
                  </button>
                ))}
            </div>
            <small className="pt-hint">اضغط على الأعداد بالترتيب. اضغط على عدد في الأعلى لإرجاعه.</small>
          </div>
        )}

        <footer className="pt-footer">
          <span>لا نكشف التصحيح أثناء الاختبار.</span>
          <button className="pt-primary" disabled={!hasAnswer(activity, answer) || submitting} onClick={() => void next()}>
            {submitting ? "جارٍ حفظ النتيجة..." : index === test.activities.length - 1 ? "إنهاء الاختبار" : "التالي ←"}
          </button>
        </footer>
      </section>
    </main>
  );
}
