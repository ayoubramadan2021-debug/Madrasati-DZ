// الدرس 10 - التمرين 1: الثبات (ConservationV2) — جوهر الدرس
import type { ConservationItem } from "../exercises-v2/ConservationV2";

const OPTIONS = ["لا، بَقِيَ العَدَدُ كَما هُوَ", "نَعَمْ، تَغَيَّرَ العَدَدُ"];
const CORRECT = "لا، بَقِيَ العَدَدُ كَما هُوَ";

export const LESSON_10_EXERCISE_1: ConservationItem[] = [
  { emoji: "✏️", count: 5, question: "جَمَّعْنا الأَقْلامَ في صَفٍّ. هَلْ تَغَيَّرَ عَدَدُها؟", question_audio_key: "l10_ex1_q1", options: OPTIONS, correct: CORRECT },
  { emoji: "📓", count: 4, question: "جَمَّعْنا الكَرّاساتِ. هَلْ تَغَيَّرَ عَدَدُها؟", question_audio_key: "l10_ex1_q2", options: OPTIONS, correct: CORRECT },
  { emoji: "📐", count: 6, question: "جَمَّعْنا المَساطِرَ. هَلْ تَغَيَّرَ عَدَدُها؟", question_audio_key: "l10_ex1_q3", options: OPTIONS, correct: CORRECT },
  { emoji: "✂️", count: 3, question: "جَمَّعْنا المَقَصّاتِ. هَلْ تَغَيَّرَ عَدَدُها؟", question_audio_key: "l10_ex1_q4", options: OPTIONS, correct: CORRECT },
  { emoji: "✏️", count: 7, question: "جَمَّعْنا الأَقْلامَ في صَفٍّ. هَلْ تَغَيَّرَ عَدَدُها؟", question_audio_key: "l10_ex1_q5", options: OPTIONS, correct: CORRECT },
];

export const LESSON_10_EXERCISE_1_AUDIO_BASE = "/audio/lesson_10_exercises";
