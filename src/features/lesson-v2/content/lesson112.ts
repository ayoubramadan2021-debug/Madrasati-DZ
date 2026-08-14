/**
 * MADRASATI-DZ
 * Lesson 112
 *
 * مُتَتَالِيَةُ الْأَعْدَادِ الْأَصْغَرِ مِنْ 100
 *
 * DATA CHANGES
 * ENGINE STAYS UNIFIED
 */

export const lesson112CanonicalText = {

  lesson112_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! الْأَعْدَادُ الْأَصْغَرُ مِنْ مِائَةٍ تَأْتِي فِي تَرْتِيبٍ. نَبْدَأُ مِنَ الصِّفْرِ، وَنُوَاصِلُ الْعَدَّ حَتَّى تِسْعَةٍ وَتِسْعِينَ.",

  lesson112_s2:
    "إِذَا اخْتَفَى عَدَدٌ مِنَ الْمُتَتَالِيَةِ، أَنْظُرُ إِلَى الْعَدَدِ الَّذِي قَبْلَهُ وَالْعَدَدِ الَّذِي بَعْدَهُ. بَيْنَ ثَلَاثَةٍ وَعِشْرِينَ وَخَمْسَةٍ وَعِشْرِينَ نَجِدُ أَرْبَعَةً وَعِشْرِينَ.",

  lesson112_s3:
    "نَبْدَأُ مِنْ ثَلَاثَةَ عَشَرَ. كُلَّ مَرَّةٍ نُضِيفُ عَشَرَةً: ثَلَاثَةَ عَشَرَ، ثَلَاثَةٌ وَعِشْرُونَ، ثَلَاثَةٌ وَثَلَاثُونَ، ثَلَاثَةٌ وَأَرْبَعُونَ، ثَلَاثَةٌ وَخَمْسُونَ.",

  lesson112_s4:
    "وَالْآنَ نَنْقُصُ خَمْسَةً كُلَّ مَرَّةٍ: خَمْسَةٌ وَأَرْبَعُونَ، أَرْبَعُونَ، خَمْسَةٌ وَثَلَاثُونَ، ثَلَاثُونَ، خَمْسَةٌ وَعِشْرُونَ.",

  lesson112_s5:
    "يُمْكِنُنَا أَيْضًا تَفْكِيكُ الْعَدَدِ إِلَى عَشَرَاتٍ وَآحَادٍ. ثَمَانِيَةٌ وَثَلَاثُونَ تُسَاوِي ثَلَاثِينَ زَائِدَ ثَمَانِيَةٍ، وَوَاحِدٌ وَسَبْعُونَ يُسَاوِي سَبْعِينَ زَائِدَ وَاحِدٍ، وَسِتَّةٌ وَتِسْعُونَ تُسَاوِي تِسْعِينَ زَائِدَ سِتَّةٍ.",

  lesson112_s6:
    "أَحْسَنْتُمْ! أَصْبَحْنَا نُكْمِلُ الْمُتَتَالِيَاتِ، وَنَكْتَشِفُ الْعَدَدَ الْمَفْقُودَ، وَنُفَكِّكُ الْعَدَدَ إِلَى عَشَرَاتٍ وَآحَادٍ. هَيَّا نَتَدَرَّبُ!",

} as const;


export const lesson112 = {

  id: "lesson112",

  lessonKey: "lesson112",

  num: 112,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order: 27,

  title:
    "مُتَتَالِيَةُ الْأَعْدَادِ الْأَصْغَرِ مِنْ 100",

  title_fr:
    "Suite des nombres inférieurs à 100",

  teacher:
    "khalil",

  voice:
    "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_112_number_sequence_less_than_100",

  exercisePath:
    "/lesson-v2/112/exercises",

  nextLessonKey:
    "lesson113",

  objectives: [

    "تَرْتِيبُ الْأَعْدَادِ الْأَصْغَرِ مِنْ 100.",

    "إِكْمَالُ مُتَتَالِيَةٍ عَدَدِيَّةٍ بَسِيطَةٍ.",

    "التَّعَرُّفُ عَلَى الْعَدَدِ الْمَفْقُودِ.",

    "تَفْكِيكُ الْعَدَدِ إِلَى عَشَرَاتٍ وَآحَادٍ.",

  ],

  slides: [

    {
      key:
        "lesson112_s1",

      audio_key:
        "lesson112_s1",

      title:
        "أُرَتِّبُ الْأَعْدَادَ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s1.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s1.webp",

      text:
        lesson112CanonicalText.lesson112_s1,
    },


    {
      key:
        "lesson112_s2",

      audio_key:
        "lesson112_s2",

      title:
        "أَكْتَشِفُ الْعَدَدَ الْمَفْقُودَ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s2.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s2.webp",

      text:
        lesson112CanonicalText.lesson112_s2,
    },


    {
      key:
        "lesson112_s3",

      audio_key:
        "lesson112_s3",

      title:
        "مُتَتَالِيَةٌ تَصَاعُدِيَّةٌ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s3.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s3.webp",

      text:
        lesson112CanonicalText.lesson112_s3,
    },


    {
      key:
        "lesson112_s4",

      audio_key:
        "lesson112_s4",

      title:
        "مُتَتَالِيَةٌ تَنَازُلِيَّةٌ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s4.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s4.webp",

      text:
        lesson112CanonicalText.lesson112_s4,
    },


    {
      key:
        "lesson112_s5",

      audio_key:
        "lesson112_s5",

      title:
        "أُفَكِّكُ الْعَدَدَ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s5.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s5.webp",

      text:
        lesson112CanonicalText.lesson112_s5,
    },


    {
      key:
        "lesson112_s6",

      audio_key:
        "lesson112_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s6.webp",

      scene_image:
        "/lessons/v2/lesson112-number-sequence-less-than-100/s6.webp",

      text:
        lesson112CanonicalText.lesson112_s6,

      is_closing:
        true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },

  ],
};


export const LESSON_112_CONTENT =
  lesson112;


export default LESSON_112_CONTENT;
