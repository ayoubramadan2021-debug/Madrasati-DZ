import type {
  Premium53To55UnifiedQuestion,
} from "../exercises-v2/Lesson53_55PremiumActivityAdapterV2";

import {
  getLesson55PremiumUnifiedItems,
  getLesson55PremiumUnifiedMeta,
} from "../exercises-v2/Lesson55PremiumAnimalsExercisesV2";

export const LESSON_55_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_55_animals_with_us_1/exercises-premium";

const MISSION_INDEXES = [0, 1, 2, 3] as const;

export const LESSON_55_MISSION_TITLES:
  Record<number, string> =
    Object.fromEntries(
      MISSION_INDEXES.map(
        (exerciseIndex) => [
          exerciseIndex + 1,
          getLesson55PremiumUnifiedMeta(exerciseIndex).missionTitle,
        ],
      ),
    );

export const LESSON_55_UNIFIED_QUESTIONS:
  Premium53To55UnifiedQuestion[] =
    MISSION_INDEXES.flatMap(
      (exerciseIndex) => {
        const meta = getLesson55PremiumUnifiedMeta(exerciseIndex);
        return getLesson55PremiumUnifiedItems(exerciseIndex).map(
          (item, itemIndex) => ({
            id: `l55_ex${exerciseIndex + 1}_q${itemIndex + 1}`,
            mission: exerciseIndex + 1,
            prompt: item.question,
            audioKey: item.question_audio_key,
            backgroundImage: meta.backgroundImage,
            sourceItem: item,
            exerciseIndex,
            itemIndex,
            premiumKind: "lesson55",
          }),
        );
      },
    );
