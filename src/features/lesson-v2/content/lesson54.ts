export const lesson54CanonicalText = {
  lesson54_s1: "نُمَثِّلُ الْعَدَدَ تِسْعَةً وَعِشْرِينَ بِعَشَرَتَيْنِ وَتِسْعِ وَحَدَاتٍ، وَنُمَثِّلُ الثَّلَاثِينَ بِثَلَاثِ عَشَرَاتٍ.",
  lesson54_s2: "عِنْدَمَا نُضِيفُ وَاحِدًا إِلَى تِسْعَةٍ وَعِشْرِينَ نُكْمِلُ عَشَرَةً جَدِيدَةً. إِذَنْ تِسْعَةٌ وَعِشْرُونَ زَائِدُ وَاحِدٍ تُسَاوِي ثَلَاثِينَ.",
  lesson54_s3: "عِنْدَمَا نَنْزِعُ وَاحِدًا مِنْ ثَلَاثِينَ نَحْصُلُ عَلَى تِسْعَةٍ وَعِشْرِينَ. إِذَنْ ثَلَاثُونَ نَاقِصُ وَاحِدٍ تُسَاوِي تِسْعَةً وَعِشْرِينَ.",
  lesson54_s4: "الْعَدَدُ تِسْعَةَ عَشَرَ يَقَعُ بَيْنَ ثَمَانِيَةَ عَشَرَ وَعِشْرِينَ، وَالْعَدَدُ تِسْعَةٌ وَعِشْرُونَ يَقَعُ بَيْنَ ثَمَانِيَةٍ وَعِشْرِينَ وَثَلَاثِينَ.",
  lesson54_s5: "لِنَحْسِبْ تِسْعَةً زَائِدَ ثَلَاثَةٍ. نَأْخُذُ وَاحِدًا لِنُكَوِّنَ عَشَرَةً، ثُمَّ نُضِيفُ الِاثْنَيْنِ الْبَاقِيَيْنِ. النَّاتِجُ اثْنَا عَشَرَ.",
  lesson54_s6: "أَحْسَنْتُمْ! تِسْعَةٌ وَعِشْرُونَ زَائِدُ وَاحِدٍ تُسَاوِي ثَلَاثِينَ، وَثَلَاثُونَ نَاقِصُ وَاحِدٍ تُسَاوِي تِسْعَةً وَعِشْرِينَ.",
} as const;

export const lesson54 = {
  id: "lesson54",
  lessonKey: "lesson54",
  lessonNumber: 54,

  world_id: "827a3923-94f7-4b33-99e6-2d3c8d957e0c",
  sort_order: 2,

  title: "الْمُرُورُ إِلَى الْعَشَرَةِ",
  title_fr: "Passage à la dizaine",

  teacher: "khalil",
  voice: "ar-DZ-IsmaelNeural",

  audio_base: "/audio/teachers/khalil/lesson_54_passage_to_ten",

  nextLessonKey: "lesson55",
  exercisePath: "/lesson-v2/54/exercises",

  objectives: [
    "أَنْ يُكْمِلَ الْمُتَعَلِّمُ عَدَدًا إِلَى عَشَرَةٍ.",
    "أَنْ يُفَكِّكَ الْعَدَدَ الثَّانِيَ لِتَكْوِينِ عَشَرَةٍ.",
    "أَنْ يَحْسِبَ جَمْعًا يَمُرُّ بِالْعَشَرَةِ.",
    "أَنْ يَشْرَحَ خُطُوَاتِ الْحِسَابِ.",
  ],

  slides: [
    {
      key: "lesson54_s1",
      audio_key: "lesson54_s1",
      title: "أَمُرُّ إِلَى الْعَشَرَةِ",
      image: "/lessons/v2/lesson54/s1.webp",
      scene_image: "/lessons/v2/lesson54/s1.webp",
      text: lesson54CanonicalText.lesson54_s1,
    },
    {
      key: "lesson54_s2",
      audio_key: "lesson54_s2",
      title: "ثَمَانِيَةٌ زَائِدُ اثْنَيْنِ",
      image: "/lessons/v2/lesson54/s2.webp",
      scene_image: "/lessons/v2/lesson54/s2.webp",
      text: lesson54CanonicalText.lesson54_s2,
    },
    {
      key: "lesson54_s3",
      audio_key: "lesson54_s3",
      title: "تِسْعَةٌ زَائِدُ وَاحِدٍ",
      image: "/lessons/v2/lesson54/s3.webp",
      scene_image: "/lessons/v2/lesson54/s3.webp",
      text: lesson54CanonicalText.lesson54_s3,
    },
    {
      key: "lesson54_s4",
      audio_key: "lesson54_s4",
      title: "ثَمَانِيَةٌ زَائِدُ خَمْسَةٍ",
      image: "/lessons/v2/lesson54/s4.webp",
      scene_image: "/lessons/v2/lesson54/s4.webp",
      text: lesson54CanonicalText.lesson54_s4,
    },
    {
      key: "lesson54_s5",
      audio_key: "lesson54_s5",
      title: "تِسْعَةٌ زَائِدُ أَرْبَعَةٍ",
      image: "/lessons/v2/lesson54/s5.webp",
      scene_image: "/lessons/v2/lesson54/s5.webp",
      text: lesson54CanonicalText.lesson54_s5,
    },
    {
      key: "lesson54_s6",
      audio_key: "lesson54_s6",
      title: "أَحْسِبُ بِسُهُولَةٍ",
      image: "/lessons/v2/lesson54/s6.webp",
      scene_image: "/lessons/v2/lesson54/s6.webp",
      text: lesson54CanonicalText.lesson54_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;
