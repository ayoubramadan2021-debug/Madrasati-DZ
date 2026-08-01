import type { SortQuestion } from "../exercises-v2/SortSequenceExerciseV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 4 — رتّب العناصر
// تدرّج: 3 → 4 → 5 → 4 → 5 (متدرّج صحي)
// ═══════════════════════════════════════════════════════════════

export const LESSON_1_EXERCISE_4: SortQuestion[] = [
  // ─── Q1: 3 أرقام، تصاعدي (الأسهل) ───
  {
    question: "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَر",
    question_audio_key: "ex4_q1",
    direction: "asc",
    items: [
      { kind: "number", value: 3 },
      { kind: "number", value: 1 },
      { kind: "number", value: 2 },
    ],
  },
  // ─── Q2: 4 أرقام، تنازلي ───
  {
    question: "رَتِّبِ الْأَعْدَادَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَر",
    question_audio_key: "ex4_q2",
    direction: "desc",
    items: [
      { kind: "number", value: 2 },
      { kind: "number", value: 4 },
      { kind: "number", value: 1 },
      { kind: "number", value: 3 },
    ],
  },
  // ─── Q3: 5 أرقام، تصاعدي ───
  {
    question: "رَتِّبْ هَذِهِ الْأَعْدَادَ تَصَاعُدِيًّا",
    question_audio_key: "ex4_q3",
    direction: "asc",
    items: [
      { kind: "number", value: 3 },
      { kind: "number", value: 5 },
      { kind: "number", value: 1 },
      { kind: "number", value: 4 },
      { kind: "number", value: 2 },
    ],
  },
  // ─── Q4: 4 كميات تفاحات، تصاعدي ───
  {
    question: "رَتِّبِ الْكَمِّيَّاتِ مِنَ الْأَقَلِّ إِلَى الْأَكْثَر",
    question_audio_key: "ex4_q4",
    direction: "asc",
    items: [
      { kind: "count", value: 3, emoji: "🍎" },
      { kind: "count", value: 1, emoji: "🍎" },
      { kind: "count", value: 5, emoji: "🍎" },
      { kind: "count", value: 2, emoji: "🍎" },
    ],
  },
  // ─── Q5: تحدّي — 5 عناصر مختلطة (أرقام + كميات) ───
  {
    question: "تَحَدِّي. رَتِّبْ بَيْنَ الْأَعْدَادِ وَالْكَمِّيَّاتِ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَر",
    question_audio_key: "ex4_q5",
    direction: "asc",
    items: [
      { kind: "count", value: 2, emoji: "🍎" },
      { kind: "number", value: 5 },
      { kind: "count", value: 4, emoji: "🍎" },
      { kind: "number", value: 1 },
      { kind: "number", value: 3 },
    ],
  },
];

export const LESSON_1_EXERCISE_4_AUDIO_BASE = "/audio/lesson_1_exercises";
