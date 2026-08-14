/**
 * MADRASATI-DZ
 * Lesson 111
 *
 * فِي مَنْزِلِنَا مَوَادُّ لِلنَّظَافَةِ وَالتَّطْهِيرِ
 *
 * DATA ONLY
 * ENGINE STAYS UNIFIED
 */

export const lesson111CanonicalText = {
  lesson111_s1:
    "فِي مَنْزِلِنَا مَوَادُّ مُتَنَوِّعَةٌ لِلنَّظَافَةِ وَالتَّطْهِيرِ، مِنْهَا الصَّابُونُ وَمَسْحُوقُ الْغَسِيلِ وَمَوَادُّ التَّنْظِيفِ السَّائِلَةُ.",

  lesson111_s2:
    "بَعْضُ مَوَادِّ التَّنْظِيفِ سَائِلَةٌ، مِثْلُ سَائِلِ التَّنْظِيفِ وَمَادَّةِ التَّطْهِيرِ، وَيَسْتَعْمِلُهَا الْبَالِغُ بِحَذَرٍ.",

  lesson111_s3:
    "وَبَعْضُ مَوَادِّ النَّظَافَةِ صُلْبٌ أَوْ مَسْحُوقٌ، مِثْلُ قِطْعَةِ الصَّابُونِ وَمَسْحُوقِ الْغَسِيلِ.",

  lesson111_s4:
    "نَخْتَارُ مَادَّةَ التَّنْظِيفِ الْمُنَاسِبَةَ حَسَبَ مَا نُرِيدُ تَنْظِيفَهُ؛ فَلِلْمَلَابِسِ مَادَّةٌ مُنَاسِبَةٌ، وَلِلْأَسْطُحِ مَادَّةٌ أُخْرَى.",

  lesson111_s5:
    "بَعْضُ مَوَادِّ التَّطْهِيرِ تَحْمِلُ رَمْزَ خَطَرٍ؛ لِذَلِكَ لَا يَسْتَعْمِلُهَا الْأَطْفَالُ، وَيَسْتَعْمِلُهَا الْبَالِغُ بِحَذَرٍ.",

  lesson111_s6:
    "أَحْسَنْتُمْ! تَعَلَّمْنَا أَنَّ مَوَادَّ النَّظَافَةِ مُتَنَوِّعَةٌ، مِنْهَا السَّائِلُ وَالصُّلْبُ، وَأَنَّ الْمَوَادَّ الْخَطِرَةَ يَسْتَعْمِلُهَا الْبَالِغُ بِحَذَرٍ.",
} as const;


export const lesson111 = {
  id: "lesson111",
  lessonKey: "lesson111",
  num: 111,

  world_id: "b3187e1b-58da-441d-ae43-d4be486e7c12",
  sort_order: 26,

  title: "فِي مَنْزِلِنَا مَوَادُّ لِلنَّظَافَةِ وَالتَّطْهِيرِ",
  title_fr:
    "À la maison, des produits de nettoyage et de désinfection",

  teacher: "taline",
  voice: "ar-DZ-AminaNeural",

  audio_base:
    "/audio/teachers/taline/lesson_111_home_cleaning_disinfection_products",

  exercisePath:
    "/lesson-v2/111/exercises",

  nextLessonKey:
    "lesson112",

  objectives: [
    "التَّعَرُّفُ عَلَى تَنَوُّعِ مَوَادِّ النَّظَافَةِ وَالتَّطْهِيرِ.",
    "التَّمْيِيزُ بَيْنَ الْمَوَادِّ السَّائِلَةِ وَالصُّلْبَةِ أَوِ الْمَسْحُوقَةِ.",
    "احْتِرَامُ قَوَاعِدِ السَّلَامَةِ عِنْدَ التَّعَامُلِ مَعَ الْمَوَادِّ الْخَطِرَةِ.",
  ],

  slides: [
    {
      key: "lesson111_s1",
      audio_key: "lesson111_s1",
      title: "أَكْتَشِفُ",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s1.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s1.webp",
      text: lesson111CanonicalText.lesson111_s1,
    },

    {
      key: "lesson111_s2",
      audio_key: "lesson111_s2",
      title: "الْمَوَادُّ السَّائِلَةُ",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s2.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s2.webp",
      text: lesson111CanonicalText.lesson111_s2,
    },

    {
      key: "lesson111_s3",
      audio_key: "lesson111_s3",
      title: "الْمَوَادُّ الصُّلْبَةُ",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s3.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s3.webp",
      text: lesson111CanonicalText.lesson111_s3,
    },

    {
      key: "lesson111_s4",
      audio_key: "lesson111_s4",
      title: "أَرْبِطُ الْمَادَّةَ بِاسْتِعْمَالِهَا",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s4.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s4.webp",
      text: lesson111CanonicalText.lesson111_s4,
    },

    {
      key: "lesson111_s5",
      audio_key: "lesson111_s5",
      title: "رَمْزُ الْخَطَرِ",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s5.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s5.webp",
      text: lesson111CanonicalText.lesson111_s5,
    },

    {
      key: "lesson111_s6",
      audio_key: "lesson111_s6",
      title: "أَحْسَنْتُمْ",
      image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s6.webp",
      scene_image:
        "/lessons/v2/lesson111-home-cleaning-disinfection-products/s6.webp",
      text: lesson111CanonicalText.lesson111_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
};


export const LESSON_111_CONTENT = lesson111;

export default LESSON_111_CONTENT;
