import type {
  Lesson49Question,
} from "./lesson49_types";

export const lesson49Exercise1:
  readonly Lesson49Question[] = [
  {
    id: "ex1_q1",
    question:
      "مَا مَصْدَرُ الْحَلِيبِ؟",
    question_audio_key:
      "ex1_q1_milk_source",

    focusEmoji: "🥛",
    focusLabel: "الْحَلِيبُ",

    options: [
      {
        id: "plant",
        content: "🌱 مَصْدَرٌ نَبَاتِيٌّ",
        ariaLabel: "مصدر نباتي",
      },
      {
        id: "animal",
        content: "🐄 مَصْدَرٌ حَيَوَانِيٌّ",
        ariaLabel: "مصدر حيواني",
      },
    ],

    correctId: "animal",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s2.webp",
  },

  {
    id: "ex1_q2",
    question:
      "مَا مَصْدَرُ التُّفَّاحِ؟",
    question_audio_key:
      "ex1_q2_apple_source",

    focusEmoji: "🍎",
    focusLabel: "التُّفَّاحُ",

    options: [
      {
        id: "animal",
        content: "🐄 مَصْدَرٌ حَيَوَانِيٌّ",
        ariaLabel: "مصدر حيواني",
      },
      {
        id: "plant",
        content: "🌱 مَصْدَرٌ نَبَاتِيٌّ",
        ariaLabel: "مصدر نباتي",
      },
    ],

    correctId: "plant",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s3.webp",
  },

  {
    id: "ex1_q3",
    question:
      "مَا مَصْدَرُ السَّمَكِ؟",
    question_audio_key:
      "ex1_q3_fish_source",

    focusEmoji: "🐟",
    focusLabel: "السَّمَكُ",

    options: [
      {
        id: "plant",
        content: "🌱 مَصْدَرٌ نَبَاتِيٌّ",
        ariaLabel: "مصدر نباتي",
      },
      {
        id: "animal",
        content: "🐄 مَصْدَرٌ حَيَوَانِيٌّ",
        ariaLabel: "مصدر حيواني",
      },
    ],

    correctId: "animal",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s2.webp",
  },

  {
    id: "ex1_q4",
    question:
      "مَا مَصْدَرُ الْخُبْزِ؟",
    question_audio_key:
      "ex1_q4_bread_source",

    focusEmoji: "🍞",
    focusLabel: "الْخُبْزُ",

    options: [
      {
        id: "animal",
        content: "🐄 مَصْدَرٌ حَيَوَانِيٌّ",
        ariaLabel: "مصدر حيواني",
      },
      {
        id: "plant",
        content: "🌱 مَصْدَرٌ نَبَاتِيٌّ",
        ariaLabel: "مصدر نباتي",
      },
    ],

    correctId: "plant",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s3.webp",
  },
];
