import { useState, useEffect } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type CountSelectItem = {
  items: string[];
  question: string;
  question_audio_key: string;
  options: string[];
  correct: string;
};

interface CountSelectV2Props {
  items: CountSelectItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B", navyDeep: "#152C50", gold: "#E8A020",
  green: "#1FA463", greenSoft: "#D7F0E2", red: "#E05B49", redSoft: "#F8DAD5",
};
const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function CountSelectV2({ items, audio_base, onComplete }: CountSelectV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
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
    setSelectedOption(null);
    setFeedbackState("idle");
    setAttempts(0);
    setLocked(false);
    if (!item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleSelect = (option: string) => {
    if (locked || feedbackState === "correct") return;
    setSelectedOption(option);
    const isCorrect = option === item.correct;
    if (isCorrect) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      karaoke.stop();
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        if (itemIdx + 1 < items.length) {
          setItemIdx(itemIdx + 1);
        } else {
          onComplete?.(newScore, items.length);
        }
      }, 1400);
    } else {
      setFeedbackState("wrong");
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      playFeedback(false);
      if (newAttempts >= 3) setLocked(true);
      setTimeout(() => { setFeedbackState("idle"); setSelectedOption(null); }, 900);
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;
  const n = item.items.length;
  const emojiSize = n > 7 ? 34 : n > 5 ? 40 : 46;

  return (
    <div style={{
      minHeight: "100dvh", background: "linear-gradient(180deg,#F3ECFB 0%,#E9DDF7 100%)",
      fontFamily: "Tajawal,sans-serif", direction: "rtl",
      display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
        <button onClick={() => { const t = timings[item.question_audio_key]; if (t) karaoke.play(item.question_audio_key, t); }}
          style={{ background: C.gold, border: "none", borderRadius: "50%", width: 44, height: 44, fontSize: 20, cursor: "pointer" }}>🔊</button>
        <div style={{ background: C.navy, color: "#fff", borderRadius: 14, padding: "4px 14px", fontWeight: 700 }}>
          {itemIdx + 1} / {items.length}
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 10, padding: "8px 20px",
      }}>
        {(() => {
          const top = Math.ceil(n / 2);
          const rows = [item.items.slice(0, top), item.items.slice(top)];
          return rows.map((row, r) => (
            <div key={r} style={{ display: "flex", justifyContent: "center", gap: n > 6 ? 8 : 12 }}>
              {row.map((e, i) => {
                const gi = r === 0 ? i : top + i;
                return (
                  <span key={`${itemIdx}-${gi}-${e}`} style={{
                    display: "inline-block",
                    animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                    animationDelay: `${gi * 0.08}s`, opacity: 0,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
                  }}>
                    <EmojiIcon emoji={e} size={emojiSize} />
                  </span>
                );
              })}
            </div>
          ));
        })()}
      </div>

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
              color: isCurrent ? C.gold : C.navyDeep,
              fontWeight: isCurrent ? 900 : 700, transition: "all .25s ease", margin: "0 2px",
            }}>{w.text} </span>
          );
        }) : <span style={{ opacity: 0.5 }}>{item.question}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "8px 16px 90px" }}>
        {item.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const showAsCorrect = isSelected && feedbackState === "correct";
          const showAsWrong = isSelected && feedbackState === "wrong";
          const showHint = locked && opt === item.correct && feedbackState !== "correct";
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={locked}
              style={{
                width: 72, height: 72, borderRadius: 18, fontSize: 32, fontWeight: 900,
                fontFamily: "Tajawal,sans-serif", cursor: locked ? "default" : "pointer",
                border: `3px solid ${showAsCorrect || showHint ? C.green : showAsWrong ? C.red : C.gold}`,
                background: showAsCorrect || showHint ? C.greenSoft : showAsWrong ? C.redSoft : "#fff",
                color: C.navy, transition: "all .2s ease",
              }}>{opt}</button>
          );
        })}
      </div>

      <style>{`@keyframes popIn { 0%{opacity:0;transform:translateY(-20px) scale(0.4);} 60%{opacity:1;transform:translateY(2px) scale(1.1);} 100%{opacity:1;transform:translateY(0) scale(1);} }`}</style>
    </div>
  );
}
