export const lesson61CanonicalText = {
  lesson61_s1: "مَرْحَبًا يَا أَصْدِقَائِي! نَجِدُ النَّبَاتَاتِ فِي الْحَدِيقَةِ وَالْغَابَةِ وَأَوْسَاطٍ طَبِيعِيَّةٍ أُخْرَى.",
  lesson61_s2: "فِي الْحَدِيقَةِ تَنْمُو الْأَزْهَارُ وَالنَّبَاتَاتُ الْمَغْرُوسَةُ. نَسْقِيهَا بِالْمَاءِ وَنَعْتَنِي بِهَا.",
  lesson61_s3: "فِي الْغَابَةِ تَنْمُو أَشْجَارٌ طَوِيلَةٌ وَنَبَاتَاتٌ كَثِيرَةٌ. تُوَفِّرُ الْغَابَةُ الظِّلَّ وَالْمَأْوَى لِلْكَائِنَاتِ.",
  lesson61_s4: "تَخْتَلِفُ النَّبَاتَاتُ حَسَبَ وَسَطِ عَيْشِهَا. فَمِنْهَا نَبَاتَاتُ الصَّحْرَاءِ، وَنَبَاتَاتُ الْغَابَةِ، وَنَبَاتَاتُ ضِفَافِ الْمَاءِ.",
  lesson61_s5: "نُصَنِّفُ النَّبَاتَاتِ حَسَبَ شَكْلِهَا وَحَجْمِهَا إِلَى أَشْجَارٍ طَوِيلَةٍ، وَشُجَيْرَاتٍ، وَأَعْشَابٍ صَغِيرَةٍ.",
  lesson61_s6: "أَحْسَنْتُمْ! تَعَرَّفْنَا إِلَى نَبَاتَاتِ الْحَدِيقَةِ وَالْغَابَةِ وَالصَّحْرَاءِ وَضِفَافِ الْمَاءِ، وَصَنَّفْنَاهَا حَسَبَ شَكْلِهَا.",
} as const;

export const lesson61 = {
  id: "lesson61",
  lessonKey: "lesson61",
  lessonNumber: 61,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 9,

  title: "نَبَاتَاتٌ تَعِيشُ مَعَنَا (1)",
  title_fr: "Les plantes qui vivent avec nous (1)",

  teacher: "taline",
  voice: "ar-DZ-AminaNeural",

  audio_base: "/audio/teachers/taline/lesson_61_plants_with_us_1",

  nextLessonKey: "lesson62",
  exercisePath: "/lesson-v2/61/exercises",

  objectives: [
    "أَنْ يَتَعَرَّفَ الْمُتَعَلِّمُ إِلَى بَعْضِ النَّبَاتَاتِ.",
    "أَنْ يُمَيِّزَ بَيْنَ نَبَاتَاتِ الْحَدِيقَةِ وَالْغَابَةِ.",
    "أَنْ يَتَعَرَّفَ إِلَى أَوْسَاطٍ نَبَاتِيَّةٍ مُخْتَلِفَةٍ.",
    "أَنْ يُصَنِّفَ النَّبَاتَاتِ إِلَى أَشْجَارٍ وَشُجَيْرَاتٍ وَأَعْشَابٍ.",
  ],

  slides: [
    {
      key: "lesson61_s1",
      audio_key: "lesson61_s1",
      title: "نَبَاتَاتٌ فِي أَوْسَاطٍ مُخْتَلِفَةٍ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s1.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s1.webp",
      text: lesson61CanonicalText.lesson61_s1,
    },
    {
      key: "lesson61_s2",
      audio_key: "lesson61_s2",
      title: "نَبَاتَاتُ الْحَدِيقَةِ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s2.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s2.webp",
      text: lesson61CanonicalText.lesson61_s2,
    },
    {
      key: "lesson61_s3",
      audio_key: "lesson61_s3",
      title: "نَبَاتَاتُ الْغَابَةِ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s3.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s3.webp",
      text: lesson61CanonicalText.lesson61_s3,
    },
    {
      key: "lesson61_s4",
      audio_key: "lesson61_s4",
      title: "أَوْسَاطٌ نَبَاتِيَّةٌ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s4.webp",
      text: lesson61CanonicalText.lesson61_s4,
    },
    {
      key: "lesson61_s5",
      audio_key: "lesson61_s5",
      title: "أَشْجَارٌ وَشُجَيْرَاتٌ وَأَعْشَابٌ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s5.webp",
      text: lesson61CanonicalText.lesson61_s5,
    },
    {
      key: "lesson61_s6",
      audio_key: "lesson61_s6",
      title: "أَحْمِي النَّبَاتَاتِ",
      image: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
      scene_image: "/lessons/v2/lesson61-plants-with-us-1/s6.webp",
      text: lesson61CanonicalText.lesson61_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
