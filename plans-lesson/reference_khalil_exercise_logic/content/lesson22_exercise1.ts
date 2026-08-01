import type { HealthyFoodItem } from "../exercises-v2/HealthyFoodExerciseV2";

export const LESSON_22_EXERCISE_1_AUDIO_BASE = "/audio/teachers/taline/lesson_22_exercises";

export const LESSON_22_EXERCISE_1: HealthyFoodItem[] = [
  {
    title: "أَخْتَارُ غِذَاءً مُفِيدًا",
    mission: "اِخْتَرِ الغِذَاءَ الَّذِي يُسَاعِدُ جِسْمَنَا",
    question: "أَيُّ غِذَاءٍ يُفِيدُ جِسْمَنَا",
    question_audio_key: "l22_ex1_q1",
    scene_image: "/lessons/v2/lesson22-food/s2.webp",
    mode: "single",
    correct: "apple",
    options: [
      { id: "cake", label: "كَعْكٌ", emoji: "🍰", tone: "sugar" },
      { id: "apple", label: "تُفَّاحَةٌ", emoji: "🍎", tone: "healthy" },
      { id: "soda", label: "مَشْرُوبٌ سُكَّرِيٌّ", emoji: "🥤", tone: "sugar" },
      { id: "candy", label: "حَلْوَى", emoji: "🍬", tone: "sugar" },
    ],
  },
  {
    title: "أَخْتَارُ غِذَاءً مُفِيدًا",
    mission: "اِخْتَرْ غِذَاءً مِنَ الخُضَرِ",
    question: "أَيُّ غِذَاءٍ مِنَ الخُضَرِ",
    question_audio_key: "l22_ex1_q2",
    scene_image: "/lessons/v2/lesson22-food/s2.webp",
    mode: "single",
    correct: "carrot",
    options: [
      { id: "donut", label: "حَلْقَةُ حَلْوَى", emoji: "🍩", tone: "sugar" },
      { id: "chocolate", label: "شُوكُولَاطَةٌ", emoji: "🍫", tone: "sugar" },
      { id: "carrot", label: "جَزَرٌ", emoji: "🥕", tone: "healthy" },
      { id: "soda", label: "مَشْرُوبٌ غَازِيٌّ", emoji: "🥤", tone: "sugar" },
    ],
  },
  {
    title: "أَخْتَارُ غِذَاءً مُفِيدًا",
    mission: "اِخْتَرْ غِذَاءً يَمُدُّ الجِسْمَ بِالقُوَّةِ",
    question: "أَيُّ غِذَاءٍ يُسَاعِدُ عَلَى القُوَّةِ وَالنَّشَاطِ",
    question_audio_key: "l22_ex1_q3",
    scene_image: "/lessons/v2/lesson22-food/s3.webp",
    mode: "single",
    correct: "fish",
    options: [
      { id: "fish", label: "سَمَكٌ", emoji: "🐟", tone: "protein" },
      { id: "lollipop", label: "مَصَّاصَةٌ", emoji: "🍭", tone: "sugar" },
      { id: "cake", label: "حَلْوَى", emoji: "🧁", tone: "sugar" },
      { id: "soda", label: "مَشْرُوبٌ سُكَّرِيٌّ", emoji: "🥤", tone: "sugar" },
    ],
  },
  {
    title: "أَخْتَارُ غِذَاءً مُفِيدًا",
    mission: "اِخْتَرْ غِذَاءً مِنَ الحَلِيبِ وَمُشْتَقَّاتِهِ",
    question: "أَيُّ غِذَاءٍ مِنْ مُشْتَقَّاتِ الحَلِيبِ",
    question_audio_key: "l22_ex1_q4",
    scene_image: "/lessons/v2/lesson22-food/s2.webp",
    mode: "single",
    correct: "yogurt",
    options: [
      { id: "candy", label: "حَلْوَى", emoji: "🍬", tone: "sugar" },
      { id: "chips", label: "رَقَائِقُ مَالِحَةٌ", emoji: "🍟", tone: "sugar" },
      { id: "yogurt", label: "يَاغُورْتٌ", emoji: "🥛", tone: "dairy" },
      { id: "cookie", label: "بِسْكَوِيتٌ", emoji: "🍪", tone: "sugar" },
    ],
  },
  {
    title: "أَخْتَارُ غِذَاءً مُفِيدًا",
    mission: "اِخْتَرْ غِذَاءً صِحِّيًا لِلفُطُورِ",
    question: "أَيُّ غِذَاءٍ أَفْضَلُ لِصِحَّتِنَا",
    question_audio_key: "l22_ex1_q5",
    scene_image: "/lessons/v2/lesson22-food/s1.webp",
    mode: "single",
    correct: "bread_milk",
    options: [
      { id: "soda_cake", label: "مَشْرُوبٌ وَحَلْوَى", emoji: "🥤", tone: "sugar" },
      { id: "bread_milk", label: "خُبْزٌ وَحَلِيبٌ", emoji: "🥖", tone: "grain" },
      { id: "candy", label: "حَلْوَى كَثِيرَةٌ", emoji: "🍬", tone: "sugar" },
      { id: "chocolate", label: "شُوكُولَاطَةٌ", emoji: "🍫", tone: "sugar" },
    ],
  },
];
