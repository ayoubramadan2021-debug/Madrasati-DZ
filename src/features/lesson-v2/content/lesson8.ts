// الدرس 8: رِحْلَةُ الأَكْوَارِيُوم (الأعداد من 1 إلى 9) — الراوية تالين
// 5 مشاهد: وصول + 3 مشاهد عدّ كامل 1→9 (أسماك/نجوم/أصداف) + وداع.
export const LESSON_8_CONTENT = {
  metadata: {
    title_ar: "رِحْلَةُ الأَكْوَارِيُوم (الأعداد من 1 إلى 9)",
    title_fr: "La sortie a l'aquarium (1 a 9)",
    subject: "math",
    grade: 1,
    sort_order: 8,
    template_version: 2,
  },
  audio_base: "/audio/lesson_8_aquarium",
  scenes: [
    {
      scene_image: "/lessons/v2/lesson8-aquarium/s1.webp",
      audio_key: "s1_intro",
    },
    {
      scene_image: "/lessons/v2/lesson8-aquarium/s2.webp",
      audio_key: "s2_fish",
      items_count: 9,
      items_emoji_list: ["🐠", "🐠", "🐠", "🐠", "🐠", "🐠", "🐠", "🐠", "🐠"],
      count_word_indices: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      scene_image: "/lessons/v2/lesson8-aquarium/s3.webp",
      audio_key: "s3_stars",
      items_count: 9,
      items_emoji_list: ["/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg", "/scenes/starfish.svg"],
      count_word_indices: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      scene_image: "/lessons/v2/lesson8-aquarium/s4.webp",
      audio_key: "s4_shells",
      items_count: 9,
      items_emoji_list: ["🐚", "🐚", "🐚", "🐚", "🐚", "🐚", "🐚", "🐚", "🐚"],
      count_word_indices: [8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      scene_image: "/lessons/v2/lesson8-aquarium/s6.webp",
      audio_key: "s6_closing",
      is_closing: true,
      cta_text: "هَيَّا إِلَى التَّمَارِين ←",
    },
  ],
};
