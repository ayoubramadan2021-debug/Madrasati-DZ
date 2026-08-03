import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  LESSON_63_EXERCISE_1,
  LESSON_63_EXERCISE_2,
  LESSON_63_EXERCISE_3,
  LESSON_63_EXERCISE_4,
} from "../features/lesson-v2/content/lesson63_exercises";

import Lesson63TablesExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson63TablesExerciseV2";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_63_writing_information_in_table/exercises";

const IMAGE_BASE =
  "/lessons/v2/lesson63-writing-information-in-table";

export default function
Lesson63ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <Lesson63TablesExerciseV2
        key="lesson63-ex1"
        items={LESSON_63_EXERCISE_1}
        audioBase={AUDIO_BASE}
        backgroundImage={`${IMAGE_BASE}/s1.webp`}
        progressEmoji="▦"
        missionPrefix="التَّمْرِينُ 1"
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson63TablesExerciseV2
        key="lesson63-ex2"
        items={LESSON_63_EXERCISE_2}
        audioBase={AUDIO_BASE}
        backgroundImage={`${IMAGE_BASE}/s2.webp`}
        progressEmoji="▤"
        missionPrefix="التَّمْرِينُ 2"
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson63TablesExerciseV2
        key="lesson63-ex3"
        items={LESSON_63_EXERCISE_3}
        audioBase={AUDIO_BASE}
        backgroundImage={`${IMAGE_BASE}/s4.webp`}
        progressEmoji="◫"
        missionPrefix="التَّمْرِينُ 3"
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson63TablesExerciseV2
        key="lesson63-ex4"
        items={LESSON_63_EXERCISE_4}
        audioBase={AUDIO_BASE}
        backgroundImage={`${IMAGE_BASE}/s5.webp`}
        progressEmoji="×"
        missionPrefix="التَّمْرِينُ 4"
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson63"
      nextLabel={"الدرس التالي"}
      message="أَكْمَلْتَ تَمَارِينَ قِرَاءَةِ الْمَعْلُومَاتِ وَكِتَابَتِهَا فِي جَدْوَلٍ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath={"/lesson-v2/lesson64"}
      quizPath={"/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"}
    />
  );
}
