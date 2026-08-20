
import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import PremiumNumberLabV2, {
  type PremiumNumberLabDataV2,
} from "./PremiumNumberLabV2";

import RevealNumberChoiceLabV2, {
  type RevealNumberChoiceDataV2,
} from "./RevealNumberChoiceLabV2";

import SmallNumberOperationLabV2, {
  type SmallNumberOperationDataV2,
} from "./SmallNumberOperationLabV2";

import PremiumIconChoiceLabV2, {
  type PremiumIconChoiceDataV2,
} from "./PremiumIconChoiceLabV2";


type Mission =
  | 1
  | 2
  | 3
  | 4;


type SkillsNumberQuestion =
  UnifiedLessonExerciseQuestionV2 & {

    mission:
      Mission;

    visualSymbol:
      string;

    visualLabel:
      string;

    numberLab?:
      PremiumNumberLabDataV2;

    revealNumberChoice?:
      RevealNumberChoiceDataV2;

    smallNumberOperation?:
      SmallNumberOperationDataV2;

    premiumIconChoice?:
      PremiumIconChoiceDataV2;
  };


type LessonConfig = {

  lessonKey:
    string;

  audioBase:
    string;

  missionTitles:
    Record<
      Mission,
      string
    >;

  completionMessage:
    string;

  nextPath:
    string;

  questions:
    SkillsNumberQuestion[];
};


const ACADEMY_HOME =
  "/world/"
  + "b3187e1b-58da-441d-ae43-d4be486e7c12";


const ACADEMY_QUIZ =
  ACADEMY_HOME
  + "/quiz";



