// محتوى الدرس 3 — الحَوَاسُّ الخَمْس (رِحْلَة إِلَى حَظِيرَةِ القَالَة)
// المصدر: المنهاج، الجيل الثاني، السنة الأولى ابتدائي — درس "الحواس (1)"
// المفردات: السَّمْع، الرُّؤْيَة، الشَّمّ، الذَّوْق، اللَّمْس
//
// السيناريو: الأستاذ خليل يصطحب طلابه في نزهة إلى حظيرة القالة الوطنية
// لاكتشاف الحواس الخمس في بيئة طبيعية جزائرية.

export const LESSON_3_CONTENT = {
  metadata: {
    title_ar: "رِحْلَةُ الحَوَاسِّ",
    title_fr: "Le voyage des sens",
    subject: "math",
    grade: 1,
    sort_order: 3,
    template_version: 2,
    estimated_duration_seconds: 260,
  },
  audio_base: "/audio/lesson_3_senses",
  scenes: [
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-1-arrival.webp",
      audio_key: "l3_intro",
    },
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-2-sight-lake.webp",
      audio_key: "l3_sight",
    },
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-3-hearing-birds.webp",
      audio_key: "l3_hearing",
    },
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-4-smell-flower.webp",
      audio_key: "l3_smell",
    },
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-5-taste-fruit.webp",
      audio_key: "l3_taste",
    },
    {
      scene_image: "/lessons/v2/lesson3-senses/scene-6-touch-bark.webp",
      audio_key: "l3_touch",
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّب ←",
    },
  ],
};
