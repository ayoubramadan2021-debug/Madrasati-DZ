import type {
  CompareItem,
} from "../exercises-v2/CompareExerciseV2";

export const LESSON_34_EXERCISE_1_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_34_amusement_paths/exercises";

const BASE =
  "/lessons/v2/lesson34-amusement-paths/exercises";

export const LESSON_34_EXERCISE_1 = [
  {
    mission_title: "أقارن مسلكين",
    hint: "تتبع كل مسلك من الراية حتى الزحليقة.",
    background_image:
      "/lessons/v2/lesson34-amusement-paths/s7.webp",
    visual_a: {
      image: `${BASE}/path-direct-blue.svg`,
      label: "المسلك الأزرق",
      accent: "#3B82F6",
      badge: "أ",
    },
    visual_b: {
      image: `${BASE}/path-winding-orange.svg`,
      label: "المسلك البرتقالي",
      accent: "#F28C28",
      badge: "ب",
    },
    question:
      "أَيُّ المَسْلَكَيْنِ أَقْصَرُ لِلْوُصُولِ إِلَى الزَّحْلِيقَةِ؟",
    question_audio_key: "l34_ex1_q1",
    options: [
      "المَسْلَكُ الأَزْرَقُ",
      "المَسْلَكُ البُرْتُقَالِيُّ",
    ],
    correct: "المَسْلَكُ الأَزْرَقُ",
  },
  {
    mission_title: "أبحث عن المسلك المفتوح",
    hint: "الحاجز يعني أن المسلك مغلق.",
    background_image:
      "/lessons/v2/lesson34-amusement-paths/s8.webp",
    visual_a: {
      image: `${BASE}/path-open-green.svg`,
      label: "المسلك الأخضر",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `${BASE}/path-blocked-red.svg`,
      label: "المسلك الأحمر",
      accent: "#E45B55",
      badge: "ب",
    },
    question:
      "أَيُّ المَسْلَكَيْنِ يُمْكِنُ المَرُورُ فِيهِ؟",
    question_audio_key: "l34_ex1_q2",
    options: [
      "المَسْلَكُ الأَخْضَرُ",
      "المَسْلَكُ الأَحْمَرُ",
    ],
    correct: "المَسْلَكُ الأَخْضَرُ",
  },
  {
    mission_title: "أحدد وجهة المسلك",
    hint: "انظر إلى اللعبة الموجودة في نهاية كل مسلك.",
    background_image:
      "/lessons/v2/lesson34-amusement-paths/s9.webp",
    visual_a: {
      image: `${BASE}/path-to-train-purple.svg`,
      label: "المسلك البنفسجي",
      accent: "#8458D6",
      badge: "أ",
    },
    visual_b: {
      image: `${BASE}/path-to-wheel-yellow.svg`,
      label: "المسلك الأصفر",
      accent: "#F2BD3A",
      badge: "ب",
    },
    question:
      "أَيُّ المَسْلَكَيْنِ يَصِلُ إِلَى القِطَارِ؟",
    question_audio_key: "l34_ex1_q3",
    options: [
      "المَسْلَكُ البَنَفْسَجِيُّ",
      "المَسْلَكُ الأَصْفَرُ",
    ],
    correct: "المَسْلَكُ البَنَفْسَجِيُّ",
  },
  {
    mission_title: "أختار المسلك الآمن",
    hint: "المسلك الآمن لا يمر فوق البِرْكَة.",
    background_image:
      "/lessons/v2/lesson34-amusement-paths/s10.webp",
    visual_a: {
      image: `${BASE}/path-safe-green.svg`,
      label: "المسلك الأخضر",
      accent: "#2FA866",
      badge: "أ",
    },
    visual_b: {
      image: `${BASE}/path-puddle-blue.svg`,
      label: "المسلك الأزرق",
      accent: "#3B82F6",
      badge: "ب",
    },
    question:
      "أَيُّ المَسْلَكَيْنِ أَكْثَرُ أَمَانًا؟",
    question_audio_key: "l34_ex1_q4",
    options: [
      "المَسْلَكُ الأَخْضَرُ",
      "المَسْلَكُ الأَزْرَقُ",
    ],
    correct: "المَسْلَكُ الأَخْضَرُ",
  },
] satisfies CompareItem[];
