import type {
  CompareItem,
} from "../exercises-v2/CompareExerciseV2";

export const LESSON_35_EXERCISE_1_AUDIO_BASE =
  "/audio/teachers/taline/lesson_35_amusement_breathing/exercises";

const BASE =
  "/lessons/v2/lesson35-amusement-breathing/exercises";

export const LESSON_35_EXERCISE_1 = [
  {
    mission_title: "أتنفس بطريقة صحيحة",
    hint: "في الشهيق الهادئ يدخل الهواء من الأنف.",
    background_image:
      "/lessons/v2/lesson35-amusement-breathing/s13.webp",
    visual_a: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q1.webp`,
      label: "شهيق من الأنف",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp`,
      label: "شهيق سريع من الفم",
      accent: "#E45B55",
      badge: "ب",
    },
    question:
      "أَيُّ الطِّفْلَيْنِ يَسْتَنْشِقُ الهَوَاءَ بِطَرِيقَةٍ صَحِيحَةٍ؟",
    question_audio_key: "l35_ex1_q1",
    options: [
      "الطِّفْلُ الَّذِي يَسْتَنْشِقُ مِنَ الأَنْفِ",
      "الطِّفْلُ الَّذِي يَسْتَنْشِقُ مِنَ الفَمِ",
    ],
    correct:
      "الطِّفْلُ الَّذِي يَسْتَنْشِقُ مِنَ الأَنْفِ",
  },
  {
    mission_title: "أزفر ببطء",
    hint: "أخرج الهواء بهدوء ولا تحبس نفسك طويلًا.",
    background_image:
      "/lessons/v2/lesson35-amusement-breathing/s14.webp",
    visual_a: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp`,
      label: "زفير ببطء",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp`,
      label: "حبس النفس طويلًا",
      accent: "#E45B55",
      badge: "ب",
    },
    question:
      "أَيُّ السُّلُوكَيْنِ أَفْضَلُ بَعْدَ الشَّهِيقِ؟",
    question_audio_key: "l35_ex1_q2",
    options: [
      "الزَّفِيرُ بِبُطْءٍ",
      "حَبْسُ النَّفَسِ طَوِيلًا",
    ],
    correct: "الزَّفِيرُ بِبُطْءٍ",
  },
  {
    mission_title: "أهدئ جسمي بعد اللعب",
    hint: "إذا تسارع تنفسك، توقف واهدأ.",
    background_image:
      "/lessons/v2/lesson35-amusement-breathing/s15.webp",
    visual_a: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp`,
      label: "أتوقف وأهدأ",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp`,
      label: "أواصل الجري",
      accent: "#E45B55",
      badge: "ب",
    },
    question:
      "مَاذَا أَفْعَلُ عِنْدَمَا يَتَسَارَعُ تَنَفُّسِي؟",
    question_audio_key: "l35_ex1_q3",
    options: [
      "أَتَوَقَّفُ وَأَهْدَأُ",
      "أُوَاصِلُ الجَرْيَ",
    ],
    correct: "أَتَوَقَّفُ وَأَهْدَأُ",
  },
  {
    mission_title: "أبحث عن هواء نقي",
    hint: "الهواء النقي يساعدنا على التنفس براحة.",
    background_image:
      "/lessons/v2/lesson35-amusement-breathing/s16.webp",
    visual_a: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q2.webp`,
      label: "مكان جيد التهوية",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q6.webp`,
      label: "مكان مليء بالدخان",
      accent: "#E45B55",
      badge: "ب",
    },
    question:
      "أَيْنَ أَتَنَفَّسُ بِرَاحَةٍ أَكْبَرَ؟",
    question_audio_key: "l35_ex1_q4",
    options: [
      "فِي مَكَانٍ جَيِّدِ التَّهْوِيَةِ",
      "فِي مَكَانٍ مَلِيءٍ بِالدُّخَانِ",
    ],
    correct:
      "فِي مَكَانٍ جَيِّدِ التَّهْوِيَةِ",
  },
] satisfies CompareItem[];
