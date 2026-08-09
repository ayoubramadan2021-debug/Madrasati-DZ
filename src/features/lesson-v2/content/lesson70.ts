export const lesson70CanonicalText = {
  lesson70_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! فِي عَالَمِ الْمَدِينَةِ الصَّغِيرَةِ نَرَى خُطُوطًا مُسْتَقِيمَةً فِي أَمَاكِنَ كَثِيرَةٍ، مِثْلَ حَوَافِّ الطَّرِيقِ وَإِطَارَاتِ النَّوَافِذِ. هَيَّا نَكْتَشِفُهَا مَعًا.",

  lesson70_s2:
    "نُلَاحِظُ هَذَيْنِ الْخَطَّيْنِ. أَحَدُهُمَا مُسْتَقِيمٌ، وَالْآخَرُ غَيْرُ مُسْتَقِيمٍ. الْخَطُّ الْمُسْتَقِيمُ لَا يَنْحَنِي وَلَا يَتَعَرَّجُ.",

  lesson70_s3:
    "لِرَسْمِ خَطٍّ مُسْتَقِيمٍ بِدِقَّةٍ، نَسْتَعْمِلُ الْمِسْطَرَةَ. نُثَبِّتُهَا جَيِّدًا، ثُمَّ نَمُرُّ بِالْقَلَمِ عَلَى حَافَّتِهَا.",

  lesson70_s4:
    "نَسْتَطِيعُ أَنْ نَسْتَعْمِلَ الْخُطُوطَ الْمُسْتَقِيمَةَ فِي رُسُومٍ كَثِيرَةٍ. نَرْسُمُ بِهَا بَيْتًا، وَسُلَّمًا، وَأَشْكَالًا مُخْتَلِفَةً.",

  lesson70_s5:
    "إِذَا أَرَدْنَا رَبْطَ نُقْطَتَيْنِ بِخَطٍّ مُسْتَقِيمٍ، نَضَعُ الْمِسْطَرَةَ بَيْنَهُمَا، ثُمَّ نَرْسُمُ الْخَطَّ مِنَ النُّقْطَةِ الْأُولَى إِلَى النُّقْطَةِ الثَّانِيَةِ.",

  lesson70_s6:
    "أَحْسَنْتُمْ! تَعَرَّفْنَا إِلَى الْخَطِّ الْمُسْتَقِيمِ، وَمَيَّزْنَاهُ مِنَ الْخَطِّ غَيْرِ الْمُسْتَقِيمِ، وَتَعَلَّمْنَا كَيْفَ نَرْسُمُهُ بِالْمِسْطَرَةِ. هَيَّا نَتَدَرَّبُ!",
} as const;

export const lesson70 = {
  id: "lesson70",
  lessonKey: "lesson70",
  num: 70,

  world_id: "b2c0405e-4559-4813-9a73-82b4f0ab4f4c",
  sort_order: 1,

  title: "الْخُطُوطُ الْمُسْتَقِيمَةُ",
  title_fr: "Les lignes droites",

  teacher: "khalil",
  voice: "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_70_straight_lines",

  exercisePath: "/lesson-v2/70/exercises",

  objectives: [
    "أَنْ يَتَعَرَّفَ الْمُتَعَلِّمُ إِلَى الْخَطِّ الْمُسْتَقِيمِ.",
    "أَنْ يُمَيِّزَ الْخَطَّ الْمُسْتَقِيمَ مِنَ الْخَطِّ غَيْرِ الْمُسْتَقِيمِ.",
    "أَنْ يَسْتَعْمِلَ الْمِسْطَرَةَ لِرَسْمِ خَطٍّ مُسْتَقِيمٍ.",
    "أَنْ يَرْبِطَ بَيْنَ نُقْطَتَيْنِ بِخَطٍّ مُسْتَقِيمٍ.",
  ],

  slides: [
    {
      key: "lesson70_s1",
      audio_key: "lesson70_s1",
      title: "نكتشف الخطوط المستقيمة",
      image: "/lessons/v2/lesson70/s1.webp",
      scene_image: "/lessons/v2/lesson70/s1.webp",
      text: lesson70CanonicalText.lesson70_s1,
    },

    {
      key: "lesson70_s2",
      audio_key: "lesson70_s2",
      title: "مستقيم أم غير مستقيم؟",
      image: "/lessons/v2/lesson70/s2.webp",
      scene_image: "/lessons/v2/lesson70/s2.webp",
      text: lesson70CanonicalText.lesson70_s2,
    },

    {
      key: "lesson70_s3",
      audio_key: "lesson70_s3",
      title: "أستعمل المسطرة",
      image: "/lessons/v2/lesson70/s3.webp",
      scene_image: "/lessons/v2/lesson70/s3.webp",
      text: lesson70CanonicalText.lesson70_s3,
    },

    {
      key: "lesson70_s4",
      audio_key: "lesson70_s4",
      title: "أرسم بخطوط مستقيمة",
      image: "/lessons/v2/lesson70/s4.webp",
      scene_image: "/lessons/v2/lesson70/s4.webp",
      text: lesson70CanonicalText.lesson70_s4,
    },

    {
      key: "lesson70_s5",
      audio_key: "lesson70_s5",
      title: "أربط بين نقطتين",
      image: "/lessons/v2/lesson70/s5.webp",
      scene_image: "/lessons/v2/lesson70/s5.webp",
      text: lesson70CanonicalText.lesson70_s5,
    },

    {
      key: "lesson70_s6",
      audio_key: "lesson70_s6",
      title: "أحسنتم",
      image: "/lessons/v2/lesson70/s6.webp",
      scene_image: "/lessons/v2/lesson70/s6.webp",
      text: lesson70CanonicalText.lesson70_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
