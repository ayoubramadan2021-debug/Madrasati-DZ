import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";
import { useEffect, useRef, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type MemorySameQuantityOption = {
  items: string[];
  label?: string;
};

export type MemorySameQuantityItem = {
  sample_items: string[];
  question: string;
  question_audio_key: string;
  options: MemorySameQuantityOption[];
  correct_index: number;
  show_ms?: number;
};

export interface MemorySameQuantityExerciseV2Props {
  items: MemorySameQuantityItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
  progress_current?: number;
  progress_total?: number;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#152C50",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#D7F0E2",
  red: "#E05B49",
  redSoft: "#F8DAD5",
};

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function MemorySameQuantityExerciseV2({
  items,
  audio_base,
  onComplete,
  progress_current,
  progress_total,
}: MemorySameQuantityExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [phase, setPhase] = useState<"show" | "choose">("show");
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const timersRef = useRef<number[]>([]);
  const karaoke = useKaraoke(audio_base);

  const item = items[itemIdx];

  const clearLocalTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });

    return () => {
      clearLocalTimers();
      karaoke.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  useEffect(() => {
    if (!item) return;

    clearLocalTimers();
    karaoke.stop();

    setPhase("show");
    setSelected(null);
    setFeedback("idle");
    setLocked(false);

    const hideTimer = window.setTimeout(() => {
      setPhase("choose");

      const t = timings[item.question_audio_key];
      if (t) {
        const playTimer = window.setTimeout(() => {
          karaoke.play(item.question_audio_key, t);
        }, 250);
        timersRef.current.push(playTimer);
      }
    }, item.show_ms ?? 3000);

    timersRef.current.push(hideTimer);

    return () => {
      clearLocalTimers();
      karaoke.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, item?.question_audio_key, timings[item?.question_audio_key ?? ""]]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const replaySample = () => {
    if (!item) return;

    clearLocalTimers();
    karaoke.stop();

    setPhase("show");
    setSelected(null);
    setFeedback("idle");
    setLocked(false);

    const hideTimer = window.setTimeout(() => {
      setPhase("choose");
      const t = timings[item.question_audio_key];
      if (t) karaoke.play(item.question_audio_key, t);
    }, item.show_ms ?? 3000);

    timersRef.current.push(hideTimer);
  };

  const moveSmoothly = (nextScore: number) => {
    clearLocalTimers();
    karaoke.stop();

    const t = window.setTimeout(() => {
      if (itemIdx + 1 < items.length) {
        setItemIdx((prev) => prev + 1);
      } else {
        onComplete?.(nextScore, items.length);
      }
    }, 1100);

    timersRef.current.push(t);
  };

  const handleChoose = (idx: number) => {
    if (!item || locked || feedback === "correct") return;

    setSelected(idx);

    const ok = idx === item.correct_index;

    if (ok) {
      const nextScore = score + 1;

      setScore(nextScore);
      setFeedback("correct");
      setLocked(true);
      playFeedback(true);

      moveSmoothly(nextScore);
      return;
    }

    setFeedback("wrong");
    playFeedback(false);

    const t = window.setTimeout(() => {
      setFeedback("idle");
      setSelected(null);
    }, 1800);

    timersRef.current.push(t);
  };

  if (!item) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: C.cream,
          color: C.navy,
          fontFamily: "Tajawal, sans-serif",
          fontSize: 24,
          fontWeight: 900,
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  const words = timings[item.question_audio_key] || [];
  const sceneActiveTxt = karaoke.activeKey === item.question_audio_key;

  const progressEmoji = "🧠";
  const missionText = `مهمة الذاكرة ${itemIdx + 1}`;

  const coachText =
    feedback === "correct"
      ? "رائع يا بطل! اخترتَ نفس الكمية 🎉"
      : feedback === "wrong"
        ? "اقتربت! تذكّر الكمية التي شاهدتها 👏"
        : phase === "show"
          ? "انظر جيدًا واحفظ الكمية 🧠"
          : "اختر المجموعة التي فيها نفس الكمية 🧠";

  const feedbackText =
    feedback === "correct"
      ? "✅ أَحْسَنْتَ"
      : "حَاوِلْ مَرَّةً أُخْرَى ✨";

  return (
    <div
      style={{
        minHeight: "100dvh",
        direction: "rtl",
        fontFamily: "Tajawal, sans-serif",
        background:
          "linear-gradient(180deg, rgba(255,248,236,.96), rgba(247,219,160,.98)), url('/lessons/v2/lesson14/s4.webp') center/cover no-repeat",
        display: "flex",
        flexDirection: "column",
        padding: "18px 16px 92px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <button
          onClick={() => {
            const t = timings[item.question_audio_key];
            if (t) karaoke.play(item.question_audio_key, t);
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `4px solid ${C.cream}`,
            background: C.gold,
            color: "white",
            fontSize: 24,
            boxShadow: "0 5px 16px rgba(232,160,32,.4)",
          }}
        >
          🔊
        </button>

        <div
          aria-label="تقدم التمرين"
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.62)",
            border: "2px solid rgba(232,160,32,.35)",
            borderRadius: 999,
            padding: "6px 10px",
            boxShadow: "0 6px 14px rgba(0,0,0,.08)",
          }}
        >
          {items.map((_, i) => {
            const done = i < itemIdx;
            const current = i === itemIdx;
            return (
              <span
                key={i}
                style={{
                  width: current ? 28 : 22,
                  height: current ? 28 : 22,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: current ? 22 : 18,
                  opacity: done || current ? 1 : 0.35,
                  filter: done || current ? "none" : "grayscale(1)",
                  transform: current ? "translateY(-2px) scale(1.08)" : "scale(1)",
                  transition: "all .25s ease",
                }}
              >
                {progressEmoji}
              </span>
            );
          })}
        </div>

        <div
          style={{
            direction: "ltr",
            unicodeBidi: "isolate",
            background: C.navy,
            color: "white",
            borderRadius: 999,
            padding: "9px 16px",
            fontSize: 20,
            fontWeight: 900,
            boxShadow: "0 5px 14px rgba(27,58,107,.25)",
          }}
        >
          <span dir="ltr">{progress_current ?? itemIdx + 1} / {progress_total ?? items.length}</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.9)",
            color: C.navy,
            border: `2px solid ${C.gold}`,
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 17,
            fontWeight: 1000,
            boxShadow: "0 6px 16px rgba(0,0,0,.12)",
          }}
        >
          {progressEmoji} {missionText}
        </div>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.96)",
          border: `3px solid ${C.gold}`,
          borderRadius: 24,
          padding: "16px 14px",
          minHeight: 84,
          textAlign: "center",
          fontSize: 23,
          lineHeight: 1.8,
          color: C.navy,
          fontWeight: 900,
          boxShadow: "0 8px 22px rgba(0,0,0,.12)",
          marginBottom: 16,
        }}
      >
        {phase === "show" ? (
          "اُنْظُرْ وَاحْفَظِ الكَمِّيَّةَ"
        ) : words.length ? (
          (
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
            )
        ) : (
          item.question
        )}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.96)",
          border: `3px dashed ${phase === "show" ? C.gold : "#BDAF8A"}`,
          borderRadius: 28,
          padding: "14px 10px",
          minHeight: phase === "show" ? 210 : 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 12,
          boxShadow: feedback === "correct" ? "0 12px 30px rgba(31,164,99,.25)" : feedback === "wrong" ? "0 12px 30px rgba(212,84,71,.22)" : "0 10px 24px rgba(0,0,0,.10)",
          marginBottom: 14,
        }}
      >
        {phase === "show" ? (
          item.sample_items.map((emoji, i) => (
            <span
              key={`${emoji}-${i}`}
              style={{
                animation: `memoryPop .35s ease both`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <EmojiIcon emoji={emoji} size={54} />
            </span>
          ))
        ) : (
          <div style={{ textAlign: "center", color: C.navy, fontWeight: 1000, fontSize: 24, lineHeight: 1.7 }}>
            <div style={{ fontSize: 52 }}>🧠</div>
            تَمَّ إِخْفَاءُ المَجْمُوعَةِ
            <br />
            اخْتَرْ نَفْسَ الكَمِّيَّةِ
          </div>
        )}
      </div>

      {phase === "choose" && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {item.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === item.correct_index;

              const bg = isSelected
                ? isCorrect
                  ? C.greenSoft
                  : C.redSoft
                : "rgba(255,255,255,.96)";

              const border = isSelected ? (isCorrect ? C.green : C.red) : C.gold;

              return (
                <button
                  key={idx}
                  onClick={() => handleChoose(idx)}
                  style={{
                    minHeight: 178,
                    borderRadius: 22,
                    border: `4px solid ${border}`,
                    background: bg,
                    boxShadow: "0 8px 18px rgba(0,0,0,.12)",
                    padding: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                      maxWidth: 150,
                    }}
                  >
                    {opt.items.map((emoji, i) => (
                      <EmojiIcon key={`${emoji}-${i}`} emoji={emoji} size={30} />
                    ))}
                  </div>

                  {opt.label && (
                    <div style={{ color: C.navyDeep, fontSize: 15, fontWeight: 900 }}>
                      ""
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={replaySample}
              style={{
                border: 0,
                borderRadius: 18,
                background: C.gold,
                color: "white",
                padding: "12px 20px",
                fontSize: 19,
                fontWeight: 1000,
                boxShadow: "0 7px 16px rgba(232,160,32,.32)",
              }}
            >
              أَعِدِ المُشَاهَدَةَ
            </button>
          </div>
        </>
      )}

      {feedback !== "idle" && (
        <div style={{
          position: "fixed",
          left: 18,
          right: 18,
          bottom: 96,
          zIndex: 999,
          background: "rgba(255,255,255,.96)",
          color: C.navy,
          border: `3px solid ${feedback === "correct" ? C.green : C.gold}`,
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

      {feedback === "correct" && (
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
          ✨ 🎉 🧠
        </div>
      )}

      <style>{`
        @keyframes feedbackPop {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes memoryPop {
          0% { opacity: 0; transform: translateY(-12px) scale(.5) rotate(-10deg); }
          70% { opacity: 1; transform: translateY(3px) scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
