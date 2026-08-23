import type {
  World3TapTextUnifiedQuestion,
} from "../exercises-v2/World3TapTextActivityAdapterV2";
import {
  LESSON_56_EXERCISES,
} from "./lesson56_58_exercises";

export const LESSON_56_UNIFIED_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_56_numbers_to_39_2/exercises";

const BACKGROUNDS = [
  "/lessons/v2/lesson56/s2.webp",
  "/lessons/v2/lesson56/s3.webp",
  "/lessons/v2/lesson56/s4.webp",
  "/lessons/v2/lesson56/s6.webp"
] as const;
const STAGE_EMOJI = ["🔢", "🧩", "⭐", "🎯"] as const;

export const LESSON_56_MISSION_TITLES: Record<number, string> = {
  1: `${STAGE_EMOJI[0]} التَّمْرِينُ 1`,
  2: `${STAGE_EMOJI[1]} التَّمْرِينُ 2`,
  3: `${STAGE_EMOJI[2]} التَّمْرِينُ 3`,
  4: `${STAGE_EMOJI[3]} التَّمْرِينُ 4`,
};

export const LESSON_56_UNIFIED_QUESTIONS: World3TapTextUnifiedQuestion[] =
  LESSON_56_EXERCISES.flatMap((exercise, stageIndex) =>
    exercise.map((item, itemIndex) => ({
      id: `l56_ex${stageIndex + 1}_q${itemIndex + 1}`,
      mission: stageIndex + 1,
      prompt: item.question,
      audioKey: item.question_audio_key,
      backgroundImage: BACKGROUNDS[stageIndex],
      sourceItem: item,
      stageIndex,
      itemIndex,
      sourceLessonKey: "lesson56",
    })),
  );
