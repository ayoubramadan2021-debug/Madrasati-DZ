import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_15_EXERCISE_1_AUDIO_BASE = "/audio/lesson_15_exercise1";

const TRAIN = [
  { id: "red", label: "الأُولَى", icon: "🚃", color: "#ef4444" },
  { id: "yellow", label: "الثَّانِيَةُ", icon: "🚃", color: "#facc15" },
  { id: "blue", label: "الثَّالِثَةُ", icon: "🚃", color: "#3b82f6" },
  { id: "green", label: "الرَّابِعَةُ", icon: "🚃", color: "#22c55e" },
  { id: "orange", label: "الخَامِسَةُ", icon: "🚃", color: "#f97316" },
  { id: "purple", label: "السَّادِسَةُ", icon: "🚃", color: "#8b5cf6" },
];

export const LESSON_15_EXERCISE_1: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson15-order/s2.webp",
    question_audio_key: "q1",
    title: "أَعُدُّ القَاطِرَاتِ",
    instruction: "اِبْدَأْ مِنَ اليَمِينِ، ثُمَّ اخْتَرْ.",
    question: "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الرَّابِعَةِ؟",
    mode: "pickObject",
    correct: "green",
    visuals: TRAIN,
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s2.webp",
    question_audio_key: "q2",
    title: "أَعُدُّ القَاطِرَاتِ",
    instruction: "اِعْدُدْ بِهُدُوءٍ مِنَ اليَمِينِ.",
    question: "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الثَّانِيَةِ؟",
    mode: "pickObject",
    correct: "yellow",
    visuals: TRAIN,
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s2.webp",
    question_audio_key: "q3",
    title: "أَعُدُّ القَاطِرَاتِ",
    instruction: "الأَوَّلُ هُوَ بِدَايَةُ التَّرْتِيبِ.",
    question: "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الأُولَى؟",
    mode: "pickObject",
    correct: "red",
    visuals: TRAIN,
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s2.webp",
    question_audio_key: "q4",
    title: "أَعُدُّ القَاطِرَاتِ",
    instruction: "كُلَّمَا تَقَدَّمْنَا زَادَتِ الرُّتْبَةُ.",
    question: "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ الخَامِسَةِ؟",
    mode: "pickObject",
    correct: "orange",
    visuals: TRAIN,
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s2.webp",
    question_audio_key: "q5",
    title: "أَعُدُّ القَاطِرَاتِ",
    instruction: "اِعْدُدْ حَتَّى تَصِلَ إِلَى الرُّتْبَةِ.",
    question: "أَيُّ عَرَبَةٍ فِي الرُّتْبَةِ السَّادِسَةِ؟",
    mode: "pickObject",
    correct: "purple",
    visuals: TRAIN,
  },
];
