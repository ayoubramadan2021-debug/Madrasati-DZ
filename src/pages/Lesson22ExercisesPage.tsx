import { useState } from "react";
import HealthyFoodExerciseV2, { HealthyFoodComplete } from "../features/lesson-v2/exercises-v2/HealthyFoodExerciseV2";

import {
  LESSON_22_EXERCISE_1,
  LESSON_22_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson22_exercise1";

import {
  LESSON_22_EXERCISE_2,
  LESSON_22_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson22_exercise2";

import {
  LESSON_22_EXERCISE_3,
  LESSON_22_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson22_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson22ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <HealthyFoodExerciseV2
        key="ex1"
        items={LESSON_22_EXERCISE_1}
        audio_base={LESSON_22_EXERCISE_1_AUDIO_BASE}
        missionTitle="الغذاء المفيد"
        missionIcon="🍎"
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <HealthyFoodExerciseV2
        key="ex2"
        items={LESSON_22_EXERCISE_2}
        audio_base={LESSON_22_EXERCISE_2_AUDIO_BASE}
        missionTitle="أقلل السكر"
        missionIcon="🦷"
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <HealthyFoodExerciseV2
        key="ex3"
        items={LESSON_22_EXERCISE_3}
        audio_base={LESSON_22_EXERCISE_3_AUDIO_BASE}
        missionTitle="طبقي المتنوع"
        missionIcon="🍽️"
        onComplete={() => setStage("done")}
      />
    );
  }

  return <HealthyFoodComplete lessonKey="lesson22" onReplay={() => setStage("ex1")} />;
}
