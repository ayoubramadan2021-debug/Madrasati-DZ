export const lesson51CanonicalText = {
  lesson51_s1:
    "مَرْحَبًا أَحِبَّائِي! نَلْتَقِي اللَّيْلَةَ فِي مَدِينَةِ الْأَلْعَابِ وَالتَّرْفِيهِ، لِنُجَنِّدَ مَعَارِفَنَا فِي الْحَصِيلَةِ الْأُولَى.",

  lesson51_s2:
    "نُرَتِّبُ الْأَشْيَاءَ، وَنُحَدِّدُ الْأَوَّلَ وَالثَّانِيَ وَالثَّالِثَ.",

  lesson51_s3:
    "نَجْمَعُ ثَلَاثَةَ مُكَعَّبَاتٍ وَمُكَعَّبَيْنِ. ثَلَاثَةٌ زَائِدُ اثْنَيْنِ يُسَاوِي خَمْسَةً.",

  lesson51_s4:
    "نُكَوِّنُ الْعَدَدَ عَشَرَةَ. أَرْبَعَةٌ وَسِتَّةٌ، وَسَبْعَةٌ وَثَلَاثَةٌ، وَخَمْسَةٌ وَخَمْسَةٌ.",

  lesson51_s5:
    "نَعُدُّ التُّفَّاحَاتِ: وَاحِدَةٌ، اثْنَتَانِ، ثَلَاثٌ، أَرْبَعٌ، خَمْسٌ. نَرَى خَمْسَ تُفَّاحَاتٍ.",

  lesson51_s6:
    "أَحْسَنْتُمْ! رَتَّبْنَا وَجَمَعْنَا، وَكَوَّنَّا الْعَدَدَ عَشَرَةَ، وَعَدَدْنَا الْأَشْيَاءَ. هَيَّا نَتَدَرَّبُ!",
} as const;

export const lesson51 = {
  id: "lesson51",
  lesson_number: 51,

  title:
    "الْحَصِيلَةُ 1 — أُجَنِّدُ مَعَارِفِي فِي مَدِينَةِ الْأَلْعَابِ وَالتَّرْفِيهِ",

  title_fr:
    "Bilan 1 — Je mobilise mes acquis dans la cité des jeux et des loisirs",

  subject: "math",
  teacher: "taline",

  audio_base:
    "/audio/teachers/taline/lesson_51_bilan_1",

  exercisePath:
    "/lesson-v2/51/exercises",

  nextLessonKey: "lesson52",

  objectives: [
    "ترتيب الأشياء وتحديد الأول والثاني والثالث.",
    "إنجاز عمليات جمع نتائجها لا تتجاوز 19.",
    "إكمال عمليات جمع للوصول إلى 19.",
    "عد عناصر مجموعة إلى 19 بدقة.",
    "تجنيد المكتسبات السابقة في وضعيات متنوعة.",
  ],

  slides: [
    {
      scene: 1,
      key: "lesson51_s1",
      audio_key: "lesson51_s1",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s1.webp",
      scene_image: "/lessons/v2/lesson51/s1.webp",
      text: lesson51CanonicalText.lesson51_s1,
    },
    {
      scene: 2,
      key: "lesson51_s2",
      audio_key: "lesson51_s2",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s2.webp",
      scene_image: "/lessons/v2/lesson51/s2.webp",
      text: lesson51CanonicalText.lesson51_s2,
    },
    {
      scene: 3,
      key: "lesson51_s3",
      audio_key: "lesson51_s3",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s3.webp",
      scene_image: "/lessons/v2/lesson51/s3.webp",
      text: lesson51CanonicalText.lesson51_s3,
    },
    {
      scene: 4,
      key: "lesson51_s4",
      audio_key: "lesson51_s4",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s4.webp",
      scene_image: "/lessons/v2/lesson51/s4.webp",
      text: lesson51CanonicalText.lesson51_s4,
    },
    {
      scene: 5,
      key: "lesson51_s5",
      audio_key: "lesson51_s5",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s5.webp",
      scene_image: "/lessons/v2/lesson51/s5.webp",
      text: lesson51CanonicalText.lesson51_s5,
    },
    {
      scene: 6,
      key: "lesson51_s6",
      audio_key: "lesson51_s6",
      speaker: "taline",
      image: "/lessons/v2/lesson51/s6.webp",
      scene_image: "/lessons/v2/lesson51/s6.webp",
      text: lesson51CanonicalText.lesson51_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;

export type Lesson51 = typeof lesson51;
