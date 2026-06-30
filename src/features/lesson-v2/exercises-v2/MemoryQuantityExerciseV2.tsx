import { useEffect, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type MemoryQuantityItem = {
  items: string[];
  question: string;
  question_audio_key: string;
  options: string[];
  correct: string;
  show_ms?: number;
};

export interface MemoryQuantityExerciseV2Props {
  items: MemoryQuantityItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
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

export default function MemoryQuantityExerciseV2({
  items,
  audio_base,
  onComplete,
}: MemoryQuantityExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [phase, setPhase] = useState<"show" | "hide">("show");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
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
    setPhase("show");
    setSelectedOption(null);
    setFeedbackState("idle");
    setLocked(false);

    const hideTimer = window.setTimeout(() => {
      setPhase("hide");
      const t = timings[item.question_audio_key];
      if (t) {
        window.setTimeout(() => karaoke.play(item.question_audio_key, t), 300);
      }
    }, item.show_ms ?? 2800);

    return () => {
      window.clearTimeout(hideTimer);
      karaoke.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const replayShow = () => {
    karaoke.stop();
    setPhase("show");
    setSelectedOption(null);
    setFeedbackState("idle");
    setLocked(false);

    window.setTimeout(() => {
      setPhase("hide");
      const t = timings[item.question_audio_key];
      if (t) karaoke.play(item.question_audio_key, t);
    }, item.show_ms ?? 2800);
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
      }, 1500);
    } else {
      setFeedbackState("wrong");
      playFeedback(false);
      setTimeout(() => {
        setFeedbackState("idle");
        setSelectedOption(null);
      }, 900);
    }
  };

  if (!item) return <div>Loading...</div>;

  const words = timings[item.question_audio_key] || [];
  const sceneActiveTxt = karaoke.activeKey === item.question_audio_key;

  return (
    <div
      style={{
        minHeight: "100dvh",
        direction: "rtl",
        fontFamily: "Tajawal, sans-serif",
        background:
          "linear-gradient(180deg, rgba(255,248,236,0.96), rgba(247,219,160,0.98)), url('/lessons/v2/lesson14/s1.webp') center/cover no-repeat",
        display: "flex",
        flexDirection: "column",
        padding: "18px 16px 92px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            background: C.navy,
            color: "white",
            borderRadius: 999,
            padding: "9px 16px",
            fontSize: 20,
            fontWeight: 900,
            boxShadow: "0 5px 14px rgba(27,58,107,.25)",
          }}
        >
          {itemIdx + 1} / {items.length}
        </div>

        <div style={{ display: "flex", gap: 7 }}>
          {items.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === itemIdx ? 28 : 10,
                height: 10,
                borderRadius: 999,
                background: i < itemIdx ? C.green : i === itemIdx ? C.gold : "#E0CFA8",
                transition: "all .25s ease",
              }}
            />
          ))}
        </div>

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
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.96)",
          border: `3px solid ${C.gold}`,
          borderRadius: 24,
          padding: "18px 16px",
          minHeight: 86,
          textAlign: "center",
          fontSize: 24,
          lineHeight: 1.8,
          color: C.navy,
          fontWeight: 900,
          boxShadow: "0 8px 22px rgba(0,0,0,.12)",
          marginBottom: 20,
        }}
      >
        {phase === "show" ? (
          "اُنْظُرْ جَيِّدًا وَاحْفَظِ العَدَدَ"
        ) : words.length ? (
          words.map((w, i) => {
            const isShown = sceneActiveTxt ? karaoke.shown.has(i) : true;
            const isCurrent = sceneActiveTxt && karaoke.currentIdx === i;
            return (
              <span
                key={`${w.text}-${i}`}
                style={{
                  opacity: isShown ? 1 : 0.14,
                  color: isCurrent ? C.gold : C.navy,
                  fontWeight: isCurrent ? 1000 : 900,
                  transform: isCurrent ? "scale(1.08)" : "scale(1)",
                  display: "inline-block",
                  marginInline: 3,
                  transition: "all .16s ease",
                }}
              >
                {w.text}
              </span>
            );
          })
        ) : (
          item.question
        )}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,.96)",
          border: `3px dashed ${phase === "show" ? C.gold : "#BDAF8A"}`,
          borderRadius: 28,
          padding: "18px 12px",
          minHeight: 230,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 14,
          boxShadow: "0 10px 24px rgba(0,0,0,.10)",
          marginBottom: 18,
        }}
      >
        {phase === "show" ? (
          item.items.map((emoji, i) => (
            <span
              key={`${emoji}-${i}`}
              style={{
                animation: `memoryPop .35s ease both`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <EmojiIcon emoji={emoji} size={56} />
            </span>
          ))
        ) : (
          <div
            style={{
              textAlign: "center",
              color: C.navy,
              fontSize: 28,
              fontWeight: 1000,
              lineHeight: 1.7,
            }}
          >
            <div style={{ fontSize: 62 }}>🧠</div>
            تَمَّ إِخْفَاءُ المَجْمُوعَةِ
            <br />
            تَذَكَّرِ العَدَدَ
          </div>
        )}
      </div>

      <button
        onClick={replayShow}
        style={{
          alignSelf: "center",
          border: 0,
          borderRadius: 18,
          background: C.gold,
          color: "white",
          padding: "12px 18px",
          fontSize: 19,
          fontWeight: 1000,
          boxShadow: "0 7px 16px rgba(232,160,32,.32)",
          marginBottom: 18,
        }}
      >
        أَعِدِ المُشَاهَدَةَ
      </button>

      {phase === "hide" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {item.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === item.correct;
            const bg = isSelected
              ? isCorrect
                ? C.greenSoft
                : C.redSoft
              : "rgba(255,255,255,.98)";
            const border = isSelected ? (isCorrect ? C.green : C.red) : C.gold;

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  minWidth: 88,
                  minHeight: 70,
                  borderRadius: 22,
                  border: `4px solid ${border}`,
                  background: bg,
                  color: C.navy,
                  fontSize: 34,
                  fontWeight: 1000,
                  boxShadow: "0 8px 18px rgba(0,0,0,.12)",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes memoryPop {
          0% { opacity: 0; transform: translateY(-12px) scale(.5) rotate(-10deg); }
          70% { opacity: 1; transform: translateY(3px) scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
