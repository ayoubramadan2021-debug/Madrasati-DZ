import {
  LESSON_2_EXERCISE_1,
  LESSON_2_EXERCISE_1_AUDIO_BASE,
} from "./lesson2_exercise1";
import {
  LESSON_2_EXERCISE_2,
  LESSON_2_EXERCISE_2_AUDIO_BASE,
} from "./lesson2_exercise2";
import {
  LESSON_2_EXERCISE_3,
  LESSON_2_EXERCISE_3_AUDIO_BASE,
} from "./lesson2_exercise3";

import type {
  LegacyActivityQuestionV2,
  LegacyMatchPairV2,
} from "../exercises-v2/LegacyActivityAdapterV2";

export const LESSON_2_UNIFIED_AUDIO_BASE =
  LESSON_2_EXERCISE_1_AUDIO_BASE;

if (
  LESSON_2_EXERCISE_2_AUDIO_BASE !== LESSON_2_UNIFIED_AUDIO_BASE
  || LESSON_2_EXERCISE_3_AUDIO_BASE !== LESSON_2_UNIFIED_AUDIO_BASE
) {
  throw new Error(
    "Lesson 2 exercise audio bases must stay unified.",
  );
}

const exercise1Questions: LegacyActivityQuestionV2[] =
  LESSON_2_EXERCISE_1.map((item, index) => ({
    id: `l2_ex1_q${index + 1}`,
    mission: 1,
    prompt: item.question,
    audioKey: item.question_audio_key,
    answer: item.correct,
    activityKind: "legacy-word-choice",
    sceneImage: item.scene_image,
    wordOptions: item.options,
  }));

const exercise2Questions: LegacyActivityQuestionV2[] =
  LESSON_2_EXERCISE_2.map((item, index) => ({
    id: `l2_ex2_q${index + 1}`,
    mission: 2,
    prompt: item.question,
    audioKey: item.question_audio_key,
    answer: String(item.correct_index),
    activityKind: "legacy-image-choice",
    imageOptions: item.options,
    imageFit: item.image_fit,
  }));

const exercise3Questions: LegacyActivityQuestionV2[] =
  LESSON_2_EXERCISE_3.map((item, index) => ({
    id: `l2_ex3_q${index + 1}`,
    mission: 3,
    prompt: item.question,
    audioKey: item.question_audio_key,
    activityKind: "legacy-drag-match",
    dragPairs: item.pairs as LegacyMatchPairV2[],
  }));

export const LESSON_2_UNIFIED_QUESTIONS:
  LegacyActivityQuestionV2[] = [
    ...exercise1Questions,
    ...exercise2Questions,
    ...exercise3Questions,
  ];

export const LESSON_2_MISSION_TITLES: Record<
  number,
  string
> = {
  1: "أتعرف على المواقع",
  2: "أختار الصورة الصحيحة",
  3: "أربط الموقع بالصورة",
};
