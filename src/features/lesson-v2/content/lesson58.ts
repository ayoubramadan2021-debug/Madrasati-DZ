export const lesson58CanonicalText = {
  lesson58_s1: "مَرْحَبًا يَا أَصْدِقَائِي! تَخْتَلِفُ الْحَيَوَانَاتُ فِي غِذَائِهَا وَطَرِيقَةِ تَكَاثُرِهَا. سَنُصَنِّفُهَا إِلَى مَجْمُوعَاتٍ.",
  lesson58_s2: "الْحِصَانُ وَالْبَقَرَةُ وَالْأَرْنَبُ حَيَوَانَاتٌ عَاشِبَةٌ، لِأَنَّهَا تَتَغَذَّى عَلَى الْأَعْشَابِ وَالنَّبَاتَاتِ.",
  lesson58_s3: "الْأَسَدُ وَالنَّمِرُ حَيَوَانَانِ لَاحِمَانِ، لِأَنَّهُمَا يَتَغَذَّيَانِ عَلَى اللُّحُومِ.",
  lesson58_s4: "تَضَعُ الدَّجَاجَةُ الْبَيْضَ، ثُمَّ يَفْقِسُ الْبَيْضُ وَتَخْرُجُ مِنْهُ الْكَتَاكِيتُ. الدَّجَاجَةُ حَيَوَانٌ بَيُوضٌ.",
  lesson58_s5: "نُصَنِّفُ الْحَيَوَانَاتِ حَسَبَ التَّكَاثُرِ. فَمِنْهَا حَيَوَانَاتٌ تَضَعُ الْبَيْضَ، وَمِنْهَا حَيَوَانَاتٌ تَلِدُ صِغَارَهَا.",
  lesson58_s6: "أَحْسَنْتُمْ! صَنَّفْنَا الْحَيَوَانَاتِ إِلَى عَاشِبَةٍ وَلَاحِمَةٍ، وَإِلَى حَيَوَانَاتٍ بَيُوضَةٍ وَحَيَوَانَاتٍ وَلُودَةٍ.",
} as const;

export const lesson58 = {
  id: "lesson58",
  lessonKey: "lesson58",
  lessonNumber: 58,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 6,

  title: "حَيَوَانَاتٌ تَعِيشُ مَعَنَا (2)",
  title_fr: "Les animaux qui vivent avec nous (2)",

  teacher: "khalil",
  voice: "ar-DZ-IsmaelNeural",

  audio_base: "/audio/teachers/khalil/lesson_58_animals_with_us_2",

  nextLessonKey: "lesson59",
  exercisePath: "/lesson-v2/58/exercises",

  objectives: [
    "أَنْ يُصَنِّفَ الْمُتَعَلِّمُ الْحَيَوَانَاتِ حَسَبَ وَسَطِ عَيْشِهَا.",
    "أَنْ يُمَيِّزَ طَرَائِقَ تَنَقُّلِ الْحَيَوَانَاتِ.",
    "أَنْ يَرْبِطَ الْحَيَوَانَ بِغِذَائِهِ.",
    "أَنْ يُحَافِظَ عَلَى التَّنَوُّعِ الْحَيَوِيِّ.",
  ],

  slides: [
    {
      key: "lesson58_s1",
      audio_key: "lesson58_s1",
      title: "تَنَوُّعُ الْحَيَوَانَاتِ",
      image: "/lessons/v2/lesson58/s1.webp",
      scene_image: "/lessons/v2/lesson58/s1.webp",
      text: lesson58CanonicalText.lesson58_s1,
    },
    {
      key: "lesson58_s2",
      audio_key: "lesson58_s2",
      title: "حَيَوَانَاتُ الْيَابِسَةِ",
      image: "/lessons/v2/lesson58/s2.webp",
      scene_image: "/lessons/v2/lesson58/s2.webp",
      text: lesson58CanonicalText.lesson58_s2,
    },
    {
      key: "lesson58_s3",
      audio_key: "lesson58_s3",
      title: "حَيَوَانَاتُ الْمَاءِ",
      image: "/lessons/v2/lesson58/s3.webp",
      scene_image: "/lessons/v2/lesson58/s3.webp",
      text: lesson58CanonicalText.lesson58_s3,
    },
    {
      key: "lesson58_s4",
      audio_key: "lesson58_s4",
      title: "حَيَوَانَاتٌ تَطِيرُ",
      image: "/lessons/v2/lesson58/s4.webp",
      scene_image: "/lessons/v2/lesson58/s4.webp",
      text: lesson58CanonicalText.lesson58_s4,
    },
    {
      key: "lesson58_s5",
      audio_key: "lesson58_s5",
      title: "أُصَنِّفُ الْحَيَوَانَاتِ",
      image: "/lessons/v2/lesson58/s5.webp",
      scene_image: "/lessons/v2/lesson58/s5.webp",
      text: lesson58CanonicalText.lesson58_s5,
    },
    {
      key: "lesson58_s6",
      audio_key: "lesson58_s6",
      title: "أَحْمِي الْحَيَوَانَاتِ",
      image: "/lessons/v2/lesson58/s6.webp",
      scene_image: "/lessons/v2/lesson58/s6.webp",
      text: lesson58CanonicalText.lesson58_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
