export type ArabicSemanticHighlight = {
  text: string;
  color: "green" | "blue" | "red";
  role?: string;
};

export const lesson09CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ التَّحِيَّةَ وَرَدَّهَا، فَهِيَ سُلُوكٌ لَطِيفٌ يَدُلُّ عَلَى حُسْنِ التَّرْبِيَةِ.",
  s2: "عِنْدَمَا أَلْتَقِي بِصَدِيقِي أَقُولُ: السَّلَامُ عَلَيْكُمْ.",
  s3: "وَعِنْدَمَا يُحَيِّينِي أَحَدٌ أَرُدُّ: وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ.",
  s4: "أُحَيِّي أَصْدِقَائِي عِنْدَمَا أَلْتَقِي بِهِمْ، وَأَبْتَسِمُ لَهُمْ بِلُطْفٍ.",
  s5: "وَأُحَيِّي الْكَبِيرَ بِأَدَبٍ وَاحْتِرَامٍ.",
  s6: "التَّحِيَّةُ سُلُوكٌ لَطِيفٌ يَدُلُّ عَلَى حُسْنِ التَّرْبِيَةِ.",
  s7: "أَحْسَنْتَ يَا فَاضِلُ! تَعَلَّمْنَا أَنْ نَبْدَأَ بِالتَّحِيَّةِ، وَأَنْ نَرُدَّهَا بِأَدَبٍ وَابْتِسَامَةٍ."
};

export const lesson09SemanticHighlights: Record<string, ArabicSemanticHighlight[]> = {
  s1: [{ text: "التَّحِيَّةَ", color: "blue" }, { text: "رَدَّهَا", color: "blue" }, { text: "سُلُوكٌ", color: "blue" }, { text: "لَطِيفٌ", color: "blue" }, { text: "التَّرْبِيَةِ", color: "blue" }],
  s2: [{ text: "أَلْتَقِي", color: "blue" }, { text: "بِصَدِيقِي", color: "blue" }, { text: "السَّلَامُ", color: "blue" }, { text: "عَلَيْكُمْ", color: "blue" }],
  s3: [{ text: "أَرُدُّ", color: "blue" }, { text: "وَعَلَيْكُمُ", color: "blue" }, { text: "السَّلَامُ", color: "blue" }, { text: "وَرَحْمَةُ", color: "blue" }, { text: "وَبَرَكَاتُهُ", color: "blue" }],
  s4: [{ text: "أُحَيِّي", color: "blue" }, { text: "أَصْدِقَائِي", color: "blue" }, { text: "أَلْتَقِي", color: "blue" }, { text: "أَبْتَسِمُ", color: "blue" }],
  s5: [{ text: "أُحَيِّي", color: "blue" }, { text: "الْكَبِيرَ", color: "blue" }, { text: "بِأَدَبٍ", color: "blue" }, { text: "وَاحْتِرَامٍ", color: "blue" }],
  s6: [{ text: "التَّحِيَّةُ", color: "blue" }, { text: "سُلُوكٌ", color: "blue" }, { text: "لَطِيفٌ", color: "blue" }, { text: "التَّرْبِيَةِ", color: "blue" }],
  s7: [{ text: "فَاضِلُ", color: "green" }, { text: "بِالتَّحِيَّةِ", color: "blue" }, { text: "نَرُدَّهَا", color: "blue" }, { text: "بِأَدَبٍ", color: "blue" }, { text: "وَابْتِسَامَةٍ", color: "blue" }]
};

const lesson09 = {
  id: "civics-w01-u09",
  lessonKey: "civics-w01-u09",
  lesson_number: 9,
  title: "التَّحِيَّةُ وَرَدُّهَا",
  subject: "civics",
  audio_base: "/audio/v2/civics/lesson09",
  exercisePath: "/lesson-v2/civics/lesson09/exercises",
  localWorldId: "family",
  localWorldRoute: "/world/arabic-family-local",
  slides: [
    { scene: 1, scene_image: "/lessons/v2/civics/lesson09/s1.webp", image: "/lessons/v2/civics/lesson09/s1.webp", audio_key: "lesson09_s1", audioKey: "lesson09_s1", speaker: "taline", text: lesson09CanonicalText.s1, semanticHighlights: lesson09SemanticHighlights.s1 },
    { scene: 2, scene_image: "/lessons/v2/civics/lesson09/s2.webp", image: "/lessons/v2/civics/lesson09/s2.webp", audio_key: "lesson09_s2", audioKey: "lesson09_s2", speaker: "khalil", text: lesson09CanonicalText.s2, semanticHighlights: lesson09SemanticHighlights.s2 },
    { scene: 3, scene_image: "/lessons/v2/civics/lesson09/s3.webp", image: "/lessons/v2/civics/lesson09/s3.webp", audio_key: "lesson09_s3", audioKey: "lesson09_s3", speaker: "taline", text: lesson09CanonicalText.s3, semanticHighlights: lesson09SemanticHighlights.s3 },
    { scene: 4, scene_image: "/lessons/v2/civics/lesson09/s4.webp", image: "/lessons/v2/civics/lesson09/s4.webp", audio_key: "lesson09_s4", audioKey: "lesson09_s4", speaker: "khalil", text: lesson09CanonicalText.s4, semanticHighlights: lesson09SemanticHighlights.s4 },
    { scene: 5, scene_image: "/lessons/v2/civics/lesson09/s5.webp", image: "/lessons/v2/civics/lesson09/s5.webp", audio_key: "lesson09_s5", audioKey: "lesson09_s5", speaker: "taline", text: lesson09CanonicalText.s5, semanticHighlights: lesson09SemanticHighlights.s5 },
    { scene: 6, scene_image: "/lessons/v2/civics/lesson09/s6.webp", image: "/lessons/v2/civics/lesson09/s6.webp", audio_key: "lesson09_s6", audioKey: "lesson09_s6", speaker: "khalil", text: lesson09CanonicalText.s6, semanticHighlights: lesson09SemanticHighlights.s6 },
    { scene: 7, scene_image: "/lessons/v2/civics/lesson09/s7.webp", image: "/lessons/v2/civics/lesson09/s7.webp", audio_key: "lesson09_s7", audioKey: "lesson09_s7", speaker: "taline", text: lesson09CanonicalText.s7, semanticHighlights: lesson09SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true }
  ],
};

export default lesson09;
