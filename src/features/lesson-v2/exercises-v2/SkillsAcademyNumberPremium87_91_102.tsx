import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import NumberPremiumSkillLabV2, {
  type NumberPremiumSkillActivityV2,
} from "./NumberPremiumSkillLabV2";

type NumberSkillQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    numberSkill:NumberPremiumSkillActivityV2;
  };

type LessonConfig = {
  lessonKey:string;
  audioBase:string;
  questions:NumberSkillQuestion[];
  missionTitles:Record<number,string>;
  nextPath:string;
  completionMessage:string;
};

const LESSONS = ({
  "87": {
    "lessonKey": "lesson87",
    "audioBase": "/audio/teachers/taline/lesson_87_complement_next_ten/exercises",
    "questions": [
      {
        "id": "l87_ex1_q1",
        "mission": 1,
        "prompt": "مَا الْعَشَرَةُ الْمُوَالِيَةُ لِلْعَدَدِ 23؟",
        "audioKey": "l87_ex1_q1",
        "numberSkill": {
          "mode": "nextTen",
          "start": 23,
          "target": 30,
          "choices": [
            20,
            40,
            30,
            50
          ]
        }
      },
      {
        "id": "l87_ex1_q2",
        "mission": 1,
        "prompt": "مَا الْعَشَرَةُ الْمُوَالِيَةُ لِلْعَدَدِ 47؟",
        "audioKey": "l87_ex1_q2",
        "numberSkill": {
          "mode": "nextTen",
          "start": 47,
          "target": 50,
          "choices": [
            50,
            40,
            60,
            70
          ]
        }
      },
      {
        "id": "l87_ex1_q3",
        "mission": 1,
        "prompt": "مَا الْعَشَرَةُ الْمُوَالِيَةُ لِلْعَدَدِ 61؟",
        "audioKey": "l87_ex1_q3",
        "numberSkill": {
          "mode": "nextTen",
          "start": 61,
          "target": 70,
          "choices": [
            60,
            80,
            90,
            70
          ]
        }
      },
      {
        "id": "l87_ex1_q4",
        "mission": 1,
        "prompt": "مَا الْعَشَرَةُ الْمُوَالِيَةُ لِلْعَدَدِ 88؟",
        "audioKey": "l87_ex1_q4",
        "numberSkill": {
          "mode": "nextTen",
          "start": 88,
          "target": 90,
          "choices": [
            80,
            90,
            100,
            110
          ]
        }
      },
      {
        "id": "l87_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ إِلَى 23 لِنَصِلَ إِلَى 30؟",
        "audioKey": "l87_ex2_q1",
        "numberSkill": {
          "mode": "lineGap",
          "start": 23,
          "target": 30,
          "answer": 7,
          "choices": [
            6,
            7,
            8,
            3
          ]
        }
      },
      {
        "id": "l87_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ إِلَى 47 لِنَصِلَ إِلَى 50؟",
        "audioKey": "l87_ex2_q2",
        "numberSkill": {
          "mode": "lineGap",
          "start": 47,
          "target": 50,
          "answer": 3,
          "choices": [
            2,
            4,
            7,
            3
          ]
        }
      },
      {
        "id": "l87_ex2_q3",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ إِلَى 64 لِنَصِلَ إِلَى 70؟",
        "audioKey": "l87_ex2_q3",
        "numberSkill": {
          "mode": "lineGap",
          "start": 64,
          "target": 70,
          "answer": 6,
          "choices": [
            6,
            5,
            7,
            4
          ]
        }
      },
      {
        "id": "l87_ex2_q4",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ إِلَى 88 لِنَصِلَ إِلَى 90؟",
        "audioKey": "l87_ex2_q4",
        "numberSkill": {
          "mode": "lineGap",
          "start": 88,
          "target": 90,
          "answer": 2,
          "choices": [
            1,
            3,
            2,
            8
          ]
        }
      },
      {
        "id": "l87_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلِ الْعَشَرَةَ: كَمْ وَحْدَةً نَحْتَاجُ بَعْدَ 26؟",
        "audioKey": "l87_ex3_q1",
        "numberSkill": {
          "mode": "tenStripGap",
          "start": 26,
          "target": 30,
          "answer": 4,
          "choices": [
            2,
            6,
            6,
            4
          ]
        }
      },
      {
        "id": "l87_ex3_q2",
        "mission": 3,
        "prompt": "أَكْمِلِ الْعَشَرَةَ: كَمْ وَحْدَةً نَحْتَاجُ بَعْدَ 53؟",
        "audioKey": "l87_ex3_q2",
        "numberSkill": {
          "mode": "tenStripGap",
          "start": 53,
          "target": 60,
          "answer": 7,
          "choices": [
            5,
            7,
            9,
            3
          ]
        }
      },
      {
        "id": "l87_ex3_q3",
        "mission": 3,
        "prompt": "أَكْمِلِ الْعَشَرَةَ: كَمْ وَحْدَةً نَحْتَاجُ بَعْدَ 72؟",
        "audioKey": "l87_ex3_q3",
        "numberSkill": {
          "mode": "tenStripGap",
          "start": 72,
          "target": 80,
          "answer": 8,
          "choices": [
            6,
            9,
            8,
            2
          ]
        }
      },
      {
        "id": "l87_ex3_q4",
        "mission": 3,
        "prompt": "أَكْمِلِ الْعَشَرَةَ: كَمْ وَحْدَةً نَحْتَاجُ بَعْدَ 95؟",
        "audioKey": "l87_ex3_q4",
        "numberSkill": {
          "mode": "tenStripGap",
          "start": 95,
          "target": 100,
          "answer": 5,
          "choices": [
            5,
            3,
            7
          ]
        }
      },
      {
        "id": "l87_ex4_q1",
        "mission": 4,
        "prompt": "تَقَدَّمْ خُطْوَةً خُطْوَةً مِنْ 34 حَتَّى 40.",
        "audioKey": "l87_ex4_q1",
        "numberSkill": {
          "mode": "tapSteps",
          "start": 34,
          "target": 40
        }
      },
      {
        "id": "l87_ex4_q2",
        "mission": 4,
        "prompt": "تَقَدَّمْ خُطْوَةً خُطْوَةً مِنْ 58 حَتَّى 60.",
        "audioKey": "l87_ex4_q2",
        "numberSkill": {
          "mode": "tapSteps",
          "start": 58,
          "target": 60
        }
      },
      {
        "id": "l87_ex4_q3",
        "mission": 4,
        "prompt": "تَقَدَّمْ خُطْوَةً خُطْوَةً مِنْ 76 حَتَّى 80.",
        "audioKey": "l87_ex4_q3",
        "numberSkill": {
          "mode": "tapSteps",
          "start": 76,
          "target": 80
        }
      },
      {
        "id": "l87_ex4_q4",
        "mission": 4,
        "prompt": "تَقَدَّمْ خُطْوَةً خُطْوَةً مِنْ 93 حَتَّى 100.",
        "audioKey": "l87_ex4_q4",
        "numberSkill": {
          "mode": "tapSteps",
          "start": 93,
          "target": 100
        }
      }
    ],
    "missionTitles": {
      "1": "أَجِدُ الْعَشَرَةَ الْمُوَالِيَةَ",
      "2": "أَحْسِبُ الْمُتَمِّمَ",
      "3": "أُكْمِلُ شَرِيطَ الْعَشَرَةِ",
      "4": "أَتَقَدَّمُ خُطْوَةً خُطْوَةً"
    },
    "nextPath": "/lesson-v2/88",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "91": {
    "lessonKey": "lesson91",
    "audioBase": "/audio/teachers/taline/lesson_91_mental_calculation_3/exercises",
    "questions": [
      {
        "id": "l91_ex1_q1",
        "mission": 1,
        "prompt": "قَبْلَ أَنْ نَجْمَعَ، إِلَى أَيِّ عَشَرَةٍ نَصِلُ بَعْدَ 23؟",
        "audioKey": "l91_ex1_q1",
        "numberSkill": {
          "mode": "nextTen",
          "start": 23,
          "target": 30,
          "choices": [
            20,
            30,
            40,
            10
          ]
        }
      },
      {
        "id": "l91_ex1_q2",
        "mission": 1,
        "prompt": "قَبْلَ أَنْ نَجْمَعَ، إِلَى أَيِّ عَشَرَةٍ نَصِلُ بَعْدَ 76؟",
        "audioKey": "l91_ex1_q2",
        "numberSkill": {
          "mode": "nextTen",
          "start": 76,
          "target": 80,
          "choices": [
            70,
            90,
            60,
            80
          ]
        }
      },
      {
        "id": "l91_ex1_q3",
        "mission": 1,
        "prompt": "قَبْلَ أَنْ نَجْمَعَ، إِلَى أَيِّ عَشَرَةٍ نَصِلُ بَعْدَ 14؟",
        "audioKey": "l91_ex1_q3",
        "numberSkill": {
          "mode": "nextTen",
          "start": 14,
          "target": 20,
          "choices": [
            20,
            10,
            30,
            10
          ]
        }
      },
      {
        "id": "l91_ex1_q4",
        "mission": 1,
        "prompt": "قَبْلَ أَنْ نَجْمَعَ، إِلَى أَيِّ عَشَرَةٍ نَصِلُ بَعْدَ 36؟",
        "audioKey": "l91_ex1_q4",
        "numberSkill": {
          "mode": "nextTen",
          "start": 36,
          "target": 40,
          "choices": [
            30,
            50,
            40,
            20
          ]
        }
      },
      {
        "id": "l91_ex2_q1",
        "mission": 2,
        "prompt": "فِي 23 + 8، كَمْ نَأْخُذُ أَوَّلًا مِنْ 8 لِنَصِلَ إِلَى 30؟",
        "audioKey": "l91_ex2_q1",
        "numberSkill": {
          "mode": "splitAddend",
          "start": 23,
          "addend": 8,
          "target": 30,
          "first": 7,
          "choices": [
            6,
            8,
            7,
            1
          ]
        }
      },
      {
        "id": "l91_ex2_q2",
        "mission": 2,
        "prompt": "فِي 76 + 9، كَمْ نَأْخُذُ أَوَّلًا مِنْ 9 لِنَصِلَ إِلَى 80؟",
        "audioKey": "l91_ex2_q2",
        "numberSkill": {
          "mode": "splitAddend",
          "start": 76,
          "addend": 9,
          "target": 80,
          "first": 4,
          "choices": [
            4,
            3,
            5,
            5
          ]
        }
      },
      {
        "id": "l91_ex2_q3",
        "mission": 2,
        "prompt": "فِي 14 + 7، كَمْ نَأْخُذُ أَوَّلًا مِنْ 7 لِنَصِلَ إِلَى 20؟",
        "audioKey": "l91_ex2_q3",
        "numberSkill": {
          "mode": "splitAddend",
          "start": 14,
          "addend": 7,
          "target": 20,
          "first": 6,
          "choices": [
            5,
            7,
            1,
            6
          ]
        }
      },
      {
        "id": "l91_ex2_q4",
        "mission": 2,
        "prompt": "فِي 36 + 7، كَمْ نَأْخُذُ أَوَّلًا مِنْ 7 لِنَصِلَ إِلَى 40؟",
        "audioKey": "l91_ex2_q4",
        "numberSkill": {
          "mode": "splitAddend",
          "start": 36,
          "addend": 7,
          "target": 40,
          "first": 4,
          "choices": [
            3,
            4,
            5,
            3
          ]
        }
      },
      {
        "id": "l91_ex3_q1",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى 23 لِنَصِلَ أَوَّلًا إِلَى 30؟",
        "audioKey": "l91_ex3_q1",
        "numberSkill": {
          "mode": "bridgeGap",
          "start": 23,
          "addend": 8,
          "target": 30,
          "answer": 7,
          "choices": [
            7,
            5,
            9,
            1
          ]
        }
      },
      {
        "id": "l91_ex3_q2",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى 76 لِنَصِلَ أَوَّلًا إِلَى 80؟",
        "audioKey": "l91_ex3_q2",
        "numberSkill": {
          "mode": "bridgeGap",
          "start": 76,
          "addend": 9,
          "target": 80,
          "answer": 4,
          "choices": [
            2,
            6,
            4,
            5
          ]
        }
      },
      {
        "id": "l91_ex3_q3",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى 14 لِنَصِلَ أَوَّلًا إِلَى 20؟",
        "audioKey": "l91_ex3_q3",
        "numberSkill": {
          "mode": "bridgeGap",
          "start": 14,
          "addend": 7,
          "target": 20,
          "answer": 6,
          "choices": [
            4,
            6,
            8,
            1
          ]
        }
      },
      {
        "id": "l91_ex3_q4",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى 36 لِنَصِلَ أَوَّلًا إِلَى 40؟",
        "audioKey": "l91_ex3_q4",
        "numberSkill": {
          "mode": "bridgeGap",
          "start": 36,
          "addend": 7,
          "target": 40,
          "answer": 4,
          "choices": [
            2,
            6,
            3,
            4
          ]
        }
      },
      {
        "id": "l91_ex4_q1",
        "mission": 4,
        "prompt": "اِسْتَعْمِلْ الْعَشَرَةَ الْمُوَالِيَةَ لِحِسَابِ 23 + 8.",
        "audioKey": "l91_ex4_q1",
        "numberSkill": {
          "mode": "finalOperation",
          "start": 23,
          "addend": 8,
          "target": 30,
          "bridge": 7,
          "remainder": 1,
          "answer": 31,
          "choices": [
            30,
            32,
            38,
            31
          ]
        }
      },
      {
        "id": "l91_ex4_q2",
        "mission": 4,
        "prompt": "اِسْتَعْمِلْ الْعَشَرَةَ الْمُوَالِيَةَ لِحِسَابِ 76 + 9.",
        "audioKey": "l91_ex4_q2",
        "numberSkill": {
          "mode": "finalOperation",
          "start": 76,
          "addend": 9,
          "target": 80,
          "bridge": 4,
          "remainder": 5,
          "answer": 85,
          "choices": [
            84,
            85,
            86,
            89
          ]
        }
      },
      {
        "id": "l91_ex4_q3",
        "mission": 4,
        "prompt": "اِسْتَعْمِلْ الْعَشَرَةَ الْمُوَالِيَةَ لِحِسَابِ 14 + 7.",
        "audioKey": "l91_ex4_q3",
        "numberSkill": {
          "mode": "finalOperation",
          "start": 14,
          "addend": 7,
          "target": 20,
          "bridge": 6,
          "remainder": 1,
          "answer": 21,
          "choices": [
            21,
            20,
            22,
            27
          ]
        }
      },
      {
        "id": "l91_ex4_q4",
        "mission": 4,
        "prompt": "اِسْتَعْمِلْ الْعَشَرَةَ الْمُوَالِيَةَ لِحِسَابِ 36 + 7.",
        "audioKey": "l91_ex4_q4",
        "numberSkill": {
          "mode": "finalOperation",
          "start": 36,
          "addend": 7,
          "target": 40,
          "bridge": 4,
          "remainder": 3,
          "answer": 43,
          "choices": [
            42,
            44,
            43,
            47
          ]
        }
      }
    ],
    "missionTitles": {
      "1": "أُحَدِّدُ الْعَشَرَةَ",
      "2": "أُفَكِّكُ الْعَدَدَ",
      "3": "أَبْنِي الْجِسْرَ إِلَى الْعَشَرَةِ",
      "4": "أَحْسِبُ بِتَمَعُّنٍ"
    },
    "nextPath": "/lesson-v2/92",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "102": {
    "lessonKey": "lesson102",
    "audioBase": "/audio/teachers/khalil/lesson_102_numbers_to_99_2/exercises",
    "questions": [
      {
        "id": "l102_ex1_q1",
        "mission": 1,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟",
        "audioKey": "l102_ex1_q1",
        "numberSkill": {
          "mode": "compareCards",
          "values": [
            72,
            68
          ],
          "want": "larger",
          "answer": 72
        }
      },
      {
        "id": "l102_ex1_q2",
        "mission": 1,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟",
        "audioKey": "l102_ex1_q2",
        "numberSkill": {
          "mode": "compareCards",
          "values": [
            93,
            89
          ],
          "want": "larger",
          "answer": 93
        }
      },
      {
        "id": "l102_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟",
        "audioKey": "l102_ex1_q3",
        "numberSkill": {
          "mode": "compareCards",
          "values": [
            56,
            65
          ],
          "want": "larger",
          "answer": 65
        }
      },
      {
        "id": "l102_ex1_q4",
        "mission": 1,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟",
        "audioKey": "l102_ex1_q4",
        "numberSkill": {
          "mode": "compareCards",
          "values": [
            78,
            87
          ],
          "want": "larger",
          "answer": 87
        }
      },
      {
        "id": "l102_ex2_q1",
        "mission": 2,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَصْغَرُ؟ اُنْظُرْ إِلَى الْعَشَرَاتِ ثُمَّ الْوَحَدَاتِ.",
        "audioKey": "l102_ex2_q1",
        "numberSkill": {
          "mode": "placeValueCompare",
          "values": [
            79,
            74
          ],
          "want": "smaller",
          "answer": 74
        }
      },
      {
        "id": "l102_ex2_q2",
        "mission": 2,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَصْغَرُ؟ اُنْظُرْ إِلَى الْعَشَرَاتِ ثُمَّ الْوَحَدَاتِ.",
        "audioKey": "l102_ex2_q2",
        "numberSkill": {
          "mode": "placeValueCompare",
          "values": [
            92,
            89
          ],
          "want": "smaller",
          "answer": 89
        }
      },
      {
        "id": "l102_ex2_q3",
        "mission": 2,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَصْغَرُ؟ اُنْظُرْ إِلَى الْعَشَرَاتِ ثُمَّ الْوَحَدَاتِ.",
        "audioKey": "l102_ex2_q3",
        "numberSkill": {
          "mode": "placeValueCompare",
          "values": [
            36,
            63
          ],
          "want": "smaller",
          "answer": 36
        }
      },
      {
        "id": "l102_ex2_q4",
        "mission": 2,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَصْغَرُ؟ اُنْظُرْ إِلَى الْعَشَرَاتِ ثُمَّ الْوَحَدَاتِ.",
        "audioKey": "l102_ex2_q4",
        "numberSkill": {
          "mode": "placeValueCompare",
          "values": [
            58,
            85
          ],
          "want": "smaller",
          "answer": 58
        }
      },
      {
        "id": "l102_ex3_q1",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ الْمُتَتَالِيَةَ؟",
        "audioKey": "l102_ex3_q1",
        "numberSkill": {
          "mode": "sequenceGap",
          "sequence": [
            71,
            72,
            null,
            74
          ],
          "answer": 73,
          "choices": [
            72,
            73,
            75,
            76
          ]
        }
      },
      {
        "id": "l102_ex3_q2",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ الْمُتَتَالِيَةَ؟",
        "audioKey": "l102_ex3_q2",
        "numberSkill": {
          "mode": "sequenceGap",
          "sequence": [
            86,
            null,
            88,
            89
          ],
          "answer": 87,
          "choices": [
            87,
            85,
            90,
            88
          ]
        }
      },
      {
        "id": "l102_ex3_q3",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ الْمُتَتَالِيَةَ؟",
        "audioKey": "l102_ex3_q3",
        "numberSkill": {
          "mode": "sequenceGap",
          "sequence": [
            92,
            93,
            null,
            95
          ],
          "answer": 94,
          "choices": [
            91,
            96,
            94,
            93
          ]
        }
      },
      {
        "id": "l102_ex3_q4",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ الْمُتَتَالِيَةَ؟",
        "audioKey": "l102_ex3_q4",
        "numberSkill": {
          "mode": "sequenceGap",
          "sequence": [
            96,
            97,
            98,
            null
          ],
          "answer": 99,
          "choices": [
            95,
            90,
            98,
            99
          ]
        }
      },
      {
        "id": "l102_ex4_q1",
        "mission": 4,
        "prompt": "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        "audioKey": "l102_ex4_q1",
        "numberSkill": {
          "mode": "orderTap",
          "values": [
            84,
            79,
            91,
            86
          ],
          "direction": "asc"
        }
      },
      {
        "id": "l102_ex4_q2",
        "mission": 4,
        "prompt": "رَتِّبِ الْأَعْدَادَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",
        "audioKey": "l102_ex4_q2",
        "numberSkill": {
          "mode": "orderTap",
          "values": [
            63,
            88,
            72,
            95
          ],
          "direction": "desc"
        }
      },
      {
        "id": "l102_ex4_q3",
        "mission": 4,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ الْعَدَدُ 84؟",
        "audioKey": "l102_ex4_q3",
        "numberSkill": {
          "mode": "tenBracket",
          "value": 84,
          "pairs": [
            [
              70,
              80
            ],
            [
              80,
              90
            ],
            [
              90,
              100
            ]
          ],
          "answer": 1
        }
      },
      {
        "id": "l102_ex4_q4",
        "mission": 4,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ الْعَدَدُ 93؟",
        "audioKey": "l102_ex4_q4",
        "numberSkill": {
          "mode": "tenBracket",
          "value": 93,
          "pairs": [
            [
              90,
              100
            ],
            [
              80,
              90
            ],
            [
              70,
              80
            ]
          ],
          "answer": 0
        }
      }
    ],
    "missionTitles": {
      "1": "أُقَارِنُ الْأَكْبَرَ",
      "2": "أُقَارِنُ الْأَصْغَرَ",
      "3": "أُكْمِلُ الْمُتَتَالِيَةَ",
      "4": "أُرَتِّبُ وَأَحْصُرُ"
    },
    "nextPath": "/lesson-v2/103",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  }
}) as unknown as Record<number,LessonConfig>;

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}:UnifiedLessonExerciseRenderContextV2<NumberSkillQuestion>) {
  return (
    <NumberPremiumSkillLabV2
      activity={question.numberSkill}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

function NumberSkillLesson({
  lessonNum,
}:{
  lessonNum:87|91|102;
}) {
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

export const Lesson87NumberPremiumExercises =
  ()=><NumberSkillLesson lessonNum={87}/>;

export const Lesson91NumberPremiumExercises =
  ()=><NumberSkillLesson lessonNum={91}/>;

export const Lesson102NumberPremiumExercises =
  ()=><NumberSkillLesson lessonNum={102}/>;
