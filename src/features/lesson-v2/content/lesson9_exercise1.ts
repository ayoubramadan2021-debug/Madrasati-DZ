// الدرس 9 - التمرين 1: انظر للصورة واختر الموقع الصحيح (TapSelectWordsV2)
import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

const S2 = "/lessons/v2/lesson9-playground/s2.webp"; // فوق/تحت الزحلوقة
const S3 = "/lessons/v2/lesson9-playground/s3.webp"; // الكرة على المقعد
const S4 = "/lessons/v2/lesson9-playground/s4.webp"; // العصافير أعلى الشجرة
const S5 = "/lessons/v2/lesson9-playground/s5.webp"; // العشّ أسفل الشجرة

const OPTIONS = ["فَوْقَ", "تَحْتَ", "عَلى", "أَعْلى", "أَسْفَلَ"];

export const LESSON_9_EXERCISE_1: TapSelectWordItem[] = [
  { scene_image: S2, question: "أَيْنَ مَكانُ فاضِلٍ؟", question_audio_key: "l9_ex1_q1", options: OPTIONS, correct: "فَوْقَ" },
  { scene_image: S2, question: "أَيْنَ تَقِفُ رَحْمَةُ؟", question_audio_key: "l9_ex1_q2", options: OPTIONS, correct: "تَحْتَ" },
  { scene_image: S3, question: "ما هُوَ مَوْضِعُ الكُرَةِ؟", question_audio_key: "l9_ex1_q3", options: OPTIONS, correct: "عَلى" },
  { scene_image: S4, question: "أَيْنَ تَقِفُ العَصافيرُ؟", question_audio_key: "l9_ex1_q4", options: OPTIONS, correct: "أَعْلى" },
  { scene_image: S5, question: "ما هُوَ مَوْضِعُ العُشِّ؟", question_audio_key: "l9_ex1_q5", options: OPTIONS, correct: "أَسْفَلَ" },
];

export const LESSON_9_EXERCISE_1_AUDIO_BASE = "/audio/lesson_9_exercises";
