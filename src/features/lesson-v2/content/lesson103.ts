export const lesson103CanonicalText = {

  lesson103_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! لِنَحْسِبْ سَبْعَةً وَأَرْبَعِينَ زَائِدَ وَاحِدًا وَعِشْرِينَ. نُفَكِّكُ سَبْعَةً وَأَرْبَعِينَ إِلَى أَرْبَعِينَ وَسَبْعَةٍ، وَوَاحِدًا وَعِشْرِينَ إِلَى عِشْرِينَ وَوَاحِدٍ.",

  lesson103_s2:
    "نَبْدَأُ بِالْآحَادِ. سَبْعَةٌ زَائِدُ وَاحِدٍ تُسَاوِي ثَمَانِيَةً. إِذَنْ نَاتِجُ جَمْعِ الْآحَادِ هُوَ ثَمَانِيَةٌ.",

  lesson103_s3:
    "ثُمَّ نَجْمَعُ الْعَشَرَاتِ. أَرْبَعُونَ زَائِدُ عِشْرِينَ تُسَاوِي سِتِّينَ، وَمَعَ ثَمَانِيَةِ آحَادٍ نَحْصُلُ عَلَى ثَمَانِيَةٍ وَسِتِّينَ.",

  lesson103_s4:
    "إِذَنْ سَبْعَةٌ وَأَرْبَعُونَ زَائِدُ وَاحِدٍ وَعِشْرُونَ تُسَاوِي ثَمَانِيَةً وَسِتِّينَ. جَمَعْنَا الْعَشَرَاتِ مَعَ الْعَشَرَاتِ، وَالْآحَادَ مَعَ الْآحَادِ.",

  lesson103_s5:
    "لِنُطَبِّقْ عَلَى مِثَالٍ آخَرَ. سِتَّةٌ وَعِشْرُونَ زَائِدُ ثَلَاثَةٍ وَخَمْسِينَ. عِشْرُونَ زَائِدُ خَمْسِينَ تُسَاوِي سَبْعِينَ، وَسِتَّةٌ زَائِدُ ثَلَاثَةٍ تُسَاوِي تِسْعَةً، فَالنَّاتِجُ تِسْعَةٌ وَسَبْعُونَ.",

  lesson103_s6:
    "أَحْسَنْتُمْ! فِي الْجَمْعِ دُونَ احْتِفَاظٍ نَجْمَعُ الْعَشَرَاتِ مَعَ الْعَشَرَاتِ، وَالْآحَادَ مَعَ الْآحَادِ. فَثَلَاثَةٌ وَسَبْعُونَ زَائِدُ خَمْسَةَ عَشَرَ تُسَاوِي ثَمَانِيَةً وَثَمَانِينَ.",

} as const;


export const lesson103 = {

  id:
    "lesson103",

  lessonKey:
    "lesson103",

  num:
    103,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order:
    18,

  title:
    "الجَمْعُ (دُونَ احْتِفَاظٍ)",

  title_fr:
    "L’addition sans retenue",

  teacher:
    "taline",

  voice:
    "ar-DZ-AminaNeural",

  audio_base:
    "/audio/teachers/taline/lesson_103_addition_without_carrying",

  exercisePath:
    "/lesson-v2/103/exercises",

  nextLessonKey:
    "lesson104",

  objectives: [

    "تَفْكِيكُ عَدَدٍ مِنْ رَقْمَيْنِ إِلَى عَشَرَاتٍ وَآحَادٍ.",

    "جَمْعُ الْآحَادِ مَعَ الْآحَادِ دُونَ احْتِفَاظٍ.",

    "جَمْعُ الْعَشَرَاتِ مَعَ الْعَشَرَاتِ.",

    "حِسَابُ مَجْمُوعِ عَدَدَيْنِ مِنْ رَقْمَيْنِ دُونَ احْتِفَاظٍ.",

    "تَطْبِيقُ طَرِيقَةِ الْجَمْعِ عَلَى أَمْثِلَةٍ جَدِيدَةٍ.",
  ],


  slides: [

    {
      key:
        "s1_decompose",

      audio_key:
        "lesson103_s1",

      title:
        "أُفَكِّكُ الْعَدَدَيْنِ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s1.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s1.webp",

      text:
        lesson103CanonicalText.lesson103_s1,
    },


    {
      key:
        "s2_add_units",

      audio_key:
        "lesson103_s2",

      title:
        "أَجْمَعُ الْآحَادَ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s2.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s2.webp",

      text:
        lesson103CanonicalText.lesson103_s2,
    },


    {
      key:
        "s3_add_tens",

      audio_key:
        "lesson103_s3",

      title:
        "أَجْمَعُ الْعَشَرَاتِ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s3.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s3.webp",

      text:
        lesson103CanonicalText.lesson103_s3,
    },


    {
      key:
        "s4_result",

      audio_key:
        "lesson103_s4",

      title:
        "أَحْصُلُ عَلَى النَّتِيجَةِ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s4.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s4.webp",

      text:
        lesson103CanonicalText.lesson103_s4,
    },


    {
      key:
        "s5_apply",

      audio_key:
        "lesson103_s5",

      title:
        "أُطَبِّقُ عَلَى مِثَالٍ آخَرَ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s5.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s5.webp",

      text:
        lesson103CanonicalText.lesson103_s5,
    },


    {
      key:
        "s6_closing",

      audio_key:
        "lesson103_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson103-addition-without-carrying/s6.webp",

      scene_image:
        "/lessons/v2/lesson103-addition-without-carrying/s6.webp",

      text:
        lesson103CanonicalText.lesson103_s6,

      is_closing:
        true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },

  ],

} as const;


export const LESSON_103_CONTENT =
  lesson103;

export default lesson103;
