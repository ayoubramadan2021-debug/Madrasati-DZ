import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import TapSelectWordsV2 from "../features/lesson-v2/exercises-v2/TapSelectWordsV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import { LESSON_11_EXERCISE_1, LESSON_11_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson11_exercise1";
import { LESSON_11_EXERCISE_2, LESSON_11_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson11_exercise2";
import { LESSON_11_EXERCISE_3, LESSON_11_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson11_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson11ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") return <TapSelectWordsV2 key="ex1" items={LESSON_11_EXERCISE_1} audio_base={LESSON_11_EXERCISE_1_AUDIO_BASE} onComplete={() => setStage("ex2")} />;
  if (stage === "ex2") return <TapSelectImagesV2 key="ex2" items={LESSON_11_EXERCISE_2} audio_base={LESSON_11_EXERCISE_2_AUDIO_BASE} onComplete={() => setStage("ex3")} />;
  if (stage === "ex3") return <DragMatchExerciseV2 key="ex3" items={LESSON_11_EXERCISE_3} audio_base={LESSON_11_EXERCISE_3_AUDIO_BASE} onComplete={() => setStage("done")} />;

  return (
    <LessonCompleteV2

      lessonKey="lesson11"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson12"
    />
  );
}
