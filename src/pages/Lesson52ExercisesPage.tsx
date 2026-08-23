import Lesson52ActivityAdapterV2 from "../features/lesson-v2/exercises-v2/Lesson52ActivityAdapterV2";
import UnifiedLessonExercisesV2 from "../features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2";
import { LESSON_52_UNIFIED_AUDIO_BASE, LESSON_52_UNIFIED_QUESTIONS } from "../features/lesson-v2/content/lesson52_exercises_unified";

export default function Lesson52ExercisesPage() {
  return <UnifiedLessonExercisesV2
    lessonKey="lesson52"
    audioBase={LESSON_52_UNIFIED_AUDIO_BASE}
    questions={LESSON_52_UNIFIED_QUESTIONS}
    missionCount={4}
    completionMessage={"أَكْمَلْتَ تَمَارِينَ الْحَصِيلَةِ الثَّانِيَةِ."}
    nextPath={"/world/5daed3bb-7e62-4a5a-93a1-f6dec60df810"}
    nextLabel={"العودة إلى العالم"}
    returnPath={"/world/5daed3bb-7e62-4a5a-93a1-f6dec60df810"}
    returnLabel={"العودة إلى العالم"}
    renderActivity={(context)=><Lesson52ActivityAdapterV2 {...context}/>}
  />;
}
