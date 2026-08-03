import {
  LESSON_57_EXERCISES,
} from "../features/lesson-v2/content/lesson56_58_exercises";

import World3TapTextExercisesV2 from
  "../features/lesson-v2/exercises-v2/World3TapTextExercisesV2";

const WORLD_ID =
  "827a3923-94f7-4b33-99e6-2d3c8d957e0c";

export default function
Lesson57ExercisesPage() {
  return (
    <World3TapTextExercisesV2
      lessonKey="lesson57"
      exercises={
        LESSON_57_EXERCISES
      }
      audioBase="/audio/teachers/taline/lesson_57_add_subtract_small_numbers_1/exercises"
      backgrounds={[
        "/lessons/v2/lesson57/s2.webp",
        "/lessons/v2/lesson57/s3.webp",
        "/lessons/v2/lesson57/s4.webp",
        "/lessons/v2/lesson57/s5.webp",
      ]}
      message="أَكْمَلْتَ تَمَارِينَ إِضَافَةِ وَطَرْحِ أَعْدَادٍ صَغِيرَةٍ."
      nextPath="/lesson-v2/lesson58"
      quizPath={
        `/world/${WORLD_ID}/quiz`
      }
    />
  );
}
