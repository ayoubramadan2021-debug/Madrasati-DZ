import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TapSelectWordsV2 from "../features/lesson-v2/exercises-v2/TapSelectWordsV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import {
  LESSON_3_EXERCISE_1,
  LESSON_3_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise1";
import {
  LESSON_3_EXERCISE_2,
  LESSON_3_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise2";
import {
  LESSON_3_EXERCISE_3,
  LESSON_3_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise3";

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
};

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson3ExercisesPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectWordsV2
        items={LESSON_3_EXERCISE_1}
        audio_base={LESSON_3_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <DragMatchExerciseV2
        items={LESSON_3_EXERCISE_2}
        background_image="/lessons/v2/lesson3-senses/senses-organs.webp"
        audio_base={LESSON_3_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <TapSelectWordsV2
        items={LESSON_3_EXERCISE_3}
        audio_base={LESSON_3_EXERCISE_3_AUDIO_BASE}
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
      <div style={{ fontSize: 96, animation: "bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>🌟</div>
      <h1 style={{ fontSize: 30, color: C.navy, fontWeight: 900, margin: 0, textAlign: "center" }}>
        أَحْسَنْتَ يَا بَطَل!
      </h1>
      <p style={{ fontSize: 17, color: C.navy, margin: 0, textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>
        أَكْمَلْتَ تَمَارِينَ الحَوَاسِّ الخَمْس! 👂👁👃👅✋
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
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
