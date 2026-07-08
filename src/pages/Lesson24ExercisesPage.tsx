import { useState } from "react";
import PathJourneyExerciseV2 from "../features/lesson-v2/exercises-v2/PathJourneyExerciseV2";
import PathTraceExerciseV2 from "../features/lesson-v2/exercises-v2/PathTraceExerciseV2";
import {
  LESSON_24_EXERCISE_1,
  LESSON_24_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson24_exercise1";
import {
  LESSON_24_EXERCISE_3,
  LESSON_24_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson24_exercise3";

type Stage = "ex1" | "ex2" | "done";

export default function Lesson24ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <PathJourneyExerciseV2
        key="lesson24-type-clean"
        items={LESSON_24_EXERCISE_1}
        audio_base={LESSON_24_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <PathTraceExerciseV2
        key="lesson24-trace-clean"
        items={LESSON_24_EXERCISE_3}
        audio_base={LESSON_24_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 22,
        paddingBottom: 90,
        background: "linear-gradient(180deg,#fff7d6,#ffe7a3)",
        fontFamily: "Tajawal, sans-serif",
        textAlign: "center",
        color: "#1B3A6B",
      }}
    >
      <section
        style={{
          width: "min(92vw, 430px)",
          borderRadius: 28,
          border: "6px solid #E8A020",
          background: "#FFF8EC",
          padding: 24,
          boxShadow: "0 16px 34px rgba(0,0,0,.18)",
        }}
      >
        <div style={{ fontSize: 58, marginBottom: 8 }}>🏁</div>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 1000 }}>أَحْسَنْتَ</h1>
        <p style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.6 }}>
          أَكْمَلْتَ تَمَارِينَ المَسَارِ بِمَهَارَةٍ
        </p>
      </section>
    </main>
  );
}
