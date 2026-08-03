import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  LESSON_60_EXERCISE_1,
  LESSON_60_EXERCISE_2,
  LESSON_60_EXERCISE_3,
  LESSON_60_EXERCISE_4,
} from "../features/lesson-v2/content/lesson60_exercises";

import Lesson60AlignmentExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson60AlignmentExerciseV2";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_60_alignment/exercises";

export default function
Lesson60ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <Lesson60AlignmentExerciseV2
        key="lesson60-ex1"
        items={LESSON_60_EXERCISE_1}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson60-alignment/s2.webp"
        mode="patterns"
        progressEmoji="🚧"
        missionPrefix="التَّمْرِينُ 1"
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson60AlignmentExerciseV2
        key="lesson60-ex2"
        items={LESSON_60_EXERCISE_2}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson60-alignment/s3.webp"
        mode="outlier"
        progressEmoji="🔴"
        missionPrefix="التَّمْرِينُ 2"
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson60AlignmentExerciseV2
        key="lesson60-ex3"
        items={LESSON_60_EXERCISE_3}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson60-alignment/s5.webp"
        mode="complete"
        progressEmoji="🟢"
        missionPrefix="التَّمْرِينُ 3"
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson60AlignmentExerciseV2
        key="lesson60-ex4"
        items={LESSON_60_EXERCISE_4}
        audioBase={AUDIO_BASE}
        backgroundImage="/lessons/v2/lesson60-alignment/s4.webp"
        mode="ruler"
        progressEmoji="📏"
        missionPrefix="التَّمْرِينُ 4"
        onComplete={() =>
          setStage("done")
        }
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson60"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ الِاسْتِقَامِيَّةِ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson61"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
