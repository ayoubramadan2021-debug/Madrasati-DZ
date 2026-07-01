import { useCallback, useEffect, useRef, useState } from "react";

export type RankVisualItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

export type RankOrderItem = {
  scene_image: string;
  question: string;
  question_audio_key: string;
  title: string;
  instruction: string;
  mode: "pickObject" | "pickRank" | "nextRank" | "missingRank";
  correct: string;
  visuals?: RankVisualItem[];
  options?: string[];
  sequence?: string[];
};

export interface RankOrderExerciseV2Props {
  items: RankOrderItem[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

type WordTiming = { text: string; offset: number; duration: number };

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function useExerciseAudio(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const genRef = useRef(0);

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    genRef.current++;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(
    async (key: string, words: WordTiming[]) => {
      stop();

      const myGen = genRef.current;
      setShown(new Set());

      const audio = new Audio(`${audioBase}/${key}.mp3`);
      audio.preload = "auto";
      audio.volume = 1;
      audioRef.current = audio;

      try {
        await audio.play();
      } catch {
        const all = new Set<number>();
        words.forEach((_, i) => all.add(i));
        setShown(all);
        return;
      }

      if (myGen !== genRef.current) {
        audio.pause();
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
    },
    [audioBase, stop]
  );

  useEffect(() => () => stop(), [stop]);

  return { play, stop, currentIdx, shown };
}

export default function RankOrderExerciseV2({
  items,
  audio_base,
  onComplete,
}: RankOrderExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);

  const audio = useExerciseAudio(audio_base);
  const item = items[itemIdx];

  useEffect(() => {
    items.forEach(async (it) => {
      const t = await loadTimings(audio_base, it.question_audio_key);
      if (t) {
        setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
      }
    });
  }, [audio_base, items]);

  useEffect(() => {
    audio.stop();
    setSelected(null);
    setFeedback("idle");
    setLocked(false);

    const t = timings[item.question_audio_key];
    if (!t) return;

    const timer = setTimeout(() => {
      audio.play(item.question_audio_key, t);
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) audio.play(item.question_audio_key, t);
  };

  const playFeedback = (correct: boolean) => {
    const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
    a.play().catch(() => {});
  };

  const nextItem = (newScore: number) => {
    if (itemIdx < items.length - 1) {
      setItemIdx((n) => n + 1);
    } else {
      onComplete?.(newScore, items.length);
    }
  };

  const handleAnswer = (value: string) => {
    if (locked) return;

    audio.stop();
    setSelected(value);

    const ok = value === item.correct;

    if (ok) {
      setFeedback("correct");
      setLocked(true);
      playFeedback(true);
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => nextItem(newScore), 1300);
    } else {
      setFeedback("wrong");
      playFeedback(false);
      setTimeout(() => {
        setFeedback("idle");
        setSelected(null);
      }, 900);
    }
  };

  const questionWords = item.question.split(/\s+/);

  return (
    <main dir="rtl" style={styles.page}>
      <section style={styles.screen}>
        <header style={styles.header}>
          <div style={styles.counter}>{itemIdx + 1} / {items.length}</div>
          <button style={styles.soundBtnTop} onClick={replayQuestion}>🔊</button>
        </header>

        <h1 style={styles.mainTitle}>{item.title}</h1>

        <div style={styles.sceneBox}>
          <img src={item.scene_image} alt="" style={styles.sceneImage} />
        </div>

        <div style={styles.questionBox}>
          <div style={styles.instruction}>{item.instruction}</div>
          <div style={styles.questionText}>
            {questionWords.map((w, i) => (
              <span
                key={`${w}-${i}`}
                style={{
                  ...styles.word,
                  color: audio.currentIdx === i ? "#E8A020" : "#1B3A6B",
                  opacity: audio.shown.has(i) ? 1 : 0.42,
                  transform: audio.currentIdx === i ? "scale(1.08)" : "scale(1)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {item.visuals && (
          <div
            style={{
              ...styles.visualGrid,
              gridTemplateColumns:
                item.visuals.length === 6
                  ? "repeat(3, minmax(0, 1fr))"
                  : "repeat(4, minmax(0, 1fr))",
            }}
          >
            {item.visuals.map((v, i) => {
              const isSelected = selected === v.id;
              const isCorrectVisible = feedback === "correct" && item.correct === v.id;

              return (
                <button
                  key={v.id}
                  disabled={item.mode !== "pickObject"}
                  onClick={() => item.mode === "pickObject" && handleAnswer(v.id)}
                  style={{
                    ...styles.visualBtn,
                    background: v.color,
                    boxShadow:
                      isSelected && feedback === "correct"
                        ? "0 0 0 6px #1FA463, 0 12px 22px rgba(0,0,0,.18)"
                        : isSelected && feedback === "wrong"
                        ? "0 0 0 6px #D45447, 0 12px 22px rgba(0,0,0,.18)"
                        : isCorrectVisible
                        ? "0 0 0 6px #1FA463, 0 12px 22px rgba(0,0,0,.18)"
                        : "0 8px 18px rgba(0,0,0,.12)",
                  }}
                >
                  <span style={styles.rankBadge}>{i + 1}</span>
                  <span style={styles.visualIcon}>{v.icon}</span>
                </button>
              );
            })}
          </div>
        )}

        {item.sequence && (
          <div style={styles.sequenceGrid}>
            {item.sequence.map((part, i) => (
              <div key={i} style={part === "؟" ? styles.missingPart : styles.seqPart}>
                {part}
              </div>
            ))}
          </div>
        )}

        {item.mode !== "pickObject" && item.options && (
          <div style={styles.optionsGrid}>
            {item.options.map((opt) => {
              const isSelected = selected === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    ...styles.optionBtn,
                    borderColor:
                      isSelected && feedback === "correct"
                        ? "#1FA463"
                        : isSelected && feedback === "wrong"
                        ? "#D45447"
                        : "#E8A020",
                    background:
                      isSelected && feedback === "correct"
                        ? "#DCFCE7"
                        : isSelected && feedback === "wrong"
                        ? "#FEE2E2"
                        : "#FFFFFF",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {feedback !== "idle" && (
          <div
            style={{
              ...styles.feedback,
              background: feedback === "correct" ? "#1FA463" : "#D45447",
            }}
          >
            {feedback === "correct" ? "أَحْسَنْتَ ✅" : "حَاوِلْ مَرَّةً أُخْرَى 🌟"}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    minHeight: "calc(100dvh - 72px)",
    background: "linear-gradient(180deg,#FFF8EC 0%,#FFEEC2 100%)",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  screen: {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "calc(100dvh - 72px)",
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  },
  counter: {
    direction: "ltr",
    border: "3px solid #E8A020",
    background: "#FFFFFF",
    color: "#92400E",
    borderRadius: 22,
    padding: "8px 18px",
    fontWeight: 1000,
    fontSize: 22,
    minWidth: 96,
    textAlign: "center",
  },
  soundBtnTop: {
    width: 58,
    height: 58,
    borderRadius: "50%",
    border: "4px solid #FFFFFF",
    background: "#E8A020",
    fontSize: 26,
    boxShadow: "0 10px 24px rgba(0,0,0,.18)",
  },
  mainTitle: {
    margin: 0,
    color: "#8A3A12",
    textAlign: "center",
    fontSize: "clamp(24px, 5.6vw, 38px)",
    lineHeight: 1.15,
    fontWeight: 1000,
    flexShrink: 0,
  },
  sceneBox: {
    width: "100%",
    height: "29dvh",
    minHeight: 200,
    maxHeight: 280,
    background: "#FFF8EC",
    border: "3px solid #E8A020",
    borderRadius: 28,
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "0 12px 28px rgba(0,0,0,.12)",
  },
  sceneImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },
  questionBox: {
    border: "3px solid #E8A020",
    background: "#FFFFFF",
    borderRadius: 26,
    padding: "8px 10px",
    textAlign: "center",
    flexShrink: 0,
  },
  instruction: {
    color: "#8A3A12",
    fontWeight: 900,
    fontSize: "clamp(14px, 3.8vw, 20px)",
    lineHeight: 1.35,
  },
  questionText: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "5px 8px",
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: "clamp(20px, 5vw, 31px)",
    lineHeight: 1.35,
  },
  word: {
    display: "inline-block",
    transition: "all .16s ease",
  },
  visualGrid: {
    width: "100%",
    display: "grid",
    gap: 8,
    flexShrink: 0,
  },
  visualBtn: {
    position: "relative",
    height: 66,
    minWidth: 0,
    border: "4px solid rgba(255,255,255,.92)",
    borderRadius: 22,
    display: "grid",
    placeItems: "center",
    transition: "all .16s ease",
  },
  rankBadge: {
    position: "absolute",
    top: -8,
    left: -4,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#FFFFFF",
    border: "2px solid #E8A020",
    color: "#92400E",
    fontWeight: 1000,
    fontSize: 15,
    display: "grid",
    placeItems: "center",
  },
  visualIcon: {
    fontSize: 35,
  },
  sequenceGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    flexShrink: 0,
  },
  seqPart: {
    minHeight: 56,
    background: "#FFFFFF",
    border: "3px solid #E8A020",
    borderRadius: 22,
    display: "grid",
    placeItems: "center",
    color: "#1B3A6B",
    fontWeight: 1000,
    fontSize: "clamp(18px, 4.5vw, 27px)",
  },
  missingPart: {
    minHeight: 56,
    background: "#FFF4C9",
    border: "4px dashed #E8A020",
    borderRadius: 22,
    display: "grid",
    placeItems: "center",
    color: "#92400E",
    fontWeight: 1000,
    fontSize: "clamp(22px, 5vw, 31px)",
  },
  optionsGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    flexShrink: 0,
  },
  optionBtn: {
    minHeight: 58,
    border: "4px solid #E8A020",
    borderRadius: 24,
    color: "#1B3A6B",
    background: "#FFFFFF",
    fontWeight: 1000,
    fontSize: "clamp(18px, 4.8vw, 29px)",
    boxShadow: "0 8px 16px rgba(0,0,0,.1)",
  },
  feedback: {
    position: "fixed",
    left: "50%",
    bottom: 90,
    transform: "translateX(-50%)",
    color: "#FFFFFF",
    borderRadius: 999,
    padding: "13px 24px",
    fontWeight: 1000,
    fontSize: 24,
    boxShadow: "0 14px 32px rgba(0,0,0,.24)",
    zIndex: 100,
  },
};
