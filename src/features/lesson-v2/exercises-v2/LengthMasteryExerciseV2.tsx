import { useEffect, useState } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type LengthBar = {
  id: string;
  label: string;
  width: number;
  color: string;
  icon?: string;
};

export type LengthMasteryItem = {
  title: string;
  instruction: string;
  question: string;
  question_audio_key: string;
  bars: LengthBar[];
  options: string[];
  correct: string;
  hint?: string;
};

type Props = {
  missionTitle: string;
  missionIcon: string;
  items: LengthMasteryItem[];
  audio_base: string;
  onComplete?: () => void;
};

const C = {
  navy: "#1B3A6B",
  navyDeep: "#10264B",
  gold: "#E8A020",
  cream: "#FFF8EC",
  brown: "#7A3B13",
  green: "#20A567",
  red: "#EF4444",
  white: "#FFFFFF",
};

export default function LengthMasteryExerciseV2({
  missionTitle,
  missionIcon,
  items,
  audio_base,
  onComplete,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [feedback, setFeedback] = useState<"idle" | "ok" | "bad">("idle");
  const [selected, setSelected] = useState<string | null>(null);

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
    setSelected(null);

    const t = timings[item.question_audio_key];
    if (!t) return;

    const timer = setTimeout(() => {
      karaoke.play(item.question_audio_key, t);
    }, 450);

    return () => clearTimeout(timer);
  }, [idx, timings]);

  const replay = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const choose = (op: string) => {
    if (feedback !== "idle") return;

    setSelected(op);
    karaoke.stop();

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
      setTimeout(() => {
        setFeedback("idle");
        setSelected(null);
      }, 950);
    }
  };

  const words = item.question.split(/\s+/);
  const active = karaoke.activeKey === item.question_audio_key;

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <style>{`
          @keyframes premiumGlow {
            0%,100% { box-shadow: 0 0 0 rgba(232,160,32,0); transform: scale(1); }
            50% { box-shadow: 0 0 28px rgba(232,160,32,.55); transform: scale(1.015); }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: translateY(10px) scale(.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div style={styles.top}>
          <button style={styles.sound} onClick={replay}>🔊</button>
          <div style={styles.counter}><span dir="ltr">{idx + 1} / {items.length}</span></div>
        </div>

        <div style={styles.progress}>
          {items.map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.dot,
                width: i === idx ? 30 : 16,
                background: i <= idx ? C.gold : "#E7D7AD",
              }}
            />
          ))}
        </div>

        <div style={styles.badge}>{missionIcon} {missionTitle}</div>

        <h1 style={styles.title}>{item.title}</h1>
        <p style={styles.instruction}>{item.instruction}</p>

        <div style={styles.lab}>
          <div style={styles.ruler}>
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} style={styles.tick}>
                <i style={{ height: i % 5 === 0 ? 22 : i % 2 === 0 ? 16 : 10 }} />
                <b>{i}</b>
              </span>
            ))}
          </div>

          <div style={styles.barsArea}>
            {item.bars.map((b, i) => (
              <div key={b.id} style={styles.barLine}>
                <div style={styles.barName}>
                  <span>{b.icon || (i === 0 ? "🔴" : i === 1 ? "🔵" : "🟡")}</span>
                  <b>{b.label}</b>
                </div>

                <div style={styles.track}>
                  <div
                    style={{
                      ...styles.bar,
                      width: `${b.width}%`,
                      background: b.color,
                      animation: b.width >= Math.max(...item.bars.map((x) => x.width)) ? "premiumGlow 1.8s infinite" : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.questionBox}>
          <div style={styles.question}>
            {words.map((w, i) => {
              const shown = karaoke.activeKey ? karaoke.shown.has(i) : true;
              const current = active && karaoke.currentIdx === i;
              return (
                <span
                  key={i}
                  style={{
                    opacity: shown ? 1 : .28,
                    color: current ? C.gold : C.navy,
                    transform: current ? "scale(1.09)" : "scale(1)",
                    display: "inline-block",
                    marginInline: 3,
                    transition: "all .16s ease",
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
          {item.hint && <div style={styles.hint}>💡 {item.hint}</div>}
        </div>

        <div
          style={{
            ...styles.options,
            gridTemplateColumns: item.options.length === 3 ? "repeat(3,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))",
          }}
        >
          {item.options.map((op, i) => {
            const isCorrect = feedback !== "idle" && op === item.correct;
            const isWrong = selected === op && feedback === "bad";

            return (
              <button
                key={op}
                onClick={() => choose(op)}
                style={{
                  ...styles.option,
                  borderColor: isCorrect ? C.green : isWrong ? C.red : i === 0 ? "#EF4444" : i === 1 ? "#2563EB" : "#E8A020",
                  background: isCorrect ? "#E8F8EF" : isWrong ? "#FCE7E4" : "#FFFFFF",
                }}
              >
                <span>{i === 0 ? "🔴" : i === 1 ? "🔵" : "🟡"}</span>
                <b>{op}</b>
              </button>
            );
          })}
        </div>

        {feedback !== "idle" && (
          <div
            style={{
              ...styles.feedback,
              borderColor: feedback === "ok" ? C.green : C.gold,
              color: feedback === "ok" ? C.green : C.brown,
            }}
          >
            {feedback === "ok" ? "أَحْسَنْتَ! قارنتَ الطول بدقة 🎉" : "حاول مرة أخرى، انظر إلى امتداد الشريط ✨"}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "radial-gradient(circle at top, #FFF4CF 0%, #FFF8EC 42%, #FFFFFF 100%)",
    padding: "10px 10px 92px",
    boxSizing: "border-box",
    overflowY: "auto",
    fontFamily: "Tajawal, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 570,
    margin: "0 auto",
    background: "rgba(255,255,255,.96)",
    border: "4px solid #E8A020",
    borderRadius: 30,
    padding: 12,
    boxSizing: "border-box",
    textAlign: "center",
    boxShadow: "0 18px 36px rgba(122,59,19,.16)",
    animation: "popIn .35s ease both",
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
    border: "4px solid #fff",
    background: "#E8A020",
    color: "#fff",
    fontSize: 24,
    boxShadow: "0 8px 18px rgba(232,160,32,.36)",
  },
  counter: {
    background: "#1B3A6B",
    color: "#fff",
    borderRadius: 20,
    padding: "7px 18px",
    fontSize: 22,
    fontWeight: 1000,
    boxShadow: "0 8px 18px rgba(27,58,107,.25)",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    margin: "8px 0",
  },
  dot: {
    height: 16,
    borderRadius: 999,
    display: "inline-block",
    transition: "all .25s ease",
  },
  badge: {
    display: "inline-block",
    background: "#fff",
    border: "3px solid #E8A020",
    borderRadius: 999,
    padding: "6px 16px",
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: 17,
    marginBottom: 4,
  },
  title: {
    margin: "4px 0 2px",
    color: "#7A3B13",
    fontSize: "clamp(30px,7.2vw,46px)",
    fontWeight: 1000,
    lineHeight: 1.08,
  },
  instruction: {
    margin: "0 0 8px",
    color: "#1B3A6B",
    fontSize: "clamp(17px,4.5vw,23px)",
    fontWeight: 900,
    lineHeight: 1.35,
  },
  lab: {
    background: "linear-gradient(180deg,#FFFFFF,#FFF8EC)",
    border: "4px solid #E8A020",
    borderRadius: 26,
    padding: "10px 8px",
    margin: "8px 0",
  },
  ruler: {
    height: 42,
    borderRadius: 16,
    background: "linear-gradient(90deg,#FDE7A8,#FFF3C6)",
    border: "3px solid rgba(122,59,19,.25)",
    display: "grid",
    gridTemplateColumns: "repeat(11,1fr)",
    alignItems: "start",
    padding: "4px 8px 0",
    boxSizing: "border-box",
    marginBottom: 10,
  },
  tick: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#7A3B13",
    fontSize: 9,
    fontWeight: 1000,
  },
  barsArea: {
    width: "100%",
  },
  barLine: {
    display: "grid",
    gridTemplateColumns: "94px 1fr",
    alignItems: "center",
    gap: 8,
    margin: "8px 0",
  },
  barName: {
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  track: {
    height: 36,
    background: "repeating-linear-gradient(90deg,#F7E6B6 0,#F7E6B6 8px,#FFF8EC 8px,#FFF8EC 16px)",
    borderRadius: 999,
    border: "3px solid #F0D28A",
    padding: 3,
    boxSizing: "border-box",
  },
  bar: {
    height: "100%",
    borderRadius: 999,
    border: "3px solid #fff",
    boxShadow: "0 5px 12px rgba(0,0,0,.18)",
  },
  questionBox: {
    border: "4px solid #E8A020",
    borderRadius: 22,
    background: "#fff",
    padding: 9,
    margin: "8px 0",
  },
  question: {
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: "clamp(20px,5.2vw,29px)",
    lineHeight: 1.45,
  },
  hint: {
    marginTop: 5,
    color: "#7A3B13",
    fontWeight: 900,
    fontSize: 15,
  },
  options: {
    display: "grid",
    gap: 8,
    marginTop: 8,
  },
  option: {
    minHeight: 60,
    border: "4px solid",
    borderRadius: 22,
    color: "#1B3A6B",
    fontSize: "clamp(18px,5vw,27px)",
    fontWeight: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    boxShadow: "0 5px 0 rgba(232,160,32,.25)",
  },
  feedback: {
    position: "fixed",
    left: 14,
    right: 14,
    bottom: 86,
    background: "#fff",
    border: "4px solid",
    borderRadius: 22,
    padding: 10,
    fontSize: 21,
    fontWeight: 1000,
    zIndex: 999,
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
  },
};
