import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

const OPTIONS = ["مُفِيد", "ضَارّ"];

export const LESSON_7_EXERCISE_3: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson7-care/ex3-wash-fruit.webp",
    question: "غَسْلُ الفَاكِهَةِ قَبْلَ أَكْلِهَا، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex3_q1",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex3-shouting-ear.webp",
    question: "الصُّرَاخُ بِصَوْتٍ عَالٍ قُرْبَ أُذُنِ الآخَرِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex3_q2",
    options: OPTIONS,
    correct: "ضَارّ",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex3-sunglasses.webp",
    question: "وَضْعُ النَّظَّارَةِ الشَّمْسِيَّةِ فِي الشَّمْسِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex3_q3",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex3-hot-touch.webp",
    question: "حَمْلُ قِدْرٍ سَاخِنٍ بِيَدَيْنِ عَارِيَتَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex3_q4",
    options: OPTIONS,
    correct: "ضَارّ",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex3-covering-cough.webp",
    question: "تَغْطِيَةُ الفَمِ بِالمِرْفَقِ عِنْدَ السُّعَالِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex3_q5",
    options: OPTIONS,
    correct: "مُفِيد",
  },
];

export const LESSON_7_EXERCISE_3_AUDIO_BASE = "/audio/lesson_7_exercises";
