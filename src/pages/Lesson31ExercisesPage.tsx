import { useState } from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";

import Lesson31CompareEngineV2 from "../features/lesson-v2/exercises-v2/lesson31/Lesson31CompareEngineV2";
import Lesson31VisualChoiceEngineV2 from "../features/lesson-v2/exercises-v2/lesson31/Lesson31VisualChoiceEngineV2";
import Lesson31SubtractionEngineV2 from "../features/lesson-v2/exercises-v2/lesson31/Lesson31SubtractionEngineV2";

import {
  LESSON_31_EXERCISE_1,
  LESSON_31_EXERCISE_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson31_exercise1";

import {
  LESSON_31_EXERCISE_2,
} from "../features/lesson-v2/content/lesson31_exercise2";

import {
  LESSON_31_EXERCISE_3,
} from "../features/lesson-v2/content/lesson31_exercise3";

import {
  LESSON_31_EXERCISE_4,
} from "../features/lesson-v2/content/lesson31_exercise4";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

export default function Lesson31ExercisesPage() {
  const [stage, setStage] =
    useState<Stage>("ex1");

  let content;

  if (stage === "ex1") {
    content = (
      <Lesson31CompareEngineV2
        key="lesson31-ex1"
        items={LESSON_31_EXERCISE_1}
        audio_base={
          LESSON_31_EXERCISE_AUDIO_BASE
        }
        title="مُقَارَنَةُ المَجْمُوعَاتِ"
        icon="⚖️"
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  } else if (stage === "ex2") {
    content = (
      <Lesson31VisualChoiceEngineV2
        key="lesson31-ex2"
        items={LESSON_31_EXERCISE_2}
        audio_base={
          LESSON_31_EXERCISE_AUDIO_BASE
        }
        title="أَخْتَارُ الغِذَاءَ المُنَاسِبَ"
        icon="🍎"
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  } else if (stage === "ex3") {
    content = (
      <Lesson31SubtractionEngineV2
        key="lesson31-ex3"
        items={LESSON_31_EXERCISE_3}
        audio_base={
          LESSON_31_EXERCISE_AUDIO_BASE
        }
        title="أَحْسِبُ نَتِيجَةَ الطَّرْحِ"
        icon="➖"
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  } else if (stage === "ex4") {
    content = (
      <Lesson31VisualChoiceEngineV2
        key="lesson31-ex4"
        items={LESSON_31_EXERCISE_4}
        audio_base={
          LESSON_31_EXERCISE_AUDIO_BASE
        }
        title="أُمَيِّزُ السُّلُوكَ المُنَاسِبَ"
        icon="🟢"
        onComplete={() =>
          setStage("done")
        }
      />
    );
  } else {
    content = (
      <LessonCompleteV2
        message="أَحْسَنْتَ! أَتْمَمْتَ تَمَارِينَ الدَّرْسِ 31."
        lessonKey="lesson31"
        nextLessonKey="lesson32"
        onReplay={() =>
          setStage("ex1")
        }
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {content}
    </ExerciseFullscreenShellV2>
  );
}
