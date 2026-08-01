import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_15_EXERCISE_2_AUDIO_BASE = "/audio/lesson_15_exercise2";

const CARS = [
  { id: "red", label: "الأُولَى", icon: "🏎️", color: "#ef4444" },
  { id: "blue", label: "الثَّانِيَةُ", icon: "🚗", color: "#3b82f6" },
  { id: "yellow", label: "الثَّالِثَةُ", icon: "🚕", color: "#facc15" },
  { id: "green", label: "الرَّابِعَةُ", icon: "🚙", color: "#22c55e" },
];

export const LESSON_15_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson15-order/s4.webp",
    question_audio_key: "q1",
    title: "سِبَاقُ السَّيَّارَاتِ",
    instruction: "اِخْتَرْ رُتْبَةَ السَّيَّارَةِ.",
    question: "مَا رُتْبَةُ السَّيَّارَةِ الحَمْرَاءِ؟",
    mode: "pickRank",
    correct: "الأُولَى",
    visuals: CARS,
    options: ["الأُولَى", "الثَّانِيَةُ", "الثَّالِثَةُ", "الرَّابِعَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s4.webp",
    question_audio_key: "q2",
    title: "سِبَاقُ السَّيَّارَاتِ",
    instruction: "انْظُرْ إِلَى مَكَانِ السَّيَّارَةِ.",
    question: "مَا رُتْبَةُ السَّيَّارَةِ الزَّرْقَاءِ؟",
    mode: "pickRank",
    correct: "الثَّانِيَةُ",
    visuals: CARS,
    options: ["الأُولَى", "الثَّانِيَةُ", "الثَّالِثَةُ", "الرَّابِعَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s4.webp",
    question_audio_key: "q3",
    title: "سِبَاقُ السَّيَّارَاتِ",
    instruction: "نَعْرِفُ الرُّتْبَةَ بِالعَدِّ.",
    question: "مَا رُتْبَةُ السَّيَّارَةِ الخَضْرَاءِ؟",
    mode: "pickRank",
    correct: "الرَّابِعَةُ",
    visuals: CARS,
    options: ["الأُولَى", "الثَّانِيَةُ", "الثَّالِثَةُ", "الرَّابِعَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s4.webp",
    question_audio_key: "q4",
    title: "سِبَاقُ السَّيَّارَاتِ",
    instruction: "اِعْدُدِ السَّيَّارَاتِ مِنَ الأَوَّلِ.",
    question: "مَا رُتْبَةُ السَّيَّارَةِ الصَّفْرَاءِ؟",
    mode: "pickRank",
    correct: "الثَّالِثَةُ",
    visuals: CARS,
    options: ["الأُولَى", "الثَّانِيَةُ", "الثَّالِثَةُ", "الرَّابِعَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson15-order/s4.webp",
    question_audio_key: "q5",
    title: "سِبَاقُ السَّيَّارَاتِ",
    instruction: "الرُّتْبَةُ تَدُلُّ عَلَى المَكَانِ فِي التَّرْتِيبِ.",
    question: "مَا رُتْبَةُ السَّيَّارَةِ الأَخِيرَةِ؟",
    mode: "pickRank",
    correct: "الرَّابِعَةُ",
    visuals: CARS,
    options: ["الأُولَى", "الثَّانِيَةُ", "الثَّالِثَةُ", "الرَّابِعَةُ"],
  },
];
