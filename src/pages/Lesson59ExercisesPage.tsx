import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  LESSON_59_EXERCISE_1,
  LESSON_59_EXERCISE_2,
  LESSON_59_EXERCISE_3,
  LESSON_59_EXERCISE_4,
} from "../features/lesson-v2/content/lesson59_exercises";

import Lesson59TimesOfDayExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson59TimesOfDayExerciseV2";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_59_times_of_day/exercises";

export default function
Lesson59ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <Lesson59TimesOfDayExerciseV2
        key="lesson59-ex1"
        items={LESSON_59_EXERCISE_1}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson59/s2.webp"
        mode="images"
        progressEmoji="🖼️"
        missionPrefix="التَّمْرِينُ 1"
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson59TimesOfDayExerciseV2
        key="lesson59-ex2"
        items={LESSON_59_EXERCISE_2}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson59/s3.webp"
        mode="times"
        progressEmoji="🕐"
        missionPrefix="التَّمْرِينُ 2"
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson59TimesOfDayExerciseV2
        key="lesson59-ex3"
        items={LESSON_59_EXERCISE_3}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson59/s4.webp"
        mode="periods"
        progressEmoji="☀️"
        missionPrefix="التَّمْرِينُ 3"
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson59TimesOfDayExerciseV2
        key="lesson59-ex4"
        items={LESSON_59_EXERCISE_4}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson59/s5.webp"
        mode="events"
        progressEmoji="🗓️"
        missionPrefix="التَّمْرِينُ 4"
        onComplete={() =>
          setStage("done")
        }
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson59"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ أَوْقَاتِ الْيَوْمِ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson60"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
