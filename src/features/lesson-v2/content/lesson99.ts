export const lesson99CanonicalText = {
  lesson99_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! الْيَوْمَ سَنَتَعَرَّفُ إِلَى الْأَعْدَادِ حَتَّى تِسْعَةٍ وَتِسْعِينَ، وَسَنَقْرَؤُهَا وَنَكْتُبُهَا وَنُرَتِّبُهَا بِدِقَّةٍ.",

  lesson99_s2:
    "نَبْدَأُ مِنَ الْعَدَدِ تِسْعَةٍ وَسَبْعِينَ، وَنَتَقَدَّمُ خَمْسَ خُطُوَاتٍ فِي كُلِّ مَرَّةٍ. فَنَصِلُ إِلَى أَرْبَعَةٍ وَثَمَانِينَ، ثُمَّ تِسْعَةٍ وَثَمَانِينَ، ثُمَّ أَرْبَعَةٍ وَتِسْعِينَ، وَأَخِيرًا تِسْعَةٍ وَتِسْعِينَ.",

  lesson99_s3:
    "نَقْرَأُ الْأَعْدَادَ وَنَكْتُبُهَا بِالْأَرْقَامِ وَبِالْحُرُوفِ. فَنَقُولُ: تِسْعَةٌ وَسَبْعُونَ، وَوَاحِدٌ وَثَمَانُونَ، وَسِتَّةٌ وَثَمَانُونَ، وَسَبْعَةٌ وَثَمَانُونَ، وَتِسْعُونَ، وَتِسْعَةٌ وَتِسْعُونَ.",

  lesson99_s4:
    "لِنُمَثِّلِ الْعَدَدَ سِتَّةً وَتِسْعِينَ. فِيهِ تِسْعُ عَشَرَاتٍ وَسِتُّ وَحَدَاتٍ. تِسْعُ عَشَرَاتٍ تُسَاوِي تِسْعِينَ، وَمَعَ سِتِّ وَحَدَاتٍ نَحْصُلُ عَلَى سِتَّةٍ وَتِسْعِينَ.",

  lesson99_s5:
    "يُمْكِنُنَا أَنْ نُفَكِّكَ سِتَّةً وَتِسْعِينَ بِطُرُقٍ مُخْتَلِفَةٍ: إِلَى تِسْعِينَ وَسِتَّةٍ، أَوْ إِلَى ثَمَانِينَ وَسِتَّةَ عَشَرَ، أَوْ إِلَى سَبْعِينَ وَسِتَّةٍ وَعِشْرِينَ. وَفِي كُلِّ حَالَةٍ نَحْصُلُ عَلَى سِتَّةٍ وَتِسْعِينَ.",

  lesson99_s6:
    "أَحْسَنْتُمْ! أَصْبَحْنَا نَقْرَأُ الْأَعْدَادَ إِلَى تِسْعَةٍ وَتِسْعِينَ، وَنَكْتُبُهَا وَنُمَثِّلُهَا بِالْعَشَرَاتِ وَالْوَحَدَاتِ، وَنُفَكِّكُهَا بِطُرُقٍ مُخْتَلِفَةٍ. هَيَّا نَتَدَرَّبُ!",
} as const;


export const lesson99 = {
  id: "lesson99",

  lessonKey: "lesson99",

  num: 99,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order: 14,

  title:
    "الْأَعْدَادُ إِلَى 99 (1)",

  title_fr:
    "Les nombres jusqu'à 99 (1)",

  teacher:
    "taline",

  voice:
    "ar-DZ-AminaNeural",

  audio_base:
    "/audio/teachers/taline/lesson_99_numbers_to_99_1",

  exercisePath:
    "/lesson-v2/99/exercises",

  nextLessonKey:
    "lesson100",

  objectives: [
    "قِرَاءَةُ الْأَعْدَادِ إِلَى 99 وَكِتَابَتُهَا.",
    "التَّقَدُّمُ خَمْسَةً خَمْسَةً انْطِلَاقًا مِنْ عَدَدٍ مُعْطًى.",
    "تَمْثِيلُ الْعَدَدِ بِالْعَشَرَاتِ وَالْوَحَدَاتِ.",
    "تَفْكِيكُ الْعَدَدِ 96 بِطُرُقٍ مُخْتَلِفَةٍ.",
  ],

  slides: [
    {
      key: "s1_intro",
      audio_key: "lesson99_s1",

      title:
        "الْأَعْدَادُ إِلَى 99 (1)",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene01-intro-v2.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene01-intro-v2.webp",

      text:
        lesson99CanonicalText.lesson99_s1,
    },

    {
      key: "s2_count_by_five",
      audio_key: "lesson99_s2",

      title:
        "أَتَقَدَّمُ خَمْسَةً خَمْسَةً",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene02-count-by-five-v2.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene02-count-by-five-v2.webp",

      text:
        lesson99CanonicalText.lesson99_s2,
    },

    {
      key: "s3_read_write_numbers",
      audio_key: "lesson99_s3",

      title:
        "أَقْرَأُ وَأَكْتُبُ الْأَعْدَادَ",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene03-read-write-v3.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene03-read-write-v3.webp",

      text:
        lesson99CanonicalText.lesson99_s3,
    },

    {
      key: "s4_tens_units",
      audio_key: "lesson99_s4",

      title:
        "أُمَثِّلُ الْعَدَدَ 96",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene04-represent-96-v2.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene04-represent-96-v2.webp",

      text:
        lesson99CanonicalText.lesson99_s4,
    },

    {
      key: "s5_decompose_96",
      audio_key: "lesson99_s5",

      title:
        "أُفَكِّكُ الْعَدَدَ 96",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene05-decompose-96-v2.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene05-decompose-96-v2.webp",

      text:
        lesson99CanonicalText.lesson99_s5,
    },

    {
      key: "s6_closing",
      audio_key: "lesson99_s6",

      title:
        "أَحْسَنْتُمْ",

      image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene06-sequence-90-99-v2.webp",

      scene_image:
        "/lessons/v2/lesson99-numbers-to-99-1/scene06-sequence-90-99-v2.webp",

      text:
        lesson99CanonicalText.lesson99_s6,

      is_closing: true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;


export const LESSON_99_CONTENT =
  lesson99;

export default lesson99;
