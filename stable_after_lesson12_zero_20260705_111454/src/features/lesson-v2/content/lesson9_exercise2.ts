// الدرس 9 - التمرين 2: اختر الصورة المطابقة للوصف (TapSelectImagesV2)
import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

const S2 = "/lessons/v2/lesson9-playground/s2.webp";
const S3 = "/lessons/v2/lesson9-playground/s3.webp";
const S4 = "/lessons/v2/lesson9-playground/s4.webp";
const S5 = "/lessons/v2/lesson9-playground/s5.webp";

export const LESSON_9_EXERCISE_2: TapSelectImageItem[] = [
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا العَصافيرُ أَعْلى الشَّجَرَةِ", question_audio_key: "l9_ex2_q1", options: [S2, S4, S3, S5], correct_index: 1 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الكُرَةُ عَلى المَقْعَدِ", question_audio_key: "l9_ex2_q2", options: [S3, S5, S2, S4], correct_index: 0 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا العُشُّ أَسْفَلَ الشَّجَرَةِ", question_audio_key: "l9_ex2_q3", options: [S4, S2, S5, S3], correct_index: 2 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا طِفْلٌ فَوْقَ الزَّحْلوقَةِ", question_audio_key: "l9_ex2_q4", options: [S5, S3, S4, S2], correct_index: 3 },
  { question: "تَحَدِّي. اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا شَيْءٌ أَعْلى شَيْءٍ آخَر", question_audio_key: "l9_ex2_q5", options: [S3, S4, S5, S2], correct_index: 1 },
];

export const LESSON_9_EXERCISE_2_AUDIO_BASE = "/audio/lesson_9_exercises";
