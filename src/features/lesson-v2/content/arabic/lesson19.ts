import lesson19Anthem from "./lesson19_anthem";

const arabicLesson19 = {
  id: "arabic-w02-u08",
  lessonKey: "arabic-w02-u08",
  lesson_number: 19,
  num: 19,
  world_lesson: 8,
  subject: "arabic",
  subjectId: "arabic",
  lesson_type: "memorization",
  category: "محفوظات",
  grade: 1,
  world_id: "school",
  worldTitle: "مدرستي",
  sort_order: 8,
  title: "مدرستي",
  title_fr: "Mon école",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson19",
  exercisePath: "/lesson-v2/arabic/lesson19/exercises",

  objectives: [
    "أستمع إلى أنشودة مدرستي باهتمام.",
    "أردد أبيات الأنشودة بصوت واضح.",
    "أتعرف على قيمة المدرسة في حياتي.",
    "أحب مدرستي وأفتخر بها."
  ],

  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/arabic/lesson19/s1.webp",
      image: "/lessons/v2/arabic/lesson19/s1.webp",
      audio_key: "lesson19_s1",
      audioKey: "lesson19_s1",
      speaker: "taline",
      text: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَرَّفُ عَلَى أُنْشُودَةٍ جَمِيلَةٍ عَنْ مدرستي.",
      semanticHighlights: [
        { text: "مدرستي", color: "blue" }
      ]
    },

    {
      scene: 2,
      is_anthem_card: true,
      anthem_layout: true,
      layout_kind: "anthem",
      is_anthem: true,
      scene_image: "/lessons/v2/arabic/lesson19/s2.webp",
      image: "/lessons/v2/arabic/lesson19/s2.webp",
      audio_key: "lesson19_s2",
      audioKey: "lesson19_s2",
      anthem_label: "أُنْشُودَةُ",
      anthem_line_breaks: ["قريبة", "متسعة", "صحبي", "أديبا"],
      anthem_title: lesson19Anthem.title,
      anthem_verses: lesson19Anthem.anthem_verses,
      text: lesson19Anthem.text,
      words: [],
      semanticHighlights: lesson19Anthem.semanticHighlights
    },

    {
      scene: 3,
      scene_image: "/lessons/v2/arabic/lesson19/s3.webp",
      image: "/lessons/v2/arabic/lesson19/s3.webp",
      audio_key: "lesson19_s3",
      audioKey: "lesson19_s3",
      speaker: "khalil",
      text: "الْمَدْرَسَةُ هِيَ بَيْتُنَا الثَّانِي يَا أَصْدِقَائِي! فِيهَا نَتَعَلَّمُ الْأَخْلَاقَ، وَنَبْنِي شَخْصِيَّتَنَا لِنَكُونَ أَشْخَاصًا صَالِحِينَ.",
      semanticHighlights: [
        { text: "بَيْتُنَا الثَّانِي", color: "blue" },
        { text: "الْأَخْلَاقَ", color: "blue" }
      ]
    },

    {
      scene: 4,
      scene_image: "/lessons/v2/arabic/lesson19/s4.webp",
      image: "/lessons/v2/arabic/lesson19/s4.webp",
      audio_key: "lesson19_s4",
      audioKey: "lesson19_s4",
      speaker: "taline",
      text: "وَبِفَضْلِهَا سَنُحَقِّقُ أَحْلَامَنَا! مِنَّا مَنْ سَيُصْبِحُ طَبِيبًا يُعَالِجُ الْمَرْضَى، أَوْ كَاتِبًا مُبْدِعًا، أَوْ إِنْسَانًا فَاعِلًا يَخْدِمُ وَطَنَهُ وَمُجْتَمَعَهُ.",
      semanticHighlights: [
        { text: "أَحْلَامَنَا", color: "blue" },
        { text: "وَطَنَهُ", color: "blue" }
      ]
    },

    {
      scene: 5,
      scene_image: "/lessons/v2/arabic/lesson19/s5.webp",
      image: "/lessons/v2/arabic/lesson19/s5.webp",
      audio_key: "lesson19_s5",
      audioKey: "lesson19_s5",
      speaker: "taline",
      is_closing: true,
      cta_text: "ابدأ النشاطات",
      text: "أَحْسَنْتُمْ يَا أَصْدِقَائِي! لَقَدْ تَعَلَّمْتُمُ الْيَوْمَ فَضْلَ الْمَدْرَسَةِ الْعَظِيمَ. هَيَّا بِنَا نَنْطَلِقُ إِلَى النَّشَاطَاتِ!",
      semanticHighlights: [
        { text: "الْمَدْرَسَةِ", color: "blue" },
        { text: "النَّشَاطَاتِ", color: "blue" }
      ]
    }
  ]
} as const;

export default arabicLesson19;
