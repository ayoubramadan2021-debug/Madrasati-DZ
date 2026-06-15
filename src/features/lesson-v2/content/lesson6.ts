// الدرس 6: سَاحَةُ خَلِيل (سِتَّة إِلَى تِسْعَة) — عدّ متحرك + تعيين الكمية
// المنهاج: الأعداد من 6 إلى 9 (جزء 2)
// صور ساحة خليل (lesson6-yard)

export const LESSON_6_CONTENT = {
  metadata: {
    title_ar: "سَاحَةُ خَلِيل (سِتَّة إِلَى تِسْعَة)",
    title_fr: "Le terrain de Khalil (6 a 9)",
    subject: "math",
    grade: 1,
    sort_order: 6,
    template_version: 2,
  },
  audio_base: "/audio/lesson_6_counting",
  scenes: [
    {
      scene_image: "/lessons/v2/lesson6-yard/s1.webp",
      audio_key: "s1_intro",
    },
    {
      scene_image: "/lessons/v2/lesson6-yard/s2.webp",
      audio_key: "s2_six",
      items_count: 6,
      items_emoji_list: ["⚽", "⚽", "⚽", "⚽", "⚽", "⚽"],
      count_word_indices: [5, 6, 7, 8, 9, 10],
    },
    {
      scene_image: "/lessons/v2/lesson6-yard/s3.webp",
      audio_key: "s3_seven",
      items_count: 7,
      items_emoji_list: ["🏀", "🏀", "🏀", "🏀", "🏀", "🏀", "🏀"],
      count_word_indices: [6, 7, 8, 9, 10, 11, 12],
    },
    {
      scene_image: "/lessons/v2/lesson6-yard/s4.webp",
      audio_key: "s4_eight",
      items_count: 8,
      items_emoji_list: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"],
      count_word_indices: [5, 6, 7, 8, 9, 10, 11, 12],
    },
    {
      scene_image: "/lessons/v2/lesson6-yard/s5.webp",
      audio_key: "s5_nine",
      items_count: 9,
      items_emoji_list: ["🪁", "🪁", "🪁", "🪁", "🪁", "🪁", "🪁", "🪁", "🪁"],
      count_word_indices: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    },
    {
      scene_image: "/lessons/v2/lesson6-yard/s6.webp",
      audio_key: "s6_closing",
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّب ←",
    },
  ],
};
