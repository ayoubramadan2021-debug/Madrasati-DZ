export type IslamicSemanticColor =
  "green" | "blue" | "red";

export type IslamicSemanticHighlight = {
  text: string;
  color: IslamicSemanticColor;
  role: "keyword" | "structure" | "letter" | "syllable";
};

export const lesson06CanonicalText = {
  s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ أَدَبًا جَمِيلًا مِنْ آدَابِ الْمُسْلِمِ: الِاسْتِئْذَانَ.",
  s2: "قَبْلَ أَنْ أَدْخُلَ، أَطْرُقُ الْبَابَ وَأَسْتَأْذِنُ.",
  s3: "بَعْدَ أَنْ أَسْتَأْذِنَ، أَنْتَظِرُ حَتَّى يُسْمَحَ لِي بِالدُّخُولِ.",
  s4: "عِنْدَمَا يُؤْذَنُ لِي، أَدْخُلُ بِأَدَبٍ وَأَقُولُ: شُكْرًا.",
  s5: "أَسْتَأْذِنُ لِأَنِّي أَحْتَرِمُ النَّاسَ، وَأُحَافِظُ عَلَى خُصُوصِيَّتِهِمْ.",
  s6: "الِاسْتِئْذَانُ مِنْ آدَابِ الْمُسْلِمِ. الطِّفْلُ الْمُهَذَّبُ يَسْتَأْذِنُ قَبْلَ الدُّخُولِ.",
  s7: "أَحْسَنْتَ يَا بَطَلُ! تَعَلَّمْنَا أَنْ نَطْرُقَ الْبَابَ، وَنَسْتَأْذِنَ، وَنَنْتَظِرَ الْإِذْنَ. أَنَا طِفْلٌ مُهَذَّبٌ، أَسْتَأْذِنُ غَيْرِي.",
} as const;

export const lesson06SemanticHighlights:
Record<string, IslamicSemanticHighlight[]> = {
  s1: [{ text: "آدَابِ", color: "blue", role: "keyword" }, { text: "الْمُسْلِمِ", color: "blue", role: "keyword" }, { text: "الِاسْتِئْذَانَ", color: "blue", role: "keyword" }],
  s2: [{ text: "أَطْرُقُ", color: "blue", role: "keyword" }, { text: "الْبَابَ", color: "blue", role: "keyword" }, { text: "وَأَسْتَأْذِنُ", color: "blue", role: "keyword" }],
  s3: [{ text: "أَسْتَأْذِنَ", color: "blue", role: "keyword" }, { text: "أَنْتَظِرُ", color: "blue", role: "keyword" }, { text: "بِالدُّخُولِ", color: "blue", role: "keyword" }],
  s4: [{ text: "يُؤْذَنُ", color: "blue", role: "keyword" }, { text: "أَدْخُلُ", color: "blue", role: "keyword" }, { text: "بِأَدَبٍ", color: "blue", role: "keyword" }, { text: "شُكْرًا", color: "blue", role: "keyword" }],
  s5: [{ text: "أَسْتَأْذِنُ", color: "blue", role: "keyword" }, { text: "أَحْتَرِمُ", color: "blue", role: "keyword" }, { text: "النَّاسَ", color: "blue", role: "keyword" }, { text: "خُصُوصِيَّتِهِمْ", color: "blue", role: "keyword" }],
  s6: [{ text: "الِاسْتِئْذَانُ", color: "blue", role: "keyword" }, { text: "آدَابِ", color: "blue", role: "keyword" }, { text: "الْمُسْلِمِ", color: "blue", role: "keyword" }, { text: "الْمُهَذَّبُ", color: "blue", role: "keyword" }, { text: "يَسْتَأْذِنُ", color: "blue", role: "keyword" }],
  s7: [{ text: "نَطْرُقَ", color: "blue", role: "keyword" }, { text: "الْبَابَ", color: "blue", role: "keyword" }, { text: "وَنَسْتَأْذِنَ", color: "blue", role: "keyword" }, { text: "الْإِذْنَ", color: "blue", role: "keyword" }, { text: "مُهَذَّبٌ", color: "blue", role: "keyword" }, { text: "أَسْتَأْذِنُ", color: "blue", role: "keyword" }],
};

