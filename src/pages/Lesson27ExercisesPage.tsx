import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";
import AddSubStoryLabV2 from "../features/lesson-v2/exercises-v2/AddSubStoryLabV2";
import EquationBuilderV2 from "../features/lesson-v2/exercises-v2/EquationBuilderV2";
import {
  LESSON_27_EXERCISE_1,
  LESSON_27_EXERCISE_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson27_exercise1";
import { LESSON_27_EXERCISE_2 } from "../features/lesson-v2/content/lesson27_exercise2";
import { LESSON_27_EXERCISE_3 } from "../features/lesson-v2/content/lesson27_exercise3";
import { LESSON_27_EXERCISE_4 } from "../features/lesson-v2/content/lesson27_exercise4";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

export default function Lesson27ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  let content;

  if (stage === "ex1") {
    content = (
      <EquationBuilderV2
        key="lesson27-ex1"
        items={LESSON_27_EXERCISE_1}
        audio_base={LESSON_27_EXERCISE_AUDIO_BASE}
        missionTitle="مهمة الاختبار 1"
        missionIcon="⭐"
        onComplete={() => setStage("ex2")}
      />
    );
  } else if (stage === "ex2") {
    content = (
      <EquationBuilderV2
        key="lesson27-ex2"
        items={LESSON_27_EXERCISE_2}
        audio_base={LESSON_27_EXERCISE_AUDIO_BASE}
        missionTitle="مهمة الاختبار 2"
        missionIcon="⭐"
        onComplete={() => setStage("ex3")}
      />
    );
  } else if (stage === "ex3") {
    content = (
      <AddSubStoryLabV2
        key="lesson27-ex3"
        items={LESSON_27_EXERCISE_3}
        audio_base={LESSON_27_EXERCISE_AUDIO_BASE}
        missionTitle="مهمة الاختبار 3"
        missionIcon="⭐"
        onComplete={() => setStage("ex4")}
      />
    );
  } else if (stage === "ex4") {
    content = (
      <AddSubStoryLabV2
        key="lesson27-ex4"
        items={LESSON_27_EXERCISE_4}
        audio_base={LESSON_27_EXERCISE_AUDIO_BASE}
        missionTitle="مهمة الاختبار 4"
        missionIcon="⭐"
        onComplete={() => setStage("done")}
      />
    );
  } else {
    content = (
      <LessonCompleteV2
        lessonKey="lesson27"
        nextLessonKey="lesson28"
        onReplay={() => setStage("ex1")}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {content}
    </ExerciseFullscreenShellV2>
  );
}
