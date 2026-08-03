import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import TapSelectImagesV2 from
  "../features/lesson-v2/exercises-v2/TapSelectImagesV2";

import {
  LESSON_58_EXERCISE_1,
} from "../features/lesson-v2/content/lesson58_exercise1";

import {
  LESSON_58_EXERCISE_2,
} from "../features/lesson-v2/content/lesson58_exercise2";

import {
  LESSON_58_EXERCISE_3,
} from "../features/lesson-v2/content/lesson58_exercise3";

import {
  LESSON_58_EXERCISE_4,
} from "../features/lesson-v2/content/lesson58_exercise4";

type Lesson58Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_58_animals_with_us_2/exercises-images";

export default function
Lesson58ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Lesson58Stage>(
    "ex1",
  );

  if (stage === "ex1") {
    return (
      <TapSelectImagesV2
        key="lesson58-ex1"
        items={LESSON_58_EXERCISE_1}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson58/s2.webp"
        progress_emoji="🌿"
        mission_prefix="تمرين الحيوانات"
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <TapSelectImagesV2
        key="lesson58-ex2"
        items={LESSON_58_EXERCISE_2}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson58/s3.webp"
        progress_emoji="🦁"
        mission_prefix="تمرين الحيوانات"
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <TapSelectImagesV2
        key="lesson58-ex3"
        items={LESSON_58_EXERCISE_3}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson58/s4.webp"
        progress_emoji="🥚"
        mission_prefix="تمرين الحيوانات"
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <TapSelectImagesV2
        key="lesson58-ex4"
        items={LESSON_58_EXERCISE_4}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson58/s5.webp"
        progress_emoji="🐣"
        mission_prefix="تمرين الحيوانات"
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson58"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ حَيَوَانَاتٍ تَعِيشُ مَعَنَا."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson59"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
