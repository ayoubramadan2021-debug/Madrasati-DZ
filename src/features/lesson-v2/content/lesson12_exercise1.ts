// الدرس 12 - التمرين 1: كم بَقِيَ؟ (مفهوم الصفر عبر التفريغ) — CountSelectV2
import type { CountSelectItem } from "../exercises-v2/CountSelectV2";

export const LESSON_12_EXERCISE_1: CountSelectItem[] = [
  { items: ["⚽","⚽","⚽"], question: "كانَ في الصُّنْدوقِ ثَلاثُ كُراتٍ. كَمْ تَرى الآنَ؟", question_audio_key: "l12_ex1_q1", options: ["2", "3", "4"], correct: "3" },
  { items: ["⚽","⚽"], question: "أَخَذْنا كُرَةً واحِدَةً. كَمْ بَقِيَ الآنَ؟", question_audio_key: "l12_ex1_q2", options: ["1", "2", "3"], correct: "2" },
  { items: ["⚽"], question: "أَخَذْنا كُرَةً أُخْرى. كَمْ بَقِيَ الآنَ؟", question_audio_key: "l12_ex1_q3", options: ["0", "1", "2"], correct: "1" },
  { items: [], question: "أَخَذْنا آخِرَ كُرَةٍ! الصُّنْدوقُ فارِغٌ الآنَ. كَمْ بَقِيَ؟", question_audio_key: "l12_ex1_q4", options: ["1", "0", "2"], correct: "0" },
  { items: [], question: "لا يوجَدُ أَيُّ شَيْءٍ في الصُّنْدوقِ. ما هُوَ العَدَدُ؟", question_audio_key: "l12_ex1_q5", options: ["2", "0", "1"], correct: "0" },
];

export const LESSON_12_EXERCISE_1_AUDIO_BASE = "/audio/lesson_12_exercises";
