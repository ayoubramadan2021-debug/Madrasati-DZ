export type IslamicSemanticColor = "green" | "blue" | "red";
export type IslamicSemanticHighlight = {
  text: string;
  color: IslamicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson02CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! هَذَا فَاضِلٌ مَعَ وَالِدَيْهِ. الْيَوْمَ نَتَعَلَّمُ كَيْفَ نُطِيعُ وَالِدَيْنِ وَنَتَحَدَّثُ مَعَهُمَا بِأَدَبٍ.",
  s2: "تَعْتَنِي أُمُّ فَاضِلٍ بِهِ وَتَرْعَاهُ بِحُبٍّ. أُمُّهُ تَتْعَبُ مِنْ أَجْلِهِ وَتُسَاعِدُهُ.",
  s3: "وَأَبُو فَاضِلٍ يُحِبُّهُ وَيَرْعَاهُ، وَيَتْعَبُ مِنْ أَجْلِهِ.",
  s4: "أَسْتَنْتِجُ: أُطِيعُ أَبِي وَأُمِّي لِأَنَّهُمَا رَبَّيَانِي وَتَعِبَا مِنْ أَجْلِي.",
  s5: "أَتَحَدَّثُ مَعَ وَالِدَيَّ بِأَدَبٍ. أُكَلِّمُهُمَا بِلُطْفٍ وَاحْتِرَامٍ.",
  s6: "وَقُلْ رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.",
  s7: "أَحْسَنْتَ يَا بَطَلُ! تَعَلَّمْتَ أَنْ تُطِيعَ وَالِدَيْكَ، وَأَنْ تَتَحَدَّثَ مَعَهُمَا بِأَدَبٍ، وَحَفِظْتَ دُعَاءَ الْوَالِدَيْنِ. هَيَّا إِلَى النَّشَاطَاتِ!",
} as const;

export const lesson02SemanticHighlights: Record<string, IslamicSemanticHighlight[]> = {
  s1: [
      { text: "فَاضِلٌ", color: "green", role: "keyword" },
      { text: "وَالِدَيْهِ", color: "blue", role: "keyword" },
      { text: "نُطِيعُ", color: "blue", role: "keyword" },
      { text: "بِأَدَبٍ", color: "blue", role: "keyword" }
  ],
  s2: [
      { text: "فَاضِلٍ", color: "green", role: "keyword" },
      { text: "أُمُّ", color: "blue", role: "keyword" },
      { text: "تَرْعَاهُ", color: "blue", role: "keyword" },
      { text: "بِحُبٍّ", color: "blue", role: "keyword" }
  ],
  s3: [
      { text: "فَاضِلٍ", color: "green", role: "keyword" },
      { text: "أَبُو", color: "blue", role: "keyword" },
      { text: "يُحِبُّهُ", color: "blue", role: "keyword" },
      { text: "يَرْعَاهُ", color: "blue", role: "keyword" }
  ],
  s4: [
      { text: "أُطِيعُ", color: "blue", role: "keyword" },
      { text: "أَبِي", color: "blue", role: "keyword" },
      { text: "أُمِّي", color: "blue", role: "keyword" },
      { text: "رَبَّيَانِي", color: "blue", role: "keyword" }
  ],
  s5: [
      { text: "وَالِدَيَّ", color: "blue", role: "keyword" },
      { text: "بِأَدَبٍ", color: "blue", role: "keyword" },
      { text: "بِلُطْفٍ", color: "blue", role: "keyword" },
      { text: "وَاحْتِرَامٍ", color: "blue", role: "keyword" }
  ],
  s6: [
      { text: "رَبِّ", color: "blue", role: "keyword" },
      { text: "ارْحَمْهُمَا", color: "blue", role: "keyword" },
      { text: "رَبَّيَانِي", color: "blue", role: "keyword" }
  ],
  s7: [
      { text: "وَالِدَيْكَ", color: "blue", role: "keyword" },
      { text: "بِأَدَبٍ", color: "blue", role: "keyword" },
      { text: "دُعَاءَ", color: "blue", role: "keyword" },
      { text: "الْوَالِدَيْنِ", color: "blue", role: "keyword" }
  ],
};

const lesson02 = {
  id: "islamic-w01-u02",
  lessonKey: "islamic-w01-u02",
  lesson_number: 2,
  num: 2,
  subject: "islamic",
  subjectId: "islamic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 2,
  title: "أطيع والدي",
  title_fr: "J'obéis à mes parents",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/islamic/lesson02",
  exercisePath: "/lesson-v2/islamic/lesson02/exercises",
  objectives: [
    "أتعرف إلى معنى طاعة الوالدين.",
    "أفهم أن والديّ يربيانني ويتعبان من أجلي.",
    "أتحدث مع والديّ بأدب واحترام.",
    "أحفظ قوله تعالى: وَقُلْ رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.",
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
    { scene: 1, scene_image: "/lessons/v2/islamic/lesson02/s1.webp", image: "/lessons/v2/islamic/lesson02/s1.webp", audio_key: "lesson02_s1", audioKey: "lesson02_s1", text: lesson02CanonicalText.s1, semanticHighlights: lesson02SemanticHighlights.s1, },
    { scene: 2, scene_image: "/lessons/v2/islamic/lesson02/s2.webp", image: "/lessons/v2/islamic/lesson02/s2.webp", audio_key: "lesson02_s2", audioKey: "lesson02_s2", text: lesson02CanonicalText.s2, semanticHighlights: lesson02SemanticHighlights.s2, },
    { scene: 3, scene_image: "/lessons/v2/islamic/lesson02/s3.webp", image: "/lessons/v2/islamic/lesson02/s3.webp", audio_key: "lesson02_s3", audioKey: "lesson02_s3", text: lesson02CanonicalText.s3, semanticHighlights: lesson02SemanticHighlights.s3, },
    { scene: 4, scene_image: "/lessons/v2/islamic/lesson02/s4.webp", image: "/lessons/v2/islamic/lesson02/s4.webp", audio_key: "lesson02_s4", audioKey: "lesson02_s4", text: lesson02CanonicalText.s4, semanticHighlights: lesson02SemanticHighlights.s4, },
    { scene: 5, scene_image: "/lessons/v2/islamic/lesson02/s5.webp", image: "/lessons/v2/islamic/lesson02/s5.webp", audio_key: "lesson02_s5", audioKey: "lesson02_s5", text: lesson02CanonicalText.s5, semanticHighlights: lesson02SemanticHighlights.s5, },
    { scene: 6, scene_image: "/lessons/v2/islamic/lesson02/s6.webp", image: "/lessons/v2/islamic/lesson02/s6.webp", audio_key: "lesson02_s6", audioKey: "lesson02_s6", text: lesson02CanonicalText.s6, semanticHighlights: lesson02SemanticHighlights.s6, },
    { scene: 7, scene_image: "/lessons/v2/islamic/lesson02/s7.webp", image: "/lessons/v2/islamic/lesson02/s7.webp", audio_key: "lesson02_s7", audioKey: "lesson02_s7", text: lesson02CanonicalText.s7, semanticHighlights: lesson02SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true, },
  ],
} as const;

export default lesson02;
