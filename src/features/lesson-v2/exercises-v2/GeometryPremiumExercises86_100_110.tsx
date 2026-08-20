import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseRenderContextV2,
  type UnifiedLessonExerciseQuestionV2,
} from "./UnifiedLessonExercisesV2";

type GeometryOption = {
  id: string;
  icon: string;
  label: string;
};

type GeometryQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    visualSymbol: string;
    visualLabel: string;
    visualAsset: string;
    premiumIconChoice: {
      options: GeometryOption[];
      correctId: string;
    };
  };

type LessonConfig = {
  lessonKey: string;
  audioBase: string;
  questions: GeometryQuestion[];
  missionTitles: Record<number, string>;
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
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُكَعَّبٌ",
              "icon": "cube"
            },
            {
              "id": "o2",
              "label": "بِلَاطَةٌ قَائِمَةٌ",
              "icon": "rectangular-prism"
            },
            {
              "id": "o3",
              "label": "كُرَةٌ",
              "icon": "sphere"
            },
            {
              "id": "o4",
              "label": "أُسْطُوَانَةٌ",
              "icon": "cylinder"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l86_ex1_q2",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الْمُجَسَّمِ؟",
        "audioKey": "l86_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "rectangular-prism",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُكَعَّبٌ",
              "icon": "cube"
            },
            {
              "id": "o2",
              "label": "بِلَاطَةٌ قَائِمَةٌ",
              "icon": "rectangular-prism"
            },
            {
              "id": "o3",
              "label": "كُرَةٌ",
              "icon": "sphere"
            },
            {
              "id": "o4",
              "label": "أُسْطُوَانَةٌ",
              "icon": "cylinder"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l86_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ مُجَسَّمٍ يُشْبِهُ النَّرْدَ؟",
        "audioKey": "l86_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "die",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكُرَةُ",
              "icon": "sphere"
            },
            {
              "id": "o2",
              "label": "الْبِلَاطَةُ الْقَائِمَةُ",
              "icon": "rectangular-prism"
            },
            {
              "id": "o3",
              "label": "الْمُكَعَّبُ",
              "icon": "cube"
            },
            {
              "id": "o4",
              "label": "الْأُسْطُوَانَةُ",
              "icon": "cylinder"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l86_ex1_q4",
        "mission": 1,
        "prompt": "أَيُّ مُجَسَّمٍ يُشْبِهُ هَذَا الصُّنْدُوقَ؟",
        "audioKey": "l86_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "box",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْأُسْطُوَانَةُ",
              "icon": "cylinder"
            },
            {
              "id": "o2",
              "label": "الْمُكَعَّبُ",
              "icon": "cube"
            },
            {
              "id": "o3",
              "label": "الْكُرَةُ",
              "icon": "sphere"
            },
            {
              "id": "o4",
              "label": "الْبِلَاطَةُ الْقَائِمَةُ",
              "icon": "rectangular-prism"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l86_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ أَوْجُهِ الْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o3",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o4",
              "label": "12",
              "icon": "num-12"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l86_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ رُؤُوسِ الْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o3",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o4",
              "label": "12",
              "icon": "num-12"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l86_ex2_q3",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ أَحْرُفِ الْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o3",
              "label": "12",
              "icon": "num-12"
            },
            {
              "id": "o4",
              "label": "4",
              "icon": "num-4"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l86_ex2_q4",
        "mission": 2,
        "prompt": "مَاذَا يُمَيِّزُ أَوْجُهَ الْمُكَعَّبِ؟",
        "audioKey": "l86_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُسْتَطِيلٌ وَاحِدٌ",
              "icon": "rectangle"
            },
            {
              "id": "o2",
              "label": "دَوَائِرُ",
              "icon": "circle"
            },
            {
              "id": "o3",
              "label": "مُثَلَّثَاتٌ",
              "icon": "triangle"
            },
            {
              "id": "o4",
              "label": "مُرَبَّعَاتٌ مُتَسَاوِيَةٌ",
              "icon": "square"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l86_ex3_q1",
        "mission": 3,
        "prompt": "صَنِّفِ النَّرْدَ: إِلَى أَيِّ مُجَسَّمٍ يَنْتَمِي؟",
        "audioKey": "l86_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "visualAsset": "die",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُكَعَّبٌ",
              "icon": "cube"
            },
            {
              "id": "o2",
              "label": "بِلَاطَةٌ قَائِمَةٌ",
              "icon": "rectangular-prism"
            },
            {
              "id": "o3",
              "label": "كُرَةٌ",
              "icon": "sphere"
            },
            {
              "id": "o4",
              "label": "أُسْطُوَانَةٌ",
              "icon": "cylinder"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l86_ex3_q2",
        "mission": 3,
        "prompt": "صَنِّفْ هَذَا الصُّنْدُوقَ: إِلَى أَيِّ مُجَسَّمٍ يَنْتَمِي؟",
        "audioKey": "l86_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "visualAsset": "box",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُكَعَّبٌ",
              "icon": "cube"
            },
            {
              "id": "o2",
              "label": "بِلَاطَةٌ قَائِمَةٌ",
              "icon": "rectangular-prism"
            },
            {
              "id": "o3",
              "label": "كُرَةٌ",
              "icon": "sphere"
            },
            {
              "id": "o4",
              "label": "أُسْطُوَانَةٌ",
              "icon": "cylinder"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l86_ex3_q3",
        "mission": 3,
        "prompt": "أَيُّ عِبَارَةٍ صَحِيحَةٌ عَنِ الْمُكَعَّبِ؟",
        "audioKey": "l86_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "لَهُ وَجْهٌ وَاحِدٌ",
              "icon": "num-0"
            },
            {
              "id": "o2",
              "label": "لَهُ 3 أَوْجُهٍ",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "لَهُ 6 أَوْجُهٍ",
              "icon": "num-6"
            },
            {
              "id": "o4",
              "label": "لَا رُؤُوسَ لَهُ",
              "icon": "num-0"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l86_ex3_q4",
        "mission": 3,
        "prompt": "أَيُّ عِبَارَةٍ صَحِيحَةٌ عَنِ الْبِلَاطَةِ الْقَائِمَةِ؟",
        "audioKey": "l86_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "visualAsset": "rectangular-prism",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "لَهَا وَجْهٌ وَاحِدٌ",
              "icon": "num-0"
            },
            {
              "id": "o2",
              "label": "لَهَا 3 أَوْجُهٍ",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "لَا رُؤُوسَ لَهَا",
              "icon": "num-0"
            },
            {
              "id": "o4",
              "label": "لَهَا 6 أَوْجُهٍ",
              "icon": "num-6"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l86_ex4_q1",
        "mission": 4,
        "prompt": "أَكْمِلْ: لِلْمُكَعَّبِ ... أَوْجُهٍ.",
        "audioKey": "l86_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o3",
              "label": "12",
              "icon": "num-12"
            },
            {
              "id": "o4",
              "label": "4",
              "icon": "num-4"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l86_ex4_q2",
        "mission": 4,
        "prompt": "أَكْمِلْ: لِلْمُكَعَّبِ ... رُؤُوسٍ.",
        "audioKey": "l86_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o3",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o4",
              "label": "12",
              "icon": "num-12"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l86_ex4_q3",
        "mission": 4,
        "prompt": "أَكْمِلْ: لِلْمُكَعَّبِ ... حَرْفًا.",
        "audioKey": "l86_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "cube",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "8",
              "icon": "num-8"
            },
            {
              "id": "o3",
              "label": "12",
              "icon": "num-12"
            },
            {
              "id": "o4",
              "label": "4",
              "icon": "num-4"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l86_ex4_q4",
        "mission": 4,
        "prompt": "مَا الْمُجَسَّمَانِ اللَّذَانِ لَهُمَا 6 أَوْجُهٍ وَ8 رُؤُوسٍ وَ12 حَرْفًا؟",
        "audioKey": "l86_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "shape-group",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمُرَبَّعُ وَالدَّائِرَةُ",
              "icon": "square+circle"
            },
            {
              "id": "o2",
              "label": "الْكُرَةُ وَالْأُسْطُوَانَةُ",
              "icon": "sphere+cylinder"
            },
            {
              "id": "o3",
              "label": "الدَّائِرَةُ وَالْمُثَلَّثُ",
              "icon": "circle+triangle"
            },
            {
              "id": "o4",
              "label": "الْمُكَعَّبُ وَالْبِلَاطَةُ الْقَائِمَةُ",
              "icon": "cube+rectangular-prism"
            }
          ],
          "correctId": "o4"
        }
      }
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُصَنِّفُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "nextPath": "/lesson-v2/87",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
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
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "circle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l100_ex1_q2",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l100_ex1_q3",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o2",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            },
            {
              "id": "o3",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l100_ex1_q4",
        "mission": 1,
        "prompt": "مَا اسْمُ هَذَا الشَّكْلِ؟",
        "audioKey": "l100_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "visualAsset": "rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o3",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l100_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ أَضْلَاعِ الْمُثَلَّثِ؟",
        "audioKey": "l100_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَصِفُ",
        "visualAsset": "triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "3",
              "icon": "num-3"
            },
            {
              "id": "o2",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o3",
              "label": "0",
              "icon": "num-0"
            },
            {
              "id": "o4",
              "label": "6",
              "icon": "num-6"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l100_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ رُؤُوسِ الْمُثَلَّثِ؟",
        "audioKey": "l100_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَصِفُ",
        "visualAsset": "triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o2",
              "label": "3",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "0",
              "icon": "num-0"
            },
            {
              "id": "o4",
              "label": "6",
              "icon": "num-6"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l100_ex2_q3",
        "mission": 2,
        "prompt": "كَمْ عَدَدُ أَضْلَاعِ الْمُرَبَّعِ؟",
        "audioKey": "l100_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَصِفُ",
        "visualAsset": "square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "0",
              "icon": "num-0"
            },
            {
              "id": "o2",
              "label": "3",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o4",
              "label": "6",
              "icon": "num-6"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l100_ex2_q4",
        "mission": 2,
        "prompt": "مَاذَا نَقُولُ عَنْ أَضْلَاعِ الْمُرَبَّعِ؟",
        "audioKey": "l100_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَصِفُ",
        "visualAsset": "square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "ضِلْعٌ وَاحِدٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o2",
              "label": "ثَلَاثَةُ أَضْلَاعٍ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "لَا أَضْلَاعَ لَهُ",
              "icon": "circle"
            },
            {
              "id": "o4",
              "label": "أَرْبَعَةُ أَضْلَاعٍ مُتَسَاوِيَةٍ",
              "icon": "square"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l100_ex3_q1",
        "mission": 3,
        "prompt": "أَيُّ شَكْلٍ لَا أَضْلَاعَ وَلَا رُؤُوسَ لَهُ؟",
        "audioKey": "l100_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "circle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "الْمُرَبَّعُ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "الْمُسْتَطِيلُ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l100_ex3_q2",
        "mission": 3,
        "prompt": "أَيُّ شَكْلٍ لَهُ ثَلَاثَةُ أَضْلَاعٍ؟",
        "audioKey": "l100_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "الْمُرَبَّعُ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "الْمُسْتَطِيلُ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l100_ex3_q3",
        "mission": 3,
        "prompt": "أَيُّ شَكْلٍ لَهُ أَرْبَعَةُ أَضْلَاعٍ مُتَسَاوِيَةٍ؟",
        "audioKey": "l100_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o2",
              "label": "الْمُسْتَطِيلُ",
              "icon": "rectangle"
            },
            {
              "id": "o3",
              "label": "الْمُرَبَّعُ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l100_ex3_q4",
        "mission": 3,
        "prompt": "أَيُّ شَكْلٍ لَهُ أَرْبَعَةُ أَضْلَاعٍ وَلَيْسَتْ كُلُّهَا مُتَسَاوِيَةً؟",
        "audioKey": "l100_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "visualAsset": "rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "الْمُرَبَّعُ",
              "icon": "square"
            },
            {
              "id": "o3",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o4",
              "label": "الْمُسْتَطِيلُ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l100_ex4_q1",
        "mission": 4,
        "prompt": "مِمَّ يَتَكَوَّنُ هَذَا الْبَيْتُ؟",
        "audioKey": "l100_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَرْكِّبُ",
        "visualAsset": "house",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُرَبَّعٌ وَمُثَلَّثٌ",
              "icon": "square+triangle"
            },
            {
              "id": "o2",
              "label": "دَائِرَتَانِ",
              "icon": "circle+circle"
            },
            {
              "id": "o3",
              "label": "مُثَلَّثَانِ",
              "icon": "triangle+triangle"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ فَقَطْ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l100_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرِ الشَّكْلَ الَّذِي يُمْكِنُ أَنْ يَكُونَ سَقْفَ الْبَيْتِ.",
        "audioKey": "l100_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَرْكِّبُ",
        "visualAsset": "triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l100_ex4_q3",
        "mission": 4,
        "prompt": "أَكْمِلْ: الدَّائِرَةُ لَهَا ... أَضْلَاعٍ.",
        "audioKey": "l100_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَرْكِّبُ",
        "visualAsset": "circle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "4",
              "icon": "num-4"
            },
            {
              "id": "o2",
              "label": "3",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "0",
              "icon": "num-0"
            },
            {
              "id": "o4",
              "label": "6",
              "icon": "num-6"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l100_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلْ: الْمُسْتَطِيلُ لَهُ ... أَضْلَاعٍ.",
        "audioKey": "l100_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَرْكِّبُ",
        "visualAsset": "rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "6",
              "icon": "num-6"
            },
            {
              "id": "o2",
              "label": "3",
              "icon": "num-3"
            },
            {
              "id": "o3",
              "label": "0",
              "icon": "num-0"
            },
            {
              "id": "o4",
              "label": "4",
              "icon": "num-4"
            }
          ],
          "correctId": "o4"
        }
      }
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أَصِفُ",
      "3": "أُمَيِّزُ",
      "4": "أَرْكِّبُ"
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
        "prompt": "مَا الشَّكْلُ النَّاقِصُ فِي الصُّورَةِ؟",
        "audioKey": "l110_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَكْتَشِفُ",
        "visualAsset": "incomplete-square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l110_ex1_q2",
        "mission": 1,
        "prompt": "مَا الشَّكْلُ النَّاقِصُ فِي الصُّورَةِ؟",
        "audioKey": "l110_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَكْتَشِفُ",
        "visualAsset": "incomplete-triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o3",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o4",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l110_ex1_q3",
        "mission": 1,
        "prompt": "مَا الشَّكْلُ النَّاقِصُ فِي الصُّورَةِ؟",
        "audioKey": "l110_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَكْتَشِفُ",
        "visualAsset": "incomplete-rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُثَلَّثٌ",
              "icon": "triangle"
            },
            {
              "id": "o2",
              "label": "مُرَبَّعٌ",
              "icon": "square"
            },
            {
              "id": "o3",
              "label": "مُسْتَطِيلٌ",
              "icon": "rectangle"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l110_ex1_q4",
        "mission": 1,
        "prompt": "أَيُّ جُزْءٍ نَحْتَاجُهُ لِإِتْمَامِ الْمُرَبَّعِ؟",
        "audioKey": "l110_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَكْتَشِفُ",
        "visualAsset": "incomplete-square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-down"
            },
            {
              "id": "o4",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l110_ex2_q1",
        "mission": 2,
        "prompt": "أَكْمِلِ الْمُرَبَّعَ بِاخْتِيَارِ الْجُزْءِ الْمُنَاسِبِ.",
        "audioKey": "l110_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُتِمُّ",
        "visualAsset": "incomplete-square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-up"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l110_ex2_q2",
        "mission": 2,
        "prompt": "أَكْمِلِ الْمُسْتَطِيلَ بِاخْتِيَارِ الْجُزْءِ الْمُنَاسِبِ.",
        "audioKey": "l110_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُتِمُّ",
        "visualAsset": "incomplete-rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-down"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l110_ex2_q3",
        "mission": 2,
        "prompt": "أَكْمِلِ الْمُثَلَّثَ بِاخْتِيَارِ الْجُزْءِ الْمُنَاسِبِ.",
        "audioKey": "l110_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُتِمُّ",
        "visualAsset": "incomplete-triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-down"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l110_ex2_q4",
        "mission": 2,
        "prompt": "أَيُّ جُزْءٍ يُتِمُّ هَذَا الْمُسْتَطِيلَ؟",
        "audioKey": "l110_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُتِمُّ",
        "visualAsset": "incomplete-rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-up"
            },
            {
              "id": "o4",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l110_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرِ الْجُزْءَ الَّذِي يُغْلِقُ الْجَانِبَ الْمَفْتُوحَ مِنَ الْمُرَبَّعِ.",
        "audioKey": "l110_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَخْتَارُ الْجُزْءَ",
        "visualAsset": "incomplete-square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-down"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l110_ex3_q2",
        "mission": 3,
        "prompt": "اِخْتَرِ الْجُزْءَ الَّذِي يُغْلِقُ الْجَانِبَ السُّفْلِيَّ مِنَ الْمُسْتَطِيلِ.",
        "audioKey": "l110_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَخْتَارُ الْجُزْءَ",
        "visualAsset": "incomplete-rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-up"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l110_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرِ الْجُزْءَ الَّذِي يُتِمُّ الضِّلْعَ الْمَائِلَ لِلْمُثَلَّثِ.",
        "audioKey": "l110_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَخْتَارُ الْجُزْءَ",
        "visualAsset": "incomplete-triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ عَمُودِيَّةٌ",
              "icon": "vertical-segment"
            },
            {
              "id": "o2",
              "label": "قِطْعَةٌ أُفُقِيَّةٌ",
              "icon": "horizontal-segment"
            },
            {
              "id": "o3",
              "label": "قِطْعَةٌ مَائِلَةٌ",
              "icon": "diag-down"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l110_ex3_q4",
        "mission": 3,
        "prompt": "بَعْدَ إِضَافَةِ الْجُزْءِ النَّاقِصِ، مَا الشَّكْلُ الَّذِي نَحْصُلُ عَلَيْهِ؟",
        "audioKey": "l110_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَخْتَارُ الْجُزْءَ",
        "visualAsset": "incomplete-square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "مُثَلَّثٌ",
              "icon": "complete-triangle"
            },
            {
              "id": "o3",
              "label": "مُسْتَطِيلٌ",
              "icon": "complete-rectangle"
            },
            {
              "id": "o4",
              "label": "مُرَبَّعٌ",
              "icon": "complete-square"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l110_ex4_q1",
        "mission": 4,
        "prompt": "بَعْدَ إِضَافَةِ الْجُزْءِ النَّاقِصِ، مَا الشَّكْلُ الَّذِي نَحْصُلُ عَلَيْهِ؟",
        "audioKey": "l110_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "incomplete-triangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُثَلَّثٌ",
              "icon": "complete-triangle"
            },
            {
              "id": "o2",
              "label": "مُرَبَّعٌ",
              "icon": "complete-square"
            },
            {
              "id": "o3",
              "label": "مُسْتَطِيلٌ",
              "icon": "complete-rectangle"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l110_ex4_q2",
        "mission": 4,
        "prompt": "بَعْدَ إِضَافَةِ الْجُزْءِ النَّاقِصِ، مَا الشَّكْلُ الَّذِي نَحْصُلُ عَلَيْهِ؟",
        "audioKey": "l110_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "incomplete-rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُرَبَّعٌ",
              "icon": "complete-square"
            },
            {
              "id": "o2",
              "label": "مُسْتَطِيلٌ",
              "icon": "complete-rectangle"
            },
            {
              "id": "o3",
              "label": "مُثَلَّثٌ",
              "icon": "complete-triangle"
            },
            {
              "id": "o4",
              "label": "دَائِرَةٌ",
              "icon": "circle"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l110_ex4_q3",
        "mission": 4,
        "prompt": "أَيُّ رَسْمٍ يُمَثِّلُ مُرَبَّعًا مُكْتَمِلًا؟",
        "audioKey": "l110_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "square",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o2",
              "label": "الْمُرَبَّعُ النَّاقِصُ",
              "icon": "incomplete-square"
            },
            {
              "id": "o3",
              "label": "الْمُرَبَّعُ الْمُكْتَمِلُ",
              "icon": "complete-square"
            },
            {
              "id": "o4",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l110_ex4_q4",
        "mission": 4,
        "prompt": "أَيُّ رَسْمٍ يُمَثِّلُ مُسْتَطِيلًا مُكْتَمِلًا؟",
        "audioKey": "l110_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "visualAsset": "rectangle",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الدَّائِرَةُ",
              "icon": "circle"
            },
            {
              "id": "o2",
              "label": "الْمُسْتَطِيلُ النَّاقِصُ",
              "icon": "incomplete-rectangle"
            },
            {
              "id": "o3",
              "label": "الْمُثَلَّثُ",
              "icon": "triangle"
            },
            {
              "id": "o4",
              "label": "الْمُسْتَطِيلُ الْمُكْتَمِلُ",
              "icon": "complete-rectangle"
            }
          ],
          "correctId": "o4"
        }
      }
    ],
    "missionTitles": {
      "1": "أَكْتَشِفُ",
      "2": "أُتِمُّ",
      "3": "أَخْتَارُ الْجُزْءَ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "nextPath": "/lesson-v2/111",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  }
} as unknown as Record<number, LessonConfig>;

