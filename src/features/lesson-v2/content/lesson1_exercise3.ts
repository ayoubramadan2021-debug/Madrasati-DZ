import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 3 — ربط مرن، 5 أنماط مختلفة
// Q1: رقم → كمية (الكلاسيكي)
// Q2: كمية → رقم (معكوس)
// Q3: كلمة → كمية
// Q4: رقم → كلمة
// Q5: متقدم 4 أزواج
// ═══════════════════════════════════════════════════════════════

export const LESSON_1_EXERCISE_3: DragMatchItem[] = [
  // ─── Q1: رقم → كمية (3 أزواج) ───
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الْكَمِّيَّةِ الْمُنَاسِبَةِ",
    question_audio_key: "ex3_q1",
    pairs: [
      {
        match_id: "p1",
        draggable: { kind: "number", value: 1 },
        target: { kind: "count", value: 1, emoji: "🍎" },
      },
      {
        match_id: "p2",
        draggable: { kind: "number", value: 2 },
        target: { kind: "count", value: 2, emoji: "🍎" },
      },
      {
        match_id: "p3",
        draggable: { kind: "number", value: 3 },
        target: { kind: "count", value: 3, emoji: "🍎" },
      },
    ],
  },
  // ─── Q2: كمية → رقم (معكوس، 3 أزواج) ───
  {
    question: "اِسْحَبْ كُلَّ مَجْمُوعَةِ تُفَّاحَاتٍ إِلَى رَقَمِهَا",
    question_audio_key: "ex3_q2",
    pairs: [
      {
        match_id: "p1",
        draggable: { kind: "count", value: 2, emoji: "🍎" },
        target: { kind: "number", value: 2 },
      },
      {
        match_id: "p2",
        draggable: { kind: "count", value: 3, emoji: "🍎" },
        target: { kind: "number", value: 3 },
      },
      {
        match_id: "p3",
        draggable: { kind: "count", value: 4, emoji: "🍎" },
        target: { kind: "number", value: 4 },
      },
    ],
  },
  // ─── Q3: كلمة → كمية (3 أزواج) ───
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الْكَمِّيَّةِ الْمُوَافِقَةِ لَهَا",
    question_audio_key: "ex3_q3",
    pairs: [
      {
        match_id: "p1",
        draggable: { kind: "word", value: "وَاحِد" },
        target: { kind: "count", value: 1, emoji: "🍎" },
      },
      {
        match_id: "p2",
        draggable: { kind: "word", value: "ثَلَاثَة" },
        target: { kind: "count", value: 3, emoji: "🍎" },
      },
      {
        match_id: "p3",
        draggable: { kind: "word", value: "خَمْسَة" },
        target: { kind: "count", value: 5, emoji: "🍎" },
      },
    ],
  },
  // ─── Q4: رقم → كلمة (3 أزواج) ───
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الْكَلِمَةِ الَّتِي تَدُلُّ عَلَيْه",
    question_audio_key: "ex3_q4",
    pairs: [
      {
        match_id: "p1",
        draggable: { kind: "number", value: 2 },
        target: { kind: "word", value: "اِثْنَان" },
      },
      {
        match_id: "p2",
        draggable: { kind: "number", value: 4 },
        target: { kind: "word", value: "أَرْبَعَة" },
      },
      {
        match_id: "p3",
        draggable: { kind: "number", value: 5 },
        target: { kind: "word", value: "خَمْسَة" },
      },
    ],
  },
  // ─── Q5: متقدم — 4 أزواج، خليط ───
  {
    question: "تَحَدَّى نَفْسَك. اِرْبِطْ كُلَّ شَيْءٍ بِمَكَانِهِ الصَّحِيح",
    question_audio_key: "ex3_q5",
    pairs: [
      {
        match_id: "p1",
        draggable: { kind: "number", value: 1 },
        target: { kind: "count", value: 1, emoji: "🍎" },
      },
      {
        match_id: "p2",
        draggable: { kind: "word", value: "ثَلَاثَة" },
        target: { kind: "count", value: 3, emoji: "🍎" },
      },
      {
        match_id: "p3",
        draggable: { kind: "number", value: 4 },
        target: { kind: "word", value: "أَرْبَعَة" },
      },
      {
        match_id: "p4",
        draggable: { kind: "count", value: 5, emoji: "🍎" },
        target: { kind: "number", value: 5 },
      },
    ],
  },
];

export const LESSON_1_EXERCISE_3_AUDIO_BASE = "/audio/lesson_1_exercises";
