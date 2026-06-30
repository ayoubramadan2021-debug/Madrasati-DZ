import { useState } from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";

import {
  LESSON_13_EXERCISE_1,
  LESSON_13_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise1";

import {
  LESSON_13_EXERCISE_2,
  LESSON_13_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise2";

import {
  LESSON_13_EXERCISE_3,
  LESSON_13_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise3";

import {
  LESSON_13_EXERCISE_4,
  LESSON_13_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson13_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson13ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <CountSelectV2
        key="ex1"
        items={LESSON_13_EXERCISE_1}
        audio_base={LESSON_13_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <TapSelectImagesV2
        key="ex2"
        items={LESSON_13_EXERCISE_2}
        audio_base={LESSON_13_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <DragMatchExerciseV2
        key="ex3"
        items={LESSON_13_EXERCISE_3}
        audio_base={LESSON_13_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <TraceExerciseV2
        key="ex4"
        items={LESSON_13_EXERCISE_4}
        audio_base={LESSON_13_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تُجِيدُ عَدَّ الأَشْيَاءِ مِنْ ١ إِلَى ١٠. 🎉"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson14"
    />
  );
}
