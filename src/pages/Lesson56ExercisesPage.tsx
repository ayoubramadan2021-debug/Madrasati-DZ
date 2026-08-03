import {
  LESSON_56_EXERCISES,
} from "../features/lesson-v2/content/lesson56_58_exercises";

import World3TapTextExercisesV2 from
  "../features/lesson-v2/exercises-v2/World3TapTextExercisesV2";

const WORLD_ID =
  "827a3923-94f7-4b33-99e6-2d3c8d957e0c";

export default function
Lesson56ExercisesPage() {
  return (
    <World3TapTextExercisesV2
      lessonKey="lesson56"
      exercises={
        LESSON_56_EXERCISES
      }
      audioBase="/audio/teachers/khalil/lesson_56_numbers_to_39_2/exercises"
      backgrounds={[
        "/lessons/v2/lesson56/s2.webp",
        "/lessons/v2/lesson56/s3.webp",
        "/lessons/v2/lesson56/s4.webp",
        "/lessons/v2/lesson56/s6.webp",
      ]}
      message="أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ إِلَى 39."
      nextPath="/lesson-v2/lesson57"
      quizPath={
        `/world/${WORLD_ID}/quiz`
      }
    />
  );
}
