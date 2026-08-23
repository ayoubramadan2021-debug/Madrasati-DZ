import type {
  UnifiedLessonExerciseQuestionV2,
} from "../exercises-v2/UnifiedLessonExercisesV2";

import { lesson49Exercise1 } from "./lesson49_exercise1";
import { lesson49Exercise2 } from "./lesson49_exercise2";
import { lesson49Exercise3 } from "./lesson49_exercise3";
import { lesson49Exercise4 } from "./lesson49_exercise4";

export const LESSON_49_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_49_food_sources/exercises";

export const LESSON_49_MISSION_TITLES:
  Record<number, string> = {
    1: "المَهَمَّةُ الأُولَى: أُحَدِّدُ مَصْدَرَ الْغِذَاءِ",
    2: "المَهَمَّةُ الثَّانِيَةُ: أُصَنِّفُ الْأَغْذِيَةَ",
    3: "المَهَمَّةُ الثَّالِثَةُ: أَخْتَارُ الْوَجْبَةَ الصِّحِّيَّةَ",
    4: "المَهَمَّةُ الرَّابِعَةُ: أُكَوِّنُ وَجْبَةً مُتَوَازِنَةً",
  };

const EXERCISES = [
  lesson49Exercise1,
  lesson49Exercise2,
  lesson49Exercise3,
  lesson49Exercise4,
] as const;

export const LESSON_49_UNIFIED_QUESTIONS:
  UnifiedLessonExerciseQuestionV2[] =
    EXERCISES.flatMap(
      (items, missionIndex) =>
        items.map((item, itemIndex) => ({
          id:
            `l49_m${missionIndex + 1}_${item.id || itemIndex + 1}`,
          mission: missionIndex + 1,
          prompt: item.question,
          audioKey: item.question_audio_key,
          choices: [...item.options] as any,
          answer: item.correctId,
          variant: "text",
          columns: 2,
          backgroundImage: item.backgroundImage,
          activityLabel:
            `${item.focusEmoji} ${item.focusLabel}`,
        })),
    );
