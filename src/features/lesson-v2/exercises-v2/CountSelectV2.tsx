import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";
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
  const isZeroEmptyBox = item.items.length === 0;

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
      setTimeout(() => { setFeedbackState("idle"); setSelectedOption(null); }, 1500);
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;

  const progressEmoji = "🔢";
  const missionText = `مهمة العد ${itemIdx + 1}`;

  const coachText =
    feedbackState === "correct"
      ? "رائع يا بطل! اخترتَ العدد الصحيح 🎉"
      : feedbackState === "wrong"
        ? "اقتربت! عُدّ العناصر مرة أخرى 👏"
        : "عُدّ جيدًا ثم اختر العدد المناسب 🔢";

  const feedbackText =
    feedbackState === "correct"
      ? "✅ أَحْسَنْتَ"
      : "حَاوِلْ مَرَّةً أُخْرَى ✨";

  const emptyBoxVisual = (
    <div
      aria-label="صندوق فارغ"
      style={{
        width: "100%",
        minHeight: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: "linear-gradient(180deg, #FFFDF6, #FFF1C7)",
        border: `4px dashed ${C.gold}`,
        borderRadius: 28,
        color: C.navy,
        boxShadow: "0 10px 24px rgba(0,0,0,.10)",
        animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div style={{ fontSize: 58, lineHeight: 1 }}>📦</div>
      <div style={{ fontSize: 22, fontWeight: 1000 }}>الصُّنْدُوقُ فَارِغٌ</div>
      <div style={{ fontSize: 42, fontWeight: 1000, color: C.gold }}>0</div>
    </div>
  );
  const n = item.items.length;
  const emojiSize = n > 7 ? 34 : n > 5 ? 40 : 46;

  const top = Math.ceil(n / 2);
  const rows = [item.items.slice(0, top), item.items.slice(top)];

  const surpriseBoxVisual = (
    <div
      aria-label={isZeroEmptyBox ? "صندوق فارغ العدد صفر" : "صندوق فيه كرات"}
      style={{
        width: "100%",
        maxWidth: 360,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "16px 14px",
        borderRadius: 34,
        border: `4px solid ${C.gold}`,
        background: "linear-gradient(180deg, #FFFDF7 0%, #FFF0BD 100%)",
        boxShadow: "0 14px 32px rgba(0,0,0,.14)",
        color: C.navy,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 16,
          left: 16,
          textAlign: "center",
          fontSize: 18,
          fontWeight: 1000,
          color: C.navyDeep,
        }}
      >
        صُنْدُوقُ الكُرَاتِ
      </div>

      <div style={{ fontSize: 58, lineHeight: 1, marginTop: 28 }}>📦</div>

      {isZeroEmptyBox ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 23, fontWeight: 1000 }}>
            الصُّنْدُوقُ فَارِغٌ
          </div>
          <div style={{ fontSize: 58, fontWeight: 1000, color: C.gold, lineHeight: 1 }}>
            0
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          {rows.map((row, r) => (
            <div
              key={r}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: n > 6 ? 8 : 12,
              }}
            >
              {row.map((e, i) => {
                const gi = r === 0 ? i : top + i;
                return (
                  <span
                    key={`${itemIdx}-${gi}-${e}`}
                    style={{
                      display: "inline-block",
                      animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                      animationDelay: `${gi * 0.08}s`,
                      opacity: 0,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
                    }}
                  >
                    <EmojiIcon emoji={e} size={emojiSize} />
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
          <span dir="ltr">{itemIdx + 1} / {items.length}</span>
        </div>
      </div>

      <div style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 10, padding: "8px 20px",
        }}>
          {surpriseBoxVisual}
        </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.88)",
            color: C.navyDeep,
            border: `2px solid ${C.gold}`,
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 16,
            fontWeight: 900,
            boxShadow: "0 6px 16px rgba(0,0,0,.12)",
          }}
        >
          {progressEmoji} {missionText}
        </div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 18, border: `2px solid ${C.gold}`,
        padding: "12px 16px", margin: "8px 16px", textAlign: "center",
        fontSize: 18, fontWeight: 700, lineHeight: 1.7, boxShadow: "0 4px 14px rgba(0,0,0,.12)",
      }}>
        {words ? (
              <UnifiedExerciseKaraokeV2
                words={words.map((word) => word.text)}
                activeIndex={
                  karaoke.activeKey ===
                  item.question_audio_key
                    ? karaoke.currentIdx
                    : -1
                }
                shownWordCount={
                  karaoke.shown.size > 0
                  ? Math.min(
                      words.length,
                      Math.max(
                        ...karaoke.shown,
                      ) + 1,
                    )
                  : 0
                }
              />
            ) : <span style={{ opacity: 0.5 }}>{item.question}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 14, padding: "8px 16px 90px" }}>
        {item.options.map((opt, optionIndex) => {
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
                color: C.navy,
                transition: "all .25s ease", boxShadow: showAsCorrect ? "0 10px 26px rgba(31,164,99,.35)" : isSelected ? "0 6px 16px rgba(0,0,0,.22)" : "0 4px 12px rgba(0,0,0,.12)", transform: showAsCorrect ? "translateY(-4px) scale(1.08)" : showAsWrong ? "scale(0.95)" : "scale(1)",
                opacity: 0,
                animation: "optionPopIn .42s ease forwards",
                animationDelay: `${optionIndex * 90}ms`,
              }}>{opt}</button>
          );
        })}
      </div>

      {feedbackState !== "idle" && (
        <div style={{
          position: "fixed",
          left: 18,
          right: 18,
          bottom: 96,
          zIndex: 999,
          background: "rgba(255,255,255,.96)",
          color: C.navyDeep,
          border: `3px solid ${feedbackState === "correct" ? C.green : C.gold}`,
          borderRadius: 22,
          padding: "12px 16px",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 900,
          boxShadow: "0 10px 26px rgba(0,0,0,.18)",
          animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          {coachText}
        </div>
      )}

      {feedbackState === "correct" && (
        <div style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          animation: "feedbackPop .45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          ✨ 🎉 🔢
        </div>
      )}

      {feedbackState !== "idle" && (
        <div style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: feedbackState === "correct" ? "#20A567" : "#EF4444",
          color: "white",
          padding: "20px 34px",
          borderRadius: 999,
          fontSize: 28,
          fontWeight: 900,
          boxShadow: "0 18px 38px rgba(0,0,0,.28)",
          border: "6px solid rgba(255,255,255,.9)",
          zIndex: 1000,
          animation: "feedbackPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          pointerEvents: "none",
          textAlign: "center",
          fontFamily: "Tajawal, sans-serif",
          minWidth: 245,
        }}>
          {feedbackText}
        </div>
      )}

      <style>{`
        @keyframes optionPopIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.92); }
          70% { opacity: 1; transform: translateY(-2px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes popIn {
          0%{opacity:0;transform:translateY(-20px) scale(0.4);}
          60%{opacity:1;transform:translateY(2px) scale(1.1);}
          100%{opacity:1;transform:translateY(0) scale(1);}
        }

        @keyframes feedbackPop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
