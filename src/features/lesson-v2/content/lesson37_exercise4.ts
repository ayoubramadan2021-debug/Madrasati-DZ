import type {
  TableReadingItem,
} from "../exercises-v2/TableReadingExerciseV2";

import {
  LESSON_37_TABLE_COLUMNS,
  LESSON_37_TABLE_ROWS,
  LESSON_37_TABLE_TITLE,
} from "./lesson37_table_data";

export const LESSON_37_EXERCISE_4:
  TableReadingItem[] = [
  {
    id: "l37-ex4-q1",
    mode: "inference",

    missionTitle:
      "أَسْتَنْتِجُ مِنَ الْجَدْوَلِ",

    question:
      "أَيُّ لُعْبَةٍ فِيهَا أَكْبَرُ عَدَدٍ مِنَ الْأَطْفَالِ؟",

    question_audio_key:
      "l37_ex4_q1",

    background_image:
      "/lessons/v2/lesson37/s5.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "total",

    helperText:
      "أُقَارِنُ أَعْدَادَ عَمُودِ الْمَجْمُوعِ.",

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
  {
    id: "l37-ex4-q2",
    mode: "inference",

    missionTitle:
      "أَسْتَنْتِجُ مِنَ الْجَدْوَلِ",

    question:
      "أَيُّ لُعْبَةٍ فِيهَا أَقَلُّ عَدَدٍ مِنَ الْأَطْفَالِ؟",

    question_audio_key:
      "l37_ex4_q2",

    background_image:
      "/lessons/v2/lesson37/s5.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "total",

    helperText:
      "أَبْحَثُ عَنِ الْعَدَدِ الْأَصْغَرِ فِي عَمُودِ الْمَجْمُوعِ.",

    options: [
      {
        id: "wheel",
        label: "الْعَجَلَةُ",
      },
      {
        id: "carousel",
        label:
          "الْحِصَانُ الدَّوَّارُ",
      },
      {
        id: "train",
        label: "الْقِطَارُ",
      },
    ],

    correctId: "carousel",
    answerVariant: "text",
    answerColumns: 3,
  },
  {
    id: "l37-ex4-q3",
    mode: "inference",

    missionTitle:
      "أَجْمَعُ مَعْلُومَاتِ الْجَدْوَلِ",

    question:
      "كَمْ عَدَدُ الْبَنَاتِ فِي الْأَلْعَابِ الثَّلَاثِ؟",

    question_audio_key:
      "l37_ex4_q3",

    background_image:
      "/lessons/v2/lesson37/s5.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "girls",

    helperText:
      "أَجْمَعُ أَعْدَادَ الْبَنَاتِ: اثْنَتَانِ، وَثَلَاثٌ، وَوَاحِدَةٌ.",

    options: [
      { id: "5", label: "5" },
      { id: "6", label: "6" },
      { id: "7", label: "7" },
    ],

    correctId: "6",
    answerVariant: "number",
    answerColumns: 3,
  },
  {
    id: "l37-ex4-q4",
    mode: "inference",

    missionTitle:
      "أَجْمَعُ مَعْلُومَاتِ الْجَدْوَلِ",

    question:
      "كَمْ طِفْلًا فِي الْقِطَارِ وَالْعَجَلَةِ مَعًا؟",

    question_audio_key:
      "l37_ex4_q4",

    background_image:
      "/lessons/v2/lesson37/s5.webp",

    tableTitle:
      LESSON_37_TABLE_TITLE,

    columns:
      LESSON_37_TABLE_COLUMNS,

    rows:
      LESSON_37_TABLE_ROWS,

    focusColumnKey: "total",

    helperText:
      "أَجْمَعُ مَجْمُوعَ الْقِطَارِ وَمَجْمُوعَ الْعَجَلَةِ.",

    options: [
      { id: "7", label: "7" },
      { id: "8", label: "8" },
      { id: "9", label: "9" },
    ],

    correctId: "9",
    answerVariant: "number",
    answerColumns: 3,
  },
];
