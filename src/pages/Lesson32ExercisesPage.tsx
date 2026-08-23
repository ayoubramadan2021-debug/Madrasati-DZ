import {
  useState,
} from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";

import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";

import Lesson32CompareEngineV2 from "../features/lesson-v2/exercises-v2/lesson32/Lesson32CompareEngineV2";

import Lesson32VisualChoiceEngineV2 from "../features/lesson-v2/exercises-v2/lesson32/Lesson32VisualChoiceEngineV2";

import Lesson32SubtractionEngineV2 from "../features/lesson-v2/exercises-v2/lesson32/Lesson32SubtractionEngineV2";

import {
  LESSON_32_EXERCISE_1,
  LESSON_32_EXERCISE_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson32_exercise1";

import {
  LESSON_32_EXERCISE_2,
} from "../features/lesson-v2/content/lesson32_exercise2";

import {
  LESSON_32_EXERCISE_3,
} from "../features/lesson-v2/content/lesson32_exercise3";

type Stage =
  | "exercise1"
  | "exercise2"
  | "exercise3"
  | "done";

export default function Lesson32ExercisesPage() {
  const [stage, setStage] =
    useState<Stage>("exercise1");

  let content;

  if (stage === "exercise1") {
    content = (
      <Lesson32CompareEngineV2
        key="lesson32-exercise1"
        items={LESSON_32_EXERCISE_1}
        audio_base={
          LESSON_32_EXERCISE_AUDIO_BASE
        }
        title="أُقَارِنُ بَيْنَ المَجْمُوعَاتِ"
        icon="⚖️"
        onComplete={() =>
          setStage("exercise2")
        }
      />
    );
  } else if (stage === "exercise2") {
    content = (
      <Lesson32VisualChoiceEngineV2
        key="lesson32-exercise2"
        items={LESSON_32_EXERCISE_2}
        audio_base={
          LESSON_32_EXERCISE_AUDIO_BASE
        }
        title="أَخْتَارُ الغِذَاءَ وَالسُّلُوكَ المُنَاسِبَ"
        icon="🍎"
        onComplete={() =>
          setStage("exercise3")
        }
      />
    );
  } else if (stage === "exercise3") {
    content = (
      <Lesson32SubtractionEngineV2
        key="lesson32-exercise3"
        items={LESSON_32_EXERCISE_3}
        audio_base={
          LESSON_32_EXERCISE_AUDIO_BASE
        }
        title="أَحْسِبُ نَتِيجَةَ الطَّرْحِ"
        icon="➖"
        onComplete={() =>
          setStage("done")
        }
      />
    );
  } else {
    content = (
      <LessonCompleteV2
        lessonKey="lesson32"
      nextLabel="العودة إلى العالم"
        nextLessonKey="progress-test-mt-01"
        onReplay={() =>
          setStage("exercise1")
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
