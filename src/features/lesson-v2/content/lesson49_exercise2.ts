import type {
  Lesson49Question,
} from "./lesson49_types";

export const lesson49Exercise2:
  readonly Lesson49Question[] = [
  {
    id: "ex2_q1",
    question:
      "اخْتَرِ الْغِذَاءَ ذَا الْمَصْدَرِ النَّبَاتِيِّ.",
    question_audio_key:
      "ex2_q1_choose_plant_food",

    focusEmoji: "🌱",
    focusLabel: "مَصْدَرٌ نَبَاتِيٌّ",

    options: [
      {
        id: "milk",
        content: "🥛 الْحَلِيبُ",
        ariaLabel: "الحليب",
      },
      {
        id: "apple",
        content: "🍎 التُّفَّاحُ",
        ariaLabel: "التفاح",
      },
      {
        id: "egg",
        content: "🥚 الْبَيْضُ",
        ariaLabel: "البيض",
      },
      {
        id: "fish",
        content: "🐟 السَّمَكُ",
        ariaLabel: "السمك",
      },
    ],

    correctId: "apple",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s4.webp",
  },

  {
    id: "ex2_q2",
    question:
      "اخْتَرِ الْغِذَاءَ ذَا الْمَصْدَرِ الْحَيَوَانِيِّ.",
    question_audio_key:
      "ex2_q2_choose_animal_food",

    focusEmoji: "🐄",
    focusLabel: "مَصْدَرٌ حَيَوَانِيٌّ",

    options: [
      {
        id: "carrot",
        content: "🥕 الْجَزَرُ",
        ariaLabel: "الجزر",
      },
      {
        id: "bread",
        content: "🍞 الْخُبْزُ",
        ariaLabel: "الخبز",
      },
      {
        id: "cheese",
        content: "🧀 الْجُبْنُ",
        ariaLabel: "الجبن",
      },
      {
        id: "olive",
        content: "🫒 الزَّيْتُونُ",
        ariaLabel: "الزيتون",
      },
    ],

    correctId: "cheese",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s4.webp",
  },

  {
    id: "ex2_q3",
    question:
      "أَيُّ غِذَاءٍ مِنَ النَّبَاتَاتِ؟",
    question_audio_key:
      "ex2_q3_food_from_plants",

    focusEmoji: "🌾",
    focusLabel: "غِذَاءٌ مِنَ النَّبَاتَاتِ",

    options: [
      {
        id: "chicken",
        content: "🍗 الدَّجَاجُ",
        ariaLabel: "الدجاج",
      },
      {
        id: "yogurt",
        content: "🥣 الْيَاغُورْتُ",
        ariaLabel: "الياغورت",
      },
      {
        id: "pasta",
        content: "🍝 الْمَعْكَرُونَةُ",
        ariaLabel: "المعكرونة",
      },
      {
        id: "egg",
        content: "🥚 الْبَيْضُ",
        ariaLabel: "البيض",
      },
    ],

    correctId: "pasta",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s3.webp",
  },

  {
    id: "ex2_q4",
    question:
      "أَيُّ غِذَاءٍ نَحْصُلُ عَلَيْهِ مِنَ الْحَيَوَانِ؟",
    question_audio_key:
      "ex2_q4_food_from_animal",

    focusEmoji: "🐔",
    focusLabel: "غِذَاءٌ مِنَ الْحَيَوَانِ",

    options: [
      {
        id: "banana",
        content: "🍌 الْمَوْزُ",
        ariaLabel: "الموز",
      },
      {
        id: "tomato",
        content: "🍅 الطَّمَاطِمُ",
        ariaLabel: "الطماطم",
      },
      {
        id: "olive",
        content: "🫒 الزَّيْتُونُ",
        ariaLabel: "الزيتون",
      },
      {
        id: "egg",
        content: "🥚 الْبَيْضُ",
        ariaLabel: "البيض",
      },
    ],

    correctId: "egg",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s2.webp",
  },
];
