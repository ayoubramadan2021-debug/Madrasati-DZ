import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #FFF8EC 0%, #F5E3B0 100%)",
      fontFamily: "Tajawal, sans-serif",
      direction: "rtl",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      gap: 20,
    }}>
      <div style={{ fontSize: 96, animation: "bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        🏆
      </div>
      <h1 style={{
        fontSize: 30, color: C.navy, fontWeight: 900,
        margin: 0, textAlign: "center",
      }}>
        أَكْمَلْتَ كُلَّ التَّمَارِين!
      </h1>
      <p style={{
        fontSize: 17, color: C.navy,
        margin: 0, textAlign: "center",
        maxWidth: 320, lineHeight: 1.6,
      }}>
        أَحْسَنْتَ يَا بَطَل. أَنْتَ جَاهِزٌ لِاِخْتِبَارِ الْعَالَم!
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
        <button onClick={() => navigate("/lesson-v2/lesson2")} style={{
          background: "#1FA463", color: "#fff", border: "none",
          padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700,
          fontFamily: "Tajawal,sans-serif", cursor: "pointer",
        }}>الدَّرْسُ التَّالِي ←</button>
        <button onClick={() => navigate("/")} style={{
          background: C.navy, color: "white", border: "none",
          padding: "14px 24px", borderRadius: 16,
          fontSize: 16, fontWeight: 700,
          fontFamily: "Tajawal, sans-serif",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(27,58,107,0.3)",
        }}>الرَّئِيسِيَّة 🏠</button>
        <button onClick={() => setStage("ex1")} style={{
          background: C.gold, color: "white", border: "none",
          padding: "14px 24px", borderRadius: 16,
          fontSize: 16, fontWeight: 700,
          fontFamily: "Tajawal, sans-serif",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(232,160,32,0.4)",
        }}>إِعَادَة 🔁</button>
      </div>
      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          60% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
