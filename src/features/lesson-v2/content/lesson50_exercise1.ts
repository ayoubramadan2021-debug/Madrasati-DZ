import type {
  Lesson50Question,
} from "./lesson50_types";

export const lesson50Exercise1: Lesson50Question[] = [
  {
    id: "m1_q1",
    question: "أَيُّ سَهْمٍ يَدُلُّ عَلَى الْيَمِينِ؟",
    question_audio_key: "m1_q1_right",

    focusEmoji: "🧭",
    focusLabel: "أُلاحظُ الأَسْهُمَ",

    options: [
      {
        id: "a",
        content: "→",
        ariaLabel: "→",
      },
      {
        id: "b",
        content: "←",
        ariaLabel: "←",
      },
      {
        id: "c",
        content: "↑",
        ariaLabel: "↑",
      },
      {
        id: "d",
        content: "↓",
        ariaLabel: "↓",
      },
    ],
    correctId: "a",
    backgroundImage: "/lessons/v2/lesson50/s2.webp",
  },
  {
    id: "m1_q2",
    question: "أَيُّ سَهْمٍ يَدُلُّ عَلَى الْأَعْلَىَ؟",
    question_audio_key: "m1_q2_up",

    focusEmoji: "🧭",
    focusLabel: "أُلاحظُ الأَسْهُمَ",

    options: [
      {
        id: "a",
        content: "↓",
        ariaLabel: "↓",
      },
      {
        id: "b",
        content: "↑",
        ariaLabel: "↑",
      },
      {
        id: "c",
        content: "→",
        ariaLabel: "→",
      },
      {
        id: "d",
        content: "←",
        ariaLabel: "←",
      },
    ],
    correctId: "b",
    backgroundImage: "/lessons/v2/lesson50/s2.webp",
  },
  {
    id: "m1_q3",
    question: "اِتَّبِعْ: يَمِينٌ، ثُمَّ أَعْلَى.",
    question_audio_key: "m1_q3_path",

    focusEmoji: "🧭",
    focusLabel: "أُلاحظُ الأَسْهُمَ",

    options: [
      {
        id: "a",
        content: "→ ↑",
        ariaLabel: "→ ↑",
      },
      {
        id: "b",
        content: "↑ →",
        ariaLabel: "↑ →",
      },
      {
        id: "c",
        content: "← ↓",
        ariaLabel: "← ↓",
      },
      {
        id: "d",
        content: "↓ ←",
        ariaLabel: "↓ ←",
      },
    ],
    correctId: "a",
    backgroundImage: "/lessons/v2/lesson50/s2.webp",
  },
  {
    id: "m1_q4",
    question: "أَيُّ سَهْمٍ يَدُلُّ عَلَى الْأَسْفَلِ؟",
    question_audio_key: "m1_q4_down",

    focusEmoji: "🧭",
    focusLabel: "أُلاحظُ الأَسْهُمَ",

    options: [
      {
        id: "a",
        content: "↑",
        ariaLabel: "↑",
      },
      {
        id: "b",
        content: "→",
        ariaLabel: "→",
      },
      {
        id: "c",
        content: "↓",
        ariaLabel: "↓",
      },
      {
        id: "d",
        content: "←",
        ariaLabel: "←",
      },
    ],
    correctId: "c",
    backgroundImage: "/lessons/v2/lesson50/s2.webp",
  },
];
