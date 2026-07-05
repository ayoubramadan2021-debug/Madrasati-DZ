// الدرس 11 - التمرين 2: اختر صورة الحركة (TapSelectImagesV2)
import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

const WALK = "/lessons/v2/lesson11-move/s2.webp";
const RUN = "/lessons/v2/lesson11-move/s3.webp";
const JUMP = "/lessons/v2/lesson11-move/s4.webp";
const CLIMB = "/lessons/v2/lesson11-move/s5.webp";

export const LESSON_11_EXERCISE_2: TapSelectImageItem[] = [
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الطِّفْلُ يَجْري", question_audio_key: "l11_ex2_q1", options: [WALK, RUN, JUMP, CLIMB], correct_index: 1 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الطِّفْلُ يَقْفِزُ", question_audio_key: "l11_ex2_q2", options: [JUMP, WALK, CLIMB, RUN], correct_index: 0 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الطِّفْلُ يَتَسَلَّقُ", question_audio_key: "l11_ex2_q3", options: [WALK, RUN, CLIMB, JUMP], correct_index: 2 },
  { question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا الطِّفْلُ يَمْشي", question_audio_key: "l11_ex2_q4", options: [RUN, CLIMB, JUMP, WALK], correct_index: 3 },
  { question: "تَحَدِّي. اِخْتَرِ الطِّفْلَ الأَسْرَعَ حَرَكَةً", question_audio_key: "l11_ex2_q5", options: [WALK, JUMP, RUN, CLIMB], correct_index: 2 },
];

export const LESSON_11_EXERCISE_2_AUDIO_BASE = "/audio/lesson_11_exercises";
