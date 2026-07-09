import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
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
    <LessonCompleteV2
      lessonKey="lesson24"
      nextLessonKey="lesson25"
      onReplay={() => setStage("ex1")}
    />
  );
}