const LESSONS = {
  "87": {
    "lessonKey": "lesson87",
    "audioBase": "/audio/teachers/taline/lesson_87_complement_next_ten/exercises",
    "missionTitles": {
      "1": "أَجِدُ الْعَشَرَةَ الْمُوَالِيَةَ",
      "2": "أَجِدُ الْمُتَمِّمَ",
      "3": "أُكْمِلُ إِلَى عَشَرَةٍ",
      "4": "أُطَبِّقُ فِي وَضْعِيَّاتٍ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَجِدُ مُتَمِّمَ الْعَدَدِ إِلَى الْعَشَرَةِ الْمُوَالِيَةِ.",
    "nextPath": "/lesson-v2/88",
    "questions": [
      {
        "id": "l87_ex1_q1",
        "mission": 1,
        "prompt": "الْعَدَدُ أَمَامَكَ. مَا الْعَشَرَةُ الْمُوَالِيَةُ؟",
        "audioKey": "l87_ex1_q1",
        "visualSymbol": "🔟",
        "visualLabel": "الْعَدَدُ 43",
        "choices": [
          {
            "id": "o3",
            "content": "60"
          },
          {
            "id": "o4",
            "content": "70"
          },
          {
            "id": "o2",
            "content": "50"
          },
          {
            "id": "o1",
            "content": "40"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 43
        }
      },
      {
        "id": "l87_ex1_q2",
        "mission": 1,
        "prompt": "اُنْظُرْ إِلَى الْعَدَدِ. اِخْتَرِ الْعَشَرَةَ الْمُوَالِيَةَ.",
        "audioKey": "l87_ex1_q2",
        "visualSymbol": "🔟",
        "visualLabel": "الْعَدَدُ 56",
        "choices": [
          {
            "id": "o2",
            "content": "60"
          },
          {
            "id": "o1",
            "content": "50"
          },
          {
            "id": "o3",
            "content": "70"
          },
          {
            "id": "o4",
            "content": "80"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 56
        }
      },
      {
        "id": "l87_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ عَشَرَةٍ تَأْتِي بَعْدَ هَذَا الْعَدَدِ؟",
        "audioKey": "l87_ex1_q3",
        "visualSymbol": "🔟",
        "visualLabel": "الْعَدَدُ 71",
        "choices": [
          {
            "id": "o1",
            "content": "60"
          },
          {
            "id": "o2",
            "content": "70"
          },
          {
            "id": "o4",
            "content": "90"
          },
          {
            "id": "o3",
            "content": "80"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 71
        }
      },
      {
        "id": "l87_ex1_q4",
        "mission": 1,
        "prompt": "ابْحَثْ عَنِ الْعَشَرَةِ الْمُوَالِيَةِ لِهَذَا الْعَدَدِ.",
        "audioKey": "l87_ex1_q4",
        "visualSymbol": "🔟",
        "visualLabel": "الْعَدَدُ 84",
        "choices": [
          {
            "id": "o4",
            "content": "100"
          },
          {
            "id": "o1",
            "content": "70"
          },
          {
            "id": "o2",
            "content": "80"
          },
          {
            "id": "o3",
            "content": "90"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 84
        }
      },
      {
        "id": "l87_ex2_q1",
        "mission": 2,
        "prompt": "الْبِدَايَةُ وَالْهَدَفُ أَمَامَكَ. كَمْ نُضِيفُ؟",
        "audioKey": "l87_ex2_q1",
        "visualSymbol": "🎯",
        "visualLabel": "43 ⟶ 50",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "8",
              "label": "8"
            },
            {
              "id": "o2",
              "icon": "7",
              "label": "7"
            },
            {
              "id": "o1",
              "icon": "6",
              "label": "6"
            },
            {
              "id": "o4",
              "icon": "9",
              "label": "9"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l87_ex2_q2",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ لِنَصِلَ إِلَى الْعَشَرَةِ الْمُوَالِيَةِ؟",
        "audioKey": "l87_ex2_q2",
        "visualSymbol": "🎯",
        "visualLabel": "56 ⟶ 60",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o2",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "5",
              "label": "5"
            },
            {
              "id": "o1",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l87_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَدَدَ الَّذِي يُوصِلُنَا إِلَى الْعَشَرَةِ الْمُوَالِيَةِ.",
        "audioKey": "l87_ex2_q3",
        "visualSymbol": "🎯",
        "visualLabel": "71 ⟶ 80",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "8",
              "label": "8"
            },
            {
              "id": "o1",
              "icon": "7",
              "label": "7"
            },
            {
              "id": "o4",
              "icon": "10",
              "label": "10"
            },
            {
              "id": "o3",
              "icon": "9",
              "label": "9"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l87_ex2_q4",
        "mission": 2,
        "prompt": "مَا الْمُتَمِّمُ الَّذِي نَحْتَاجُ إِلَيْهِ؟",
        "audioKey": "l87_ex2_q4",
        "visualSymbol": "🎯",
        "visualLabel": "84 ⟶ 90",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "7",
              "label": "7"
            },
            {
              "id": "o1",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "6",
              "label": "6"
            },
            {
              "id": "o2",
              "icon": "5",
              "label": "5"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l87_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلْ إِلَى عَشَرَةٍ. اِخْتَرِ الْعَدَدَ الصَّحِيحَ.",
        "audioKey": "l87_ex3_q1",
        "visualSymbol": "🧩",
        "visualLabel": "6 + ؟ = 10",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o4",
              "icon": "5",
              "label": "5"
            },
            {
              "id": "o2",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o1",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l87_ex3_q2",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ الْمَجْمُوعَ إِلَى عَشَرَةٍ؟",
        "audioKey": "l87_ex3_q2",
        "visualSymbol": "🧩",
        "visualLabel": "7 + ؟ = 10",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l87_ex3_q3",
        "mission": 3,
        "prompt": "ابْحَثْ عَنِ الْمُتَمِّمِ إِلَى عَشَرَةٍ.",
        "audioKey": "l87_ex3_q3",
        "visualSymbol": "🧩",
        "visualLabel": "8 + ؟ = 10",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l87_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرِ الْعَدَدَ النَّاقِصَ لِنَصِلَ إِلَى عَشَرَةٍ.",
        "audioKey": "l87_ex3_q4",
        "visualSymbol": "🧩",
        "visualLabel": "9 + ؟ = 10",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l87_ex4_q1",
        "mission": 4,
        "prompt": "لَدَيْكَ مَجْمُوعَةٌ، وَتُرِيدُ بُلُوغَ الْعَشَرَةِ الْمُوَالِيَةِ. كَمْ تُضِيفُ؟",
        "audioKey": "l87_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "27 ⟶ 30",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o4",
              "icon": "5",
              "label": "5"
            },
            {
              "id": "o2",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o1",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l87_ex4_q2",
        "mission": 4,
        "prompt": "الْكُرَاتُ قَرِيبَةٌ مِنَ الْعَشَرَةِ الْمُوَالِيَةِ. كَمْ نَحْتَاجُ؟",
        "audioKey": "l87_ex4_q2",
        "visualSymbol": "⚽",
        "visualLabel": "38 ⟶ 40",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l87_ex4_q3",
        "mission": 4,
        "prompt": "أَكْمِلْ عَدَدَ الْأَقْلَامِ حَتَّى الْعَشَرَةِ الْمُوَالِيَةِ.",
        "audioKey": "l87_ex4_q3",
        "visualSymbol": "✏️",
        "visualLabel": "64 ⟶ 70",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "5",
              "label": "5"
            },
            {
              "id": "o2",
              "icon": "6",
              "label": "6"
            },
            {
              "id": "o4",
              "icon": "8",
              "label": "8"
            },
            {
              "id": "o3",
              "icon": "7",
              "label": "7"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l87_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلْ عَدَدَ الْمُكَعَّبَاتِ حَتَّى الْعَشَرَةِ الْمُوَالِيَةِ.",
        "audioKey": "l87_ex4_q4",
        "visualSymbol": "🧱",
        "visualLabel": "75 ⟶ 80",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "5",
              "label": "5"
            },
            {
              "id": "o4",
              "icon": "6",
              "label": "6"
            }
          ],
          "correctId": "o3"
        }
      }
    ]
  },
  "89": {
    "lessonKey": "lesson89",
    "audioBase": "/audio/teachers/taline/lesson_89_mental_calculation_2/exercises",
    "missionTitles": {
      "1": "أَجْمَعُ بِذَكَاءٍ",
      "2": "أَسْتَعْمِلُ الضِّعْفَ",
      "3": "أَخْتَارُ الطَّرِيقَةَ الْأَنْسَبَ",
      "4": "أَتَحَدَّى نَفْسِي"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَسْتَعْمِلُ طَرَائِقَ سَرِيعَةً فِي الْحِسَابِ الذِّهْنِيِّ.",
    "nextPath": "/lesson-v2/90",
    "questions": [
      {
        "id": "l89_ex1_q1",
        "mission": 1,
        "prompt": "اِجْمَعْ ثَمَانِيَةً وَخَمْسَةً. مَا النَّاتِجُ؟",
        "audioKey": "l89_ex1_q1",
        "visualSymbol": "➕",
        "visualLabel": "8 + 5",
        "smallNumberOperation": {
          "mode": "add",
          "left": 8,
          "right": 5,
          "correctValue": 13,
          "choices": [
            {
              "id": "o1",
              "label": "12",
              "value": 12
            },
            {
              "id": "o3",
              "label": "14",
              "value": 14
            },
            {
              "id": "o2",
              "label": "13",
              "value": 13
            },
            {
              "id": "o4",
              "label": "15",
              "value": 15
            }
          ]
        }
      },
      {
        "id": "l89_ex1_q2",
        "mission": 1,
        "prompt": "اِجْمَعْ سَبْعَةً وَسِتَّةً. مَا النَّاتِجُ؟",
        "audioKey": "l89_ex1_q2",
        "visualSymbol": "➕",
        "visualLabel": "7 + 6",
        "smallNumberOperation": {
          "mode": "add",
          "left": 7,
          "right": 6,
          "correctValue": 13,
          "choices": [
            {
              "id": "o1",
              "label": "11",
              "value": 11
            },
            {
              "id": "o2",
              "label": "12",
              "value": 12
            },
            {
              "id": "o3",
              "label": "13",
              "value": 13
            },
            {
              "id": "o4",
              "label": "14",
              "value": 14
            }
          ]
        }
      },
      {
        "id": "l89_ex1_q3",
        "mission": 1,
        "prompt": "اِجْمَعْ تِسْعَةً وَأَرْبَعَةً. مَا النَّاتِجُ؟",
        "audioKey": "l89_ex1_q3",
        "visualSymbol": "➕",
        "visualLabel": "9 + 4",
        "smallNumberOperation": {
          "mode": "add",
          "left": 9,
          "right": 4,
          "correctValue": 13,
          "choices": [
            {
              "id": "o4",
              "label": "15",
              "value": 15
            },
            {
              "id": "o2",
              "label": "13",
              "value": 13
            },
            {
              "id": "o1",
              "label": "12",
              "value": 12
            },
            {
              "id": "o3",
              "label": "14",
              "value": 14
            }
          ]
        }
      },
      {
        "id": "l89_ex1_q4",
        "mission": 1,
        "prompt": "اِجْمَعْ سِتَّةً وَثَمَانِيَةً. مَا النَّاتِجُ؟",
        "audioKey": "l89_ex1_q4",
        "visualSymbol": "➕",
        "visualLabel": "6 + 8",
        "smallNumberOperation": {
          "mode": "add",
          "left": 6,
          "right": 8,
          "correctValue": 14,
          "choices": [
            {
              "id": "o1",
              "label": "12",
              "value": 12
            },
            {
              "id": "o2",
              "label": "13",
              "value": 13
            },
            {
              "id": "o4",
              "label": "15",
              "value": 15
            },
            {
              "id": "o3",
              "label": "14",
              "value": 14
            }
          ]
        }
      },
      {
        "id": "l89_ex2_q1",
        "mission": 2,
        "prompt": "ضَاعِفْ سِتَّةً. مَا النَّاتِجُ؟",
        "audioKey": "l89_ex2_q1",
        "visualSymbol": "🟰",
        "visualLabel": "6 + 6",
        "smallNumberOperation": {
          "mode": "add",
          "left": 6,
          "right": 6,
          "correctValue": 12,
          "choices": [
            {
              "id": "o1",
              "label": "10",
              "value": 10
            },
            {
              "id": "o2",
              "label": "11",
              "value": 11
            },
            {
              "id": "o3",
              "label": "12",
              "value": 12
            },
            {
              "id": "o4",
              "label": "13",
              "value": 13
            }
          ]
        }
      },
      {
        "id": "l89_ex2_q2",
        "mission": 2,
        "prompt": "مَا ضِعْفُ سَبْعَةٍ؟",
        "audioKey": "l89_ex2_q2",
        "visualSymbol": "🟰",
        "visualLabel": "7 + 7",
        "smallNumberOperation": {
          "mode": "add",
          "left": 7,
          "right": 7,
          "correctValue": 14,
          "choices": [
            {
              "id": "o3",
              "label": "14",
              "value": 14
            },
            {
              "id": "o1",
              "label": "12",
              "value": 12
            },
            {
              "id": "o2",
              "label": "13",
              "value": 13
            },
            {
              "id": "o4",
              "label": "15",
              "value": 15
            }
          ]
        }
      },
      {
        "id": "l89_ex2_q3",
        "mission": 2,
        "prompt": "ضَاعِفْ ثَمَانِيَةً، ثُمَّ اخْتَرِ النَّاتِجَ.",
        "audioKey": "l89_ex2_q3",
        "visualSymbol": "🟰",
        "visualLabel": "8 + 8",
        "smallNumberOperation": {
          "mode": "add",
          "left": 8,
          "right": 8,
          "correctValue": 16,
          "choices": [
            {
              "id": "o1",
              "label": "14",
              "value": 14
            },
            {
              "id": "o3",
              "label": "16",
              "value": 16
            },
            {
              "id": "o2",
              "label": "15",
              "value": 15
            },
            {
              "id": "o4",
              "label": "17",
              "value": 17
            }
          ]
        }
      },
      {
        "id": "l89_ex2_q4",
        "mission": 2,
        "prompt": "مَا ضِعْفُ تِسْعَةٍ؟",
        "audioKey": "l89_ex2_q4",
        "visualSymbol": "🟰",
        "visualLabel": "9 + 9",
        "smallNumberOperation": {
          "mode": "add",
          "left": 9,
          "right": 9,
          "correctValue": 18,
          "choices": [
            {
              "id": "o1",
              "label": "16",
              "value": 16
            },
            {
              "id": "o2",
              "label": "17",
              "value": 17
            },
            {
              "id": "o3",
              "label": "18",
              "value": 18
            },
            {
              "id": "o4",
              "label": "19",
              "value": 19
            }
          ]
        }
      },
      {
        "id": "l89_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرِ الطَّرِيقَةَ الْأَسْرَعَ لِحِسَابِ هَذِهِ الْعَمَلِيَّةِ.",
        "audioKey": "l89_ex3_q1",
        "visualSymbol": "🧠",
        "visualLabel": "8 + 5",
        "premiumIconChoice": {
          "options": [
            {
              "id": "ten",
              "icon": "🔟",
              "label": "أُكْمِلُ إِلَى 10"
            },
            {
              "id": "count",
              "icon": "👆",
              "label": "أَعُدُّ وَاحِدًا وَاحِدًا"
            },
            {
              "id": "double",
              "icon": "🟰",
              "label": "أَسْتَعْمِلُ الضِّعْفَ"
            },
            {
              "id": "guess",
              "icon": "🎲",
              "label": "أَخْمِنُ"
            }
          ],
          "correctId": "ten"
        }
      },
      {
        "id": "l89_ex3_q2",
        "mission": 3,
        "prompt": "أَيُّ طَرِيقَةٍ تُسَاعِدُكَ أَكْثَرَ فِي هَذَا الْجَمْعِ؟",
        "audioKey": "l89_ex3_q2",
        "visualSymbol": "🧠",
        "visualLabel": "7 + 7",
        "premiumIconChoice": {
          "options": [
            {
              "id": "ten",
              "icon": "🔟",
              "label": "أُكْمِلُ إِلَى 10"
            },
            {
              "id": "double",
              "icon": "🟰",
              "label": "أَسْتَعْمِلُ الضِّعْفَ"
            },
            {
              "id": "count",
              "icon": "👆",
              "label": "أَعُدُّ وَاحِدًا وَاحِدًا"
            },
            {
              "id": "guess",
              "icon": "🎲",
              "label": "أَخْمِنُ"
            }
          ],
          "correctId": "double"
        }
      },
      {
        "id": "l89_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرِ الْخُطْوَةَ الْأَذْكَى لِلْحِسَابِ.",
        "audioKey": "l89_ex3_q3",
        "visualSymbol": "🧠",
        "visualLabel": "9 + 6",
        "premiumIconChoice": {
          "options": [
            {
              "id": "ten",
              "icon": "🔟",
              "label": "أُكْمِلُ إِلَى 10"
            },
            {
              "id": "guess",
              "icon": "🎲",
              "label": "أَخْمِنُ"
            },
            {
              "id": "count",
              "icon": "👆",
              "label": "أَعُدُّ وَاحِدًا وَاحِدًا"
            },
            {
              "id": "double",
              "icon": "🟰",
              "label": "أَسْتَعْمِلُ الضِّعْفَ"
            }
          ],
          "correctId": "ten"
        }
      },
      {
        "id": "l89_ex3_q4",
        "mission": 3,
        "prompt": "أَيُّ طَرِيقَةٍ تُنَاسِبُ هَذِهِ الْعَمَلِيَّةَ؟",
        "audioKey": "l89_ex3_q4",
        "visualSymbol": "🧠",
        "visualLabel": "8 + 8",
        "premiumIconChoice": {
          "options": [
            {
              "id": "ten",
              "icon": "🔟",
              "label": "أُكْمِلُ إِلَى 10"
            },
            {
              "id": "double",
              "icon": "🟰",
              "label": "أَسْتَعْمِلُ الضِّعْفَ"
            },
            {
              "id": "guess",
              "icon": "🎲",
              "label": "أَخْمِنُ"
            },
            {
              "id": "count",
              "icon": "👆",
              "label": "أَعُدُّ وَاحِدًا وَاحِدًا"
            }
          ],
          "correctId": "double"
        }
      },
      {
        "id": "l89_ex4_q1",
        "mission": 4,
        "prompt": "تَحَدٍّ سَرِيعٌ: اِجْمَعْ تِسْعَةً وَثَمَانِيَةً.",
        "audioKey": "l89_ex4_q1",
        "visualSymbol": "🏅",
        "visualLabel": "9 + 8",
        "smallNumberOperation": {
          "mode": "add",
          "left": 9,
          "right": 8,
          "correctValue": 17,
          "choices": [
            {
              "id": "o1",
              "label": "15",
              "value": 15
            },
            {
              "id": "o2",
              "label": "16",
              "value": 16
            },
            {
              "id": "o4",
              "label": "18",
              "value": 18
            },
            {
              "id": "o3",
              "label": "17",
              "value": 17
            }
          ]
        }
      },
      {
        "id": "l89_ex4_q2",
        "mission": 4,
        "prompt": "احْسُبْ ذِهْنِيًّا: ثَمَانِيَةٌ مَعَ سَبْعَةٍ.",
        "audioKey": "l89_ex4_q2",
        "visualSymbol": "🏅",
        "visualLabel": "8 + 7",
        "smallNumberOperation": {
          "mode": "add",
          "left": 8,
          "right": 7,
          "correctValue": 15,
          "choices": [
            {
              "id": "o1",
              "label": "14",
              "value": 14
            },
            {
              "id": "o3",
              "label": "16",
              "value": 16
            },
            {
              "id": "o4",
              "label": "17",
              "value": 17
            },
            {
              "id": "o2",
              "label": "15",
              "value": 15
            }
          ]
        }
      },
      {
        "id": "l89_ex4_q3",
        "mission": 4,
        "prompt": "اِسْتَعْمِلْ طَرِيقَةً ذَكِيَّةً، ثُمَّ اِجْمَعْ سِتَّةً وَتِسْعَةً.",
        "audioKey": "l89_ex4_q3",
        "visualSymbol": "🏅",
        "visualLabel": "6 + 9",
        "smallNumberOperation": {
          "mode": "add",
          "left": 6,
          "right": 9,
          "correctValue": 15,
          "choices": [
            {
              "id": "o4",
              "label": "17",
              "value": 17
            },
            {
              "id": "o1",
              "label": "14",
              "value": 14
            },
            {
              "id": "o3",
              "label": "16",
              "value": 16
            },
            {
              "id": "o2",
              "label": "15",
              "value": 15
            }
          ]
        }
      },
      {
        "id": "l89_ex4_q4",
        "mission": 4,
        "prompt": "اِخْتَرِ النَّاتِجَ الصَّحِيحَ لِجَمْعِ سَبْعَةٍ وَثَمَانِيَةٍ.",
        "audioKey": "l89_ex4_q4",
        "visualSymbol": "🏅",
        "visualLabel": "7 + 8",
        "smallNumberOperation": {
          "mode": "add",
          "left": 7,
          "right": 8,
          "correctValue": 15,
          "choices": [
            {
              "id": "o3",
              "label": "15",
              "value": 15
            },
            {
              "id": "o4",
              "label": "16",
              "value": 16
            },
            {
              "id": "o1",
              "label": "13",
              "value": 13
            },
            {
              "id": "o2",
              "label": "14",
              "value": 14
            }
          ]
        }
      }
    ]
  },
  "90": {
    "lessonKey": "lesson90",
    "audioBase": "/audio/teachers/khalil/lesson_90_use_table_to_solve_problem/exercises",
    "missionTitles": {
      "1": "أَقْرَأُ الْجَدْوَلَ",
      "2": "أُقَارِنُ الْمَعْلُومَاتِ",
      "3": "أَقْرَأُ جَدْوَلَ الْأَلْوَانِ",
      "4": "أَسْتَعْمِلُ الْجَدْوَلَ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَقْرَأُ الْجَدْوَلَ وَتَسْتَعْمِلُهُ لِحَلِّ مُشْكِلٍ.",
    "nextPath": "/lesson-v2/91",
    "questions": [
      {
        "id": "l90_ex1_q1",
        "mission": 1,
        "prompt": "كَمْ بَلَغَتْ دَرَجَةُ الْحَرَارَةِ يَوْمَ الْخَمِيسِ؟",
        "audioKey": "l90_ex1_q1",
        "visualSymbol": "🌡️",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "18",
              "label": "18"
            },
            {
              "id": "o2",
              "icon": "22",
              "label": "22"
            },
            {
              "id": "o3",
              "icon": "25",
              "label": "25"
            },
            {
              "id": "o4",
              "icon": "27",
              "label": "27"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex1_q2",
        "mission": 1,
        "prompt": "كَمْ بَلَغَتْ دَرَجَةُ الْحَرَارَةِ يَوْمَ الِاثْنَيْنِ؟",
        "audioKey": "l90_ex1_q2",
        "visualSymbol": "🌡️",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "21",
              "label": "21"
            },
            {
              "id": "o2",
              "icon": "23",
              "label": "23"
            },
            {
              "id": "o3",
              "icon": "27",
              "label": "27"
            },
            {
              "id": "o4",
              "icon": "19",
              "label": "19"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l90_ex1_q3",
        "mission": 1,
        "prompt": "فِي أَيِّ يَوْمٍ بَلَغَتْ دَرَجَةُ الْحَرَارَةِ 25 دَرَجَةً؟",
        "audioKey": "l90_ex1_q3",
        "visualSymbol": "📅",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "📅",
              "label": "الْأَحَدُ"
            },
            {
              "id": "o2",
              "icon": "📅",
              "label": "الثُّلَاثَاءُ"
            },
            {
              "id": "o3",
              "icon": "📅",
              "label": "الْخَمِيسُ"
            },
            {
              "id": "o4",
              "icon": "📅",
              "label": "السَّبْتُ"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex1_q4",
        "mission": 1,
        "prompt": "فِي أَيِّ يَوْمٍ بَلَغَتْ دَرَجَةُ الْحَرَارَةِ 21 دَرَجَةً؟",
        "audioKey": "l90_ex1_q4",
        "visualSymbol": "📅",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "📅",
              "label": "الْجُمُعَةُ"
            },
            {
              "id": "o2",
              "icon": "📅",
              "label": "السَّبْتُ"
            },
            {
              "id": "o3",
              "icon": "📅",
              "label": "الْأَرْبِعَاءُ"
            },
            {
              "id": "o4",
              "icon": "📅",
              "label": "الِاثْنَيْنُ"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex2_q1",
        "mission": 2,
        "prompt": "مَا أَكْبَرُ دَرَجَةٍ فِي الْجَدْوَلِ؟",
        "audioKey": "l90_ex2_q1",
        "visualSymbol": "🌡️",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "18",
              "label": "18"
            },
            {
              "id": "o2",
              "icon": "22",
              "label": "22"
            },
            {
              "id": "o3",
              "icon": "27",
              "label": "27"
            },
            {
              "id": "o4",
              "icon": "25",
              "label": "25"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l90_ex2_q2",
        "mission": 2,
        "prompt": "مَا أَصْغَرُ دَرَجَةٍ فِي الْجَدْوَلِ؟",
        "audioKey": "l90_ex2_q2",
        "visualSymbol": "🌡️",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "23",
              "label": "23"
            },
            {
              "id": "o2",
              "icon": "18",
              "label": "18"
            },
            {
              "id": "o3",
              "icon": "21",
              "label": "21"
            },
            {
              "id": "o4",
              "icon": "19",
              "label": "19"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex2_q3",
        "mission": 2,
        "prompt": "فِي أَيِّ يَوْمٍ كَانَتِ الدَّرَجَةُ 27؟",
        "audioKey": "l90_ex2_q3",
        "visualSymbol": "📊",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "📅",
              "label": "الِاثْنَيْنُ"
            },
            {
              "id": "o2",
              "icon": "📅",
              "label": "الثُّلَاثَاءُ"
            },
            {
              "id": "o3",
              "icon": "📅",
              "label": "الْأَحَدُ"
            },
            {
              "id": "o4",
              "icon": "📅",
              "label": "الْخَمِيسُ"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l90_ex2_q4",
        "mission": 2,
        "prompt": "فِي أَيِّ يَوْمٍ كَانَتِ الدَّرَجَةُ 18؟",
        "audioKey": "l90_ex2_q4",
        "visualSymbol": "📊",
        "visualLabel": "الأحد 23  |  الاثنين 27  |  الثلاثاء 25  |  الأربعاء 19  |  الخميس 22  |  الجمعة 18  |  السبت 21",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "📅",
              "label": "السَّبْتُ"
            },
            {
              "id": "o2",
              "icon": "📅",
              "label": "الْأَرْبِعَاءُ"
            },
            {
              "id": "o3",
              "icon": "📅",
              "label": "الْخَمِيسُ"
            },
            {
              "id": "o4",
              "icon": "📅",
              "label": "الْجُمُعَةُ"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l90_ex3_q1",
        "mission": 3,
        "prompt": "كَمْ مُرَبَّعًا أُلَوِّنُ بِاللَّوْنِ الْأَزْرَقِ؟",
        "audioKey": "l90_ex3_q1",
        "visualSymbol": "🔵",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex3_q2",
        "mission": 3,
        "prompt": "كَمْ دَائِرَةً أُلَوِّنُ بِاللَّوْنِ الْأَزْرَقِ؟",
        "audioKey": "l90_ex3_q2",
        "visualSymbol": "🔵",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o3",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l90_ex3_q3",
        "mission": 3,
        "prompt": "كَمْ مُثَلَّثًا أُلَوِّنُ بِاللَّوْنِ الْأَحْمَرِ؟",
        "audioKey": "l90_ex3_q3",
        "visualSymbol": "🔴",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o2",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o3",
              "icon": "1",
              "label": "1"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l90_ex3_q4",
        "mission": 3,
        "prompt": "كَمْ دَائِرَةً أُلَوِّنُ بِاللَّوْنِ الْأَخْضَرِ؟",
        "audioKey": "l90_ex3_q4",
        "visualSymbol": "🟢",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o3",
              "icon": "1",
              "label": "1"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l90_ex4_q1",
        "mission": 4,
        "prompt": "كَمْ مُرَبَّعًا أُلَوِّنُ بِاللَّوْنِ الْأَحْمَرِ؟",
        "audioKey": "l90_ex4_q1",
        "visualSymbol": "🔴",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l90_ex4_q2",
        "mission": 4,
        "prompt": "كَمْ مُثَلَّثًا أُلَوِّنُ بِاللَّوْنِ الْأَخْضَرِ؟",
        "audioKey": "l90_ex4_q2",
        "visualSymbol": "🟢",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o3",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l90_ex4_q3",
        "mission": 4,
        "prompt": "أَيُّ لَوْنٍ أَسْتَعْمِلُ لِثَلَاثِ دَوَائِرَ؟",
        "audioKey": "l90_ex4_q3",
        "visualSymbol": "○",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "🟢",
              "label": "الْأَخْضَرُ"
            },
            {
              "id": "o2",
              "icon": "🔵",
              "label": "الْأَزْرَقُ"
            },
            {
              "id": "o3",
              "icon": "🔴",
              "label": "الْأَحْمَرُ"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l90_ex4_q4",
        "mission": 4,
        "prompt": "أَيُّ شَكْلٍ أُلَوِّنُ مِنْهُ ثَلَاثَةً بِاللَّوْنِ الْأَزْرَقِ؟",
        "audioKey": "l90_ex4_q4",
        "visualSymbol": "🔵",
        "visualLabel": "🔵  □ 2   ○ 1   △ 3    |    🔴  □ 3   ○ 2   △ 1    |    🟢  □ 1   ○ 3   △ 2",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "□",
              "label": "الْمُرَبَّعُ"
            },
            {
              "id": "o2",
              "icon": "○",
              "label": "الدَّائِرَةُ"
            },
            {
              "id": "o3",
              "icon": "△",
              "label": "الْمُثَلَّثُ"
            }
          ],
          "correctId": "o3"
        }
      }
    ]
  },
  "91": {
    "lessonKey": "lesson91",
    "audioBase": "/audio/teachers/taline/lesson_91_mental_calculation_3/exercises",
    "missionTitles": {
      "1": "أَصِلُ إِلَى الْعَشَرَةِ",
      "2": "أُكْمِلُ الْخُطْوَةَ الْأُولَى",
      "3": "أَصِلُ إِلَى الْعَشَرَةِ الْمُوَالِيَةِ",
      "4": "أَحْسِبُ بَعْدَ التَّفْكِيكِ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَسْتَعْمِلُ الْعَشَرَةَ الْمُوَالِيَةَ لِلْحِسَابِ بِسُهُولَةٍ.",
    "nextPath": "/lesson-v2/92",
    "questions": [
      {
        "id": "l91_ex1_q1",
        "mission": 1,
        "prompt": "اُنْظُرْ إِلَى الْعَدَدِ. مَا الْعَشَرَةُ الْمُوَالِيَةُ؟",
        "audioKey": "l91_ex1_q1",
        "visualSymbol": "🎯",
        "visualLabel": "الْبِدَايَةُ 28",
        "choices": [
          {
            "id": "o1",
            "content": "20"
          },
          {
            "id": "o3",
            "content": "40"
          },
          {
            "id": "o2",
            "content": "30"
          },
          {
            "id": "o4",
            "content": "50"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 28
        }
      },
      {
        "id": "l91_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرِ الْعَشَرَةَ الَّتِي نَصِلُ إِلَيْهَا أَوَّلًا.",
        "audioKey": "l91_ex1_q2",
        "visualSymbol": "🎯",
        "visualLabel": "الْبِدَايَةُ 37",
        "choices": [
          {
            "id": "o4",
            "content": "60"
          },
          {
            "id": "o1",
            "content": "30"
          },
          {
            "id": "o3",
            "content": "50"
          },
          {
            "id": "o2",
            "content": "40"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 37
        }
      },
      {
        "id": "l91_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ عَشَرَةٍ نَصِلُ إِلَيْهَا بَعْدَ هَذَا الْعَدَدِ؟",
        "audioKey": "l91_ex1_q3",
        "visualSymbol": "🎯",
        "visualLabel": "الْبِدَايَةُ 46",
        "choices": [
          {
            "id": "o2",
            "content": "50"
          },
          {
            "id": "o1",
            "content": "40"
          },
          {
            "id": "o3",
            "content": "60"
          },
          {
            "id": "o4",
            "content": "70"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 46
        }
      },
      {
        "id": "l91_ex1_q4",
        "mission": 1,
        "prompt": "حَدِّدِ الْعَشَرَةَ الْمُوَالِيَةَ لِلْعَدَدِ.",
        "audioKey": "l91_ex1_q4",
        "visualSymbol": "🎯",
        "visualLabel": "الْبِدَايَةُ 58",
        "choices": [
          {
            "id": "o3",
            "content": "70"
          },
          {
            "id": "o4",
            "content": "80"
          },
          {
            "id": "o1",
            "content": "50"
          },
          {
            "id": "o2",
            "content": "60"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 58
        }
      },
      {
        "id": "l91_ex2_q1",
        "mission": 2,
        "prompt": "كَمْ نُضِيفُ أَوَّلًا لِنَصِلَ إِلَى الْعَشَرَةِ الْمُوَالِيَةِ؟",
        "audioKey": "l91_ex2_q1",
        "visualSymbol": "🧩",
        "visualLabel": "28 ⟶ 30",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l91_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرِ الْجُزْءَ الْأَوَّلَ الَّذِي يُكْمِلُ الْعَشَرَةَ.",
        "audioKey": "l91_ex2_q2",
        "visualSymbol": "🧩",
        "visualLabel": "37 ⟶ 40",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l91_ex2_q3",
        "mission": 2,
        "prompt": "مَا الْعَدَدُ الَّذِي نُضِيفُهُ أَوَّلًا؟",
        "audioKey": "l91_ex2_q3",
        "visualSymbol": "🧩",
        "visualLabel": "46 ⟶ 50",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o1",
              "icon": "2",
              "label": "2"
            },
            {
              "id": "o2",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "5",
              "label": "5"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l91_ex2_q4",
        "mission": 2,
        "prompt": "أَكْمِلِ الْخُطْوَةَ الْأُولَى لِلْوُصُولِ إِلَى الْعَشَرَةِ.",
        "audioKey": "l91_ex2_q4",
        "visualSymbol": "🧩",
        "visualLabel": "58 ⟶ 60",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "1",
              "label": "1"
            },
            {
              "id": "o4",
              "icon": "4",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "3",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "2",
              "label": "2"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l91_ex3_q1",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى ثَلَاثَةٍ وَعِشْرِينَ لِنَصِلَ إِلَى ثَلَاثِينَ؟",
        "audioKey": "l91_ex3_q1",
        "visualSymbol": "🎯",
        "visualLabel": "⁦23 ⟶ 30⁩",
        "visualLabelSolved": "⁦23 + 7 = 30⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "",
              "label": "5"
            },
            {
              "id": "o2",
              "icon": "",
              "label": "6"
            },
            {
              "id": "o3",
              "icon": "",
              "label": "8"
            },
            {
              "id": "o4",
              "icon": "",
              "label": "7"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l91_ex3_q2",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى سِتَّةٍ وَسَبْعِينَ لِنَصِلَ إِلَى ثَمَانِينَ؟",
        "audioKey": "l91_ex3_q2",
        "visualSymbol": "🎯",
        "visualLabel": "⁦76 ⟶ 80⁩",
        "visualLabelSolved": "⁦76 + 4 = 80⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "",
              "label": "3"
            },
            {
              "id": "o2",
              "icon": "",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "",
              "label": "5"
            },
            {
              "id": "o4",
              "icon": "",
              "label": "6"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l91_ex3_q3",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى أَرْبَعَةَ عَشَرَ لِنَصِلَ إِلَى عِشْرِينَ؟",
        "audioKey": "l91_ex3_q3",
        "visualSymbol": "🎯",
        "visualLabel": "⁦14 ⟶ 20⁩",
        "visualLabelSolved": "⁦14 + 6 = 20⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "",
              "label": "4"
            },
            {
              "id": "o2",
              "icon": "",
              "label": "5"
            },
            {
              "id": "o3",
              "icon": "",
              "label": "6"
            },
            {
              "id": "o4",
              "icon": "",
              "label": "7"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l91_ex3_q4",
        "mission": 3,
        "prompt": "كَمْ نُضِيفُ إِلَى سِتَّةٍ وَثَلَاثِينَ لِنَصِلَ إِلَى أَرْبَعِينَ؟",
        "audioKey": "l91_ex3_q4",
        "visualSymbol": "🎯",
        "visualLabel": "⁦36 ⟶ 40⁩",
        "visualLabelSolved": "⁦36 + 4 = 40⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "",
              "label": "2"
            },
            {
              "id": "o2",
              "icon": "",
              "label": "4"
            },
            {
              "id": "o3",
              "icon": "",
              "label": "3"
            },
            {
              "id": "o4",
              "icon": "",
              "label": "5"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l91_ex4_q1",
        "mission": 4,
        "prompt": "بَعْدَ التَّفْكِيكِ، مَا نَاتِجُ ثَلَاثَةٍ وَعِشْرِينَ زَائِدَ ثَمَانِيَةٍ؟",
        "audioKey": "l91_ex4_q1",
        "visualSymbol": "🎯",
        "visualLabel": "⁦23 + 8⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "🏅",
              "label": "31"
            },
            {
              "id": "o2",
              "icon": "🏅",
              "label": "30"
            },
            {
              "id": "o4",
              "icon": "🏅",
              "label": "29"
            },
            {
              "id": "o3",
              "icon": "🏅",
              "label": "32"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l91_ex4_q2",
        "mission": 4,
        "prompt": "بَعْدَ التَّفْكِيكِ، مَا نَاتِجُ سِتَّةٍ وَسَبْعِينَ زَائِدَ تِسْعَةٍ؟",
        "audioKey": "l91_ex4_q2",
        "visualSymbol": "🎯",
        "visualLabel": "⁦76 + 9⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "🏅",
              "label": "84"
            },
            {
              "id": "o1",
              "icon": "🏅",
              "label": "85"
            },
            {
              "id": "o4",
              "icon": "🏅",
              "label": "83"
            },
            {
              "id": "o3",
              "icon": "🏅",
              "label": "86"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l91_ex4_q3",
        "mission": 4,
        "prompt": "بَعْدَ التَّفْكِيكِ، مَا نَاتِجُ أَرْبَعَةَ عَشَرَ زَائِدَ سَبْعَةٍ؟",
        "audioKey": "l91_ex4_q3",
        "visualSymbol": "🎯",
        "visualLabel": "⁦14 + 7⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "🏅",
              "label": "22"
            },
            {
              "id": "o1",
              "icon": "🏅",
              "label": "21"
            },
            {
              "id": "o2",
              "icon": "🏅",
              "label": "20"
            },
            {
              "id": "o4",
              "icon": "🏅",
              "label": "19"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l91_ex4_q4",
        "mission": 4,
        "prompt": "بَعْدَ التَّفْكِيكِ، مَا نَاتِجُ سِتَّةٍ وَثَلَاثِينَ زَائِدَ سَبْعَةٍ؟",
        "audioKey": "l91_ex4_q4",
        "visualSymbol": "🎯",
        "visualLabel": "⁦36 + 7⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "🏅",
              "label": "41"
            },
            {
              "id": "o3",
              "icon": "🏅",
              "label": "44"
            },
            {
              "id": "o1",
              "icon": "🏅",
              "label": "43"
            },
            {
              "id": "o2",
              "icon": "🏅",
              "label": "42"
            }
          ],
          "correctId": "o1"
        }
      }
    ]
  },
  "99": {
    "lessonKey": "lesson99",
    "audioBase": "/audio/teachers/taline/lesson_99_numbers_to_99_1/exercises",
    "missionTitles": {
      "1": "أُمَثِّلُ الْعَدَدَ",
      "2": "أَقْرَأُ الْعَدَدَ وَأَكْتُبُهُ",
      "3": "أُكْمِلُ السِّلْسِلَةَ",
      "4": "أُفَكِّكُ الْعَدَدَ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَقْرَأُ وَتُمَثِّلُ أَعْدَادًا إِلَى تِسْعَةٍ وَتِسْعِينَ.",
    "nextPath": "/lesson-v2/100",
    "questions": [
      {
        "id": "l99_ex1_q1",
        "mission": 1,
        "prompt": "اُنْظُرْ إِلَى الْعَشَرَاتِ وَالْوَحَدَاتِ. أَيُّ عَدَدٍ تُمَثِّلُ؟",
        "audioKey": "l99_ex1_q1",
        "visualSymbol": "🧮",
        "visualLabel": "7 عَشَرَات + 4 وَحَدَات",
        "choices": [
          {
            "id": "o3",
            "content": "74"
          },
          {
            "id": "o1",
            "content": "64"
          },
          {
            "id": "o2",
            "content": "70"
          },
          {
            "id": "o4",
            "content": "47"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "tensUnits",
          "tens": 7,
          "units": 4
        }
      },
      {
        "id": "l99_ex1_q2",
        "mission": 1,
        "prompt": "حَوِّلِ الْعَشَرَاتِ وَالْوَحَدَاتِ إِلَى عَدَدٍ وَاحِدٍ.",
        "audioKey": "l99_ex1_q2",
        "visualSymbol": "🧮",
        "visualLabel": "6 عَشَرَات + 3 وَحَدَات",
        "choices": [
          {
            "id": "o4",
            "content": "73"
          },
          {
            "id": "o1",
            "content": "36"
          },
          {
            "id": "o2",
            "content": "60"
          },
          {
            "id": "o3",
            "content": "63"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "tensUnits",
          "tens": 6,
          "units": 3
        }
      },
      {
        "id": "l99_ex1_q3",
        "mission": 1,
        "prompt": "اِقْرَأِ التَّمْثِيلَ، ثُمَّ اِخْتَرِ الْعَدَدَ.",
        "audioKey": "l99_ex1_q3",
        "visualSymbol": "🧮",
        "visualLabel": "8 عَشَرَات + 2 وَحَدَات",
        "choices": [
          {
            "id": "o3",
            "content": "82"
          },
          {
            "id": "o4",
            "content": "72"
          },
          {
            "id": "o1",
            "content": "28"
          },
          {
            "id": "o2",
            "content": "80"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "tensUnits",
          "tens": 8,
          "units": 2
        }
      },
      {
        "id": "l99_ex1_q4",
        "mission": 1,
        "prompt": "مَا الْعَدَدُ الَّذِي تُمَثِّلُهُ هَذِهِ الْعَشَرَاتُ وَالْوَحَدَاتُ؟",
        "audioKey": "l99_ex1_q4",
        "visualSymbol": "🧮",
        "visualLabel": "9 عَشَرَات + 5 وَحَدَات",
        "choices": [
          {
            "id": "o3",
            "content": "95"
          },
          {
            "id": "o2",
            "content": "90"
          },
          {
            "id": "o4",
            "content": "85"
          },
          {
            "id": "o1",
            "content": "59"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "tensUnits",
          "tens": 9,
          "units": 5
        }
      },
      {
        "id": "l99_ex2_q1",
        "mission": 2,
        "prompt": "اِقْرَأِ الْعَدَدَ تِسْعَةً وَسَبْعِينَ، ثُمَّ اخْتَرْ كِتَابَتَهُ بِالْحُرُوفِ.",
        "audioKey": "l99_ex2_q1",
        "visualSymbol": "🔤",
        "visualLabel": "79",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "📖",
              "label": "تِسْعَةٌ وَسِتُّونَ"
            },
            {
              "id": "o2",
              "icon": "📖",
              "label": "سَبْعَةٌ وَتِسْعُونَ"
            },
            {
              "id": "o1",
              "icon": "📖",
              "label": "تِسْعَةٌ وَسَبْعُونَ"
            },
            {
              "id": "o4",
              "icon": "📖",
              "label": "سَبْعُونَ"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex2_q2",
        "mission": 2,
        "prompt": "اِقْرَأْ كَلِمَةَ تِسْعُونَ، ثُمَّ اخْتَرِ الْعَدَدَ بِالْأَرْقَامِ.",
        "audioKey": "l99_ex2_q2",
        "visualSymbol": "🔢",
        "visualLabel": "تِسْعُونَ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "🔢",
              "label": "99"
            },
            {
              "id": "o4",
              "icon": "🔢",
              "label": "19"
            },
            {
              "id": "o1",
              "icon": "🔢",
              "label": "90"
            },
            {
              "id": "o2",
              "icon": "🔢",
              "label": "80"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَدَدَ الْمَكْتُوبَ: وَاحِدٌ وَثَمَانُونَ.",
        "audioKey": "l99_ex2_q3",
        "visualSymbol": "🔢",
        "visualLabel": "وَاحِدٌ وَثَمَانُونَ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "🔢",
              "label": "71"
            },
            {
              "id": "o3",
              "icon": "🔢",
              "label": "91"
            },
            {
              "id": "o2",
              "icon": "🔢",
              "label": "18"
            },
            {
              "id": "o1",
              "icon": "🔢",
              "label": "81"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex2_q4",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَدَدَ الْمَكْتُوبَ: سِتَّةٌ وَثَمَانُونَ.",
        "audioKey": "l99_ex2_q4",
        "visualSymbol": "🔢",
        "visualLabel": "سِتَّةٌ وَثَمَانُونَ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "🔢",
              "label": "68"
            },
            {
              "id": "o4",
              "icon": "🔢",
              "label": "76"
            },
            {
              "id": "o3",
              "icon": "🔢",
              "label": "96"
            },
            {
              "id": "o1",
              "icon": "🔢",
              "label": "86"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلِ السِّلْسِلَةَ. مَا الْعَدَدُ النَّاقِصُ؟",
        "audioKey": "l99_ex3_q1",
        "visualSymbol": "🔗",
        "visualLabel": "سِلْسِلَةٌ عَدَدِيَّةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 72,
          "sequence": [
            70,
            71,
            null,
            73
          ],
          "choices": [
            {
              "id": "o1",
              "label": "71",
              "value": 71
            },
            {
              "id": "o2",
              "label": "72",
              "value": 72
            },
            {
              "id": "o3",
              "label": "73",
              "value": 73
            },
            {
              "id": "o4",
              "label": "74",
              "value": 74
            }
          ]
        }
      },
      {
        "id": "l99_ex3_q2",
        "mission": 3,
        "prompt": "اُنْظُرْ إِلَى السِّلْسِلَةِ، ثُمَّ اخْتَرِ الْعَدَدَ النَّاقِصَ.",
        "audioKey": "l99_ex3_q2",
        "visualSymbol": "🔗",
        "visualLabel": "سِلْسِلَةٌ عَدَدِيَّةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 85,
          "sequence": [
            84,
            null,
            86,
            87
          ],
          "choices": [
            {
              "id": "o1",
              "label": "84",
              "value": 84
            },
            {
              "id": "o2",
              "label": "85",
              "value": 85
            },
            {
              "id": "o3",
              "label": "86",
              "value": 86
            },
            {
              "id": "o4",
              "label": "88",
              "value": 88
            }
          ]
        }
      },
      {
        "id": "l99_ex3_q3",
        "mission": 3,
        "prompt": "أَيُّ عَدَدٍ يُكْمِلُ هَذِهِ السِّلْسِلَةَ؟",
        "audioKey": "l99_ex3_q3",
        "visualSymbol": "🔗",
        "visualLabel": "سِلْسِلَةٌ عَدَدِيَّةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 94,
          "sequence": [
            91,
            92,
            93,
            null
          ],
          "choices": [
            {
              "id": "o1",
              "label": "92",
              "value": 92
            },
            {
              "id": "o2",
              "label": "93",
              "value": 93
            },
            {
              "id": "o3",
              "label": "94",
              "value": 94
            },
            {
              "id": "o4",
              "label": "95",
              "value": 95
            }
          ]
        }
      },
      {
        "id": "l99_ex3_q4",
        "mission": 3,
        "prompt": "ابْحَثْ عَنِ الْعَدَدِ النَّاقِصِ فِي السِّلْسِلَةِ.",
        "audioKey": "l99_ex3_q4",
        "visualSymbol": "🔗",
        "visualLabel": "سِلْسِلَةٌ عَدَدِيَّةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 78,
          "sequence": [
            76,
            77,
            null,
            79
          ],
          "choices": [
            {
              "id": "o1",
              "label": "77",
              "value": 77
            },
            {
              "id": "o3",
              "label": "79",
              "value": 79
            },
            {
              "id": "o4",
              "label": "80",
              "value": 80
            },
            {
              "id": "o2",
              "label": "78",
              "value": 78
            }
          ]
        }
      },
      {
        "id": "l99_ex4_q1",
        "mission": 4,
        "prompt": "أَيُّ تَفْكِيكٍ يُسَاوِي سِتَّةً وَتِسْعِينَ؟",
        "audioKey": "l99_ex4_q1",
        "visualSymbol": "🧮",
        "visualLabel": "96",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "🧩",
              "label": "⁦70 + 6⁩"
            },
            {
              "id": "o1",
              "icon": "🧩",
              "label": "⁦90 + 6⁩"
            },
            {
              "id": "o2",
              "icon": "🧩",
              "label": "⁦80 + 6⁩"
            },
            {
              "id": "o3",
              "icon": "🧩",
              "label": "⁦90 + 5⁩"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex4_q2",
        "mission": 4,
        "prompt": "خَمْسُونَ زَائِدَ كَمْ تُسَاوِي سِتَّةً وَتِسْعِينَ؟",
        "audioKey": "l99_ex4_q2",
        "visualSymbol": "➕",
        "visualLabel": "⁦50 + ؟ = 96⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "🔢",
              "label": "36"
            },
            {
              "id": "o1",
              "icon": "🔢",
              "label": "46"
            },
            {
              "id": "o3",
              "icon": "🔢",
              "label": "40"
            },
            {
              "id": "o4",
              "icon": "🔢",
              "label": "56"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex4_q3",
        "mission": 4,
        "prompt": "ثَمَانِيَةٌ وَأَرْبَعُونَ زَائِدَ كَمْ تُسَاوِي سِتَّةً وَتِسْعِينَ؟",
        "audioKey": "l99_ex4_q3",
        "visualSymbol": "➕",
        "visualLabel": "⁦48 + ؟ = 96⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "🔢",
              "label": "58"
            },
            {
              "id": "o3",
              "icon": "🔢",
              "label": "42"
            },
            {
              "id": "o1",
              "icon": "🔢",
              "label": "48"
            },
            {
              "id": "o2",
              "icon": "🔢",
              "label": "38"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l99_ex4_q4",
        "mission": 4,
        "prompt": "ثَمَانُونَ زَائِدَ كَمْ تُسَاوِي سِتَّةً وَتِسْعِينَ؟",
        "audioKey": "l99_ex4_q4",
        "visualSymbol": "➕",
        "visualLabel": "⁦80 + ؟ = 96⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "🔢",
              "label": "16"
            },
            {
              "id": "o2",
              "icon": "🔢",
              "label": "6"
            },
            {
              "id": "o3",
              "icon": "🔢",
              "label": "10"
            },
            {
              "id": "o4",
              "icon": "🔢",
              "label": "26"
            }
          ],
          "correctId": "o1"
        }
      }
    ]
  },
  "102": {
    "lessonKey": "lesson102",
    "audioBase": "/audio/teachers/khalil/lesson_102_numbers_to_99_2/exercises",
    "missionTitles": {
      "1": "أَخْتَارُ الْأَكْبَرَ",
      "2": "أَخْتَارُ الْأَصْغَرَ",
      "3": "أُكْمِلُ التَّرْتِيبَ",
      "4": "أُرَتِّبُ وَأَحْصُرُ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تُقَارِنُ وَتُرَتِّبُ أَعْدَادًا أَصْغَرَ مِنْ مِائَةٍ.",
    "nextPath": "/lesson-v2/103",
    "questions": [
      {
        "id": "l102_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرِ الْعَدَدَ الْأَكْبَرَ.",
        "audioKey": "l102_ex1_q1",
        "visualSymbol": "⬆️",
        "visualLabel": "76  ◇  67",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "77",
              "label": "77"
            },
            {
              "id": "o2",
              "icon": "67",
              "label": "67"
            },
            {
              "id": "o1",
              "icon": "76",
              "label": "76"
            },
            {
              "id": "o3",
              "icon": "66",
              "label": "66"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex1_q2",
        "mission": 1,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَكْبَرُ؟",
        "audioKey": "l102_ex1_q2",
        "visualSymbol": "⬆️",
        "visualLabel": "58  ◇  85",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "88",
              "label": "88"
            },
            {
              "id": "o1",
              "icon": "58",
              "label": "58"
            },
            {
              "id": "o2",
              "icon": "85",
              "label": "85"
            },
            {
              "id": "o3",
              "icon": "55",
              "label": "55"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l102_ex1_q3",
        "mission": 1,
        "prompt": "ابْحَثْ عَنِ الْعَدَدِ الْأَكْبَرِ.",
        "audioKey": "l102_ex1_q3",
        "visualSymbol": "⬆️",
        "visualLabel": "92  ◇  29",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "92",
              "label": "92"
            },
            {
              "id": "o2",
              "icon": "29",
              "label": "29"
            },
            {
              "id": "o3",
              "icon": "82",
              "label": "82"
            },
            {
              "id": "o4",
              "icon": "39",
              "label": "39"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex1_q4",
        "mission": 1,
        "prompt": "حَدِّدِ الْعَدَدَ الْأَكْبَرَ مِنْ بَيْنِ الْخِيَارَاتِ.",
        "audioKey": "l102_ex1_q4",
        "visualSymbol": "⬆️",
        "visualLabel": "64  ◇  46",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "46",
              "label": "46"
            },
            {
              "id": "o4",
              "icon": "56",
              "label": "56"
            },
            {
              "id": "o3",
              "icon": "54",
              "label": "54"
            },
            {
              "id": "o1",
              "icon": "64",
              "label": "64"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex2_q1",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَدَدَ الْأَصْغَرَ.",
        "audioKey": "l102_ex2_q1",
        "visualSymbol": "⬇️",
        "visualLabel": "73  ◇  37",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "67",
              "label": "67"
            },
            {
              "id": "o1",
              "icon": "73",
              "label": "73"
            },
            {
              "id": "o2",
              "icon": "37",
              "label": "37"
            },
            {
              "id": "o3",
              "icon": "47",
              "label": "47"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l102_ex2_q2",
        "mission": 2,
        "prompt": "أَيُّ الْعَدَدَيْنِ أَصْغَرُ؟",
        "audioKey": "l102_ex2_q2",
        "visualSymbol": "⬇️",
        "visualLabel": "81  ◇  18",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "18",
              "label": "18"
            },
            {
              "id": "o1",
              "icon": "81",
              "label": "81"
            },
            {
              "id": "o4",
              "icon": "71",
              "label": "71"
            },
            {
              "id": "o3",
              "icon": "28",
              "label": "28"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l102_ex2_q3",
        "mission": 2,
        "prompt": "ابْحَثْ عَنِ الْعَدَدِ الْأَصْغَرِ.",
        "audioKey": "l102_ex2_q3",
        "visualSymbol": "⬇️",
        "visualLabel": "69  ◇  96",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "69",
              "label": "69"
            },
            {
              "id": "o2",
              "icon": "96",
              "label": "96"
            },
            {
              "id": "o3",
              "icon": "79",
              "label": "79"
            },
            {
              "id": "o4",
              "icon": "89",
              "label": "89"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex2_q4",
        "mission": 2,
        "prompt": "حَدِّدِ الْعَدَدَ الْأَصْغَرَ.",
        "audioKey": "l102_ex2_q4",
        "visualSymbol": "⬇️",
        "visualLabel": "54  ◇  45",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "54",
              "label": "54"
            },
            {
              "id": "o2",
              "icon": "45",
              "label": "45"
            },
            {
              "id": "o3",
              "icon": "44",
              "label": "44"
            },
            {
              "id": "o4",
              "icon": "55",
              "label": "55"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l102_ex3_q1",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ الَّذِي يَقَعُ فِي الْمَكَانِ الْفَارِغِ؟",
        "audioKey": "l102_ex3_q1",
        "visualSymbol": "🪜",
        "visualLabel": "أَعْدَادٌ مُرَتَّبَةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 68,
          "sequence": [
            67,
            null,
            69,
            70
          ],
          "choices": [
            {
              "id": "o3",
              "label": "68",
              "value": 68
            },
            {
              "id": "o1",
              "label": "66",
              "value": 66
            },
            {
              "id": "o2",
              "label": "67",
              "value": 67
            },
            {
              "id": "o4",
              "label": "69",
              "value": 69
            }
          ]
        }
      },
      {
        "id": "l102_ex3_q2",
        "mission": 3,
        "prompt": "أَكْمِلِ التَّرْتِيبَ بِالْعَدَدِ الْمُنَاسِبِ.",
        "audioKey": "l102_ex3_q2",
        "visualSymbol": "🪜",
        "visualLabel": "أَعْدَادٌ مُرَتَّبَةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 80,
          "sequence": [
            78,
            79,
            null,
            81
          ],
          "choices": [
            {
              "id": "o1",
              "label": "79",
              "value": 79
            },
            {
              "id": "o3",
              "label": "81",
              "value": 81
            },
            {
              "id": "o4",
              "label": "82",
              "value": 82
            },
            {
              "id": "o2",
              "label": "80",
              "value": 80
            }
          ]
        }
      },
      {
        "id": "l102_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرِ الْعَدَدَ الَّذِي يَقَعُ بَيْنَ الْعَدَدَيْنِ.",
        "audioKey": "l102_ex3_q3",
        "visualSymbol": "🪜",
        "visualLabel": "أَعْدَادٌ مُرَتَّبَةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 89,
          "sequence": [
            88,
            null,
            90,
            91
          ],
          "choices": [
            {
              "id": "o2",
              "label": "88",
              "value": 88
            },
            {
              "id": "o4",
              "label": "90",
              "value": 90
            },
            {
              "id": "o1",
              "label": "87",
              "value": 87
            },
            {
              "id": "o3",
              "label": "89",
              "value": 89
            }
          ]
        }
      },
      {
        "id": "l102_ex3_q4",
        "mission": 3,
        "prompt": "أَيُّ عَدَدٍ يَأْتِي فِي نِهَايَةِ هَذِهِ السِّلْسِلَةِ؟",
        "audioKey": "l102_ex3_q4",
        "visualSymbol": "🪜",
        "visualLabel": "أَعْدَادٌ مُرَتَّبَةٌ",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 97,
          "sequence": [
            94,
            95,
            96,
            null
          ],
          "choices": [
            {
              "id": "o3",
              "label": "98",
              "value": 98
            },
            {
              "id": "o2",
              "label": "97",
              "value": 97
            },
            {
              "id": "o4",
              "label": "99",
              "value": 99
            },
            {
              "id": "o1",
              "label": "96",
              "value": 96
            }
          ]
        }
      },
      {
        "id": "l102_ex4_q1",
        "mission": 4,
        "prompt": "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        "audioKey": "l102_ex4_q1",
        "visualSymbol": "📊",
        "visualLabel": "⁦56 ، 90 ، 91 ، 88⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "📈",
              "label": "⁦91 ، 90 ، 88 ، 56⁩"
            },
            {
              "id": "o1",
              "icon": "📈",
              "label": "⁦56 ، 88 ، 90 ، 91⁩"
            },
            {
              "id": "o2",
              "icon": "📈",
              "label": "⁦56 ، 90 ، 88 ، 91⁩"
            },
            {
              "id": "o4",
              "icon": "📈",
              "label": "⁦88 ، 56 ، 90 ، 91⁩"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex4_q2",
        "mission": 4,
        "prompt": "أَيُّ تَرْتِيبٍ يَبْدَأُ بِالْأَصْغَرِ وَيَنْتَهِي بِالْأَكْبَرِ؟",
        "audioKey": "l102_ex4_q2",
        "visualSymbol": "📊",
        "visualLabel": "⁦9 ، 97 ، 74 ، 56⁩",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "📈",
              "label": "⁦56 ، 9 ، 74 ، 97⁩"
            },
            {
              "id": "o1",
              "icon": "📈",
              "label": "⁦9 ، 56 ، 74 ، 97⁩"
            },
            {
              "id": "o2",
              "icon": "📈",
              "label": "⁦9 ، 74 ، 56 ، 97⁩"
            },
            {
              "id": "o3",
              "icon": "📈",
              "label": "⁦97 ، 74 ، 56 ، 9⁩"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex4_q3",
        "mission": 4,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ الْعَدَدُ أَرْبَعَةٌ وَثَمَانُونَ؟",
        "audioKey": "l102_ex4_q3",
        "visualSymbol": "📍",
        "visualLabel": "84",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "o4",
              "icon": "↔️",
              "label": "بَيْنَ 90 وَ100"
            },
            {
              "id": "o2",
              "icon": "↔️",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "o1",
              "icon": "↔️",
              "label": "بَيْنَ 80 وَ90"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l102_ex4_q4",
        "mission": 4,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ الْعَدَدُ ثَلَاثَةٌ وَتِسْعُونَ؟",
        "audioKey": "l102_ex4_q4",
        "visualSymbol": "📍",
        "visualLabel": "93",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o4",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "o3",
              "icon": "↔️",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "o1",
              "icon": "↔️",
              "label": "بَيْنَ 90 وَ100"
            },
            {
              "id": "o2",
              "icon": "↔️",
              "label": "بَيْنَ 80 وَ90"
            }
          ],
          "correctId": "o1"
        }
      }
    ]
  },
  "105": {
    "lessonKey": "lesson105",
    "audioBase": "/audio/teachers/taline/lesson_105_number_bounding/exercises",
    "missionTitles": {
      "1": "أَجِدُ الْعَشَرَةَ السَّابِقَةَ",
      "2": "أَجِدُ الْعَشَرَةَ الْمُوَالِيَةَ",
      "3": "أَحْصُرُ الْعَدَدَ",
      "4": "أُطَبِّقُ الْحَصْرَ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَحْصُرُ الْعَدَدَ بَيْنَ عَشَرَتَيْنِ مُتَتَالِيَتَيْنِ.",
    "nextPath": "/lesson-v2/106",
    "questions": [
      {
        "id": "l105_ex1_q1",
        "mission": 1,
        "prompt": "مَا الْعَشَرَةُ الَّتِي تَأْتِي قَبْلَ هَذَا الْعَدَدِ؟",
        "audioKey": "l105_ex1_q1",
        "visualSymbol": "◀️",
        "visualLabel": "الْعَدَدُ 47",
        "choices": [
          {
            "id": "o2",
            "content": "40"
          },
          {
            "id": "o1",
            "content": "30"
          },
          {
            "id": "o3",
            "content": "50"
          },
          {
            "id": "o4",
            "content": "60"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 47
        }
      },
      {
        "id": "l105_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرِ الْعَشَرَةَ السَّابِقَةَ لِلْعَدَدِ.",
        "audioKey": "l105_ex1_q2",
        "visualSymbol": "◀️",
        "visualLabel": "الْعَدَدُ 63",
        "choices": [
          {
            "id": "o2",
            "content": "60"
          },
          {
            "id": "o1",
            "content": "50"
          },
          {
            "id": "o3",
            "content": "70"
          },
          {
            "id": "o4",
            "content": "80"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 63
        }
      },
      {
        "id": "l105_ex1_q3",
        "mission": 1,
        "prompt": "أَيُّ عَشَرَةٍ أَصْغَرُ مِنَ الْعَدَدِ وَأَقْرَبُ إِلَيْهِ؟",
        "audioKey": "l105_ex1_q3",
        "visualSymbol": "◀️",
        "visualLabel": "الْعَدَدُ 78",
        "choices": [
          {
            "id": "o1",
            "content": "60"
          },
          {
            "id": "o3",
            "content": "80"
          },
          {
            "id": "o4",
            "content": "90"
          },
          {
            "id": "o2",
            "content": "70"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 78
        }
      },
      {
        "id": "l105_ex1_q4",
        "mission": 1,
        "prompt": "حَدِّدِ الْعَشَرَةَ الَّتِي تَسْبِقُ هَذَا الْعَدَدَ.",
        "audioKey": "l105_ex1_q4",
        "visualSymbol": "◀️",
        "visualLabel": "الْعَدَدُ 92",
        "choices": [
          {
            "id": "o1",
            "content": "70"
          },
          {
            "id": "o3",
            "content": "90"
          },
          {
            "id": "o2",
            "content": "80"
          },
          {
            "id": "o4",
            "content": "100"
          }
        ],
        "answer": "o3",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 92
        }
      },
      {
        "id": "l105_ex2_q1",
        "mission": 2,
        "prompt": "مَا الْعَشَرَةُ الَّتِي تَأْتِي بَعْدَ هَذَا الْعَدَدِ؟",
        "audioKey": "l105_ex2_q1",
        "visualSymbol": "▶️",
        "visualLabel": "الْعَدَدُ 47",
        "choices": [
          {
            "id": "o2",
            "content": "50"
          },
          {
            "id": "o4",
            "content": "70"
          },
          {
            "id": "o1",
            "content": "40"
          },
          {
            "id": "o3",
            "content": "60"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 47
        }
      },
      {
        "id": "l105_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَشَرَةَ الْمُوَالِيَةَ لِلْعَدَدِ.",
        "audioKey": "l105_ex2_q2",
        "visualSymbol": "▶️",
        "visualLabel": "الْعَدَدُ 63",
        "choices": [
          {
            "id": "o2",
            "content": "70"
          },
          {
            "id": "o1",
            "content": "60"
          },
          {
            "id": "o3",
            "content": "80"
          },
          {
            "id": "o4",
            "content": "90"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 63
        }
      },
      {
        "id": "l105_ex2_q3",
        "mission": 2,
        "prompt": "أَيُّ عَشَرَةٍ أَكْبَرُ مِنَ الْعَدَدِ وَأَقْرَبُ إِلَيْهِ؟",
        "audioKey": "l105_ex2_q3",
        "visualSymbol": "▶️",
        "visualLabel": "الْعَدَدُ 78",
        "choices": [
          {
            "id": "o1",
            "content": "70"
          },
          {
            "id": "o3",
            "content": "90"
          },
          {
            "id": "o4",
            "content": "100"
          },
          {
            "id": "o2",
            "content": "80"
          }
        ],
        "answer": "o2",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 78
        }
      },
      {
        "id": "l105_ex2_q4",
        "mission": 2,
        "prompt": "حَدِّدِ الْعَشَرَةَ الَّتِي تَلِي هَذَا الْعَدَدَ.",
        "audioKey": "l105_ex2_q4",
        "visualSymbol": "▶️",
        "visualLabel": "الْعَدَدُ 92",
        "choices": [
          {
            "id": "o3",
            "content": "90"
          },
          {
            "id": "o4",
            "content": "100"
          },
          {
            "id": "o1",
            "content": "70"
          },
          {
            "id": "o2",
            "content": "80"
          }
        ],
        "answer": "o4",
        "variant": "number",
        "columns": 2,
        "numberLab": {
          "mode": "numberBreakdown",
          "number": 92
        }
      },
      {
        "id": "l105_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرِ الْحَصْرَ الصَّحِيحَ لِلْعَدَدِ.",
        "audioKey": "l105_ex3_q1",
        "visualSymbol": "📍",
        "visualLabel": "الْعَدَدُ 47",
        "premiumIconChoice": {
          "options": [
            {
              "id": "b",
              "icon": "↔️",
              "label": "بَيْنَ 30 وَ40"
            },
            {
              "id": "d",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "c",
              "icon": "↔️",
              "label": "بَيْنَ 50 وَ60"
            },
            {
              "id": "a",
              "icon": "↔️",
              "label": "بَيْنَ 40 وَ50"
            }
          ],
          "correctId": "a"
        }
      },
      {
        "id": "l105_ex3_q2",
        "mission": 3,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ هَذَا الْعَدَدُ؟",
        "audioKey": "l105_ex3_q2",
        "visualSymbol": "📍",
        "visualLabel": "الْعَدَدُ 63",
        "premiumIconChoice": {
          "options": [
            {
              "id": "d",
              "icon": "↔️",
              "label": "بَيْنَ 80 وَ90"
            },
            {
              "id": "c",
              "icon": "↔️",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "b",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "a",
              "icon": "↔️",
              "label": "بَيْنَ 50 وَ60"
            }
          ],
          "correctId": "b"
        }
      },
      {
        "id": "l105_ex3_q3",
        "mission": 3,
        "prompt": "حَدِّدْ مَكَانَ الْعَدَدِ بَيْنَ عَشَرَتَيْنِ.",
        "audioKey": "l105_ex3_q3",
        "visualSymbol": "📍",
        "visualLabel": "الْعَدَدُ 78",
        "premiumIconChoice": {
          "options": [
            {
              "id": "a",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "d",
              "icon": "↔️",
              "label": "بَيْنَ 90 وَ100"
            },
            {
              "id": "c",
              "icon": "↔️",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "b",
              "icon": "↔️",
              "label": "بَيْنَ 80 وَ90"
            }
          ],
          "correctId": "c"
        }
      },
      {
        "id": "l105_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرِ الْحَصْرَ الْمُنَاسِبَ لِلْعَدَدِ.",
        "audioKey": "l105_ex3_q4",
        "visualSymbol": "📍",
        "visualLabel": "الْعَدَدُ 92",
        "premiumIconChoice": {
          "options": [
            {
              "id": "a",
              "icon": "↔️",
              "label": "بَيْنَ 80 وَ90"
            },
            {
              "id": "c",
              "icon": "↔️",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "b",
              "icon": "↔️",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "d",
              "icon": "↔️",
              "label": "بَيْنَ 90 وَ100"
            }
          ],
          "correctId": "d"
        }
      },
      {
        "id": "l105_ex4_q1",
        "mission": 4,
        "prompt": "ضَعْ عَدَدَ الْبَالُونَاتِ بَيْنَ عَشَرَتَيْنِ مُنَاسِبَتَيْنِ.",
        "audioKey": "l105_ex4_q1",
        "visualSymbol": "🎈",
        "visualLabel": "الْعَدَدُ 34",
        "premiumIconChoice": {
          "options": [
            {
              "id": "d",
              "icon": "🔟",
              "label": "بَيْنَ 50 وَ60"
            },
            {
              "id": "c",
              "icon": "🔟",
              "label": "بَيْنَ 40 وَ50"
            },
            {
              "id": "a",
              "icon": "🔟",
              "label": "بَيْنَ 30 وَ40"
            },
            {
              "id": "b",
              "icon": "🔟",
              "label": "بَيْنَ 20 وَ30"
            }
          ],
          "correctId": "a"
        }
      },
      {
        "id": "l105_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرِ الْحَصْرَ الصَّحِيحَ لِعَدَدِ الْكُتُبِ.",
        "audioKey": "l105_ex4_q2",
        "visualSymbol": "📚",
        "visualLabel": "الْعَدَدُ 57",
        "premiumIconChoice": {
          "options": [
            {
              "id": "c",
              "icon": "🔟",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "b",
              "icon": "🔟",
              "label": "بَيْنَ 50 وَ60"
            },
            {
              "id": "d",
              "icon": "🔟",
              "label": "بَيْنَ 70 وَ80"
            },
            {
              "id": "a",
              "icon": "🔟",
              "label": "بَيْنَ 40 وَ50"
            }
          ],
          "correctId": "b"
        }
      },
      {
        "id": "l105_ex4_q3",
        "mission": 4,
        "prompt": "بَيْنَ أَيِّ عَشَرَتَيْنِ يَقَعُ عَدَدُ الْأَلْعَابِ؟",
        "audioKey": "l105_ex4_q3",
        "visualSymbol": "🧸",
        "visualLabel": "الْعَدَدُ 81",
        "premiumIconChoice": {
          "options": [
            {
              "id": "d",
              "icon": "🔟",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "b",
              "icon": "🔟",
              "label": "بَيْنَ 90 وَ100"
            },
            {
              "id": "c",
              "icon": "🔟",
              "label": "بَيْنَ 80 وَ90"
            },
            {
              "id": "a",
              "icon": "🔟",
              "label": "بَيْنَ 70 وَ80"
            }
          ],
          "correctId": "c"
        }
      },
      {
        "id": "l105_ex4_q4",
        "mission": 4,
        "prompt": "حَدِّدِ الْحَصْرَ الصَّحِيحَ لِعَدَدِ النُّجُومِ.",
        "audioKey": "l105_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "الْعَدَدُ 96",
        "premiumIconChoice": {
          "options": [
            {
              "id": "a",
              "icon": "🔟",
              "label": "بَيْنَ 80 وَ90"
            },
            {
              "id": "d",
              "icon": "🔟",
              "label": "بَيْنَ 90 وَ100"
            },
            {
              "id": "c",
              "icon": "🔟",
              "label": "بَيْنَ 60 وَ70"
            },
            {
              "id": "b",
              "icon": "🔟",
              "label": "بَيْنَ 70 وَ80"
            }
          ],
          "correctId": "d"
        }
      }
    ]
  },
  "112": {
    "lessonKey": "lesson112",
    "audioBase": "/audio/teachers/khalil/lesson_112_number_sequence_less_than_100/exercises",
    "missionTitles": {
      "1": "أَعْرِفُ السَّابِقَ وَالْمُوَالِيَ",
      "2": "أُكْمِلُ سِلْسِلَةً مُتَزَايِدَةً",
      "3": "أُكْمِلُ سِلْسِلَةً مُتَنَاقِصَةً",
      "4": "أَكْتَشِفُ النَّمَطَ وَأُفَكِّكُ الْعَدَدَ"
    },
    "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تُكْمِلُ سَلَاسِلَ عَدَدِيَّةً أَصْغَرَ مِنْ مِائَةٍ.",
    "nextPath": "/lesson-v2/113",
    "questions": [
      {
        "id": "l112_ex1_q1",
        "mission": 1,
        "prompt": "مَا الْعَدَدُ الَّذِي يَأْتِي بَعْدَ الْعَدَدِ الْمَعْرُوضِ؟",
        "audioKey": "l112_ex1_q1",
        "visualSymbol": "👣",
        "visualLabel": "بَعْدَ 72",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "72",
              "label": "72"
            },
            {
              "id": "o1",
              "icon": "71",
              "label": "71"
            },
            {
              "id": "o3",
              "icon": "73",
              "label": "73"
            },
            {
              "id": "o4",
              "icon": "74",
              "label": "74"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l112_ex1_q2",
        "mission": 1,
        "prompt": "مَا الْعَدَدُ الَّذِي يَأْتِي قَبْلَ هَذَا الْعَدَدِ؟",
        "audioKey": "l112_ex1_q2",
        "visualSymbol": "👣",
        "visualLabel": "قَبْلَ 65",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o2",
              "icon": "64",
              "label": "64"
            },
            {
              "id": "o4",
              "icon": "66",
              "label": "66"
            },
            {
              "id": "o3",
              "icon": "65",
              "label": "65"
            },
            {
              "id": "o1",
              "icon": "63",
              "label": "63"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l112_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرِ الْعَدَدَ الْمُوَالِيَ.",
        "audioKey": "l112_ex1_q3",
        "visualSymbol": "👣",
        "visualLabel": "بَعْدَ 89",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "90",
              "label": "90"
            },
            {
              "id": "o1",
              "icon": "88",
              "label": "88"
            },
            {
              "id": "o4",
              "icon": "91",
              "label": "91"
            },
            {
              "id": "o2",
              "icon": "89",
              "label": "89"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l112_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرِ الْعَدَدَ السَّابِقَ.",
        "audioKey": "l112_ex1_q4",
        "visualSymbol": "👣",
        "visualLabel": "قَبْلَ 97",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "95",
              "label": "95"
            },
            {
              "id": "o2",
              "icon": "96",
              "label": "96"
            },
            {
              "id": "o4",
              "icon": "98",
              "label": "98"
            },
            {
              "id": "o3",
              "icon": "97",
              "label": "97"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l112_ex2_q1",
        "mission": 2,
        "prompt": "أَكْمِلِ السِّلْسِلَةَ الْمُتَزَايِدَةَ.",
        "audioKey": "l112_ex2_q1",
        "visualSymbol": "⬆️",
        "visualLabel": "نَتَقَدَّمُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 62,
          "sequence": [
            61,
            null,
            63,
            64
          ],
          "choices": [
            {
              "id": "o1",
              "label": "60",
              "value": 60
            },
            {
              "id": "o3",
              "label": "62",
              "value": 62
            },
            {
              "id": "o2",
              "label": "61",
              "value": 61
            },
            {
              "id": "o4",
              "label": "63",
              "value": 63
            }
          ]
        }
      },
      {
        "id": "l112_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرِ الْعَدَدَ النَّاقِصَ فِي التَّرْتِيبِ.",
        "audioKey": "l112_ex2_q2",
        "visualSymbol": "⬆️",
        "visualLabel": "نَتَقَدَّمُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 76,
          "sequence": [
            74,
            75,
            null,
            77
          ],
          "choices": [
            {
              "id": "o1",
              "label": "75",
              "value": 75
            },
            {
              "id": "o2",
              "label": "76",
              "value": 76
            },
            {
              "id": "o3",
              "label": "77",
              "value": 77
            },
            {
              "id": "o4",
              "label": "78",
              "value": 78
            }
          ]
        }
      },
      {
        "id": "l112_ex2_q3",
        "mission": 2,
        "prompt": "مَا الْعَدَدُ الَّذِي يُكْمِلُ هَذِهِ السِّلْسِلَةَ؟",
        "audioKey": "l112_ex2_q3",
        "visualSymbol": "⬆️",
        "visualLabel": "نَتَقَدَّمُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 87,
          "sequence": [
            86,
            null,
            88,
            89
          ],
          "choices": [
            {
              "id": "o3",
              "label": "88",
              "value": 88
            },
            {
              "id": "o4",
              "label": "90",
              "value": 90
            },
            {
              "id": "o1",
              "label": "86",
              "value": 86
            },
            {
              "id": "o2",
              "label": "87",
              "value": 87
            }
          ]
        }
      },
      {
        "id": "l112_ex2_q4",
        "mission": 2,
        "prompt": "ابْحَثْ عَنِ الْعَدَدِ الَّذِي يَأْتِي بَعْدَ ذَلِكَ.",
        "audioKey": "l112_ex2_q4",
        "visualSymbol": "⬆️",
        "visualLabel": "نَتَقَدَّمُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 98,
          "sequence": [
            95,
            96,
            97,
            null
          ],
          "choices": [
            {
              "id": "o3",
              "label": "99",
              "value": 99
            },
            {
              "id": "o4",
              "label": "100",
              "value": 100
            },
            {
              "id": "o1",
              "label": "97",
              "value": 97
            },
            {
              "id": "o2",
              "label": "98",
              "value": 98
            }
          ]
        }
      },
      {
        "id": "l112_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلِ السِّلْسِلَةَ الْمُتَنَاقِصَةَ.",
        "audioKey": "l112_ex3_q1",
        "visualSymbol": "⬇️",
        "visualLabel": "نَرْجِعُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 68,
          "sequence": [
            70,
            69,
            null,
            67
          ],
          "choices": [
            {
              "id": "o4",
              "label": "69",
              "value": 69
            },
            {
              "id": "o1",
              "label": "66",
              "value": 66
            },
            {
              "id": "o2",
              "label": "67",
              "value": 67
            },
            {
              "id": "o3",
              "label": "68",
              "value": 68
            }
          ]
        }
      },
      {
        "id": "l112_ex3_q2",
        "mission": 3,
        "prompt": "مَا الْعَدَدُ النَّاقِصُ وَنَحْنُ نَرْجِعُ وَاحِدًا وَاحِدًا؟",
        "audioKey": "l112_ex3_q2",
        "visualSymbol": "⬇️",
        "visualLabel": "نَرْجِعُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 83,
          "sequence": [
            84,
            null,
            82,
            81
          ],
          "choices": [
            {
              "id": "o3",
              "label": "83",
              "value": 83
            },
            {
              "id": "o1",
              "label": "81",
              "value": 81
            },
            {
              "id": "o2",
              "label": "82",
              "value": 82
            },
            {
              "id": "o4",
              "label": "84",
              "value": 84
            }
          ]
        }
      },
      {
        "id": "l112_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرِ الْعَدَدَ الَّذِي يُكْمِلُ التَّرْتِيبَ التَّنَازُلِيَّ.",
        "audioKey": "l112_ex3_q3",
        "visualSymbol": "⬇️",
        "visualLabel": "نَرْجِعُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 96,
          "sequence": [
            99,
            98,
            97,
            null
          ],
          "choices": [
            {
              "id": "o1",
              "label": "95",
              "value": 95
            },
            {
              "id": "o3",
              "label": "97",
              "value": 97
            },
            {
              "id": "o2",
              "label": "96",
              "value": 96
            },
            {
              "id": "o4",
              "label": "98",
              "value": 98
            }
          ]
        }
      },
      {
        "id": "l112_ex3_q4",
        "mission": 3,
        "prompt": "ابْحَثْ عَنِ الْعَدَدِ النَّاقِصِ فِي السِّلْسِلَةِ الْعَكْسِيَّةِ.",
        "audioKey": "l112_ex3_q4",
        "visualSymbol": "⬇️",
        "visualLabel": "نَرْجِعُ وَاحِدًا وَاحِدًا",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 61,
          "sequence": [
            63,
            62,
            null,
            60
          ],
          "choices": [
            {
              "id": "o2",
              "label": "60",
              "value": 60
            },
            {
              "id": "o4",
              "label": "62",
              "value": 62
            },
            {
              "id": "o3",
              "label": "61",
              "value": 61
            },
            {
              "id": "o1",
              "label": "59",
              "value": 59
            }
          ]
        }
      },
      {
        "id": "l112_ex4_q1",
        "mission": 4,
        "prompt": "تَزِيدُ السِّلْسِلَةُ عَشَرَةً كُلَّ مَرَّةٍ. مَا الْعَدَدُ النَّاقِصُ؟",
        "audioKey": "l112_ex4_q1",
        "visualSymbol": "🚂",
        "visualLabel": "نَزِيدُ 10",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 43,
          "sequence": [
            13,
            23,
            33,
            null
          ],
          "choices": [
            {
              "id": "o2",
              "label": "33",
              "value": 33
            },
            {
              "id": "o4",
              "label": "42",
              "value": 42
            },
            {
              "id": "o1",
              "label": "43",
              "value": 43
            },
            {
              "id": "o3",
              "label": "53",
              "value": 53
            }
          ]
        }
      },
      {
        "id": "l112_ex4_q2",
        "mission": 4,
        "prompt": "تَنْقُصُ السِّلْسِلَةُ خَمْسَةً كُلَّ مَرَّةٍ. مَا الْعَدَدُ التَّالِي؟",
        "audioKey": "l112_ex4_q2",
        "visualSymbol": "🚂",
        "visualLabel": "نَنْقُصُ 5",
        "revealNumberChoice": {
          "mode": "sequence",
          "correctValue": 30,
          "sequence": [
            45,
            40,
            35,
            null
          ],
          "choices": [
            {
              "id": "o3",
              "label": "35",
              "value": 35
            },
            {
              "id": "o4",
              "label": "40",
              "value": 40
            },
            {
              "id": "o2",
              "label": "25",
              "value": 25
            },
            {
              "id": "o1",
              "label": "30",
              "value": 30
            }
          ]
        }
      },
      {
        "id": "l112_ex4_q3",
        "mission": 4,
        "prompt": "أَيُّ تَفْكِيكٍ يُمَثِّلُ الْعَدَدَ سِتَّةً وَتِسْعِينَ؟",
        "audioKey": "l112_ex4_q3",
        "visualSymbol": "🧮",
        "visualLabel": "96",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o3",
              "icon": "🧩",
              "label": "⁦90 + 5⁩"
            },
            {
              "id": "o1",
              "icon": "🧩",
              "label": "⁦90 + 6⁩"
            },
            {
              "id": "o4",
              "icon": "🧩",
              "label": "⁦70 + 16⁩"
            },
            {
              "id": "o2",
              "icon": "🧩",
              "label": "⁦80 + 6⁩"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l112_ex4_q4",
        "mission": 4,
        "prompt": "أَيُّ تَفْكِيكٍ يُمَثِّلُ الْعَدَدَ وَاحِدًا وَسَبْعِينَ؟",
        "audioKey": "l112_ex4_q4",
        "visualSymbol": "🧮",
        "visualLabel": "71",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "icon": "🧩",
              "label": "⁦70 + 1⁩"
            },
            {
              "id": "o3",
              "icon": "🧩",
              "label": "⁦70 + 2⁩"
            },
            {
              "id": "o2",
              "icon": "🧩",
              "label": "⁦60 + 1⁩"
            },
            {
              "id": "o4",
              "icon": "🧩",
              "label": "⁦80 + 1⁩"
            }
          ],
          "correctId": "o1"
        }
      }
    ]
  }

} as unknown as Record<number, LessonConfig>;



