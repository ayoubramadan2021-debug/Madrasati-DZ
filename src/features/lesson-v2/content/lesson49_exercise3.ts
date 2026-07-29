import type {
  Lesson49Question,
} from "./lesson49_types";

export const lesson49Exercise3:
  readonly Lesson49Question[] = [
  {
    id: "ex3_q1",
    question:
      "اخْتَرِ الْوَجْبَةَ الصِّحِّيَّةَ وَالْمُتَوَازِنَةَ.",
    question_audio_key:
      "ex3_q1_choose_balanced_meal",

    focusEmoji: "🍽️",
    focusLabel: "قَارِنْ بَيْنَ الْوَجَبَاتِ",

    options: [
      {
        id: "sweets",
        content:
          "🍩 حَلْوَيَاتٌ وَمَشْرُوبٌ سُكَّرِيٌّ",
        ariaLabel:
          "حلويات ومشروب سكري",
      },
      {
        id: "balanced",
        content:
          "🥗 خُضْرَوَاتٌ وَخُبْزٌ وَدَجَاجٌ وَفَاكِهَةٌ وَمَاءٌ",
        ariaLabel:
          "وجبة متوازنة",
      },
      {
        id: "bread",
        content:
          "🍞 خُبْزٌ وَمُرَبًّى فَقَطْ",
        ariaLabel:
          "خبز ومربى فقط",
      },
    ],

    correctId: "balanced",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s5.webp",
  },

  {
    id: "ex3_q2",
    question:
      "مَا الْمَشْرُوبُ الصِّحِّيُّ مَعَ الْوَجْبَةِ؟",
    question_audio_key:
      "ex3_q2_choose_healthy_drink",

    focusEmoji: "🥤",
    focusLabel: "اخْتَرِ الْمَشْرُوبَ الصِّحِّيَّ",

    options: [
      {
        id: "water",
        content: "💧 الْمَاءُ",
        ariaLabel: "الماء",
      },
      {
        id: "soda",
        content: "🥤 مَشْرُوبٌ غَازِيٌّ",
        ariaLabel: "مشروب غازي",
      },
      {
        id: "energy",
        content: "🧃 مَشْرُوبٌ كَثِيرُ السُّكَّرِ",
        ariaLabel:
          "مشروب كثير السكر",
      },
    ],

    correctId: "water",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s5.webp",
  },

  {
    id: "ex3_q3",
    question:
      "اخْتَرِ التَّحْلِيَةَ الصِّحِّيَّةَ.",
    question_audio_key:
      "ex3_q3_choose_healthy_dessert",

    focusEmoji: "🍓",
    focusLabel: "تَحْلِيَةٌ صِحِّيَّةٌ",

    options: [
      {
        id: "fruit",
        content: "🍎 فَاكِهَةٌ طَازَجَةٌ",
        ariaLabel:
          "فاكهة طازجة",
      },
      {
        id: "candy",
        content: "🍬 حَلْوَى",
        ariaLabel: "حلوى",
      },
      {
        id: "cake",
        content: "🍰 قِطْعَةُ كَعْكٍ كَبِيرَةٌ",
        ariaLabel:
          "قطعة كعك كبيرة",
      },
    ],

    correctId: "fruit",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s5.webp",
  },

  {
    id: "ex3_q4",
    question:
      "أَيُّ غَدَاءٍ أَكْثَرُ تَوَازُنًا؟",
    question_audio_key:
      "ex3_q4_choose_best_lunch",

    focusEmoji: "🍱",
    focusLabel: "غَدَاءُ مُنْتَصَفِ النَّهَارِ",

    options: [
      {
        id: "fries",
        content:
          "🍟 بَطَاطَا مَقْلِيَّةٌ وَمَشْرُوبٌ سُكَّرِيٌّ",
        ariaLabel:
          "بطاطا مقلية ومشروب سكري",
      },
      {
        id: "balanced",
        content:
          "🐟 سَمَكٌ وَخُضْرَوَاتٌ وَخُبْزٌ وَمَاءٌ",
        ariaLabel:
          "سمك وخضروات وخبز وماء",
      },
      {
        id: "candy",
        content:
          "🍭 حَلْوَيَاتٌ فَقَطْ",
        ariaLabel:
          "حلويات فقط",
      },
    ],

    correctId: "balanced",

    backgroundImage:
      "/lessons/v2/lesson49-food-sources/s5.webp",
  },
];
