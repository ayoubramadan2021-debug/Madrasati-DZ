import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useKaraoke, loadTimings, type WordTiming } from "../useKaraoke";
import UnifiedExerciseKaraokeV2 from "../components/UnifiedExerciseKaraokeV2";

export type TracePathItem = {
  question: string;
  question_audio_key: string;
  path_d: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  color: string;
};

export interface PathTraceExerciseV2Props {
  items: TracePathItem[];
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

export default function PathTraceExerciseV2({
  items,
  audio_base,
  onComplete,
}: PathTraceExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [hasDrawn, setHasDrawn] = useState(false);
  const [feedbackState, setFeedbackState] = useState<"idle" | "correct" | "wrong">("idle");
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const karaoke = useKaraoke(audio_base);
  const item = items[itemIdx];

  const currentKey = item?.question_audio_key || "";
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
    setHasDrawn(false);
    setFeedbackState("idle");
    canvasRef.current?.clearCanvas();

    if (!item || !currentTiming) return;

    const timer = window.setTimeout(() => {
      karaoke.play(item.question_audio_key, currentTiming);
    }, 450);

    return () => window.clearTimeout(timer);
    // لا نستعمل timings كاملًا حتى لا يتوقف الصوت عند تحميل JSON آخر
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, currentKey, currentTiming]);

  function replayQuestion() {
    if (!item) return;
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  }

  function clearDrawing() {
    canvasRef.current?.clearCanvas();
    setHasDrawn(false);
    setFeedbackState("idle");
  }

  function validateDrawing() {
    if (!hasDrawn || feedbackState !== "idle") {
      setFeedbackState("wrong");
      playFeedback(false);
      window.setTimeout(() => setFeedbackState("idle"), 900);
      return;
    }

    karaoke.stop();
    setFeedbackState("correct");
    playFeedback(true);

    window.setTimeout(() => {
      if (itemIdx < items.length - 1) setItemIdx(itemIdx + 1);
      else onComplete?.(items.length, items.length);
    }, 1450);
  }

  if (!item) return null;

  const words =
    timings[item.question_audio_key]
    || fallbackWords(item.question);

  const karaokeWords =
    words.map((word) => word.text);

  const isActive =
    karaoke.activeKey === item.question_audio_key;

  const shownWordCount =
    karaoke.shown.size > 0
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
          <strong>أَرْسُمُ المَسَارَ</strong>
          <span>{hasDrawn ? "جَيِّدٌ، اضْغَطْ تَحَقَّقْ" : "اِبْدَأْ مِنَ النُّقْطَةِ الذَّهَبِيَّةِ"}</span>
        </div>

        <div style={styles.traceBoard}>
          <svg viewBox="0 0 300 170" style={styles.guideSvg}>
            <path
              d={item.path_d}
              fill="none"
              stroke="#ffffff"
              strokeWidth="30"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={item.path_d}
              fill="none"
              stroke="#B8AB8E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="12 10"
              opacity={0.82}
            />

            <path
              d={item.path_d}
              fill="none"
              stroke={item.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.35}
            />

            <circle cx={item.start.x} cy={item.start.y} r="13" fill={C.gold} stroke="white" strokeWidth="5" />
            <circle cx={item.end.x} cy={item.end.y} r="13" fill={C.red} stroke="white" strokeWidth="5" />
          </svg>

          <ReactSketchCanvas
            ref={canvasRef}
            style={styles.canvas}
            width="100%"
            height="100%"
            strokeWidth={15}
            strokeColor={C.gold}
            canvasColor="transparent"
            onStroke={() => setHasDrawn(true)}
          />
        </div>

        <div style={styles.actions}>
          <button type="button" onClick={clearDrawing} style={styles.clearBtn}>
            مَسْح
          </button>

          <button
            type="button"
            onClick={validateDrawing}
            style={{
              ...styles.checkBtn,
              opacity: hasDrawn ? 1 : 0.6,
            }}
          >
            تَحَقَّقْ
          </button>
        </div>
      </section>

      {feedbackState !== "idle" && <Feedback state={feedbackState} />}

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
            ? "رائع يا بطل! رسمت المسار 🎉"
            : "ارسم فوق المسار أولًا 👏"}
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
    gridTemplateRows: "54px 1fr 48px",
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
  traceBoard: {
    position: "relative",
    minHeight: 0,
    border: `5px solid ${C.gold}`,
    borderRadius: 28,
    background: "linear-gradient(180deg,#fffef8,#fff3cf)",
    overflow: "hidden",
    boxShadow: "0 5px 0 rgba(0,0,0,.12)",
    touchAction: "none",
  },
  guideSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    background: "transparent",
  },
  actions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  clearBtn: {
    border: 0,
    borderRadius: 16,
    background: "#fff7d6",
    color: C.navy,
    fontSize: "clamp(18px,5vw,26px)",
    fontWeight: 1000,
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,.08)",
  },
  checkBtn: {
    border: 0,
    borderRadius: 16,
    background: C.green,
    color: "white",
    fontSize: "clamp(18px,5vw,26px)",
    fontWeight: 1000,
    boxShadow: "inset 0 -3px 0 rgba(0,0,0,.12)",
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
