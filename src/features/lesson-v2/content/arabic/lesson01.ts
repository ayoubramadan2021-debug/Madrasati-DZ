// MADRASATI-DZ - Arabic W01 U01
// Engine-compatible lesson data.
// UI text = TTS source = Karaoke text.

export const lesson01CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! هَذَا فَاضِلٌ. هَيَّا نَتَعَرَّفْ إِلَيْهِ.",
  s2: "يَقُولُ فَاضِلٌ: أَنَا إِسْمِي فَاضِلٌ. أَنَا إِسْمِي فَاضِلٌ.",
  s3: "هَذَا فَاضِلٌ. فَاضِلٌ يُحِبُّ اللَّعِبَ بِالْكُرَةِ.",
  s4: "هَذَا فَاضِلٌ. هَذِهِ رَحْمَةُ. هَذِهِ سِيرِينُ.",
  s5: "هَؤُلَاءِ أَصْدِقَاؤُنَا: فَاضِلٌ، وَرَحْمَةُ، وَسِيرِينُ. اُنْظُرْ جَيِّدًا، وَتَذَكَّرْ أَسْمَاءَهُمْ.",
  s6: "هَذِهِ تَالِينُ. تَالِينُ مُعَلِّمَةٌ. وَأَنَا خَلِيلٌ. أَنَا مُرْشِدٌ. أَحْسَنْتَ! بَقِيَتْ لَنَا خُطْوَةٌ أَخِيرَةٌ.",
  s7: "أَحْسَنْتَ يَا بَطَلُ! تَعَرَّفْتَ إِلَى فَاضِلٍ وَأَصْدِقَائِهِ. وَتَعَلَّمْتَ أَنْ تَقُولَ: أَنَا إِسْمِي فَاضِلٌ. هَيَّا إِلَى النَّشَاطَاتِ!",
} as const;

export type ArabicSemanticColor = "green" | "blue" | "red";

export type ArabicSemanticHighlight = {
  text: string;
  color: ArabicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson01SemanticHighlights: Record<
  keyof typeof lesson01CanonicalText,
  ArabicSemanticHighlight[]
> = {
  s1: [
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
  ],
  s2: [
    { text: "أَنَا", color: "blue", role: "structure" },
    { text: "إِسْمِي", color: "blue", role: "structure" },
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
  ],
  s3: [
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
    { text: "بِالْكُرَةِ", color: "blue", role: "keyword" },
  ],
  s4: [
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
    { text: "رَحْمَةُ", color: "green", role: "keyword" },
    { text: "سِيرِينُ", color: "green", role: "keyword" },
  ],
  s5: [
    { text: "أَصْدِقَاؤُنَا", color: "blue", role: "structure" },
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
    { text: "رَحْمَةُ", color: "green", role: "keyword" },
    { text: "سِيرِينُ", color: "green", role: "keyword" },
  ],
  s6: [
    { text: "تَالِينُ", color: "green", role: "keyword" },
    { text: "مُعَلِّمَةٌ", color: "blue", role: "keyword" },
    { text: "خَلِيلٌ", color: "green", role: "keyword" },
    { text: "مُرْشِدٌ", color: "blue", role: "keyword" },
  ],
  s7: [
    { text: "أَنَا", color: "blue", role: "structure" },
    { text: "إِسْمِي", color: "blue", role: "structure" },
    { text: "فَاضِلٌ", color: "green", role: "keyword" },
  ],
};


export const arabicLesson01 = {
  id: "arabic-w01-u01",
  lessonKey: "arabic-w01-u01",
  lesson_number: 1,
  num: 1,
  subject: "arabic",
  subjectId: "arabic",
  world_id: "family",
  sort_order: 1,
  title: "مرحبا أنا فاضل",
  title_fr: "Bonjour, je suis Fadel",
  teacher: "taline",
  audio_base: "/audio/v2/arabic/lesson01",
  exercisePath: "/lesson-v2/arabic/lesson01/exercises",
  objectives: [
    "التعرّف إلى فاضل وبعض الشخصيات المرافقة.",
    "فهم واستعمال الصيغة البسيطة: أَنَا إِسْمِي ...",
    "ربط أسماء الشخصيات بصورها.",
  ],
  slides: [
    { scene: 1, scene_image: "/lessons/v2/arabic/lesson01/s1.webp", image: "/lessons/v2/arabic/lesson01/s1.webp", audio_key: "lesson01_s1", audioKey: "lesson01_s1", text: lesson01CanonicalText.s1, semanticHighlights: lesson01SemanticHighlights.s1, },
    { scene: 2, scene_image: "/lessons/v2/arabic/lesson01/s2.webp", image: "/lessons/v2/arabic/lesson01/s2.webp", audio_key: "lesson01_s2", audioKey: "lesson01_s2", text: lesson01CanonicalText.s2, semanticHighlights: lesson01SemanticHighlights.s2, },
    { scene: 3, scene_image: "/lessons/v2/arabic/lesson01/s3.webp", image: "/lessons/v2/arabic/lesson01/s3.webp", audio_key: "lesson01_s3", audioKey: "lesson01_s3", text: lesson01CanonicalText.s3, semanticHighlights: lesson01SemanticHighlights.s3, },
    { scene: 4, scene_image: "/lessons/v2/arabic/lesson01/s4.webp", image: "/lessons/v2/arabic/lesson01/s4.webp", audio_key: "lesson01_s4", audioKey: "lesson01_s4", text: lesson01CanonicalText.s4, semanticHighlights: lesson01SemanticHighlights.s4, },
    { scene: 5, scene_image: "/lessons/v2/arabic/lesson01/s5.webp", image: "/lessons/v2/arabic/lesson01/s5.webp", audio_key: "lesson01_s5", audioKey: "lesson01_s5", text: lesson01CanonicalText.s5, semanticHighlights: lesson01SemanticHighlights.s5, },
    { scene: 6, scene_image: "/lessons/v2/arabic/lesson01/s6.webp", image: "/lessons/v2/arabic/lesson01/s6.webp", audio_key: "lesson01_s6", audioKey: "lesson01_s6", text: lesson01CanonicalText.s6, semanticHighlights: lesson01SemanticHighlights.s6, },
    { scene: 7, scene_image: "/lessons/v2/arabic/lesson01/s7.webp", image: "/lessons/v2/arabic/lesson01/s7.webp", audio_key: "lesson01_s7", audioKey: "lesson01_s7", text: lesson01CanonicalText.s7, semanticHighlights: lesson01SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true },
  ],
} as const;

export default arabicLesson01;
