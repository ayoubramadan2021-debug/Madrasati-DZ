import type {
  GridNavigationItem,
} from "./lesson47_types";

const question =
  "فِي أَيِّ اتِّجَاهٍ يَسِيرُ الطِّفْلُ؟";

const options = [
  "right",
  "left",
  "up",
  "down",
] as const;

export const lesson47Exercise1:
  GridNavigationItem[] = [
  {
    id: "l47_e1_q1",
    title: "أَتْبَعُ سَهْمًا وَاحِدًا",
    question,
    question_audio_key: "ex1_direction",
    mode: "identify-direction",
    rows: 3,
    cols: 3,
    start: { row: 2, col: 2 },
    direction: "right",
    answer: "right",
    options: [...options],
  },
  {
    id: "l47_e1_q2",
    title: "أَتْبَعُ سَهْمًا وَاحِدًا",
    question,
    question_audio_key: "ex1_direction",
    mode: "identify-direction",
    rows: 3,
    cols: 3,
    start: { row: 2, col: 2 },
    direction: "left",
    answer: "left",
    options: ["up", "left", "down", "right"],
  },
  {
    id: "l47_e1_q3",
    title: "أَتْبَعُ سَهْمًا وَاحِدًا",
    question,
    question_audio_key: "ex1_direction",
    mode: "identify-direction",
    rows: 3,
    cols: 3,
    start: { row: 2, col: 2 },
    direction: "up",
    answer: "up",
    options: ["down", "right", "up", "left"],
  },
  {
    id: "l47_e1_q4",
    title: "أَتْبَعُ سَهْمًا وَاحِدًا",
    question,
    question_audio_key: "ex1_direction",
    mode: "identify-direction",
    rows: 3,
    cols: 3,
    start: { row: 2, col: 2 },
    direction: "down",
    answer: "down",
    options: ["left", "down", "right", "up"],
  },
];
