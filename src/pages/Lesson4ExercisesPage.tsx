import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompareExerciseV2 from "../features/lesson-v2/exercises-v2/CompareExerciseV2";
import { LESSON_4_EXERCISE_1, LESSON_4_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise1";
import { LESSON_4_EXERCISE_2, LESSON_4_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise2";
import { LESSON_4_EXERCISE_3, LESSON_4_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise3";

const C = { navy: "#1B3A6B", gold: "#E8A020" };
type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson4ExercisesPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <CompareExerciseV2 key="ex1" items={LESSON_4_EXERCISE_1} audio_base={LESSON_4_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <CompareExerciseV2 key="ex2" items={LESSON_4_EXERCISE_2} audio_base={LESSON_4_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <CompareExerciseV2 key="ex3" items={LESSON_4_EXERCISE_3} audio_base={LESSON_4_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <div style={{
      minHeight: "100dvh", background: "linear-gradient(180deg,#FFF8EC 0%,#F5E3B0 100%)",
      fontFamily: "Tajawal,sans-serif", direction: "rtl", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", gap: 20,
    }}>
      <div style={{ fontSize: 96 }}>🌟</div>
      <h1 style={{ fontSize: 30, color: C.navy, fontWeight: 900, margin: 0, textAlign: "center" }}>أَحْسَنْتَ يَا بَطَل!</h1>
      <p style={{ fontSize: 17, color: C.navy, margin: 0, textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>
        أَتْقَنْتَ المُقَارَنَة: أَكْثَر، أَقَلّ، بِقَدْر! 🍎🍊
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
        <button onClick={() => navigate("/lesson-v2/lesson5")} style={{ background: "#1FA463", color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>الدَّرْسُ التَّالِي ←</button>
        <button onClick={() => navigate("/")} style={{ background: C.navy, color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>الرَّئِيسِيَّة 🏠</button>
        <button onClick={() => setStage("ex1")} style={{ background: C.gold, color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>إِعَادَة 🔁</button>
      </div>
    </div>
  );
}
