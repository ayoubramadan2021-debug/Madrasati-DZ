import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_35_EXERCISE_4_AUDIO_BASE =
  "/audio/teachers/taline/lesson_35_amusement_breathing/exercises";

const BASE =
  "/lessons/v2/lesson35-amusement-breathing/exercises";

export const LESSON_35_EXERCISE_4 = [
  {
    question:
      "أَيُّ صُورَةٍ تُمَثِّلُ الشَّهِيقَ مِنَ الأَنْفِ؟",
    question_audio_key: "l35_ex4_q1",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q1.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ صُورَةٍ تُمَثِّلُ الزَّفِيرَ بِبُطْءٍ؟",
    question_audio_key: "l35_ex4_q2",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q1.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ الوَضْعِيَّةَ الَّتِي تُسَاعِدُ عَلَى التَّنَفُّسِ بِرَاحَةٍ.",
    question_audio_key: "l35_ex4_q3",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q4.webp",
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "مَاذَا أَفْعَلُ إِذَا أَصْبَحَ تَنَفُّسِي سَرِيعًا؟",
    question_audio_key: "l35_ex4_q4",
    options: [
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q6.webp",
      "/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q5.webp",
    ],
    correct_index: 1,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
