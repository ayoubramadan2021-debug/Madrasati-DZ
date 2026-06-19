import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import TapSelectExerciseV2 from "../features/lesson-v2/exercises-v2/TapSelectExerciseV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import SortSequenceExerciseV2 from "../features/lesson-v2/exercises-v2/SortSequenceExerciseV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
import {
  LESSON_1_EXERCISE_1,
  LESSON_1_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise1";
import {
  LESSON_1_EXERCISE_2,
  LESSON_1_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise2";
import {
  LESSON_1_EXERCISE_3,
  LESSON_1_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise3";
import {
  LESSON_1_EXERCISE_4,
  LESSON_1_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise4";
import {
  LESSON_1_EXERCISE_5,
  LESSON_1_EXERCISE_5_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise5";

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
};

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "ex5" | "done";

export default function LessonExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectExerciseV2
        items={LESSON_1_EXERCISE_1}
        audio_base={LESSON_1_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }
  if (stage === "ex2") {
    return (
      <CountTapExerciseV2
        items={LESSON_1_EXERCISE_2}
        audio_base={LESSON_1_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }
  if (stage === "ex3") {
    return (
      <DragMatchExerciseV2
        items={LESSON_1_EXERCISE_3}
        audio_base={LESSON_1_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );
  }
  if (stage === "ex4") {
    return (
      <SortSequenceExerciseV2
        items={LESSON_1_EXERCISE_4}
        audio_base={LESSON_1_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("ex5")}
      />
    );
  }
  if (stage === "ex5") {
    return (
      <TraceExerciseV2
        items={LESSON_1_EXERCISE_5}
        audio_base={LESSON_1_EXERCISE_5_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ يَا بَطَل! تَعَلَّمْتَ الأَعْدادَ مِنْ 1 إِلى 5."
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson2"
    />
  );
}
