import type {
  LegacyActivityQuestionV2,
} from "../exercises-v2/LegacyActivityAdapterV2";

import {
  LESSON_58_EXERCISE_1,
} from "./lesson58_exercise1";
import {
  LESSON_58_EXERCISE_2,
} from "./lesson58_exercise2";
import {
  LESSON_58_EXERCISE_3,
} from "./lesson58_exercise3";
import {
  LESSON_58_EXERCISE_4,
} from "./lesson58_exercise4";

export const LESSON_58_UNIFIED_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_58_animals_with_us_2/exercises-images";

const missions = [
  {
    mission: 1,
    title: "🌿 تمرين الحيوانات 1",
    backgroundImage: "/lessons/v2/lesson58/s2.webp",
    items: LESSON_58_EXERCISE_1,
  },
  {
    mission: 2,
    title: "🦁 تمرين الحيوانات 2",
    backgroundImage: "/lessons/v2/lesson58/s3.webp",
    items: LESSON_58_EXERCISE_2,
  },
  {
    mission: 3,
    title: "🥚 تمرين الحيوانات 3",
    backgroundImage: "/lessons/v2/lesson58/s4.webp",
    items: LESSON_58_EXERCISE_3,
  },
  {
    mission: 4,
    title: "🐣 تمرين الحيوانات 4",
    backgroundImage: "/lessons/v2/lesson58/s5.webp",
    items: LESSON_58_EXERCISE_4,
  },
];

export const LESSON_58_MISSION_TITLES:
  Record<number, string> = Object.fromEntries(
    missions.map((item) => [
      item.mission,
      item.title,
    ]),
  );

export const LESSON_58_UNIFIED_QUESTIONS:
  LegacyActivityQuestionV2[] = missions.flatMap(
    (mission) =>
      mission.items.map((item, index) => ({
        id: `l58_ex${mission.mission}_q${index + 1}`,
        mission: mission.mission,
        prompt: item.question,
        audioKey: item.question_audio_key,
        answer: String(item.correct_index),
        activityKind: "legacy-image-choice",
        imageOptions: item.options,
        imageFit: item.image_fit,
        backgroundImage: mission.backgroundImage,
      })),
  );
