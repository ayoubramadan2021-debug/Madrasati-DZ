import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import { LESSON_8_EXERCISE_1, LESSON_8_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson8_exercise1";
import { LESSON_8_EXERCISE_2, LESSON_8_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson8_exercise2";
import { LESSON_8_EXERCISE_3, LESSON_8_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson8_exercise3";

const C = { navy: "#1B3A6B", gold: "#E8A020" };
type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson8ExercisesPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <CountSelectV2 key="ex1" items={LESSON_8_EXERCISE_1} audio_base={LESSON_8_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <CountTapExerciseV2 key="ex2" items={LESSON_8_EXERCISE_2} audio_base={LESSON_8_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_8_EXERCISE_3} audio_base={LESSON_8_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <div style={{
      minHeight: "100dvh", background: "linear-gradient(180deg,#F3ECFB 0%,#E9DDF7 100%)",
      fontFamily: "Tajawal,sans-serif", direction: "rtl", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", gap: 20,
    }}>
      <div style={{ fontSize: 96 }}>🐠</div>
      <h1 style={{ fontSize: 30, color: C.navy, fontWeight: 900, margin: 0, textAlign: "center" }}>أَحْسَنْتَ يَا بَطَل!</h1>
      <p style={{ fontSize: 17, color: C.navy, margin: 0, textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>
        عَدَدْتَ وَعَيَّنْتَ وَرَبَطْتَ الأَعْدَادَ مِنْ وَاحِدٍ إِلَى تِسْعَةٍ! 🐠🐚🦀
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 12 }}>
        <button onClick={() => navigate("/world/b0a43712-8b45-428d-bea2-55ff3de52d3a/quiz")} style={{ background: "#7C3AED", color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>اِخْتِبَارُ العَالَم 🎯</button>
        <button onClick={() => navigate("/")} style={{ background: C.navy, color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>الرَّئِيسِيَّة 🏠</button>
        <button onClick={() => setStage("ex1")} style={{ background: C.gold, color: "#fff", border: "none", padding: "14px 24px", borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "Tajawal,sans-serif", cursor: "pointer" }}>إِعَادَة 🔁</button>
      </div>
    </div>
  );
}
