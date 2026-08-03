
import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  Lesson53PremiumExercise1V2,
  Lesson53PremiumExercise2V2,
  Lesson53PremiumExercise3V2,
  Lesson53PremiumExercise4V2,
} from "../features/lesson-v2/exercises-v2/Lesson53PremiumRegroupingExercisesV2";

type Lesson53Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_53_regrouping_exchange/exercises";

export default function
Lesson53ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Lesson53Stage>(
    "ex1",
  );

  if (stage === "ex1") {
    return (
      <Lesson53PremiumExercise1V2
        key="lesson53-ex1"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("ex2");
        }}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson53PremiumExercise2V2
        key="lesson53-ex2"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("ex3");
        }}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson53PremiumExercise3V2
        key="lesson53-ex3"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("ex4");
        }}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson53PremiumExercise4V2
        key="lesson53-ex4"
        audio_base={AUDIO_BASE}
        onComplete={() => {
          setStage("done");
        }}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson53"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ التَّجْمِيعِ وَالِاسْتِبْدَالِ."
      onReplay={() => {
        setStage("ex1");
      }}
      nextPath="/lesson-v2/lesson54"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
