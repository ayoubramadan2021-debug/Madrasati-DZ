export type IslamicSemanticColor = "green" | "blue" | "red";
export type IslamicSemanticHighlight = {
  text: string;
  color: IslamicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson04CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَسْتَمِعُ إِلَى سُورَةِ الْفَاتِحَةِ، وَنُرَدِّدُهَا لِنَحْفَظَهَا.",
  s2: "بِسْمِ اللَّهِ الرَّحْمَانِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَانِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. صَدَقَ اللَّهُ الْعَظِيمُ.",
  s3: "أَحْسَنْتَ يَا فَاضِلُ! لِنَسْتَمِعْ جَيِّدًا، وَلْنُرَدِّدْ سُورَةَ الْفَاتِحَةِ.",
  s4: "فِي سُورَةِ الْفَاتِحَةِ نَحْمَدُ اللَّهَ عَلَى نِعَمِهِ.",
  s5: "وَنَقُولُ: إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ، أَيْ نَعْبُدُ اللَّهَ وَنَطْلُبُ عَوْنَهُ.",
  s6: "وَنَسْأَلُ اللَّهَ أَنْ يَهْدِيَنَا إِلَى الطَّرِيقِ الْمُسْتَقِيمِ.",
  s7: "مُمْتَازٌ يَا أَصْدِقَائِي! تَعَلَّمْنَا الْيَوْمَ سُورَةَ الْفَاتِحَةِ، وَفَهِمْنَا مَعَانِيَهَا الْجَمِيلَةَ.",
} as const;

export const lesson04SemanticHighlights: Record<string, IslamicSemanticHighlight[]> = {
  s1: [
    { text: "سُورَةِ", color: "blue", role: "keyword" },
    { text: "الْفَاتِحَةِ", color: "blue", role: "keyword" },
    { text: "نَسْتَمِعُ", color: "blue", role: "keyword" },
    { text: "نُرَدِّدُهَا", color: "blue", role: "keyword" },
    { text: "لِنَحْفَظَهَا", color: "blue", role: "keyword" },
  ],
  s2: [
    { text: "اللَّهِ", color: "blue", role: "keyword" },
    { text: "اللَّهُ", color: "blue", role: "keyword" },
    { text: "الْحَمْدُ", color: "blue", role: "keyword" },
    { text: "رَبِّ", color: "blue", role: "keyword" },
    { text: "الْعَالَمِينَ", color: "blue", role: "keyword" },
    { text: "الرَّحْمَانِ", color: "blue", role: "keyword" },
    { text: "الرَّحِيمِ", color: "blue", role: "keyword" },
    { text: "مَالِكِ", color: "blue", role: "keyword" },
    { text: "الدِّينِ", color: "blue", role: "keyword" },
    { text: "نَعْبُدُ", color: "blue", role: "keyword" },
    { text: "نَسْتَعِينُ", color: "blue", role: "keyword" },
    { text: "اهْدِنَا", color: "blue", role: "keyword" },
    { text: "الصِّرَاطَ", color: "blue", role: "keyword" },
    { text: "الْمُسْتَقِيمَ", color: "blue", role: "keyword" },
    { text: "أَنْعَمْتَ", color: "blue", role: "keyword" },
    { text: "الْمَغْضُوبِ", color: "blue", role: "keyword" },
    { text: "الضَّالِّينَ", color: "blue", role: "keyword" },
    { text: "صَدَقَ", color: "blue", role: "keyword" },
    { text: "الْعَظِيمُ", color: "blue", role: "keyword" },
  ],
  s3: [
    { text: "فَاضِلُ", color: "green", role: "keyword" },
    { text: "لِنَسْتَمِعْ", color: "blue", role: "keyword" },
    { text: "وَلْنُرَدِّدْ", color: "blue", role: "keyword" },
    { text: "سُورَةَ", color: "blue", role: "keyword" },
    { text: "الْفَاتِحَةِ", color: "blue", role: "keyword" },
  ],
  s4: [
    { text: "سُورَةِ", color: "blue", role: "keyword" },
    { text: "الْفَاتِحَةِ", color: "blue", role: "keyword" },
    { text: "نَحْمَدُ", color: "blue", role: "keyword" },
    { text: "اللَّهَ", color: "blue", role: "keyword" },
    { text: "نِعَمِهِ", color: "blue", role: "keyword" },
  ],
  s5: [
    { text: "نَعْبُدُ", color: "blue", role: "keyword" },
    { text: "نَسْتَعِينُ", color: "blue", role: "keyword" },
    { text: "اللَّهَ", color: "blue", role: "keyword" },
    { text: "عَوْنَهُ", color: "blue", role: "keyword" },
  ],
  s6: [
    { text: "اللَّهَ", color: "blue", role: "keyword" },
    { text: "يَهْدِيَنَا", color: "blue", role: "keyword" },
    { text: "الطَّرِيقِ", color: "blue", role: "keyword" },
    { text: "الْمُسْتَقِيمِ", color: "blue", role: "keyword" },
  ],
  s7: [
    { text: "سُورَةَ", color: "blue", role: "keyword" },
    { text: "الْفَاتِحَةِ", color: "blue", role: "keyword" },
    { text: "مَعَانِيَهَا", color: "blue", role: "keyword" },
  ],
};

