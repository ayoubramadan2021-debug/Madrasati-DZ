export const lesson89CanonicalText = {
  lesson89_s1: "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَلَّمُ كَيْفَ نَحْسُبُ بِذَكَاءٍ، بِاسْتِعْمَالِ طَرِيقَتَيْنِ: تَفْكِيكِ الْعَدَدِ لِنَصِلَ إِلَى عَشَرَةٍ، أَوِ الِارْتِكَازِ عَلَى الْأَضْعَافِ.",
  lesson89_s2: "لِنَحْسُبْ ثَمَانِيَةً زَائِدَ تِسْعَةٍ. نَأْخُذُ اثْنَيْنِ مِنَ التِّسْعَةِ وَنُضِيفُهُمَا إِلَى الثَّمَانِيَةِ، فَنَحْصُلُ عَلَى عَشَرَةٍ، وَيَبْقَى سَبْعَةٌ.",
  lesson89_s3: "وَيُمْكِنُنَا أَيْضًا أَنْ نَسْتَعْمِلَ ضِعْفَ الثَّمَانِيَةِ. ثَمَانِيَةٌ وَثَمَانِيَةٌ تُسَاوِي سِتَّةَ عَشَرَ، ثُمَّ نُضِيفُ وَاحِدًا، فَنَحْصُلُ عَلَى سَبْعَةَ عَشَرَ.",
  lesson89_s4: "رَائِعٌ! سَوَاءٌ أَكْمَلْنَا إِلَى عَشَرَةٍ، أَوِ اسْتَعْمَلْنَا الضِّعْفَ، فَإِنَّ ثَمَانِيَةً زَائِدَ تِسْعَةٍ تُسَاوِي سَبْعَةَ عَشَرَ.",
  lesson89_s5: "لِنَحْسُبْ سِتَّةً زَائِدَ ثَمَانِيَةٍ. نَأْخُذُ أَرْبَعَةً مِنَ الثَّمَانِيَةِ وَنُضِيفُهَا إِلَى السِّتَّةِ، فَنَحْصُلُ عَلَى عَشَرَةٍ، وَيَبْقَى أَرْبَعَةٌ. إِذَنْ، سِتَّةٌ زَائِدَ ثَمَانِيَةٍ تُسَاوِي أَرْبَعَةَ عَشَرَ.",
  lesson89_s6: "أَحْسَنْتُمْ! نَسْتَطِيعُ أَنْ نَحْسُبَ ذِهْنِيًّا بِالِارْتِكَازِ عَلَى الْأَضْعَافِ، أَوْ عَلَى تَفْكِيكَاتِ الْعَشَرَةِ. هَيَّا نَتَدَرَّبُ!",
} as const;

export const lesson89 = {
  id: "lesson89",
  lessonKey: "lesson89",
  num: 89,
  world_id: "b3187e1b-58da-441d-ae43-d4be486e7c12",
  sort_order: 4,
  title: "الْحِسَابُ بِتَمَعُّنٍ (2)",
  title_fr: "Calcul réfléchi (2)",
  teacher: "taline",
  voice: "ar-DZ-AminaNeural",
  audio_base: "/audio/teachers/taline/lesson_89_mental_calculation_2",
  exercisePath: "/lesson-v2/89/exercises",
  nextLessonKey: "lesson90",

  objectives: [
    "أَنْ يَسْتَعْمِلَ الْمُتَعَلِّمُ تَفْكِيكَاتِ الْعَشَرَةِ فِي الْحِسَابِ الذِّهْنِيِّ.",
    "أَنْ يَسْتَعْمِلَ الْمُتَعَلِّمُ الْأَضْعَافَ لِتَسْهِيلِ الْحِسَابِ.",
    "أَنْ يَخْتَارَ الطَّرِيقَةَ الْأَسْهَلَ لِحِسَابِ مَجْمُوعٍ.",
    "أَنْ يُنَمِّيَ سُرْعَتَهُ وَدِقَّتَهُ فِي الْحِسَابِ الذِّهْنِيِّ.",
  ],

  slides: [
    {
      key: "lesson89_s1",
      audio_key: "lesson89_s1",
      title: "أَكْتَشِفُ طَرِيقَتَيْنِ لِلْحِسَابِ",
      image: "/lessons/v2/lesson89-mental-calculation-2/s1.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s1.webp",
      text: lesson89CanonicalText.lesson89_s1,
    },
    {
      key: "lesson89_s2",
      audio_key: "lesson89_s2",
      title: "أُكْمِلُ إِلَى عَشَرَةٍ",
      image: "/lessons/v2/lesson89-mental-calculation-2/s2.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s2.webp",
      text: lesson89CanonicalText.lesson89_s2,
    },
    {
      key: "lesson89_s3",
      audio_key: "lesson89_s3",
      title: "أَسْتَعْمِلُ الضِّعْفَ",
      image: "/lessons/v2/lesson89-mental-calculation-2/s3.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s3.webp",
      text: lesson89CanonicalText.lesson89_s3,
    },
    {
      key: "lesson89_s4",
      audio_key: "lesson89_s4",
      title: "طَرِيقَتَانِ وَنَتِيجَةٌ وَاحِدَةٌ",
      image: "/lessons/v2/lesson89-mental-calculation-2/s4.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s4.webp",
      text: lesson89CanonicalText.lesson89_s4,
    },
    {
      key: "lesson89_s5",
      audio_key: "lesson89_s5",
      title: "أُطَبِّقُ عَلَى أَعْدَادٍ أُخْرَى",
      image: "/lessons/v2/lesson89-mental-calculation-2/s5.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s5.webp",
      text: lesson89CanonicalText.lesson89_s5,
    },
    {
      key: "lesson89_s6",
      audio_key: "lesson89_s6",
      title: "هَيَّا نَتَدَرَّبُ",
      image: "/lessons/v2/lesson89-mental-calculation-2/s6.webp",
      scene_image: "/lessons/v2/lesson89-mental-calculation-2/s6.webp",
      text: lesson89CanonicalText.lesson89_s6,
      is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;

export default lesson89;
