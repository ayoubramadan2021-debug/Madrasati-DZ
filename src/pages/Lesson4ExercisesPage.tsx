import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CompareExerciseV2 from "../features/lesson-v2/exercises-v2/CompareExerciseV2";
import { LESSON_4_EXERCISE_1, LESSON_4_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise1";
import { LESSON_4_EXERCISE_2, LESSON_4_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise2";
import { LESSON_4_EXERCISE_3, LESSON_4_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson4_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson4ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <CompareExerciseV2 key="ex1" items={LESSON_4_EXERCISE_1} audio_base={LESSON_4_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <CompareExerciseV2 key="ex2" items={LESSON_4_EXERCISE_2} audio_base={LESSON_4_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <CompareExerciseV2 key="ex3" items={LESSON_4_EXERCISE_3} audio_base={LESSON_4_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2
      message="أَتْقَنْتَ المُقَارَنَة: أَكْثَر، أَقَلّ، بِقَدْر! 🍎🍊"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson5"
    />
  );
}
