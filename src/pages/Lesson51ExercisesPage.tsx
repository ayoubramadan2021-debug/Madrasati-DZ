import Lesson51ActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson51ActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";

import {
  LESSON_51_MISSION_TITLES,
  LESSON_51_UNIFIED_AUDIO_BASE,
  LESSON_51_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson51_exercises_unified";

export default function Lesson51ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson51"
      audioBase={LESSON_51_UNIFIED_AUDIO_BASE}
      questions={LESSON_51_UNIFIED_QUESTIONS}
      missionCount={4}
      completionMessage={"أَتْمَمْتَ تَمَارِينَ الْحَصِيلَةِ الْأُولَى."}
      nextPath={"/world2-lesson/52"}
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <Lesson51ActivityAdapterV2
          {...context}
        />
      )}
    />
  );
}
