import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import TapSelectWordsV2 from "../features/lesson-v2/exercises-v2/TapSelectWordsV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import {
  LESSON_3_EXERCISE_1,
  LESSON_3_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise1";
import {
  LESSON_3_EXERCISE_2,
  LESSON_3_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise2";
import {
  LESSON_3_EXERCISE_3,
  LESSON_3_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson3_exercise3";

const C = {
  navy: "#1B3A6B",
  gold: "#E8A020",
  cream: "#FFF8EC",
  green: "#1FA463",
};

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson3ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectWordsV2
        items={LESSON_3_EXERCISE_1}
        audio_base={LESSON_3_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <DragMatchExerciseV2
        items={LESSON_3_EXERCISE_2}
        background_image="/lessons/v2/lesson3-senses/senses-organs.webp"
        audio_base={LESSON_3_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <TapSelectWordsV2
        items={LESSON_3_EXERCISE_3}
        audio_base={LESSON_3_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      message="أَكْمَلْتَ تَمَارِينَ الحَوَاسِّ الخَمْس! 👂👁👃👅✋"
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson4"
    />
  );
}
