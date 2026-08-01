export const lesson47CanonicalText = {
  s1_intro:
    "مَرْحَبًا أَحِبَّائِي! اليَوْمَ سَنَتَعَلَّمُ كَيْفَ نَتَنَقَّلُ عَلَى مَرْصُوفَةٍ، خَانَةً بَعْدَ خَانَةٍ، حَتَّى نَصِلَ إِلَى الهَدَفِ.",

  s2_right_left:
    "عِنْدَمَا نَتَحَرَّكُ فِي السَّطْرِ، نَذْهَبُ يَمِينًا أَوْ يَسَارًا. كُلُّ سَهْمٍ يَنْقُلُنَا خَانَةً وَاحِدَةً.",

  s3_up_down:
    "عِنْدَمَا نَتَحَرَّكُ فِي العَمُودِ، نَصْعَدُ إِلَى الأَعْلَى أَوْ نَنْزِلُ إِلَى الأَسْفَلِ، خَانَةً وَاحِدَةً فِي كُلِّ مَرَّةٍ.",

  s4_follow_arrows:
    "نَبْدَأُ مِنَ النُّقْطَةِ الحَمْرَاءِ، وَنَتَّبِعُ الأَسْهُمَ بِالتَّرْتِيبِ. لَا نَقْفِزُ خَانَةً، وَلَا نَتَحَرَّكُ بِشَكْلٍ مَائِلٍ.",

  s5_encode_route:
    "لِنُمَثِّلَ المَسْلَكَ، نَنْظُرُ إِلَى كُلِّ خُطْوَةٍ، ثُمَّ نَضَعُ سَهْمًا يُبَيِّنُ اتِّجَاهَهَا: يَمِينًا، يَسَارًا، إِلَى الأَعْلَى، أَوْ إِلَى الأَسْفَلِ.",

  s6_closing:
    "أَحْسَنْتُمْ! نَسْتَطِيعُ الآنَ قِرَاءَةَ مَسْلَكٍ بِالأَسْهُمِ، وَتَمْثِيلَ مَسْلَكٍ آخَرَ، وَالوُصُولَ إِلَى الهَدَفِ بِدِقَّةٍ.",
} as const;

export const lesson47 = {
  id: "lesson47",
  lesson_number: 47,
  title: "التَّنَقُّلُ عَلَى مَرْصُوفَةٍ",
  title_fr: "Se déplacer sur un quadrillage",
  subject: "math",
  teacher: "taline",

  audio_base:
    "/audio/teachers/taline/lesson_47_grid_navigation",

  exercisePath: "/lesson-v2/lesson47/exercises",

  nextLessonKey:
    "lesson48",

  objectives: [
    "تحديد نقطة الانطلاق ونقطة الوصول على المرصوفة.",
    "التنقل يمينًا ويسارًا داخل السطر.",
    "التنقل إلى الأعلى والأسفل داخل العمود.",
    "تنفيذ سلسلة أسهم بالترتيب.",
    "تمثيل مسلك مرسوم باستعمال الأسهم.",
    "جمع العناصر ثم الوصول إلى الهدف.",
  ],

  slides: [
    {
      scene: 1,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s1.webp",
      audio_key: "s1_intro",
      text: lesson47CanonicalText.s1_intro,
    },
    {
      scene: 2,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s2.webp",
      audio_key: "s2_right_left",
      text: lesson47CanonicalText.s2_right_left,
    },
    {
      scene: 3,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s3.webp",
      audio_key: "s3_up_down",
      text: lesson47CanonicalText.s3_up_down,
    },
    {
      scene: 4,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s4.webp",
      audio_key: "s4_follow_arrows",
      text: lesson47CanonicalText.s4_follow_arrows,
    },
    {
      scene: 5,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s5.webp",
      audio_key: "s5_encode_route",
      text: lesson47CanonicalText.s5_encode_route,
    },
    {
      scene: 6,
      scene_image:
        "/lessons/v2/lesson47-grid-navigation/s6.webp",
      audio_key: "s6_closing",
      text: lesson47CanonicalText.s6_closing,
    },
  ],
} as const;

export default lesson47;
