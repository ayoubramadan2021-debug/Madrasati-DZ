
import type { HealthyFoodItem } from "../exercises-v2/HealthyFoodExerciseV2";
import { LESSON_26_EXERCISE_AUDIO_BASE } from "./lesson26_exercise1";

export { LESSON_26_EXERCISE_AUDIO_BASE };

export const LESSON_26_EXERCISE_3: HealthyFoodItem[] = [
  {
    title: "أَخْتَارُ كُلَّ الصَّحِيحِ",
    mission: "عَادَاتٌ تَحْمِي صِحَّتِي",
    question: "اِخْتَرْ كُلَّ مَا يُسَاعِدُكَ عَلَى العِنَايَةِ بِصِحَّتِكَ.",
    question_audio_key: "ex3_q1",
    scene_image: "/lessons/v2/lesson26-my-health/s1.webp",
    mode: "multi",
    correct: ["wash", "brush", "water"],
    options: [
      { id: "wash", label: "غَسْلُ اليَدَيْنِ", emoji: "🧼" },
      { id: "brush", label: "تَنْظِيفُ الأَسْنَانِ", emoji: "🪥" },
      { id: "water", label: "شُرْبُ المَاءِ", emoji: "💧" },
      { id: "dirty", label: "تَرْكُ الأَوْسَاخِ", emoji: "🦠" },
    ],
  },
  {
    title: "أَخْتَارُ كُلَّ الصَّحِيحِ",
    mission: "غِذَاءٌ مُفِيدٌ",
    question: "اِخْتَرْ الأَغْذِيَةَ المُفِيدَةَ لِلجِسْمِ.",
    question_audio_key: "ex3_q2",
    scene_image: "/lessons/v2/lesson26-my-health/s3.webp",
    mode: "multi",
    correct: ["fruit", "milk", "vegetables"],
    options: [
      { id: "fruit", label: "فَوَاكِهُ", emoji: "🍎" },
      { id: "milk", label: "حَلِيبٌ", emoji: "🥛" },
      { id: "vegetables", label: "خُضَرٌ", emoji: "🥕" },
      { id: "soda", label: "مَشْرُوبٌ غَازِيٌّ", emoji: "🥤" },
    ],
  },
  {
    title: "أَخْتَارُ كُلَّ الصَّحِيحِ",
    mission: "أَدَوَاتُ النَّظَافَةِ",
    question: "اِخْتَرْ أَدَوَاتِ النَّظَافَةِ.",
    question_audio_key: "ex3_q3",
    scene_image: "/lessons/v2/lesson26-my-health/s4.webp",
    mode: "multi",
    correct: ["soap", "brush", "towel"],
    options: [
      { id: "soap", label: "صَابُونٌ", emoji: "🧼" },
      { id: "brush", label: "فُرْشَاةُ أَسْنَانٍ", emoji: "🪥" },
      { id: "towel", label: "مِنْشَفَةٌ", emoji: "🧻" },
      { id: "candy", label: "حَلْوَى", emoji: "🍬" },
    ],
  },
  {
    title: "أَخْتَارُ كُلَّ الصَّحِيحِ",
    mission: "أَحْمِي جِسْمِي",
    question: "اِخْتَرْ مَا يُسَاعِدُ الجِسْمَ عَلَى النَّشَاطِ.",
    question_audio_key: "ex3_q4",
    scene_image: "/lessons/v2/lesson26-my-health/s5.webp",
    mode: "multi",
    correct: ["sport", "sleep", "water"],
    options: [
      { id: "sport", label: "الحَرَكَةُ وَاللَّعِبُ", emoji: "⚽" },
      { id: "sleep", label: "النَّوْمُ المُبَكِّرُ", emoji: "🌙" },
      { id: "water", label: "شُرْبُ المَاءِ", emoji: "💧" },
      { id: "late", label: "السَّهَرُ كَثِيرًا", emoji: "📱" },
    ],
  },
  {
    title: "أَخْتَارُ كُلَّ الصَّحِيحِ",
    mission: "صِحَّتِي كُلَّ يَوْمٍ",
    question: "اِخْتَرْ ثَلَاثَ عَادَاتٍ صِحِّيَّةٍ.",
    question_audio_key: "ex3_q5",
    scene_image: "/lessons/v2/lesson26-my-health/s6.webp",
    mode: "multi",
    correct: ["wash", "healthy_food", "brush"],
    options: [
      { id: "wash", label: "أَغْسِلُ يَدَيَّ", emoji: "🧼" },
      { id: "healthy_food", label: "آكُلُ غِذَاءً مُفِيدًا", emoji: "🍎" },
      { id: "brush", label: "أُنَظِّفُ أَسْنَانِي", emoji: "🪥" },
      { id: "dirty", label: "أَتْرُكُ الأَوْسَاخَ", emoji: "🦠" },
    ],
  },
];
