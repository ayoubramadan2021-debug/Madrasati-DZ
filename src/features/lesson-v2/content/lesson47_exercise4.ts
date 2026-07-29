import type {
  GridNavigationItem,
} from "./lesson47_types";

const question =
  "اِتْبَعْ أَرْقَامَ الخَانَاتِ مِنَ الطِّفْلِ إِلَى النَّجْمَةِ. أَيُّ سِلْسِلَةِ أَسْهُمٍ صَحِيحَةٌ؟";

export const lesson47Exercise4:
  GridNavigationItem[] = [
  {
    id: "l47_e4_q1",
    title: "أَخْتَارُ شِفْرَةَ المَسَارِ",
    question,
    question_audio_key: "ex4_route_code",
    mode: "match-route",
    rows: 4,
    cols: 4,
    start: { row: 3, col: 1 },
    goal: { row: 3, col: 3 },
    route: ["right", "right"],
    pathCells: [
      { row: 3, col: 1 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ],
    answer: "a",
    options: [
      { id: "a", route: ["right", "right"] },
      { id: "b", route: ["right", "up"] },
      { id: "c", route: ["up", "right"] },
    ],
  },
  {
    id: "l47_e4_q2",
    title: "أَخْتَارُ شِفْرَةَ المَسَارِ",
    question,
    question_audio_key: "ex4_route_code",
    mode: "match-route",
    rows: 4,
    cols: 4,
    start: { row: 4, col: 2 },
    goal: { row: 2, col: 2 },
    route: ["up", "up"],
    pathCells: [
      { row: 4, col: 2 },
      { row: 3, col: 2 },
      { row: 2, col: 2 },
    ],
    answer: "b",
    options: [
      { id: "a", route: ["up", "right"] },
      { id: "b", route: ["up", "up"] },
      { id: "c", route: ["right", "up"] },
    ],
  },
  {
    id: "l47_e4_q3",
    title: "أَخْتَارُ شِفْرَةَ المَسَارِ",
    question,
    question_audio_key: "ex4_route_code",
    mode: "match-route",
    rows: 4,
    cols: 4,
    start: { row: 4, col: 1 },
    goal: { row: 3, col: 3 },
    route: ["up", "right", "right"],
    pathCells: [
      { row: 4, col: 1 },
      { row: 3, col: 1 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ],
    answer: "c",
    options: [
      { id: "a", route: ["right", "up", "right"] },
      { id: "b", route: ["right", "right", "up"] },
      { id: "c", route: ["up", "right", "right"] },
    ],
  },
  {
    id: "l47_e4_q4",
    title: "أَخْتَارُ شِفْرَةَ المَسَارِ",
    question,
    question_audio_key: "ex4_route_code",
    mode: "match-route",
    rows: 4,
    cols: 4,
    start: { row: 4, col: 4 },
    goal: { row: 2, col: 3 },
    route: ["up", "up", "left"],
    pathCells: [
      { row: 4, col: 4 },
      { row: 3, col: 4 },
      { row: 2, col: 4 },
      { row: 2, col: 3 },
    ],
    answer: "a",
    options: [
      { id: "a", route: ["up", "up", "left"] },
      { id: "b", route: ["up", "left", "up"] },
      { id: "c", route: ["left", "up", "up"] },
    ],
  },
];
