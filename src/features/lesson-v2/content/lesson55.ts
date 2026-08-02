export const lesson55CanonicalText = {
  lesson55_s1: "مَرْحَبًا يَا أَصْدِقَائِي! نُشَاهِدُ فِي الْمَحْمِيَّةِ حَيَوَانَاتٍ أَلِيفَةً وَحَيَوَانَاتٍ بَرِّيَّةً. سَنَتَعَرَّفُ إِلَى كُلِّ مَجْمُوعَةٍ.",
  lesson55_s2: "الْبَقَرَةُ وَالدَّجَاجَةُ وَالْخَرُوفُ حَيَوَانَاتُ مَزْرَعَةٍ. يُوَفِّرُ لَهَا الْإِنْسَانُ الْغِذَاءَ وَالْمَاءَ وَالْمَأْوَى.",
  lesson55_s3: "الْقِطَّةُ وَالْكَلْبُ حَيَوَانَانِ أَلِيفَانِ. يَعِيشَانِ قُرْبَ الْإِنْسَانِ، وَنُقَدِّمُ لَهُمَا الطَّعَامَ وَالْمَاءَ وَمَكَانًا آمِنًا.",
  lesson55_s4: "الزَّرَافَةُ وَالْغَزَالُ وَالْأَسَدُ حَيَوَانَاتٌ بَرِّيَّةٌ تَعِيشُ فِي الطَّبِيعَةِ وَالْمَحْمِيَّاتِ. نُرَاقِبُهَا مِنْ دُونِ إِزْعَاجِهَا.",
  lesson55_s5: "نُصَنِّفُ الْحَيَوَانَاتِ حَسَبَ وَسَطِ عَيْشِهَا: حَيَوَانَاتُ الْمَزْرَعَةِ، وَحَيَوَانَاتُ الْمَاءِ، وَحَيَوَانَاتُ الْغَابَةِ.",
  lesson55_s6: "أَحْسَنْتُمْ! مَيَّزْنَا بَيْنَ الْحَيَوَانَاتِ الْأَلِيفَةِ الَّتِي تَعِيشُ قُرْبَنَا، وَالْحَيَوَانَاتِ الْبَرِّيَّةِ الَّتِي تَعِيشُ فِي الطَّبِيعَةِ.",
} as const;

export const lesson55 = {
  id: "lesson55",
  lessonKey: "lesson55",
  lessonNumber: 55,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 3,

  title: "حَيَوَانَاتٌ تَعِيشُ مَعَنَا (1)",
  title_fr: "Les animaux qui vivent avec nous (1)",

  teacher: "taline",
  voice: "ar-DZ-AminaNeural",

  audio_base: "/audio/teachers/taline/lesson_55_animals_with_us_1",

  nextLessonKey: "lesson56",
  exercisePath: "/lesson-v2/55/exercises",

  objectives: [
    "أَنْ يَتَعَرَّفَ الْمُتَعَلِّمُ إِلَى بَعْضِ الْحَيَوَانَاتِ.",
    "أَنْ يُمَيِّزَ بَيْنَ حَيَوَانَاتِ الْمَزْرَعَةِ وَالْحَيَوَانَاتِ الْبَرِّيَّةِ.",
    "أَنْ يَرْبِطَ الْحَيَوَانَ بِغِذَائِهِ وَمَأْوَاهُ.",
    "أَنْ يَتَبَنَّى سُلُوكًا رَفِيقًا بِالْحَيَوَانِ.",
  ],

  slides: [
    {
      key: "lesson55_s1",
      audio_key: "lesson55_s1",
      title: "حَيَوَانَاتٌ حَوْلَنَا",
      image: "/lessons/v2/lesson55/s1.webp",
      scene_image: "/lessons/v2/lesson55/s1.webp",
      text: lesson55CanonicalText.lesson55_s1,
    },
    {
      key: "lesson55_s2",
      audio_key: "lesson55_s2",
      title: "حَيَوَانَاتُ الْمَزْرَعَةِ",
      image: "/lessons/v2/lesson55/s2.webp",
      scene_image: "/lessons/v2/lesson55/s2.webp",
      text: lesson55CanonicalText.lesson55_s2,
    },
    {
      key: "lesson55_s3",
      audio_key: "lesson55_s3",
      title: "حَيَوَانَاتُ الْمَحْمِيَّةِ",
      image: "/lessons/v2/lesson55/s3.webp",
      scene_image: "/lessons/v2/lesson55/s3.webp",
      text: lesson55CanonicalText.lesson55_s3,
    },
    {
      key: "lesson55_s4",
      audio_key: "lesson55_s4",
      title: "غِذَاءُ الْحَيَوَانَاتِ",
      image: "/lessons/v2/lesson55/s4.webp",
      scene_image: "/lessons/v2/lesson55/s4.webp",
      text: lesson55CanonicalText.lesson55_s4,
    },
    {
      key: "lesson55_s5",
      audio_key: "lesson55_s5",
      title: "مَأْوَى الْحَيَوَانِ",
      image: "/lessons/v2/lesson55/s5.webp",
      scene_image: "/lessons/v2/lesson55/s5.webp",
      text: lesson55CanonicalText.lesson55_s5,
    },
    {
      key: "lesson55_s6",
      audio_key: "lesson55_s6",
      title: "أَرْفُقُ بِالْحَيَوَانِ",
      image: "/lessons/v2/lesson55/s6.webp",
      scene_image: "/lessons/v2/lesson55/s6.webp",
      text: lesson55CanonicalText.lesson55_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
