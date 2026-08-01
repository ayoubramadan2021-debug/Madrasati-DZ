import type {
  Lesson31CompareItem,
} from "../exercises-v2/lesson31/Lesson31CompareEngineV2";

export const LESSON_31_EXERCISE_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_31_exercises";

export const LESSON_31_EXERCISE_1:
  Lesson31CompareItem[] = [
  {
    leftLabel: "الفَرِيقُ الأَخْضَرُ",
    leftCount: 12,
    leftColor: "#7dbc3b",

    rightLabel: "الفَرِيقُ الأَحْمَرُ",
    rightCount: 7,
    rightColor: "#f33c3c",

    question:
      "قَارِنْ عَدَدَ عَنَاصِرِ الفَرِيقِ الأَخْضَرِ بِعَدَدِ عَنَاصِرِ الفَرِيقِ الأَحْمَرِ.",

    question_audio_key: "ex1_q1",
    correct: "more",
  },
  {
    leftLabel: "المَجْمُوعَةُ البُرْتُقَالِيَّةُ",
    leftCount: 9,
    leftColor: "#f18b20",

    rightLabel: "المَجْمُوعَةُ الزَّرْقَاءُ",
    rightCount: 6,
    rightColor: "#398fd3",

    question:
      "قَارِنْ عَدَدَ عَنَاصِرِ المَجْمُوعَةِ البُرْتُقَالِيَّةِ بِعَدَدِ عَنَاصِرِ المَجْمُوعَةِ الزَّرْقَاءِ.",

    question_audio_key: "ex1_q2",
    correct: "more",
  },
  {
    leftLabel: "المَجْمُوعَةُ الأُولَى",
    leftCount: 4,
    leftColor: "#a95bd4",

    rightLabel: "المَجْمُوعَةُ الثَّانِيَةُ",
    rightCount: 8,
    rightColor: "#e45aa1",

    question:
      "قَارِنْ عَدَدَ عَنَاصِرِ المَجْمُوعَةِ الأُولَى بِعَدَدِ عَنَاصِرِ المَجْمُوعَةِ الثَّانِيَةِ.",

    question_audio_key: "ex1_q3",
    correct: "less",
  },
  {
    leftLabel: "المَجْمُوعَةُ الأُولَى",
    leftCount: 10,
    leftColor: "#16a89a",

    rightLabel: "المَجْمُوعَةُ الثَّانِيَةُ",
    rightCount: 10,
    rightColor: "#f17b2c",

    question:
      "قَارِنْ عَدَدَ عَنَاصِرِ المَجْمُوعَةِ الأُولَى بِعَدَدِ عَنَاصِرِ المَجْمُوعَةِ الثَّانِيَةِ.",

    question_audio_key: "ex1_q4",
    correct: "equal",
  },
];
