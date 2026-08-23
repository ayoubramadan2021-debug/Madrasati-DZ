import type {
  World3TapTextUnifiedQuestion,
} from "../exercises-v2/World3TapTextActivityAdapterV2";
import {
  LESSON_57_EXERCISES,
} from "./lesson56_58_exercises";

export const LESSON_57_UNIFIED_AUDIO_BASE =
  "/audio/teachers/taline/lesson_57_add_subtract_small_numbers_1/exercises";

const BACKGROUNDS = [
  "/lessons/v2/lesson57/s2.webp",
  "/lessons/v2/lesson57/s3.webp",
  "/lessons/v2/lesson57/s4.webp",
  "/lessons/v2/lesson57/s5.webp"
] as const;
const STAGE_EMOJI = ["🔢", "🧩", "⭐", "🎯"] as const;

export const LESSON_57_MISSION_TITLES: Record<number, string> = {
  1: `${STAGE_EMOJI[0]} التَّمْرِينُ 1`,
  2: `${STAGE_EMOJI[1]} التَّمْرِينُ 2`,
  3: `${STAGE_EMOJI[2]} التَّمْرِينُ 3`,
  4: `${STAGE_EMOJI[3]} التَّمْرِينُ 4`,
};

export const LESSON_57_UNIFIED_QUESTIONS: World3TapTextUnifiedQuestion[] =
  LESSON_57_EXERCISES.flatMap((exercise, stageIndex) =>
    exercise.map((item, itemIndex) => ({
      id: `l57_ex${stageIndex + 1}_q${itemIndex + 1}`,
      mission: stageIndex + 1,
      prompt: item.question,
      audioKey: item.question_audio_key,
      backgroundImage: BACKGROUNDS[stageIndex],
      sourceItem: item,
      stageIndex,
      itemIndex,
      sourceLessonKey: "lesson57",
    })),
  );