const lesson04 = {
  id: "islamic-w01-u04",
  lessonKey: "islamic-w01-u04",
  lesson_number: 4,
  num: 4,
  subject: "islamic",
  subjectId: "islamic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 4,
  title: "سُورَةُ الْفَاتِحَةِ",
  title_fr: "Sourate Al-Fatiha",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/islamic/lesson04",
  exercisePath: "/lesson-v2/islamic/lesson04/exercises",
  objectives: [
    "أستمع إلى سورة الفاتحة وأرددها.",
    "أحفظ سورة الفاتحة بالتدرج.",
    "أفهم أنني أحمد الله على نعمه.",
    "أتعلم أنني أعبد الله وأستعين به.",
    "أسأل الله الهداية إلى الطريق المستقيم.",
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
    { scene: 1, scene_image: "/lessons/v2/islamic/lesson04/s1.webp", image: "/lessons/v2/islamic/lesson04/s1.webp", audio_key: "lesson04_s1", audioKey: "lesson04_s1", text: lesson04CanonicalText.s1, semanticHighlights: lesson04SemanticHighlights.s1, },
    { scene: 2, scene_image: "/lessons/v2/islamic/lesson04/s2.webp", quran_layout: true, image: "/lessons/v2/islamic/lesson04/s2.webp", audio_key: "lesson04_s2", audioKey: "lesson04_s2", text: lesson04CanonicalText.s2, semanticHighlights: lesson04SemanticHighlights.s2, },
    { scene: 3, scene_image: "/lessons/v2/islamic/lesson04/s3.webp", image: "/lessons/v2/islamic/lesson04/s3.webp", audio_key: "lesson04_s3", audioKey: "lesson04_s3", text: lesson04CanonicalText.s3, semanticHighlights: lesson04SemanticHighlights.s3, },
    { scene: 4, scene_image: "/lessons/v2/islamic/lesson04/s4.webp", image: "/lessons/v2/islamic/lesson04/s4.webp", audio_key: "lesson04_s4", audioKey: "lesson04_s4", text: lesson04CanonicalText.s4, semanticHighlights: lesson04SemanticHighlights.s4, },
    { scene: 5, scene_image: "/lessons/v2/islamic/lesson04/s5.webp", image: "/lessons/v2/islamic/lesson04/s5.webp", audio_key: "lesson04_s5", audioKey: "lesson04_s5", text: lesson04CanonicalText.s5, semanticHighlights: lesson04SemanticHighlights.s5, },
    { scene: 6, scene_image: "/lessons/v2/islamic/lesson04/s6.webp", image: "/lessons/v2/islamic/lesson04/s6.webp", audio_key: "lesson04_s6", audioKey: "lesson04_s6", text: lesson04CanonicalText.s6, semanticHighlights: lesson04SemanticHighlights.s6, },
    { scene: 7, scene_image: "/lessons/v2/islamic/lesson04/s7.webp", image: "/lessons/v2/islamic/lesson04/s7.webp", audio_key: "lesson04_s7", audioKey: "lesson04_s7", text: lesson04CanonicalText.s7, semanticHighlights: lesson04SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true, },
  ],
} as const;

export default lesson04;
