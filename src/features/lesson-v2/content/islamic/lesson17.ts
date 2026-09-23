const islamicLesson17 = {
  id: 17, lesson: 17, world_lesson: 6,
  title: "سورة الناس", title_fr: "Sourate An-Nas",
  subject: "التربية الإسلامية", subjectId: "islamic",
  grade: 1, world: "مدرستي", teacher: "taline-khalil", voice: "mixed",
  audio_base: "/audio/v2/islamic/lesson17", exercisePath: "/lesson-v2/islamic/lesson17/exercises",
  objectives: ["أستمع إلى سورة الناس وأحفظها.", "أفهم أن الله هو رب الناس وملكهم.", "أستعيذ بالله من شر الوسواس."],
  slides: [
    {
      scene: 1, scene_image: "/lessons/v2/islamic/lesson17/s1.webp",
      audio_key: "lesson17_s1", speaker: "taline",
      text: "أَهْلًا بِكُمْ يَا أَطْفَالِي. الْيَوْمَ سَنَتَعَلَّمُ سُورَةَ النَّاسِ.",
      semanticHighlights: [{ text: "أَطْفَالِي", color: "green", role: "character" }, { text: "سُورَةَ", color: "blue", role: "important" }, { text: "النَّاسِ", color: "blue", role: "important" }]
    },
    {
      scene: 2, scene_image: "/lessons/v2/islamic/lesson17/s2.webp",
      audio_key: "lesson17_s2", speaker: "khalil",
      is_quran_card: true,
      quran_title: "سُورَةُ النَّاسِ",
      // ⬅️ إضافة صدق الله العظيم كجزء من النص لتعمل مع الكاريوكي
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ. مَلِكِ النَّاسِ. إِلَٰهِ النَّاسِ. مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ. الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ. صَدَقَ اللَّهُ الْعَظِيمُ.",
      semanticHighlights: [
        { text: "النَّاسِ", color: "blue", role: "important" },
        { text: "الْوَسْوَاسِ", color: "blue", role: "important" },
        { text: "الْخَنَّاسِ", color: "blue", role: "important" },
        { text: "يُوَسْوِسُ", color: "blue", role: "important" },
        { text: "الْجِنَّةِ", color: "blue", role: "important" }
      ]
    },
    {
      scene: 3, scene_image: "/lessons/v2/islamic/lesson17/s3.webp",
      audio_key: "lesson17_s3", speaker: "taline",
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. قُلْ أَعُوذُ بِرَبِّ النَّاسِ.",
      semanticHighlights: [{ text: "أَعُوذُ", color: "blue", role: "important" }, { text: "بِرَبِّ", color: "blue", role: "important" }, { text: "النَّاسِ", color: "blue", role: "important" }]
    },
    {
      scene: 4, scene_image: "/lessons/v2/islamic/lesson17/s4.webp",
      audio_key: "lesson17_s4", speaker: "taline",
      text: "مَلِكِ النَّاسِ. إِلَٰهِ النَّاسِ.",
      semanticHighlights: [{ text: "مَلِكِ", color: "blue", role: "important" }, { text: "إِلَٰهِ", color: "blue", role: "important" }, { text: "النَّاسِ", color: "blue", role: "important" }]
    },
    {
      scene: 5, scene_image: "/lessons/v2/islamic/lesson17/s5.webp",
      audio_key: "lesson17_s5", speaker: "taline",
      text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ.",
      semanticHighlights: [{ text: "شَرِّ", color: "blue", role: "important" }, { text: "الْوَسْوَاسِ", color: "blue", role: "important" }, { text: "الْخَنَّاسِ", color: "blue", role: "important" }]
    },
    {
      scene: 6, scene_image: "/lessons/v2/islamic/lesson17/s6.webp",
      audio_key: "lesson17_s6", speaker: "taline",
      text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ. مِنَ الْجِنَّةِ وَالنَّاسِ.",
      semanticHighlights: [{ text: "يُوَسْوِسُ", color: "blue", role: "important" }, { text: "صُدُورِ", color: "blue", role: "important" }, { text: "الْجِنَّةِ", color: "blue", role: "important" }, { text: "النَّاسِ", color: "blue", role: "important" }]
    },
    {
      scene: 7, scene_image: "/lessons/v2/islamic/lesson17/s7.webp",
      audio_key: "lesson17_s7", speaker: "taline",
      text: "تَعَرَّفْنَا اليَوْمَ عَلَى فَضْلِ سُورَةِ النَّاسِ العَظِيمَةِ. هَيَّا بِنَا نَنْطَلِقُ إِلَى النَّشَاطَاتِ!",
      semanticHighlights: [{ text: "النَّاسِ", color: "blue", role: "important" }, { text: "النَّشَاطَاتِ", color: "green", role: "important" }],
      is_closing: true,
      cta_text: "النَّشَاطَاتِ ←"
    }
  ]
};
export default islamicLesson17;
