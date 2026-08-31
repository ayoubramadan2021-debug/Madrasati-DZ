export type ArabicSemanticColor = "green" | "blue" | "red";
export type ArabicSemanticHighlight = {
  text: string;
  color: ArabicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson03CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! هَيَّا نَزُورُ فَاضِل. يَقُولُ فَاضِلٌ: أَهْلًا بِكَ، مَرْحَبًا بِكَ.",
  s2: "يَقُولُ فَاضِلٌ: هَذَا جَدِّي، وَهَذِهِ جَدَّتِي.",
  s3: "وَهَذِهِ أُخْتُ فَاضِلٍ الصَّغِيرَةُ، خَدِيجَةُ. اُنْظُرْ إِلَيْهَا جَيِّدًا.",
  s4: "يَقُولُ فَاضِلٌ: جَدِّي وَجَدَّتِي فِي غُرْفَةِ الْجُلُوسِ.",
  s5: "هَيَّا نَتَذَكَّرْ أَفْرَادَ الْعَائِلَةِ: جَدِّي، جَدَّتِي، وَأُخْتِي الصَّغِيرَةُ.",
  s6: "يَقُولُ فَاضِلٌ: خَدِيجَةُ مَعَ جَدِّي وَجَدَّتِي.",
  s7: "أَحْسَنْتَ يَا بَطَلُ! تَعَرَّفْتَ إِلَى عَائِلَةِ فَاضِلٍ، وَتَعَلَّمْتَ أَنْ تَقُولَ: أَهْلًا بِكَ، وَمَرْحَبًا بِكَ. هَيَّا إِلَى النَّشَاطَاتِ!",
} as const;

export const lesson03SemanticHighlights: Record<string, ArabicSemanticHighlight[]> = {
  s1: [

    { text: "فَاضِل", color: "green", role: "keyword" },

    { text: "فَاضِلٌ", color: "green", role: "keyword" },

    { text: "أَهْلًا", color: "blue", role: "keyword" },

    { text: "مَرْحَبًا", color: "blue", role: "keyword" },

  ],
  s2: [
      { text: "فَاضِلٌ", color: "green", role: "keyword" },
      { text: "جَدِّي", color: "blue", role: "keyword" },
      { text: "جَدَّتِي", color: "blue", role: "keyword" }
  ],
  s3: [
      { text: "فَاضِلٍ", color: "green", role: "keyword" },
      { text: "خَدِيجَةُ", color: "green", role: "keyword" },
      { text: "أُخْتُ", color: "blue", role: "keyword" },
      { text: "الصَّغِيرَةُ", color: "blue", role: "keyword" }
  ],
  s4: [
      { text: "فَاضِلٌ", color: "green", role: "keyword" },
      { text: "جَدِّي", color: "blue", role: "keyword" },
      { text: "وَجَدَّتِي", color: "blue", role: "keyword" },
      { text: "غُرْفَةِ", color: "blue", role: "keyword" },
      { text: "الْجُلُوسِ", color: "blue", role: "keyword" }
  ],
  s5: [
      { text: "أَفْرَادَ", color: "blue", role: "keyword" },
      { text: "الْعَائِلَةِ", color: "blue", role: "keyword" },
      { text: "جَدِّي", color: "blue", role: "keyword" },
      { text: "جَدَّتِي", color: "blue", role: "keyword" },
      { text: "وَأُخْتِي", color: "blue", role: "keyword" },
      { text: "الصَّغِيرَةُ", color: "blue", role: "keyword" }
  ],
  s6: [
      { text: "فَاضِلٌ", color: "green", role: "keyword" },
      { text: "خَدِيجَةُ", color: "green", role: "keyword" },
      { text: "جَدِّي", color: "blue", role: "keyword" },
      { text: "وَجَدَّتِي", color: "blue", role: "keyword" }
  ],
  s7: [
      { text: "فَاضِلٍ", color: "green", role: "keyword" },
      { text: "عَائِلَةِ", color: "blue", role: "keyword" },
      { text: "أَهْلًا", color: "blue", role: "keyword" },
      { text: "مَرْحَبًا", color: "blue", role: "keyword" }
  ],
};

const lesson03 = {
  id: "arabic-w01-u03",
  lessonKey: "arabic-w01-u03",
  lesson_number: 3,
  num: 3,
  subject: "arabic",
  subjectId: "arabic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 3,
  title: "تعرف على عائلتي",
  title_fr: "Je découvre ma famille",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson03",
  exercisePath: "/lesson-v2/arabic/lesson03/exercises",
  objectives: [
    "أستعمل التحية: أهلا بك ومرحبا بك.",
    "أتعرف إلى الجد والجدة والأخت الصغيرة.",
    "أقرأ وأفهم: جدي وجدتي في غرفة الجلوس.",
    "أقرأ وأفهم: خديجة مع جدي وجدتي.",
    "أميز أفراد العائلة في مواقف بصرية بسيطة.",
  ],
  semanticColorPolicy: {
    currentWord: "gold",
    defaultPastWord: "black",
    futureWord: "hidden",
    characterName: "green",
    importantTerm: "blue",
    letter: "red",
    syllable: "red",
  },
  slides: [
    { scene: 1, scene_image: "/lessons/v2/arabic/lesson03/s1.webp", image: "/lessons/v2/arabic/lesson03/s1.webp", audio_key: "lesson03_s1", audioKey: "lesson03_s1", text: lesson03CanonicalText.s1, semanticHighlights: lesson03SemanticHighlights.s1, },
    { scene: 2, scene_image: "/lessons/v2/arabic/lesson03/s2.webp", image: "/lessons/v2/arabic/lesson03/s2.webp", audio_key: "lesson03_s2", audioKey: "lesson03_s2", text: lesson03CanonicalText.s2, semanticHighlights: lesson03SemanticHighlights.s2, },
    { scene: 3, scene_image: "/lessons/v2/arabic/lesson03/s3.webp", image: "/lessons/v2/arabic/lesson03/s3.webp", audio_key: "lesson03_s3", audioKey: "lesson03_s3", text: lesson03CanonicalText.s3, semanticHighlights: lesson03SemanticHighlights.s3, },
    { scene: 4, scene_image: "/lessons/v2/arabic/lesson03/s4.webp", image: "/lessons/v2/arabic/lesson03/s4.webp", audio_key: "lesson03_s4", audioKey: "lesson03_s4", text: lesson03CanonicalText.s4, semanticHighlights: lesson03SemanticHighlights.s4, },
    { scene: 5, scene_image: "/lessons/v2/arabic/lesson03/s5.webp", image: "/lessons/v2/arabic/lesson03/s5.webp", audio_key: "lesson03_s5", audioKey: "lesson03_s5", text: lesson03CanonicalText.s5, semanticHighlights: lesson03SemanticHighlights.s5, },
    { scene: 6, scene_image: "/lessons/v2/arabic/lesson03/s6.webp", image: "/lessons/v2/arabic/lesson03/s6.webp", audio_key: "lesson03_s6", audioKey: "lesson03_s6", text: lesson03CanonicalText.s6, semanticHighlights: lesson03SemanticHighlights.s6, },
    { scene: 7, scene_image: "/lessons/v2/arabic/lesson03/s7.webp", image: "/lessons/v2/arabic/lesson03/s7.webp", audio_key: "lesson03_s7", audioKey: "lesson03_s7", text: lesson03CanonicalText.s7, semanticHighlights: lesson03SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true, },
  ],
} as const;

export default lesson03;
