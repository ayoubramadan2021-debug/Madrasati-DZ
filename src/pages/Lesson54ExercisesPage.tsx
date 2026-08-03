
import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import {
  Lesson54PremiumExercise1V2,
  Lesson54PremiumExercise2V2,
  Lesson54PremiumExercise3V2,
  Lesson54PremiumExercise4V2,
} from "../features/lesson-v2/exercises-v2/Lesson54PremiumBridgeExercisesV2";

type Lesson54Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_54_passage_to_ten/exercises-premium";

export default function
Lesson54ExercisesPage() {
  const [
    stage,
    setStage,
  ] = useState<Lesson54Stage>(
    "ex1",
  );

  if (stage === "ex1") {
    return (
      <Lesson54PremiumExercise1V2
        key="lesson54-ex1"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex2")
        }
      />
    );
  }

  if (stage === "ex2") {
    return (
      <Lesson54PremiumExercise2V2
        key="lesson54-ex2"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex3")
        }
      />
    );
  }

  if (stage === "ex3") {
    return (
      <Lesson54PremiumExercise3V2
        key="lesson54-ex3"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("ex4")
        }
      />
    );
  }

  if (stage === "ex4") {
    return (
      <Lesson54PremiumExercise4V2
        key="lesson54-ex4"
        audio_base={AUDIO_BASE}
        onComplete={() =>
          setStage("done")
        }
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson54"
      nextLabel="الدرس التالي"
      message="أَكْمَلْتَ تَمَارِينَ الْمُرُورِ إِلَى الْعَشَرَةِ."
      onReplay={() =>
        setStage("ex1")
      }
      nextPath="/lesson-v2/lesson55"
      quizPath="/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c/quiz"
    />
  );
}
