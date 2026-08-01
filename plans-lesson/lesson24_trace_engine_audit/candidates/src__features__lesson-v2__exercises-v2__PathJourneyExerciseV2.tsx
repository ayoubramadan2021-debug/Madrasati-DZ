import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";

export type PathMode = "choose" | "name" | "follow";
export type PathShape = "straight" | "curve" | "zigzag" | "wave" | "stairs";

export type PathPoint = {
  id: string;
  x: number;
  y: number;
  label: string;
};

export type PathVisual = {
  id: string;
  shape: PathShape;
  color: string;
  points?: PathPoint[];
};

export type PathChoice = {
  id: string;
  label: string;
};

export type PathQuestion = {
  mode: PathMode;
  question: string;
  question_audio_key: string;
  correct_id?: string;
  options?: PathVisual[];
  visual?: PathVisual;
  choices?: PathChoice[];
};

export interface PathJourneyExerciseV2Props {
  items: PathQuestion[];
  audio_base: string;
  onComplete?: (score: number, total: number) => void;
}

const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
  red: "#D45447",
  blue: "#2F80ED",
};

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
const FEEDBACK_RETRY = "/audio/v2_feedback/retry.mp3";

function playFeedback(correct: boolean) {
  const a = new Audio(correct ? FEEDBACK_CORRECT : FEEDBACK_RETRY);
  a.play().catch(() => {});
}

function fallbackWords(question: string): WordTiming[] {
  return question.split(/\s+/).filter(Boolean).map((text, i) => ({
    text,
    offset: i * 520,
    duration: 460,
  }));
}

function pathTitle(mode: PathMode) {
  if (mode === "choose") return "أَخْتَارُ المَسَارَ";
  if (mode === "name") return "أُمَيِّزُ شَكْلَ المَسَارِ";
  return "أَتْبَعُ المَسَارَ";
}

function pathHint(mode: PathMode) {
  if (mode === "choose") return "اِلْمِسِ المَسَارَ المُنَاسِبَ";
  if (mode === "name") return "اُنْظُرْ إِلَى الرَّسْمِ ثُمَّ اخْتَرْ";
  return "اِلْمِسِ النِّقَاطَ بِالتَّرْتِيبِ";
}

function getPathD(shape: PathShape, points?: PathPoint[]) {
  if (points && points.length > 1) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }

  if (shape === "straight") return "M 42 82 L 258 82";
  if (shape === "curve") return "M 42 96 C 96 28, 174 132, 258 68";
  if (shape === "zigzag") return "M 42 106 L 96 52 L 150 106 L 204 52 L 258 92";
  if (shape === "wave") return "M 42 84 C 76 44, 112 124, 148 84 S 222 44, 258 84";
  return "M 42 112 L 88 112 L 88 82 L 136 82 L 136 52 L 188 52 L 188 82 L 258 82";
}

