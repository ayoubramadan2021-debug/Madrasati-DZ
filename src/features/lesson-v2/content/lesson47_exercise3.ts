import type {
  GridNavigationItem,
} from "./lesson47_types";

const question =
  "فِي أَيِّ اتِّجَاهٍ يُتَابِعُ الطِّفْلُ مَسَارَهُ؟";

const directions = [
  "right",
  "left",
  "up",
  "down",
] as const;

export const lesson47Exercise3:
  GridNavigationItem[] = [
  {
    id: "l47_e3_q1",
    title: "أُكْمِلُ المَسْلَكَ",
    question,
    question_audio_key: "ex3_missing_arrow",
    mode: "missing-arrow",
    rows: 4,
    cols: 4,
    start: { row: 3, col: 1 },
    goal: { row: 3, col: 3 },
    route: ["right", null],
    missingIndex: 1,
    answer: "right",
    options: [...directions],
  },
  {
    id: "l47_e3_q2",
    title: "أُكْمِلُ المَسْلَكَ",
    question,
    question_audio_key: "ex3_missing_arrow",
    mode: "missing-arrow",
    rows: 4,
    cols: 4,
    start: { row: 4, col: 2 },
    goal: { row: 2, col: 2 },
    route: ["up", null],
    missingIndex: 1,
    answer: "up",
    options: ["down", "right", "up", "left"],
  },
  {
    id: "l47_e3_q3",
    title: "أُكْمِلُ المَسْلَكَ",
    question,
    question_audio_key: "ex3_missing_arrow",
    mode: "missing-arrow",
    rows: 4,
    cols: 4,
    start: { row: 2, col: 4 },
    goal: { row: 2, col: 2 },
    route: ["left", null],
    missingIndex: 1,
    answer: "left",
    options: ["left", "down", "right", "up"],
  },
  {
    id: "l47_e3_q4",
    title: "أُكْمِلُ المَسْلَكَ",
    question,
    question_audio_key: "ex3_missing_arrow",
    mode: "missing-arrow",
    rows: 4,
    cols: 4,
    start: { row: 1, col: 3 },
    goal: { row: 3, col: 3 },
    route: ["down", null],
    missingIndex: 1,
    answer: "down",
    options: ["up", "left", "right", "down"],
  },
];
