import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export type Lesson63ExerciseMode =
  | "read"
  | "complete"
  | "price"
  | "mark";

export type Lesson63ExerciseItem =
  TapSelectImageItem & {
    mode: Lesson63ExerciseMode;
    stimulus: Record<string, unknown>;
  };


export const LESSON_63_EXERCISE_1:
Lesson63ExerciseItem[] = [
  {
    "question": "اِقْرَأِ الْجَدْوَلَ. عِنْدَ تَقَاطُعِ سَطْرِ الْأَوْلَادِ وَعَمُودِ كُرَةِ الْقَدَمِ، مَا الْعَدَدُ الْمَكْتُوبُ؟",
    "question_audio_key": "lesson63_ex1_q1",
    "mode": "read",
    "options": [
      "11",
      "3",
      "5",
      "7"
    ],
    "correct_index": 0,
    "stimulus": {
      "target_row": "boys",
      "target_column": "football"
    }
  },
  {
    "question": "اِقْرَأِ الْجَدْوَلَ. عِنْدَ تَقَاطُعِ سَطْرِ الْبَنَاتِ وَعَمُودِ كُرَةِ السَّلَّةِ، مَا الْعَدَدُ الْمَكْتُوبُ؟",
    "question_audio_key": "lesson63_ex1_q2",
    "mode": "read",
    "options": [
      "4",
      "10",
      "6",
      "3"
    ],
    "correct_index": 1,
    "stimulus": {
      "target_row": "girls",
      "target_column": "basketball"
    }
  },
  {
    "question": "اِقْرَأِ الْجَدْوَلَ. عِنْدَ تَقَاطُعِ سَطْرِ الْأَوْلَادِ وَعَمُودِ الْكُرَةِ الطَّائِرَةِ، مَا الْعَدَدُ الْمَكْتُوبُ؟",
    "question_audio_key": "lesson63_ex1_q3",
    "mode": "read",
    "options": [
      "5",
      "3",
      "7",
      "11"
    ],
    "correct_index": 2,
    "stimulus": {
      "target_row": "boys",
      "target_column": "volleyball"
    }
  },
  {
    "question": "اِقْرَأِ الْجَدْوَلَ. عِنْدَ تَقَاطُعِ سَطْرِ الْبَنَاتِ وَعَمُودِ تِنِسِ الطَّاوِلَةِ، مَا الْعَدَدُ الْمَكْتُوبُ؟",
    "question_audio_key": "lesson63_ex1_q4",
    "mode": "read",
    "options": [
      "10",
      "6",
      "4",
      "3"
    ],
    "correct_index": 3,
    "stimulus": {
      "target_row": "girls",
      "target_column": "table_tennis"
    }
  }
];


export const LESSON_63_EXERCISE_2:
Lesson63ExerciseItem[] = [
  {
    "question": "اِقْرَأِ الْجُمْلَةَ، ثُمَّ اخْتَرِ الْعَدَدَ الَّذِي يُكْمِلُ الْخَانَةَ الصَّفْرَاءَ.",
    "question_audio_key": "lesson63_ex2_q1",
    "mode": "complete",
    "options": [
      "10",
      "4",
      "5",
      "11"
    ],
    "correct_index": 0,
    "stimulus": {
      "sport": "basketball",
      "boys": 5,
      "girls": 10,
      "missing": "girls",
      "sentence": "يُمَارِسُ كُرَةَ السَّلَّةِ خَمْسَةُ أَوْلَادٍ وَعَشْرُ بَنَاتٍ."
    }
  },
  {
    "question": "اِقْرَأِ الْجُمْلَةَ، ثُمَّ اخْتَرِ الْعَدَدَ الَّذِي يُكْمِلُ الْخَانَةَ الصَّفْرَاءَ.",
    "question_audio_key": "lesson63_ex2_q2",
    "mode": "complete",
    "options": [
      "5",
      "7",
      "4",
      "3"
    ],
    "correct_index": 1,
    "stimulus": {
      "sport": "volleyball",
      "boys": 7,
      "girls": 4,
      "missing": "boys",
      "sentence": "يُمَارِسُ الْكُرَةَ الطَّائِرَةَ سَبْعَةُ أَوْلَادٍ وَأَرْبَعُ بَنَاتٍ."
    }
  },
  {
    "question": "اِقْرَأِ الْجُمْلَةَ، ثُمَّ اخْتَرِ الْعَدَدَ الَّذِي يُكْمِلُ الْخَانَةَ الصَّفْرَاءَ.",
    "question_audio_key": "lesson63_ex2_q3",
    "mode": "complete",
    "options": [
      "4",
      "5",
      "3",
      "7"
    ],
    "correct_index": 2,
    "stimulus": {
      "sport": "table_tennis",
      "boys": 3,
      "girls": 3,
      "missing": "girls",
      "sentence": "يُمَارِسُ تِنِسَ الطَّاوِلَةِ ثَلَاثَةُ أَوْلَادٍ وَثَلَاثُ بَنَاتٍ."
    }
  },
  {
    "question": "اِقْرَأِ الْجُمْلَةَ، ثُمَّ اخْتَرِ الْعَدَدَ الَّذِي يُكْمِلُ الْخَانَةَ الصَّفْرَاءَ.",
    "question_audio_key": "lesson63_ex2_q4",
    "mode": "complete",
    "options": [
      "4",
      "3",
      "10",
      "6"
    ],
    "correct_index": 3,
    "stimulus": {
      "sport": "football",
      "boys": 11,
      "girls": 6,
      "missing": "girls",
      "sentence": "يُمَارِسُ كُرَةَ الْقَدَمِ أَحَدَ عَشَرَ وَلَدًا وَسِتُّ بَنَاتٍ."
    }
  }
];


