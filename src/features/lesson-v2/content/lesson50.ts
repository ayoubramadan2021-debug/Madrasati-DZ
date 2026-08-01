export const lesson50CanonicalText = {
  lesson50_s1: "مَرْحَبًا أَحِبَّائِي! فِي مَدِينَةِ الْأَلْعَابِ، سَنُجَنِّدُ مَعَارِفَنَا فِي مَحَطَّاتٍ مُتَنَوِّعَةٍ.",
  lesson50_s2: "نَتَّبِعُ الْأَسْهُمَ عَلَى الْمَرْصُوفَةِ حَتَّى نَصِلَ إِلَى الْفَاكِهَةِ.",
  lesson50_s3: "خَمْسُونَ تُسَاوِي ضِعْفَ خَمْسَةٍ وَعِشْرِينَ. وَخَمْسَةٌ وَعِشْرُونَ تُسَاوِي نِصْفَ خَمْسِينَ.",
  lesson50_s4: "نَعُدُّ الْأَطْفَالَ فِي قَاعَةِ الرِّيَاضَةِ بِدِقَّةٍ.",
  lesson50_s5: "نُحَدِّدُ الْفَائِزَ، ثُمَّ نَعْرِفُ مَرْتَبَةَ كُلِّ مُتَسَابِقٍ.",
  lesson50_s6: "بَعْدَ الْجَرْيِ يَتَسَارَعُ التَّنَفُّسُ وَيَنْبِضُ الْقَلْبُ بِسُرْعَةٍ. أَحْسَنْتُمْ!",
} as const;

export const lesson50 = {
  id: "lesson50",
  lesson_number: 50,

  title:
    "أُجَنِّدُ مَعَارِفِي فِي الْأَلْعَابِ الْمَدْرَسِيَّةِ",

  title_fr:
    "Je mobilise mes acquis dans les jeux scolaires",

  subject: "math",
  teacher: "khalil",

  audio_base:
    "/audio/teachers/khalil/lesson_50_games_review",

  exercisePath:
    "/lesson-v2/50/exercises",

  nextLessonKey:
    "lesson51",

  objectives: [
    "اتباع مسار مرسوم باستعمال الأسهم والاتجاهات.",
    "تمييز الضعف والنصف في وضعية بسيطة.",
    "عد عناصر مجموعة بدقة.",
    "تحديد الفائز وترتيب المتسابقين.",
    "ملاحظة تغير التنفس ونبض القلب بعد الجهد.",
    "تجنيد المعارف السابقة في وضعيات متنوعة.",
  ],

  slides: [
    {
      scene: 1,
      key: "lesson50_s1",
      audio_key: "lesson50_s1",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s1.webp",
      scene_image: "/lessons/v2/lesson50/s1.webp",
      text: lesson50CanonicalText.lesson50_s1,
    },
    {
      scene: 2,
      key: "lesson50_s2",
      audio_key: "lesson50_s2",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s2.webp",
      scene_image: "/lessons/v2/lesson50/s2.webp",
      text: lesson50CanonicalText.lesson50_s2,
    },
    {
      scene: 3,
      key: "lesson50_s3",
      audio_key: "lesson50_s3",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s3.webp",
      scene_image: "/lessons/v2/lesson50/s3.webp",
      text: lesson50CanonicalText.lesson50_s3,
    },
    {
      scene: 4,
      key: "lesson50_s4",
      audio_key: "lesson50_s4",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s4.webp",
      scene_image: "/lessons/v2/lesson50/s4.webp",
      text: lesson50CanonicalText.lesson50_s4,
    },
    {
      scene: 5,
      key: "lesson50_s5",
      audio_key: "lesson50_s5",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s5.webp",
      scene_image: "/lessons/v2/lesson50/s5.webp",
      text: lesson50CanonicalText.lesson50_s5,
    },
    {
      scene: 6,
      key: "lesson50_s6",
      audio_key: "lesson50_s6",
      speaker: "khalil",
      image: "/lessons/v2/lesson50/s6.webp",
      scene_image: "/lessons/v2/lesson50/s6.webp",
      text: lesson50CanonicalText.lesson50_s6,
          is_closing: true,
      cta_text: "هَيَّا نَتَدَرَّبُ",
    },
  ],
} as const;

export type Lesson50 = typeof lesson50;
