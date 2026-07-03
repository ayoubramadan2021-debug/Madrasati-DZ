import { useEffect, useRef, useState } from "react";

type WordTiming = { text: string; offset: number; duration: number };

export type NumberSortItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  numbers: string[];
  correct: string[];
};

type Props = {
  items: NumberSortItem[];
  audio_base: string;
  onComplete?: () => void;
};

const C = { navy: "#1B3A6B", gold: "#E8A020", brown: "#7A3B13", green: "#20A567", red: "#EF4444", purple: "#7C3AED", blue: "#2563EB", pink: "#EC4899" };
const palette = [C.red, C.gold, C.green, C.blue, C.purple, C.pink];

function numberColor(value: string, numbers: string[]) {
  const index = numbers.indexOf(value);
  return palette[(index < 0 ? 0 : index) % palette.length];
}

export default function NumberSortExerciseV2({ items, audio_base, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);
  const item = items[idx];

  const stopAudio = () => {
    audioRef.current?.pause();
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
    setSelected([]);
    setFeedback("idle");
    const t = setTimeout(playQuestion, 450);
    return () => {
      clearTimeout(t);
      stopAudio();
    };
  }, [idx, timings]);

  const pick = (n: string) => {
    if (selected.includes(n)) return;
    const next = [...selected, n];
    setSelected(next);

    if (next.length === item.correct.length) {
      const ok = next.join(",") === item.correct.join(",");
      setFeedback(ok ? "correct" : "wrong");
      new Audio(ok ? "/audio/v2_feedback/correct.mp3" : "/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => {
        if (ok) {
          if (idx < items.length - 1) setIdx(idx + 1);
          else onComplete?.();
        } else {
          setSelected([]);
          setFeedback("idle");
        }
      }, 950);
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

        <div style={styles.pathBox}>
          <div style={styles.pathTitle}>🚂 رتّب القطار</div>
          <div style={styles.slots}>
            {item.correct.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.slot,
                  background: selected[i] ? numberColor(selected[i], item.numbers) : "#FFF9E8",
                  color: selected[i] ? "#fff" : C.navy,
                  border: selected[i] ? "4px solid white" : `4px dashed ${C.gold}`,
                  boxShadow: selected[i] ? "0 8px 14px #0002" : "none",
                }}
              >
                {selected[i] ?? ""}
              </div>
            ))}
          </div>
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
                opacity: (shown.has(i) || feedback !== "idle") ? 1 : 0.45,
                transform: active === i ? "scale(1.08)" : "scale(1)"
              }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={styles.options}>
          {item.numbers.map((n, i) => (
            <button disabled={selected.includes(n)} key={n} onClick={() => pick(n)} style={{
              ...styles.option,
              background: palette[i % palette.length],
              opacity: selected.includes(n) ? 0.3 : 0,
              animation: selected.includes(n) ? "none" : "lesson20OptionEnter .42s ease forwards",
              animationDelay: `${i * 90}ms`,
            }}>{n}</button>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100dvh", background: "radial-gradient(circle at top,#FFF7D6,#FFE8A3 45%,#FFF8EC)", fontFamily: "Tajawal,sans-serif", padding: "10px 14px 92px", boxSizing: "border-box" },
  card: { maxWidth: 520, margin: "0 auto" },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center", height: 62 },
  sound: { width: 58, height: 58, borderRadius: "50%", border: "5px solid white", background: C.gold, fontSize: 26, boxShadow: "0 8px 18px #0002" },
  counter: { border: `4px solid ${C.gold}`, borderRadius: 22, padding: "7px 22px", fontSize: 24, fontWeight: 900, color: C.brown, background: "#fff" },
  title: { textAlign: "center", color: C.brown, fontSize: 29, margin: "10px 0 10px", fontWeight: 900 },
  pathBox: { background: "#fff", border: `4px solid ${C.gold}`, borderRadius: 26, minHeight: 150, padding: 12, boxShadow: "0 8px 18px #E8A02025" },
  pathTitle: { textAlign: "center", fontSize: 22, color: C.brown, fontWeight: 900, marginBottom: 8 },
  slots: { display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" },
  slot: { width: 58, height: 58, borderRadius: 18, border: `4px dashed ${C.gold}`, background: "#FFF9E8", color: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 29, fontWeight: 900 },
  questionBox: { background: "#fff", border: `4px solid ${C.gold}`, borderRadius: 24, padding: "10px 12px", marginTop: 10, textAlign: "center" },
  instruction: { color: C.brown, fontSize: 20, fontWeight: 900, marginBottom: 4 },
  question: { fontSize: 24, fontWeight: 900, lineHeight: 1.55 },
  word: { display: "inline-block", margin: "0 3px", transition: "all .15s" },
  options: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 11 },
  option: { minHeight: 58, borderRadius: 20, border: "4px solid white", color: "#fff", fontSize: 30, fontWeight: 900, fontFamily: "Tajawal,sans-serif", boxShadow: "0 8px 14px #0002" },
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
