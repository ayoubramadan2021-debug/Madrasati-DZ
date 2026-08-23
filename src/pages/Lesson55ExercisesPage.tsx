import Lesson53_55PremiumActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson53_55PremiumActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_55_MISSION_TITLES,
  LESSON_55_UNIFIED_AUDIO_BASE,
  LESSON_55_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson55_exercises_unified";

export default function Lesson55ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson55"
      audioBase={LESSON_55_UNIFIED_AUDIO_BASE}
      questions={LESSON_55_UNIFIED_QUESTIONS}
      missionTitles={LESSON_55_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ الْحَيَوَانَاتِ الَّتِي تَعِيشُ مَعَنَا."
      nextPath="/lesson-v2/lesson56"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <Lesson53_55PremiumActivityAdapterV2
          {...context}
        />
      )}
    />
  );
}
