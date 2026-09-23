const arabicLesson16 = {
  id: 16,
  lesson: 16,
  world_lesson: 5,
  title: "أدواتي المدرسية ",
  title_fr: "Mes outils scolaires",
  subject: "اللغة العربية",
  subjectId: "arabic",
  grade: 1,
  world: "مدرستي",
  teacher: "taline-khalil",
  voice: "taline",
  audio_base: "/audio/v2/arabic/lesson16",
  exercisePath: "/lesson-v2/arabic/lesson16/exercises",
  objectives: [
    "ألحظ حرف التاء في كلمات أدواتي المدرسية.",
    "ألحظ حرف الدال في كلمات أدواتي المدرسية.",
    "أقرأ: كتاب، دفتر، مبراة، منضدة، مدرسة.",
    "أستعمل كلمتي عندي ولي في التعبير.",
    "أحافظ على أدواتي المدرسية من الأدب."
  ],
  slides: [
    {
      scene: 1,
      scene_image: "/lessons/v2/arabic/lesson16/s1.webp",
      audio_key: "lesson16_s1",
      speaker: "taline",
      text: "أَهْلًا وَسَهْلًا بِكُمْ فِي صَفِّنَا الْجَمِيلِ! الْيَوْمَ سَنَتَعَرَّفُ عَلَى أَدَوَاتِنَا الْمَدَرَسِيَّةِ، وَعَلَى حَرْفَيِ التَّاءِ وَالدَّالِ.",
      semanticHighlights: [
        { text: "أَدَوَاتِنَا", color: "blue", role: "important" },
        { text: "الْمَدَرَسِيَّةِ", color: "blue", role: "important" },
        { text: "التَّاءِ", color: "blue", role: "important" },
        { text: "الدَّالِ", color: "blue", role: "important" },
      ]
    },
    {
      scene: 2,
      scene_image: "/lessons/v2/arabic/lesson16/s2.webp",
      audio_key: "lesson16_s2",
      speaker: "taline",
      text: "أَخْرِجُوا أَدَوَاتَكُمْ يَا أَوْلَادِي! يُخْرِجُ فَاضِلٌ كِتَابَهُ الْجَمِيلَ، وَتُخْرِجُ رَحْمَةُ دَفْتَرَهَا النَّظِيفَ، وَسِيرِينُ تُخْرِجُ مِبْرَاتَهَا الصَّغِيرَةَ.",
      semanticHighlights: [
        { text: "أَدَوَاتَكُمْ", color: "blue", role: "important" },
        { text: "فَاضِلٌ", color: "green", role: "character" },
        { text: "كِتَابَهُ", color: "blue", role: "important" },
        { text: "رَحْمَةُ", color: "green", role: "character" },
        { text: "دَفْتَرَهَا", color: "blue", role: "important" },
        { text: "سِيرِينُ", color: "green", role: "character" },
        { text: "مِبْرَاتَهَا", color: "blue", role: "important" },
      ]
    },
    {
      scene: 3,
      targetLetters: ["ت", "د"],
      scene_image: "/lessons/v2/arabic/lesson16/s3.webp",
      audio_key: "lesson16_s3",
      speaker: "taline",
      text: "اُنْظُرُوا إِلَى السَّبُّورَةِ! هَذَا حَرْفُ التَّاءِ وَهَذَا حَرْفُ الدَّالِ. التَّاءُ فِي كِتَابٍ، وَالدَّالُ فِي دَفْتَرٍ.",
      semanticHighlights: [
        { text: "السَّبُّورَةِ", color: "blue", role: "important" },
        { text: "التَّاءِ", color: "red", role: "target" },
        { text: "الدَّالِ", color: "red", role: "target" },
        { text: "التَّاءُ", color: "red", role: "target" },
        { text: "الدَّالُ", color: "red", role: "target" },
        { text: "تَا", color: "red", role: "target" },
        { text: "دَفْ", color: "red", role: "target" },
      ]
    },
    {
      scene: 4,
      targetLetters: ["ت", "د"],
      scene_image: "/lessons/v2/arabic/lesson16/s4.webp",
      audio_key: "lesson16_s4",
      speaker: "taline",
      text: "نَقْرَأُ كَلِمَاتِنَا الْجَمِيلَةَ: تُفَاحَةٌ، مِبْرَاةٌ، تِلْمِيذٌ، دَفْتَرٌ، مَدَرَسَةٌ وَمِنْضَدَةٌ. فِي كُلِّ كَلِمَةٍ حَرْفٌ مِنْ حَرْفَيِنَا.",
      semanticHighlights: [
        { text: "تُ", color: "red", role: "target" },
        { text: "اةٌ", color: "red", role: "target" },
        { text: "تِلْ", color: "red", role: "target" },
        { text: "دَ", color: "red", role: "target" },
        { text: "حَرْفَيِنَا", color: "blue", role: "important" },
      ]
    },
    {
      scene: 5,
      scene_image: "/lessons/v2/arabic/lesson16/s5.webp",
      audio_key: "lesson16_s5",
      speaker: "taline",
      text: "عِنْدِي كُرَاسٌ جَمِيلٌ، وَلِي دَفْتَرٌ نَظِيفٌ. وَلَيْسَ لِي أَقْلَامٌ مُلَوَّنَةٌ.",
      semanticHighlights: [
        { text: "عِنْدِي", color: "blue", role: "important" },
        { text: "كُرَاسٌ", color: "blue", role: "important" },
        { text: "لِي", color: "blue", role: "important" },
        { text: "دَفْتَرٌ", color: "blue", role: "important" },
        { text: "أَقْلَامٌ", color: "blue", role: "important" },
      ]
    },
    {
      scene: 6,
      scene_image: "/lessons/v2/arabic/lesson16/s6.webp",
      audio_key: "lesson16_s6",
      speaker: "khalil",
      text: "وَلَا تَنْسَوْا يَا أَوْلَادِي! حَافِظُوا عَلَى أَدَوَاتِكُمْ الْمَدَرَسِيَّةِ. وَالْأَدَبُ أَنْ نُحَافِظَ عَلَى أَدَوَاتِنَا.",
      semanticHighlights: [
        { text: "أَدَوَاتِكُمْ", color: "blue", role: "important" },
        { text: "الْمَدَرَسِيَّةِ", color: "blue", role: "important" },
        { text: "الْأَدَبُ", color: "blue", role: "important" },
        { text: "أَدَوَاتِنَا", color: "blue", role: "important" },
      ]
    },
    {
      scene: 7,
      scene_image: "/lessons/v2/arabic/lesson16/s7.webp",
      audio_key: "lesson16_s7",
      speaker: "taline",
      text: "تَعَلَّمْنَا الْيَوْمَ حُرُوفَنَا: التَّاءَ وَالدَّالَ، وَكَلِمَاتٍ جَمِيلَةً عَنْ أَدَوَاتِنَا. هَيَّا نَتَعَلَّمُ مِنَ النَّشَاطَاتِ!",
      semanticHighlights: [
        { text: "حُرُوفَنَا", color: "blue", role: "important" },
        { text: "التَّاءَ", color: "red", role: "target" },
        { text: "الدَّالَ", color: "red", role: "target" },
        { text: "أَدَوَاتِنَا", color: "blue", role: "important" },
        { text: "النَّشَاطَاتِ", color: "blue", role: "important" },
      ],
      is_closing: true,
      cta_text: "ابدأ النشاطات"
    },
  ]
};

export default arabicLesson16;
