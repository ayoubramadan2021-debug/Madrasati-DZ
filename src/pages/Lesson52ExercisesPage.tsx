import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import TapSelectImagesV2 from
  "../features/lesson-v2/exercises-v2/TapSelectImagesV2";

import {
  Lesson52PremiumDragExerciseV2,
  Lesson52PremiumEffortLabExerciseV2,
  Lesson52PremiumPulseLabExerciseV2,
} from "../features/lesson-v2/exercises-v2/Lesson52PremiumHealthExercisesV2";

import {
  LESSON_52_EXERCISE_1,
} from "../features/lesson-v2/content/lesson52_exercise1";

type Lesson52Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const WORLD_HOME =
  `/world/${WORLD_ID}`;

const WORLD_QUIZ =
  `/world/${WORLD_ID}/quiz`;

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_52_bilan_2/exercises";

export default function
Lesson52ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Lesson52Stage>(
    "ex1",
  );

  if (stage === "ex1") {
    return (
      <TapSelectImagesV2
        key="lesson52-ex1"
        items={
          LESSON_52_EXERCISE_1
        }
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson52/s1.webp"
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson52PremiumDragExerciseV2
        key="lesson52-ex2"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson52PremiumEffortLabExerciseV2
        key="lesson52-ex3"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson52PremiumPulseLabExerciseV2
        key="lesson52-ex4"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson52"
      nextLabel="العودة إلى العالم"
      message="أَكْمَلْتَ تَمَارِينَ الْحَصِيلَةِ الثَّانِيَةِ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath={WORLD_HOME}
      quizPath={WORLD_QUIZ}
    />
  );
}
