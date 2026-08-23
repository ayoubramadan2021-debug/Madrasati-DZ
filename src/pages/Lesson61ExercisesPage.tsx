import LegacyActivityAdapterV2 from "../features/lesson-v2/exercises-v2/LegacyActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_61_MISSION_TITLES,
  LESSON_61_UNIFIED_AUDIO_BASE,
  LESSON_61_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson61_exercises_unified";

export default function Lesson61ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson61"
      audioBase={LESSON_61_UNIFIED_AUDIO_BASE}
      questions={LESSON_61_UNIFIED_QUESTIONS}
      missionTitles={LESSON_61_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ النَّبَاتَاتِ الَّتِي تَعِيشُ مَعَنَا."
      nextPath="/lesson-v2/lesson62"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <LegacyActivityAdapterV2 {...context} />
      )}
    />
  );
}
