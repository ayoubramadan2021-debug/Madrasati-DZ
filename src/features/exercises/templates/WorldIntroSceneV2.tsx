import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════
type WordTiming = { text: string; offset: number; duration: number };

type AnswerOption = {
  id: string;
  text: string;
  correct: boolean;
};

type Slide = {
  scene_image: string;        // path to webp scene
  audio_key: string;          // e.g. "w1_intro_1"
  options?: AnswerOption[];   // only on question slide
  audio_correct?: string;
  audio_retry?: string;
  is_closing?: boolean;
  cta_text?: string;
};

export interface WorldIntroSceneV2Props {
  audio_base: string;         // "/audio/world_1_intro"
  slides: Slide[];
  onDone?: () => void;
}

// ═══════════════════════════════════════════════
// Brand colors
// ═══════════════════════════════════════════════
const C = {
  navy: "#1B3A6B",
  navyDeep: "#0F2447",
  gold: "#E8A020",
  goldSoft: "#F5C257",
  cream: "#FFF8EC",
  green: "#1FA463",
  greenSoft: "#5BCB8E",
  red: "#D45447",
  redSoft: "#F4C4BE",
};

// ═══════════════════════════════════════════════
// Karaoke hook
// ═══════════════════════════════════════════════
function useKaraoke(audioBase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [shown, setShown] = useState<Set<number>>(new Set());

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
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


// ═══════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════
export default function WorldIntroSceneV2({
  audio_base,
  slides,
  onDone,
}: WorldIntroSceneV2Props) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [timings, setTimings] = useState<Record<string, WordTiming[]>>({});
  const [answerState, setAnswerState] = useState<Record<string, "idle" | "correct" | "wrong">>({});
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const karaoke = useKaraoke(audio_base);
  const slide = slides[slideIdx];

  // Preload all timings
  useEffect(() => {
    const keys = new Set<string>();
    slides.forEach((s) => {
      keys.add(s.audio_key);
      if (s.audio_correct) keys.add(s.audio_correct);
      if (s.audio_retry) keys.add(s.audio_retry);
    });
    keys.forEach(async (k) => {
      const t = await loadTimings(audio_base, k);
      if (t) setTimings((p) => ({ ...p, [k]: t }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio_base]);

  // Reset on slide change + play
  useEffect(() => {
    setQuestionAnswered(false);
    setAnswerState({});
    karaoke.stop();
    if (!slide) return;
    const t = timings[slide.audio_key];
    if (!t) return;
    const timer = setTimeout(() => karaoke.play(slide.audio_key, t), 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIdx, timings]);

  const goNext = () => {
    karaoke.stop();
    if (slideIdx < slides.length - 1) setSlideIdx(slideIdx + 1);
    else onDone?.();
  };

  const goPrev = () => {
    karaoke.stop();
    if (slideIdx > 0) setSlideIdx(slideIdx - 1);
  };

  const replayCurrent = () => {
    if (slide && timings[slide.audio_key]) {
      karaoke.play(slide.audio_key, timings[slide.audio_key]);
    }
  };

  const handleAnswer = async (optId: string, _correct: boolean) => {
    if (!slide?.options) return;
    if (answerState[optId] === "correct") return; // already pressed

    const newState = { ...answerState, [optId]: "correct" as const };
    setAnswerState(newState);

    // play "ahsant" for each press
    if (slide.audio_correct && timings[slide.audio_correct]) {
      karaoke.play(slide.audio_correct, timings[slide.audio_correct]);
    }

    // check if all answered
    const correctCount = Object.values(newState).filter((v) => v === "correct").length;
    if (correctCount === slide.options.length) {
      setQuestionAnswered(true);
    }
  };

  if (!slide) return <div>Loading...</div>;

  const words = timings[slide.audio_key] || null;
  const isActive = karaoke.activeKey === slide.audio_key;

  return (
    <div style={{
      minHeight: "100dvh",
      position: "relative",
      fontFamily: "Tajawal, sans-serif",
      direction: "rtl",
      background: "#000",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Full scene image */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('${slide.scene_image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />

      {/* Bottom gradient overlay for text readability */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "55%",
        background: "linear-gradient(180deg, transparent 0%, rgba(255,248,236,0.85) 50%, rgba(247,219,160,0.98) 100%)",
        pointerEvents: "none",
      }} />

      {/* Top: replay + progress + close */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
      }}>
        <button onClick={replayCurrent} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: C.gold, color: "white",
          border: `3px solid ${C.cream}`,
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 12px rgba(232,160,32,.4)",
        }}>🔊</button>

        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === slideIdx ? 24 : 8, height: 8, borderRadius: 4,
              background: i < slideIdx ? C.green : i === slideIdx ? C.gold : "#E0CFA8",
              transition: "all .3s ease",
            }} />
          ))}
        </div>

        <div style={{ width: 44 }} />
      </div>

      {/* Spacer pushes content to bottom */}
      <div style={{ flex: 1 }} />

      {/* Karaoke text bubble */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "0 16px 8px",
      }}>
        <div onClick={replayCurrent} style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${C.gold}`,
          borderRadius: 18,
          padding: "14px 18px",
          maxWidth: 400,
          margin: "0 auto",
          minHeight: 60,
          fontSize: 17,
          lineHeight: 1.7,
          textAlign: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,.15)",
          cursor: "pointer",
        }}>
          {words ? (
            words.map((w, i) => {
              const isShown = !isActive || karaoke.shown.has(i);
              const isCurrent = isActive && karaoke.currentIdx === i;
              return (
                <span key={i} style={{
                  display: "inline-block",
                  opacity: isShown ? 1 : 0,
                  transform: isCurrent ? "translateY(-3px) scale(1.1)" : "translateY(0)",
                  color: isCurrent ? C.gold : C.navyDeep,
                  fontWeight: isCurrent ? 900 : 700,
                  transition: "all .25s ease",
                  margin: "0 2px",
                }}>{w.text} </span>
              );
            })
          ) : <span style={{ opacity: 0.5 }}>...</span>}
        </div>
      </div>

      {/* Question options */}
      {slide.options && (
        <div style={{
          position: "relative", zIndex: 2,
          padding: "8px 16px",
          display: "flex", flexDirection: "column", gap: 8,
          maxWidth: 480, margin: "0 auto", width: "100%",
        }}>
          {slide.options.map((opt) => {
            const state = answerState[opt.id] || "idle";
            const bg = state === "correct" ? C.greenSoft : state === "wrong" ? C.redSoft : "rgba(255,255,255,0.95)";
            const border = state === "correct" ? C.green : state === "wrong" ? C.red : C.gold;
            const icon = state === "correct" ? "✓" : state === "wrong" ? "✗" : "";
            return (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id, opt.correct)}
                disabled={state === "correct"}
                style={{
                  background: bg,
                  border: `3px solid ${border}`,
                  borderRadius: 16,
                  padding: "12px 16px",
                  fontSize: 15,
                  fontWeight: 700,
                  color: C.navyDeep,
                  fontFamily: "Tajawal, sans-serif",
                  cursor: "pointer",
                  textAlign: "right",
                  direction: "rtl",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  boxShadow: "0 4px 12px rgba(0,0,0,.1)",
                  transform: state === "correct" ? "scale(1.03)" : "scale(1)",
                  transition: "all .3s ease",
                  opacity: 1,
                }}
              >
                <span style={{ flex: 1 }}>{opt.text}</span>
                {icon && (
                  <span style={{
                    fontSize: 22, fontWeight: 900,
                    color: state === "correct" ? C.green : C.red,
                    minWidth: 28,
                  }}>{icon}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom nav */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px 100px",
      }}>
        <button onClick={goPrev} disabled={slideIdx === 0} style={{
          background: "rgba(255,255,255,0.95)",
          border: `2px solid ${C.gold}`,
          width: 52, height: 52, borderRadius: "50%",
          fontSize: 22, color: C.navy,
          cursor: slideIdx === 0 ? "not-allowed" : "pointer",
          opacity: slideIdx === 0 ? 0.35 : 1,
          boxShadow: "0 4px 12px rgba(0,0,0,.15)",
        }}>‹</button>

        <div style={{
          fontSize: 13, color: C.navy, fontWeight: 700,
          background: "rgba(255,255,255,0.9)",
          padding: "6px 14px", borderRadius: 999,
          border: `1px solid ${C.gold}`,
        }}>{slideIdx + 1} / {slides.length}</div>

        {slide.is_closing ? (
          <button onClick={() => onDone?.()} style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldSoft})`,
            color: C.navyDeep,
            border: "none",
            padding: "12px 24px",
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "Tajawal, sans-serif",
            boxShadow: "0 6px 18px rgba(232,160,32,.5)",
          }}>{slide.cta_text || "ابدأ ←"}</button>
        ) : slide.options && !questionAnswered ? (
          <div style={{ width: 52 }} />
        ) : (
          <button onClick={goNext} style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldSoft})`,
            color: C.navyDeep,
            border: "none",
            width: 52, height: 52, borderRadius: "50%",
            fontSize: 22, fontWeight: 900,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(232,160,32,.4)",
          }}>›</button>
        )}
      </div>
    </div>
  );
}
