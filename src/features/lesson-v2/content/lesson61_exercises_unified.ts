import type {
  LegacyActivityQuestionV2,
} from "../exercises-v2/LegacyActivityAdapterV2";

import {
  LESSON_61_EXERCISE_1,
  LESSON_61_EXERCISE_2,
  LESSON_61_EXERCISE_3,
  LESSON_61_EXERCISE_4,
} from "./lesson61_exercises";

export const LESSON_61_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_61_plants_with_us_1/exercises";

const missions = [
  {
    mission: 1,
    title: "🌍 التَّمْرِينُ 1",
    backgroundImage:
      "/lessons/v2/lesson61-plants-with-us-1/s1.webp",
    items: LESSON_61_EXERCISE_1,
  },
  {
    mission: 2,
    title: "🌳 التَّمْرِينُ 2",
    backgroundImage:
      "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
    items: LESSON_61_EXERCISE_2,
  },
  {
    mission: 3,
    title: "🌿 التَّمْرِينُ 3",
    backgroundImage:
      "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
    items: LESSON_61_EXERCISE_3,
  },
  {
    mission: 4,
    title: "🌱 التَّمْرِينُ 4",
    backgroundImage:
      "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
    items: LESSON_61_EXERCISE_4,
  },
];

export const LESSON_61_MISSION_TITLES:
  Record<number, string> = Object.fromEntries(
    missions.map((item) => [
      item.mission,
      item.title,
    ]),
  );

export const LESSON_61_UNIFIED_QUESTIONS:
  LegacyActivityQuestionV2[] = missions.flatMap(
    (mission) =>
      mission.items.map((item, index) => ({
        id: `l61_ex${mission.mission}_q${index + 1}`,
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
