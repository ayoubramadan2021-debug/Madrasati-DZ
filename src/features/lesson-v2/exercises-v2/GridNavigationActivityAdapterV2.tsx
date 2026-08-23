import {
  GridBoard,
} from "./GridNavigationExerciseV2";

import type {
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import type {
  Lesson47UnifiedQuestion,
} from "../content/lesson47_exercises_unified";

export default function GridNavigationActivityAdapterV2({
  question,
  feedback,
}: UnifiedLessonExerciseRenderContextV2<Lesson47UnifiedQuestion>) {
  return (
    <GridBoard
      item={question.gridItem}
      feedback={feedback}
    />
  );
}
