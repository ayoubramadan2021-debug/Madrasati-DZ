import type {
  Lesson30CompositionChoiceItem,
} from "../exercises-v2/lesson30/Lesson30CompositionChoiceEngineV2";

export const LESSON_30_EXERCISE_2:
  Lesson30CompositionChoiceItem[] = [
  {
    question:
      "أَيُّ كِتَابَةٍ تُمَثِّلُ أَرْبَعَ تُفَّاحَاتٍ حَمْرَاءَ وَسِتَّ تُفَّاحَاتٍ خَضْرَاءَ؟",

    question_audio_key: "ex2_q1",

    reference: {
      leftCount: 4,
      rightCount: 6,

      leftEmoji: "🍎",
      rightEmoji: "🍏",

      leftLabel:
        "أَرْبَعُ تُفَّاحَاتٍ",

      rightLabel:
        "سِتُّ تُفَّاحَاتٍ",
    },

    options: [
      {
        id: "4+5",
        left: 4,
        right: 5,
        total: 9,
      },
      {
        id: "4+6",
        left: 4,
        right: 6,
        total: 10,
      },
      {
        id: "5+6",
        left: 5,
        right: 6,
        total: 11,
      },
    ],

    correct: "4+6",
  },
  {
    question:
      "أَيُّ كِتَابَةٍ تُمَثِّلُ خَمْسَةَ مُكَعَّبَاتٍ زَرْقَاءَ وَخَمْسَةَ مُكَعَّبَاتٍ صَفْرَاءَ؟",

    question_audio_key: "ex2_q2",

    reference: {
      leftCount: 5,
      rightCount: 5,

      leftEmoji: "🟦",
      rightEmoji: "🟨",

      leftLabel:
        "خَمْسَةُ مُكَعَّبَاتٍ",

      rightLabel:
        "خَمْسَةُ مُكَعَّبَاتٍ",
    },

    options: [
      {
        id: "5+4",
        left: 5,
        right: 4,
        total: 9,
      },
      {
        id: "5+5",
        left: 5,
        right: 5,
        total: 10,
      },
      {
        id: "6+5",
        left: 6,
        right: 5,
        total: 11,
      },
    ],

    correct: "5+5",
  },
  {
    question:
      "أَيُّ كِتَابَةٍ تُمَثِّلُ سِتَّ زَهَرَاتٍ صَفْرَاءَ وَثَلَاثَ زَهَرَاتٍ حَمْرَاءَ؟",

    question_audio_key: "ex2_q3",

    reference: {
      leftCount: 6,
      rightCount: 3,

      leftEmoji: "🌼",
      rightEmoji: "🌺",

      leftLabel:
        "سِتُّ زَهَرَاتٍ",

      rightLabel:
        "ثَلَاثُ زَهَرَاتٍ",
    },

    options: [
      {
        id: "6+2",
        left: 6,
        right: 2,
        total: 8,
      },
      {
        id: "6+3",
        left: 6,
        right: 3,
        total: 9,
      },
      {
        id: "6+4",
        left: 6,
        right: 4,
        total: 10,
      },
    ],

    correct: "6+3",
  },
  {
    question:
      "أَيُّ كِتَابَةٍ تُمَثِّلُ ثَمَانِيَ دَوَائِرَ خَضْرَاءَ وَدَائِرَتَيْنِ بَنَفْسَجِيَّتَيْنِ؟",

    question_audio_key: "ex2_q4",

    reference: {
      leftCount: 8,
      rightCount: 2,

      leftEmoji: "🟢",
      rightEmoji: "🟣",

      leftLabel:
        "ثَمَانِي دَوَائِرَ",

      rightLabel:
        "دَائِرَتَانِ",
    },

    options: [
      {
        id: "8+1",
        left: 8,
        right: 1,
        total: 9,
      },
      {
        id: "7+2",
        left: 7,
        right: 2,
        total: 9,
      },
      {
        id: "8+2",
        left: 8,
        right: 2,
        total: 10,
      },
    ],

    correct: "8+2",
  },
];