export default function PathJourneyExerciseV2({
  items,
  audio_base,
  onComplete,
}: PathJourneyExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");

  const karaoke = useKaraoke(audio_base);
  const question = items[itemIdx];

  const currentKey = question?.question_audio_key || "";
  const currentTiming = currentKey ? timings[currentKey] : undefined;

  const followPoints = useMemo(() => {
    if (question?.mode !== "follow") return [];
    return question.visual?.points || [];
  }, [question]);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      for (const it of items) {
        const t = await loadTimings(audio_base, it.question_audio_key);
        if (!cancelled && t) {
          setTimings((p) => ({ ...p, [it.question_audio_key]: t }));
        }
      }
    }

    loadAll();

    return () => {
      cancelled = true;
    };
  }, [audio_base, items]);

  useEffect(() => {
    karaoke.stop();
    setSelectedPoints([]);
    setFeedbackState("idle");

    if (!question || !currentTiming) return;

    const timer = window.setTimeout(() => {
      karaoke.play(question.question_audio_key, currentTiming);
    }, 450);

    return () => window.clearTimeout(timer);
    // لا نضع timings كاملًا حتى لا يتوقف الصوت عند تحميل JSON آخر
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, currentKey, currentTiming]);

  function replayQuestion() {
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  }

  function nextAfterCorrect() {
    window.setTimeout(() => {
      if (itemIdx < items.length - 1) {
        setItemIdx(itemIdx + 1);
      } else {
        onComplete?.(items.length, items.length);
      }
    }, 1450);
  }

  function showCorrect() {
    karaoke.stop();
    setFeedbackState("correct");
    playFeedback(true);
    nextAfterCorrect();
  }

  function showWrong() {
    karaoke.stop();
    setFeedbackState("wrong");
    playFeedback(false);

    window.setTimeout(() => {
      setSelectedPoints([]);
      setFeedbackState("idle");
      replayQuestion();
    }, 1150);
  }

  function chooseOption(id: string) {
    if (!question || feedbackState !== "idle") return;

    if (id === question.correct_id) {
      showCorrect();
    } else {
      showWrong();
    }
  }

  function touchPoint(point: PathPoint) {
    if (!question || feedbackState !== "idle") return;

    const expected = followPoints[selectedPoints.length];

    if (!expected || expected.id !== point.id) {
      showWrong();
      return;
    }

    const next = [...selectedPoints, point.id];
    setSelectedPoints(next);

    if (next.length === followPoints.length) {
      showCorrect();
    }
  }

  function undoPoint() {
    if (feedbackState !== "idle") return;
    setSelectedPoints((v) => v.slice(0, -1));
  }

  if (!question) return null;

  const words = timings[question.question_audio_key] || fallbackWords(question.question);
  const isActive = karaoke.activeKey === question.question_audio_key;

  return (
    <main dir="rtl" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.counter}>{itemIdx + 1} / {items.length}</div>
        <button type="button" onClick={replayQuestion} style={styles.sound}>🔊</button>
      </header>

      <section style={styles.questionBox}>
        <div style={styles.questionLine}>
          {words.map((word, i) => {
            const active = isActive && karaoke.currentIdx === i;
            const shown = karaoke.shown.has(i);

            return (
              <span
                key={`${word.text}-${i}`}
                style={{
                  ...styles.questionWord,
                  opacity: isActive && !shown && !active ? 0.42 : 1,
                  transform: active ? "scale(1.08)" : "scale(1)",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      </section>

      <section
        style={{
          ...styles.lab,
          gridTemplateRows:
            question.mode === "follow" ? "54px 1fr 76px 42px" : "54px 1fr 42px",
        }}
      >
        <div style={styles.labHeader}>
          <strong>{pathTitle(question.mode)}</strong>
          <span>{pathHint(question.mode)}</span>
        </div>

        {question.mode === "choose" && (
          <div style={styles.chooseGrid}>
            {(question.options || []).map((opt, index) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => chooseOption(opt.id)}
                style={styles.pathCard}
              >
                <span style={styles.optionBadge}>{index + 1}</span>
                <PathDrawing visual={opt} />
              </button>
            ))}
          </div>
        )}

        {question.mode === "name" && (
          <>
            <div style={styles.singlePathCard}>
              {question.visual && <PathDrawing visual={question.visual} large />}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${question.choices?.length || 3}, 1fr)`,
                gap: 8,
              }}
            >
              {(question.choices || []).map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => chooseOption(choice.id)}
                  style={styles.choiceBtn}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </>
        )}

        {question.mode === "follow" && (
          <>
            <div style={styles.followBoard}>
              {question.visual && (
                <>
                  <PathDrawing visual={question.visual} large />
                  {(question.visual.points || []).map((point, index) => {
                    const touched = selectedPoints.includes(point.id);
                    const next = selectedPoints.length === index;

                    return (
                      <button
                        key={point.id}
                        type="button"
                        onClick={() => touchPoint(point)}
                        style={{
                          ...styles.pointBtn,
                          left: `${point.x / 3}%`,
                          top: `${point.y / 1.4}%`,
                          background: touched ? C.green : next ? C.gold : "#fffef7",
                          color: touched || next ? "white" : C.navyDeep,
                        }}
                      >
                        {point.label}
                      </button>
                    );
                  })}
                </>
              )}
            </div>

            <div
              style={{
                ...styles.stepSlots,
                gridTemplateColumns: `repeat(${followPoints.length}, 1fr)`,
              }}
            >
              {followPoints.map((p, i) => (
                <div key={p.id} style={styles.stepSlot}>
                  {selectedPoints[i] ? "✓" : i + 1}
                </div>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={question.mode === "follow" ? undoPoint : replayQuestion}
          style={styles.undo}
        >
          {question.mode === "follow" ? "تَرَاجُع" : "أَعِدِ السُّؤَالَ"}
        </button>
      </section>

      {feedbackState !== "idle" && (
        <div style={styles.feedbackLayer}>
          <div
            style={{
              ...styles.feedbackBackShape,
              background: feedbackState === "correct" ? C.green : C.red,
            }}
          >
            {feedbackState === "correct" ? "✅" : "✨"}
          </div>

          <div
            style={{
              ...styles.feedbackToast,
              borderColor: feedbackState === "correct" ? C.green : C.gold,
            }}
          >
            <span style={styles.feedbackToastText}>
              {feedbackState === "correct"
                ? "رائع يا بطل! إجابة صحيحة 🎉"
                : "اقتربت! اتبع المسار جيدًا 👏"}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes feedbackPop {
          0% { transform: scale(.72); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes feedbackToastPop {
          0% { transform: translateY(18px) scale(.92); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

function PathDrawing({
  visual,
  large = false,
}: {
  visual: PathVisual;
  large?: boolean;
}) {
  const d = getPathD(visual.shape, visual.points);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 150"
      style={{
        display: "block",
        minHeight: large ? 190 : 86,
      }}
    >
      <defs>
        <filter id={`shadow-${visual.id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="3" floodOpacity="0.22" />
        </filter>
      </defs>

      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d={d}
        fill="none"
        stroke={visual.color}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#shadow-${visual.id})`}
      />

      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={visual.points?.[0]?.x || 42} cy={visual.points?.[0]?.y || 82} r="13" fill={C.green} stroke="white" strokeWidth="5" />
      <circle
        cx={visual.points?.[visual.points.length - 1]?.x || 258}
        cy={visual.points?.[visual.points.length - 1]?.y || 82}
        r="13"
        fill={C.red}
        stroke="white"
        strokeWidth="5"
      />
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    height: "100dvh",
    overflow: "hidden",
    padding: "8px",
    paddingBottom: "76px",
    boxSizing: "border-box",
    background: "radial-gradient(circle at top,#fff9df,#ffe5a2 74%)",
    color: C.navy,
    display: "grid",
    gridTemplateRows: "54px 124px 1fr",
    gap: 8,
    fontFamily: "Tajawal, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    direction: "ltr",
  },
  counter: {
    width: 86,
    height: 48,
    border: `4px solid ${C.gold}`,
    borderRadius: 18,
    background: C.cream,
    display: "grid",
    placeItems: "center",
    fontSize: 22,
    fontWeight: 1000,
    direction: "ltr",
    boxShadow: "0 6px 12px rgba(0,0,0,.10)",
  },
  sound: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "4px solid white",
    background: C.gold,
    fontSize: 25,
    boxShadow: "0 8px 16px rgba(0,0,0,.20)",
  },
  questionBox: {
    border: `5px solid ${C.gold}`,
    borderRadius: 26,
    background: "#fffef7",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "8px",
    boxSizing: "border-box",
    boxShadow: "0 5px 0 rgba(232,160,32,.18)",
  },
  questionLine: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px 12px",
    fontSize: "clamp(25px,7vw,40px)",
    fontWeight: 1000,
    lineHeight: 1.55,
    color: C.navyDeep,
  },
  questionWord: {
    display: "inline-block",
    color: C.navyDeep,
    transition: "transform .16s ease, opacity .16s ease",
  },
  lab: {
    minHeight: 0,
    border: "5px solid #c97b25",
    borderRadius: 30,
    background: "linear-gradient(180deg,#f8d59a,#dea85d)",
    padding: 10,
    boxSizing: "border-box",
    gap: 8,
    overflow: "hidden",
    display: "grid",
    boxShadow: "inset 0 0 0 4px rgba(255,255,255,.22)",
  },
  labHeader: {
    background: "linear-gradient(180deg,#fff7d6,#fff0ba)",
    borderRadius: 18,
    border: "2px solid rgba(232,160,32,.28)",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    placeItems: "center",
    textAlign: "center",
    lineHeight: 1.1,
    color: C.navyDeep,
    overflow: "hidden",
  },
  chooseGrid: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: 8,
  },
  pathCard: {
    position: "relative",
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 22,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: "4px 10px",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  singlePathCard: {
    minHeight: 0,
    border: `4px solid ${C.gold}`,
    borderRadius: 26,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: 10,
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  choiceBtn: {
    border: `4px solid ${C.gold}`,
    borderRadius: 18,
    background: "#fffef7",
    color: C.navyDeep,
    fontSize: "clamp(17px,5vw,25px)",
    fontWeight: 1000,
    boxShadow: "0 4px 0 rgba(0,0,0,.10)",
  },
  followBoard: {
    position: "relative",
    minHeight: 0,
    border: `4px solid ${C.gold}`,
    borderRadius: 26,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    padding: 10,
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  pointBtn: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "5px solid white",
    display: "grid",
    placeItems: "center",
    fontSize: 20,
    fontWeight: 1000,
    boxShadow: "0 8px 16px rgba(0,0,0,.22)",
  },
  stepSlots: {
    display: "grid",
    gap: 8,
    background: "rgba(255,255,255,.35)",
    borderRadius: 22,
    padding: 8,
    direction: "ltr",
  },
  stepSlot: {
    border: `4px dashed ${C.gold}`,
    borderRadius: 18,
    background: "rgba(255,255,255,.82)",
    color: C.gold,
    display: "grid",
    placeItems: "center",
    fontSize: 26,
    fontWeight: 1000,
  },
  optionBadge: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: C.gold,
    color: "white",
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    fontWeight: 1000,
    zIndex: 3,
  },
  undo: {
    border: 0,
    borderRadius: 16,
    background: "#fff7d6",
    color: C.navy,
    fontSize: "clamp(17px,5vw,25px)",
    fontWeight: 1000,
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,.08)",
  },
  feedbackLayer: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 84,
    zIndex: 9999,
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
    padding: "0 16px",
  },
  feedbackBackShape: {
    width: 250,
    height: 92,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    color: "white",
    fontSize: 44,
    fontWeight: 1000,
    boxShadow: "0 16px 32px rgba(0,0,0,.18)",
    animation: "feedbackPop .35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  feedbackToast: {
    width: "min(92vw, 390px)",
    minHeight: 70,
    marginTop: -64,
    borderRadius: 24,
    border: "5px solid",
    background: "rgba(255,255,255,.96)",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "8px 14px",
    boxShadow: "0 12px 28px rgba(0,0,0,.18)",
    animation: "feedbackToastPop .30s ease",
  },
  feedbackToastText: {
    color: C.navyDeep,
    fontSize: "clamp(19px,5.4vw,28px)",
    fontWeight: 1000,
    lineHeight: 1.35,
  },
};
