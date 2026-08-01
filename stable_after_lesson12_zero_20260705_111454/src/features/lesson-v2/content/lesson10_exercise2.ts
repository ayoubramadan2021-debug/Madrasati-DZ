// الدرس 10 - التمرين 2: عُدّ الأدوات واختر العدد (CountSelectV2)
import type { CountSelectItem } from "../exercises-v2/CountSelectV2";

const Q = "عُدَّ الأَدَواتِ، ثُمَّ اخْتَرِ العَدَدَ الصَّحِيح";

export const LESSON_10_EXERCISE_2: CountSelectItem[] = [
  { items: ["✏️","✏️","✏️"], question: Q, question_audio_key: "l10_ex2_q", options: ["2","3","4"], correct: "3" },
  { items: ["📓","📓","📓","📓","📓"], question: Q, question_audio_key: "l10_ex2_q", options: ["4","5","6"], correct: "5" },
  { items: ["📐","📐","📐","📐","📐","📐"], question: Q, question_audio_key: "l10_ex2_q", options: ["5","6","7"], correct: "6" },
  { items: ["✂️","✂️","✂️","✂️"], question: Q, question_audio_key: "l10_ex2_q", options: ["3","4","5"], correct: "4" },
  { items: ["✏️","✏️","✏️","✏️","✏️","✏️","✏️"], question: Q, question_audio_key: "l10_ex2_q", options: ["6","7","8"], correct: "7" },
];

export const LESSON_10_EXERCISE_2_AUDIO_BASE = "/audio/lesson_10_exercises";
