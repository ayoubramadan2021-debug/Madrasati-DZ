import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import {
  LESSON_15_EXERCISE_1,
  LESSON_15_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson15_exercise1";

import {
  LESSON_15_EXERCISE_2,
  LESSON_15_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson15_exercise2";

import {
  LESSON_15_EXERCISE_3,
  LESSON_15_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson15_exercise3";

import {
  LESSON_15_EXERCISE_4,
  LESSON_15_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson15_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson15ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <RankOrderExerciseV2
        key="ex1"
        items={LESSON_15_EXERCISE_1}
        audio_base={LESSON_15_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <RankOrderExerciseV2
        key="ex2"
        items={LESSON_15_EXERCISE_2}
        audio_base={LESSON_15_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <RankOrderExerciseV2
        key="ex3"
        items={LESSON_15_EXERCISE_3}
        audio_base={LESSON_15_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <RankOrderExerciseV2
        key="ex4"
        items={LESSON_15_EXERCISE_4}
        audio_base={LESSON_15_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      nextLessonKey="lesson16"
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ الرُّتْبَةَ بِالعَدِّ مِنَ الأَوَّلِ إِلَى الأَخِيرِ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
