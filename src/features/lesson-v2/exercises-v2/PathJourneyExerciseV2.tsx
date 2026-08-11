import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";

export type PathMode = "type" | "point";
export type PathShape = "straight" | "curve";

export type PathVisual = {
  id: string;
  shape: PathShape;
  color: string;
};

export type PathQuestion = {
  mode: PathMode;
  question: string;
  question_audio_key: string;
  correct_id: string;
  options?: PathVisual[];
  visual?: PathVisual;
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

function getPathD(visual: PathVisual) {
  return visual.shape === "straight"
    ? "M 42 82 L 258 82"
    : "M 42 96 C 98 34, 176 130, 258 66";
}

function titleFor(mode: PathMode) {
  return mode === "type" ? "أُمَيِّزُ شَكْلَ المَسَارِ" : "أُحَدِّدُ البِدَايَةَ وَالنِّهَايَةَ";
}

function hintFor(mode: PathMode) {
  return mode === "type" ? "مُسْتَقِيمٌ أَوْ مُنْحَنٍ فَقَطْ" : "اِلْمِسِ النُّقْطَةَ الصَّحِيحَةَ";
}

export default function PathJourneyExerciseV2({
  items,
  audio_base,
  onComplete,
}: PathJourneyExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");

  const karaoke = useKaraoke(audio_base);
  const question = items[itemIdx];

  const currentKey = question?.question_audio_key || "";
  const currentTiming = currentKey ? timings[currentKey] : undefined;

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
    setFeedbackState("idle");

    if (!question || !currentTiming) return;

    const timer = window.setTimeout(() => {
      karaoke.play(question.question_audio_key, currentTiming);
    }, 450);

    return () => window.clearTimeout(timer);
    // لا نستعمل timings كاملًا حتى لا يتوقف الصوت عند تحميل JSON آخر
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, currentKey, currentTiming]);

  function replayQuestion() {
    if (!question) return;
    const t = timings[question.question_audio_key];
    if (t) karaoke.play(question.question_audio_key, t);
  }

  function nextAfterCorrect() {
    window.setTimeout(() => {
      if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
      else onComplete?.(items.length, items.length);
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
      setFeedbackState("idle");
      replayQuestion();
    }, 1150);
  }

  function choose(id: string) {
    if (!question || feedbackState !== "idle") return;
    if (id === question.correct_id) showCorrect();
    else showWrong();
  }

  if (!question) return null;

  const words =
    timings[question.question_audio_key]
    || fallbackWords(question.question);

  const karaokeWords =
    words.map((word) => word.text);

  const isActive =
    karaoke.activeKey === question.question_audio_key;

  const shownWordCount =
    isActive && karaoke.shown.size > 0
      ? Math.max(...karaoke.shown) + 1
      : 0;

  const effectiveShownWordCount =
    feedbackState !== "idle"
      ? karaokeWords.length
      : shownWordCount;

  return (
    <main dir="rtl" style={styles.page}>
      <header style={styles.header}>
        <div style={styles.counter}>{itemIdx + 1} / {items.length}</div>
        <button type="button" onClick={replayQuestion} style={styles.sound}>🔊</button>
      </header>

      <section style={styles.questionBox}>
        <UnifiedExerciseKaraokeV2
          words={karaokeWords}
          activeIndex={
            isActive
              ? karaoke.currentIdx
              : -1
          }
          shownWordCount={
            effectiveShownWordCount
          }
        />
      </section>

      <section style={styles.lab}>
        <div style={styles.labHeader}>
          <strong>{titleFor(question.mode)}</strong>
          <span>{hintFor(question.mode)}</span>
        </div>

        {question.mode === "type" && (
          <div style={styles.typeGrid}>
            {(question.options || []).map((opt, index) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => choose(opt.id)}
                style={styles.pathCard}
              >
                <span style={styles.optionBadge}>{index + 1}</span>
                <PathDrawing visual={opt} />
                <div style={styles.pathLabel}>
                  {opt.shape === "straight" ? "مُسْتَقِيمٌ" : "مُنْحَنٍ"}
                </div>
              </button>
            ))}
          </div>
        )}

        {question.mode === "point" && question.visual && (
          <div style={styles.singlePathCard}>
            <PathDrawing visual={question.visual} large />

            <button
              type="button"
              onClick={() => choose("start")}
              style={{
                ...styles.pointChoice,
                left: question.visual.shape === "straight" ? "14%" : "14%",
                top: question.visual.shape === "straight" ? "50%" : "63%",
                background: C.green,
              }}
            >
              ب
            </button>

            <button
              type="button"
              onClick={() => choose("end")}
              style={{
                ...styles.pointChoice,
                left: "86%",
                top: question.visual.shape === "straight" ? "50%" : "44%",
                background: C.red,
              }}
            >
              ن
            </button>
          </div>
        )}

        <button type="button" onClick={replayQuestion} style={styles.undo}>
          أَعِدِ السُّؤَالَ
        </button>
      </section>

      {feedbackState !== "idle" && (
        <Feedback state={feedbackState} />
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
  const d = getPathD(visual);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 150"
      style={{ display: "block", minHeight: large ? 220 : 96 }}
    >
      <defs>
        <filter id={`shadow-${visual.id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="3" floodOpacity="0.22" />
        </filter>
      </defs>

      <path d={d} fill="none" stroke="#ffffff" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={visual.color} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" filter={`url(#shadow-${visual.id})`} />
      <path d={d} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="42" cy={visual.shape === "straight" ? 82 : 96} r="13" fill={C.green} stroke="white" strokeWidth="5" />
      <circle cx="258" cy={visual.shape === "straight" ? 82 : 66} r="13" fill={C.red} stroke="white" strokeWidth="5" />
    </svg>
  );
}

function Feedback({ state }: { state: "correct" | "wrong" }) {
  return (
    <div style={styles.feedbackLayer}>
      <div
        style={{
          ...styles.feedbackBackShape,
          background: state === "correct" ? C.green : C.red,
        }}
      >
        {state === "correct" ? "✅" : "✨"}
      </div>

      <div
        style={{
          ...styles.feedbackToast,
          borderColor: state === "correct" ? C.green : C.gold,
        }}
      >
        <span style={styles.feedbackToastText}>
          {state === "correct"
            ? "رائع يا بطل! إجابة صحيحة 🎉"
            : "اقتربت! انظر إلى المسار جيدًا 👏"}
        </span>
      </div>
    </div>
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
    gridTemplateRows: "54px 1fr 42px",
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
  typeGrid: {
    minHeight: 0,
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gap: 12,
  },
  pathCard: {
    position: "relative",
    width: "100%",
    border: `4px solid ${C.gold}`,
    borderRadius: 24,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    display: "grid",
    gridTemplateRows: "1fr 34px",
    placeItems: "center",
    overflow: "hidden",
    padding: "4px 10px",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
  },
  pathLabel: {
    width: "100%",
    borderRadius: 14,
    background: "#fff8dd",
    color: C.navyDeep,
    display: "grid",
    placeItems: "center",
    fontSize: "clamp(16px,4.5vw,24px)",
    fontWeight: 1000,
  },
  singlePathCard: {
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
  pointChoice: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    width: 54,
    height: 54,
    borderRadius: "50%",
    border: "6px solid white",
    color: "white",
    display: "grid",
    placeItems: "center",
    fontSize: 25,
    fontWeight: 1000,
    boxShadow: "0 8px 16px rgba(0,0,0,.22)",
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
