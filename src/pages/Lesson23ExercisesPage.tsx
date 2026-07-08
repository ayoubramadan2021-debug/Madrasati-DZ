import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import LengthLabPremiumExerciseV2 from "../features/lesson-v2/exercises-v2/LengthLabPremiumExerciseV2";
import {
  LESSON_23_EXERCISE_1,
  LESSON_23_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson23_exercise1";
import {
  LESSON_23_EXERCISE_2,
  LESSON_23_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson23_exercise2";
import {
  LESSON_23_EXERCISE_3,
  LESSON_23_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson23_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson23ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <LengthLabPremiumExerciseV2
        key="lesson23-discover"
        items={LESSON_23_EXERCISE_1}
        audio_base={LESSON_23_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <LengthLabPremiumExerciseV2
        key="lesson23-judge"
        items={LESSON_23_EXERCISE_2}
        audio_base={LESSON_23_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <LengthLabPremiumExerciseV2
        key="lesson23-arrange"
        items={LESSON_23_EXERCISE_3}
        audio_base={LESSON_23_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson23"
      nextLessonKey="lesson24"
      onReplay={() => setStage("ex1")}
    />
  );
}
