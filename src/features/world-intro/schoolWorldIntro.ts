export const SCHOOL_WORLD_ID =
  "b0a43712-8b45-428d-bea2-55ff3de52d3a";

export const schoolWorldIntroContent = {
  audio_base: "/audio/world_1_intro_v2",

  slides: [
    {
      scene_image:
        "/scenes/world_1_intro/scene_1_arrival.webp",

      audio_key:
        "school_intro_v2_1",

      text:
        "فِي صَبَاحٍ جَمِيلٍ، يَذْهَبُ فَاضِلٌ وَسِيرِينُ وَرَحْمَةُ إِلَى الْمَدْرَسَةِ لِأَوَّلِ مَرَّةٍ.",
    },

    {
      scene_image:
        "/scenes/world_1_intro/scene_2_courtyard.webp",

      audio_key:
        "school_intro_v2_2",

      text:
        "يَكْتَشِفُونَ سَاحَةَ الْمَدْرَسَةِ الْكَبِيرَةَ، وَيَلْتَقُونَ زُمَلَاءَهُمُ الْجُدُدَ.",
    },

    {
      scene_image:
        "/scenes/world_1_intro/scene_3_meet_teachers.webp",

      audio_key:
        "school_intro_v2_3",

      text:
        "مَرْحَبًا بِكُمْ يَا أَعِزَّائِي، هَذِهِ الْأُسْتَاذَةُ تَالِينُ، وَأَنَا الْأُسْتَاذُ خَلِيلٌ.",
    },

    {
      scene_image:
        "/scenes/world_1_intro/scene_4_sitting.webp",

      audio_key:
        "school_intro_v2_4",

      text:
        "يَجْلِسُونَ فِي أَمَاكِنِهِمْ لِأَوَّلِ مَرَّةٍ، وَيَتَعَرَّفُونَ عَلَى أَدَوَاتِهِمُ الْمَدْرَسِيَّةِ.",
    },

    {
      scene_image:
        "/scenes/world_1_intro/scene_5_question.webp",

      audio_key:
        "school_intro_v2_5_question",

      text:
        "يَا عَزِيزِي، مَاذَا يَفْعَلُ التِّلْمِيذُ الْجَدِيدُ عِنْدَ دُخُولِهِ الْقِسْمَ؟",

      options: [
        {
          id: "a",
          text:
            "يُلْقِي السَّلَامَ عَلَى الْأُسْتَاذِ وَزُمَلَائِهِ.",
          correct: true,
        },

        {
          id: "b",
          text:
            "يَجْلِسُ فِي مَكَانِهِ بِأَدَبٍ.",
          correct: true,
        },

        {
          id: "c",
          text:
            "يَسْتَمِعُ لِمَا تَقُولُهُ الْمُعَلِّمَةُ.",
          correct: true,
        },
      ],

      audio_correct:
        "school_intro_v2_correct",

      audio_retry:
        "school_intro_v2_retry",
    },

    {
      scene_image:
        "/scenes/world_1_intro/scene_6_celebration.webp",

      audio_key:
        "school_intro_v2_6",

      text:
        "رَائِعٌ! أَصْبَحْنَا مُسْتَعِدِّينَ لِبَدْءِ دُرُوسِ عَالَمِ الْمَدْرَسَةِ. هَيَّا نَتَعَلَّمُ وَنَجْمَعُ نُجُومَ النَّجَاحِ!",

      is_closing: true,

      cta_text:
        "ابْدَأِ الْمُغَامَرَةَ",
    },
  ],
} as const;
