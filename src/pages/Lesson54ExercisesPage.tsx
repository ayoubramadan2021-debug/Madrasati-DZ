import Lesson53_55PremiumActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson53_55PremiumActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_54_MISSION_TITLES,
  LESSON_54_UNIFIED_AUDIO_BASE,
  LESSON_54_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson54_exercises_unified";

export default function Lesson54ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson54"
      audioBase={LESSON_54_UNIFIED_AUDIO_BASE}
      questions={LESSON_54_UNIFIED_QUESTIONS}
      missionTitles={LESSON_54_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ الْمُرُورِ إِلَى الْعَشَرَةِ."
      nextPath="/lesson-v2/lesson55"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <Lesson53_55PremiumActivityAdapterV2
          {...context}
        />
      )}
    />
  );
}
