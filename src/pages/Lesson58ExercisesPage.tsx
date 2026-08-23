import LegacyActivityAdapterV2 from "../features/lesson-v2/exercises-v2/LegacyActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_58_MISSION_TITLES,
  LESSON_58_UNIFIED_AUDIO_BASE,
  LESSON_58_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson58_exercises_unified";

export default function Lesson58ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson58"
      audioBase={LESSON_58_UNIFIED_AUDIO_BASE}
      questions={LESSON_58_UNIFIED_QUESTIONS}
      missionTitles={LESSON_58_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ حَيَوَانَاتٍ تَعِيشُ مَعَنَا."
      nextPath="/lesson-v2/lesson59"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <LegacyActivityAdapterV2 {...context} />
      )}
    />
  );
}
