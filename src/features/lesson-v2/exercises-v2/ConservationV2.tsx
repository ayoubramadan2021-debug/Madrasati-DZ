import { useState, useEffect } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type ConservationItem = {
  emoji: string;
  count: number;
  question: string;
  question_audio_key: string;
  options: string[];
  correct: string;
};

interface ConservationV2Props {
  items: ConservationItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B", navyDeep: "#152C50", gold: "#E8A020",
  green: "#1FA463", greenSoft: "#D7F0E2", red: "#E05B49", redSoft: "#F8DAD5",
};
const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

// مواضع مبعثرة ثابتة (نسبة مئوية داخل منطقة العرض) — حتى 9 عناصر
const SCATTER = [
  { x: 18, y: 30 }, { x: 70, y: 20 }, { x: 45, y: 55 }, { x: 80, y: 60 },
  { x: 12, y: 68 }, { x: 55, y: 12 }, { x: 32, y: 80 }, { x: 88, y: 38 }, { x: 60, y: 82 },
];

export default function ConservationV2({ items, audio_base, onComplete }: ConservationV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [rearranged, setRearranged] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    karaoke.stop();
    setRearranged(false);
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx]);

  // شغّل صوت السؤال فقط بعد إعادة الترتيب
  useEffect(() => {
    if (!rearranged || !item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rearranged, timings]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleSelect = (option: string) => {
    if (locked || feedbackState === "correct") return;
    setSelectedOption(option);
    if (option === item.correct) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      karaoke.stop();
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        if (itemIdx + 1 < items.length) setItemIdx(itemIdx + 1);
        else onComplete?.(newScore, items.length);
      }, 1500);
    } else {
      setFeedbackState("wrong");
      const na = attempts + 1;
      setAttempts(na);
      playFeedback(false);
      if (na >= 3) setLocked(true);
      setTimeout(() => { setFeedbackState("idle"); setSelectedOption(null); }, 900);
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;
  const arr = Array.from({ length: item.count });
  const size = item.count > 7 ? 34 : item.count > 5 ? 40 : 46;

  return (
    <div style={{
      minHeight: "100dvh", background: "linear-gradient(180deg,#F3ECFB 0%,#E9DDF7 100%)",
      fontFamily: "Tajawal,sans-serif", direction: "rtl",
      display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
        <button onClick={() => { const t = timings[item.question_audio_key]; if (t && rearranged) karaoke.play(item.question_audio_key, t); }}
          style={{ background: C.gold, border: "none", borderRadius: "50%", width: 44, height: 44, fontSize: 20, cursor: "pointer" }}>🔊</button>
        <div style={{ background: C.navy, color: "#fff", borderRadius: 14, padding: "4px 14px", fontWeight: 700 }}>
          {itemIdx + 1} / {items.length}
        </div>
      </div>

      {/* منطقة العرض: صفّ مرتّب → تشكيل مبعثر */}
      <div style={{ flex: 1, position: "relative", margin: "8px 20px", minHeight: 240 }}>
        {!rearranged ? (
          <div style={{ position: "absolute", inset: 0 }}>
            {arr.map((_, i) => {
              const p = SCATTER[i % SCATTER.length];
              return (
                <span key={`${itemIdx}-${item.emoji}-${i}`} style={{
                  position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
                  transform: "translate(-50%,-50%)",
                  transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
                }}>
                  <EmojiIcon emoji={item.emoji} size={size} />
                </span>
              );
            })}
          </div>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: item.count > 6 ? 8 : 12, flexWrap: "wrap" }}>
            {arr.map((_, i) => (
              <span key={`${itemIdx}-${item.emoji}-${i}`} style={{ transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))" }}>
                <EmojiIcon emoji={item.emoji} size={size} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* زرّ إعادة الترتيب (قبل) أو السؤال + الخيارات (بعد) */}
      {!rearranged ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 16px 90px" }}>
          <button onClick={() => setRearranged(true)} style={{
            background: C.gold, color: "#fff", border: "none", borderRadius: 18,
            padding: "16px 28px", fontSize: 18, fontWeight: 800, fontFamily: "Tajawal,sans-serif", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(232,160,32,.4)",
          }}>جَمِّعْها 🧲</button>
        </div>
      ) : (
        <>
          <div style={{
            background: "#fff", borderRadius: 18, border: `2px solid ${C.gold}`,
            padding: "12px 16px", margin: "8px 16px", textAlign: "center",
            fontSize: 18, fontWeight: 700, lineHeight: 1.7, boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          }}>
            {words ? words.map((w, i) => {
              const isShown = karaoke.activeKey ? karaoke.shown.has(i) : false;
              const isCurrent = isActive && karaoke.currentIdx === i;
              return (
                <span key={i} style={{
                  display: "inline-block", opacity: isShown ? 1 : 0,
                  transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
                  color: isCurrent ? C.gold : C.navyDeep, fontWeight: isCurrent ? 900 : 700,
                  transition: "all .25s ease", margin: "0 2px",
                }}>{w.text} </span>
              );
            }) : <span style={{ opacity: 0.5 }}>{item.question}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 16px 90px", maxWidth: 380, margin: "0 auto", width: "100%" }}>
            {item.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const showAsCorrect = isSelected && feedbackState === "correct";
              const showAsWrong = isSelected && feedbackState === "wrong";
              const showHint = locked && opt === item.correct && feedbackState !== "correct";
              return (
                <button key={opt} onClick={() => handleSelect(opt)} disabled={locked}
                  style={{
                    padding: "16px 20px", borderRadius: 16, fontSize: 18, fontWeight: 800,
                    fontFamily: "Tajawal,sans-serif", cursor: locked ? "default" : "pointer",
                    border: `3px solid ${showAsCorrect || showHint ? C.green : showAsWrong ? C.red : C.gold}`,
                    background: showAsCorrect || showHint ? C.greenSoft : showAsWrong ? C.redSoft : "#fff",
                    color: C.navy, transition: "all .2s ease",
                  }}>{opt}</button>
              );
            })}
          </div>
        </>
      )}

      <style>{`@keyframes popIn { 0%{opacity:0;transform:translateY(-20px) scale(0.4);} 60%{opacity:1;transform:translateY(2px) scale(1.1);} 100%{opacity:1;transform:translateY(0) scale(1);} }`}</style>
    </div>
  );
}
