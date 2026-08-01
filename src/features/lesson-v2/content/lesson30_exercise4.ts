import type {
  Lesson30CompositionChoiceItem,
} from "../exercises-v2/lesson30/Lesson30CompositionChoiceEngineV2";

export const LESSON_30_EXERCISE_4:
  Lesson30CompositionChoiceItem[] = [
  {
    question:
      "أَيُّ تَرْكِيبٍ يُكَوِّنُ العَدَدَ عَشَرَةَ؟",

    question_audio_key: "ex4_q1",

    target: 10,

    options: [
      {
        id: "7+2",
        left: 7,
        right: 2,
        total: 9,
      },
      {
        id: "7+3",
        left: 7,
        right: 3,
        total: 10,
      },
      {
        id: "6+3",
        left: 6,
        right: 3,
        total: 9,
      },
    ],

    correct: "7+3",
  },
  {
    question:
      "أَيُّ تَرْكِيبٍ يُكَوِّنُ العَدَدَ تِسْعَةَ؟",

    question_audio_key: "ex4_q2",

    target: 9,

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
      "أَيُّ تَرْكِيبٍ آخَرَ يُكَوِّنُ العَدَدَ عَشَرَةَ؟",

    question_audio_key: "ex4_q3",

    target: 10,

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
  {
    question:
      "أَيُّ تَرْكِيبٍ يُكَوِّنُ العَدَدَ عَشَرَةَ بِمَجْمُوعَتَيْنِ مُتَسَاوِيَتَيْنِ؟",

    question_audio_key: "ex4_q4",

    target: 10,

    condition:
      "يَجِبُ أَنْ يَكُونَ عَدَدُ العَنَاصِرِ فِي المَجْمُوعَتَيْنِ مُتَسَاوِيًا.",

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
        id: "4+4",
        left: 4,
        right: 4,
        total: 8,
      },
    ],

    correct: "5+5",
  },
];
