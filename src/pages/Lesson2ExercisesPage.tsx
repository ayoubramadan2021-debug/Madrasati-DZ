import LegacyActivityAdapterV2 from "../features/lesson-v2/exercises-v2/LegacyActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";
import {
  LESSON_2_MISSION_TITLES,
  LESSON_2_UNIFIED_AUDIO_BASE,
  LESSON_2_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson2_exercises_unified";

export default function Lesson2ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson2"
      audioBase={LESSON_2_UNIFIED_AUDIO_BASE}
      questions={LESSON_2_UNIFIED_QUESTIONS}
      missionTitles={LESSON_2_MISSION_TITLES}
      missionCount={3}
      completionMessage="أَحْسَنْتَ يَا بَطَل! 🎉 أَكْمَلْتَ تَمَارِينَ الدَّرْسِ. هَيَّا نُوَاصِلُ التَّعَلُّمَ!"
      nextLessonKey="lesson3"
      renderActivity={(context) => (
        <LegacyActivityAdapterV2 {...context} />
      )}
    />
  );
}
