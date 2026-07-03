import { useEffect, useRef, useState } from "react";

type WordTiming = { text: string; offset: number; duration: number };

export type NumberChoiceItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  promptNumbers?: string[];
  centerNumber?: string;
  correct: string;
  options: string[];
};

type Props = {
  items: NumberChoiceItem[];
  audio_base: string;
  onComplete?: () => void;
};

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  brown: "#7A3B13",
  green: "#20A567",
  red: "#EF4444",
  purple: "#7C3AED",
  blue: "#2563EB",
  pink: "#EC4899",
};

const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];

function optionColor(value: string, options: string[]) {
  const index = options.indexOf(value);
  return palette[(index < 0 ? 0 : index) % palette.length];
}

export default function NumberChoiceExerciseV2({ items, audio_base, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [filled, setFilled] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);
  const item = items[idx];

  const stopAudio = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActive(-1);
  };

  const playQuestion = async () => {
    stopAudio();
    const words = timings[item.question_audio_key];
    if (!words) return;
    setShown(new Set());
    const a = new Audio(`${audio_base}/${item.question_audio_key}.mp3`);
    audioRef.current = a;
    await a.play().catch(() => {});
    words.forEach((w, i) => {
      timers.current.push(window.setTimeout(() => {
        setShown(p => new Set(p).add(i));
        setActive(i);
      }, w.offset));
      timers.current.push(window.setTimeout(() => setActive(x => x === i ? -1 : x), w.offset + w.duration));
    });
  };

  useEffect(() => {
    items.forEach(async it => {
      const r = await fetch(`${audio_base}/${it.question_audio_key}.json`);
      if (r.ok) {
        const data = await r.json();
        setTimings(p => ({ ...p, [it.question_audio_key]: data }));
      }
    });
  }, [audio_base, items]);

  useEffect(() => {
    setLocked(false);
    setFeedback("idle");
    setFilled(null);
    const t = setTimeout(playQuestion, 450);
    return () => {
      clearTimeout(t);
      stopAudio();
    };
  }, [idx, timings]);

  const answer = (value: string) => {
    if (locked) return;
    stopAudio();
    if (value === item.correct) {
      setLocked(true);
      setFeedback("correct");
      setFilled(value);
      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 1200);
    } else {
      setFeedback("wrong");
      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => setFeedback("idle"), 900);
    }
  };

  const words = item.question.split(/\s+/);

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <style>{`
          @keyframes lesson20OptionEnter {
            0% { opacity: 0; transform: translateY(16px) scale(0.94); }
            70% { opacity: 1; transform: translateY(-2px) scale(1.03); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        <div style={styles.top}>
          <button onClick={playQuestion} style={styles.sound}>🔊</button>
          <div style={styles.counter}>{idx + 1} / {items.length}</div>
        </div>

        <h1 style={styles.title}>{item.title}</h1>

        <div style={styles.activity}>
          <div style={styles.sparkle}>✨</div>

          {item.promptNumbers ? (
            <div style={styles.train}>
              {item.promptNumbers.map((n, i) => (
                <div key={i} style={{
                  ...styles.trainCard,
                  background: n === "?" && filled ? optionColor(item.correct, item.options) : n === "?" ? "#fff" : palette[i % palette.length],
                  color: n === "?" && filled ? "#fff" : n === "?" ? C.gold : "#fff",
                  border: n === "?" && filled ? "4px solid white" : n === "?" ? `4px dashed ${C.gold}` : "4px solid white",
                }}>
                  {n === "?" && filled ? filled : n}
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.bigBubble}>{item.centerNumber}</div>
          )}
        </div>

        {feedback !== "idle" && (
          <div style={styles.feedbackOverlay}>
            <div
              style={{
                ...styles.feedbackCard,
                background: feedback === "correct" ? "#20A567" : "#EF4444",
              }}
            >
              <div style={styles.feedbackText}>
                {feedback === "correct" ? "✅ أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى ✨"}
              </div>
            </div>
          </div>
        )}

        <div style={styles.questionBox}>
          <div style={styles.instruction}>{item.instruction}</div>
          <div style={styles.question}>
            {words.map((w, i) => (
              <span key={i} style={{
                ...styles.word,
                color: active === i ? C.gold : C.navy,
                opacity: (shown.has(i) || feedback !== "idle") ? 1 : 0.42,
                transform: active === i ? "scale(1.08)" : "scale(1)"
              }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={styles.options}>
          {item.options.map((o, i) => (
            <button key={o} onClick={() => answer(o)} style={{
              ...styles.option,
              borderColor: palette[i % palette.length],
              boxShadow: `0 8px 0 ${palette[i % palette.length]}55`,
              opacity: 0,
              animation: "lesson20OptionEnter .42s ease forwards",
              animationDelay: `${i * 90}ms`,
            }}>
              <span style={{ ...styles.optionDot, background: palette[i % palette.length] }} />
              {o}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "radial-gradient(circle at top,#FFF7D6,#FFE8A3 45%,#FFF8EC)",
    fontFamily: "Tajawal,sans-serif",
    padding: "10px 14px 92px",
    boxSizing: "border-box",
  },
  card: { maxWidth: 520, margin: "0 auto" },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center", height: 62 },
  sound: { width: 58, height: 58, borderRadius: "50%", border: "5px solid white", background: C.gold, fontSize: 26, boxShadow: "0 8px 18px #0002" },
  counter: { border: `4px solid ${C.gold}`, borderRadius: 22, padding: "7px 22px", fontSize: 24, fontWeight: 900, color: C.brown, background: "#fff" },
  title: { textAlign: "center", color: C.brown, fontSize: 29, margin: "10px 0 10px", fontWeight: 900 },
  activity: {
    position: "relative",
    background: "#fff",
    border: `4px solid ${C.gold}`,
    borderRadius: 26,
    minHeight: 155,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    boxShadow: "0 8px 18px #E8A02025",
  },
  sparkle: { position: "absolute", top: 8, left: 12, fontSize: 22 },
  train: { display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center", alignItems: "center" },
  trainCard: { width: 64, height: 64, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 31, fontWeight: 900, boxShadow: "0 8px 14px #0002" },
  bigBubble: { width: 116, height: 116, borderRadius: "50%", background: `linear-gradient(145deg,${C.blue},${C.purple})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 66, fontWeight: 900, border: "6px solid white", boxShadow: "0 10px 20px #0003" },
  questionBox: { background: "#fff", border: `4px solid ${C.gold}`, borderRadius: 24, padding: "10px 12px", marginTop: 10, textAlign: "center" },
  instruction: { color: C.brown, fontSize: 20, fontWeight: 900, marginBottom: 4 },
  question: { fontSize: 24, fontWeight: 900, lineHeight: 1.55 },
  word: { display: "inline-block", margin: "0 3px", transition: "all .15s" },
  options: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 11 },
  option: { minHeight: 58, borderRadius: 22, border: "4px solid", background: "#fff", color: C.navy, fontSize: 29, fontWeight: 900, fontFamily: "Tajawal,sans-serif", position: "relative" },
  optionDot: { position: "absolute", top: 8, right: 10, width: 13, height: 13, borderRadius: "50%" },
  feedbackOverlay: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    pointerEvents: "none",
  },
  feedbackCard: {
    minWidth: 245,
    borderRadius: 999,
    padding: "20px 34px",
    color: "#fff",
    fontWeight: 900,
    textAlign: "center",
    boxShadow: "0 18px 38px rgba(0,0,0,.28)",
    border: "6px solid rgba(255,255,255,.9)",
    transform: "scale(1.02)",
  },
  feedbackText: {
    fontSize: 31,
    fontWeight: 900,
    lineHeight: 1.2,
  },

};
