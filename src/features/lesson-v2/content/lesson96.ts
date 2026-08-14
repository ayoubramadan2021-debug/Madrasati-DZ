export const lesson96CanonicalText = {
  lesson96_s1:
    "مَرْحَبًا يَا أَصْدِقَائِي! سَنَتَعَرَّفُ الْيَوْمَ إِلَى الْحَاسِبَةِ، وَنَكْتَشِفُ أَهَمَّ أَجْزَائِهَا وَأَزْرَارِهَا، وَكَيْفَ نَسْتَعْمِلُهَا بِطَرِيقَةٍ صَحِيحَةٍ.",

  lesson96_s2:
    "تَحْتَوِي الْحَاسِبَةُ عَلَى شَاشَةٍ نَرَى عَلَيْهَا الْأَعْدَادَ وَالنَّتَائِجَ، وَعَلَى أَزْرَارٍ لِلْأَرْقَامِ مِنْ صِفْرٍ إِلَى تِسْعَةٍ.",

  lesson96_s3:
    "وَفِي الْحَاسِبَةِ أَزْرَارٌ لِلْعَمَلِيَّاتِ الْأَرْبَعِ: الْجَمْعِ، وَالطَّرْحِ، وَالضَّرْبِ، وَالْقِسْمَةِ. نَخْتَارُ الْعَمَلِيَّةَ الَّتِي نُرِيدُ إِجْرَاءَهَا.",

  lesson96_s4:
    "لِبَدْءِ اسْتِعْمَالِ الْحَاسِبَةِ نَضْغَطُ عَلَى زِرِّ التَّشْغِيلِ، وَعِنْدَ الِانْتِهَاءِ نَسْتَعْمِلُ زِرَّ إِيقَافِ التَّشْغِيلِ.",

  lesson96_s5:
    "عِنْدَمَا نَضْغَطُ عَلَى زِرِّ عَدَدٍ، يَظْهَرُ عَلَى الشَّاشَةِ. وَإِذَا أَرَدْنَا مَسْحَ مَا أَدْخَلْنَاهُ، نَسْتَعْمِلُ زِرَّ الْمَسْحِ لِنَبْدَأَ مِنْ جَدِيدٍ.",

  lesson96_s6:
    "أَحْسَنْتُمْ! بَعْدَ إِدْخَالِ الْأَعْدَادِ وَاخْتِيَارِ الْعَمَلِيَّةِ، نَسْتَعْمِلُ زِرَّ إِظْهَارِ النَّتِيجَةِ لِنَرَى الْجَوَابَ عَلَى الشَّاشَةِ. هَيَّا نَتَدَرَّبُ!",
} as const;


export const lesson96 = {
  id: "lesson96",

  lessonKey: "lesson96",

  num: 96,

  world_id:
    "b3187e1b-58da-441d-ae43-d4be486e7c12",

  sort_order: 11,

  title:
    "الْحَاسِبَةُ (1)",

  title_fr:
    "La calculatrice (1)",

  teacher:
    "khalil",

  voice:
    "ar-DZ-IsmaelNeural",

  audio_base:
    "/audio/teachers/khalil/lesson_96_calculator_1",

  exercisePath:
    "/lesson-v2/96/exercises",

  nextLessonKey:
    "lesson97",

  objectives: [
    "التَّعَرُّفُ إِلَى الْحَاسِبَةِ وَأَجْزَائِهَا الْأَسَاسِيَّةِ.",
    "التَّعَرُّفُ إِلَى شَاشَةِ الْحَاسِبَةِ وَأَزْرَارِ الْأَرْقَامِ.",
    "التَّعَرُّفُ إِلَى أَزْرَارِ الْعَمَلِيَّاتِ الْحِسَابِيَّةِ الْأَرْبَعِ.",
    "اسْتِعْمَالُ أَزْرَارِ التَّشْغِيلِ وَالْمَسْحِ وَإِظْهَارِ النَّتِيجَةِ.",
  ],

  slides: [
    {
      key: "s1_intro",
      audio_key: "lesson96_s1",

      title:
        "الْحَاسِبَةُ (1)",

      image:
        "/lessons/v2/lesson96-calculator-1/s1.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s1.webp",

      text:
        lesson96CanonicalText.lesson96_s1,
    },

    {
      key: "s2_screen_numbers",
      audio_key: "lesson96_s2",

      title:
        "الشَّاشَةُ وَالْأَرْقَامُ",

      image:
        "/lessons/v2/lesson96-calculator-1/s2.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s2.webp",

      text:
        lesson96CanonicalText.lesson96_s2,
    },

    {
      key: "s3_operations",
      audio_key: "lesson96_s3",

      title:
        "الْعَمَلِيَّاتُ الْأَرْبَعُ",

      image:
        "/lessons/v2/lesson96-calculator-1/s3.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s3.webp",

      text:
        lesson96CanonicalText.lesson96_s3,
    },

    {
      key: "s4_power",
      audio_key: "lesson96_s4",

      title:
        "التَّشْغِيلُ وَالْإِيقَافُ",

      image:
        "/lessons/v2/lesson96-calculator-1/s4.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s4.webp",

      text:
        lesson96CanonicalText.lesson96_s4,
    },

    {
      key: "s5_input_clear",
      audio_key: "lesson96_s5",

      title:
        "إِدْخَالُ الْأَعْدَادِ وَالْمَسْحُ",

      image:
        "/lessons/v2/lesson96-calculator-1/s5.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s5.webp",

      text:
        lesson96CanonicalText.lesson96_s5,
    },

    {
      key: "s6_closing",
      audio_key: "lesson96_s6",

      title:
        "إِظْهَارُ النَّتِيجَةِ",

      image:
        "/lessons/v2/lesson96-calculator-1/s6.webp",

      scene_image:
        "/lessons/v2/lesson96-calculator-1/s6.webp",

      text:
        lesson96CanonicalText.lesson96_s6,

      is_closing: true,

      cta_text:
        "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;


export const LESSON_96_CONTENT =
  lesson96;

export default lesson96;
