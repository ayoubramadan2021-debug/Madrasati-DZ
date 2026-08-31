export type IslamicSemanticColor = "green" | "blue" | "red";

export type IslamicSemanticHighlight = {
  text: string;
  color: IslamicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson08CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ كَيْفَ نُعَبِّرُ عَنْ حُبِّنَا لِعَائِلَتِنَا بِالْكَلَامِ الطَّيِّبِ وَالْعَمَلِ الْجَمِيلِ.",
  s2: "أُحِبُّ أُمِّي الْغَالِيَةَ، وَأُسْعِدُهَا بِكَلِمَةٍ طَيِّبَةٍ أَوْ هَدِيَّةٍ جَمِيلَةٍ.",
  s3: "أَشْكُرُ أَبِي الْكَرِيمَ عَلَى مَا يُقَدِّمُهُ لِي، وَأُعَبِّرُ لَهُ عَنْ امْتِنَانِي بِأَدَبٍ.",
  s4: "أُحِبُّ جَدِّي الْعَزِيزَ، وَأَحْتَرِمُهُ وَأُسْعِدُهُ بِالْكَلَامِ الطَّيِّبِ وَالْهَدِيَّةِ الْجَمِيلَةِ.",
  s5: "أُحِبُّ إِخْوَتِي، وَأُشَارِكُهُمْ وَأُقَدِّمُ لَهُمْ الْهَدَايَا الْجَمِيلَةَ.",
  s6: "أَشْكُرُ مَنْ يُعَلِّمُنِي، وَأَبْتَسِمُ دَائِمًا، فَالْكَلِمَةُ الطَّيِّبَةُ وَالِابْتِسَامَةُ تَنْشُرَانِ الْمَحَبَّةَ.",
  s7: "أَحْسَنْتَ يَا فَاضِلُ! أُحِبُّ عَائِلَتِي، وَأَحْفَظُ سُورَةَ الْفَاتِحَةِ وَأُسْمِعُهَا لِعَائِلَتِي.",
} as const;

export const lesson08SemanticHighlights:
Record<string, IslamicSemanticHighlight[]> = {
  s1: [{ text: "حُبِّنَا", color: "blue", role: "keyword" }, { text: "لِعَائِلَتِنَا", color: "blue", role: "keyword" }, { text: "الطَّيِّبِ", color: "blue", role: "keyword" }, { text: "الْجَمِيلِ", color: "blue", role: "keyword" }],
  s2: [{ text: "أُحِبُّ", color: "blue", role: "keyword" }, { text: "أُمِّي", color: "blue", role: "keyword" }, { text: "الْغَالِيَةَ", color: "blue", role: "keyword" }, { text: "هَدِيَّةٍ", color: "blue", role: "keyword" }, { text: "جَمِيلَةٍ", color: "blue", role: "keyword" }],
  s3: [{ text: "أَشْكُرُ", color: "blue", role: "keyword" }, { text: "أَبِي", color: "blue", role: "keyword" }, { text: "الْكَرِيمَ", color: "blue", role: "keyword" }, { text: "امْتِنَانِي", color: "blue", role: "keyword" }, { text: "بِأَدَبٍ", color: "blue", role: "keyword" }],
  s4: [{ text: "أُحِبُّ", color: "blue", role: "keyword" }, { text: "جَدِّي", color: "blue", role: "keyword" }, { text: "الْعَزِيزَ", color: "blue", role: "keyword" }, { text: "أَحْتَرِمُهُ", color: "blue", role: "keyword" }, { text: "الْهَدِيَّةِ", color: "blue", role: "keyword" }],
  s5: [{ text: "أُحِبُّ", color: "blue", role: "keyword" }, { text: "إِخْوَتِي", color: "blue", role: "keyword" }, { text: "أُشَارِكُهُمْ", color: "blue", role: "keyword" }, { text: "الْهَدَايَا", color: "blue", role: "keyword" }, { text: "الْجَمِيلَةَ", color: "blue", role: "keyword" }],
  s6: [{ text: "أَشْكُرُ", color: "blue", role: "keyword" }, { text: "يُعَلِّمُنِي", color: "blue", role: "keyword" }, { text: "وَأَبْتَسِمُ", color: "blue", role: "keyword" }, { text: "الطَّيِّبَةُ", color: "blue", role: "keyword" }, { text: "الْمَحَبَّةَ", color: "blue", role: "keyword" }],
  s7: [{ text: "فَاضِلُ", color: "green", role: "keyword" }, { text: "أُحِبُّ", color: "blue", role: "keyword" }, { text: "عَائِلَتِي", color: "blue", role: "keyword" }, { text: "سُورَةَ", color: "blue", role: "keyword" }, { text: "الْفَاتِحَةِ", color: "blue", role: "keyword" }, { text: "لِعَائِلَتِي", color: "blue", role: "keyword" }],
};

