import type {
  Lesson32CompareItem,
} from "../exercises-v2/lesson32/Lesson32CompareEngineV2";

export const LESSON_32_EXERCISE_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_32_exercises";

export const LESSON_32_EXERCISE_1:
  Lesson32CompareItem[] = [
  {
    leftLabel: "الفَرِيقُ الأَخْضَرُ",
    leftCount: 12,
    leftColor: "#64ad3b",

    rightLabel: "الفَرِيقُ الأَحْمَرُ",
    rightCount: 7,
    rightColor: "#ef4545",

    question:
      "قَارِنْ عَدَدَ عَنَاصِرِ المَجْمُوعَةِ الخَضْرَاءِ بِعَدَدِ عَنَاصِرِ المَجْمُوعَةِ الحَمْرَاءِ.",

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
