import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 2 — الدرس 2: اختر الصورة المطابقة للوصف
// ═══════════════════════════════════════════════════════════════

const SCENE_2 = "/lessons/v2/lesson2-house/scene-2-tv-sofa.webp";
const SCENE_3 = "/lessons/v2/lesson2-house/scene-3-window-sofa.webp";
const SCENE_4 = "/lessons/v2/lesson2-house/scene-4-fridge-oven.webp";
const SCENE_5 = "/lessons/v2/lesson2-house/scene-5-bed-window.webp";

export const LESSON_2_EXERCISE_2: TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا التِّلْفَازُ أَمَامَ الْأَرِيكَةِ",
    question_audio_key: "l2_ex2_q1",
    options: [SCENE_3, SCENE_2, SCENE_4, SCENE_5],
    correct_index: 1,
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا النَّافِذَةُ وَرَاءَ الْأَرِيكَةِ",
    question_audio_key: "l2_ex2_q2",
    options: [SCENE_2, SCENE_5, SCENE_3, SCENE_4],
    correct_index: 2,
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الثَّلَّاجَةُ بِجَانِبْ الْفُرْنِ",
    question_audio_key: "l2_ex2_q3",
    options: [SCENE_5, SCENE_4, SCENE_2, SCENE_3],
    correct_index: 1,
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا السَّرِيرُ مُقَابِلَ النَّافِذَةِ",
    question_audio_key: "l2_ex2_q4",
    options: [SCENE_4, SCENE_3, SCENE_5, SCENE_2],
    correct_index: 2,
  },
  {
    question: "تَحَدِّي. اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا شَيْءٌ مُقَابِلَ شَيْءٍ آخَر",
    question_audio_key: "l2_ex2_q5",
    options: [SCENE_2, SCENE_4, SCENE_5, SCENE_3],
    correct_index: 2,
  },
];

export const LESSON_2_EXERCISE_2_AUDIO_BASE = "/audio/lesson_2_exercises";
