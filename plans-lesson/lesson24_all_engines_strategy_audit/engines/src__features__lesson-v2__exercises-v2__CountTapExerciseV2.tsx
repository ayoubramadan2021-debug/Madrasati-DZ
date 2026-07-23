import { useState, useEffect, useRef, useCallback } from "react";
import { isKeyword } from "../keywords";

// ═══════════════════════════════════════════════════════════════
// CountTapExerciseV2 — اختر المجموعة الصحيحة
// عكس TapSelect: نعرض رقم كبير + 3 مجموعات من التفاحات
// الكاريوكي العددي: عند نطق كلمة العدد → الرقم الكبير يتوهج
// ═══════════════════════════════════════════════════════════════

export type CountTapItem = {
  target_number: number;           // الرقم المعروض (1-5)
  question: string;
  question_audio_key: string;
  count_word_index: number;        // index الكلمة العددية في الـtimings
  options: number[];               // 3 أعداد (كميات التفاحات في الصناديق)
  correct_index: number;           // index الخيار الصحيح
  items_emoji?: string;
};

export interface CountTapExerciseV2Props {
  items: CountTapItem[];
  audio_base: string;
  background_image?: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#5BCB8E",
  red: "#D45447",
  redSoft: "#F4C4BE",
};

type WordTiming = { text: string; offset: number; duration: number };

function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveKey(null);
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(async (key: string, words: WordTiming[]) => {
    stop();
    setShown(new Set());
    setActiveKey(key);
    const audio = new Audio(`${audioBase}/${key}.mp3`);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setCurrentIdx(-1));
    try {
      await audio.play();
    } catch {
      const all = new Set<number>();
      words.forEach((_, i) => all.add(i));
      setShown(all);
      return;
    }
    words.forEach((w, i) => {
      const t1 = window.setTimeout(() => {
        setShown((prev) => new Set(prev).add(i));
        setCurrentIdx(i);
      }, w.offset);
      const t2 = window.setTimeout(() => {
        setCurrentIdx((cur) => (cur === i ? -1 : cur));
      }, w.offset + w.duration);
      timersRef.current.push(t1, t2);
    });
  }, [audioBase, stop]);

  useEffect(() => () => stop(), [stop]);
  return { play, stop, activeKey, currentIdx, shown };
}

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

