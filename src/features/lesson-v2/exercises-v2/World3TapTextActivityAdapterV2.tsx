import {
  TextChoiceGrid,
} from "./World3TapTextExercisesV2";
import type {
  TapSelectImageItem,
  TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";
import type {
  UnifiedLessonExerciseQuestionV2,
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

export type World3TapTextUnifiedQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    sourceItem: TapSelectImageItem;
    stageIndex: number;
    itemIndex: number;
    sourceLessonKey: string;
  };

export default function World3TapTextActivityAdapterV2({
  question,
  feedback,
  locked,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<World3TapTextUnifiedQuestion>) {
  const context = {
    item: question.sourceItem,
    itemIndex: question.itemIndex,
    locked,
    feedbackState: feedback,
    completeRound: () => submitResult(true),
    showWrong: () => submitResult(false),
  } as TapSelectImagesCustomContext;

  return (
    <TextChoiceGrid
      lessonKey={question.sourceLessonKey}
      stageIndex={question.stageIndex}
      context={context}
    />
  );
}
