import type { HealthyFoodItem } from "../exercises-v2/HealthyFoodExerciseV2";

export const LESSON_22_EXERCISE_2_AUDIO_BASE = "/audio/teachers/taline/lesson_22_exercises";

export const LESSON_22_EXERCISE_2: HealthyFoodItem[] = [
  {
    title: "أُقَلِّلُ مِنَ السُّكَّرِ",
    mission: "اِخْتَرِ الغِذَاءَ الَّذِي لَا نُكْثِرُ مِنْهُ",
    question: "مَا الغِذَاءُ الَّذِي لَا نُكْثِرُ مِنْهُ",
    question_audio_key: "l22_ex2_q1",
    scene_image: "/lessons/v2/lesson22-food/s4.webp",
    mode: "single",
    correct: "candy",
    options: [
      { id: "apple", label: "تُفَّاحٌ", emoji: "🍎", tone: "healthy" },
      { id: "milk", label: "حَلِيبٌ", emoji: "🥛", tone: "dairy" },
      { id: "candy", label: "حَلْوَى", emoji: "🍬", tone: "sugar" },
      { id: "bread", label: "خُبْزٌ", emoji: "🥖", tone: "grain" },
    ],
  },
  {
    title: "أُقَلِّلُ مِنَ السُّكَّرِ",
    mission: "اِخْتَرِ المَشْرُوبَ الَّذِي نُقَلِّلُ مِنْهُ",
    question: "أَيُّ مَشْرُوبٍ لَا نُكْثِرُ مِنْهُ",
    question_audio_key: "l22_ex2_q2",
    scene_image: "/lessons/v2/lesson22-food/s4.webp",
    mode: "single",
    correct: "soda",
    options: [
      { id: "water", label: "مَاءٌ", emoji: "💧", tone: "water" },
      { id: "milk", label: "حَلِيبٌ", emoji: "🥛", tone: "dairy" },
      { id: "soda", label: "مَشْرُوبٌ غَازِيٌّ", emoji: "🥤", tone: "sugar" },
      { id: "juice", label: "عَصِيرٌ طَبِيعِيٌّ", emoji: "🍊", tone: "healthy" },
    ],
  },
  {
    title: "أُقَلِّلُ مِنَ السُّكَّرِ",
    mission: "اِخْتَرْ مَا قَدْ يُؤْذِي الأَسْنَانَ إِذَا أَكْثَرْنَا مِنْهُ",
    question: "مَا الَّذِي قَدْ يُسَبِّبُ تَسَوُّسَ الأَسْنَانِ",
    question_audio_key: "l22_ex2_q3",
    scene_image: "/lessons/v2/lesson22-food/s5.webp",
    mode: "single",
    correct: "lollipop",
    options: [
      { id: "carrot", label: "جَزَرٌ", emoji: "🥕", tone: "healthy" },
      { id: "fish", label: "سَمَكٌ", emoji: "🐟", tone: "protein" },
      { id: "lollipop", label: "مَصَّاصَةٌ", emoji: "🍭", tone: "sugar" },
      { id: "yogurt", label: "يَاغُورْتٌ", emoji: "🥛", tone: "dairy" },
    ],
  },
  {
    title: "أُقَلِّلُ مِنَ السُّكَّرِ",
    mission: "اِخْتَرْ الطَّعَامَ السُّكَّرِيَّ",
    question: "أَيُّ طَعَامٍ فِيهِ سُكَّرٌ كَثِيرٌ",
    question_audio_key: "l22_ex2_q4",
    scene_image: "/lessons/v2/lesson22-food/s4.webp",
    mode: "single",
    correct: "cake",
    options: [
      { id: "rice", label: "أَرُزٌّ", emoji: "🍚", tone: "grain" },
      { id: "cake", label: "كَعْكٌ", emoji: "🍰", tone: "sugar" },
      { id: "tomato", label: "طَمَاطِمُ", emoji: "🍅", tone: "healthy" },
      { id: "milk", label: "حَلِيبٌ", emoji: "🥛", tone: "dairy" },
    ],
  },
  {
    title: "أُقَلِّلُ مِنَ السُّكَّرِ",
    mission: "اِخْتَرِ السُّلُوكَ الصَّحِيحَ",
    question: "مَاذَا نَفْعَلُ بَعْدَ أَكْلِ الحَلْوَى",
    question_audio_key: "l22_ex2_q5",
    scene_image: "/lessons/v2/lesson22-food/s5.webp",
    mode: "single",
    correct: "brush",
    options: [
      { id: "more", label: "نَأْكُلُ أَكْثَرَ", emoji: "🍬", tone: "sugar" },
      { id: "brush", label: "نُنَظِّفُ الأَسْنَانَ", emoji: "🪥", tone: "healthy" },
      { id: "soda", label: "نَشْرَبُ مَشْرُوبًا غَازِيًا", emoji: "🥤", tone: "sugar" },
      { id: "sleep", label: "نَنَامُ فَوْرًا", emoji: "😴", tone: "sugar" },
    ],
  },
];
