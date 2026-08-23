import GridNavigationActivityAdapterV2 from "../features/lesson-v2/exercises-v2/GridNavigationActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_47_MISSION_TITLES,
  LESSON_47_UNIFIED_AUDIO_BASE,
  LESSON_47_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson47_exercises_unified";

export default function Lesson47ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson47"
      audioBase={LESSON_47_UNIFIED_AUDIO_BASE}
      questions={LESSON_47_UNIFIED_QUESTIONS}
      missionTitles={LESSON_47_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا بَطَلُ! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      nextLessonKey="lesson48"
      renderActivity={(context) => (
        <GridNavigationActivityAdapterV2 {...context} />
      )}
    />
  );
}
