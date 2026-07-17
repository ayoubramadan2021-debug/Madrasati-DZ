import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_35_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/taline/lesson_35_amusement_breathing/exercises";

const BASE =
  "/lessons/v2/lesson35-amusement-breathing/exercises";

export const LESSON_35_EXERCISE_3 = [
  {
    question:
      "اخْتَرِ الطِّفْلَ الَّذِي يَسْتَرِيحُ وَيَتَنَفَّسُ بِهُدُوءٍ بَعْدَ اللَّعِبِ.",
    question_audio_key: "l35_ex3_q1",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q6.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ السُّلُوكَ المُنَاسِبَ بَعْدَ النَّشَاطِ.",
    question_audio_key: "l35_ex3_q2",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q6.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q8.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ المَكَانَ المُنَاسِبَ لِلرَّاحَةِ وَالتَّنَفُّسِ.",
    question_audio_key: "l35_ex3_q3",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q6.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q2.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ الطَّرِيقَةَ الصَّحِيحَةَ لِلشَّهِيقِ.",
    question_audio_key: "l35_ex3_q4",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q1.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
    ],
    correct_index: 2,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