function assetPath(key: string) {
  return `/lessons/v2/geometry-premium/${key}.webp`;
}

function GoldenWebp({
  assetKey,
  size = 84,
}: {
  assetKey: string;
  size?: number;
}) {
  const keys = String(assetKey)
    .split("+")
    .map(v => v.trim())
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div
      style={{
        width: "100%",
        minHeight: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {keys.map(key => (
        <img
          key={key}
          src={assetPath(key)}
          alt=""
          draggable={false}
          style={{
            width:
              keys.length > 1
                ? Math.round(size * 0.68)
                : size,
            height:
              keys.length > 1
                ? Math.round(size * 0.68)
                : size,
            objectFit: "contain",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}

function GeometryChoice({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<GeometryQuestion>) {
  const block = question.premiumIconChoice;

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 14,
      }}
    >
      <div
        style={{
          minHeight: 130,
          display: "grid",
          placeItems: "center",
          padding: 10,
          borderRadius: 24,
          background: "#F8FBFE",
          border: "2px solid #DFEAF3",
        }}
      >
        <GoldenWebp
          assetKey={question.visualAsset}
          size={112}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: 12,
        }}
      >
        {block.options.map(option => {
          const isCorrect =
            option.id === block.correctId;

          return (
            <button
              key={option.id}
              type="button"
              disabled={locked}
              onClick={() =>
                submitResult(isCorrect)
              }
              style={{
                minHeight: 198,
                padding: "14px 9px",
                borderRadius: 28,
                border:
                  "2px solid #D8E5EE",
                background: "#FFFFFF",
                boxShadow:
                  "0 10px 25px rgba(23,54,95,.08)",
                display: "grid",
                alignContent: "center",
                justifyItems: "center",
                gap: 8,
                fontFamily: "inherit",
              }}
            >
              <GoldenWebp
                assetKey={option.icon}
                size={82}
              />

              <div
                dir="rtl"
                style={{
                  minHeight: 52,
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  color: "#17365F",
                  fontWeight: 900,
                  fontSize:
                    "clamp(17px,4.7vw,25px)",
                  lineHeight: 1.45,
                }}
              >
                {option.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GeometryLessonExercises({
  lessonNum,
}: {
  lessonNum: 86 | 100 | 110;
}) {
  const config = LESSONS[lessonNum];

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
      renderActivity={(
        question,
        context,
      ) => (
        <GeometryChoice
          question={question as GeometryQuestion}
          {...context}
        />
      )}
    />
  );
}

export const Lesson86GeometryExercises =
  () => (
    <GeometryLessonExercises
      lessonNum={86}
    />
  );

export const Lesson100GeometryExercises =
  () => (
    <GeometryLessonExercises
      lessonNum={100}
    />
  );

export const Lesson110GeometryExercises =
  () => (
    <GeometryLessonExercises
      lessonNum={110}
    />
  );
