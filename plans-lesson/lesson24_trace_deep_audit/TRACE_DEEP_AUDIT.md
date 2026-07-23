# قراءة عميقة لمحرك TraceExerciseV2

import { useState, useEffect, useRef, useCallback } from "react";
import { isKeyword } from "../keywords";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

// ═══════════════════════════════════════════════════════════════
// TraceExerciseV2 — اكتب الرقم بإصبعك
// يستخدم react-sketch-canvas + SVG inline للرقم المنقّط
// المستوى (أ): نقبل أي رسم كإتمام (لا قياس دقة الآن)
// ═══════════════════════════════════════════════════════════════

export type TraceItem = {
  number: number;            // 0-10
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
  0: "M 50 20 Q 25 20 25 70 Q 25 120 50 120 Q 75 120 75 70 Q 75 20 50 20 Z",
  1: "M 35 30 L 55 20 L 55 120",
  2: "M 25 45 Q 25 20 50 20 Q 75 20 75 45 Q 75 65 55 80 L 25 120 L 80 120",
  3: "M 25 35 Q 25 20 50 20 Q 75 20 75 45 Q 75 65 55 65 Q 75 65 75 95 Q 75 120 50 120 Q 25 120 25 100",
  4: "M 65 20 L 25 80 L 80 80 M 65 50 L 65 120",
  5: "M 75 20 L 30 20 L 25 65 Q 50 55 70 70 Q 80 85 75 100 Q 70 120 45 120 Q 25 120 22 100",
  6: "M 70 25 Q 45 25 35 55 Q 25 80 30 100 Q 35 120 55 120 Q 78 120 78 95 Q 78 72 55 72 Q 38 72 32 90",
  7: "M 25 25 L 78 25 L 50 120",
  8: "M 50 20 Q 28 20 28 42 Q 28 62 50 65 Q 72 68 72 95 Q 72 120 50 120 Q 28 120 28 95 Q 28 68 50 65 Q 72 62 72 42 Q 72 20 50 20",
  9: "M 70 60 Q 70 25 48 25 Q 28 25 28 48 Q 28 70 50 70 Q 68 70 70 55 L 65 120",
  10: "M 18 30 L 32 20 L 32 120 M 68 20 Q 48 20 48 70 Q 48 120 68 120 Q 88 120 88 70 Q 88 20 68 20 Z",
};

