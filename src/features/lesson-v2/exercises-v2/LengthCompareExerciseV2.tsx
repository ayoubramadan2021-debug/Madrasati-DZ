import { useEffect, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type LengthBar = {
  id: string;
  label: string;
  width: number;
  color: string;
};

export type LengthCompareItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  bars: LengthBar[];
  options: string[];
  correct: string;
};

type Props = {
  items: LengthCompareItem[];
  audio_base: string;
  missionTitle: string;
  onComplete?: () => void;
};

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  brown: "#7A3B13",
  green: "#20A567",
  red: "#EF4444",
  cream: "#FFF8EC",
};

export default function LengthCompareExerciseV2({ items, audio_base, missionTitle, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [feedback, setFeedback] = useState<"idle" | "ok" | "bad">("idle");
  const karaoke = useKaraoke(audio_base);
  const item = items[idx];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setFeedback("idle");
    const t = timings[item.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
    return () => clearTimeout(timer);
  }, [idx, timings]);

  const replay = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const choose = (op: string) => {
    if (feedback !== "idle") return;

    if (op === item.correct) {
      setFeedback("ok");
      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 1200);
    } else {
      setFeedback("bad");
      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => setFeedback("idle"), 900);
    }
  };

  const words = item.question.split(/\s+/);
  const isActive = karaoke.activeKey === item.question_audio_key;

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <div style={styles.top}>
          <button style={styles.sound} onClick={replay}>🔊</button>
          <div style={styles.counter}><span dir="ltr">{idx + 1} / {items.length}</span></div>
        </div>

        <div style={styles.progress}>
          {items.map((_, i) => (
            <span key={i} style={{
              width: i === idx ? 28 : 18,
              height: 18,
              borderRadius: 99,
              background: i <= idx ? C.gold : "#E9D7A6",
              display: "inline-block",
              transition: "all .25s ease",
            }} />
          ))}
        </div>

        <div style={styles.badge}>📏 {missionTitle}</div>
        <h1 style={styles.title}>{item.title}</h1>

        <div style={styles.visual}>
          {item.bars.map((b) => (
            <div key={b.id} style={styles.barWrap}>
              <div style={{
                ...styles.bar,
                width: `${b.width}%`,
                background: b.color,
              }} />
              <div style={styles.barLabel}>{b.label}</div>
            </div>
          ))}
        </div>

        <div style={styles.questionBox}>
          <div style={styles.instruction}>{item.instruction}</div>
          <div style={styles.question}>
            {words.map((w, i) => {
              const shown = karaoke.activeKey ? karaoke.shown.has(i) : true;
              const current = isActive && karaoke.currentIdx === i;
              return (
                <span key={i} style={{
                  opacity: shown ? 1 : 0.25,
                  color: current ? C.gold : C.navy,
                  transform: current ? "scale(1.08)" : "scale(1)",
                  display: "inline-block",
                  marginInline: 3,
                  transition: "all .18s ease",
                }}>{w}</span>
              );
            })}
          </div>
        </div>

        <div style={styles.options}>
          {item.options.map((op, i) => (
            <button
              key={op}
              onClick={() => choose(op)}
              style={{
                ...styles.option,
                borderColor:
                  feedback !== "idle" && op === item.correct
                    ? C.green
                    : i === 0 ? "#EF4444" : i === 1 ? "#2563EB" : "#E8A020",
              }}
            >
              <span>{i === 0 ? "🔴" : i === 1 ? "🔵" : "🟡"}</span>
              <b>{op}</b>
            </button>
          ))}
        </div>

        {feedback !== "idle" && (
          <div style={{
            ...styles.feedback,
            borderColor: feedback === "ok" ? C.green : C.gold,
            color: feedback === "ok" ? C.green : C.brown,
          }}>
            {feedback === "ok" ? "أَحْسَنْتَ 🎉" : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "linear-gradient(180deg,#FFF8EC,#FFFFFF)",
    padding: "10px 10px 88px",
    boxSizing: "border-box",
    overflowY: "auto",
    fontFamily: "Tajawal, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    margin: "0 auto",
    background: "rgba(255,255,255,.96)",
    border: "4px solid #E8A020",
    borderRadius: 26,
    padding: 12,
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow: "0 14px 32px rgba(122,59,19,.14)",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sound: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "4px solid white",
    background: "#E8A020",
    fontSize: 24,
  },
  counter: {
    background: "#1B3A6B",
    color: "white",
    borderRadius: 18,
    padding: "7px 18px",
    fontSize: 22,
    fontWeight: 1000,
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    margin: "8px 0",
  },
  badge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: 999,
    border: "3px solid #E8A020",
    color: "#1B3A6B",
    background: "#fff",
    fontWeight: 1000,
    marginBottom: 4,
  },
  title: {
    margin: "4px 0 8px",
    color: "#7A3B13",
    fontSize: "clamp(30px,7vw,44px)",
    fontWeight: 1000,
    lineHeight: 1.1,
  },
  visual: {
    background: "#fff",
    border: "4px solid #E8A020",
    borderRadius: 24,
    padding: "10px 8px",
    margin: "8px 0",
  },
  barWrap: {
    margin: "8px 0",
  },
  bar: {
    height: 30,
    borderRadius: 999,
    border: "4px solid white",
    boxShadow: "0 6px 14px rgba(0,0,0,.16)",
    margin: "0 auto",
  },
  barLabel: {
    color: "#1B3A6B",
    fontSize: 18,
    fontWeight: 1000,
    marginTop: 3,
  },
  questionBox: {
    border: "4px solid #E8A020",
    borderRadius: 22,
    padding: 10,
    margin: "8px 0",
    background: "#fff",
  },
  instruction: {
    color: "#7A3B13",
    fontWeight: 1000,
    fontSize: "clamp(18px,4.6vw,24px)",
    marginBottom: 4,
  },
  question: {
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: "clamp(20px,5.5vw,30px)",
    lineHeight: 1.5,
  },
  options: {
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    gap: 8,
  },
  option: {
    background: "#fff",
    color: "#1B3A6B",
    border: "4px solid",
    borderRadius: 20,
    minHeight: 60,
    padding: "8px 4px",
    fontSize: "clamp(19px,5vw,28px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    boxShadow: "0 5px 0 rgba(232,160,32,.24)",
  },
  feedback: {
    position: "fixed",
    left: 14,
    right: 14,
    bottom: 86,
    background: "#fff",
    border: "4px solid",
    borderRadius: 20,
    padding: 10,
    fontSize: 23,
    fontWeight: 1000,
    zIndex: 999,
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
  },
};
