import type {
  TableReadingItem,
} from "../exercises-v2/TableReadingExerciseV2";

import {
  LESSON_37_TABLE_COLUMNS,
  LESSON_37_TABLE_ROWS,
  LESSON_37_TABLE_TITLE,
} from "./lesson37_table_data";

export const LESSON_37_EXERCISE_2:
  TableReadingItem[] = [
  {
    id: "l37-ex2-q1",
    mode: "row",

    missionTitle:
      "أَقْرَأُ صَفًّا كَامِلًا",

    question:
      "أَيُّ وَصْفٍ يُطَابِقُ صَفَّ الْقِطَارِ؟",

    question_audio_key:
      "l37_ex2_q1",

    background_image:
      "/lessons/v2/lesson37/s3.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "train",

    helperText:
      "أَقْرَأُ صَفَّ الْقِطَارِ مِنَ الْبَنَاتِ إِلَى الْمَجْمُوعِ.",

    options: [
      {
        id: "train-correct",
        label:
          "بِنْتَانِ، وَثَلَاثَةُ أَوْلَادٍ، وَالْمَجْمُوعُ خَمْسَةٌ.",
      },
      {
        id: "wheel-values",
        label:
          "ثَلَاثُ بَنَاتٍ، وَوَلَدٌ وَاحِدٌ، وَالْمَجْمُوعُ أَرْبَعَةٌ.",
      },
      {
        id: "carousel-values",
        label:
          "بِنْتٌ وَاحِدَةٌ، وَوَلَدَانِ، وَالْمَجْمُوعُ ثَلَاثَةٌ.",
      },
    ],

    correctId:
      "train-correct",

    answerVariant: "text",
    answerColumns: 1,
  },
  {
    id: "l37-ex2-q2",
    mode: "row",

    missionTitle:
      "أَقْرَأُ صَفًّا كَامِلًا",

    question:
      "أَيُّ وَصْفٍ يُطَابِقُ صَفَّ الْعَجَلَةِ؟",

    question_audio_key:
      "l37_ex2_q2",

    background_image:
      "/lessons/v2/lesson37/s3.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "wheel",

    helperText:
      "أَقْرَأُ الْقِيَمَ الثَّلَاثَ فِي صَفِّ الْعَجَلَةِ.",

    options: [
      {
        id: "train-values",
        label:
          "بِنْتَانِ، وَثَلَاثَةُ أَوْلَادٍ، وَالْمَجْمُوعُ خَمْسَةٌ.",
      },
      {
        id: "wheel-correct",
        label:
          "ثَلَاثُ بَنَاتٍ، وَوَلَدٌ وَاحِدٌ، وَالْمَجْمُوعُ أَرْبَعَةٌ.",
      },
      {
        id: "carousel-values",
        label:
          "بِنْتٌ وَاحِدَةٌ، وَوَلَدَانِ، وَالْمَجْمُوعُ ثَلَاثَةٌ.",
      },
    ],

    correctId:
      "wheel-correct",

    answerVariant: "text",
    answerColumns: 1,
  },
  {
    id: "l37-ex2-q3",
    mode: "row",

    missionTitle:
      "أَقْرَأُ صَفَّ الْحِصَانِ الدَّوَّارِ",

    question:
      "كَمْ بِنْتًا وَكَمْ وَلَدًا فِي الْحِصَانِ الدَّوَّارِ؟",

    question_audio_key:
      "l37_ex2_q3",

    background_image:
      "/lessons/v2/lesson37/s3.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "carousel",

    helperText:
      "أَقْرَأُ عَدَدَ الْبَنَاتِ وَعَدَدَ الْأَوْلَادِ فِي الصَّفِّ الْمُحَدَّدِ.",

    options: [
      {
        id: "carousel-correct",
        label:
          "بِنْتٌ وَاحِدَةٌ وَوَلَدَانِ.",
      },
      {
        id: "train-values",
        label:
          "بِنْتَانِ وَثَلَاثَةُ أَوْلَادٍ.",
      },
      {
        id: "wheel-values",
        label:
          "ثَلَاثُ بَنَاتٍ وَوَلَدٌ وَاحِدٌ.",
      },
    ],

    correctId:
      "carousel-correct",

    answerVariant: "text",
    answerColumns: 1,
  },
  {
id: "l37-ex2-q4",
    mode: "row",

    missionTitle:
      "أَتَعَرَّفُ إِلَى الصَّفِّ",

    question:
      "أَيُّ لُعْبَةٍ مَجْمُوعُ أَطْفَالِهَا خَمْسَةٌ؟",

    question_audio_key:
      "l37_ex2_q4",

    background_image:
      "/lessons/v2/lesson37/s3.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "total",

    helperText:
      "أَبْحَثُ عَنِ الْعَدَدِ خَمْسَةٍ فِي عَمُودِ الْمَجْمُوعِ.",

    options: [
      {
        id: "train",
        label: "الْقِطَارُ",
      },
      {
        id: "wheel",
        label: "الْعَجَلَةُ",
      },
      {
        id: "carousel",
        label:
          "الْحِصَانُ الدَّوَّارُ",
      },
    ],

    correctId: "train",
    answerVariant: "text",
    answerColumns: 3,
  },
];