function visualLabelDirection(
  label: string,
): "ltr" | "rtl" {

  return (
    /[→←⟶⟵+=−-]/.test(
      label
    )
      ? "ltr"
      : "rtl"
  );
}


function resolvedVisualLabel(
  question:
    SkillsNumberQuestion,
  showResult:
    boolean,
): string {

  const original =
    question.visualLabel;

  if (
    !showResult
    || (
      !original.includes("؟")
      && !original.includes("?")
    )
  ) {
    return original;
  }


  let answer = "";


  if (
    question.answer
    && Array.isArray(
      question.choices
    )
  ) {
    const item =
      question.choices.find(
        option =>
          option.id
          === question.answer
      );

    if (item) {
      answer =
        String(
          item.content
          ?? ""
        );
    }
  }


  if (
    !answer
    && question
      .premiumIconChoice
  ) {
    const block =
      question
        .premiumIconChoice;

    const item =
      block.options.find(
        option =>
          option.id
          === block.correctId
      );

    if (item) {
      answer =
        String(
          item.label
          ?? ""
        );
    }
  }


  if (
    !answer
    && question
      .revealNumberChoice
  ) {
    answer =
      String(
        question
          .revealNumberChoice
          .correctValue
      );
  }


  if (
    !answer
    && question
      .smallNumberOperation
  ) {
    answer =
      String(
        question
          .smallNumberOperation
          .correctValue
      );
  }


  if (!answer) {
    return original;
  }


  return original
    .replace(
      "؟",
      answer
    )
    .replace(
      "?",
      answer
    );
}



