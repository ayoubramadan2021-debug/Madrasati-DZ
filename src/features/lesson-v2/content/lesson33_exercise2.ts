import type { UnitMeasurePathItem } from "../exercises-v2/UnitMeasurePathV2";

export const LESSON_33_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/taline/lesson_33_amusement_lengths/exercises";

export const LESSON_33_EXERCISE_2 = [
  {
    mode: "compare",
    title: "أُقَارِنُ",
    question: "مَنْ قَطَعَ وَحَدَاتٍ أَكْثَرَ؟",
    question_audio_key: "ex2_q1",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s2.webp",
    routes: [
      {
        id: "mouse",
        label: "مسار الفأر",
        color: "#20A567",
        units: 4,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "turtle",
        label: "مسار السلحفاة",
        color: "#3B82F6",
        units: 6,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: ["الفأر", "السلحفاة"],
    correct: "السلحفاة",
    explanation: "أحسنت، السلحفاة قطعت وحدات أكثر.",
  },
  {
    mode: "compare",
    title: "أُقَارِنُ",
    question: "مَنْ قَطَعَ وَحَدَاتٍ أَقَلَّ؟",
    question_audio_key: "ex2_q2",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s3.webp",
    routes: [
      {
        id: "mouse",
        label: "مسار الفأر",
        color: "#F28C28",
        units: 5,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "turtle",
        label: "مسار السلحفاة",
        color: "#7B57D1",
        units: 3,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: ["الفأر", "السلحفاة"],
    correct: "السلحفاة",
    explanation: "أحسنت، السلحفاة قطعت وحدات أقل.",
  },
  {
    mode: "compare",
    title: "أُقَارِنُ",
    question: "هَلْ قَطَعَا العَدَدَ نَفْسَهُ؟",
    question_audio_key: "ex2_q3",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s4.webp",
    routes: [
      {
        id: "mouse",
        label: "مسار الفأر",
        color: "#E0574F",
        units: 5,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "turtle",
        label: "مسار السلحفاة",
        color: "#3B82F6",
        units: 5,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: ["نعم", "لا"],
    correct: "نعم",
    explanation: "أحسنت، كلاهما قطع العدد نفسه.",
  },
  {
    mode: "compare",
    title: "أُقَارِنُ",
    question: "مَنْ قَطَعَ وَحَدَاتٍ أَكْثَرَ؟",
    question_audio_key: "ex2_q4",
    background_image: "/lessons/v2/lesson33-amusement-lengths/s5.webp",
    routes: [
      {
        id: "mouse",
        label: "مسار الفأر",
        color: "#20A567",
        units: 6,
        start: { label: "الفأر", kind: "mouse", color: "#94A3B8" },
        end: { label: "الجبن", kind: "cheese", color: "#FFD54A" },
      },
      {
        id: "turtle",
        label: "مسار السلحفاة",
        color: "#F28C28",
        units: 8,
        start: { label: "السلحفاة", kind: "turtle", color: "#75BF72" },
        end: { label: "الورقة", kind: "leaf", color: "#5DBB63" },
      },
    ],
    options: ["الفأر", "السلحفاة"],
    correct: "السلحفاة",
    explanation: "أحسنت، السلحفاة قطعت وحدات أكثر.",
  },
] satisfies UnitMeasurePathItem[];
