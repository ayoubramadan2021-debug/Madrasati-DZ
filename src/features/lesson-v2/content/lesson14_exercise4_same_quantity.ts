import type { MemorySameQuantityItem } from "../exercises-v2/MemorySameQuantityExerciseV2";

export const LESSON_14_EXERCISE_4_SAME_QUANTITY: MemorySameQuantityItem[] = [
  {
    sample_items: ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪"],
    question: "اِخْتَرِ مَجْمُوعَةَ المُكَعَّبَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    question_audio_key: "l14_same_q1",
    options: [
      { items: ["🟥", "🟧", "🟨", "🟩", "🟦"], label: "" },
      { items: ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪"], label: "" },
      { items: ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫"], label: "" },
    ],
    correct_index: 1,
    show_ms: 3000,
  },
  {
    sample_items: ["🔵", "🟢", "🟡", "🟠", "🔴", "🟤", "🟣"],
    question: "اِخْتَرِ مَجْمُوعَةَ الكُرَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    question_audio_key: "l14_same_q2",
    options: [
      { items: ["🔵", "🟢", "🟡", "🟠", "🔴", "🟤"], label: "" },
      { items: ["🔵", "🟢", "🟡", "🟠", "🔴", "🟤", "🟣"], label: "" },
      { items: ["🔵", "🟢", "🟡", "🟠", "🔴", "🟤", "🟣", "⚪"], label: "" },
    ],
    correct_index: 1,
    show_ms: 3000,
  },
  {
    sample_items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"],
    question: "اِخْتَرِ مَجْمُوعَةَ البَالُونَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    question_audio_key: "l14_same_q3",
    options: [
      { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], label: "" },
      { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], label: "" },
      { items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], label: "" },
    ],
    correct_index: 1,
    show_ms: 3000,
  },
  {
    sample_items: ["🍎", "🍎", "🍎", "🍎", "🍎"],
    question: "اِخْتَرِ مَجْمُوعَةَ التُّفَّاحَاتِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    question_audio_key: "l14_same_q4",
    options: [
      { items: ["🍎", "🍎", "🍎", "🍎"], label: "" },
      { items: ["🍎", "🍎", "🍎", "🍎", "🍎"], label: "" },
      { items: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎"], label: "" },
    ],
    correct_index: 1,
    show_ms: 2600,
  },
  {
    sample_items: ["⭐", "⭐", "⭐", "⭐"],
    question: "اِخْتَرِ مَجْمُوعَةَ النُّجُومِ الَّتِي لَهَا نَفْسُ الكَمِّيَّةِ.",
    question_audio_key: "l14_same_q5",
    options: [
      { items: ["⭐", "⭐", "⭐"], label: "" },
      { items: ["⭐", "⭐", "⭐", "⭐"], label: "" },
      { items: ["⭐", "⭐", "⭐", "⭐", "⭐"], label: "" },
    ],
    correct_index: 1,
    show_ms: 2400,
  },
];

export const LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE = "/audio/lesson_14_exercises";