const lesson08 = {
  id: "islamic-w01-u08",
  lessonKey: "islamic-w01-u08",
  lesson_number: 8,
  num: 8,
  subject: "islamic",
  subjectId: "islamic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 8,
  title: "أُحِبُّ عَائِلَتِي",
  title_fr: "J'aime ma famille",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/islamic/lesson08",
  exercisePath: "/lesson-v2/islamic/lesson08/exercises",
  objectives: [
    "أعبر عن حبي لعائلتي بالكلام الطيب والعمل الجميل.",
    "أشكر أبي وأمي ومن يعلمني.",
    "أحب جدي وإخوتي وأحترمهم.",
    "أحفظ سورة الفاتحة وأسمعها لعائلتي."
  ],
  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/islamic/lesson08/s1.webp",
      image: "/lessons/v2/islamic/lesson08/s1.webp",
      audio_key: "lesson08_s1",
      audioKey: "lesson08_s1",
      text: lesson08CanonicalText.s1,
      semanticHighlights: lesson08SemanticHighlights.s1,
    },
    {
      scene: 2,
      scene_image: "/lessons/v2/islamic/lesson08/s2.webp",
      image: "/lessons/v2/islamic/lesson08/s2.webp",
      audio_key: "lesson08_s2",
      audioKey: "lesson08_s2",
      text: lesson08CanonicalText.s2,
      semanticHighlights: lesson08SemanticHighlights.s2,
    },
    {
      scene: 3,
      scene_image: "/lessons/v2/islamic/lesson08/s3.webp",
      image: "/lessons/v2/islamic/lesson08/s3.webp",
      audio_key: "lesson08_s3",
      audioKey: "lesson08_s3",
      text: lesson08CanonicalText.s3,
      semanticHighlights: lesson08SemanticHighlights.s3,
    },
    {
      scene: 4,
      scene_image: "/lessons/v2/islamic/lesson08/s4.webp",
      image: "/lessons/v2/islamic/lesson08/s4.webp",
      audio_key: "lesson08_s4",
      audioKey: "lesson08_s4",
      text: lesson08CanonicalText.s4,
      semanticHighlights: lesson08SemanticHighlights.s4,
    },
    {
      scene: 5,
      scene_image: "/lessons/v2/islamic/lesson08/s5.webp",
      image: "/lessons/v2/islamic/lesson08/s5.webp",
      audio_key: "lesson08_s5",
      audioKey: "lesson08_s5",
      text: lesson08CanonicalText.s5,
      semanticHighlights: lesson08SemanticHighlights.s5,
    },
    {
      scene: 6,
      scene_image: "/lessons/v2/islamic/lesson08/s6.webp",
      image: "/lessons/v2/islamic/lesson08/s6.webp",
      audio_key: "lesson08_s6",
      audioKey: "lesson08_s6",
      text: lesson08CanonicalText.s6,
      semanticHighlights: lesson08SemanticHighlights.s6,
    },
    {
      scene: 7,
      scene_image: "/lessons/v2/islamic/lesson08/s7.webp",
      image: "/lessons/v2/islamic/lesson08/s7.webp",
      audio_key: "lesson08_s7",
      audioKey: "lesson08_s7",
      text: lesson08CanonicalText.s7,
      semanticHighlights: lesson08SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true,
    },
  ],
} as const;

export default lesson08;
