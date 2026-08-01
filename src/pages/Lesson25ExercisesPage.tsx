import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import AddSubStoryLabV2 from "../features/lesson-v2/exercises-v2/AddSubStoryLabV2";
import { LESSON_25_EXERCISE_1, LESSON_25_EXERCISE_AUDIO_BASE } from "../features/lesson-v2/content/lesson25_exercise1";
import { LESSON_25_EXERCISE_2 } from "../features/lesson-v2/content/lesson25_exercise2";
import { LESSON_25_EXERCISE_3 } from "../features/lesson-v2/content/lesson25_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson25ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <AddSubStoryLabV2
        key="lesson25-ex1"
        items={LESSON_25_EXERCISE_1}
        audio_base={LESSON_25_EXERCISE_AUDIO_BASE}
        missionTitle="أُضيف أم آخذ؟"
        missionIcon="🧠"
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <AddSubStoryLabV2
        key="lesson25-ex2"
        items={LESSON_25_EXERCISE_2}
        audio_base={LESSON_25_EXERCISE_AUDIO_BASE}
        missionTitle="أختار العملية"
        missionIcon="➕"
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <AddSubStoryLabV2
        key="lesson25-ex3"
        items={LESSON_25_EXERCISE_3}
        audio_base={LESSON_25_EXERCISE_AUDIO_BASE}
        missionTitle="أحسب النتيجة"
        missionIcon="🏆"
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson25"
      nextLessonKey="lesson26"
      onReplay={() => setStage("ex1")}
    />
  );
}
