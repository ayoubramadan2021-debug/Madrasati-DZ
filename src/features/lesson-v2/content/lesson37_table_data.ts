import type {
  TableReadingColumn,
  TableReadingRow,
} from "../exercises-v2/TableReadingExerciseV2";

export const LESSON_37_TABLE_COLUMNS:
  TableReadingColumn[] = [
  {
    key: "girls",
    label: "الْبَنَاتُ",
  },
  {
    key: "boys",
    label: "الْأَوْلَادُ",
  },
  {
    key: "total",
    label: "الْمَجْمُوعُ",
  },
];

export const LESSON_37_TABLE_ROWS:
  TableReadingRow[] = [
  {
    id: "train",
    label: "الْقِطَارُ",
    icon: "🚂",

    values: {
      girls: 2,
      boys: 3,
      total: 5,
    },
  },
  {
    id: "wheel",
    label: "الْعَجَلَةُ",
    icon: "🎡",

    values: {
      girls: 3,
      boys: 1,
      total: 4,
    },
  },
  {
    id: "carousel",
    label:
      "الْحِصَانُ الدَّوَّارُ",
    icon: "🎠",

    values: {
      girls: 1,
      boys: 2,
      total: 3,
    },
  },
];

export const LESSON_37_TABLE_TITLE =
  "جَدْوَلُ أَلْعَابِ الْمَهْرَجَانِ";
