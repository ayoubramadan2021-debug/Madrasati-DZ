// الدرس 12 - التمرين 2: اختر الصندوق الفارغ = 0 (TapSelectImagesV2)
import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

const EMPTY = "/lessons/v2/lesson12-zero/s3.webp";
const THREE = "/lessons/v2/lesson12-zero/s2.webp";
const COMPARE = "/lessons/v2/lesson12-zero/s4.webp";
const BRANCH = "/lessons/v2/lesson12-zero/s5.webp";

export const LESSON_12_EXERCISE_2: TapSelectImageItem[] = [
  { question: "اِخْتَرِ الصُّورَةَ الَّتي عَدَدُ الكُراتِ فيها صِفْرٌ", question_audio_key: "l12_ex2_q1", options: [THREE, EMPTY, COMPARE, BRANCH], correct_index: 1 },
  { question: "اِخْتَرِ الصُّندوقَ الفارِغَ", question_audio_key: "l12_ex2_q2", options: [COMPARE, THREE, EMPTY, BRANCH], correct_index: 2 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتي لا يوجَدُ فَوْقَ الغُصْنِ فيها أَيُّ طائِرٍ", question_audio_key: "l12_ex2_q3", options: [BRANCH, THREE, COMPARE, EMPTY], correct_index: 0 },
  { question: "اِخْتَرِ الصُّندوقَ الَّذي فيهِ كُراتٌ (لَيْسَ صِفْرًا)", question_audio_key: "l12_ex2_q4", options: [EMPTY, THREE, BRANCH, COMPARE], correct_index: 1 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتي تُظْهِرُ الفارِغَ وَالمُمْتَلِئَ مَعًا", question_audio_key: "l12_ex2_q5", options: [THREE, EMPTY, COMPARE, BRANCH], correct_index: 2 },
];

export const LESSON_12_EXERCISE_2_AUDIO_BASE = "/audio/lesson_12_exercises";
