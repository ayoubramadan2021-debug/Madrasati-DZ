import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export type Lesson62ExerciseMode =
  | "dots"
  | "decomposition"
  | "composition"
  | "matching";

export type Lesson62ExerciseItem =
  TapSelectImageItem & {
    mode: Lesson62ExerciseMode;
  };


export const LESSON_62_EXERCISE_1:
Lesson62ExerciseItem[] = [
  {
    "question": "اِخْتَرِ التَّمْثِيلَ الَّذِي يُسَاوِي أَرْبَعَةَ عَشَرَ.",
    "question_audio_key": "lesson62_ex1_q1",
    "mode": "dots",
    "options": [
      "dots|14",
      "dots|17",
      "dots|24",
      "dots|29"
    ],
    "correct_index": 0
  },
  {
    "question": "اِخْتَرِ التَّمْثِيلَ الَّذِي يُسَاوِي سَبْعَةَ عَشَرَ.",
    "question_audio_key": "lesson62_ex1_q2",
    "mode": "dots",
    "options": [
      "dots|14",
      "dots|17",
      "dots|27",
      "dots|31"
    ],
    "correct_index": 1
  },
  {
    "question": "اِخْتَرِ التَّمْثِيلَ الَّذِي يُسَاوِي تِسْعَةً وَعِشْرِينَ.",
    "question_audio_key": "lesson62_ex1_q3",
    "mode": "dots",
    "options": [
      "dots|19",
      "dots|26",
      "dots|29",
      "dots|39"
    ],
    "correct_index": 2
  },
  {
    "question": "اِخْتَرِ التَّمْثِيلَ الَّذِي يُسَاوِي وَاحِدًا وَثَلَاثِينَ.",
    "question_audio_key": "lesson62_ex1_q4",
    "mode": "dots",
    "options": [
      "dots|21",
      "dots|29",
      "dots|39",
      "dots|31"
    ],
    "correct_index": 3
  }
];


export const LESSON_62_EXERCISE_2:
Lesson62ExerciseItem[] = [
  {
    "question": "اِخْتَرْ تَفْكِيكَ الْعَدَدِ سِتَّةٍ وَعِشْرِينَ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ.",
    "question_audio_key": "lesson62_ex2_q1",
    "mode": "decomposition",
    "options": [
      "formula|20|6",
      "formula|20|5",
      "formula|30|6",
      "formula|10|6"
    ],
    "correct_index": 0
  },
  {
    "question": "اِخْتَرْ تَفْكِيكَ الْعَدَدِ وَاحِدٍ وَثَلَاثِينَ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ.",
    "question_audio_key": "lesson62_ex2_q2",
    "mode": "decomposition",
    "options": [
      "formula|20|1",
      "formula|30|1",
      "formula|30|3",
      "formula|10|1"
    ],
    "correct_index": 1
  },
  {
    "question": "اِخْتَرْ تَفْكِيكَ الْعَدَدِ تِسْعَةٍ وَثَلَاثِينَ إِلَى عَشَرَاتٍ وَوَحَدَاتٍ.",
    "question_audio_key": "lesson62_ex2_q3",
    "mode": "decomposition",
    "options": [
      "formula|30|8",
      "formula|20|9",
      "formula|30|9",
      "formula|10|9"
    ],
    "correct_index": 2
  },
  {
    "question": "اِخْتَرْ تَفْكِيكَ الْعَدَدِ خَمْسَةَ عَشَرَ.",
    "question_audio_key": "lesson62_ex2_q4",
    "mode": "decomposition",
    "options": [
      "formula|20|5",
      "formula|10|4",
      "formula|5|5",
      "formula|10|5"
    ],
    "correct_index": 3
  }
];


export const LESSON_62_EXERCISE_3:
Lesson62ExerciseItem[] = [
  {
    "question": "مَا الْعَدَدُ الَّذِي يُسَاوِي عَشَرَةً زَائِدَ سَبْعَةٍ؟",
    "question_audio_key": "lesson62_ex3_q1",
    "mode": "composition",
    "options": [
      "number|17",
      "number|16",
      "number|27",
      "number|15"
    ],
    "correct_index": 0
  },
  {
    "question": "مَا الْعَدَدُ الَّذِي يُسَاوِي عِشْرِينَ زَائِدَ خَمْسَةٍ؟",
    "question_audio_key": "lesson62_ex3_q2",
    "mode": "composition",
    "options": [
      "number|15",
      "number|25",
      "number|35",
      "number|24"
    ],
    "correct_index": 1
  },
  {
    "question": "مَا الْعَدَدُ الَّذِي يُسَاوِي عَشَرَةً زَائِدَ عَشَرَةٍ زَائِدَ سِتَّةٍ؟",
    "question_audio_key": "lesson62_ex3_q3",
    "mode": "composition",
    "options": [
      "number|16",
      "number|25",
      "number|26",
      "number|36"
    ],
    "correct_index": 2
  },
  {
    "question": "مَا الْعَدَدُ الَّذِي يُسَاوِي ثَلَاثِينَ زَائِدَ خَمْسَةٍ؟",
    "question_audio_key": "lesson62_ex3_q4",
    "mode": "composition",
    "options": [
      "number|25",
      "number|30",
      "number|34",
      "number|35"
    ],
    "correct_index": 3
  }
];


export const LESSON_62_EXERCISE_4:
Lesson62ExerciseItem[] = [
  {
    "question": "اِخْتَرِ الْبِطَاقَةَ الَّتِي تَتَطَابَقُ فِيهَا النِّقَاطُ وَالْعَدَدُ وَالتَّفْكِيكُ.",
    "question_audio_key": "lesson62_ex4_q1",
    "mode": "matching",
    "options": [
      "match|14|10|4|14",
      "match|17|10|7|14",
      "match|24|20|3|24",
      "match|31|30|1|29"
    ],
    "correct_index": 0
  },
  {
    "question": "أَيُّ بَطَاقَةٍ تَعْرِضُ الْعَدَدَ نَفْسَهُ بِثَلَاثِ طَرَائِقَ صَحِيحَةٍ؟",
    "question_audio_key": "lesson62_ex4_q2",
    "mode": "matching",
    "options": [
      "match|25|20|5|24",
      "match|29|20|9|29",
      "match|39|30|8|39",
      "match|17|10|7|18"
    ],
    "correct_index": 1
  },
  {
    "question": "اِبْحَثْ عَنِ الْبِطَاقَةِ الْخَالِيَةِ مِنَ الْخَطَإِ.",
    "question_audio_key": "lesson62_ex4_q3",
    "mode": "matching",
    "options": [
      "match|15|10|5|14",
      "match|31|30|2|31",
      "match|26|20|6|26",
      "match|35|30|5|34"
    ],
    "correct_index": 2
  },
  {
    "question": "اِخْتَرِ الْبِطَاقَةَ الَّتِي تُوَافِقُ فِيهَا الْعَشَرَاتُ وَالْوَحَدَاتُ الْعَدَدَ الْمَكْتُوبَ.",
    "question_audio_key": "lesson62_ex4_q4",
    "mode": "matching",
    "options": [
      "match|17|10|6|17",
      "match|29|20|9|28",
      "match|31|30|1|30",
      "match|39|30|9|39"
    ],
    "correct_index": 3
  }
];
