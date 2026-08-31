export type ArabicSemanticColor = "green" | "blue" | "red";
export type ArabicSemanticHighlight = { text: string; color: ArabicSemanticColor; role: "keyword" | "structure" | "letter" | "syllable"; };

export const lesson07CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ اجْتَمَعَ فَاضِلٌ وَسِيرِينُ وَرَحْمَةُ حَوْلَ الْمَائِدَةِ، وَسَنَتَعَرَّفُ إِلَى أَشْيَاءَ نَسْتَعْمِلُهَا فِي مَنْزِلِنَا.",
  s2: "تُعِدُّ سِيرِينُ الْمَائِدَةَ، فَتَضَعُ الصُّحُونَ وَالْأَكْوَابَ وَالْمَلَاعِقَ بِتَرْتِيبٍ.",
  s3: "نَقُولُ: هَذَا صَحْنٌ، وَهَذِهِ مِلْعَقَةٌ.",
  s4: "عَلَى الْمَائِدَةِ نَجِدُ صَحْنًا، وَكُوبًا، وَمِلْعَقَةً، وَسِكِّينًا.",
  s5: "بَعْدَ الطَّعَامِ أَغْسِلُ يَدَيَّ فِي الْحَمَّامِ بِالْمَاءِ وَالصَّابُونِ.",
  s6: "فِي الْحَمَّامِ نَجِدُ الصَّابُونَ، وَالْمِرَشَّ، وَالْمِغْسَلَ، وَالْحَوْضَ.",
  s7: "أَحْسَنْتُمْ! تَعَرَّفْنَا إِلَى أَشْيَاءِ الْمَائِدَةِ وَالْحَمَّامِ، وَتَعَلَّمْنَا أَنْ نَقُولَ: هَذَا وَهَذِهِ.",
} as const;

export const lesson07SemanticHighlights: Record<string, ArabicSemanticHighlight[]> = {
  s1: [{ text: "فَاضِلٌ", color: "green", role: "keyword" }, { text: "سِيرِينُ", color: "green", role: "keyword" }, { text: "رَحْمَةُ", color: "green", role: "keyword" }, { text: "الْمَائِدَةِ", color: "blue", role: "keyword" }],
  s2: [{ text: "سِيرِينُ", color: "green", role: "keyword" }, { text: "الْمَائِدَةَ", color: "blue", role: "keyword" }, { text: "الصُّحُونَ", color: "blue", role: "keyword" }, { text: "الْأَكْوَابَ", color: "blue", role: "keyword" }, { text: "الْمَلَاعِقَ", color: "blue", role: "keyword" }],
  s3: [{ text: "هَذَا", color: "blue", role: "keyword" }, { text: "صَحْنٌ", color: "blue", role: "keyword" }, { text: "هَذِهِ", color: "blue", role: "keyword" }, { text: "مِلْعَقَةٌ", color: "blue", role: "keyword" }],
  s4: [{ text: "الْمَائِدَةِ", color: "blue", role: "keyword" }, { text: "صَحْنًا", color: "blue", role: "keyword" }, { text: "كُوبًا", color: "blue", role: "keyword" }, { text: "مِلْعَقَةً", color: "blue", role: "keyword" }, { text: "سِكِّينًا", color: "blue", role: "keyword" }],
  s5: [{ text: "أَغْسِلُ", color: "blue", role: "keyword" }, { text: "يَدَيَّ", color: "blue", role: "keyword" }, { text: "الْحَمَّامِ", color: "blue", role: "keyword" }, { text: "الصَّابُونِ", color: "blue", role: "keyword" }],
  s6: [{ text: "الْحَمَّامِ", color: "blue", role: "keyword" }, { text: "الصَّابُونَ", color: "blue", role: "keyword" }, { text: "الْمِرَشَّ", color: "blue", role: "keyword" }, { text: "الْمِغْسَلَ", color: "blue", role: "keyword" }, { text: "الْحَوْضَ", color: "blue", role: "keyword" }],
  s7: [{ text: "الْمَائِدَةِ", color: "blue", role: "keyword" }, { text: "الْحَمَّامِ", color: "blue", role: "keyword" }, { text: "هَذَا", color: "blue", role: "keyword" }, { text: "وَهَذِهِ", color: "blue", role: "keyword" }],
};

