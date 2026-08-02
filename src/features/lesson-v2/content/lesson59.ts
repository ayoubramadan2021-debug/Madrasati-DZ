export const lesson59CanonicalText = {
  lesson59_s1: "مَرْحَبًا يَا أَصْدِقَائِي! نُنَظِّمُ أَحْدَاثَ يَوْمِنَا حَسَبَ الْوَقْتِ: السَّابِعَةُ صَبَاحًا، وَالثَّانِيَةُ عَشْرَةَ ظُهْرًا، وَالْخَامِسَةُ مَسَاءً، وَالثَّامِنَةُ لَيْلًا.",
  lesson59_s2: "عِنْدَ السَّاعَةِ السَّابِعَةِ صَبَاحًا نَسْتَيْقِظُ وَنَتَنَاوَلُ وَجْبَةَ الْفُطُورِ لِنَبْدَأَ يَوْمَنَا.",
  lesson59_s3: "عِنْدَ السَّاعَةِ الثَّانِيَةِ عَشْرَةَ ظُهْرًا نَتَنَاوَلُ وَجْبَةَ الْغَدَاءِ.",
  lesson59_s4: "عِنْدَ السَّاعَةِ الْخَامِسَةِ مَسَاءً نَتَنَاوَلُ وَجْبَةً خَفِيفَةً، وَنَرْتَاحُ بَعْدَ أَنْشِطَةِ النَّهَارِ.",
  lesson59_s5: "عِنْدَ السَّاعَةِ الثَّامِنَةِ لَيْلًا نَتَنَاوَلُ وَجْبَةَ الْعَشَاءِ، ثُمَّ نَسْتَعِدُّ لِلنَّوْمِ.",
  lesson59_s6: "أَحْسَنْتُمْ! نُرَتِّبُ أَوْقَاتَ يَوْمِنَا: الْفُطُورُ صَبَاحًا، وَالْغَدَاءُ ظُهْرًا، وَالْوَجْبَةُ الْخَفِيفَةُ مَسَاءً، وَالْعَشَاءُ لَيْلًا.",
} as const;

export const lesson59 = {
  id: "lesson59",
  lessonKey: "lesson59",
  lessonNumber: 59,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 7,

  title: "أَتَعَلَّمُ أَوْقَاتًا فِي الْيَوْمِ",
  title_fr: "J’apprends les moments de la journée",

  teacher: "taline",
  voice: "ar-DZ-AminaNeural",

  audio_base: "/audio/teachers/taline/lesson_59_times_of_day",

  nextLessonKey: "lesson60",
  exercisePath: "/lesson-v2/59/exercises",

  objectives: [
    "أَنْ يُمَيِّزَ الْمُتَعَلِّمُ أَوْقَاتَ الْيَوْمِ.",
    "أَنْ يَرْبِطَ النَّشَاطَ بِوَقْتِهِ.",
    "أَنْ يُرَتِّبَ أَحْدَاثًا يَوْمِيَّةً.",
    "أَنْ يَسْتَعْمِلَ مُفْرَدَاتِ الصَّبَاحِ وَالظُّهْرِ وَالْمَسَاءِ وَاللَّيْلِ.",
  ],

  slides: [
    {
      key: "lesson59_s1",
      audio_key: "lesson59_s1",
      title: "أَوْقَاتُ يَوْمِنَا",
      image: "/lessons/v2/lesson59/s1.webp",
      scene_image: "/lessons/v2/lesson59/s1.webp",
      text: lesson59CanonicalText.lesson59_s1,
    },
    {
      key: "lesson59_s2",
      audio_key: "lesson59_s2",
      title: "فِي الصَّبَاحِ",
      image: "/lessons/v2/lesson59/s2.webp",
      scene_image: "/lessons/v2/lesson59/s2.webp",
      text: lesson59CanonicalText.lesson59_s2,
    },
    {
      key: "lesson59_s3",
      audio_key: "lesson59_s3",
      title: "عِنْدَ الظُّهْرِ",
      image: "/lessons/v2/lesson59/s3.webp",
      scene_image: "/lessons/v2/lesson59/s3.webp",
      text: lesson59CanonicalText.lesson59_s3,
    },
    {
      key: "lesson59_s4",
      audio_key: "lesson59_s4",
      title: "فِي الْمَسَاءِ",
      image: "/lessons/v2/lesson59/s4.webp",
      scene_image: "/lessons/v2/lesson59/s4.webp",
      text: lesson59CanonicalText.lesson59_s4,
    },
    {
      key: "lesson59_s5",
      audio_key: "lesson59_s5",
      title: "فِي اللَّيْلِ",
      image: "/lessons/v2/lesson59/s5.webp",
      scene_image: "/lessons/v2/lesson59/s5.webp",
      text: lesson59CanonicalText.lesson59_s5,
    },
    {
      key: "lesson59_s6",
      audio_key: "lesson59_s6",
      title: "أُرَتِّبُ أَحْدَاثَ الْيَوْمِ",
      image: "/lessons/v2/lesson59/s6.webp",
      scene_image: "/lessons/v2/lesson59/s6.webp",
      text: lesson59CanonicalText.lesson59_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
