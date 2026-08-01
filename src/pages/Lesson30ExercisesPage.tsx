import {
  useState,
} from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";

import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";

import Lesson30CompositionCountEngineV2 from "../features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionCountEngineV2";

import Lesson30CompositionChoiceEngineV2 from "../features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionChoiceEngineV2";

import Lesson30CompositionBuilderEngineV2 from "../features/lesson-v2/exercises-v2/lesson30/Lesson30CompositionBuilderEngineV2";

import {
  LESSON_30_EXERCISE_1,
  LESSON_30_EXERCISE_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson30_exercise1";

import {
  LESSON_30_EXERCISE_2,
} from "../features/lesson-v2/content/lesson30_exercise2";

import {
  LESSON_30_EXERCISE_3,
} from "../features/lesson-v2/content/lesson30_exercise3";

import {
  LESSON_30_EXERCISE_4,
} from "../features/lesson-v2/content/lesson30_exercise4";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

export default function Lesson30ExercisesPage() {
  const [stage, setStage] =
    useState<Stage>("ex1");

  let content;

  if (stage === "ex1") {
    content = (
      <Lesson30CompositionCountEngineV2
        key="lesson30-ex1"
        items={LESSON_30_EXERCISE_1}
        audio_base={
          LESSON_30_EXERCISE_AUDIO_BASE
        }
        title="أُرَكِّبُ العَدَدَ"
        icon="🔟"
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  } else if (stage === "ex2") {
    content = (
      <Lesson30CompositionChoiceEngineV2
        key="lesson30-ex2"
        items={LESSON_30_EXERCISE_2}
        audio_base={
          LESSON_30_EXERCISE_AUDIO_BASE
        }
        title="أَخْتَارُ التَّرْكِيبَ المُطَابِقَ"
        icon="🧩"
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  } else if (stage === "ex3") {
    content = (
      <Lesson30CompositionBuilderEngineV2
        key="lesson30-ex3"
        items={LESSON_30_EXERCISE_3}
        audio_base={
          LESSON_30_EXERCISE_AUDIO_BASE
        }
        title="أَبْنِي تَرْكِيبَ العَدَدِ"
        icon="🧱"
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  } else if (stage === "ex4") {
    content = (
      <Lesson30CompositionChoiceEngineV2
        key="lesson30-ex4"
        items={LESSON_30_EXERCISE_4}
        audio_base={
          LESSON_30_EXERCISE_AUDIO_BASE
        }
        title="أَكْتَشِفُ تَرْكِيبَ العَدَدِ"
        icon="💡"
        onComplete={() =>
          setStage("done")
        }
      />
    );
  } else {
    content = (
      <LessonCompleteV2
        lessonKey="lesson30"
        nextLessonKey="lesson31"
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
