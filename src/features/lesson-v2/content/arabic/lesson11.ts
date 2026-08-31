export type ArabicSemanticHighlight = {
  text: string;
  color: "green" | "blue" | "red";
  role?: string;
};

export const lesson11CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنُنْجِزُ مَشْرُوعًا جَمِيلًا عَنْ مَنْزِلِنَا وَعَائِلَتِنَا.",
  s2: "أَتَعَرَّفُ عَلَى غُرَفِ مَنْزِلِي وَأُسَمِّيهَا: غُرْفَةُ النَّوْمِ، غُرْفَةُ الِاسْتِقْبَالِ، الْمَطْبَخُ، وَالْحَمَّامُ.",
  s3: "أَرْسُمُ هَيْكَلَ مَنْزِلِي عَلَى وَرَقَةٍ بَيْضَاءَ، وَأَسْتَعْمِلُ الْقَلَمَ وَالْمِسْطَرَةَ بِعِنَايَةٍ.",
  s4: "أُلَوِّنُ مَنْزِلِي، ثُمَّ أَصِفُهُ: مَنْزِلِي جَمِيلٌ، فِيهِ غُرَفٌ مُرَتَّبَةٌ وَمَكَانٌ دَافِئٌ لِعَائِلَتِي.",
  s5: "وَالْآنَ أُدْمِجُ مَا تَعَلَّمْتُ. أُعَرِّفُ بِعَائِلَتِي، وَأَذْكُرُ الْأَبَ وَالْأُمَّ وَالْأَبْنَاءَ.",
  s6: "أُمَيِّزُ أَفْرَادَ عَائِلَتِي مِنْ غَيْرِهِمْ، ثُمَّ أُنْجِزُ شَجَرَةَ عَائِلَتِي وَأُرَتِّبُ أَفْرَادَهَا.",
  s7: "أَحْسَنْتَ يَا فَاضِلُ! أَنْجَزْتَ مَشْرُوعَكَ، وَوَصَفْتَ مَنْزِلَكَ، وَتَعَرَّفْتَ عَلَى عَائِلَتِكَ. أَتْمَمْتَ عَالَمَ «عَائِلَتِي» بِنَجَاحٍ."
} as const;

export const lesson11SemanticHighlights: Record<string, ArabicSemanticHighlight[]> = {
  s1: [{ text: "مَشْرُوعًا", color: "blue" }, { text: "مَنْزِلِنَا", color: "blue" }, { text: "عَائِلَتِنَا", color: "green" }],
  s2: [{ text: "غُرَفِ", color: "blue" }, { text: "مَنْزِلِي", color: "blue" }, { text: "النَّوْمِ", color: "blue" }, { text: "الِاسْتِقْبَالِ", color: "blue" }, { text: "الْمَطْبَخُ", color: "blue" }, { text: "الْحَمَّامُ", color: "blue" }],
  s3: [{ text: "أَرْسُمُ", color: "blue" }, { text: "هَيْكَلَ", color: "blue" }, { text: "مَنْزِلِي", color: "blue" }, { text: "الْقَلَمَ", color: "blue" }, { text: "الْمِسْطَرَةَ", color: "blue" }],
  s4: [{ text: "أُلَوِّنُ", color: "blue" }, { text: "أَصِفُهُ", color: "blue" }, { text: "مَنْزِلِي", color: "blue" }, { text: "عَائِلَتِي", color: "green" }],
  s5: [{ text: "أُدْمِجُ", color: "blue" }, { text: "بِعَائِلَتِي", color: "green" }, { text: "الْأَبَ", color: "blue" }, { text: "الْأُمَّ", color: "blue" }, { text: "الْأَبْنَاءَ", color: "blue" }],
  s6: [{ text: "أُمَيِّزُ", color: "blue" }, { text: "أَفْرَادَ", color: "blue" }, { text: "عَائِلَتِي", color: "green" }, { text: "شَجَرَةَ", color: "blue" }, { text: "أُرَتِّبُ", color: "blue" }],
  s7: [{ text: "فَاضِلُ", color: "green" }, { text: "مَشْرُوعَكَ", color: "blue" }, { text: "مَنْزِلَكَ", color: "blue" }, { text: "عَائِلَتِكَ", color: "green" }, { text: "عَائِلَتِي", color: "green" }]
};

const lesson11 = {
  id: "arabic-w01-u11",
  lessonKey: "arabic-w01-u11",
  lesson_number: 11,
  num: 11,
  subject: "arabic",
  subjectId: "arabic",
  lesson_type: "project_integration",
  category: "المشروع والإدماج",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 11,
  title: "أَصِفُ مَشْرُوعِي وَأُدْمِجُ",
  title_fr: "Mon projet et intégration",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson11",
  exercisePath: "/lesson-v2/arabic/lesson11/exercises",
  localWorldId: "family",
  localWorldRoute: "/world/arabic-family-local",
  objectives: [
    "أتعرف على غرف المنزل وأسميها.",
    "أرسم منزلي وألونه وأصفه.",
    "أعرف بعائلتي وأميز أفرادها.",
    "أنجز شجرة عائلتي.",
    "أدمج مكتسبات عالم عائلتي."
  ],
  slides: [
    { scene: 1, scene_image: "/lessons/v2/arabic/lesson11/s1.webp", image: "/lessons/v2/arabic/lesson11/s1.webp", audio_key: "lesson11_s1", audioKey: "lesson11_s1", speaker: "taline", text: lesson11CanonicalText.s1, semanticHighlights: lesson11SemanticHighlights.s1 },
    { scene: 2, scene_image: "/lessons/v2/arabic/lesson11/s2.webp", image: "/lessons/v2/arabic/lesson11/s2.webp", audio_key: "lesson11_s2", audioKey: "lesson11_s2", speaker: "khalil", text: lesson11CanonicalText.s2, semanticHighlights: lesson11SemanticHighlights.s2 },
    { scene: 3, scene_image: "/lessons/v2/arabic/lesson11/s3.webp", image: "/lessons/v2/arabic/lesson11/s3.webp", audio_key: "lesson11_s3", audioKey: "lesson11_s3", speaker: "taline", text: lesson11CanonicalText.s3, semanticHighlights: lesson11SemanticHighlights.s3 },
    { scene: 4, scene_image: "/lessons/v2/arabic/lesson11/s4.webp", image: "/lessons/v2/arabic/lesson11/s4.webp", audio_key: "lesson11_s4", audioKey: "lesson11_s4", speaker: "khalil", text: lesson11CanonicalText.s4, semanticHighlights: lesson11SemanticHighlights.s4 },
    { scene: 5, scene_image: "/lessons/v2/arabic/lesson11/s5.webp", image: "/lessons/v2/arabic/lesson11/s5.webp", audio_key: "lesson11_s5", audioKey: "lesson11_s5", speaker: "taline", text: lesson11CanonicalText.s5, semanticHighlights: lesson11SemanticHighlights.s5 },
    { scene: 6, scene_image: "/lessons/v2/arabic/lesson11/s6.webp", image: "/lessons/v2/arabic/lesson11/s6.webp", audio_key: "lesson11_s6", audioKey: "lesson11_s6", speaker: "khalil", text: lesson11CanonicalText.s6, semanticHighlights: lesson11SemanticHighlights.s6 },
    { scene: 7, scene_image: "/lessons/v2/arabic/lesson11/s7.webp", image: "/lessons/v2/arabic/lesson11/s7.webp", audio_key: "lesson11_s7", audioKey: "lesson11_s7", speaker: "taline", text: lesson11CanonicalText.s7, semanticHighlights: lesson11SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true }
  ],
} as const;

export default lesson11;
