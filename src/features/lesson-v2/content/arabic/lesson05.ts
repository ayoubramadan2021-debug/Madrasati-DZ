export type ArabicSemanticColor = "green" | "blue" | "red";
export type ArabicSemanticHighlight = {
  text: string;
  color: ArabicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson05CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَزُورُ مَنْزِلَ سِيرِينٍ وَرَحْمَةَ، وَنَتَعَرَّفُ إِلَى غُرَفِهِ وَأَشْيَائِهِ.",
  s2: "مَنْزِلُ سِيرِينٍ وَرَحْمَةَ جَمِيلٌ وَوَاسِعٌ. فِيهِ غُرْفَةُ الْجُلُوسِ، وَغُرَفُ النَّوْمِ، وَمَطْبَخٌ، وَحَمَّامٌ.",
  s3: "فِي غُرْفَةِ الْجُلُوسِ أَرِيكَةٌ. غُرْفَةُ الْجُلُوسِ كَبِيرَةٌ.",
  s4: "هَذَا مَطْبَخٌ، وَهَذَا حَمَّامٌ. لِكُلِّ مَكَانٍ فِي الْمَنْزِلِ اسْتِعْمَالٌ مُخْتَلِفٌ.",
  s5: "فِي غُرْفَةِ النَّوْمِ خِزَانَةٌ وَسَرِيرٌ وَمَكْتَبٌ.",
  s6: "غُرْفَةُ الْجُلُوسِ كَبِيرَةٌ، وَغُرْفَةُ النَّوْمِ أَصْغَرُ. نَقُولُ: كَبِيرٌ، وَصَغِيرٌ.",
  s7: "أَحْسَنْتَ يَا بَطَلُ! تَعَرَّفْتَ إِلَى غُرَفِ الْمَنْزِلِ وَأَثَاثِهِ، وَتَعَلَّمْتَ كَلِمَتَيْ كَبِيرٍ وَصَغِيرٍ. هَيَّا إِلَى النَّشَاطَاتِ!",
} as const;

export const lesson05SemanticHighlights: Record<string, ArabicSemanticHighlight[]> = {
  s1: [{ text: "سِيرِينٍ", color: "green", role: "keyword" }, { text: "وَرَحْمَةَ", color: "green", role: "keyword" }, { text: "مَنْزِلَ", color: "blue", role: "keyword" }, { text: "غُرَفِهِ", color: "blue", role: "keyword" }],
  s2: [{ text: "سِيرِينٍ", color: "green", role: "keyword" }, { text: "وَرَحْمَةَ", color: "green", role: "keyword" }, { text: "مَنْزِلُ", color: "blue", role: "keyword" }, { text: "غُرْفَةُ", color: "blue", role: "keyword" }, { text: "الْجُلُوسِ", color: "blue", role: "keyword" }, { text: "غُرَفُ", color: "blue", role: "keyword" }, { text: "النَّوْمِ", color: "blue", role: "keyword" }, { text: "مَطْبَخٌ", color: "blue", role: "keyword" }, { text: "حَمَّامٌ", color: "blue", role: "keyword" }],
  s3: [{ text: "غُرْفَةِ", color: "blue", role: "keyword" }, { text: "الْجُلُوسِ", color: "blue", role: "keyword" }, { text: "أَرِيكَةٌ", color: "blue", role: "keyword" }, { text: "كَبِيرَةٌ", color: "blue", role: "keyword" }],
  s4: [{ text: "مَطْبَخٌ", color: "blue", role: "keyword" }, { text: "حَمَّامٌ", color: "blue", role: "keyword" }, { text: "الْمَنْزِلِ", color: "blue", role: "keyword" }],
  s5: [{ text: "غُرْفَةِ", color: "blue", role: "keyword" }, { text: "النَّوْمِ", color: "blue", role: "keyword" }, { text: "خِزَانَةٌ", color: "blue", role: "keyword" }, { text: "وَسَرِيرٌ", color: "blue", role: "keyword" }, { text: "وَمَكْتَبٌ", color: "blue", role: "keyword" }],
  s6: [{ text: "غُرْفَةُ", color: "blue", role: "keyword" }, { text: "الْجُلُوسِ", color: "blue", role: "keyword" }, { text: "كَبِيرَةٌ", color: "blue", role: "keyword" }, { text: "النَّوْمِ", color: "blue", role: "keyword" }, { text: "أَصْغَرُ", color: "blue", role: "keyword" }, { text: "كَبِيرٌ", color: "blue", role: "keyword" }, { text: "وَصَغِيرٌ", color: "blue", role: "keyword" }],
  s7: [{ text: "الْمَنْزِلِ", color: "blue", role: "keyword" }, { text: "كَبِيرٍ", color: "blue", role: "keyword" }, { text: "وَصَغِيرٍ", color: "blue", role: "keyword" }, { text: "النَّشَاطَاتِ", color: "blue", role: "keyword" }],
};