const lesson07 = {
  id: "arabic-w01-u07",
  lessonKey: "arabic-w01-u07",
  lesson_number: 7,
  num: 7,
  subject: "arabic",
  subjectId: "arabic",
  grade: 1,
  world_id: "family",
  worldTitle: "عائلتي",
  sort_order: 7,
  title: "الْعَائِلَةُ مُجْتَمِعَةٌ",
  title_fr: "La famille est réunie",
  teacher: "taline-khalil",
  voice: "mixed",
  audio_base: "/audio/v2/arabic/lesson07",
  exercisePath: "/lesson-v2/arabic/lesson07/exercises",
  objectives: [
    "أتعرف إلى مفردات المائدة.",
    "أستعمل هذا وهذه استعمالًا بسيطًا.",
    "أتعرف إلى مفردات الحمام.",
    "أربط بين النظافة وغسل اليدين."
  ],
  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/arabic/lesson07/s1.webp",
      image: "/lessons/v2/arabic/lesson07/s1.webp",
      audio_key: "lesson07_s1",
      audioKey: "lesson07_s1",
      text: lesson07CanonicalText.s1,
      semanticHighlights: lesson07SemanticHighlights.s1,
    },
    {
      scene: 2,
      scene_image: "/lessons/v2/arabic/lesson07/s2.webp",
      image: "/lessons/v2/arabic/lesson07/s2.webp",
      audio_key: "lesson07_s2",
      audioKey: "lesson07_s2",
      text: lesson07CanonicalText.s2,
      semanticHighlights: lesson07SemanticHighlights.s2,
    },
    {
      scene: 3,
      scene_image: "/lessons/v2/arabic/lesson07/s3.webp",
      image: "/lessons/v2/arabic/lesson07/s3.webp",
      audio_key: "lesson07_s3",
      audioKey: "lesson07_s3",
      text: lesson07CanonicalText.s3,
      semanticHighlights: lesson07SemanticHighlights.s3,
    },
    {
      scene: 4,
      scene_image: "/lessons/v2/arabic/lesson07/s4.webp",
      image: "/lessons/v2/arabic/lesson07/s4.webp",
      audio_key: "lesson07_s4",
      audioKey: "lesson07_s4",
      text: lesson07CanonicalText.s4,
      semanticHighlights: lesson07SemanticHighlights.s4,
    },
    {
      scene: 5,
      scene_image: "/lessons/v2/arabic/lesson07/s5.webp",
      image: "/lessons/v2/arabic/lesson07/s5.webp",
      audio_key: "lesson07_s5",
      audioKey: "lesson07_s5",
      text: lesson07CanonicalText.s5,
      semanticHighlights: lesson07SemanticHighlights.s5,
    },
    {
      scene: 6,
      scene_image: "/lessons/v2/arabic/lesson07/s6.webp",
      image: "/lessons/v2/arabic/lesson07/s6.webp",
      audio_key: "lesson07_s6",
      audioKey: "lesson07_s6",
      text: lesson07CanonicalText.s6,
      semanticHighlights: lesson07SemanticHighlights.s6,
    },
    {
      scene: 7,
      scene_image: "/lessons/v2/arabic/lesson07/s7.webp",
      image: "/lessons/v2/arabic/lesson07/s7.webp",
      audio_key: "lesson07_s7",
      audioKey: "lesson07_s7",
      text: lesson07CanonicalText.s7,
      semanticHighlights: lesson07SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true,
    },
  ],
} as const;

export default lesson07;
