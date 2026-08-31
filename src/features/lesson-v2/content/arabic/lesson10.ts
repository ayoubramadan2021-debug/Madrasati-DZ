export type ArabicSemanticColor = "green" | "blue" | "red";

export type ArabicSemanticHighlight = {
  text: string;
  color: ArabicSemanticColor;
};

export const lesson10CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ مَحْفُوظَةَ «قَسَمًا»، وَنُرَدِّدُهَا بِاحْتِرَامٍ وَاعْتِزَازٍ بِوَطَنِنَا الْجَزَائِرِ.",
  s2: "عِنْدَ سَمَاعِ النَّشِيدِ الْوَطَنِيِّ نَقِفُ بِاحْتِرَامٍ، وَنَنْظُرُ إِلَى عَلَمِ بِلَادِنَا بِاعْتِزَازٍ.",
  s3: "قَسَمًا بِالنَّازِلَاتِ الْمَاحِقَاتِ،\nوَالدِّمَاءِ الزَّاكِيَاتِ الطَّاهِرَاتِ.\nوَالْبُنُودِ اللَّامِعَاتِ الْخَافِقَاتِ،\nفِي الْجِبَالِ الشَّامِخَاتِ الشَّاهِقَاتِ.\nنَحْنُ ثُرْنَا فَحَيَاةٌ أَوْ مَمَاتٌ،\nوَعَقَدْنَا الْعَزْمَ أَنْ تَحْيَا الْجَزَائِرُ.\nفَاشْهَدُوا.. فَاشْهَدُوا.. فَاشْهَدُوا..",
  s4: "أُرَدِّدُ النَّشِيدَ مَعَ زُمَلَائِي بِثِقَةٍ وَاحْتِرَامٍ، وَأَفْتَخِرُ بِالْجَزَائِرِ.",
  s5: "أَحْسَنْتَ يَا فَاضِلُ! أُحِبُّ وَطَنِي الْجَزَائِرَ، وَأَحْتَرِمُ عَلَمَهُ وَنَشِيدَهُ الْوَطَنِيَّ.",
} as const;

export const lesson10SemanticHighlights:
Record<string, ArabicSemanticHighlight[]> = {
  s1: [{ text: "قَسَمًا", color: "blue" }, { text: "بِاحْتِرَامٍ", color: "blue" }, { text: "الْجَزَائِرِ", color: "green" }],
  s2: [{ text: "النَّشِيدِ", color: "blue" }, { text: "الْوَطَنِيِّ", color: "blue" }, { text: "بِاحْتِرَامٍ", color: "blue" }, { text: "عَلَمِ", color: "blue" }],
  s3: [{ text: "قَسَمًا", color: "blue" }, { text: "الْمَاحِقَاتِ", color: "blue" }, { text: "الزَّاكِيَاتِ", color: "green" }, { text: "الطَّاهِرَاتِ", color: "green" }, { text: "الْخَافِقَاتِ", color: "blue" }, { text: "الشَّاهِقَاتِ", color: "blue" }, { text: "الْجَزَائِرُ", color: "green" }, { text: "فَاشْهَدُوا", color: "blue" }],
  s4: [{ text: "أُرَدِّدُ", color: "blue" }, { text: "النَّشِيدَ", color: "blue" }, { text: "بِثِقَةٍ", color: "blue" }, { text: "الْجَزَائِرِ", color: "green" }],
  s5: [{ text: "فَاضِلُ", color: "green" }, { text: "وَطَنِي", color: "blue" }, { text: "الْجَزَائِرَ", color: "green" }, { text: "عَلَمَهُ", color: "blue" }, { text: "نَشِيدَهُ", color: "blue" }],
};

const lesson10 = {
  id: "arabic-w01-u10",
  lessonKey: "arabic-w01-u10",
  lesson_number: 10,
  num: 10,
  subject: "arabic",
  subjectId: "arabic",
  lesson_type: "memorization",
  category: "محفوظات",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 10,
  title: "قَسَمًا",
  title_fr: "Kassaman",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson10",
  exercisePath: "/lesson-v2/arabic/lesson10/exercises",
  objectives: [
    "أستمع إلى محفوظة قسما باهتمام.",
    "أقف باحترام عند سماع النشيد الوطني.",
    "أردد مطلع المحفوظة بثقة.",
    "أعتز بعلم بلادي ووطني الجزائر."
  ],
  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/arabic/lesson10/s1.webp",
      image: "/lessons/v2/arabic/lesson10/s1.webp",
      audio_key: "lesson10_s1",
      audioKey: "lesson10_s1",
      text: lesson10CanonicalText.s1,
      semanticHighlights: lesson10SemanticHighlights.s1
    },
    {
      scene: 2,
      scene_image: "/lessons/v2/arabic/lesson10/s2.webp",
      image: "/lessons/v2/arabic/lesson10/s2.webp",
      audio_key: "lesson10_s2",
      audioKey: "lesson10_s2",
      text: lesson10CanonicalText.s2,
      semanticHighlights: lesson10SemanticHighlights.s2
    },
    {
      scene: 3,
      scene_image: "/lessons/v2/arabic/lesson10/s3.webp",
      image: "/lessons/v2/arabic/lesson10/s3.webp",
      audio_key: "lesson10_s3",
      audioKey: "lesson10_s3",
      anthem_layout: true,
      layout_kind: "anthem",
      is_anthem: true,
      anthem_title: "قَسَمًا",
      anthem_verses: [
        { first: "قَسَمًا بِالنَّازِلَاتِ الْمَاحِقَاتِ،", second: "وَالدِّمَاءِ الزَّاكِيَاتِ الطَّاهِرَاتِ." },
        { first: "وَالْبُنُودِ اللَّامِعَاتِ الْخَافِقَاتِ،", second: "فِي الْجِبَالِ الشَّامِخَاتِ الشَّاهِقَاتِ." },
        { first: "نَحْنُ ثُرْنَا فَحَيَاةٌ أَوْ مَمَاتٌ،", second: "وَعَقَدْنَا الْعَزْمَ أَنْ تَحْيَا الْجَزَائِرُ." },
        { first: "فَاشْهَدُوا.. فَاشْهَدُوا.. فَاشْهَدُوا.." }
      ],
      text: lesson10CanonicalText.s3,
      semanticHighlights: lesson10SemanticHighlights.s3,
    },
    {
      scene: 4,
      scene_image: "/lessons/v2/arabic/lesson10/s4.webp",
      image: "/lessons/v2/arabic/lesson10/s4.webp",
      audio_key: "lesson10_s4",
      audioKey: "lesson10_s4",
      text: lesson10CanonicalText.s4,
      semanticHighlights: lesson10SemanticHighlights.s4
    },
    {
      scene: 5,
      scene_image: "/lessons/v2/arabic/lesson10/s5.webp",
      image: "/lessons/v2/arabic/lesson10/s5.webp",
      audio_key: "lesson10_s5",
      audioKey: "lesson10_s5",
      text: lesson10CanonicalText.s5,
      semanticHighlights: lesson10SemanticHighlights.s5,
      is_closing: true,
      cta_text: "ابدأ النشاطات"
    }
  ]
} as const;

export default lesson10;
