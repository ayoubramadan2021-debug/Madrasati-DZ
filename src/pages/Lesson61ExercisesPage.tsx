import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import TapSelectImagesV2 from
  "../features/lesson-v2/exercises-v2/TapSelectImagesV2";

import {
  LESSON_61_EXERCISE_1,
  LESSON_61_EXERCISE_2,
  LESSON_61_EXERCISE_3,
  LESSON_61_EXERCISE_4,
} from "../features/lesson-v2/content/lesson61_exercises";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_61_plants_with_us_1/exercises";

export default function
Lesson61ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectImagesV2
        key="lesson61-ex1"
        items={LESSON_61_EXERCISE_1}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson61-plants-with-us-1/s1.webp"
        progress_emoji="🌍"
        mission_prefix="التَّمْرِينُ 1"
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <TapSelectImagesV2
        key="lesson61-ex2"
        items={LESSON_61_EXERCISE_2}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson61-plants-with-us-1/s5.webp"
        progress_emoji="🌳"
        mission_prefix="التَّمْرِينُ 2"
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <TapSelectImagesV2
        key="lesson61-ex3"
        items={LESSON_61_EXERCISE_3}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson61-plants-with-us-1/s4.webp"
        progress_emoji="🌿"
        mission_prefix="التَّمْرِينُ 3"
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <TapSelectImagesV2
        key="lesson61-ex4"
        items={LESSON_61_EXERCISE_4}
        audio_base={AUDIO_BASE}
        background_image="/lessons/v2/lesson61-plants-with-us-1/s6.webp"
        progress_emoji="🌱"
        mission_prefix="التَّمْرِينُ 4"
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson61"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ النَّبَاتَاتِ الَّتِي تَعِيشُ مَعَنَا."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson62"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
