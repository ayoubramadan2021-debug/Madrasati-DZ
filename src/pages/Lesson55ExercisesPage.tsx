
import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  Lesson55PremiumExercise1V2,
  Lesson55PremiumExercise2V2,
  Lesson55PremiumExercise3V2,
  Lesson55PremiumExercise4V2,
} from "../features/lesson-v2/exercises-v2/Lesson55PremiumAnimalsExercisesV2";

type Lesson55Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_55_animals_with_us_1/exercises-premium";

export default function
Lesson55ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Lesson55Stage>(
    "ex1",
  );

  if (stage === "ex1") {
    return (
      <Lesson55PremiumExercise1V2
        key="lesson55-ex1"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson55PremiumExercise2V2
        key="lesson55-ex2"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson55PremiumExercise3V2
        key="lesson55-ex3"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson55PremiumExercise4V2
        key="lesson55-ex4"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("done")
        }
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson55"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ حَيَوَانَاتٍ تَعِيشُ مَعَنَا."
      onReplay={() =>
        setStage("ex1")
      }
      nextPath="/lesson-v2/lesson56"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
