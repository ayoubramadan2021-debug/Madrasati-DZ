
import type { HealthyFoodItem } from "../exercises-v2/HealthyFoodExerciseV2";

export const LESSON_26_EXERCISE_AUDIO_BASE = "/audio/teachers/khalil/lesson_26_exercises";

export const LESSON_26_EXERCISE_1: HealthyFoodItem[] = [
  {
    title: "أَخْتَارُ العَادَةَ الصِّحِّيَّةَ",
    mission: "غَسْلُ اليَدَيْنِ",
    question: "مَاذَا نَفْعَلُ قَبْلَ الأَكْلِ؟",
    question_audio_key: "ex1_q1",
    scene_image: "/lessons/v2/lesson26-my-health/s2.webp",
    mode: "single",
    correct: "wash",
    options: [
      { id: "wash", label: "نَغْسِلُ أَيْدِيَنَا", emoji: "🧼" },
      { id: "dirty", label: "نَأْكُلُ بِأَيْدٍ مُتَّسِخَةٍ", emoji: "🦠" },
      { id: "run", label: "نَجْرِي دَاخِلَ القِسْمِ", emoji: "🏃" },
    ],
  },
  {
    title: "أَخْتَارُ العَادَةَ الصِّحِّيَّةَ",
    mission: "غِذَاءٌ صِحِّيٌّ",
    question: "مَاذَا نَأْكُلُ لِنَقْوَى وَنَنْمُو؟",
    question_audio_key: "ex1_q2",
    scene_image: "/lessons/v2/lesson26-my-health/s3.webp",
    mode: "single",
    correct: "healthy_food",
    options: [
      { id: "healthy_food", label: "فَوَاكِهُ وَخُضَرٌ", emoji: "🍎" },
      { id: "too_much_sweets", label: "حَلْوَى كَثِيرَةٌ", emoji: "🍭" },
      { id: "soda", label: "مَشْرُوبٌ غَازِيٌّ", emoji: "🥤" },
    ],
  },
  {
    title: "أَخْتَارُ العَادَةَ الصِّحِّيَّةَ",
    mission: "نَظَافَةُ الأَسْنَانِ",
    question: "مَاذَا نَفْعَلُ بَعْدَ الأَكْلِ لِنَحْمِي أَسْنَانَنَا؟",
    question_audio_key: "ex1_q3",
    scene_image: "/lessons/v2/lesson26-my-health/s4.webp",
    mode: "single",
    correct: "brush",
    options: [
      { id: "brush", label: "نُنَظِّفُ الأَسْنَانَ", emoji: "🪥" },
      { id: "sleep", label: "نَنَامُ فَوْرًا", emoji: "😴" },
      { id: "sweets", label: "نَأْكُلُ المَزِيدَ مِنَ الحَلْوَى", emoji: "🍬" },
    ],
  },
  {
    title: "أَخْتَارُ العَادَةَ الصِّحِّيَّةَ",
    mission: "المَاءُ",
    question: "مَاذَا نَشْرَبُ عِنْدَمَا نَعْطَشُ؟",
    question_audio_key: "ex1_q4",
    scene_image: "/lessons/v2/lesson26-my-health/s5.webp",
    mode: "single",
    correct: "water",
    options: [
      { id: "water", label: "مَاءٌ نَظِيفٌ", emoji: "💧" },
      { id: "soda", label: "مَشْرُوبٌ غَازِيٌّ", emoji: "🥤" },
      { id: "nothing", label: "لَا نَشْرَبُ", emoji: "🚫" },
    ],
  },
  {
    title: "أَخْتَارُ العَادَةَ الصِّحِّيَّةَ",
    mission: "الرَّاحَةُ",
    question: "مَاذَا يَحْتَاجُ الجِسْمُ لِيَبْقَى نَشِيطًا؟",
    question_audio_key: "ex1_q5",
    scene_image: "/lessons/v2/lesson26-my-health/s6.webp",
    mode: "single",
    correct: "sleep",
    options: [
      { id: "sleep", label: "نَوْمٌ كَافٍ", emoji: "🌙" },
      { id: "late", label: "السَّهَرُ كَثِيرًا", emoji: "📱" },
      { id: "noise", label: "اللَّعِبُ بِدُونِ رَاحَةٍ", emoji: "⚽" },
    ],
  },
];
