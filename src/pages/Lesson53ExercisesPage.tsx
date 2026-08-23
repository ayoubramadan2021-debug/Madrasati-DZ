import Lesson53_55PremiumActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson53_55PremiumActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_53_MISSION_TITLES,
  LESSON_53_UNIFIED_AUDIO_BASE,
  LESSON_53_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson53_exercises_unified";

export default function Lesson53ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson53"
      audioBase={LESSON_53_UNIFIED_AUDIO_BASE}
      questions={LESSON_53_UNIFIED_QUESTIONS}
      missionTitles={LESSON_53_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ التَّجْمِيعِ وَالِاسْتِبْدَالِ."
      nextPath="/lesson-v2/lesson54"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <Lesson53_55PremiumActivityAdapterV2
          {...context}
        />
      )}
    />
  );
}
