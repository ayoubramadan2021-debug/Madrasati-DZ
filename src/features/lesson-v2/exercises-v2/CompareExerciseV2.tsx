import { useState, useEffect } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import { isKeyword } from "../keywords";
import EmojiIcon from "../components/EmojiIcon";

export type CompareItem = {
  group_a: string[];          // إيموجي المجموعة الأولى
  group_b: string[];          // إيموجي المجموعة الثانية
  question: string;
  question_audio_key: string;
  options: string[];          // كلمات: أكثر/أقل/بقدر
  correct: string;
};

interface CompareExerciseV2Props {
  items: CompareItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B", navyDeep: "#152C50", gold: "#E8A020",
  green: "#1FA463", greenSoft: "#D7F0E2", red: "#E05B49", redSoft: "#F8DAD5",
};
const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function CompareExerciseV2({ items, audio_base, onComplete }: CompareExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
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
    karaoke.stop();
    setSelectedOption(option);
    const isCorrect = option === item.correct;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (isCorrect) {
      setFeedbackState("correct");
      setLocked(true);
      playFeedback(true);
      setTimeout(() => {
        if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
        else onComplete?.(items.length, items.length);
      }, 1800);
    } else {
      setFeedbackState("wrong");
      playFeedback(false);
      if (newAttempts >= 3) {
        setLocked(true);
        setTimeout(() => {
          if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
          else onComplete?.(items.length, items.length);
        }, 2200);
      } else {
        setTimeout(() => { setFeedbackState("idle"); setSelectedOption(null); }, 1500);
      }
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;

  const renderGroup = (emojis: string[]) => (
    <div style={{
      flex: 1, display: "flex", flexWrap: "wrap", gap: 6,
      justifyContent: "center", alignItems: "center",
      background: "rgba(255,255,255,0.7)", borderRadius: 16,
      border: `2px solid ${C.gold}33`, padding: 8, minHeight: 80,
    }}>
      {emojis.map((e, i) => (
        <span key={`${itemIdx}-${i}-${e}`} style={{ fontSize: 34, lineHeight: 1 }}>
          <EmojiIcon emoji={e} size={38} />
        </span>
      ))}
    </div>
  );

  return (
    <div style={{
      minHeight: "100dvh", width: "100%",
      fontFamily: "Tajawal, sans-serif", direction: "rtl",
      background: "linear-gradient(180deg,#FFF8EC 0%,#F5E3B0 100%)",
      display: "flex", flexDirection: "column", padding: "16px",
    }}>
      {/* progress + replay */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ background: C.navy, color: "#fff", borderRadius: 20, padding: "4px 12px", fontWeight: 800, fontSize: 13 }}>
          {items.length} / {itemIdx + 1}
        </div>
        <button onClick={() => { const t = timings[item.question_audio_key]; if (t) karaoke.play(item.question_audio_key, t); }}
          style={{ width: 40, height: 40, borderRadius: "50%", background: C.gold, color: "#fff", border: "none", fontSize: 18, cursor: "pointer" }}>🔊</button>
      </div>

      {/* groups */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        {renderGroup(item.group_a)}
        <div style={{ fontSize: 28, fontWeight: 900, color: C.navy }}>
          {item.correct === "أَكْثَر" ? "→" : item.correct === "أَقَلّ" ? "←" : "↔"}
        </div>
        {renderGroup(item.group_b)}
      </div>

      {/* question */}
      <div style={{
        background: "#fff", borderRadius: 18, border: `2px solid ${C.gold}`,
        padding: "12px 16px", margin: "8px 0", textAlign: "center",
        fontSize: 17, fontWeight: 700, lineHeight: 1.7,
        boxShadow: "0 4px 14px rgba(0,0,0,.12)",
      }}>
        {words ? words.map((w, i) => {
          const isShown = karaoke.activeKey ? karaoke.shown.has(i) : false;
          const isCurrent = isActive && karaoke.currentIdx === i;
          return (
            <span key={i} style={{
              display: "inline-block", opacity: isShown ? 1 : 0,
              transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
              color: isCurrent ? C.gold : (isKeyword(w.text) ? "#16a34a" : C.navyDeep),
              fontWeight: isCurrent ? 900 : 700, transition: "all .25s ease", margin: "0 2px",
            }}>{w.text} </span>
          );
        }) : <span style={{ opacity: 0.5 }}>{item.question}</span>}
      </div>

      {/* options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 90 }}>
        {item.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const showAsCorrect = isSelected && feedbackState === "correct";
          const showAsWrong = isSelected && feedbackState === "wrong";
          const showHint = locked && opt === item.correct && feedbackState !== "correct";
          const bg = showAsCorrect || showHint ? C.greenSoft : showAsWrong ? C.redSoft : "#fff";
          const border = showAsCorrect || showHint ? C.green : showAsWrong ? C.red : C.gold;
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={locked}
              style={{
                padding: "16px", background: bg, border: `3px solid ${border}`,
                borderRadius: 16, fontSize: 20, fontWeight: 800, color: C.navyDeep,
                fontFamily: "Tajawal, sans-serif", cursor: locked ? "default" : "pointer",
                transition: "all .25s ease",
              }}>{opt}</button>
          );
        })}
      </div>

      {feedbackState !== "idle" && (
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: feedbackState === "correct" ? C.green : C.gold, color: "#fff",
          padding: "16px 28px", borderRadius: 24, fontSize: 20, fontWeight: 800,
          boxShadow: "0 12px 32px rgba(0,0,0,.3)", zIndex: 100, pointerEvents: "none",
        }}>
          {feedbackState === "correct" ? "أَحْسَنْت 🎉" : `حَاوِلْ مَرَّةً أُخْرَى (${3 - attempts})`}
        </div>
      )}
    </div>
  );
}
