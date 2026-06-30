import { useEffect, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import EmojiIcon from "../components/EmojiIcon";

export type MemoryBuildQuantityItem = {
  sample_items: string[];
  build_emoji: string;
  build_items?: string[];
  question: string;
  question_audio_key: string;
  correct_count: number;
  show_ms?: number;
};

export interface MemoryBuildQuantityExerciseV2Props {
  items: MemoryBuildQuantityItem[];
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

export default function MemoryBuildQuantityExerciseV2({
  items,
  audio_base,
  onComplete,
}: MemoryBuildQuantityExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [phase, setPhase] = useState<"show" | "build">("show");
  const [built, setBuilt] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
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
    setBuilt(0);
    setFeedback("idle");

    const timer = window.setTimeout(() => {
      setPhase("build");
      const t = timings[item.question_audio_key];
      if (t) window.setTimeout(() => karaoke.play(item.question_audio_key, t), 250);
    }, item.show_ms ?? 3000);

    return () => {
      window.clearTimeout(timer);
      karaoke.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const replaySample = () => {
    karaoke.stop();
    setPhase("show");
    setBuilt(0);
    setFeedback("idle");

    window.setTimeout(() => {
      setPhase("build");
      const t = timings[item.question_audio_key];
      if (t) karaoke.play(item.question_audio_key, t);
    }, item.show_ms ?? 3000);
  };

  const validate = () => {
    if (built === item.correct_count) {
      setFeedback("correct");
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
      setFeedback("wrong");
      playFeedback(false);
      setTimeout(() => setFeedback("idle"), 900);
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
          "linear-gradient(180deg, rgba(255,248,236,.96), rgba(247,219,160,.98)), url('/lessons/v2/lesson14/s5.webp') center/cover no-repeat",
        display: "flex",
        flexDirection: "column",
        padding: "18px 16px 92px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
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
          minHeight: 90,
          textAlign: "center",
          fontSize: 24,
          lineHeight: 1.8,
          color: C.navy,
          fontWeight: 900,
          boxShadow: "0 8px 22px rgba(0,0,0,.12)",
          marginBottom: 18,
        }}
      >
        {phase === "show" ? (
          "اُنْظُرْ جَيِّدًا... بَعْدَ قَلِيلٍ سَتَبْنِي نَفْسَ الكَمِّيَّةِ"
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
          minHeight: 210,
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
          item.sample_items.map((emoji, i) => (
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
          <div style={{ textAlign: "center", width: "100%" }}>
            <div
              style={{
                color: C.navy,
                fontSize: 24,
                fontWeight: 1000,
                marginBottom: 12,
              }}
            >
              الصُّنْدُوقُ فَارِغٌ... اِبْنِ نَفْسَ الكَمِّيَّةِ
            </div>

            <div
              style={{
                minHeight: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {built === 0 ? (
                <span style={{ color: "#BDAF8A", fontSize: 44, fontWeight: 1000 }}>؟</span>
              ) : (
                (item.build_items ? item.build_items.slice(0, built) : Array.from({ length: built }).map(() => item.build_emoji)).map((emoji, i) => (
                  <span
                    key={i}
                    style={{
                      animation: "memoryPop .22s ease both",
                    }}
                  >
                    <EmojiIcon emoji={emoji} size={48} />
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {phase === "build" && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <button
              onClick={() => {
                setFeedback("idle");
                setBuilt((n) => Math.max(0, n - 1));
              }}
              style={buttonStyle(C.red)}
            >
              −
            </button>

            <div
              style={{
                minWidth: 88,
                minHeight: 68,
                borderRadius: 22,
                border: `4px solid ${feedback === "correct" ? C.green : feedback === "wrong" ? C.red : C.gold}`,
                background: feedback === "correct" ? C.greenSoft : feedback === "wrong" ? C.redSoft : "white",
                color: C.navy,
                display: "grid",
                placeItems: "center",
                fontSize: 34,
                fontWeight: 1000,
                boxShadow: "0 8px 18px rgba(0,0,0,.12)",
              }}
            >
              {built}
            </div>

            <button
              onClick={() => {
                setFeedback("idle");
                setBuilt((n) => Math.min(10, n + 1));
              }}
              style={buttonStyle(C.green)}
            >
              +
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={replaySample}
              style={{
                border: 0,
                borderRadius: 18,
                background: C.gold,
                color: "white",
                padding: "12px 18px",
                fontSize: 19,
                fontWeight: 1000,
                boxShadow: "0 7px 16px rgba(232,160,32,.32)",
              }}
            >
              أَعِدِ المُشَاهَدَةَ
            </button>

            <button
              onClick={validate}
              style={{
                border: 0,
                borderRadius: 18,
                background: C.navy,
                color: "white",
                padding: "12px 24px",
                fontSize: 19,
                fontWeight: 1000,
                boxShadow: "0 7px 16px rgba(27,58,107,.32)",
              }}
            >
              تَحَقَّقْ
            </button>
          </div>
        </>
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

function buttonStyle(bg: string): React.CSSProperties {
  return {
    width: 72,
    height: 68,
    borderRadius: 22,
    border: "0",
    background: bg,
    color: "white",
    fontSize: 38,
    fontWeight: 1000,
    boxShadow: "0 8px 18px rgba(0,0,0,.14)",
  };
}
