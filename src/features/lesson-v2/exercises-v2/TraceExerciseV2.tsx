import { useState, useEffect, useRef, useCallback } from "react";
import { isKeyword } from "../keywords";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

// ═══════════════════════════════════════════════════════════════
// TraceExerciseV2 — اكتب الرقم بإصبعك
// يستخدم react-sketch-canvas + SVG inline للرقم المنقّط
// المستوى (أ): نقبل أي رسم كإتمام (لا قياس دقة الآن)
// ═══════════════════════════════════════════════════════════════

export type TraceItem = {
  number: number;            // 1-5
  question: string;
  question_audio_key: string;
};

export interface TraceExerciseV2Props {
  items: TraceItem[];
  audio_base: string;
  background_image?: string;
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

type WordTiming = { text: string; offset: number; duration: number };

function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setActiveKey(null);
    setCurrentIdx(-1);
  }, []);

  const play = useCallback(async (key: string, words: WordTiming[]) => {
    stop();
    setShown(new Set());
    setActiveKey(key);
    const audio = new Audio(`${audioBase}/${key}.mp3`);
    audioRef.current = audio;
    audio.addEventListener("ended", () => setCurrentIdx(-1));
    try {
      await audio.play();
    } catch {
      const all = new Set<number>();
      words.forEach((_, i) => all.add(i));
      setShown(all);
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
  }, [audioBase, stop]);

  useEffect(() => () => stop(), [stop]);
  return { play, stop, activeKey, currentIdx, shown };
}

