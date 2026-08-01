import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import ConservationV2 from "../features/lesson-v2/exercises-v2/ConservationV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import { LESSON_10_EXERCISE_1, LESSON_10_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson10_exercise1";
import { LESSON_10_EXERCISE_2, LESSON_10_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson10_exercise2";
import { LESSON_10_EXERCISE_3, LESSON_10_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson10_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson10ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <ConservationV2 key="ex1" items={LESSON_10_EXERCISE_1} audio_base={LESSON_10_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <CountSelectV2 key="ex2" items={LESSON_10_EXERCISE_2} audio_base={LESSON_10_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_10_EXERCISE_3} audio_base={LESSON_10_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2
      
      lessonKey="lesson10"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson11"
    />
  );
}
