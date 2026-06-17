import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

const OPTIONS = ["مُفِيد", "ضَارّ"];

export const LESSON_7_EXERCISE_2: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson7-care/ex2-reading-light.webp",
    question: "القِرَاءَةُ فِي إِضَاءَةٍ جَيِّدَةٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex2_q1",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex2-screen-too-close.webp",
    question: "تَقْرِيبُ الوَجْهِ كَثِيراً مِنَ الشَّاشَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex2_q2",
    options: OPTIONS,
    correct: "ضَارّ",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex2-clean-ears.webp",
    question: "تَنْظِيفُ الأُذُنِ بِلُطْفٍ بَعْدَ الاِسْتِحْمَامِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex2_q3",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex2-spoiled-food.webp",
    question: "أَكْلُ طَعَامٍ فَاسِدٍ مُتَعَفِّنٍ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex2_q4",
    options: OPTIONS,
    correct: "ضَارّ",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex2-healthy-food.webp",
    question: "أَكْلُ الفَوَاكِهِ وَالخُضَرِ الطَّازَجَةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex2_q5",
    options: OPTIONS,
    correct: "مُفِيد",
  },
];

export const LESSON_7_EXERCISE_2_AUDIO_BASE = "/audio/lesson_7_exercises";
