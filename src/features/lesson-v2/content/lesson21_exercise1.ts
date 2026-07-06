import type { LengthLabItem } from "../exercises-v2/LengthLabExerciseV2";

export const LESSON_21_EXERCISE_1_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";

const SCENE = "/lessons/v2/lesson21-length/s1.webp";

const COLOR_BARS = [
  { label: "البرتقالي", color: "#F28C28", icon: "🟠", width: 20 },
  { label: "الأصفر", color: "#FACC15", icon: "🟡", width: 38 },
  { label: "البنفسجي", color: "#A855F7", icon: "🟣", width: 56 },
  { label: "الأخضر", color: "#22C55E", icon: "🟢", width: 78 },
  { label: "الأزرق", color: "#3B82F6", icon: "🔵", width: 96 },
];

export const LESSON_21_EXERCISE_1: LengthLabItem[] = [
  {
    title: "ألوان الشرائط",
    mission: "انظر إلى مشهد الشرائط ثم اختر اللون المناسب.",
    question: "أَيُّ شَرِيطٍ هُوَ الأَطْوَلُ؟",
    question_audio_key: "l21_scene_q1",
    hint: "الأطول يمتد أبعد من الجميع.",
    options: ["الأزرق", "الأخضر", "الأصفر", "البنفسجي"],
    correct: "الأزرق",
    bars: COLOR_BARS,
    scene_image: SCENE,
    view: "scene",
  },
  {
    title: "ألوان الشرائط",
    mission: "انظر إلى مشهد الشرائط ثم اختر اللون المناسب.",
    question: "أَيُّ شَرِيطٍ هُوَ الأَقْصَرُ؟",
    question_audio_key: "l21_scene_q2",
    hint: "الأقصر ينتهي أولًا.",
    options: ["البرتقالي", "الأصفر", "الأخضر", "الأزرق"],
    correct: "البرتقالي",
    bars: COLOR_BARS,
    scene_image: SCENE,
    view: "scene",
  },
  {
    title: "ألوان الشرائط",
    mission: "ابحث عن الشريط المتوسط في الطول.",
    question: "أَيُّ شَرِيطٍ هُوَ المُتَوَسِّطُ؟",
    question_audio_key: "l21_scene_q3",
    hint: "المتوسط ليس أطولهم ولا أقصرهم.",
    options: ["الأصفر", "البنفسجي", "الأخضر", "الأزرق"],
    correct: "البنفسجي",
    bars: COLOR_BARS,
    scene_image: SCENE,
    view: "scene",
  },
  {
    title: "ألوان الشرائط",
    mission: "لاحظ ترتيب الأطوال جيدًا.",
    question: "أَيُّ لَوْنٍ يَأْتِي مُبَاشَرَةً قَبْلَ الأَخْضَرِ فِي الطُّولِ؟",
    question_audio_key: "l21_scene_q4",
    hint: "رتب الأشرطة من الأقصر إلى الأطول.",
    options: ["البرتقالي", "الأصفر", "البنفسجي", "الأزرق"],
    correct: "البنفسجي",
    bars: COLOR_BARS,
    scene_image: SCENE,
    view: "scene",
  },
  {
    title: "ألوان الشرائط",
    mission: "لاحظ ترتيب الأطوال جيدًا.",
    question: "أَيُّ لَوْنٍ يَأْتِي مُبَاشَرَةً بَعْدَ الأَصْفَرِ فِي الطُّولِ؟",
    question_audio_key: "l21_scene_q5",
    hint: "ابحث عمّن هو أطول قليلًا من الأصفر.",
    options: ["البرتقالي", "البنفسجي", "الأخضر", "الأزرق"],
    correct: "البنفسجي",
    bars: COLOR_BARS,
    scene_image: SCENE,
    view: "scene",
  },
];
