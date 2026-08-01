// الدرس 8 - التمرين 2: اختر المجموعة المطابقة للعدد (CountTapExerciseV2)
import type { CountTapItem } from "../exercises-v2/CountTapExerciseV2";

export const LESSON_8_EXERCISE_2: CountTapItem[] = [
  { target_number: 4, question: "اِخْتَرِ المَجْمُوعَةَ الَّتِي بِهَا أَرْبَعُ سَمَكَاتٍ", question_audio_key: "l8_ex2_q1", count_word_index: 4, options: [3, 4, 5], correct_index: 1, items_emoji: "🐠" },
  { target_number: 6, question: "اِخْتَرِ المَجْمُوعَةَ الَّتِي بِهَا سِتُّ أَصْدَافٍ", question_audio_key: "l8_ex2_q2", count_word_index: 4, options: [6, 5, 7], correct_index: 0, items_emoji: "🐚" },
  { target_number: 8, question: "اِخْتَرِ المَجْمُوعَةَ الَّتِي بِهَا ثَمَانِي سَلَطَعُونَاتٍ", question_audio_key: "l8_ex2_q3", count_word_index: 4, options: [7, 9, 8], correct_index: 2, items_emoji: "🦀" },
  { target_number: 9, question: "اِخْتَرِ المَجْمُوعَةَ الَّتِي بِهَا تِسْعُ أَخْطَبُوطَاتٍ", question_audio_key: "l8_ex2_q4", count_word_index: 4, options: [9, 7, 8], correct_index: 0, items_emoji: "🐙" },
  { target_number: 5, question: "اِخْتَرِ المَجْمُوعَةَ الَّتِي بِهَا خَمْسُ سَمَكَاتٍ", question_audio_key: "l8_ex2_q5", count_word_index: 4, options: [4, 6, 5], correct_index: 2, items_emoji: "🐟" },
];

export const LESSON_8_EXERCISE_2_AUDIO_BASE = "/audio/lesson_8_exercises";