export default function CountTapExerciseV2({
  items,
  audio_base,
  background_image = "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
  onComplete,
}: CountTapExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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
    setSelectedIdx(null);
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

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const handleSelect = (idx: number) => {
    if (locked || feedbackState === "correct") return;
    karaoke.stop();
    setSelectedIdx(idx);
    const isCorrect = idx === item.correct_index;
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
        setTimeout(() => {
          setFeedbackState("idle");
          setSelectedIdx(null);
        }, 1500);
      }
    }
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;

  const progressEmoji = item.items_emoji || "🍌";

  const missionText = `مهمة العد ${itemIdx + 1}`;

  const coachText =
    feedbackState === "correct"
      ? "رائع يا بطل! اخترت المجموعة الصحيحة 🎉"
      : feedbackState === "wrong"
        ? attempts >= 2
          ? "اقتربت! عُدَّ الأشياء واحدة واحدة 👏"
          : "محاولة جميلة! جرّب مرة أخرى ✨"
        : "ساعدنا في اختيار المجموعة الصحيحة";

  const feedbackText =
    feedbackState === "correct"
      ? "🌟 أَحْسَنْتَ!"
      : "حَاوِلْ مَرَّةً أُخْرَى ✨";
  const isNumberGlowing = isActive && karaoke.currentIdx === item.count_word_index;

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      position: "relative",
      fontFamily: "Tajawal, sans-serif",
      direction: "rtl",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('${background_image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(2px) brightness(0.85)",
      }} />

      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "70%",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,248,236,0.88) 40%, rgba(247,219,160,0.98) 100%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
      }}>
        <button onClick={replayQuestion} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: C.gold, color: "white",
          border: `3px solid ${C.cream}`,
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 12px rgba(232,160,32,.4)",
        }}>🔊</button>

        <div
          aria-label="تقدم التمرين"
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.55)",
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

        <div style={{
          background: C.navy, color: C.cream,
          padding: "6px 12px", borderRadius: 999,
          fontSize: 13, fontWeight: 700,
        }}>
          {itemIdx + 1} / {items.length}
        </div>
      </div>

      {/* Big number display (with karaoke glow) */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex",
        justifyContent: "center",
        padding: "10px 16px 0",
      }}>
        <div style={{
          width: isNumberGlowing ? 130 : 110,
          height: isNumberGlowing ? 130 : 110,
          background: "rgba(255,255,255,0.96)",
          border: `5px solid ${isNumberGlowing ? C.gold : C.navy}`,
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isNumberGlowing ? 84 : 72,
          fontWeight: 900,
          color: isNumberGlowing ? C.gold : C.navyDeep,
          fontFamily: "Tajawal, sans-serif",
          boxShadow: isNumberGlowing
            ? "0 0 32px rgba(232,160,32,0.7), 0 0 16px rgba(255,215,0,0.5), 0 8px 24px rgba(0,0,0,.2)"
            : "0 6px 20px rgba(0,0,0,.15)",
          transform: isNumberGlowing ? "scale(1.1) rotate(-2deg)" : "scale(1) rotate(0)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          {item.target_number}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          marginTop: 8,
          marginBottom: 4,
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

      {/* Question bubble */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "8px 16px 8px",
      }}>
        <div onClick={replayQuestion} style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${C.gold}`,
          borderRadius: 18,
          padding: "12px 16px",
          maxWidth: 400,
          margin: "0 auto",
          minHeight: 50,
          fontSize: 16,
          lineHeight: 1.6,
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,.15)",
          cursor: "pointer",
        }}>
          {words ? words.map((w, i) => {
            const isShown = karaoke.activeKey ? karaoke.shown.has(i) : true;
            const isCurrent = isActive && karaoke.currentIdx === i;
            return (
              <span key={i} style={{
                display: "inline-block",
                opacity: (isShown || feedbackState !== "idle" || locked) ? 1 : 0,
                transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
                color: isCurrent ? C.gold : (isKeyword(w.text) ? "#16a34a" : C.navyDeep),
                fontWeight: isCurrent ? 900 : 700,
                transition: "all .25s ease",
                margin: "0 2px",
              }}>{w.text} </span>
            );
          }) : <span style={{ opacity: 0.5 }}>...</span>}
        </div>
      </div>

      {/* 3 option groups */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "8px 16px 100px",
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
        maxWidth: 480,
        margin: "0 auto",
        width: "100%",
      }}>
        {item.options.map((count, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrectAnswer = idx === item.correct_index;
          const showAsCorrect = isSelected && feedbackState === "correct";
          const showAsWrong = isSelected && feedbackState === "wrong";
          const showCorrectHint = locked && isCorrectAnswer && feedbackState !== "correct";
          const bg = showAsCorrect || showCorrectHint ? C.greenSoft
            : showAsWrong ? C.redSoft
            : "rgba(255,255,255,0.95)";
          const border = showAsCorrect || showCorrectHint ? C.green
            : showAsWrong ? C.red
            : C.gold;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={locked}
              style={{
                flex: "1 1 28%",
                minWidth: 90,
                maxWidth: 130,
                aspectRatio: "1",
                background: bg,
                border: `3px solid ${border}`,
                borderRadius: 18,
                padding: 8,
                cursor: locked ? "default" : "pointer",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                boxShadow: showAsCorrect ? "0 0 0 8px rgba(31,164,99,.14), 0 12px 28px rgba(31,164,99,.32)" : isSelected ? "0 6px 16px rgba(0,0,0,.25)" : "0 4px 12px rgba(0,0,0,.1)",
                transform: showAsCorrect ? "scale(1.08)" : showAsWrong ? "scale(0.95)" : "scale(1)",
                transition: "all .3s ease",
                opacity: 0,
                animation: "optionPopIn .42s ease forwards",
                animationDelay: `${idx * 90}ms`,
                fontFamily: "Tajawal, sans-serif",
              }}
            >
              {Array.from({ length: count }).map((_, i) => (
                <span key={i} style={{
                  fontSize: count <= 2 ? 32 : count <= 3 ? 26 : count <= 4 ? 22 : 18,
                  display: "inline-block",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                }}>
                  {item.items_emoji || "🍎"}
                </span>
              ))}
            </button>
          );
        })}
      </div>

      {feedbackState !== "idle" && (
        <div style={{
          position: "fixed",
          left: 18,
          right: 18,
          bottom: 98,
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
          ✨ 🎉 ⭐
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

        @keyframes feedbackPop {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
