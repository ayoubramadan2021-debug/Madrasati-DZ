export const lesson91CanonicalText = {
  lesson91_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ طَرِيقَةً ذَكِيَّةً لِلْحِسَابِ: نَصِلُ أَوَّلًا إِلَى الْعَشَرَةِ الْمُوَالِيَةِ، ثُمَّ نُضِيفُ الْبَاقِيَ.",

  lesson91_s2:
    "لِنَحْسُبْ أَرْبَعَةَ عَشَرَ زَائِدَ سَبْعَةٍ. نَحْتَاجُ إِلَى سِتَّةٍ لِنَنْتَقِلَ مِنْ أَرْبَعَةَ عَشَرَ إِلَى عِشْرِينَ.",

  lesson91_s3:
    "نَأْخُذُ سِتَّةً مِنَ السَّبْعَةِ، فَنَصِلُ إِلَى عِشْرِينَ. وَيَبْقَى وَاحِدٌ، نُضِيفُهُ فَنَصِلُ إِلَى وَاحِدٍ وَعِشْرِينَ.",

  lesson91_s4:
    "إِذَنْ نُفَكِّكُ الْعَدَدَ الْمُضَافَ إِلَى جُزْأَيْنِ: جُزْءٌ يُكْمِلُ الْعَشَرَةَ الْمُوَالِيَةَ، وَجُزْءٌ نُضِيفُهُ بَعْدَ ذٰلِكَ.",

  lesson91_s5:
    "لِنُجَرِّبْ مِثَالًا آخَرَ. عِنْدَمَا نَحْسُبُ سِتَّةً وَسَبْعِينَ زَائِدَ تِسْعَةٍ، نُضِيفُ أَرْبَعَةً أَوَّلًا لِنَصِلَ إِلَى ثَمَانِينَ، ثُمَّ نُضِيفُ الْخَمْسَةَ الْبَاقِيَةَ.",

  lesson91_s6:
    "أَحْسَنْتُمْ! لِنَحْسُبَ بِسُهُولَةٍ، نُفَكِّكُ الْعَدَدَ، وَنَصِلُ أَوَّلًا إِلَى الْعَشَرَةِ الْمُوَالِيَةِ، ثُمَّ نُضِيفُ الْبَاقِيَ. هَيَّا نَتَدَرَّبُ!",
} as const;

export const lesson91 = {
  id: "lesson91",
  lessonKey: "lesson91",

  num: 91,

  world_id: "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order: 6,

  title: "الْحِسَابُ بِتَمَعُّنٍ (3)",

  title_fr: "Calcul réfléchi (3)",

  teacher: "taline",

  voice: "ar-DZ-AminaNeural",

  audio_base:
    "/audio/teachers/taline/lesson_91_mental_calculation_3",

  exercisePath:
    "/lesson-v2/91/exercises",

  nextLessonKey:
    "lesson92",

  objectives: [
    "الْحِسَابُ الذِّهْنِيُّ بِالِارْتِكَازِ عَلَى الْعَشَرَاتِ",
    "تَفْكِيكُ الْعَدَدِ الْمُضَافِ",
    "إِكْمَالُ الْعَشَرَةِ الْمُوَالِيَةِ",
    "إِضَافَةُ الْبَاقِي بَعْدَ الْوُصُولِ إِلَى الْعَشَرَةِ",
  ],

  slides: [
    {
      key: "lesson91_s1",
      audio_key: "lesson91_s1",
      title: "الْحِسَابُ بِتَمَعُّنٍ (3)",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s1.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s1.webp",
      text: lesson91CanonicalText.lesson91_s1,
    },

    {
      key: "lesson91_s2",
      audio_key: "lesson91_s2",
      title: "أَصِلُ إِلَى الْعَشَرَةِ الْمُوَالِيَةِ",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s2.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s2.webp",
      text: lesson91CanonicalText.lesson91_s2,
    },

    {
      key: "lesson91_s3",
      audio_key: "lesson91_s3",
      title: "أُضِيفُ الْبَاقِيَ",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s3.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s3.webp",
      text: lesson91CanonicalText.lesson91_s3,
    },

    {
      key: "lesson91_s4",
      audio_key: "lesson91_s4",
      title: "قَاعِدَةُ التَّفْكِيكِ",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s4.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s4.webp",
      text: lesson91CanonicalText.lesson91_s4,
    },

    {
      key: "lesson91_s5",
      audio_key: "lesson91_s5",
      title: "أُطَبِّقُ عَلَى مِثَالٍ آخَرَ",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s5.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s5.webp",
      text: lesson91CanonicalText.lesson91_s5,
    },

    {
      key: "lesson91_s6",
      audio_key: "lesson91_s6",
      title: "أَحْسَنْتُمْ",
      image:
        "/lessons/v2/lesson91-mental-calculation-3/s6.webp",
      scene_image:
        "/lessons/v2/lesson91-mental-calculation-3/s6.webp",
      text: lesson91CanonicalText.lesson91_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;

export const LESSON_91_CONTENT = lesson91;

export default lesson91;
