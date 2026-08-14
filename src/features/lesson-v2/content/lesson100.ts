export const lesson100CanonicalText = {

  lesson100_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَرَّفُ إِلَى أَشْكَالٍ هَنْدَسِيَّةٍ بَسِيطَةٍ، وَسَنَتَعَلَّمُ كَيْفَ نَصِفُهَا بِعَدَدِ أَضْلَاعِهَا وَرُؤُوسِهَا.",

  lesson100_s2:
    "هَذِهِ دَائِرَةٌ، وَهَذَا مُثَلَّثٌ، وَهَذَا مُرَبَّعٌ، وَهَذَا مُسْتَطِيلٌ. لِكُلِّ شَكْلٍ خَصَائِصُ تُمَيِّزُهُ عَنِ الْأَشْكَالِ الْأُخْرَى.",

  lesson100_s3:
    "لِنُلَاحِظِ الْمُثَلَّثَ. لَهُ ثَلَاثَةُ أَضْلَاعٍ وَثَلَاثَةُ رُؤُوسٍ. إِذَنْ، إِذَا كَانَ لِلشَّكْلِ ثَلَاثَةُ أَضْلَاعٍ وَثَلَاثَةُ رُؤُوسٍ فَهُوَ مُثَلَّثٌ.",

  lesson100_s4:
    "لِلْمُرَبَّعِ أَرْبَعَةُ أَضْلَاعٍ مُتَسَاوِيَةٍ وَأَرْبَعَةُ رُؤُوسٍ. أَمَّا الدَّائِرَةُ فَلَيْسَ لَهَا أَضْلَاعٌ وَلَا رُؤُوسٌ. هَكَذَا نَسْتَطِيعُ التَّمْيِيزَ بَيْنَهُمَا.",

  lesson100_s5:
    "يُمْكِنُنَا أَنْ نُرَكِّبَ أَشْكَالًا بَسِيطَةً لِنَحْصُلَ عَلَى شَكْلٍ جَدِيدٍ. فَهَذَا الرَّجُلُ الْآلِيُّ مُكَوَّنٌ مِنْ دَائِرَةٍ وَمُرَبَّعٍ وَمُسْتَطِيلَاتٍ وَمُثَلَّثَاتٍ.",

  lesson100_s6:
    "أَحْسَنْتُمْ! لِوَصْفِ شَكْلٍ نَذْكُرُ عَدَدَ أَضْلَاعِهِ، وَعَدَدَ رُؤُوسِهِ، وَنُلَاحِظُ إِنْ كَانَتْ أَضْلَاعُهُ مُتَسَاوِيَةً. وَيُمْكِنُنَا أَيْضًا تَرْكِيبُ أَشْكَالٍ بَسِيطَةٍ لِنَصْنَعَ شَكْلًا مُرَكَّبًا. هَيَّا نَتَدَرَّبُ!",

} as const;


export const lesson100 = {

  id:
    "lesson100",

  lessonKey:
    "lesson100",

  num:
    100,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order:
    15,

  title:
    "وَصْفُ شَكْلٍ بَسِيطٍ أَوْ مُرَكَّبٍ",

  title_fr:
    "Décrire une figure simple ou composée",

  teacher:
    "khalil",

  voice:
    "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_100_simple_composite_shapes",

  exercisePath:
    "/lesson-v2/100/exercises",

  nextLessonKey:
    "lesson101",

  objectives: [

    "التَّعَرُّفُ إِلَى الدَّائِرَةِ وَالْمُثَلَّثِ وَالْمُرَبَّعِ وَالْمُسْتَطِيلِ.",

    "وَصْفُ شَكْلٍ بِعَدَدِ أَضْلَاعِهِ وَرُؤُوسِهِ.",

    "تَمْيِيزُ الْمُرَبَّعِ بِأَضْلَاعِهِ الْأَرْبَعَةِ الْمُتَسَاوِيَةِ.",

    "التَّعَرُّفُ إِلَى شَكْلٍ مُرَكَّبٍ مِنْ أَشْكَالٍ بَسِيطَةٍ.",
  ],


  slides: [

    {
      key:
        "s1_intro_shapes",

      audio_key:
        "lesson100_s1",

      title:
        "أَتَعَرَّفُ إِلَى الْأَشْكَالِ",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s1.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s1.webp",

      text:
        lesson100CanonicalText.lesson100_s1,
    },


    {
      key:
        "s2_identify_shapes",

      audio_key:
        "lesson100_s2",

      title:
        "أُمَيِّزُ الْأَشْكَالَ",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s2.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s2.webp",

      text:
        lesson100CanonicalText.lesson100_s2,
    },


    {
      key:
        "s3_describe_triangle",

      audio_key:
        "lesson100_s3",

      title:
        "أَصِفُ الْمُثَلَّثَ",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s3.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s3.webp",

      text:
        lesson100CanonicalText.lesson100_s3,
    },


    {
      key:
        "s4_square_circle",

      audio_key:
        "lesson100_s4",

      title:
        "أَصِفُ الْمُرَبَّعَ وَالدَّائِرَةَ",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s4.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s4.webp",

      text:
        lesson100CanonicalText.lesson100_s4,
    },


    {
      key:
        "s5_composite_shape",

      audio_key:
        "lesson100_s5",

      title:
        "أَكْتَشِفُ شَكْلًا مُرَكَّبًا",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s5.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s5.webp",

      text:
        lesson100CanonicalText.lesson100_s5,
    },


    {
      key:
        "s6_closing",

      audio_key:
        "lesson100_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson100-simple-composite-shapes/s6.webp",

      scene_image:
        "/lessons/v2/lesson100-simple-composite-shapes/s6.webp",

      text:
        lesson100CanonicalText.lesson100_s6,

      is_closing:
        true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },

  ],

} as const;


export const LESSON_100_CONTENT =
  lesson100;

export default lesson100;
