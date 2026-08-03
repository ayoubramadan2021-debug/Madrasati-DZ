import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

/*
  pattern:
  النوع|x,y;x,y;x,y;x,y

  outlier:
  اللون|x|y|نوع الخط

  complete:
  x1,y1|x2,y2|xc,yc
*/

export const LESSON_60_EXERCISE_1:
TapSelectImageItem[] = [
  {
    question:
      "اِخْتَرْ مَجْمُوعَةَ الْأَقْمَاعِ الَّتِي تَقَعُ عَلَى اسْتِقَامَةٍ وَاحِدَةٍ.",
    question_audio_key:
      "lesson60_ex1_q1",
    options: [
      "cones|12,50;37,50;62,50;87,50",
      "cones|12,68;37,43;62,61;87,30",
      "cones|12,31;37,67;62,39;87,72",
      "cones|12,63;37,52;62,33;87,45",
    ],
    correct_index: 0,
  },
  {
    question:
      "اِخْتَرْ مَجْمُوعَةَ الطُّيُورِ الَّتِي تَقِفُ عَلَى اسْتِقَامَةٍ وَاحِدَةٍ.",
    question_audio_key:
      "lesson60_ex1_q2",
    options: [
      "birds|12,30;37,61;62,42;87,70",
      "birds|12,72;37,57;62,42;87,27",
      "birds|12,64;37,39;62,59;87,34",
      "birds|12,42;37,68;62,34;87,56",
    ],
    correct_index: 1,
  },
  {
    question:
      "اِخْتَرْ مَجْمُوعَةَ الْأَقْرَاصِ الَّتِي تَقَعُ عَلَى خَطٍّ مُسْتَقِيمٍ وَاحِدٍ.",
    question_audio_key:
      "lesson60_ex1_q3",
    options: [
      "discs|18,24;39,58;61,35;83,69",
      "discs|18,67;39,39;61,57;83,28",
      "discs|20,75;40,58;60,41;80,24",
      "discs|18,48;39,67;61,30;83,54",
    ],
    correct_index: 2,
  },
  {
    question:
      "اِخْتَرْ مَجْمُوعَةَ الْكُرَاتِ الْمُرَتَّبَةَ عَلَى اسْتِقَامَةٍ وَاحِدَةٍ.",
    question_audio_key:
      "lesson60_ex1_q4",
    options: [
      "balls|15,34;38,65;62,41;85,72",
      "balls|15,70;38,43;62,62;85,31",
      "balls|15,28;38,57;62,35;85,67",
      "balls|15,52;38,52;62,52;85,52",
    ],
    correct_index: 3,
  },
];

export const LESSON_60_EXERCISE_2:
TapSelectImageItem[] = [
  {
    question:
      "أَيُّ قُرْصٍ خَارِجُ الِاسْتِقَامَةِ؟",
    question_audio_key:
      "lesson60_ex2_q1",
    options: [
      "red|20|25|h",
      "blue|35|55|h",
      "green|55|55|h",
      "blue|75|55|h",
    ],
    correct_index: 0,
  },
  {
    question:
      "أَيُّ نُقْطَةٍ لَا تَقَعُ عَلَى الْخَطِّ الْمُسْتَقِيمِ؟",
    question_audio_key:
      "lesson60_ex2_q2",
    options: [
      "blue|20|72|d1",
      "red|42|25|d1",
      "green|55|47|d1",
      "blue|78|25|d1",
    ],
    correct_index: 1,
  },
  {
    question:
      "اِخْتَرِ الْكُرَةَ الْبَعِيدَةَ عَنِ الِاسْتِقَامَةِ.",
    question_audio_key:
      "lesson60_ex2_q3",
    options: [
      "green|50|20|v",
      "blue|50|43|v",
      "red|77|60|v",
      "blue|50|78|v",
    ],
    correct_index: 2,
  },
  {
    question:
      "أَيُّ عُنْصُرٍ خَارِجُ الصَّفِّ الْمُسْتَقِيمِ؟",
    question_audio_key:
      "lesson60_ex2_q4",
    options: [
      "blue|20|25|d2",
      "green|40|42|d2",
      "blue|60|59|d2",
      "red|82|31|d2",
    ],
    correct_index: 3,
  },
];