function NumberGuide({ number, drawn }: { number: number; drawn: boolean }) {
  const path = DIGIT_PATHS[number];
  return (
    <svg
      viewBox="0 0 100 140"
      style={{
        position: "absolute",
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
        cx={number === 0 ? 50 : number === 4 ? 65 : number === 1 ? 35 : number === 7 ? 25 : number === 9 ? 70 : number === 6 ? 70 : number === 8 ? 50 : 25}
        cy={number === 0 ? 20 : number === 4 ? 20 : number === 1 ? 30 : number === 7 ? 25 : number === 9 ? 60 : number === 6 ? 25 : number === 8 ? 20 : 35}
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

  const progressEmoji = "✏️";
  const missionText = `مهمة الكتابة ${itemIdx + 1}`;

  const coachText =
    completed
      ? "رائع يا بطل! كتبت الرقم بنجاح 🎉"
      : hasDrawn
        ? "جميل! اضغط التالي عندما تنتهي 👏"
        : "ابدأ من النقطة الذهبية واتبع الخط ✨";

  return (
    <div style={{
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
        <div
          aria-label="تقدم التمرين"
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.55)",
            border: "2px solid rgba(232,160,32,.35)",
            borderRadius: 999,
            padding: "6px 10px",
            boxShadow: "0 6px 14px rgba(0,0,0,.08)",
          }}
        >
          {items.map((_, i) => {
            const done = i < itemIdx;
            const current = i === itemIdx;
            return (
              <span
                key={i}
                style={{
                  width: current ? 28 : 22,
                  height: current ? 28 : 22,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: current ? 22 : 18,
                  opacity: done || current ? 1 : 0.35,
                  filter: done || current ? "none" : "grayscale(1)",
                  transform: current ? "translateY(-2px) scale(1.08)" : "scale(1)",
                  transition: "all .25s ease",
                }}
              >
                {progressEmoji}
              </span>
            );
          })}
        </div>
        <div style={{
          background: C.navy, color: C.cream,
          padding: "6px 12px", borderRadius: 999,
          fontSize: 13, fontWeight: 700,
        }}><span dir="ltr">{itemIdx + 1} / {items.length}</span></div>
      </div>

      {/* Question */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.88)",
            color: C.navyDeep,
            border: `2px solid ${C.gold}`,
            borderRadius: 999,
            padding: "8px 16px",
            fontSize: 16,
            fontWeight: 900,
            boxShadow: "0 6px 16px rgba(0,0,0,.12)",
          }}
        >
          {progressEmoji} {missionText}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "4px 16px 12px" }}>
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
            const isShown = karaoke.activeKey ? karaoke.shown.has(i) : true;
            const isCurrent = isActive && karaoke.currentIdx === i;
            return (
              <span key={i} style={{
                display: "inline-block",
                opacity: (isShown || hasDrawn || completed) ? 1 : 0,
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
          opacity: 0,
          animation: "traceBoxEnter .45s ease forwards",
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
src/pages/LessonExercisesPage.tsx:7:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/LessonExercisesPage.tsx:79:      <TraceExerciseV2
src/pages/Lesson6ExercisesPage.tsx:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson6ExercisesPage.tsx:20:  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_6_EXERCISE_4} audio_base={LESSON_6_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson12ExercisesPage.tsx:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson12ExercisesPage.tsx:68:      <TraceExerciseV2
src/pages/Lesson13ExercisesPage.tsx:7:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson13ExercisesPage.tsx:66:      <TraceExerciseV2
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341:20:  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_12_EXERCISE_4} audio_base={LESSON_12_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:6:import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418:65:      <TraceExerciseV2
src/features/lesson-v2/content/lesson1_exercise5.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson6_exercise4.ts:1:// الدرس 6 - التمرين 4: كتابة الأرقام 6-9 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson6_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson12_exercise4.ts:1:// الدرس 12 - التمرين 4: كتابة الرقم 0 بالتتبّع (TraceExerciseV2)
src/features/lesson-v2/content/lesson12_exercise4.ts:2:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson14_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
src/features/lesson-v2/content/lesson13_exercise4.ts:1:import type { TraceItem } from "../exercises-v2/TraceExerciseV2";
================ src/pages/LessonExercisesPage.tsx ================
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import TapSelectExerciseV2 from "../features/lesson-v2/exercises-v2/TapSelectExerciseV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import SortSequenceExerciseV2 from "../features/lesson-v2/exercises-v2/SortSequenceExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
import {
  LESSON_1_EXERCISE_1,
  LESSON_1_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise1";
import {
  LESSON_1_EXERCISE_2,
  LESSON_1_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise2";
import {
  LESSON_1_EXERCISE_3,
  LESSON_1_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise3";
import {
  LESSON_1_EXERCISE_4,
  LESSON_1_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise4";
import {
  LESSON_1_EXERCISE_5,
  LESSON_1_EXERCISE_5_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise5";

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
};

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "ex5" | "done";

export default function LessonExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectExerciseV2
        items={LESSON_1_EXERCISE_1}
        audio_base={LESSON_1_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }
  if (stage === "ex2") {
    return (
      <CountTapExerciseV2
        items={LESSON_1_EXERCISE_2}
        audio_base={LESSON_1_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }
  if (stage === "ex3") {
    return (
      <DragMatchExerciseV2
        items={LESSON_1_EXERCISE_3}
        audio_base={LESSON_1_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );
  }
  if (stage === "ex4") {
    return (
      <SortSequenceExerciseV2
        items={LESSON_1_EXERCISE_4}
        audio_base={LESSON_1_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("ex5")}
      />
    );
  }
  if (stage === "ex5") {
    return (
      <TraceExerciseV2
        items={LESSON_1_EXERCISE_5}
        audio_base={LESSON_1_EXERCISE_5_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2

      lessonKey="lesson1"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson2"
    />
  );
}
================ src/pages/Lesson6ExercisesPage.tsx ================
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
import { LESSON_6_EXERCISE_1, LESSON_6_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson6_exercise1";
import { LESSON_6_EXERCISE_2, LESSON_6_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson6_exercise2";
import { LESSON_6_EXERCISE_3, LESSON_6_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson6_exercise3";
import { LESSON_6_EXERCISE_4, LESSON_6_EXERCISE_4_AUDIO_BASE } from "../features/lesson-v2/content/lesson6_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson6ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <CountSelectV2 key="ex1" items={LESSON_6_EXERCISE_1} audio_base={LESSON_6_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <CountTapExerciseV2 key="ex2" items={LESSON_6_EXERCISE_2} audio_base={LESSON_6_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_6_EXERCISE_3} audio_base={LESSON_6_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_6_EXERCISE_4} audio_base={LESSON_6_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2

      lessonKey="lesson6"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson7"
    />
  );
}
================ src/pages/Lesson12ExercisesPage.tsx ================
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import BoxCountSelectV2 from "../features/lesson-v2/exercises-v2/BoxCountSelectV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";

import {
  LESSON_12_EXERCISE_1,
  LESSON_12_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise1";

import {
  LESSON_12_EXERCISE_2,
  LESSON_12_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise2";

import {
  LESSON_12_EXERCISE_3,
  LESSON_12_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise3";

import {
  LESSON_12_EXERCISE_4,
  LESSON_12_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson12ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <BoxCountSelectV2
        key="lesson12-box-ex1-force"
        items={LESSON_12_EXERCISE_1}
        audio_base={LESSON_12_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <TapSelectImagesV2
        key="ex2"
        items={LESSON_12_EXERCISE_2}
        audio_base={LESSON_12_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <DragMatchExerciseV2
        key="ex3"
        items={LESSON_12_EXERCISE_3}
        audio_base={LESSON_12_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <TraceExerciseV2
        key="ex4"
        items={LESSON_12_EXERCISE_4}
        audio_base={LESSON_12_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson12"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson13"
    />
  );
}
================ src/pages/Lesson13ExercisesPage.tsx ================
import { useState } from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";

import {
  LESSON_13_EXERCISE_1,
  LESSON_13_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise1";

import {
  LESSON_13_EXERCISE_2,
  LESSON_13_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise2";

import {
  LESSON_13_EXERCISE_3,
  LESSON_13_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise3";

import {
  LESSON_13_EXERCISE_4,
  LESSON_13_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson13ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <CountSelectV2
        key="ex1"
        items={LESSON_13_EXERCISE_1}
        audio_base={LESSON_13_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <TapSelectImagesV2
        key="ex2"
        items={LESSON_13_EXERCISE_2}
        audio_base={LESSON_13_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <DragMatchExerciseV2
        key="ex3"
        items={LESSON_13_EXERCISE_3}
        audio_base={LESSON_13_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <TraceExerciseV2
        key="ex4"
        items={LESSON_13_EXERCISE_4}
        audio_base={LESSON_13_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2

      lessonKey="lesson13"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson14"
    />
  );
}
================ src/pages/Lesson12ExercisesPage.tsx.bak_boxzero_094341 ================
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
import { LESSON_12_EXERCISE_1, LESSON_12_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson12_exercise1";
import { LESSON_12_EXERCISE_2, LESSON_12_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson12_exercise2";
import { LESSON_12_EXERCISE_3, LESSON_12_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson12_exercise3";
import { LESSON_12_EXERCISE_4, LESSON_12_EXERCISE_4_AUDIO_BASE } from "../features/lesson-v2/content/lesson12_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson12ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <CountSelectV2 key="ex1" items={LESSON_12_EXERCISE_1} audio_base={LESSON_12_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <TapSelectImagesV2 key="ex2" items={LESSON_12_EXERCISE_2} audio_base={LESSON_12_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_12_EXERCISE_3} audio_base={LESSON_12_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("ex4")} />;
  if (stage === "ex4") return <TraceExerciseV2 key="ex4" items={LESSON_12_EXERCISE_4} audio_base={LESSON_12_EXERCISE_4_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2

      lessonKey="lesson12"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson13"
    />
  );
}
================ src/pages/Lesson12ExercisesPage.tsx.bak_force_cartoon2_page_101418 ================
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import BoxCountSelectV2 from "../features/lesson-v2/exercises-v2/BoxCountSelectV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";

import {
  LESSON_12_EXERCISE_1,
  LESSON_12_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise1";

import {
  LESSON_12_EXERCISE_2,
  LESSON_12_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise2";

import {
  LESSON_12_EXERCISE_3,
  LESSON_12_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise3";

import {
  LESSON_12_EXERCISE_4,
  LESSON_12_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson12_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson12ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <BoxCountSelectV2
        key="ex1"
        items={LESSON_12_EXERCISE_1}
        audio_base={LESSON_12_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <TapSelectImagesV2
        key="ex2"
        items={LESSON_12_EXERCISE_2}
        audio_base={LESSON_12_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <DragMatchExerciseV2
        key="ex3"
        items={LESSON_12_EXERCISE_3}
        audio_base={LESSON_12_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <TraceExerciseV2
        key="ex4"
        items={LESSON_12_EXERCISE_4}
        audio_base={LESSON_12_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      lessonKey="lesson12"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson13"
    />
  );
}
================ src/features/lesson-v2/content/lesson1_exercise5.ts ================
import type { TraceItem } from "../exercises-v2/TraceExerciseV2";

export const LESSON_1_EXERCISE_5: TraceItem[] = [
  {
    number: 1,
    question: "اُكْتُبِ الرَّقَمَ وَاحِد، تَتَبَّعِ الْخَطَّ الْمُنَقَّط",
    question_audio_key: "ex5_q1",
  },
  {
    number: 2,
    question: "اُكْتُبِ الرَّقَمَ اِثْنَان",
    question_audio_key: "ex5_q2",
  },
  {
    number: 3,
    question: "اُكْتُبِ الرَّقَمَ ثَلَاثَة",
    question_audio_key: "ex5_q3",
  },
  {
    number: 4,
    question: "اُكْتُبِ الرَّقَمَ أَرْبَعَة",
    question_audio_key: "ex5_q4",
  },
  {
    number: 5,
    question: "اُكْتُبِ الرَّقَمَ خَمْسَة. هَذَا آخِرُ تَمْرِين",
    question_audio_key: "ex5_q5",
  },
];

export const LESSON_1_EXERCISE_5_AUDIO_BASE = "/audio/lesson_1_exercises";
================ src/features/lesson-v2/content/lesson6_exercise4.ts ================
// الدرس 6 - التمرين 4: كتابة الأرقام 6-9 بالتتبّع (TraceExerciseV2)
import type { TraceItem } from "../exercises-v2/TraceExerciseV2";

export const LESSON_6_EXERCISE_4: TraceItem[] = [
  { number: 6, question: "أُكْتُبِ الرَّقَمَ سِتَّة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q1" },
  { number: 7, question: "أُكْتُبِ الرَّقَمَ سَبْعَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q2" },
  { number: 8, question: "أُكْتُبِ الرَّقَمَ ثَمَانِيَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q3" },
  { number: 9, question: "أُكْتُبِ الرَّقَمَ تِسْعَة، تَتَبَّعِ الخَطَّ المُنَقَّط", question_audio_key: "l6_ex4_q4" },
];

export const LESSON_6_EXERCISE_4_AUDIO_BASE = "/audio/lesson_6_exercises";
================ src/features/lesson-v2/content/lesson12_exercise4.ts ================
// الدرس 12 - التمرين 4: كتابة الرقم 0 بالتتبّع (TraceExerciseV2)
import type { TraceItem } from "../exercises-v2/TraceExerciseV2";

export const LESSON_12_EXERCISE_4: TraceItem[] = [
  { number: 0, question: "تَتَبَّعِ الخَطَّ المُنَقَّطَ وَاُكْتُبِ الصِّفْر", question_audio_key: "l12_ex4_q1" },
  { number: 0, question: "أَحْسَنْتَ! هَيَّا نُكَرِّرُ مَرَّةً أُخْرى", question_audio_key: "l12_ex4_q2" },
  { number: 0, question: "اُكْتُبِ الصِّفْر", question_audio_key: "l12_ex4_q3" },
];

export const LESSON_12_EXERCISE_4_AUDIO_BASE = "/audio/lesson_12_exercises";
================ src/features/lesson-v2/content/lesson14_exercise4.ts ================
import type { TraceItem } from "../exercises-v2/TraceExerciseV2";

export const LESSON_14_EXERCISE_4: TraceItem[] = [
  { number: 6, question: "اُكْتُبِ الرَّقْمَ سِتَّةً.", question_audio_key: "l14_ex4_q1" },
  { number: 7, question: "اُكْتُبِ الرَّقْمَ سَبْعَةً.", question_audio_key: "l14_ex4_q2" },
];

export const LESSON_14_EXERCISE_4_AUDIO_BASE = "/audio/lesson_14_exercises";
================ src/features/lesson-v2/content/lesson13_exercise4.ts ================
import type { TraceItem } from "../exercises-v2/TraceExerciseV2";

export const LESSON_13_EXERCISE_4: TraceItem[] = [
  { number: 1, question: "اُكْتُبِ الرَّقْمَ وَاحِدًا.", question_audio_key: "l13_ex4_q1" },
  { number: 2, question: "اُكْتُبِ الرَّقْمَ اِثْنَيْنِ.", question_audio_key: "l13_ex4_q2" },
  { number: 3, question: "اُكْتُبِ الرَّقْمَ ثَلَاثَةً.", question_audio_key: "l13_ex4_q3" },
  { number: 4, question: "اُكْتُبِ الرَّقْمَ أَرْبَعَةً.", question_audio_key: "l13_ex4_q4" },
  { number: 5, question: "اُكْتُبِ الرَّقْمَ خَمْسَةً.", question_audio_key: "l13_ex4_q5" },
  { number: 6, question: "اُكْتُبِ الرَّقْمَ سِتَّةً.", question_audio_key: "l13_ex4_q6" },
  { number: 7, question: "اُكْتُبِ الرَّقْمَ سَبْعَةً.", question_audio_key: "l13_ex4_q7" },
  { number: 8, question: "اُكْتُبِ الرَّقْمَ ثَمَانِيَةً.", question_audio_key: "l13_ex4_q8" },
  { number: 9, question: "اُكْتُبِ الرَّقْمَ تِسْعَةً.", question_audio_key: "l13_ex4_q9" },
  { number: 10, question: "اُكْتُبِ الرَّقْمَ عَشَرَةً.", question_audio_key: "l13_ex4_q10" },
];

export const LESSON_13_EXERCISE_4_AUDIO_BASE = "/audio/lesson_13_exercises";
96:const FEEDBACK_CORRECT = "/audio/v2_feedback/correct.mp3";
204:    const a = new Audio(FEEDBACK_CORRECT);

## القرار المبدئي

- نستعمل TraceExerciseV2 كأساس لتمرين الدرس 24 الثالث.
- لا نستعمله مباشرة إلا إذا كان يقبل مسارات SVG حرة، لا أرقام فقط.
- إذا كان خاصًا بالأرقام فقط، ننشئ PathTraceExerciseV2 مستنسخًا منه:
  - react-sketch-canvas
  - useKaraoke/loadTimings
  - الصوت
  - شارات الصحيح والخطأ
  - نفس أسلوب الصفحة

## السيناريو النهائي المقترح للدرس 24
1. تمرين اختيار: مستقيم أو منحني فقط.
2. تمرين البداية والنهاية: لمس نقطة البداية أو النهاية.
3. تمرين الرسم: تتبع المسار بالإصبع فوق خط منقّط.
