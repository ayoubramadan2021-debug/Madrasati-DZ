import type {
  TableReadingItem,
} from "../exercises-v2/TableReadingExerciseV2";

import {
  LESSON_37_TABLE_COLUMNS,
  LESSON_37_TABLE_ROWS,
  LESSON_37_TABLE_TITLE,
} from "./lesson37_table_data";

export const LESSON_37_EXERCISE_3:
  TableReadingItem[] = [
  {
    id: "l37-ex3-q1",
    mode: "column",

    missionTitle:
      "أَقْرَأُ عَمُودًا مِنَ الْجَدْوَلِ",

    question:
      "فِي أَيِّ لُعْبَةٍ تَلْعَبُ ثَلَاثُ بَنَاتٍ؟",

    question_audio_key:
      "l37_ex3_q1",

    background_image:
      "/lessons/v2/lesson37/s4.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "girls",

    helperText:
      "أَقْرَأُ عَمُودَ الْبَنَاتِ مِنَ الْأَعْلَى إِلَى الْأَسْفَلِ.",

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

    correctId: "wheel",
    answerVariant: "text",
    answerColumns: 3,
  },
  {
    id: "l37-ex3-q2",
    mode: "column",

    missionTitle:
      "أَقْرَأُ عَمُودًا مِنَ الْجَدْوَلِ",

    question:
      "فِي أَيِّ لُعْبَةٍ يَلْعَبُ ثَلَاثَةُ أَوْلَادٍ؟",

    question_audio_key:
      "l37_ex3_q2",

    background_image:
      "/lessons/v2/lesson37/s4.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "boys",

    helperText:
      "أَبْحَثُ عَنِ الْعَدَدِ ثَلَاثَةٍ فِي عَمُودِ الْأَوْلَادِ.",

    options: [
      {
        id: "carousel",
        label:
          "الْحِصَانُ الدَّوَّارُ",
      },
      {
        id: "train",
        label: "الْقِطَارُ",
      },
      {
        id: "wheel",
        label: "الْعَجَلَةُ",
      },
    ],

    correctId: "train",
    answerVariant: "text",
    answerColumns: 3,
  },
  {
    id: "l37-ex3-q3",
    mode: "column",

    missionTitle:
      "أَقْرَأُ عَمُودًا مِنَ الْجَدْوَلِ",

    question:
      "كَمْ وَلَدًا يَلْعَبُ فِي الْحِصَانِ الدَّوَّارِ؟",

    question_audio_key:
      "l37_ex3_q3",

    background_image:
      "/lessons/v2/lesson37/s4.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "boys",
    focusRowId: "carousel",

    helperText:
      "أُحَدِّدُ عَمُودَ الْأَوْلَادِ، ثُمَّ صَفَّ الْحِصَانِ الدَّوَّارِ.",

    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
    ],

    correctId: "2",
    answerVariant: "number",
    answerColumns: 3,
  },
  {
    id: "l37-ex3-q4",
    mode: "column",

    missionTitle:
      "أَتَعَرَّفُ إِلَى عُنْوَانِ الْعَمُودِ",

    question:
      "أَيُّ عَمُودٍ يُبَيِّنُ عَدَدَ الْأَطْفَالِ كُلِّهِمْ؟",

    question_audio_key:
      "l37_ex3_q4",

    background_image:
      "/lessons/v2/lesson37/s4.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    helperText:
      "أَقْرَأُ عَنَاوِينَ الْأَعْمِدَةِ جَيِّدًا.",

    options: [
      {
        id: "girls",
        label: "الْبَنَاتُ",
      },
      {
        id: "boys",
        label: "الْأَوْلَادُ",
      },
      {
        id: "total",
        label: "الْمَجْمُوعُ",
      },
    ],

    correctId: "total",
    answerVariant: "text",
    answerColumns: 3,
  },
];