const lesson05 = {
  id: "arabic-w01-u05",
  lessonKey: "arabic-w01-u05",
  lesson_number: 5,
  num: 5,
  subject: "arabic",
  subjectId: "arabic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 5,
  title: "فِي مَنْزِلِنَا",
  title_fr: "Dans notre maison",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson05",
  exercisePath: "/lesson-v2/arabic/lesson05/exercises",
  objectives: [
    "أتعرف إلى أهم غرف المنزل.",
    "أتعرف إلى مفردات البيت وأثاثه.",
    "أستعمل كلمتي كبير وصغير.",
    "أكوّن جملا بسيطة باستعمال: في."
  ],
  semanticColors: {
    keyword: "blue",
    structure: "green",
    letter: "red",
    syllable: "red",
  },
  slides: [
    { scene: 1, scene_image: "/lessons/v2/arabic/lesson05/s1.webp", image: "/lessons/v2/arabic/lesson05/s1.webp", audio_key: "lesson05_s1", audioKey: "lesson05_s1", text: lesson05CanonicalText.s1, semanticHighlights: lesson05SemanticHighlights.s1, },
    { scene: 2, scene_image: "/lessons/v2/arabic/lesson05/s2.webp", image: "/lessons/v2/arabic/lesson05/s2.webp", audio_key: "lesson05_s2", audioKey: "lesson05_s2", text: lesson05CanonicalText.s2, semanticHighlights: lesson05SemanticHighlights.s2, },
    { scene: 3, scene_image: "/lessons/v2/arabic/lesson05/s3.webp", image: "/lessons/v2/arabic/lesson05/s3.webp", audio_key: "lesson05_s3", audioKey: "lesson05_s3", text: lesson05CanonicalText.s3, semanticHighlights: lesson05SemanticHighlights.s3, },
    { scene: 4, scene_image: "/lessons/v2/arabic/lesson05/s4.webp", image: "/lessons/v2/arabic/lesson05/s4.webp", audio_key: "lesson05_s4", audioKey: "lesson05_s4", text: lesson05CanonicalText.s4, semanticHighlights: lesson05SemanticHighlights.s4, },
    { scene: 5, scene_image: "/lessons/v2/arabic/lesson05/s5.webp", image: "/lessons/v2/arabic/lesson05/s5.webp", audio_key: "lesson05_s5", audioKey: "lesson05_s5", text: lesson05CanonicalText.s5, semanticHighlights: lesson05SemanticHighlights.s5, },
    { scene: 6, scene_image: "/lessons/v2/arabic/lesson05/s6.webp", image: "/lessons/v2/arabic/lesson05/s6.webp", audio_key: "lesson05_s6", audioKey: "lesson05_s6", text: lesson05CanonicalText.s6, semanticHighlights: lesson05SemanticHighlights.s6, },
    { scene: 7, scene_image: "/lessons/v2/arabic/lesson05/s7.webp", image: "/lessons/v2/arabic/lesson05/s7.webp", audio_key: "lesson05_s7", audioKey: "lesson05_s7", text: lesson05CanonicalText.s7, semanticHighlights: lesson05SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true, },
  ],
} as const;

export default lesson05;
