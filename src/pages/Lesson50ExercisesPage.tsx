import Lesson50ActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson50ActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_50_MISSION_TITLES,
  LESSON_50_UNIFIED_AUDIO_BASE,
  LESSON_50_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson50_exercises_unified";

export default function Lesson50ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson50"
      audioBase={LESSON_50_UNIFIED_AUDIO_BASE}
      questions={LESSON_50_UNIFIED_QUESTIONS}
      missionTitles={LESSON_50_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَتْمَمْتَ تَمَارِينَ تَجْنِيدِ الْمَعَارِفِ."
      nextPath="/world2-lesson/51"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <Lesson50ActivityAdapterV2
          {...context}
        />
      )}
    />
  );
}
