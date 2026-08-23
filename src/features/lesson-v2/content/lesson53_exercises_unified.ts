import type {
  Premium53To55UnifiedQuestion,
} from "../exercises-v2/Lesson53_55PremiumActivityAdapterV2";

import {
  getLesson53PremiumUnifiedItems,
  getLesson53PremiumUnifiedMeta,
} from "../exercises-v2/Lesson53PremiumRegroupingExercisesV2";

export const LESSON_53_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_53_regrouping_exchange/exercises";

const MISSION_INDEXES = [0, 1, 2, 3] as const;

export const LESSON_53_MISSION_TITLES:
  Record<number, string> =
    Object.fromEntries(
      MISSION_INDEXES.map(
        (exerciseIndex) => [
          exerciseIndex + 1,
          getLesson53PremiumUnifiedMeta(exerciseIndex).missionTitle,
        ],
      ),
    );

export const LESSON_53_UNIFIED_QUESTIONS:
  Premium53To55UnifiedQuestion[] =
    MISSION_INDEXES.flatMap(
      (exerciseIndex) => {
        const meta = getLesson53PremiumUnifiedMeta(exerciseIndex);
        return getLesson53PremiumUnifiedItems(exerciseIndex).map(
          (item, itemIndex) => ({
            id: `l53_ex${exerciseIndex + 1}_q${itemIndex + 1}`,
            mission: exerciseIndex + 1,
            prompt: item.question,
            audioKey: item.question_audio_key,
            backgroundImage: meta.backgroundImage,
            sourceItem: item,
            exerciseIndex,
            itemIndex,
            premiumKind: "lesson53",
          }),
        );
      },
    );
