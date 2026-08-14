export const lesson102CanonicalText = {

  lesson102_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! سَنَسْتَعِينُ الْيَوْمَ بِمُتَتَالِيَةِ الْعَشَرَاتِ لِنَعْرِفَ مَوْقِعَ كُلِّ عَدَدٍ، وَلِنُقَارِنَ الْأَعْدَادَ وَنُرَتِّبَهَا.",

  lesson102_s2:
    "لِنَنْظُرْ إِلَى الْعَشَرَاتِ. الْعَدَدُ اثْنَانِ وَسَبْعُونَ يَقَعُ بَعْدَ سَبْعِينَ وَقَبْلَ ثَمَانِينَ، وَالْعَدَدُ اثْنَانِ وَثَمَانُونَ يَقَعُ بَعْدَ ثَمَانِينَ وَقَبْلَ تِسْعِينَ.",

  lesson102_s3:
    "عِنْدَ مُقَارَنَةِ عَدَدَيْنِ نَنْظُرُ أَوَّلًا إِلَى الْعَشَرَاتِ. فَثَلَاثَةٌ وَتِسْعُونَ أَكْبَرُ مِنِ اثْنَيْنِ وَسَبْعِينَ، وَاثْنَانِ وَثَمَانُونَ أَكْبَرُ مِنْ وَاحِدٍ وَسِتِّينَ.",

  lesson102_s4:
    "لِكُلِّ عَدَدٍ عَدَدٌ يَسْبِقُهُ وَعَدَدٌ يَلِيهِ. قَبْلَ سَبْعَةٍ وَثَمَانِينَ يَأْتِي سِتَّةٌ وَثَمَانُونَ، وَبَعْدَهُ يَأْتِي ثَمَانِيَةٌ وَثَمَانُونَ.",

  lesson102_s5:
    "لِنُرَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ. نَبْدَأُ بِأَصْغَرِ عَدَدٍ، ثُمَّ نَتَقَدَّمُ تَدْرِيجِيًّا حَتَّى نَصِلَ إِلَى أَكْبَرِ عَدَدٍ.",

  lesson102_s6:
    "أَحْسَنْتُمْ! تُسَاعِدُنَا مُتَتَالِيَةُ الْعَشَرَاتِ عَلَى تَحْدِيدِ مَوَاقِعِ الْأَعْدَادِ وَمُقَارَنَتِهَا وَتَرْتِيبِهَا. فَالْعَدَدُ اثْنَانِ وَسَبْعُونَ بَعْدَ سَبْعِينَ، وَثَلَاثَةٌ وَتِسْعُونَ بَعْدَ تِسْعِينَ.",

} as const;


export const lesson102 = {

  id:
    "lesson102",

  lessonKey:
    "lesson102",

  num:
    102,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order:
    17,

  title:
    "الأَعْدَادُ إِلَى 99 (2)",

  title_fr:
    "Les nombres jusqu'à 99 (2)",

  teacher:
    "khalil",

  voice:
    "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_102_numbers_to_99_2",

  exercisePath:
    "/lesson-v2/102/exercises",

  nextLessonKey:
    "lesson103",

  objectives: [

    "تَحْدِيدُ مَوْقِعِ عَدَدٍ بَيْنَ عَشَرَتَيْنِ مُتَتَالِيَتَيْنِ.",

    "مُقَارَنَةُ عَدَدَيْنِ بِالاسْتِعَانَةِ بِالْعَشَرَاتِ.",

    "تَعْيِينُ الْعَدَدِ السَّابِقِ وَالْعَدَدِ اللَّاحِقِ.",

    "تَرْتِيبُ مَجْمُوعَةٍ مِنَ الْأَعْدَادِ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

    "الاسْتِعَانَةُ بِمُتَتَالِيَةِ الْعَشَرَاتِ فِي الْمُقَارَنَةِ وَالتَّرْتِيبِ.",
  ],


  slides: [

    {
      key:
        "s1_tens_sequence",

      audio_key:
        "lesson102_s1",

      title:
        "أَكْتَشِفُ مُتَتَالِيَةَ الْعَشَرَاتِ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s1.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s1.webp",

      text:
        lesson102CanonicalText.lesson102_s1,
    },


    {
      key:
        "s2_between_tens",

      audio_key:
        "lesson102_s2",

      title:
        "أُحَدِّدُ مَوْقِعَ الْعَدَدِ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s2.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s2.webp",

      text:
        lesson102CanonicalText.lesson102_s2,
    },


    {
      key:
        "s3_compare",

      audio_key:
        "lesson102_s3",

      title:
        "أُقَارِنُ بَيْنَ عَدَدَيْنِ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s3.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s3.webp",

      text:
        lesson102CanonicalText.lesson102_s3,
    },


    {
      key:
        "s4_previous_next",

      audio_key:
        "lesson102_s4",

      title:
        "السَّابِقُ وَاللَّاحِقُ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s4.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s4.webp",

      text:
        lesson102CanonicalText.lesson102_s4,
    },


    {
      key:
        "s5_order",

      audio_key:
        "lesson102_s5",

      title:
        "أُرَتِّبُ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s5.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s5.webp",

      text:
        lesson102CanonicalText.lesson102_s5,
    },


    {
      key:
        "s6_closing",

      audio_key:
        "lesson102_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson102-numbers-to-99-2/s6.webp",

      scene_image:
        "/lessons/v2/lesson102-numbers-to-99-2/s6.webp",

      text:
        lesson102CanonicalText.lesson102_s6,

      is_closing:
        true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },

  ],

} as const;


export const LESSON_102_CONTENT =
  lesson102;

export default lesson102;