function lesson91ResolvedVisualLabel(
  question: any,
  showResult: boolean,
) {
  const solved =
    question.visualLabelSolved;

  if (
    showResult
    && solved
  ) {
    return solved;
  }

  return resolvedVisualLabel(
    question,
    showResult,
  );
}


// ============================================================
// LESSON90_REAL_TABLE_ACTIVITY
// الدرس 90: استعمال جدول لحل مشكل
// Visual-only specialized activity.
// ============================================================

function Lesson90RealTableActivity({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<
  SkillsNumberQuestion
>) {

  const questionId =
    String(
      (question as any).id ?? ""
    );

  const activity =
    (question as any)
      .premiumIconChoice;

  const options =
    Array.isArray(
      activity?.options
    )
      ? activity.options
      : [];

  const correctId =
    activity?.correctId;

  const isTemperatureTable =
    questionId.startsWith("l90_ex1_")
    || questionId.startsWith("l90_ex2_");


  const submitOption = (
    optionId: string,
  ) => {

    if (
      locked
      || showResult
    ) {
      return;
    }

    submitResult(
      optionId === correctId
    );
  };


  const tableBoxStyle = {
    width: "100%",
    maxWidth: 560,
    margin: "0 auto",
    borderRadius: 24,
    overflow: "hidden",
    border:
      "3px solid #E8B923",
    background: "#FFFFFF",
    boxShadow:
      "0 8px 24px rgba(23,54,95,.10)",
  } as const;


  const cellStyle = {
    minHeight: 52,
    display: "grid",
    placeItems: "center",
    padding: "8px 6px",
    borderBottom:
      "1px solid #DCE6EF",
    color: "#17365F",
    fontWeight: 900,
    fontSize:
      "clamp(18px,5vw,25px)",
    textAlign: "center",
  } as const;


  return (

    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 18,
      }}
    >

      {/* =====================================================
          TABLE
          ===================================================== */}

      {isTemperatureTable
        ? (

          <div
            style={
              tableBoxStyle
            }
          >

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                background:
                  "#FFF6D8",
              }}
            >

              <div
                style={{
                  ...cellStyle,
                  borderLeft:
                    "1px solid #DCE6EF",
                }}
              >
                الْيَوْمُ
              </div>

              <div
                style={
                  cellStyle
                }
              >
                دَرَجَةُ الْحَرَارَةِ
              </div>

            </div>


            {[
              ["الْأَحَدُ", "23"],
              ["الِاثْنَيْنُ", "27"],
              ["الثُّلَاثَاءُ", "25"],
              ["الْأَرْبِعَاءُ", "19"],
              ["الْخَمِيسُ", "22"],
              ["الْجُمُعَةُ", "18"],
              ["السَّبْتُ", "21"],
            ].map(
              ([day, value]) => (

                <div
                  key={day}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                  }}
                >

                  <div
                    dir="rtl"
                    style={{
                      ...cellStyle,
                      borderLeft:
                        "1px solid #DCE6EF",
                    }}
                  >
                    {day}
                  </div>

                  <div
                    dir="ltr"
                    style={{
                      ...cellStyle,
                      fontSize:
                        "clamp(22px,6vw,30px)",
                    }}
                  >
                    {value}
                  </div>

                </div>

              )
            )}

          </div>

        )
        : (

          <div
            style={
              tableBoxStyle
            }
          >

            {/* HEADER */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1.15fr 1fr 1fr 1fr",
                background:
                  "#FFF6D8",
              }}
            >

              <div
                style={{
                  ...cellStyle,
                  borderLeft:
                    "1px solid #DCE6EF",
                }}
              >
                اللَّوْنُ
              </div>

              <div
                style={{
                  ...cellStyle,
                  borderLeft:
                    "1px solid #DCE6EF",
                  fontSize: 32,
                }}
              >
                □
              </div>

              <div
                style={{
                  ...cellStyle,
                  borderLeft:
                    "1px solid #DCE6EF",
                  fontSize: 32,
                }}
              >
                ○
              </div>

              <div
                style={{
                  ...cellStyle,
                  fontSize: 32,
                }}
              >
                △
              </div>

            </div>


            {[
              [
                "#2F78D0",
                "2",
                "1",
                "3",
              ],
              [
                "#E84B46",
                "3",
                "2",
                "1",
              ],
              [
                "#72B445",
                "1",
                "3",
                "2",
              ],
            ].map(
              (
                [
                  color,
                  square,
                  circle,
                  triangle,
                ]
              ) => (

                <div
                  key={color}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1.15fr 1fr 1fr 1fr",
                  }}
                >

                  <div
                    style={{
                      ...cellStyle,
                      borderLeft:
                        "1px solid #DCE6EF",
                    }}
                  >

                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius:
                          "50%",
                        background:
                          color,
                        border:
                          "2px solid rgba(23,54,95,.18)",
                        display:
                          "inline-block",
                      }}
                    />

                  </div>

                  <div
                    style={{
                      ...cellStyle,
                      borderLeft:
                        "1px solid #DCE6EF",
                    }}
                  >
                    {square}
                  </div>

                  <div
                    style={{
                      ...cellStyle,
                      borderLeft:
                        "1px solid #DCE6EF",
                    }}
                  >
                    {circle}
                  </div>

                  <div
                    style={
                      cellStyle
                    }
                  >
                    {triangle}
                  </div>

                </div>

              )
            )}

          </div>

        )}


      {/* =====================================================
          ANSWERS
          no decorative July/calendar icons
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            options.length === 3
              ? "repeat(3,minmax(0,1fr))"
              : "repeat(2,minmax(0,1fr))",
          gap: 12,
          width: "100%",
        }}
      >

        {options.map(
          (
            option: any
          ) => (

            <button
              key={
                option.id
              }
              type="button"
              disabled={
                locked
                || showResult
              }
              onClick={() =>
                submitOption(
                  option.id
                )
              }
              style={{
                minHeight:
                  options.length === 3
                    ? 92
                    : 106,

                padding:
                  "12px 8px",

                borderRadius: 22,

                border:
                  "2px solid #D9E5EF",

                background:
                  "#FFFFFF",

                boxShadow:
                  "0 6px 16px rgba(23,54,95,.08)",

                color:
                  "#17365F",

                fontWeight:
                  950,

                fontSize:
                  (
                    String(
                      option.label
                      ?? ""
                    ).length
                    <= 3
                  )
                    ? "clamp(27px,8vw,40px)"
                    : "clamp(18px,5.3vw,27px)",

                cursor:
                  locked
                    ? "default"
                    : "pointer",

                opacity:
                  locked
                    ? 0.72
                    : 1,

                fontFamily:
                  "inherit",
              }}
            >

              {option.label}

            </button>

          )
        )}

      </div>

    </div>

  );
}


function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<
  SkillsNumberQuestion
>) {

  if (
    String(
      (question as any).id ?? ""
    ).startsWith("l90_")
  ) {

    return (
      <Lesson90RealTableActivity
        question={question}
        locked={locked}
        showResult={showResult}
        submitResult={submitResult}
      />
    );

  }

  return (

    <div
      style={{
        width: "100%",
        display: "grid",
        gap: 14,
        padding: 12,
        borderRadius: 24,
        border:
          "2px solid #DCE7F1",
        background:
          "linear-gradient(180deg,#FFFFFF,#F8FBFE)",
        boxShadow:
          "0 12px 30px rgba(23,54,95,.08)",
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "82px minmax(0,1fr)",
          alignItems: "center",
          gap: 12,
        }}
      >

        <div
          aria-hidden="true"
          style={{
            width: 78,
            height: 78,
            borderRadius: 25,
            display: "grid",
            placeItems: "center",
            fontSize: 38,
            background:
              "radial-gradient(circle at 30% 20%,#FFFFFF 0 18%,#FFF4C8 19% 44%,#F5C13D 45% 72%,#D99A16 100%)",
            border:
              "3px solid #FFFFFF",
            boxShadow:
              "0 10px 25px rgba(23,54,95,.16)",
          }}
        >
          {question.visualSymbol}
        </div>

        <div
          dir={visualLabelDirection(
            question.visualLabel
          )}
          style={{
            minHeight: 70,
            padding:
              "10px 14px",
            borderRadius: 20,
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "#17365F",
            background: "#F8FBFE",
            border:
              "2px solid #DFEAF3",
            fontWeight: 950,
            fontSize:
              "clamp(20px,5.8vw,28px)",
          }}
        >
          {lesson91ResolvedVisualLabel(question, showResult)}
        </div>

      </div>


      {question.numberLab
        ? (
            <PremiumNumberLabV2
              key={
                `${question.id}-number-lab`
              }
              {...question.numberLab}
              locked={locked}
              showResult={
                showResult
              }
            />
          )
        : null}


      {question.revealNumberChoice
        ? (
            <RevealNumberChoiceLabV2
              key={
                `${question.id}-reveal-number`
              }
              {...question.revealNumberChoice}
              locked={locked}
              showResult={
                showResult
              }
              onResult={
                submitResult
              }
            />
          )
        : null}


      {question.smallNumberOperation
        ? (
            <SmallNumberOperationLabV2
              key={
                `${question.id}-operation`
              }
              {...question.smallNumberOperation}
              locked={locked}
              showResult={
                showResult
              }
              onResult={
                submitResult
              }
            />
          )
        : null}


      {question.premiumIconChoice
        ? (
            <PremiumIconChoiceLabV2
              key={
                `${question.id}-premium-choice`
              }
              {...question.premiumIconChoice}
              locked={locked}
              showResult={
                showResult
              }
              onResult={
                submitResult
              }
            />
          )
        : null}

    </div>
  );
}


export function
SkillsAcademyNumberLessonExercises({
  lessonNum,
}: {
  lessonNum:
    number;
}) {

  const config =
    LESSONS[
      lessonNum
    ];

  if (!config) {
    return null;
  }

  return (

    <UnifiedLessonExercisesV2
      lessonKey={
        config.lessonKey
      }

      audioBase={
        config.audioBase
      }

      questions={
        config.questions
      }

      missionTitles={
        config.missionTitles
      }

      missionCount={4}

      completionMessage={
        config.completionMessage
      }

      nextPath={
        config.nextPath
      }

      nextLabel=
        "الدَّرْسُ التَّالِي"

      quizPath={
        ACADEMY_QUIZ
      }

      renderActivity={
        renderActivity
      }
    />

  );
}


export const
Lesson87NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={87}
  />
);


export const
Lesson89NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={89}
  />
);


export const
Lesson90NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={90}
  />
);


export const
Lesson91NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={91}
  />
);


export const
Lesson99NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={99}
  />
);


export const
Lesson102NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={102}
  />
);


export const
Lesson105NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={105}
  />
);





export const
Lesson112NumberExercises = () => (
  <SkillsAcademyNumberLessonExercises
    lessonNum={112}
  />
);


export default
SkillsAcademyNumberLessonExercises;
