import type {
  TableReadingItem,
} from "../exercises-v2/TableReadingExerciseV2";

import {
  LESSON_37_TABLE_COLUMNS,
  LESSON_37_TABLE_ROWS,
  LESSON_37_TABLE_TITLE,
} from "./lesson37_table_data";

export const LESSON_37_EXERCISES_AUDIO_BASE =
  "/audio/teachers/taline/lesson_37_amusement_picture_table/exercises";

export const LESSON_37_EXERCISE_1:
  TableReadingItem[] = [
  {
    id: "l37-ex1-q1",
    mode: "cell",

    missionTitle:
      "أَقْرَأُ خَانَةً مِنَ الْجَدْوَلِ",

    question:
      "كَمْ وَلَدًا يَلْعَبُ فِي الْقِطَارِ؟",

    question_audio_key:
      "l37_ex1_q1",

    background_image:
      "/lessons/v2/lesson37/s2.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "train",
    focusColumnKey: "boys",

    helperText:
      "أَتَّبِعُ صَفَّ الْقِطَارِ وَعَمُودَ الْأَوْلَادِ.",

    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
    ],

    correctId: "3",
    answerVariant: "number",
    answerColumns: 3,
  },
  {
    id: "l37-ex1-q2",
    mode: "cell",

    missionTitle:
      "أَقْرَأُ خَانَةً مِنَ الْجَدْوَلِ",

    question:
      "كَمْ بِنْتًا تَلْعَبُ فِي الْعَجَلَةِ؟",

    question_audio_key:
      "l37_ex1_q2",

    background_image:
      "/lessons/v2/lesson37/s2.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "wheel",
    focusColumnKey: "girls",

    helperText:
      "أَتَّبِعُ صَفَّ الْعَجَلَةِ وَعَمُودَ الْبَنَاتِ.",

    options: [
      { id: "2", label: "2" },
      { id: "3", label: "3" },
      { id: "4", label: "4" },
    ],

    correctId: "3",
    answerVariant: "number",
    answerColumns: 3,
  },
  {
    id: "l37-ex1-q3",
    mode: "cell",

    missionTitle:
      "أَقْرَأُ خَانَةً مِنَ الْجَدْوَلِ",

    question:
      "كَمْ طِفْلًا فِي الْحِصَانِ الدَّوَّارِ؟",

    question_audio_key:
      "l37_ex1_q3",

    background_image:
      "/lessons/v2/lesson37/s2.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "carousel",
    focusColumnKey: "total",

    helperText:
      "أَتَّبِعُ صَفَّ الْحِصَانِ الدَّوَّارِ وَعَمُودَ الْمَجْمُوعِ.",

    options: [
      { id: "3", label: "3" },
      { id: "4", label: "4" },
      { id: "5", label: "5" },
    ],

    correctId: "3",
    answerVariant: "number",
    answerColumns: 3,
  },
  {
    id: "l37-ex1-q4",
    mode: "cell",

    missionTitle:
      "أَقْرَأُ خَانَةً مِنَ الْجَدْوَلِ",

    question:
      "كَمْ بِنْتًا تَلْعَبُ فِي الْقِطَارِ؟",

    question_audio_key:
      "l37_ex1_q4",

    background_image:
      "/lessons/v2/lesson37/s2.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusRowId: "train",
    focusColumnKey: "girls",

    helperText:
      "أَقْرَأُ الْخَانَةَ عِنْدَ تَقَاطُعِ الصَّفِّ وَالْعَمُودِ.",

    options: [
      { id: "1", label: "1" },
      { id: "2", label: "2" },
      { id: "3", label: "3" },
    ],

    correctId: "2",
    answerVariant: "number",
    answerColumns: 3,
  },
];
