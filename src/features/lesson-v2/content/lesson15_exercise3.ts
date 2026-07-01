import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_15_EXERCISE_3_AUDIO_BASE = "/audio/lesson_15_exercise3";

const CARDS = [
  { id: "first", label: "الأَوَّلُ", icon: "🟥", color: "#ef4444" },
  { id: "second", label: "الثَّانِي", icon: "🟨", color: "#facc15" },
  { id: "third", label: "الثَّالِثُ", icon: "🟦", color: "#3b82f6" },
  { id: "fourth", label: "الرَّابِعُ", icon: "🟩", color: "#22c55e" },
];

export const LESSON_15_EXERCISE_3: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson15-order/s3.webp",
    question_audio_key: "q1",
    title: "بِطَاقَاتٌ مُرَتَّبَةٌ",
    instruction: "مَا الرُّتْبَةُ التَّالِيَةُ؟",
    question: "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الأَوَّلِ؟",
    mode: "nextRank",
    correct: "الثَّانِي",
    visuals: CARDS,
    options: ["الثَّانِي", "الثَّالِثُ", "الرَّابِعُ", "الأَوَّلُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s3.webp",
    question_audio_key: "q2",
    title: "بِطَاقَاتٌ مُرَتَّبَةٌ",
    instruction: "أَكْمِلِ التَّرْتِيبَ.",
    question: "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الثَّانِي؟",
    mode: "nextRank",
    correct: "الثَّالِثُ",
    visuals: CARDS,
    options: ["الأَوَّلُ", "الثَّالِثُ", "الرَّابِعُ", "الثَّانِي"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s3.webp",
    question_audio_key: "q3",
    title: "بِطَاقَاتٌ مُرَتَّبَةٌ",
    instruction: "الرُّتَبُ تَأْتِي بِالتَّرْتِيبِ.",
    question: "مَا الرُّتْبَةُ الَّتِي تَأْتِي بَعْدَ الثَّالِثِ؟",
    mode: "nextRank",
    correct: "الرَّابِعُ",
    visuals: CARDS,
    options: ["الرَّابِعُ", "الثَّانِي", "الأَوَّلُ", "الثَّالِثُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s3.webp",
    question_audio_key: "q4",
    title: "بِطَاقَاتٌ مُرَتَّبَةٌ",
    instruction: "اِبْدَأْ مِنَ الأَوَّلِ ثُمَّ أَكْمِلْ.",
    question: "مَا الرُّتْبَةُ الَّتِي تَسْبِقُ الثَّالِثَ؟",
    mode: "nextRank",
    correct: "الثَّانِي",
    visuals: CARDS,
    options: ["الأَوَّلُ", "الثَّانِي", "الثَّالِثُ", "الرَّابِعُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s3.webp",
    question_audio_key: "q5",
    title: "بِطَاقَاتٌ مُرَتَّبَةٌ",
    instruction: "نَخْتَارُ الرُّتْبَةَ حَسَبَ مَكَانِهَا.",
    question: "مَا الرُّتْبَةُ الأَخِيرَةُ فِي هَذَا التَّرْتِيبِ؟",
    mode: "nextRank",
    correct: "الرَّابِعُ",
    visuals: CARDS,
    options: ["الثَّانِي", "الأَوَّلُ", "الرَّابِعُ", "الثَّالِثُ"],
  },
];
