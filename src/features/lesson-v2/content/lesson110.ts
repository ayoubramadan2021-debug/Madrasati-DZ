export const lesson110CanonicalText = {
  lesson110_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! نُلَاحِظُ أَنَّ بَعْضَ الْأَشْكَالِ مُكْتَمِلَةٌ، وَبَعْضَهَا يَنْقُصُهُ ضِلْعٌ وَاحِدٌ.",

  lesson110_s2:
    "لِنُتِمَّ الْمُرَبَّعَ، نُضِيفُ الضِّلْعَ النَّاقِصَ فِي مَكَانِهِ، فَيُصْبِحُ الشَّكْلُ مُغْلَقًا وَمُكْتَمِلًا.",

  lesson110_s3:
    "فِي الْمُثَلَّثِ، نُضِيفُ الْقَاعِدَةَ النَّاقِصَةَ، فَيُصْبِحُ لَهُ ثَلَاثَةُ أَضْلَاعٍ وَيُغْلَقُ الشَّكْلُ.",

  lesson110_s4:
    "فِي الْمُسْتَطِيلِ، نُضِيفُ الضِّلْعَ الْعَمُودِيَّ النَّاقِصَ، فَيُصْبِحُ الْمُسْتَطِيلُ مُغْلَقًا وَمُكْتَمِلًا.",

  lesson110_s5:
    "قَبْلَ أَنْ نُكْمِلَ الشَّكْلَ، نُلَاحِظُ مَكَانَ الضِّلْعِ النَّاقِصِ وَاتِّجَاهَهُ، ثُمَّ نَخْتَارُ الْخَطَّ الْمُنَاسِبَ.",

  lesson110_s6:
    "أَحْسَنْتُمْ! تَعَلَّمْنَا كَيْفَ نُتِمُّ الْمُثَلَّثَ وَالْمُرَبَّعَ وَالْمُسْتَطِيلَ بِإِضَافَةِ الضِّلْعِ النَّاقِصِ.",
};

export const lesson110 = {
  id: "lesson110",
  lessonKey: "lesson110",
  num: 110,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order: 25,

  title:
    "إِتْمَامُ شَكْلٍ مُسْتَوٍ",

  title_fr:
    "Compléter une figure plane",

  teacher: "khalil",

  voice:
    "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_110_complete_plane_shape",

  exercisePath:
    "/lesson-v2/110/exercises",

  nextLessonKey:
    "lesson111",

  objectives: [
    "التعرّف على الشكل المستوي الناقص.",
    "تحديد الضلع المفقود وإتمام الشكل.",
    "التمييز بين المثلث والمربع والمستطيل المكتمل.",
  ],

  slides: [
    {
      key: "lesson110_s1",
      audio_key: "lesson110_s1",
      title: "أَكْتَشِفُ الشَّكْلَ النَّاقِصَ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s1.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s1.webp",
      text:
        lesson110CanonicalText.lesson110_s1,
    },

    {
      key: "lesson110_s2",
      audio_key: "lesson110_s2",
      title: "أُتِمُّ الْمُرَبَّعَ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s2.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s2.webp",
      text:
        lesson110CanonicalText.lesson110_s2,
    },

    {
      key: "lesson110_s3",
      audio_key: "lesson110_s3",
      title: "أُتِمُّ الْمُثَلَّثَ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s3.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s3.webp",
      text:
        lesson110CanonicalText.lesson110_s3,
    },

    {
      key: "lesson110_s4",
      audio_key: "lesson110_s4",
      title: "أُتِمُّ الْمُسْتَطِيلَ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s4.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s4.webp",
      text:
        lesson110CanonicalText.lesson110_s4,
    },

    {
      key: "lesson110_s5",
      audio_key: "lesson110_s5",
      title: "أَخْتَارُ الْجُزْءَ الصَّحِيحَ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s5.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s5.webp",
      text:
        lesson110CanonicalText.lesson110_s5,
    },

    {
      key: "lesson110_s6",
      audio_key: "lesson110_s6",
      title: "أَحْسَنْتُمْ",
      image:
        "/lessons/v2/lesson110-complete-plane-shape/s6.webp",
      scene_image:
        "/lessons/v2/lesson110-complete-plane-shape/s6.webp",
      text:
        lesson110CanonicalText.lesson110_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
};

export const LESSON_110_CONTENT = lesson110;

export default LESSON_110_CONTENT;
