import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

const OPTIONS = ["مُفِيد", "ضَارّ"];

export const LESSON_7_EXERCISE_1: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson7-care/ex1-washing-hands.webp",
    question: "غَسْلُ اليَدَيْنِ بِالمَاءِ وَالصَّابُونِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex1_q1",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex1-brushing-teeth.webp",
    question: "تَنْظِيفُ الأَسْنَانِ بِالفُرْشَاةِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex1_q2",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex1-carpenter-goggles.webp",
    question: "وَضْعُ نَظَّارَةِ الوِقَايَةِ أَثْنَاءَ العَمَلِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex1_q3",
    options: OPTIONS,
    correct: "مُفِيد",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex1-rubbing-eyes.webp",
    question: "فَرْكُ العَيْنَيْنِ بِقُوَّةٍ بِاليَدَيْنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex1_q4",
    options: OPTIONS,
    correct: "ضَارّ",
  },
  {
    scene_image: "/lessons/v2/lesson7-care/ex1-loud-music.webp",
    question: "الاِسْتِمَاعُ لِصَوْتٍ عَالٍ جِدّاً قُرْبَ الأُذُنِ، تَصَرُّفٌ مُفِيدٌ أَمْ ضَارٌّ؟",
    question_audio_key: "l7_ex1_q5",
    options: OPTIONS,
    correct: "ضَارّ",
  },
];

export const LESSON_7_EXERCISE_1_AUDIO_BASE = "/audio/lesson_7_exercises";