async function loadTimings(audioBase: string, key: string): Promise<WordTiming[] | null> {
  try {
    const r = await fetch(`${audioBase}/${key}.json`);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";

// ─── SVG paths for digits 1-5 (Eastern Arabic style for clarity) ───
// كل رقم بـ viewBox 100x140
const DIGIT_PATHS: Record<number, string> = {
  1: "M 35 30 L 55 20 L 55 120",
  2: "M 25 45 Q 25 20 50 20 Q 75 20 75 45 Q 75 65 55 80 L 25 120 L 80 120",
  3: "M 25 35 Q 25 20 50 20 Q 75 20 75 45 Q 75 65 55 65 Q 75 65 75 95 Q 75 120 50 120 Q 25 120 25 100",
  4: "M 65 20 L 25 80 L 80 80 M 65 50 L 65 120",
  5: "M 75 20 L 30 20 L 25 65 Q 50 55 70 70 Q 80 85 75 100 Q 70 120 45 120 Q 25 120 22 100",
};

function NumberGuide({ number, drawn }: { number: number; drawn: boolean }) {
  const path = DIGIT_PATHS[number];
  return (
    <svg
      viewBox="0 0 100 140"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* Dotted guide path */}
      <path
        d={path}
        fill="none"
        stroke={drawn ? C.green : "#B8AB8E"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 6"
        opacity={drawn ? 0.4 : 0.7}
      />
      {/* Start dot */}
      <circle
        cx={number === 4 ? 65 : number === 1 ? 35 : 25}
        cy={number === 4 ? 20 : number === 1 ? 30 : 35}
        r="6"
        fill={C.gold}
        opacity={drawn ? 0.3 : 1}
      />
    </svg>
  );
}

export default function TraceExerciseV2({
  items,
  audio_base,
  background_image = "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
  onComplete,
}: TraceExerciseV2Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [hasDrawn, setHasDrawn] = useState(false);
  const [completed, setCompleted] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

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
    setHasDrawn(false);
    setCompleted(false);
    canvasRef.current?.clearCanvas();
    if (!item) return;
    const t = timings[item.question_audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(item.question_audio_key, t), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIdx, timings]);

  const replayQuestion = () => {
    const t = timings[item.question_audio_key];
    if (t) karaoke.play(item.question_audio_key, t);
  };

  const handleStroke = () => {
    if (!hasDrawn) setHasDrawn(true);
  };

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setHasDrawn(false);
    setCompleted(false);
  };

  const handleNext = () => {
    if (!hasDrawn) return;
    setCompleted(true);
    const a = new Audio(FEEDBACK_CORRECT);
    a.play().catch(() => {});
    setTimeout(() => {
      if (itemIdx < items.length - 1) {
        setItemIdx(itemIdx + 1);
      } else {
        onComplete?.(items.length, items.length);
      }
    }, 1500);
  };

  if (!item) return null;
  const words = timings[item.question_audio_key];
  const isActive = karaoke.activeKey === item.question_audio_key;

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      position: "relative",
      fontFamily: "Tajawal, sans-serif",
      direction: "rtl",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${background_image}')`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px) brightness(0.85)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "80%",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,248,236,0.92) 30%, rgba(247,219,160,0.98) 100%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
      }}>
        <button onClick={replayQuestion} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: C.gold, color: "white",
          border: `3px solid ${C.cream}`,
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 12px rgba(232,160,32,.4)",
        }}>🔊</button>
        <div style={{ display: "flex", gap: 6 }}>
          {items.map((_, i) => (
            <div key={i} style={{
              width: i === itemIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < itemIdx ? C.green : i === itemIdx ? C.gold : "#E0CFA8",
              transition: "all .3s ease",
            }} />
          ))}
        </div>
        <div style={{
          background: C.navy, color: C.cream,
          padding: "6px 12px", borderRadius: 999,
          fontSize: 13, fontWeight: 700,
        }}>{itemIdx + 1} / {items.length}</div>
      </div>

      {/* Question */}
      <div style={{ position: "relative", zIndex: 2, padding: "8px 16px 12px" }}>
        <div onClick={replayQuestion} style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${C.gold}`,
          borderRadius: 18,
          padding: "12px 16px",
          maxWidth: 400, margin: "0 auto",
          minHeight: 48,
          fontSize: 16, lineHeight: 1.6,
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,.15)",
          cursor: "pointer",
        }}>
          {words ? words.map((w, i) => {
            const isShown = karaoke.activeKey ? karaoke.shown.has(i) : false;
            const isCurrent = isActive && karaoke.currentIdx === i;
            return (
              <span key={i} style={{
                display: "inline-block",
                opacity: isShown ? 1 : 0,
                transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
                color: isCurrent ? C.gold : (isKeyword(w.text) ? "#16a34a" : C.navyDeep),
                fontWeight: isCurrent ? 900 : 700,
                transition: "all .25s ease",
                margin: "0 2px",
              }}>{w.text} </span>
            );
          }) : <span style={{ opacity: 0.5 }}>...</span>}
        </div>
      </div>

      {/* Canvas + Guide */}
      <div style={{
        position: "relative", zIndex: 2,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
      }}>
        <div style={{
          position: "relative",
          width: 240,
          height: 320,
          background: "rgba(255,255,255,0.96)",
          border: `4px solid ${completed ? C.green : C.gold}`,
          borderRadius: 24,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}>
          <NumberGuide number={item.number} drawn={hasDrawn} />
          <ReactSketchCanvas
            ref={canvasRef}
            width="240px"
            height="320px"
            strokeWidth={14}
            strokeColor={C.gold}
            canvasColor="transparent"
            onStroke={handleStroke}
            style={{
              border: "none",
              position: "absolute",
              inset: 0,
              zIndex: 1,
            }}
          />
          {completed && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(31,164,99,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              zIndex: 2,
              animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>✓</div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "12px 16px 100px",
        display: "flex",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
      }}>
        <button
          onClick={handleClear}
          disabled={completed}
          style={{
            background: completed ? "#E5DCC2" : "white",
            color: C.navy,
            border: `3px solid ${C.navy}`,
            padding: "12px 20px",
            borderRadius: 16,
            fontSize: 15, fontWeight: 700,
            fontFamily: "Tajawal, sans-serif",
            cursor: completed ? "default" : "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,.1)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
          مَسْح ↻
        </button>
        <button
          onClick={handleNext}
          disabled={!hasDrawn || completed}
          style={{
            background: (!hasDrawn || completed) ? "#E5DCC2" : `linear-gradient(135deg, ${C.gold}, #FFB84D)`,
            color: (!hasDrawn || completed) ? "#888" : "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: 16,
            fontSize: 15, fontWeight: 800,
            fontFamily: "Tajawal, sans-serif",
            cursor: (!hasDrawn || completed) ? "default" : "pointer",
            boxShadow: (!hasDrawn || completed) ? "none" : "0 6px 16px rgba(232,160,32,.5)",
          }}>
          {itemIdx < items.length - 1 ? "التَّالِي ←" : "أَنْهَيْت ✓"}
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
