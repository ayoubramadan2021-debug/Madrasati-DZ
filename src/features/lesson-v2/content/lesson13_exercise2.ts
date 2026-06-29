import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

const S2 = "/lessons/v2/lesson13-counting/s2.webp"; // 3 مكعبات
const S3 = "/lessons/v2/lesson13-counting/s3.webp"; // 5 كرات
const S4 = "/lessons/v2/lesson13-counting/s4.webp"; // 8 لُعَبٍ
const S5 = "/lessons/v2/lesson13-counting/s5.webp"; // 10 بالونات

export const LESSON_13_EXERCISE_2: TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا ثَلَاثَةُ مُكَعَّبَاتٍ.",
    question_audio_key: "l13_ex2_q1",
    options: [S5, S2, S4, S3],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا خَمْسُ كُرَاتٍ.",
    question_audio_key: "l13_ex2_q2",
    options: [S4, S3, S2, S5],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا ثَمَانِي لُعَبٍَ.",
    question_audio_key: "l13_ex2_q3",
    options: [S2, S5, S4, S3],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا عَشَرَةُ بَالُونَاتٍ.",
    question_audio_key: "l13_ex2_q4",
    options: [S3, S4, S5, S2],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا أَكْبَرُ عَدَدٍ.",
    question_audio_key: "l13_ex2_q5",
    options: [S2, S3, S4, S5],
    correct_index: 3,
    image_fit: "contain",
  },
];

export const LESSON_13_EXERCISE_2_AUDIO_BASE =
  "/audio/lesson_13_exercises";
