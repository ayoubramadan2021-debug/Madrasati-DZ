import World3TapTextActivityAdapterV2 from "../features/lesson-v2/exercises-v2/World3TapTextActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";
import {
  LESSON_57_MISSION_TITLES,
  LESSON_57_UNIFIED_AUDIO_BASE,
  LESSON_57_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson57_exercises_unified";

export default function Lesson57ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson57"
      audioBase={LESSON_57_UNIFIED_AUDIO_BASE}
      questions={LESSON_57_UNIFIED_QUESTIONS}
      missionTitles={LESSON_57_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ إِضَافَةِ وَطَرْحِ أَعْدَادٍ صَغِيرَةٍ."
      nextPath="/lesson-v2/lesson58"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <World3TapTextActivityAdapterV2 {...context} />
      )}
    />
  );
}