export const LESSON_60_EXERCISE_3:
TapSelectImageItem[] = [
  {
    question:
      "اِخْتَرْ مَوْضِعَ النُّقْطَةِ الَّتِي تُكْمِلُ الِاسْتِقَامَةَ.",
    question_audio_key:
      "lesson60_ex3_q1",
    options: [
      "18,55|82,55|50,55",
      "18,55|82,55|50,28",
      "18,55|82,55|50,78",
      "18,55|82,55|67,34",
    ],
    correct_index: 0,
  },
  {
    question:
      "أَيْنَ نَضَعُ الْقُرْصَ الْأَخْضَرَ لِيَقَعَ عَلَى الْخَطِّ؟",
    question_audio_key:
      "lesson60_ex3_q2",
    options: [
      "18,76|82,24|50,70",
      "18,76|82,24|50,50",
      "18,76|82,24|50,24",
      "18,76|82,24|67,69",
    ],
    correct_index: 1,
  },
  {
    question:
      "اِخْتَرِ النُّقْطَةَ الَّتِي تُكْمِلُ الصَّفَّ الْعَمُودِيَّ.",
    question_audio_key:
      "lesson60_ex3_q3",
    options: [
      "50,18|50,82|25,50",
      "50,18|50,82|76,50",
      "50,18|50,82|50,50",
      "50,18|50,82|70,68",
    ],
    correct_index: 2,
  },
  {
    question:
      "اِخْتَرِ الْمَوْضِعَ الصَّحِيحَ لِإِكْمَالِ الْخَطِّ الْمَائِلِ.",
    question_audio_key:
      "lesson60_ex3_q4",
    options: [
      "18,24|82,76|50,22",
      "18,24|82,76|50,76",
      "18,24|82,76|72,35",
      "18,24|82,76|50,50",
    ],
    correct_index: 3,
  },
];

export const LESSON_60_EXERCISE_4:
TapSelectImageItem[] = [
  {
    question:
      "اِخْتَرِ الشَّكْلَ الَّذِي تُلَامِسُ فِيهِ الْمِسْطَرَةُ جَمِيعَ الْأَقْرَاصِ.",
    question_audio_key:
      "lesson60_ex4_q1",
    options: [
      "discs|14,52;38,52;62,52;86,52",
      "discs|14,62;38,45;62,58;86,31",
      "discs|14,28;38,65;62,39;86,70",
      "discs|14,68;38,36;62,57;86,27",
    ],
    correct_index: 0,
  },
  {
    question:
      "أَيُّ صَفٍّ تَتَحَقَّقُ اسْتِقَامَتُهُ بِالْمِسْطَرَةِ؟",
    question_audio_key:
      "lesson60_ex4_q2",
    options: [
      "cones|14,28;38,64;62,37;86,69",
      "cones|14,75;38,58;62,41;86,24",
      "cones|14,66;38,42;62,61;86,32",
      "cones|14,41;38,68;62,34;86,55",
    ],
    correct_index: 1,
  },
  {
    question:
      "اِخْتَرِ الْغُصْنَ الَّذِي تَقِفُ عَلَيْهِ الطُّيُورُ عَلَى اسْتِقَامَةٍ.",
    question_audio_key:
      "lesson60_ex4_q3",
    options: [
      "birds|14,35;38,63;62,42;86,71",
      "birds|14,67;38,39;62,58;86,30",
      "birds|14,72;38,56;62,40;86,24",
      "birds|14,29;38,61;62,36;86,68",
    ],
    correct_index: 2,
  },
  {
    question:
      "أَيُّ تَرْتِيبٍ يَقَعُ كُلُّهُ عَلَى حَافَّةِ الْمِسْطَرَةِ؟",
    question_audio_key:
      "lesson60_ex4_q4",
    options: [
      "balls|14,31;38,66;62,38;86,72",
      "balls|14,69;38,42;62,61;86,28",
      "balls|14,27;38,58;62,35;86,67",
      "balls|14,48;38,48;62,48;86,48",
    ],
    correct_index: 3,
  },
];
