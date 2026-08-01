import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 1 — الدرس 2: تعرّف على المواقع
// نُعيد استخدام صور الـlesson 2 كأسئلة بصرية
// ═══════════════════════════════════════════════════════════════

const OPTIONS = ["أَمَامَ", "وَرَاءَ", "بِجَانِبِ", "مُقَابِلَ"];

export const LESSON_2_EXERCISE_1: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson2-house/scene-2-tv-sofa.webp",
    question: "أَيْنَ التِّلْفَازُ بِالنِّسْبَةِ لِلْأَرِيكَةِ؟",
    question_audio_key: "l2_ex1_q1",
    options: OPTIONS,
    correct: "أَمَامَ",
  },
  {
    scene_image: "/lessons/v2/lesson2-house/scene-3-window-sofa.webp",
    question: "أَيْنَ النَّافِذَةُ بِالنِّسْبَةِ لِلْأَرِيكَةِ؟",
    question_audio_key: "l2_ex1_q2",
    options: OPTIONS,
    correct: "وَرَاءَ",
  },
  {
    scene_image: "/lessons/v2/lesson2-house/scene-4-fridge-oven.webp",
    question: "أَيْنَ الثَّلَّاجَةُ بِالنِّسْبَةِ لِلْفُرْنِ؟",
    question_audio_key: "l2_ex1_q3",
    options: OPTIONS,
    correct: "بِجَانِبِ",
  },
  {
    scene_image: "/lessons/v2/lesson2-house/scene-5-bed-window.webp",
    question: "أَيْنَ السَّرِيرُ بِالنِّسْبَةِ لِلنَّافِذَةِ؟",
    question_audio_key: "l2_ex1_q4",
    options: OPTIONS,
    correct: "مُقَابِلَ",
  },
  // Q5: نفس الصورة الأولى لكن المعكوس
  {
    scene_image: "/lessons/v2/lesson2-house/scene-2-tv-sofa.webp",
    question: "أَيْنَ الْأَرِيكَةُ بِالنِّسْبَةِ لِلتِّلْفَازِ؟",
    question_audio_key: "l2_ex1_q5",
    options: OPTIONS,
    correct: "وَرَاءَ",
  },
];

export const LESSON_2_EXERCISE_1_AUDIO_BASE = "/audio/lesson_2_exercises";
