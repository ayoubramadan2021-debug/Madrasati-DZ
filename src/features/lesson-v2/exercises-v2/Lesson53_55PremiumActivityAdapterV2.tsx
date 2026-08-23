import type {
  TapSelectImageItem,
  TapSelectImagesCustomContext,
} from "./TapSelectImagesV2";

import {
  renderLesson53PremiumUnifiedVisual,
} from "./Lesson53PremiumRegroupingExercisesV2";
import {
  renderLesson54PremiumUnifiedVisual,
} from "./Lesson54PremiumBridgeExercisesV2";
import {
  renderLesson55PremiumUnifiedVisual,
} from "./Lesson55PremiumAnimalsExercisesV2";

import type {
  UnifiedLessonExerciseQuestionV2,
  UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

export type Premium53To55Kind =
  | "lesson53"
  | "lesson54"
  | "lesson55";

export type Premium53To55UnifiedQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    sourceItem: TapSelectImageItem;
    exerciseIndex: number;
    itemIndex: number;
    premiumKind: Premium53To55Kind;
  };

export default function Lesson53_55PremiumActivityAdapterV2({
  question,
  feedback,
  locked,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<Premium53To55UnifiedQuestion>) {
  const context = {
    item: question.sourceItem,
    itemIndex: question.itemIndex,
    locked,
    feedbackState: feedback,
    completeRound: () => submitResult(true),
    showWrong: () => submitResult(false),
  } as TapSelectImagesCustomContext;

  if (question.premiumKind === "lesson53") {
    return renderLesson53PremiumUnifiedVisual(
      question.exerciseIndex,
      context,
    );
  }

  if (question.premiumKind === "lesson54") {
    return renderLesson54PremiumUnifiedVisual(
      question.exerciseIndex,
      context,
    );
  }

  return renderLesson55PremiumUnifiedVisual(
    question.exerciseIndex,
    context,
  );
}
