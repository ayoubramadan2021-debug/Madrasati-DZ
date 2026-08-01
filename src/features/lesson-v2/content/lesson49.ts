export const lesson49CanonicalText = {
  s1_intro:
    "حَانَ وَقْتُ الْغَدَاءِ. شَاهَدَ الْأَطْفَالُ أَغْذِيَةً مُتَنَوِّعَةً. فَمِنْ أَيْنَ تَأْتِي؟",

  s2_animal_origin:
    "الْحَلِيبُ وَالْبَيْضُ وَالسَّمَكُ أَغْذِيَةٌ حَيَوَانِيَّةٌ. نَحْصُلُ عَلَيْهَا مِنَ الْحَيَوَانَاتِ.",

  s3_plant_origin:
    "الْخُبْزُ وَالْفَوَاكِهُ وَالْخُضْرَوَاتُ أَغْذِيَةٌ نَبَاتِيَّةٌ. نَحْصُلُ عَلَيْهَا مِنَ النَّبَاتَاتِ.",

  s4_classify_foods:
    "نُصَنِّفُ الْغِذَاءَ حَسَبَ مَصْدَرِهِ. التُّفَّاحُ نَبَاتِيٌّ، وَالْحَلِيبُ حَيَوَانِيٌّ.",

  s5_healthy_meal:
    "الْوَجْبَةُ الصِّحِّيَّةُ مُتَنَوِّعَةٌ. نَخْتَارُ خُضْرَوَاتٍ وَخُبْزًا وَسَمَكًا وَفَاكِهَةً وَمَاءً.",

  s6_closing:
    "أَحْسَنْتُمْ! عَرَفْنَا أَنَّ لِلْأَغْذِيَةِ مَصْدَرًا نَبَاتِيًّا أَوْ مَصْدَرًا حَيَوَانِيًّا، وَأَنَّ الْوَجْبَةَ الصِّحِّيَّةَ مُتَنَوِّعَةٌ وَمُتَوَازِنَةٌ.",
} as const;

export const lesson49 = {
  id: "lesson49",
  lesson_number: 49,

  title:
    "مَصَادِرُ الْأَغْذِيَةِ وَالْوَجْبَةُ الصِّحِّيَّةُ",

  title_fr:
    "L’origine des aliments et le repas équilibré",

  subject: "science",
  teacher: "taline",

  audio_base:
    "/audio/teachers/taline/lesson_49_food_sources",

  exercisePath:
    "/lesson-v2/49/exercises",

  nextLessonKey:
    "lesson50",

  objectives: [
    "التمييز بين الأغذية ذات المصدر النباتي والأغذية ذات المصدر الحيواني.",
    "ربط بعض الأغذية بمصادرها.",
    "تصنيف الأغذية حسب مصدرها.",
    "اختيار وجبة صحية ومتنوعة ومتوازنة.",
    "التقليل من الحلويات والمشروبات السكرية.",
  ],

  slides: [
    {
      scene: 1,
      key: "s1_intro",
      audio_key: "s1_intro",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s1.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s1.webp",

      text:
        lesson49CanonicalText.s1_intro,
    },

    {
      scene: 2,
      key: "s2_animal_origin",
      audio_key: "s2_animal_origin",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s2.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s2.webp",

      text:
        lesson49CanonicalText.s2_animal_origin,
    },

    {
      scene: 3,
      key: "s3_plant_origin",
      audio_key: "s3_plant_origin",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s3.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s3.webp",

      text:
        lesson49CanonicalText.s3_plant_origin,
    },

    {
      scene: 4,
      key: "s4_classify_foods",
      audio_key: "s4_classify_foods",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s4.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s4.webp",

      text:
        lesson49CanonicalText.s4_classify_foods,
    },

    {
      scene: 5,
      key: "s5_healthy_meal",
      audio_key: "s5_healthy_meal",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s5.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s5.webp",

      text:
        lesson49CanonicalText.s5_healthy_meal,
    },

    {
      scene: 6,
      key: "s6_closing",
      audio_key: "s6_closing",
      speaker: "taline",

      image:
        "/lessons/v2/lesson49-food-sources/s6.webp",

      scene_image:
        "/lessons/v2/lesson49-food-sources/s6.webp",

      text:
        lesson49CanonicalText.s6_closing,

      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبْ",
    },
  ],
} as const;

export default lesson49;
