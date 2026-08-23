import type {
  UnifiedLessonExerciseQuestionV2,
} from "../exercises-v2/UnifiedLessonExercisesV2";

import { lesson50Exercise1 } from "./lesson50_exercise1";
import { lesson50Exercise2 } from "./lesson50_exercise2";
import { lesson50Exercise3 } from "./lesson50_exercise3";
import { lesson50Exercise4 } from "./lesson50_exercise4";

export type Lesson50UnifiedQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    focusEmoji: string;
    focusLabel: string;
  };

export const LESSON_50_UNIFIED_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_50_games_review/exercises";

export const LESSON_50_MISSION_TITLES:
  Record<number, string> = {
    1: "الْمَهَمَّةُ الْأُولَى: أَتَنَقَّلُ بِالْأَسْهُمِ",
    2: "الْمَهَمَّةُ الثَّانِيَةُ: أَكْتَشِفُ",
    3: "الْمَهَمَّةُ الثَّالِثَةُ: أُرَاجِعُ",
    4: "الْمَهَمَّةُ الرَّابِعَةُ: أُوَظِّفُ",
  };

const EXERCISES = [
  lesson50Exercise1,
  lesson50Exercise2,
  lesson50Exercise3,
  lesson50Exercise4,
] as const;

export const LESSON_50_UNIFIED_QUESTIONS:
  Lesson50UnifiedQuestion[] =
    EXERCISES.flatMap(
      (items, missionIndex) =>
        items.map((item, itemIndex) => ({
          id:
            `l50_m${missionIndex + 1}_${item.id || itemIndex + 1}`,
          mission: missionIndex + 1,
          prompt: item.question,
          audioKey: item.question_audio_key,
          choices: [...item.options] as any,
          answer: item.correctId,
          variant: "text",
          columns: "auto",

          // الخلفية تبقى خلفية الشاشة فقط، وليست صورة النشاط.
          backgroundImage: item.backgroundImage,

          // النشاط الحقيقي للدرس 50 مبرمج بهذه البيانات.
          focusEmoji: item.focusEmoji,
          focusLabel: item.focusLabel,
        })),
    );
