// الدرس 8 - التمرين 1: عُدّ واختر الرقم (CountSelectV2) — أكواريوم، 1→9
import type { CountSelectItem } from "../exercises-v2/CountSelectV2";

const Q = "عُدَّ الأَشْيَاءَ، ثُمَّ اخْتَرِ العَدَدَ الصَّحِيح";

export const LESSON_8_EXERCISE_1: CountSelectItem[] = [
  { items: ["🐠","🐠","🐠"], question: Q, question_audio_key: "l8_ex_q", options: ["2","3","4"], correct: "3" },
  { items: ["🐚","🐚","🐚","🐚","🐚"], question: Q, question_audio_key: "l8_ex_q", options: ["4","5","6"], correct: "5" },
  { items: ["🦀","🦀","🦀","🦀","🦀","🦀","🦀"], question: Q, question_audio_key: "l8_ex_q", options: ["6","7","8"], correct: "7" },
  { items: ["🐟","🐟"], question: Q, question_audio_key: "l8_ex_q", options: ["1","2","3"], correct: "2" },
  { items: ["🐙","🐙","🐙","🐙","🐙","🐙","🐙","🐙","🐙"], question: Q, question_audio_key: "l8_ex_q", options: ["7","8","9"], correct: "9" },
];

export const LESSON_8_EXERCISE_1_AUDIO_BASE = "/audio/lesson_8_exercises";
