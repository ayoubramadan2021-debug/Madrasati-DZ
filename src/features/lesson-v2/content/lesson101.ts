export const lesson101CanonicalText = {

  lesson101_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! نَسْتَعْمِلُ فِي الْكِتَابَةِ وَالرَّسْمِ أَدَوَاتٍ مُخْتَلِفَةً، وَكُلُّ أَدَاةٍ تَتْرُكُ أَثَرًا.",

  lesson101_s2:
    "يَتْرُكُ الطَّبَاشِيرُ أَثَرًا عَلَى السَّبُّورَةِ، وَيَسْهُلُ مَسْحُ هَذَا الْأَثَرِ.",

  lesson101_s3:
    "يَتْرُكُ قَلَمُ الرَّصَاصِ أَثَرًا عَلَى الْوَرَقِ، وَيُمْكِنُنَا مَحْوُهُ بِالْمِمْحَاةِ.",

  lesson101_s4:
    "يَتْرُكُ قَلَمُ الْحِبْرِ أَثَرًا وَاضِحًا، وَيَصْعُبُ إِزَالَتُهُ مُقَارَنَةً بِقَلَمِ الرَّصَاصِ.",

  lesson101_s5:
    "تَتْرُكُ الْأَلْوَانُ الْمَائِيَّةُ أَثَرًا مُلَوَّنًا، لِذَلِكَ نَسْتَعْمِلُهَا عَلَى وَرَقِ الرَّسْمِ بِعِنَايَةٍ.",

  lesson101_s6:
    "أَحْسَنْتُمْ! تَعَلَّمْنَا أَنَّ الطَّبَاشِيرَ وَقَلَمَ الرَّصَاصِ يَسْهُلُ إِزَالَةُ أَثَرِهِمَا، أَمَّا قَلَمُ الْحِبْرِ وَالْأَلْوَانُ الْمَائِيَّةُ فَيَصْعُبُ إِزَالَةُ أَثَرِهِمَا.",

} as const;


export const lesson101 = {

  id:
    "lesson101",

  lessonKey:
    "lesson101",

  num:
    101,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order:
    16,

  title:
    "أَدَوَاتِي تَتْرُكُ أَثَرًا",

  title_fr:
    "Mes outils laissent des traces",

  teacher:
    "taline",

  voice:
    "ar-DZ-AminaNeural",

  audio_base:
    "/audio/teachers/taline/lesson_101_tools_leave_traces",

  exercisePath:
    "/lesson-v2/101/exercises",

  nextLessonKey:
    "lesson102",

  objectives: [

    "التَّعَرُّفُ إِلَى بَعْضِ أَدَوَاتِ الْكِتَابَةِ وَالرَّسْمِ.",

    "رَبْطُ كُلِّ أَدَاةٍ بِالْأَثَرِ الَّذِي تَتْرُكُهُ.",

    "تَمْيِيزُ الْأَثَرِ الَّذِي يَسْهُلُ إِزَالَتُهُ مِنَ الْأَثَرِ الَّذِي يَصْعُبُ إِزَالَتُهُ.",

    "اسْتِعْمَالُ أَدَوَاتِ الْكِتَابَةِ وَالرَّسْمِ بِطَرِيقَةٍ مُنَاسِبَةٍ.",
  ],


  slides: [

    {
      key:
        "s1_tools_intro",

      audio_key:
        "lesson101_s1",

      title:
        "أَتَعَرَّفُ إِلَى أَدَوَاتِي",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s1.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s1.webp",

      text:
        lesson101CanonicalText.lesson101_s1,
    },


    {
      key:
        "s2_chalk",

      audio_key:
        "lesson101_s2",

      title:
        "أَثَرُ الطَّبَاشِيرِ",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s2.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s2.webp",

      text:
        lesson101CanonicalText.lesson101_s2,
    },


    {
      key:
        "s3_pencil",

      audio_key:
        "lesson101_s3",

      title:
        "أَثَرُ قَلَمِ الرَّصَاصِ",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s3.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s3.webp",

      text:
        lesson101CanonicalText.lesson101_s3,
    },


    {
      key:
        "s4_ink",

      audio_key:
        "lesson101_s4",

      title:
        "أَثَرُ قَلَمِ الْحِبْرِ",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s4.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s4.webp",

      text:
        lesson101CanonicalText.lesson101_s4,
    },


    {
      key:
        "s5_watercolor",

      audio_key:
        "lesson101_s5",

      title:
        "أَثَرُ الْأَلْوَانِ الْمَائِيَّةِ",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s5.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s5.webp",

      text:
        lesson101CanonicalText.lesson101_s5,
    },


    {
      key:
        "s6_closing",

      audio_key:
        "lesson101_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson101-tools-leave-traces/s6.webp",

      scene_image:
        "/lessons/v2/lesson101-tools-leave-traces/s6.webp",

      text:
        lesson101CanonicalText.lesson101_s6,

      is_closing:
        true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },

  ],

} as const;


export const LESSON_101_CONTENT =
  lesson101;

export default lesson101;
