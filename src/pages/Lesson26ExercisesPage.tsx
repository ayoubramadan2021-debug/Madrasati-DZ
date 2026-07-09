
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import HealthyFoodExerciseV2 from "../features/lesson-v2/exercises-v2/HealthyFoodExerciseV2";
import { LESSON_26_EXERCISE_1, LESSON_26_EXERCISE_AUDIO_BASE } from "../features/lesson-v2/content/lesson26_exercise1";
import { LESSON_26_EXERCISE_2 } from "../features/lesson-v2/content/lesson26_exercise2";
import { LESSON_26_EXERCISE_3 } from "../features/lesson-v2/content/lesson26_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson26ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <HealthyFoodExerciseV2
        key="lesson26-ex1"
        items={LESSON_26_EXERCISE_1}
        audio_base={LESSON_26_EXERCISE_AUDIO_BASE}
        missionTitle="أَخْتَارُ العَادَةَ الصِّحِّيَّةَ"
        missionIcon="🩺"
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <HealthyFoodExerciseV2
        key="lesson26-ex2"
        items={LESSON_26_EXERCISE_2}
        audio_base={LESSON_26_EXERCISE_AUDIO_BASE}
        missionTitle="صِحِّيٌّ أَمْ غَيْرُ صِحِّيٍّ؟"
        missionIcon="✅"
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <HealthyFoodExerciseV2
        key="lesson26-ex3"
        items={LESSON_26_EXERCISE_3}
        audio_base={LESSON_26_EXERCISE_AUDIO_BASE}
        missionTitle="أَخْتَارُ كُلَّ الصَّحِيحِ"
        missionIcon="🌟"
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson26"
      nextLessonKey="lesson27"
      onReplay={() => setStage("ex1")}
    />
  );
}
