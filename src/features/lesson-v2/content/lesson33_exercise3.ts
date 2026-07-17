import type { UnitMeasurePathItem } from "../exercises-v2/UnitMeasurePathV2";

export const LESSON_33_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/taline/lesson_33_amusement_lengths/exercises";

export const LESSON_33_EXERCISE_3 = [
  {
    mode: "maze",
    title: "مُتَاهَةُ الوَحَدَاتِ",
    question: "أَيُّ القِيَاسِ صَحِيحٌ؟",
    question_audio_key: "ex3_q1",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s3.webp",
    routes: [
      {
        id: "m1",
        label: "مَسَارُ الفَأْرِ",
        color: "#F28C28",
        units: 5,
        start: { label: "الفأر", kind: "mouse", color: "#B7BFCB" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "t1",
        label: "مَسَارُ السُّلَحْفَاةِ",
        color: "#8B67D8",
        units: 7,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: [
      "الفأر 5 — السلحفاة 7",
      "الفأر 6 — السلحفاة 7",
      "الفأر 5 — السلحفاة 6",
    ],
    correct: "الفأر 5 — السلحفاة 7",
    explanation: "أحسنت، سار الفأر 5 وحدات وسارت السلحفاة 7 وحدات.",
    option_layout: "single",
  },
  {
    mode: "maze",
    title: "مُتَاهَةُ الوَحَدَاتِ",
    question: "أَيُّ القِيَاسِ صَحِيحٌ؟",
    question_audio_key: "ex3_q2",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s4.webp",
    routes: [
      {
        id: "m2",
        label: "مَسَارُ الفَأْرِ",
        color: "#20A567",
        units: 4,
        start: { label: "الفأر", kind: "mouse", color: "#B7BFCB" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "t2",
        label: "مَسَارُ السُّلَحْفَاةِ",
        color: "#3B82F6",
        units: 6,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: [
      "الفأر 4 — السلحفاة 6",
      "الفأر 5 — السلحفاة 6",
      "الفأر 4 — السلحفاة 5",
    ],
    correct: "الفأر 4 — السلحفاة 6",
    explanation: "أحسنت، سار الفأر 4 وحدات وسارت السلحفاة 6 وحدات.",
    option_layout: "single",
  },
  {
    mode: "maze",
    title: "مُتَاهَةُ الوَحَدَاتِ",
    question: "أَيُّ القِيَاسِ صَحِيحٌ؟",
    question_audio_key: "ex3_q3",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s5.webp",
    routes: [
      {
        id: "m3",
        label: "مَسَارُ الفَأْرِ",
        color: "#E0574F",
        units: 6,
        start: { label: "الفأر", kind: "mouse", color: "#B7BFCB" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "t3",
        label: "مَسَارُ السُّلَحْفَاةِ",
        color: "#7B57D1",
        units: 4,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: [
      "الفأر 6 — السلحفاة 4",
      "الفأر 5 — السلحفاة 4",
      "الفأر 6 — السلحفاة 5",
    ],
    correct: "الفأر 6 — السلحفاة 4",
    explanation: "أحسنت، سار الفأر 6 وحدات وسارت السلحفاة 4 وحدات.",
    option_layout: "single",
  },
  {
    mode: "maze",
    title: "مُتَاهَةُ الوَحَدَاتِ",
    question: "أَيُّ القِيَاسِ صَحِيحٌ؟",
    question_audio_key: "ex3_q4",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s6.webp",
    routes: [
      {
        id: "m4",
        label: "مَسَارُ الفَأْرِ",
        color: "#3B82F6",
        units: 8,
        start: { label: "الفأر", kind: "mouse", color: "#B7BFCB" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "t4",
        label: "مَسَارُ السُّلَحْفَاةِ",
        color: "#20A567",
        units: 5,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: [
      "الفأر 8 — السلحفاة 5",
      "الفأر 7 — السلحفاة 5",
      "الفأر 8 — السلحفاة 6",
    ],
    correct: "الفأر 8 — السلحفاة 5",
    explanation: "أحسنت، سار الفأر 8 وحدات وسارت السلحفاة 5 وحدات.",
    option_layout: "single",
  },
] satisfies UnitMeasurePathItem[];
