import type {
  GridNavigationItem,
} from "./lesson47_types";

const question =
  "إِلَى أَيْنَ تَأْخُذُكَ الأَسْهُمُ؟";

export const lesson47Exercise2:
  GridNavigationItem[] = [
  {
    id: "l47_e2_q1",
    title: "أَيْنَ سَنَصِلُ؟",
    question,
    question_audio_key: "ex2_destination",
    mode: "find-destination",
    rows: 4,
    cols: 4,
    start: { row: 3, col: 1 },
    route: ["right", "right"],
    landmarks: [
      {
        id: "star",
        label: "النَّجْمَةُ",
        icon: "⭐",
        position: { row: 3, col: 3 },
      },
      {
        id: "tree",
        label: "الشَّجَرَةُ",
        icon: "🌳",
        position: { row: 1, col: 4 },
      },
      {
        id: "gift",
        label: "الهَدِيَّةُ",
        icon: "🎁",
        position: { row: 4, col: 4 },
      },
    ],
    answer: "star",
    options: ["tree", "star", "gift"],
  },
  {
    id: "l47_e2_q2",
    title: "أَيْنَ سَنَصِلُ؟",
    question,
    question_audio_key: "ex2_destination",
    mode: "find-destination",
    rows: 4,
    cols: 4,
    start: { row: 4, col: 2 },
    route: ["up", "up"],
    landmarks: [
      {
        id: "tree",
        label: "الشَّجَرَةُ",
        icon: "🌳",
        position: { row: 2, col: 2 },
      },
      {
        id: "star",
        label: "النَّجْمَةُ",
        icon: "⭐",
        position: { row: 1, col: 4 },
      },
      {
        id: "gift",
        label: "الهَدِيَّةُ",
        icon: "🎁",
        position: { row: 4, col: 4 },
      },
    ],
    answer: "tree",
    options: ["gift", "tree", "star"],
  },
  {
    id: "l47_e2_q3",
    title: "أَيْنَ سَنَصِلُ؟",
    question,
    question_audio_key: "ex2_destination",
    mode: "find-destination",
    rows: 4,
    cols: 4,
    start: { row: 2, col: 4 },
    route: ["left", "left"],
    landmarks: [
      {
        id: "gift",
        label: "الهَدِيَّةُ",
        icon: "🎁",
        position: { row: 2, col: 2 },
      },
      {
        id: "balloon",
        label: "البَالُونُ",
        icon: "🎈",
        position: { row: 1, col: 1 },
      },
      {
        id: "tree",
        label: "الشَّجَرَةُ",
        icon: "🌳",
        position: { row: 4, col: 3 },
      },
    ],
    answer: "gift",
    options: ["balloon", "tree", "gift"],
  },
  {
    id: "l47_e2_q4",
    title: "أَيْنَ سَنَصِلُ؟",
    question,
    question_audio_key: "ex2_destination",
    mode: "find-destination",
    rows: 4,
    cols: 4,
    start: { row: 1, col: 3 },
    route: ["down", "down"],
    landmarks: [
      {
        id: "house",
        label: "المَنْزِلُ",
        icon: "🏠",
        position: { row: 3, col: 3 },
      },
      {
        id: "balloon",
        label: "البَالُونُ",
        icon: "🎈",
        position: { row: 4, col: 1 },
      },
      {
        id: "star",
        label: "النَّجْمَةُ",
        icon: "⭐",
        position: { row: 2, col: 1 },
      },
    ],
    answer: "house",
    options: ["star", "house", "balloon"],
  },
];
