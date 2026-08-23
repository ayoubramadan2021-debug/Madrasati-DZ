import World3TapTextActivityAdapterV2 from "../features/lesson-v2/exercises-v2/World3TapTextActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";
import {
  LESSON_56_MISSION_TITLES,
  LESSON_56_UNIFIED_AUDIO_BASE,
  LESSON_56_UNIFIED_QUESTIONS,
} from "../features/lesson-v2/content/lesson56_exercises_unified";

export default function Lesson56ExercisesPage() {
  return (
    <UnifiedLessonExercisesV2
      lessonKey="lesson56"
      audioBase={LESSON_56_UNIFIED_AUDIO_BASE}
      questions={LESSON_56_UNIFIED_QUESTIONS}
      missionTitles={LESSON_56_MISSION_TITLES}
      missionCount={4}
      completionMessage="أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ إِلَى 39."
      nextPath="/lesson-v2/lesson57"
      nextLabel="الدرس التالي"
      renderActivity={(context) => (
        <World3TapTextActivityAdapterV2 {...context} />
      )}
    />
  );
}
