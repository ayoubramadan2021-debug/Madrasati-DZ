export const lesson60CanonicalText = {
  lesson60_s1: "مَرْحَبًا يَا أَصْدِقَائِي! تَكُونُ الْعَنَاصِرُ عَلَى اسْتِقَامَةٍ وَاحِدَةٍ عِنْدَمَا تَقَعُ كُلُّهَا عَلَى خَطٍّ مُسْتَقِيمٍ وَاحِدٍ.",
  lesson60_s2: "نَسْتَعْمِلُ خَيْطًا مَشْدُودًا، وَنَضَعُ الْأَقْمَاعَ عَلَى امْتِدَادِهِ. إِذَا لَامَسَتْ جَمِيعُهَا الْخَيْطَ فَهِيَ عَلَى اسْتِقَامَةٍ وَاحِدَةٍ.",
  lesson60_s3: "الْأَقْرَاصُ الزَّرْقَاءُ وَالْقُرْصُ الْأَخْضَرُ عَلَى خَطٍّ وَاحِدٍ، أَمَّا الْقُرْصُ الْأَحْمَرُ فَهُوَ خَارِجُ الِاسْتِقَامَةِ.",
  lesson60_s4: "فِي اللَّوْحَةِ الْأُولَى تَقِفُ الطُّيُورُ عَلَى غُصْنٍ وَاحِدٍ، فَهِيَ عَلَى اسْتِقَامَةٍ. وَفِي اللَّوْحَةِ الثَّانِيَةِ تَقِفُ عَلَى مُسْتَوَيَاتٍ مُخْتَلِفَةٍ.",
  lesson60_s5: "تَقَعُ بَعْضُ النِّقَاطِ عَلَى الْخَطِّ الْأَخْضَرِ الْمَائِلِ، بَيْنَمَا تَبْقَى نِقَاطٌ أُخْرَى خَارِجَ الِاسْتِقَامَةِ.",
  lesson60_s6: "أَحْسَنْتُمْ! الْأَقْمَاعُ الْمُرَتَّبَةُ عَلَى خَطٍّ وَاحِدٍ مُسْتَقِيمَةٌ، وَالْقُرْصُ الْبَعِيدُ عَنِ الْخَطِّ لَيْسَ عَلَى اسْتِقَامَةٍ.",
} as const;

export const lesson60 = {
  id: "lesson60",
  lessonKey: "lesson60",
  lessonNumber: 60,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 8,

  title: "الِاسْتِقَامِيَّةُ",
  title_fr: "L’alignement",

  teacher: "khalil",
  voice: "ar-DZ-IsmaelNeural",

  audio_base: "/audio/teachers/khalil/lesson_60_alignment",

  nextLessonKey: "lesson61",
  exercisePath: "/lesson-v2/60/exercises",

  objectives: [
    "أَنْ يَتَعَرَّفَ الْمُتَعَلِّمُ إِلَى الْعَنَاصِرِ الْمُسْتَقِيمَةِ.",
    "أَنْ يُمَيِّزَ بَيْنَ نِقَاطٍ عَلَى اسْتِقَامَةٍ وَنِقَاطٍ غَيْرِ مُسْتَقِيمَةٍ.",
    "أَنْ يَسْتَعْمِلَ الْمِسْطَرَةَ لِلْتَّحَقُّقِ.",
    "أَنْ يُكْمِلَ صَفًّا مُسْتَقِيمًا.",
  ],

  slides: [
    {
      key: "lesson60_s1",
      audio_key: "lesson60_s1",
      title: "أَكْتَشِفُ الِاسْتِقَامِيَّةَ",
      image: "/lessons/v2/lesson60-alignment/s1.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s1.webp",
      text: lesson60CanonicalText.lesson60_s1,
    },
    {
      key: "lesson60_s2",
      audio_key: "lesson60_s2",
      title: "صَفٌّ مُسْتَقِيمٌ",
      image: "/lessons/v2/lesson60-alignment/s2.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s2.webp",
      text: lesson60CanonicalText.lesson60_s2,
    },
    {
      key: "lesson60_s3",
      audio_key: "lesson60_s3",
      title: "عَنَاصِرُ غَيْرُ مُسْتَقِيمَةٍ",
      image: "/lessons/v2/lesson60-alignment/s3.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s3.webp",
      text: lesson60CanonicalText.lesson60_s3,
    },
    {
      key: "lesson60_s4",
      audio_key: "lesson60_s4",
      title: "أَتَحَقَّقُ بِالْمِسْطَرَةِ",
      image: "/lessons/v2/lesson60-alignment/s4.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s4.webp",
      text: lesson60CanonicalText.lesson60_s4,
    },
    {
      key: "lesson60_s5",
      audio_key: "lesson60_s5",
      title: "أُكْمِلُ الِاسْتِقَامَةَ",
      image: "/lessons/v2/lesson60-alignment/s5.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s5.webp",
      text: lesson60CanonicalText.lesson60_s5,
    },
    {
      key: "lesson60_s6",
      audio_key: "lesson60_s6",
      title: "أُرَاجِعُ الِاسْتِقَامِيَّةَ",
      image: "/lessons/v2/lesson60-alignment/s6.webp",
      scene_image: "/lessons/v2/lesson60-alignment/s6.webp",
      text: lesson60CanonicalText.lesson60_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
