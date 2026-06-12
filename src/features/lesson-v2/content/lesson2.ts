// محتوى الدرس 2 — بَيْتُ تَالِينْ (تعيين موقع في الفضاء)
// المصدر: المذكرة رقم 11، الجيل الثاني، السنة الأولى ابتدائي
// المفردات: أمام، وراء، بجانب، مقابل
// 
// ملاحظة: لا نستخدم items_emoji هنا لأن DALL-E scenes تُجسّد المواقع بصرياً
// والـemojis ستكون زائدة ومُشوّشة (لا تُظهر العلاقة بين الأشياء)

export const LESSON_2_CONTENT = {
  metadata: {
    title_ar: "بَيْتُ تَالِينْ",
    title_fr: "La maison de Taline",
    subject: "math",
    grade: 1,
    sort_order: 2,
    template_version: 2,
    estimated_duration_seconds: 240,
  },
  audio_base: "/audio/lesson_2_house",
  scenes: [
    {
      scene_image: "/lessons/v2/lesson2-house/scene-1-entrance.webp",
      audio_key: "l2_intro",
    },
    {
      scene_image: "/lessons/v2/lesson2-house/scene-2-tv-sofa.webp",
      audio_key: "l2_amam",
    },
    {
      scene_image: "/lessons/v2/lesson2-house/scene-3-window-sofa.webp",
      audio_key: "l2_waraa",
    },
    {
      scene_image: "/lessons/v2/lesson2-house/scene-4-fridge-oven.webp",
      audio_key: "l2_bijanib",
    },
    {
      scene_image: "/lessons/v2/lesson2-house/scene-5-bed-window.webp",
      audio_key: "l2_muqabil",
    },
    {
      scene_image: "/lessons/v2/lesson2-house/scene-6-garden.webp",
      audio_key: "l2_outro",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
