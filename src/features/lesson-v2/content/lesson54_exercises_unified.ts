import type {
  Premium53To55UnifiedQuestion,
} from "../exercises-v2/Lesson53_55PremiumActivityAdapterV2";

import {
  getLesson54PremiumUnifiedItems,
  getLesson54PremiumUnifiedMeta,
} from "../exercises-v2/Lesson54PremiumBridgeExercisesV2";

export const LESSON_54_UNIFIED_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_54_passage_to_ten/exercises-premium";

const MISSION_INDEXES = [0, 1, 2, 3] as const;

export const LESSON_54_MISSION_TITLES:
  Record<number, string> =
    Object.fromEntries(
      MISSION_INDEXES.map(
        (exerciseIndex) => [
          exerciseIndex + 1,
          getLesson54PremiumUnifiedMeta(exerciseIndex).missionTitle,
        ],
      ),
    );

export const LESSON_54_UNIFIED_QUESTIONS:
  Premium53To55UnifiedQuestion[] =
    MISSION_INDEXES.flatMap(
      (exerciseIndex) => {
        const meta = getLesson54PremiumUnifiedMeta(exerciseIndex);
        return getLesson54PremiumUnifiedItems(exerciseIndex).map(
          (item, itemIndex) => ({
            id: `l54_ex${exerciseIndex + 1}_q${itemIndex + 1}`,
            mission: exerciseIndex + 1,
            prompt: item.question,
            audioKey: item.question_audio_key,
            backgroundImage: meta.backgroundImage,
            sourceItem: item,
            exerciseIndex,
            itemIndex,
            premiumKind: "lesson54",
          }),
        );
      },
    );
