// الدرس 6 - التمرين 1: عُدّ واختر الرقم (CountSelectV2)
// سياق: ساحة لعب مع خليل - كرات وألعاب
import type { CountSelectItem } from "../exercises-v2/CountSelectV2";

const Q = "عُدَّ الأَشْيَاءَ، ثُمَّ اخْتَرِ العَدَدَ الصَّحِيح";

export const LESSON_6_EXERCISE_1: CountSelectItem[] = [
  { items: ["⚽","⚽","⚽","⚽","⚽","⚽"], question: Q, question_audio_key: "l6_ex_q", options: ["5","6","7"], correct: "6" },
  { items: ["🏀","🏀","🏀","🏀","🏀","🏀","🏀"], question: Q, question_audio_key: "l6_ex_q", options: ["7","8","9"], correct: "7" },
  { items: ["🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈"], question: Q, question_audio_key: "l6_ex_q", options: ["6","8","9"], correct: "8" },
  { items: ["🪁","🪁","🪁","🪁","🪁","🪁","🪁","🪁","🪁"], question: Q, question_audio_key: "l6_ex_q", options: ["7","8","9"], correct: "9" },
  { items: ["🎾","🎾","🎾","🎾","🎾","🎾"], question: Q, question_audio_key: "l6_ex_q", options: ["6","7","8"], correct: "6" },
];

export const LESSON_6_EXERCISE_1_AUDIO_BASE = "/audio/lesson_6_exercises";
