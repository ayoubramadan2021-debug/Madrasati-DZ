import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import GeometrySkillLabV2, {
  type GeometryActivityDataV2,
} from "./GeometrySkillLabV2";

type GeometryQuestion = UnifiedLessonExerciseQuestionV2 & {
  geometry: GeometryActivityDataV2;
};

type LessonConfig = {
  lessonKey: string;
  audioBase: string;
  questions: GeometryQuestion[];
  missionTitles: Record<number,string>;
  nextPath: string;
  completionMessage: string;
};

const LESSONS = {
  "86": {
    "lessonKey": "lesson86",
    "audioBase": "/audio/teachers/khalil/lesson_86_cube_rectangular_prism/exercises",
    "questions": [
      {
        "id": "l86_ex1_q1",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الْمُجَسَّمِ؟",
        "audioKey": "l86_ex1_q1",
        "geometry": {
          "mode": "identify",
          "visual": "cube",
          "options": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "كُرَةٌ",
              "sphere"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ]
          ],
          "answer": 2
        }
      },
      {
        "id": "l86_ex1_q2",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الْمُجَسَّمِ؟",
        "audioKey": "l86_ex1_q2",
        "geometry": {
          "mode": "identify",
          "visual": "rectangular-prism",
          "options": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ],
            [
              "أُسْطُوَانَةٌ",
              "cylinder"
            ]
          ],
          "answer": 0
        }
      },
      {
        "id": "l86_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ مُجَسَّمٍ يُشْبِهُ النَّرْدَ؟",
        "audioKey": "l86_ex1_q3",
        "geometry": {
          "mode": "identify",
          "visual": "die",
          "options": [
            [
              "الْكُرَةُ",
              "sphere"
            ],
            [
              "الْمُكَعَّبُ",
              "cube"
            ],
            [
              "الْبِلَاطَةُ الْقَائِمَةُ",
              "rectangular-prism"
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l86_ex1_q4",
        "mission": 1,
        "prompt": "أَيُّ مُجَسَّمٍ يُشْبِهُ عُلْبَةَ الْأَحْذِيَةِ؟",
        "audioKey": "l86_ex1_q4",
        "geometry": {
          "mode": "identify",
          "visual": "shoebox",
          "options": [
            [
              "الْأُسْطُوَانَةُ",
              "cylinder"
            ],
            [
              "الْمُكَعَّبُ",
              "cube"
            ],
            [
              "الْبِلَاطَةُ الْقَائِمَةُ",
              "rectangular-prism"
            ]
          ],
          "answer": 2
        }
      },
      {
        "id": "l86_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ وَجْهًا لِلْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q1",
        "geometry": {
          "mode": "number",
          "visual": "cube",
          "numbers": [
            12,
            8,
            6,
            4
          ],
          "answer": 6
        }
      },
      {
        "id": "l86_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ رَأْسًا لِلْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q2",
        "geometry": {
          "mode": "number",
          "visual": "cube",
          "numbers": [
            8,
            10,
            6,
            12
          ],
          "answer": 8
        }
      },
      {
        "id": "l86_ex2_q3",
        "mission": 2,
        "prompt": "كَمْ حَرْفًا لِلْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q3",
        "geometry": {
          "mode": "number",
          "visual": "cube",
          "numbers": [
            10,
            8,
            6,
            12
          ],
          "answer": 12
        }
      },
      {
        "id": "l86_ex2_q4",
        "mission": 2,
        "prompt": "كَمْ وَجْهًا لِلْبِلَاطَةِ الْقَائِمَةِ؟",
        "audioKey": "l86_ex2_q4",
        "geometry": {
          "mode": "number",
          "visual": "rectangular-prism",
          "numbers": [
            8,
            6,
            12,
            4
          ],
          "answer": 6
        }
      },
      {
        "id": "l86_ex3_q1",
        "mission": 3,
        "prompt": "صَنِّفِ النَّرْدَ.",
        "audioKey": "l86_ex3_q1",
        "geometry": {
          "mode": "classify",
          "visual": "die",
          "bins": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l86_ex3_q2",
        "mission": 3,
        "prompt": "صَنِّفْ عُلْبَةَ الْأَحْذِيَةِ.",
        "audioKey": "l86_ex3_q2",
        "geometry": {
          "mode": "classify",
          "visual": "shoebox",
          "bins": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ]
          ],
          "answer": 0
        }
      },
      {
        "id": "l86_ex3_q3",
        "mission": 3,
        "prompt": "صَنِّفْ هَذِهِ الْهَدِيَّةَ.",
        "audioKey": "l86_ex3_q3",
        "geometry": {
          "mode": "classify",
          "visual": "gift",
          "bins": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l86_ex3_q4",
        "mission": 3,
        "prompt": "صَنِّفْ هَذِهِ الْعُلْبَةَ.",
        "audioKey": "l86_ex3_q4",
        "geometry": {
          "mode": "classify",
          "visual": "shoebox",
          "bins": [
            [
              "بِلَاطَةٌ قَائِمَةٌ",
              "rectangular-prism"
            ],
            [
              "مُكَعَّبٌ",
              "cube"
            ]
          ],
          "answer": 0
        }
      },
      {
        "id": "l86_ex4_q1",
        "mission": 4,
        "prompt": "اِلْمَسْ وَجْهًا مِنْ أَوْجُهِ الْمُكَعَّبِ.",
        "audioKey": "l86_ex4_q1",
        "geometry": {
          "mode": "featureTap",
          "shape": "cube",
          "feature": "face"
        }
      },
      {
        "id": "l86_ex4_q2",
        "mission": 4,
        "prompt": "اِلْمَسْ رَأْسًا مِنْ رُؤُوسِ الْمُكَعَّبِ.",
        "audioKey": "l86_ex4_q2",
        "geometry": {
          "mode": "featureTap",
          "shape": "cube",
          "feature": "vertex"
        }
      },
      {
        "id": "l86_ex4_q3",
        "mission": 4,
        "prompt": "اِلْمَسْ حَرْفًا مِنْ أَحْرُفِ الْمُكَعَّبِ.",
        "audioKey": "l86_ex4_q3",
        "geometry": {
          "mode": "featureTap",
          "shape": "cube",
          "feature": "edge"
        }
      },
      {
        "id": "l86_ex4_q4",
        "mission": 4,
        "prompt": "مَا عَدَدُ رُؤُوسِ الْمُكَعَّبِ وَالْبِلَاطَةِ الْقَائِمَةِ؟",
        "audioKey": "l86_ex4_q4",
        "geometry": {
          "mode": "number",
          "visual": "cube+rectangular-prism",
          "numbers": [
            12,
            4,
            6,
            8
          ],
          "answer": 8
        }
      }
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أَعُدُّ",
      "3": "أُصَنِّفُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "nextPath": "/lesson-v2/87",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "93": {
  "lessonKey": "lesson93",
  "audioBase": "/audio/teachers/taline/lesson_93_planar_shapes/exercises",
  "questions": [
    {
      "id": "l93_ex1_q1",
      "mission": 1,
      "prompt": "مَا هَذَا الشَّكْلُ؟",
      "audioKey": "l93_ex1_q1",
      "geometry": {
        "mode": "identify",
        "visual": "circle",
        "options": [
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex1_q2",
      "mission": 1,
      "prompt": "مَا هَذَا الشَّكْلُ؟",
      "audioKey": "l93_ex1_q2",
      "geometry": {
        "mode": "identify",
        "visual": "square",
        "options": [
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex1_q3",
      "mission": 1,
      "prompt": "مَا هَذَا الشَّكْلُ؟",
      "audioKey": "l93_ex1_q3",
      "geometry": {
        "mode": "identify",
        "visual": "rectangle",
        "options": [
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 0
      }
    },
    {
      "id": "l93_ex1_q4",
      "mission": 1,
      "prompt": "مَا هَذَا الشَّكْلُ؟",
      "audioKey": "l93_ex1_q4",
      "geometry": {
        "mode": "identify",
        "visual": "triangle",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex2_q1",
      "mission": 2,
      "prompt": "مَا الشَّكْلُ الْمُخْتَلِفُ عَنِ الْمُثَلَّثِ؟",
      "audioKey": "l93_ex2_q1",
      "geometry": {
        "mode": "identify",
        "visual": "triangle",
        "options": [
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex2_q2",
      "mission": 2,
      "prompt": "مَا الشَّكْلُ الْمُخْتَلِفُ عَنِ الْمُسْتَطِيلِ؟",
      "audioKey": "l93_ex2_q2",
      "geometry": {
        "mode": "identify",
        "visual": "rectangle",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ]
        ],
        "answer": 0
      }
    },
    {
      "id": "l93_ex2_q3",
      "mission": 2,
      "prompt": "مَا الشَّكْلُ الْمُخْتَلِفُ عَنِ الْمُرَبَّعِ؟",
      "audioKey": "l93_ex2_q3",
      "geometry": {
        "mode": "identify",
        "visual": "square",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex2_q4",
      "mission": 2,
      "prompt": "مَا الشَّكْلُ الْمُخْتَلِفُ عَنِ الدَّائِرَةِ؟",
      "audioKey": "l93_ex2_q4",
      "geometry": {
        "mode": "identify",
        "visual": "circle",
        "options": [
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex3_q1",
      "mission": 3,
      "prompt": "اِلْمَسِ الشَّكْلَ الْمُلَوَّنَ بِالْأَخْضَرِ.",
      "audioKey": "l93_ex3_q1",
      "geometry": {
        "mode": "identify",
        "visual": "triangle",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex3_q2",
      "mission": 3,
      "prompt": "اِلْمَسِ الشَّكْلَ الْمُلَوَّنَ بِالْأَصْفَرِ.",
      "audioKey": "l93_ex3_q2",
      "geometry": {
        "mode": "identify",
        "visual": "square",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 0
      }
    },
    {
      "id": "l93_ex3_q3",
      "mission": 3,
      "prompt": "اِلْمَسِ الشَّكْلَ الْمُلَوَّنَ بِالْأَحْمَرِ.",
      "audioKey": "l93_ex3_q3",
      "geometry": {
        "mode": "identify",
        "visual": "rectangle",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex3_q4",
      "mission": 3,
      "prompt": "اِلْمَسِ الشَّكْلَ الْمُلَوَّنَ بِالْأَزْرَقِ.",
      "audioKey": "l93_ex3_q4",
      "geometry": {
        "mode": "identify",
        "visual": "circle",
        "options": [
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex4_q1",
      "mission": 4,
      "prompt": "اِخْتَرِ الشَّكْلَ الْمُخْتَلِفَ عَنِ الْبَاقِي.",
      "audioKey": "l93_ex4_q1",
      "geometry": {
        "mode": "identify",
        "visual": "triangle",
        "options": [
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex4_q2",
      "mission": 4,
      "prompt": "اِخْتَرِ الشَّكْلَ الْمُخْتَلِفَ عَنِ الْبَاقِي.",
      "audioKey": "l93_ex4_q2",
      "geometry": {
        "mode": "identify",
        "visual": "rectangle",
        "options": [
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ],
          [
            "مُسْتَطِيلٌ",
            "rectangle"
          ]
        ],
        "answer": 1
      }
    },
    {
      "id": "l93_ex4_q3",
      "mission": 4,
      "prompt": "اِخْتَرِ الشَّكْلَ الْمُخْتَلِفَ عَنِ الْبَاقِي.",
      "audioKey": "l93_ex4_q3",
      "geometry": {
        "mode": "identify",
        "visual": "square",
        "options": [
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "مُثَلَّثٌ",
            "triangle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ]
        ],
        "answer": 2
      }
    },
    {
      "id": "l93_ex4_q4",
      "mission": 4,
      "prompt": "اِخْتَرِ الشَّكْلَ الْمُخْتَلِفَ عَنِ الْبَاقِي.",
      "audioKey": "l93_ex4_q4",
      "geometry": {
        "mode": "identify",
        "visual": "circle",
        "options": [
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "مُرَبَّعٌ",
            "square"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ],
          [
            "دَائِرَةٌ",
            "circle"
          ]
        ],
        "answer": 1
      }
    }
  ],
  "missionTitles": {
    "1": "أَتَعَرَّفُ عَلَى الْأَشْكَالِ",
    "2": "أَجِدُ الشَّكْلَ الْمُخْتَلِفَ",
    "3": "أُلَوِّنُ الْأَشْكَالَ",
    "4": "أَجِدُ الشَّكْلَ الْغَرِيبَ"
  },
  "nextPath": "/lesson-v2/94",
  "completionMessage": "أَحْسَنْتَ! تَعَرَّفْتَ عَلَى الدَّائِرَةِ وَالْمُرَبَّعِ وَالْمُسْتَطِيلِ وَالْمُثَلَّثِ."
},
  "100": {
    "lessonKey": "lesson100",
    "audioBase": "/audio/teachers/khalil/lesson_100_simple_composite_shapes/exercises",
    "questions": [
      {
        "id": "l100_ex1_q1",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q1",
        "geometry": {
          "mode": "identify",
          "visual": "circle",
          "options": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ]
          ],
          "answer": 2
        }
      },
      {
        "id": "l100_ex1_q2",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q2",
        "geometry": {
          "mode": "identify",
          "visual": "triangle",
          "options": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ]
          ],
          "answer": 0
        }
      },
      {
        "id": "l100_ex1_q3",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q3",
        "geometry": {
          "mode": "identify",
          "visual": "square",
          "options": [
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l100_ex1_q4",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q4",
        "geometry": {
          "mode": "identify",
          "visual": "rectangle",
          "options": [
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ]
          ],
          "answer": 2
        }
      },
      {
        "id": "l100_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ ضِلْعًا لِلْمُثَلَّثِ؟",
        "audioKey": "l100_ex2_q1",
        "geometry": {
          "mode": "number",
          "visual": "triangle",
          "numbers": [
            0,
            6,
            3,
            4
          ],
          "answer": 3
        }
      },
      {
        "id": "l100_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ رَأْسًا لِلْمُثَلَّثِ؟",
        "audioKey": "l100_ex2_q2",
        "geometry": {
          "mode": "number",
          "visual": "triangle",
          "numbers": [
            3,
            4,
            0,
            6
          ],
          "answer": 3
        }
      },
      {
        "id": "l100_ex2_q3",
        "mission": 2,
        "prompt": "كَمْ ضِلْعًا لِلْمُرَبَّعِ؟",
        "audioKey": "l100_ex2_q3",
        "geometry": {
          "mode": "number",
          "visual": "square",
          "numbers": [
            3,
            0,
            6,
            4
          ],
          "answer": 4
        }
      },
      {
        "id": "l100_ex2_q4",
        "mission": 2,
        "prompt": "كَمْ رَأْسًا لِلْمُسْتَطِيلِ؟",
        "audioKey": "l100_ex2_q4",
        "geometry": {
          "mode": "number",
          "visual": "rectangle",
          "numbers": [
            3,
            4,
            6,
            0
          ],
          "answer": 4
        }
      },
      {
        "id": "l100_ex3_q1",
        "mission": 3,
        "prompt": "اِلْمَسْ جَمِيعَ رُؤُوسِ الْمُثَلَّثِ.",
        "audioKey": "l100_ex3_q1",
        "geometry": {
          "mode": "tapVertices",
          "shape": "triangle",
          "target": 3
        }
      },
      {
        "id": "l100_ex3_q2",
        "mission": 3,
        "prompt": "اِلْمَسْ جَمِيعَ رُؤُوسِ الْمُرَبَّعِ.",
        "audioKey": "l100_ex3_q2",
        "geometry": {
          "mode": "tapVertices",
          "shape": "square",
          "target": 4
        }
      },
      {
        "id": "l100_ex3_q3",
        "mission": 3,
        "prompt": "اِلْمَسْ جَمِيعَ رُؤُوسِ الْمُسْتَطِيلِ.",
        "audioKey": "l100_ex3_q3",
        "geometry": {
          "mode": "tapVertices",
          "shape": "rectangle",
          "target": 4
        }
      },
      {
        "id": "l100_ex3_q4",
        "mission": 3,
        "prompt": "هَلْ لِلدَّائِرَةِ رُؤُوسٌ؟",
        "audioKey": "l100_ex3_q4",
        "geometry": {
          "mode": "yesNo",
          "visual": "circle",
          "answer": false
        }
      },
      {
        "id": "l100_ex4_q1",
        "mission": 4,
        "prompt": "اخْتَرِ الشَّكْلَيْنِ اللَّذَيْنِ يُكَوِّنَانِ هَذَا الْبَيْتَ.",
        "audioKey": "l100_ex4_q1",
        "geometry": {
          "mode": "compose",
          "visual": "house",
          "parts": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ]
          ],
          "answer": [
            0,
            1
          ]
        }
      },
      {
        "id": "l100_ex4_q2",
        "mission": 4,
        "prompt": "اخْتَرِ الشَّكْلَيْنِ اللَّذَيْنِ يُكَوِّنَانِ هَذَا الْبُرْجَ.",
        "audioKey": "l100_ex4_q2",
        "geometry": {
          "mode": "compose",
          "visual": "tower",
          "parts": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ]
          ],
          "answer": [
            1,
            3
          ]
        }
      },
      {
        "id": "l100_ex4_q3",
        "mission": 4,
        "prompt": "اخْتَرِ الشَّكْلَيْنِ اللَّذَيْنِ يُكَوِّنَانِ هَذَا الْعَلَمَ.",
        "audioKey": "l100_ex4_q3",
        "geometry": {
          "mode": "compose",
          "visual": "flag",
          "parts": [
            [
              "دَائِرَةٌ",
              "circle"
            ],
            [
              "قِطْعَةٌ مُسْتَقِيمَةٌ",
              "vseg"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ],
            [
              "مُثَلَّثٌ",
              "triangle"
            ]
          ],
          "answer": [
            1,
            2
          ]
        }
      },
      {
        "id": "l100_ex4_q4",
        "mission": 4,
        "prompt": "اخْتَرِ الشَّكْلَيْنِ الْأَكْثَرِ ظُهُورًا فِي هَذَا الرُّوبُوتِ.",
        "audioKey": "l100_ex4_q4",
        "geometry": {
          "mode": "compose",
          "visual": "robot",
          "parts": [
            [
              "دَائِرَةٌ",
              "circle"
            ],
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ]
          ],
          "answer": [
            2,
            3
          ]
        }
      }
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أَعُدُّ",
      "3": "أَلْمَسُ وَأَكْتَشِفُ",
      "4": "أُرَكِّبُ"
    },
    "nextPath": "/lesson-v2/101",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "110": {
    "lessonKey": "lesson110",
    "audioBase": "/audio/teachers/khalil/lesson_110_complete_plane_shape/exercises",
    "questions": [
      {
        "id": "l110_ex1_q1",
        "mission": 1,
        "prompt": "مَا الشَّكْلُ الَّذِي سَيَكْتَمِلُ؟",
        "audioKey": "l110_ex1_q1",
        "geometry": {
          "mode": "identifyIncomplete",
          "shape": "square",
          "missing": "right",
          "options": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "دَائِرَةٌ",
              "circle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ]
          ],
          "answer": 2
        }
      },
      {
        "id": "l110_ex1_q2",
        "mission": 1,
        "prompt": "مَا الشَّكْلُ الَّذِي سَيَكْتَمِلُ؟",
        "audioKey": "l110_ex1_q2",
        "geometry": {
          "mode": "identifyIncomplete",
          "shape": "triangle",
          "missing": "right",
          "options": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ]
          ],
          "answer": 0
        }
      },
      {
        "id": "l110_ex1_q3",
        "mission": 1,
        "prompt": "مَا الشَّكْلُ الَّذِي سَيَكْتَمِلُ؟",
        "audioKey": "l110_ex1_q3",
        "geometry": {
          "mode": "identifyIncomplete",
          "shape": "rectangle",
          "missing": "bottom",
          "options": [
            [
              "مُثَلَّثٌ",
              "triangle"
            ],
            [
              "مُسْتَطِيلٌ",
              "rectangle"
            ],
            [
              "مُرَبَّعٌ",
              "square"
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l110_ex1_q4",
        "mission": 1,
        "prompt": "أَيُّ جَانِبٍ نَاقِصٌ فِي هَذَا الْمُرَبَّعِ؟",
        "audioKey": "l110_ex1_q4",
        "geometry": {
          "mode": "sideChoice",
          "shape": "square",
          "missing": "right",
          "options": [
            "الْعُلْوِيُّ",
            "الْأَيْسَرُ",
            "الْأَيْمَنُ"
          ],
          "answer": 2
        }
      },
      {
        "id": "l110_ex2_q1",
        "mission": 2,
        "prompt": "اخْتَرِ الْقِطْعَةَ الَّتِي تُتِمُّ الْمُرَبَّعَ.",
        "audioKey": "l110_ex2_q1",
        "geometry": {
          "mode": "completeSegment",
          "shape": "square",
          "missing": "right",
          "segments": [
            "diag1",
            "vseg",
            "hseg"
          ],
          "answer": 1
        }
      },
      {
        "id": "l110_ex2_q2",
        "mission": 2,
        "prompt": "اخْتَرِ الْقِطْعَةَ الَّتِي تُتِمُّ الْمُسْتَطِيلَ.",
        "audioKey": "l110_ex2_q2",
        "geometry": {
          "mode": "completeSegment",
          "shape": "rectangle",
          "missing": "bottom",
          "segments": [
            "hseg",
            "diag2",
            "vseg"
          ],
          "answer": 0
        }
      },
      {
        "id": "l110_ex2_q3",
        "mission": 2,
        "prompt": "اخْتَرِ الْقِطْعَةَ الَّتِي تُتِمُّ الْمُثَلَّثَ.",
        "audioKey": "l110_ex2_q3",
        "geometry": {
          "mode": "completeSegment",
          "shape": "triangle",
          "missing": "right",
          "segments": [
            "vseg",
            "hseg",
            "diag1"
          ],
          "answer": 2
        }
      },
      {
        "id": "l110_ex2_q4",
        "mission": 2,
        "prompt": "اخْتَرِ الْقِطْعَةَ الْمُنَاسِبَةَ لِلْجَانِبِ الْمَفْتُوحِ.",
        "audioKey": "l110_ex2_q4",
        "geometry": {
          "mode": "completeSegment",
          "shape": "square",
          "missing": "right",
          "segments": [
            "hseg",
            "vseg",
            "diag2"
          ],
          "answer": 1
        }
      },
      {
        "id": "l110_ex3_q1",
        "mission": 3,
        "prompt": "اِلْمَسِ النُّقْطَتَيْنِ اللَّتَيْنِ نَصِلُ بَيْنَهُمَا لِإِتْمَامِ الْمُرَبَّعِ.",
        "audioKey": "l110_ex3_q1",
        "geometry": {
          "mode": "tapEndpoints",
          "shape": "square",
          "missing": "right"
        }
      },
      {
        "id": "l110_ex3_q2",
        "mission": 3,
        "prompt": "اِلْمَسِ النُّقْطَتَيْنِ اللَّتَيْنِ نَصِلُ بَيْنَهُمَا لِإِتْمَامِ الْمُسْتَطِيلِ.",
        "audioKey": "l110_ex3_q2",
        "geometry": {
          "mode": "tapEndpoints",
          "shape": "rectangle",
          "missing": "bottom"
        }
      },
      {
        "id": "l110_ex3_q3",
        "mission": 3,
        "prompt": "اِلْمَسِ النُّقْطَتَيْنِ اللَّتَيْنِ نَصِلُ بَيْنَهُمَا لِإِتْمَامِ الْمُثَلَّثِ.",
        "audioKey": "l110_ex3_q3",
        "geometry": {
          "mode": "tapEndpoints",
          "shape": "triangle",
          "missing": "right"
        }
      },
      {
        "id": "l110_ex3_q4",
        "mission": 3,
        "prompt": "أَتِمَّ الْمُرَبَّعَ بِوَصْلِ النُّقْطَتَيْنِ الْحَمْرَاوَيْنِ.",
        "audioKey": "l110_ex3_q4",
        "geometry": {
          "mode": "tapEndpoints",
          "shape": "square",
          "missing": "right"
        }
      },
      {
        "id": "l110_ex4_q1",
        "mission": 4,
        "prompt": "اِرْسُمْ الضِّلْعَ النَّاقِصَ لِإِتْمَامِ الْمُرَبَّعِ.",
        "audioKey": "l110_ex4_q1",
        "geometry": {
          "mode": "drawMissingSide",
          "shape": "square",
          "missing": "right",
          "name": "مُرَبَّعٌ"
        }
      },
      {
        "id": "l110_ex4_q2",
        "mission": 4,
        "prompt": "اِرْسُمْ الضِّلْعَ النَّاقِصَ لِإِتْمَامِ الْمُسْتَطِيلِ.",
        "audioKey": "l110_ex4_q2",
        "geometry": {
          "mode": "drawMissingSide",
          "shape": "rectangle",
          "missing": "bottom",
          "name": "مُسْتَطِيلٌ"
        }
      },
      {
        "id": "l110_ex4_q3",
        "mission": 4,
        "prompt": "اِرْسُمْ الضِّلْعَ النَّاقِصَ لِإِتْمَامِ الْمُثَلَّثِ.",
        "audioKey": "l110_ex4_q3",
        "geometry": {
          "mode": "drawMissingSide",
          "shape": "triangle",
          "missing": "right",
          "name": "مُثَلَّثٌ"
        }
      },
      {
        "id": "l110_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلِ الْمُرَبَّعَ بِرَسْمِ ضِلْعِهِ الْأَيْسَرِ.",
        "audioKey": "l110_ex4_q4",
        "geometry": {
          "mode": "drawMissingSide",
          "shape": "square",
          "missing": "left",
          "name": "مُرَبَّعٌ"
        }
      }
    ],
    "missionTitles": {
      "1": "أَكْتَشِفُ",
      "2": "أَخْتَارُ الْجُزْءَ",
      "3": "أَصِلُ",
      "4": "أُتِمُّ"
    },
    "nextPath": "/lesson-v2/111",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  }
} as unknown as Record<number,LessonConfig>;

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<GeometryQuestion>) {
  return (
    <GeometrySkillLabV2
      activity={question.geometry}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

function GeometryLesson({lessonNum}:{lessonNum:86|100|110}) {
  const config=LESSONS[lessonNum];
  return (
    <UnifiedLessonExercisesV2
      lessonKey={config.lessonKey}
      audioBase={config.audioBase}
      questions={config.questions}
      missionTitles={config.missionTitles}
      missionCount={4}
      completionMessage={config.completionMessage}
      nextPath={config.nextPath}
      nextLabel="الدَّرْسُ التَّالِي"
      renderActivity={renderActivity}
    />
  );
}

export const Lesson86GeometryExercises=()=> <GeometryLesson lessonNum={86}/>;
export const Lesson93GeometryExercises=()=> <GeometryLesson lessonNum={93}/>;

export const Lesson100GeometryExercises=()=> <GeometryLesson lessonNum={100}/>;
export const Lesson110GeometryExercises=()=> <GeometryLesson lessonNum={110}/>;
