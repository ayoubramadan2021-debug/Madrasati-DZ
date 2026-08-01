import type { UnitMeasurePathItem } from "../exercises-v2/UnitMeasurePathV2";

export const LESSON_33_EXERCISE_1_AUDIO_BASE =
  "/audio/teachers/taline/lesson_33_amusement_lengths/exercises";

export const LESSON_33_EXERCISE_1 = [
  {
    mode: "count",
    title: "أَعُدُّ الوَحَدَاتِ",
    question: "كَمْ وَحْدَةً قَطَعَ الفَأْرُ؟",
    question_audio_key: "ex1_q1",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s1.webp",
    routes: [
      {
        id: "r1",
        color: "#20A567",
        units: 4,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
        layout: "correct",
      },
    ],
    options: ["3", "4", "5"],
    correct: "4",
    explanation: "أحسنت، قطع الفأر أربع وحدات.",
  },
  {
    mode: "count",
    title: "أَعُدُّ الوَحَدَاتِ",
    question: "كَمْ وَحْدَةً قَطَعَتِ السُّلَحْفَاةُ؟",
    question_audio_key: "ex1_q2",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s2.webp",
    routes: [
      {
        id: "r2",
        color: "#3B82F6",
        units: 5,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
        layout: "correct",
      },
    ],
    options: ["4", "5", "6"],
    correct: "5",
    explanation: "أحسنت، قطعت السلحفاة خمس وحدات.",
  },
  {
    mode: "count",
    title: "أَعُدُّ الوَحَدَاتِ",
    question: "كَمْ وَحْدَةً قَطَعَ الفَأْرُ؟",
    question_audio_key: "ex1_q3",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s3.webp",
    routes: [
      {
        id: "r3",
        color: "#F28C28",
        units: 6,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
        layout: "correct",
      },
    ],
    options: ["5", "6", "7"],
    correct: "6",
    explanation: "أحسنت، قطع الفأر ست وحدات.",
  },
  {
    mode: "count",
    title: "أَعُدُّ الوَحَدَاتِ",
    question: "كَمْ وَحْدَةً قَطَعَتِ السُّلَحْفَاةُ؟",
    question_audio_key: "ex1_q4",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s4.webp",
    routes: [
      {
        id: "r4",
        color: "#7B57D1",
        units: 7,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
        layout: "correct",
      },
    ],
    options: ["6", "7", "8"],
    correct: "7",
    explanation: "أحسنت، قطعت السلحفاة سبع وحدات.",
  },
] satisfies UnitMeasurePathItem[];
