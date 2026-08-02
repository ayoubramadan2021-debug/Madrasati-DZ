export const lesson57CanonicalText = {
  lesson57_s1: "مَرْحَبًا يَا أَصْدِقَائِي! عَلَى خَطِّ الْأَعْدَادِ نَتَقَدَّمُ إِلَى الْيَمِينِ عِنْدَ الْجَمْعِ، وَنَرْجِعُ إِلَى الْيَسَارِ عِنْدَ الطَّرْحِ.",
  lesson57_s2: "لِنَحْسِبْ ثَلَاثَةَ عَشَرَ زَائِدَ خَمْسَةٍ. نَنْطَلِقُ مِنْ ثَلَاثَةَ عَشَرَ وَنَتَقَدَّمُ خَمْسَ خُطُوَاتٍ، فَنَصِلُ إِلَى ثَمَانِيَةَ عَشَرَ.",
  lesson57_s3: "لِنَحْسِبْ تِسْعَةً نَاقِصَ سِتَّةٍ. نَنْطَلِقُ مِنْ تِسْعَةٍ وَنَرْجِعُ سِتَّ خُطُوَاتٍ، فَنَصِلُ إِلَى ثَلَاثَةٍ.",
  lesson57_s4: "لِنَحْسِبْ اثْنَيْنِ وَعِشْرِينَ زَائِدَ أَرْبَعَةٍ. نَتَقَدَّمُ أَرْبَعَ خُطُوَاتٍ عَلَى خَطِّ الْأَعْدَادِ، فَنَصِلُ إِلَى سِتَّةٍ وَعِشْرِينَ.",
  lesson57_s5: "لِنَحْسِبْ تِسْعَةً وَعِشْرِينَ نَاقِصَ خَمْسَةٍ. نَرْجِعُ خَمْسَ خُطُوَاتٍ عَلَى خَطِّ الْأَعْدَادِ، فَنَصِلُ إِلَى أَرْبَعَةٍ وَعِشْرِينَ.",
  lesson57_s6: "أَحْسَنْتُمْ! ثَلَاثَةَ عَشَرَ زَائِدُ خَمْسَةٍ تُسَاوِي ثَمَانِيَةَ عَشَرَ، وَتِسْعَةٌ نَاقِصُ سِتَّةٍ تُسَاوِي ثَلَاثَةً.",
} as const;

export const lesson57 = {
  id: "lesson57",
  lessonKey: "lesson57",
  lessonNumber: 57,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 5,

  title: "إِضَافَةُ أَوْ طَرْحُ أَعْدَادٍ صَغِيرَةٍ (1)",
  title_fr: "Ajouter ou retrancher de petits nombres (1)",

  teacher: "taline",
  voice: "ar-DZ-AminaNeural",

  audio_base: "/audio/teachers/taline/lesson_57_add_subtract_small_numbers_1",

  nextLessonKey: "lesson58",
  exercisePath: "/lesson-v2/57/exercises",

  objectives: [
    "أَنْ يُضِيفَ الْمُتَعَلِّمُ عَدَدًا صَغِيرًا.",
    "أَنْ يَطْرَحَ عَدَدًا صَغِيرًا.",
    "أَنْ يَسْتَعْمِلَ خَطَّ الْأَعْدَادِ.",
    "أَنْ يَتَحَقَّقَ مِنْ نَتِيجَةِ الْحِسَابِ.",
  ],

  slides: [
    {
      key: "lesson57_s1",
      audio_key: "lesson57_s1",
      title: "أُضِيفُ وَأَطْرَحُ",
      image: "/lessons/v2/lesson57/s1.webp",
      scene_image: "/lessons/v2/lesson57/s1.webp",
      text: lesson57CanonicalText.lesson57_s1,
    },
    {
      key: "lesson57_s2",
      audio_key: "lesson57_s2",
      title: "أَتَقَدَّمُ عَلَى خَطِّ الْأَعْدَادِ",
      image: "/lessons/v2/lesson57/s2.webp",
      scene_image: "/lessons/v2/lesson57/s2.webp",
      text: lesson57CanonicalText.lesson57_s2,
    },
    {
      key: "lesson57_s3",
      audio_key: "lesson57_s3",
      title: "أَرْجِعُ عَلَى خَطِّ الْأَعْدَادِ",
      image: "/lessons/v2/lesson57/s3.webp",
      scene_image: "/lessons/v2/lesson57/s3.webp",
      text: lesson57CanonicalText.lesson57_s3,
    },
    {
      key: "lesson57_s4",
      audio_key: "lesson57_s4",
      title: "أُضِيفُ عَدَدًا صَغِيرًا",
      image: "/lessons/v2/lesson57/s4.webp",
      scene_image: "/lessons/v2/lesson57/s4.webp",
      text: lesson57CanonicalText.lesson57_s4,
    },
    {
      key: "lesson57_s5",
      audio_key: "lesson57_s5",
      title: "أَطْرَحُ عَدَدًا صَغِيرًا",
      image: "/lessons/v2/lesson57/s5.webp",
      scene_image: "/lessons/v2/lesson57/s5.webp",
      text: lesson57CanonicalText.lesson57_s5,
    },
    {
      key: "lesson57_s6",
      audio_key: "lesson57_s6",
      title: "أَتَحَقَّقُ مِنَ النَّتِيجَةِ",
      image: "/lessons/v2/lesson57/s6.webp",
      scene_image: "/lessons/v2/lesson57/s6.webp",
      text: lesson57CanonicalText.lesson57_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
