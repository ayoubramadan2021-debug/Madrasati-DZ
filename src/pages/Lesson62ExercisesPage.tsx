import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  LESSON_62_EXERCISE_1,
  LESSON_62_EXERCISE_2,
  LESSON_62_EXERCISE_3,
  LESSON_62_EXERCISE_4,
} from "../features/lesson-v2/content/lesson62_exercises";

import Lesson62NumbersExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson62NumbersExerciseV2";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_62_numbers_to_39_3/exercises";

export default function
Lesson62ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <Lesson62NumbersExerciseV2
        key="lesson62-ex1"
        items={LESSON_62_EXERCISE_1}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson62-numbers-to-39-3/s2.webp"
        progressEmoji="🔟"
        missionPrefix="التَّمْرِينُ 1"
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson62NumbersExerciseV2
        key="lesson62-ex2"
        items={LESSON_62_EXERCISE_2}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson62-numbers-to-39-3/s4.webp"
        progressEmoji="🧩"
        missionPrefix="التَّمْرِينُ 2"
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson62NumbersExerciseV2
        key="lesson62-ex3"
        items={LESSON_62_EXERCISE_3}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson62-numbers-to-39-3/s5.webp"
        progressEmoji="➕"
        missionPrefix="التَّمْرِينُ 3"
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson62NumbersExerciseV2
        key="lesson62-ex4"
        items={LESSON_62_EXERCISE_4}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson62-numbers-to-39-3/s6.webp"
        progressEmoji="✅"
        missionPrefix="التَّمْرِينُ 4"
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson62"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ تَفْكِيكِ الْأَعْدَادِ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson63"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