export const LESSON_63_EXERCISE_3:
Lesson63ExerciseItem[] = [
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ. اِبْحَثْ عَنْ عَمُودِ الْكُرَّاسِ، ثُمَّ اخْتَرْ ثَمَنَهُ.",
    "question_audio_key": "lesson63_ex3_q1",
    "mode": "price",
    "options": [
      "50",
      "20",
      "35",
      "65"
    ],
    "correct_index": 0,
    "stimulus": {
      "target_item": "notebook"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ. اِبْحَثْ عَنْ عَمُودِ الْمِقَصِّ، ثُمَّ اخْتَرْ ثَمَنَهُ.",
    "question_audio_key": "lesson63_ex3_q2",
    "mode": "price",
    "options": [
      "25",
      "35",
      "50",
      "20"
    ],
    "correct_index": 1,
    "stimulus": {
      "target_item": "scissors"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ. اِبْحَثْ عَنْ عَمُودِ الْأَلْوَانِ، ثُمَّ اخْتَرْ ثَمَنَهَا.",
    "question_audio_key": "lesson63_ex3_q3",
    "mode": "price",
    "options": [
      "35",
      "20",
      "65",
      "50"
    ],
    "correct_index": 2,
    "stimulus": {
      "target_item": "colors"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ. اِبْحَثْ عَنْ عَمُودِ الْمِبْرَاةِ، ثُمَّ اخْتَرْ ثَمَنَهَا.",
    "question_audio_key": "lesson63_ex3_q4",
    "mode": "price",
    "options": [
      "20",
      "35",
      "65",
      "25"
    ],
    "correct_index": 3,
    "stimulus": {
      "target_item": "sharpener"
    }
  }
];


export const LESSON_63_EXERCISE_4:
Lesson63ExerciseItem[] = [
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ أَعْلَاهُ، ثُمَّ ضَعْ عَلَامَةَ الضَّرْبِ فِي خَانَةِ ثَمَنِ الْمِمْحَاةِ.",
    "question_audio_key": "lesson63_ex4_q1",
    "mode": "mark",
    "options": [
      "20",
      "35",
      "50",
      "65"
    ],
    "correct_index": 0,
    "stimulus": {
      "target_item": "eraser"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ أَعْلَاهُ، ثُمَّ ضَعْ عَلَامَةَ الضَّرْبِ فِي خَانَةِ ثَمَنِ الْكُرَّاسِ.",
    "question_audio_key": "lesson63_ex4_q2",
    "mode": "mark",
    "options": [
      "20",
      "50",
      "35",
      "65"
    ],
    "correct_index": 1,
    "stimulus": {
      "target_item": "notebook"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ أَعْلَاهُ، ثُمَّ ضَعْ عَلَامَةَ الضَّرْبِ فِي خَانَةِ ثَمَنِ الْمِقَصِّ.",
    "question_audio_key": "lesson63_ex4_q3",
    "mode": "mark",
    "options": [
      "50",
      "20",
      "35",
      "65"
    ],
    "correct_index": 2,
    "stimulus": {
      "target_item": "scissors"
    }
  },
  {
    "question": "اِقْرَأْ جَدْوَلَ الْأَسْعَارِ أَعْلَاهُ، ثُمَّ ضَعْ عَلَامَةَ الضَّرْبِ فِي خَانَةِ ثَمَنِ عُلْبَةِ الْأَلْوَانِ.",
    "question_audio_key": "lesson63_ex4_q4",
    "mode": "mark",
    "options": [
      "20",
      "35",
      "50",
      "65"
    ],
    "correct_index": 3,
    "stimulus": {
      "target_item": "colors"
    }
  }
];
