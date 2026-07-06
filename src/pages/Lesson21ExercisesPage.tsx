import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import LengthLabExerciseV2 from "../features/lesson-v2/exercises-v2/LengthLabExerciseV2";

import { LESSON_21_EXERCISE_1, LESSON_21_EXERCISE_1_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise1";
import { LESSON_21_EXERCISE_2, LESSON_21_EXERCISE_2_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise2";
import { LESSON_21_EXERCISE_3, LESSON_21_EXERCISE_3_AUDIO_BASE } from "../features/lesson-v2/content/lesson21_exercise3";

type Stage = "ex1" | "ex2" | "ex3" | "done";

export default function Lesson21ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1") {
    return (
      <LengthLabExerciseV2
        key="ex1"
        missionIcon="🎨"
        missionTitle="ألوان الشرائط"
        items={LESSON_21_EXERCISE_1}
        audio_base={LESSON_21_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <LengthLabExerciseV2
        key="ex2"
        missionIcon="📏"
        missionTitle="مختبر الحروف الملونة"
        items={LESSON_21_EXERCISE_2}
        audio_base={LESSON_21_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <LengthLabExerciseV2
        key="ex3"
        missionIcon="🕵️"
        missionTitle="محقق الأطوال"
        items={LESSON_21_EXERCISE_3}
        audio_base={LESSON_21_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson21"
      message="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ دَرْسِ الأَقْصَرِ وَالأَطْوَلِ."
      onReplay={() => setStage("ex1")}
    />
  );
}
