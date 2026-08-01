// محتوى الدرس 4 — الأعداد من 1 إلى 5 (2): مُقَارَنَةُ الكَمِّيَّات
// المصدر: المنهاج، الجيل الثاني، السنة الأولى ابتدائي — صفحة 17
// المفردات الجديدة: أَكْثَر، أَقَلّ، يُسَاوِي
// السيناريو: خليل في سوق الفواكه يعلّم مقارنة الكميات بالفواكه المتباينة.

const BG = "/lessons/v2/lesson4-compare/scene-market.webp";

export const LESSON_4_CONTENT = {
  metadata: {
    title_ar: "أَكْثَرُ وَأَقَلُّ",
    title_fr: "Plus et moins",
    subject: "math",
    grade: 1,
    sort_order: 4,
    template_version: 2,
    estimated_duration_seconds: 240,
  },
  audio_base: "/audio/lesson_4_compare",
  scenes: [
    {
      scene_image: BG,
      audio_key: "l4_intro",
    },
    {
      scene_image: BG,
      audio_key: "l4_more",
      items_count: 6,
      items_emoji_list: ["🍎", "🍎", "🍎", "🍎", "🍌", "🍌"],
    },
    {
      scene_image: BG,
      audio_key: "l4_less",
      items_count: 6,
      items_emoji_list: ["🍓", "🍓", "🍊", "🍊", "🍊", "🍊"],
    },
    {
      scene_image: BG,
      audio_key: "l4_equal",
      items_count: 6,
      items_emoji_list: ["🍇", "🍇", "🍇", "🍒", "🍒", "🍒"],
    },
    {
      scene_image: BG,
      audio_key: "l4_apply",
      items_count: 5,
      items_emoji_list: ["🍎", "🍎", "🍎", "🍊", "🍊"],
    },
    {
      scene_image: BG,
      audio_key: "l4_outro",
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّب ←",
    },
  ],
};
