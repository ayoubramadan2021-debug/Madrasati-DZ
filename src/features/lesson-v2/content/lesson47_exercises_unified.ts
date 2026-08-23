import type {
  UnifiedLessonExerciseQuestionV2,
} from "../exercises-v2/UnifiedLessonExercisesV2";

import {
  answerOptionsFor,
  correctAnswerId,
} from "../exercises-v2/GridNavigationExerciseV2";

import type {
  GridNavigationItem,
} from "./lesson47_types";

import { lesson47Exercise1 } from "./lesson47_exercise1";
import { lesson47Exercise2 } from "./lesson47_exercise2";
import { lesson47Exercise3 } from "./lesson47_exercise3";
import { lesson47Exercise4 } from "./lesson47_exercise4";

export type Lesson47UnifiedQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    gridItem: GridNavigationItem;
  };

export const LESSON_47_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_47_grid_navigation/exercises";

const missions: Array<{
  mission: number;
  title: string;
  items: GridNavigationItem[];
}> = [
  {
    mission: 1,
    title: "المَهَمَّةُ الأُولَى: أُحَدِّدُ الِاتِّجَاهَ",
    items: lesson47Exercise1,
  },
  {
    mission: 2,
    title: "المَهَمَّةُ الثَّانِيَةُ: أَمْشِي مَعَ الأَسْهُمِ",
    items: lesson47Exercise2,
  },
  {
    mission: 3,
    title: "المَهَمَّةُ الثَّالِثَةُ: أَيْنَ أَتَحَرَّكُ؟",
    items: lesson47Exercise3,
  },
  {
    mission: 4,
    title: "المَهَمَّةُ الرَّابِعَةُ: أَقْرَأُ الطَّرِيقَ بِالأَرْقَامِ",
    items: lesson47Exercise4,
  },
];

export const LESSON_47_MISSION_TITLES:
  Record<number, string> = Object.fromEntries(
    missions.map(({ mission, title }) => [mission, title]),
  );

export const LESSON_47_UNIFIED_QUESTIONS:
  Lesson47UnifiedQuestion[] = missions.flatMap(
    ({ mission, items }) =>
      items.map((item) => ({
        id: item.id,
        mission,
        prompt: item.question,
        audioKey: item.question_audio_key,
        choices: answerOptionsFor(item),
        answer: correctAnswerId(item),
        gridItem: item,
      })),
  );
