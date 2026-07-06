import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type LengthBar = {
  id?: string;
  label: string;
  color: string;
  width?: number;
};

export type LengthLabItem = {
  title: string;
  mission: string;
  question: string;
  question_audio_key: string;
  hint?: string;
  options: string[];
  correct: string;
  bars: LengthBar[];
  scene_image?: string;
  view?: "scene" | "bars";
};

type Props = {
  items: LengthLabItem[];
  audio_base: string;
  missionTitle: string;
  missionIcon: string;
  onComplete?: () => void;
};

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  brown: "#7A3B13",
  green: "#20A567",
  red: "#EF4444",
};

function normalize(s: string) {
  return s.replace(/\s+/g, " ").replace(/[.؟!]/g, "").trim();
}

function splitOption(text: string) {
  return text.split(/[،,]/).map((x) => x.trim()).filter(Boolean);
}

export default function LengthLabExerciseV2({
  items,
  audio_base,
  missionIcon,
  onComplete,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  const item = items[idx];
  const karaoke = useKaraoke(audio_base);

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
    });
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelected(null);
    setFeedback("idle");

    const t = timings[item.question_audio_key];
    if (!t) return;

    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 420);
    return () => clearTimeout(timer);
  }, [idx, timings]);

  const replay = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const choose = (option: string) => {
    if (feedback !== "idle") return;

    setSelected(option);
    karaoke.stop();

    if (option === item.correct) {
      setFeedback("correct");
      new Audio("/audio/v2_feedback/correct.mp3").play().catch(() => {});
      setTimeout(() => {
        if (idx < items.length - 1) setIdx(idx + 1);
        else onComplete?.();
      }, 1300);
    } else {
      setFeedback("wrong");
      new Audio("/audio/v2_feedback/retry.mp3").play().catch(() => {});
      setTimeout(() => {
        setSelected(null);
        setFeedback("idle");
      }, 1100);
    }
  };

  const findBar = (label: string) =>
    item.bars.find((b) => normalize(b.label) === normalize(label));

  const renderOption = (option: string) => {
    if (normalize(option) === "صحيح" || normalize(option) === "خطأ") {
      return <span style={styles.boolText}>{option}</span>;
    }

    const parts = splitOption(option);

    return (
      <span style={styles.optionInner}>
        {parts.map((p, i) => {
          const b = findBar(p);
          return (
            <span key={`${option}-${i}`} style={styles.optionPart}>
              {b && <span style={{ ...styles.colorDot, background: b.color }} />}
              <span>{p}</span>
            </span>
          );
        })}
      </span>
    );
  };

  const renderQuestion = () => {
    const words = item.question.split(/\s+/);
    const isActive = karaoke.activeKey === item.question_audio_key;

    return (
      <div style={styles.questionText}>
        {words.map((w, i) => {
          const shown = karaoke.activeKey ? karaoke.shown.has(i) : true;
          const current = isActive && karaoke.currentIdx === i;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginInline: 3,
                opacity: shown ? 1 : 0.28,
                color: current ? C.gold : C.navy,
                transform: current ? "scale(1.06)" : "scale(1)",
                transition: "all .16s ease",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>
    );
  };

  const boolMode =
    item.options.length === 2 &&
    item.options.some((o) => normalize(o) === "صحيح") &&
    item.options.some((o) => normalize(o) === "خطأ");

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.card}>
        <style>{`
          @keyframes feedbackPop {
            0% { opacity: 0; transform: scale(.78); }
            60% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <div style={styles.topRow}>
          <div style={styles.counter}><span dir="ltr">{idx + 1} / {items.length}</span></div>
          <button onClick={replay} style={styles.soundBtn}>🔊</button>
        </div>

        <div style={styles.progressRow}>
          {items.map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.progressDot,
                width: i === idx ? 28 : 14,
                background: i <= idx ? C.gold : "#EAD8A8",
              }}
            />
          ))}
        </div>

        {item.view === "scene" && item.scene_image ? (
          <div style={styles.sceneWrap}>
            <img src={item.scene_image} alt="" style={styles.sceneImage} />
          </div>
        ) : (
          <div style={styles.labWrap}>
            {item.bars.map((b) => (
              <div key={b.label} style={styles.barRow}>
                <div style={styles.barLabel}>
                  <span style={{ ...styles.colorDot, background: b.color }} />
                  <span>{b.label}</span>
                </div>

                <div style={styles.track}>
                  <div
                    style={{
                      ...styles.barFill,
                      background: b.color,
                      width: `${b.width ?? 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={styles.questionBox}>
          <div style={styles.smallInstruction}>
            <span>{missionIcon}</span>
            <span>{item.mission}</span>
          </div>
          {renderQuestion()}
        </div>

        <div
          style={{
            ...styles.optionsGrid,
            gridTemplateColumns: boolMode ? "repeat(2,minmax(0,1fr))" : "repeat(2,minmax(0,1fr))",
          }}
        >
          {item.options.map((option) => {
            const isCorrect = feedback !== "idle" && option === item.correct;
            const isWrong = feedback === "wrong" && selected === option;

            return (
              <button
                key={option}
                onClick={() => choose(option)}
                style={{
                  ...styles.optionBtn,
                  minHeight: boolMode ? 74 : 60,
                  borderColor: isCorrect ? C.green : isWrong ? C.red : C.gold,
                  background: isCorrect ? "#E8F8EF" : isWrong ? "#FBE8E5" : "#fff",
                }}
              >
                {renderOption(option)}
              </button>
            );
          })}
        </div>

        {feedback !== "idle" && (
          <>
            {feedback === "correct" && (
              <div style={styles.successPill}>
                <span style={styles.successText}>أَحْسَنْتَ</span>
                <span style={styles.successIcon}>✅</span>
              </div>
            )}

            <div
              style={{
                ...styles.feedbackToast,
                borderColor: feedback === "correct" ? C.green : C.gold,
              }}
            >
              <div
                style={{
                  ...styles.feedbackToastText,
                  color: feedback === "correct" ? C.navy : C.brown,
                }}
              >
                {feedback === "correct" ? "رائع يا بطل! اخترت الإجابة الصحيحة 🎉" : "اقتربت! حاول مرة أخرى 👏"}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100dvh",
    background: "radial-gradient(circle at top,#FFF1C6,#FFF8EC 48%,#FFFFFF)",
    padding: "6px 8px 88px",
    boxSizing: "border-box",
    fontFamily: "Tajawal, sans-serif",
    overflowY: "auto",
  },
  card: {
    width: "100%",
    maxWidth: 640,
    margin: "0 auto",
    background: "rgba(255,255,255,.98)",
    border: `4px solid ${C.gold}`,
    borderRadius: 26,
    padding: 9,
    boxSizing: "border-box",
    boxShadow: "0 14px 30px rgba(122,59,19,.14)",
    textAlign: "center",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  counter: {
    background: C.navy,
    color: "#fff",
    borderRadius: 18,
    padding: "6px 16px",
    fontSize: 20,
    fontWeight: 1000,
  },
  soundBtn: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "4px solid #fff",
    background: C.gold,
    color: "#fff",
    fontSize: 24,
    boxShadow: "0 8px 18px rgba(232,160,32,.35)",
  },
  progressRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginBottom: 6,
  },
  progressDot: {
    height: 14,
    borderRadius: 999,
    display: "inline-block",
    transition: "all .25s ease",
  },
  sceneWrap: {
    width: "100%",
    aspectRatio: "4 / 3",
    borderRadius: 20,
    overflow: "hidden",
    border: "4px solid #F1CF82",
    background: "#FFF8EC",
    marginBottom: 7,
  },
  sceneImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 35%",
    display: "block",
  },
  labWrap: {
    border: "4px solid #F1CF82",
    borderRadius: 20,
    background: "#FFF8EC",
    padding: 9,
    marginBottom: 7,
  },
  barRow: {
    display: "grid",
    gridTemplateColumns: "90px 1fr",
    gap: 8,
    alignItems: "center",
    marginBottom: 7,
  },
  barLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    color: C.navy,
    fontWeight: 1000,
    fontSize: 15,
  },
  track: {
    height: 28,
    borderRadius: 999,
    background: "repeating-linear-gradient(90deg,#F7E6B6 0,#F7E6B6 8px,#FFF8EC 8px,#FFF8EC 16px)",
    border: "2px solid #EFD797",
    padding: 3,
    boxSizing: "border-box",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
    border: "2px solid #fff",
    boxShadow: "0 3px 8px rgba(0,0,0,.12)",
  },
  questionBox: {
    border: `4px solid ${C.gold}`,
    borderRadius: 20,
    background: "#fff",
    padding: "8px 10px",
    marginBottom: 7,
  },
  smallInstruction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    color: C.brown,
    fontWeight: 1000,
    fontSize: "clamp(15px,4vw,19px)",
    lineHeight: 1.25,
    marginBottom: 4,
  },
  questionText: {
    color: C.navy,
    fontWeight: 1000,
    fontSize: "clamp(20px,5.2vw,28px)",
    lineHeight: 1.35,
  },
  optionsGrid: {
    display: "grid",
    gap: 7,
  },
  optionBtn: {
    border: "4px solid",
    borderRadius: 19,
    color: C.navy,
    fontSize: "clamp(18px,4.8vw,24px)",
    fontWeight: 1000,
    width: "100%",
    padding: "8px 6px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 0 rgba(232,160,32,.22)",
  },
  optionInner: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  optionPart: {
    display: "inline-flex",
    gap: 6,
    alignItems: "center",
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid #fff",
    boxShadow: "0 1px 4px rgba(0,0,0,.16)",
    display: "inline-block",
  },
  boolText: {
    fontSize: "clamp(22px,5.2vw,28px)",
    fontWeight: 1000,
    color: C.navy,
  },

  successPill: {
    position: "fixed",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    minWidth: 250,
    minHeight: 105,
    borderRadius: 999,
    background: "#20A567",
    border: "8px solid rgba(255,255,255,.92)",
    boxShadow: "0 18px 36px rgba(0,0,0,.22)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    animation: "feedbackPop .32s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  successText: {
    fontSize: "clamp(34px,8vw,50px)",
    fontWeight: 1000,
    lineHeight: 1,
  },
  successIcon: {
    fontSize: "clamp(34px,8vw,48px)",
    lineHeight: 1,
  },
  feedbackToast: {
    position: "fixed",
    left: 20,
    right: 20,
    bottom: 108,
    zIndex: 999,
    background: "rgba(255,255,255,.96)",
    border: "4px solid",
    borderRadius: 22,
    padding: "11px 14px",
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,.16)",
    animation: "feedbackPop .30s ease",
  },
  feedbackToastText: {
    fontSize: "clamp(17px,4.7vw,23px)",
    fontWeight: 1000,
    lineHeight: 1.35,
  },

};
