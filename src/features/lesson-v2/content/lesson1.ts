// محتوى الدرس 1 — الأعداد من 1 إلى 5 (الجزء الأول)
// المصدر: المذكرة رقم 10، الجيل الثاني، السنة الأولى ابتدائي

export const LESSON_1_CONTENT = {
  metadata: {
    title_ar: "الأعداد من 1 إلى 5",
    title_fr: "Les nombres de 1 à 5",
    subject: "math",
    grade: 1,
    sort_order: 1,
    template_version: 2,
    estimated_duration_seconds: 240,
  },
  audio_base: "/audio/lesson_1_numbers_1_5",
  scenes: [
    // Scene 1: التهيئة (بدون تفاحات)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-1-intro.webp",
      audio_key: "l1_intro",
    },
    // Scene 2: العدد 1 — التفاحة تتوهج عند "وَاحِدَةً" (index 4)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-2-number-one.webp",
      audio_key: "l1_num_1",
      items_count: 1,
      items_emoji: "🍎",
      count_word_indices: [4],
    },
    // Scene 3: العدد 2 — التفاحة 1 عند "تُفَّاحَةٌ"(4)، التفاحة 2 عند "وَتُفَّاحَةٌ"(5)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-3-number-two.webp",
      audio_key: "l1_num_2",
      items_count: 2,
      items_emoji: "🍎",
      count_word_indices: [4, 5],
    },
    // Scene 4: العدد 3 — توهج عند "واحد"(8) "اثنان"(9) "ثلاثة"(10)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-4-number-three.webp",
      audio_key: "l1_num_3",
      items_count: 3,
      items_emoji: "🍎",
      count_word_indices: [8, 9, 10],
    },
    // Scene 5: العدد 4 — توهج عند "واحد"(6) "اثنان"(7) "ثلاثة"(8) "أربعة"(9)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-5-number-four.webp",
      audio_key: "l1_num_4",
      items_count: 4,
      items_emoji: "🍎",
      count_word_indices: [6, 7, 8, 9],
    },
    // Scene 6: العدد 5 — توهج عند "واحد"(5) "اثنان"(6) "ثلاثة"(7) "أربعة"(8) "خمسة"(9)
    {
      scene_image: "/lessons/v2/lesson1-numbers-1-5/scene-6-number-five.webp",
      audio_key: "l1_num_5",
      items_count: 5,
      items_emoji: "🍎",
      count_word_indices: [5, 6, 7, 8, 9],
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