const lesson06 = {
  id: "islamic-w01-u06",
  lessonKey: "islamic-w01-u06",

  lesson_number: 6,
  num: 6,

  subject: "islamic",
  subjectId: "islamic",

  grade: 1,

  world_id: "family",
  worldTitle: "عائلتي",

  sort_order: 6,

  title: "أَسْتَأْذِنُ",
  title_fr: "Je demande la permission",

  teacher: "taline-khalil",
  voice: "mixed",

  audio_base:
    "/audio/v2/islamic/lesson06",

  exercisePath: "/lesson-v2/islamic/lesson06/exercises",

  objectives: [
    "أتعرف إلى معنى الاستئذان.",
    "أطرق الباب قبل الدخول.",
    "أنتظر الإذن قبل الدخول.",
    "أتعلم أن الاستئذان من آداب المسلم."
  ],

  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/islamic/lesson06/s1.webp",
      image: "/lessons/v2/islamic/lesson06/s1.webp",
      audio_key: "lesson06_s1",
      audioKey: "lesson06_s1",
      text: lesson06CanonicalText.s1,
      semanticHighlights: lesson06SemanticHighlights.s1,
    },
    {
      scene: 2,
      scene_image: "/lessons/v2/islamic/lesson06/s2.webp",
      image: "/lessons/v2/islamic/lesson06/s2.webp",
      audio_key: "lesson06_s2",
      audioKey: "lesson06_s2",
      text: lesson06CanonicalText.s2,
      semanticHighlights: lesson06SemanticHighlights.s2,
    },
    {
      scene: 3,
      scene_image: "/lessons/v2/islamic/lesson06/s3.webp",
      image: "/lessons/v2/islamic/lesson06/s3.webp",
      audio_key: "lesson06_s3",
      audioKey: "lesson06_s3",
      text: lesson06CanonicalText.s3,
      semanticHighlights: lesson06SemanticHighlights.s3,
    },
    {
      scene: 4,
      scene_image: "/lessons/v2/islamic/lesson06/s4.webp",
      image: "/lessons/v2/islamic/lesson06/s4.webp",
      audio_key: "lesson06_s4",
      audioKey: "lesson06_s4",
      text: lesson06CanonicalText.s4,
      semanticHighlights: lesson06SemanticHighlights.s4,
    },
    {
      scene: 5,
      scene_image: "/lessons/v2/islamic/lesson06/s5.webp",
      image: "/lessons/v2/islamic/lesson06/s5.webp",
      audio_key: "lesson06_s5",
      audioKey: "lesson06_s5",
      text: lesson06CanonicalText.s5,
      semanticHighlights: lesson06SemanticHighlights.s5,
    },
    {
      scene: 6,
      scene_image: "/lessons/v2/islamic/lesson06/s6.webp",
      image: "/lessons/v2/islamic/lesson06/s6.webp",
      audio_key: "lesson06_s6",
      audioKey: "lesson06_s6",
      text: lesson06CanonicalText.s6,
      semanticHighlights: lesson06SemanticHighlights.s6,
    },
    {
      scene: 7,
      scene_image: "/lessons/v2/islamic/lesson06/s7.webp",
      image: "/lessons/v2/islamic/lesson06/s7.webp",
      audio_key: "lesson06_s7",
      audioKey: "lesson06_s7",
      text: lesson06CanonicalText.s7,
      semanticHighlights: lesson06SemanticHighlights.s7, cta_text: "ابدأ النشاطات", is_closing: true,
    },
  ],
} as const;

export default lesson06;
