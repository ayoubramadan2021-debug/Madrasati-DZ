// الدرس 5: مَطْبَخُ تَالِين (سِتَّة إِلَى تِسْعَة) — عدّ متحرك + مقارنة
// المنهاج: الأعداد من 6 إلى 9 (جزء 1)
// كل عنصر يصعد ويومض عند نطق عدده (count_word_indices) — مثل درس 1-5


export const LESSON_5_CONTENT = {
  metadata: {
    title_ar: "مَطْبَخُ تَالِين (سِتَّة إِلَى تِسْعَة)",
    title_fr: "La cuisine de Taline (6 a 9)",
    subject: "math",
    grade: 1,
    sort_order: 5,
    template_version: 2,
  },
  audio_base: "/audio/lesson_5_counting",
  scenes: [
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s1.webp",
      audio_key: "s1_intro",
    },
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s2.webp",
      audio_key: "s2_six",
      items_count: 6,
      items_emoji_list: ["🥄", "🥄", "🥄", "🥄", "🥄", "🥄"],
      count_word_indices: [5, 6, 7, 8, 9, 10],
    },
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s3.webp",
      audio_key: "s3_seven",
      items_count: 7,
      items_emoji_list: ["☕", "☕", "☕", "☕", "☕", "☕", "☕"],
      count_word_indices: [5, 6, 7, 8, 9, 10, 11],
    },
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s4.webp",
      audio_key: "s4_eight",
      items_count: 8,
      items_emoji_list: ["🍽️", "🍽️", "🍽️", "🍽️", "🍽️", "🍽️", "🍽️", "🍽️"],
      count_word_indices: [5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s5.webp",
      audio_key: "s5_nine",
      items_count: 9,
      items_emoji_list: ["🥛", "🥛", "🥛", "🥛", "🥛", "🥛", "🥛", "🥛", "🥛"],
      count_word_indices: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    {
      scene_image: "/lessons/v2/lesson5-kitchen/s6.webp",
      audio_key: "s6_closing",
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّب ←",
    },
  ],
};
