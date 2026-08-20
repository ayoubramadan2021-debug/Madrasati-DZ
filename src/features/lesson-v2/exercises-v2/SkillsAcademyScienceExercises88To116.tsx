import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import SciencePremiumIconChoiceLabV2, {
  type SciencePremiumIconChoiceDataV2,
} from "./SciencePremiumIconChoiceLabV2";

import LESSON_88_CONTENT from "../content/lesson88";
import LESSON_104_CONTENT from "../content/lesson104";
import LESSON_107_CONTENT from "../content/lesson107";
import LESSON_111_CONTENT from "../content/lesson111";
import LESSON_113_CONTENT from "../content/lesson113";
import LESSON_116_CONTENT from "../content/lesson116";

type Mission = 1 | 2 | 3 | 4;

type ScienceQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    mission: Mission;
    visualSymbol: string;
    visualLabel: string;
    premiumIconChoice?: SciencePremiumIconChoiceDataV2;
  };

type LessonConfig = {
  missionTitles: Record<number,string>;
  questions: ScienceQuestion[];
};

const LESSONS =
{
  "88": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l88_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الصُّلْبَةَ.",
        "audioKey": "l88_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l88_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ.",
        "audioKey": "l88_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l88_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي يُمْكِنُ سَكْبُهَا.",
        "audioKey": "l88_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o3",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l88_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَحْتَفِظُ بِشَكْلِهَا.",
        "audioKey": "l88_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ",
              "icon": "wood"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l88_ex2_q1",
        "mission": 2,
        "prompt": "اِخْتَرْ مَادَّتَيْنِ سَائِلَتَيْنِ.",
        "audioKey": "l88_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمَاءُ وَالْعَصِيرُ",
              "icon": "water+juice"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ وَالْخَشَبُ",
              "icon": "book+wood"
            },
            {
              "id": "o3",
              "label": "الْقَلَمُ وَالْكِتَابُ",
              "icon": "pencil+book"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ وَالْقَلَمُ",
              "icon": "wood+pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l88_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرْ مَادَّتَيْنِ صُلْبَتَيْنِ.",
        "audioKey": "l88_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمَاءُ وَالزَّيْتُ",
              "icon": "water+oil"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ وَالْخَشَبُ",
              "icon": "book+wood"
            },
            {
              "id": "o3",
              "label": "الْعَصِيرُ وَالْمَاءُ",
              "icon": "juice+water"
            },
            {
              "id": "o4",
              "label": "الزَّيْتُ وَالْعَصِيرُ",
              "icon": "oil+juice"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l88_ex2_q3",
        "mission": 2,
        "prompt": "أَكْمِلْ: الْكِتَابُ مَادَّةٌ ...",
        "audioKey": "l88_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تُسْكَبُ",
              "icon": "pour"
            },
            {
              "id": "o2",
              "label": "سَائِلَةٌ",
              "icon": "liquid"
            },
            {
              "id": "o3",
              "label": "صُلْبَةٌ",
              "icon": "solid"
            },
            {
              "id": "o4",
              "label": "تَأْخُذُ شَكْلَ الْإِنَاءِ",
              "icon": "shape"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l88_ex2_q4",
        "mission": 2,
        "prompt": "أَكْمِلْ: الْمَاءُ مَادَّةٌ ...",
        "audioKey": "l88_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "وَرَقِيَّةٌ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "صُلْبَةٌ",
              "icon": "solid"
            },
            {
              "id": "o3",
              "label": "خَشَبِيَّةٌ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "سَائِلَةٌ",
              "icon": "liquid"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l88_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرْ مَا يَتَغَيَّرُ عِنْدَ نَقْلِ الْمَاءِ إِلَى إِنَاءٍ آخَرَ.",
        "audioKey": "l88_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "شَكْلُهُ",
              "icon": "shape"
            },
            {
              "id": "o2",
              "label": "اسْمُهُ",
              "icon": "name"
            },
            {
              "id": "o3",
              "label": "لَوْنُهُ",
              "icon": "color"
            },
            {
              "id": "o4",
              "label": "كَمِّيَّتُهُ",
              "icon": "quantity"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l88_ex3_q2",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَأْخُذُ شَكْلَ الْإِنَاءِ.",
        "audioKey": "l88_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l88_ex3_q3",
        "mission": 3,
        "prompt": "أَكْمِلْ: الْمَادَّةُ السَّائِلَةُ يُمْكِنُ ...",
        "audioKey": "l88_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابَةُ بِهَا",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "قِرَاءَتُهَا",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "سَكْبُهَا",
              "icon": "pour"
            },
            {
              "id": "o4",
              "label": "الِاحْتِفَاظُ بِشَكْلِهَا",
              "icon": "solid"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l88_ex3_q4",
        "mission": 3,
        "prompt": "أَكْمِلْ: الْمَادَّةُ السَّائِلَةُ تَأْخُذُ شَكْلَ ...",
        "audioKey": "l88_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْقَلَمِ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "الْكِتَابِ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْخَشَبِ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "الْإِنَاءِ",
              "icon": "glass"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l88_ex4_q1",
        "mission": 4,
        "prompt": "اِخْتَرْ الْعِبَارَةَ الَّتِي تَصِفُ الْمَادَّةَ السَّائِلَةَ.",
        "audioKey": "l88_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يُمْكِنُ سَكْبُهَا",
              "icon": "pour"
            },
            {
              "id": "o2",
              "label": "تَحْتَفِظُ دَائِمًا بِشَكْلِهَا",
              "icon": "solid"
            },
            {
              "id": "o3",
              "label": "هِيَ كِتَابٌ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "هِيَ قَلَمٌ",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l88_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرْ الْعِبَارَةَ الَّتِي تَصِفُ الْمَادَّةَ الصُّلْبَةَ.",
        "audioKey": "l88_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تَأْخُذُ شَكْلَ الْإِنَاءِ",
              "icon": "shape"
            },
            {
              "id": "o2",
              "label": "تَحْتَفِظُ بِشَكْلِهَا",
              "icon": "solid"
            },
            {
              "id": "o3",
              "label": "تُنْسَكَبُ",
              "icon": "pour"
            },
            {
              "id": "o4",
              "label": "هِيَ مَاءٌ",
              "icon": "water"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l88_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ مِنْ بَيْنِ هَذِهِ الْمَوَادِّ.",
        "audioKey": "l88_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l88_ex4_q4",
        "mission": 4,
        "prompt": "اِخْتَرْ الْمَادَّةَ الصُّلْبَةَ مِنْ بَيْنِ هَذِهِ الْمَوَادِّ.",
        "audioKey": "l88_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ",
              "icon": "wood"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  },
  "104": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l104_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ الْعَمَلَ الَّذِي يُزِيلُ الْأَوْسَاخَ.",
        "audioKey": "l104_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "التَّنْظِيفُ",
              "icon": "soap"
            },
            {
              "id": "o2",
              "label": "التَّطْهِيرُ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "الْكِتَابَةُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "الْقِرَاءَةُ",
              "icon": "book"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l104_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ الْعَمَلَ الَّذِي يُسَاعِدُ عَلَى التَّخَلُّصِ مِنَ الْجَرَاثِيمِ.",
        "audioKey": "l104_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "التَّنْظِيفُ فَقَطْ",
              "icon": "soap"
            },
            {
              "id": "o2",
              "label": "التَّطْهِيرُ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "الْكِتَابَةُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "اللَّعِبُ",
              "icon": "correct"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l104_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ مَا نَفْعَلُهُ بِالْخُضَرِ وَالْفَوَاكِهِ قَبْلَ أَكْلِهَا.",
        "audioKey": "l104_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نَكْتُبُ عَلَيْهَا",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "نَضَعُهَا مَعَ الْمُنَظِّفِ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "نَغْسِلُهَا بِالْمَاءِ",
              "icon": "fruit"
            },
            {
              "id": "o4",
              "label": "نَتْرُكُهَا مُتَّسِخَةً",
              "icon": "prohibited"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l104_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ الْأَدَاةَ الْمُنَاسِبَةَ لِتَنْظِيفِ الْأَرْضِيَّةِ.",
        "audioKey": "l104_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "الْمِكْنَسَةُ",
              "icon": "broom"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l104_ex2_q1",
        "mission": 2,
        "prompt": "أَكْمِلْ: إِزَالَةُ الْأَوْسَاخِ تُسَمَّى ...",
        "audioKey": "l104_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تَنْظِيفًا",
              "icon": "soap"
            },
            {
              "id": "o2",
              "label": "تَطْهِيرًا",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "رَسْمًا",
              "icon": "correct"
            },
            {
              "id": "o4",
              "label": "قِرَاءَةً",
              "icon": "book"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l104_ex2_q2",
        "mission": 2,
        "prompt": "أَكْمِلْ: التَّخَلُّصُ مِنَ الْجَرَاثِيمِ يُسَمَّى ...",
        "audioKey": "l104_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تَنْظِيفًا",
              "icon": "soap"
            },
            {
              "id": "o2",
              "label": "تَطْهِيرًا",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "كِتَابَةً",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "لَعِبًا",
              "icon": "correct"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l104_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرْ مَا نَسْتَعْمِلُهُ لِمَسْحِ الطَّاوِلَةِ.",
        "audioKey": "l104_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o3",
              "label": "الْإِسْفِنْجَةُ",
              "icon": "sponge"
            },
            {
              "id": "o4",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l104_ex2_q4",
        "mission": 2,
        "prompt": "اِخْتَرْ مَادَّةً تُسْتَعْمَلُ فِي التَّطْهِيرِ.",
        "audioKey": "l104_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "عَصِيرٌ",
              "icon": "juice"
            },
            {
              "id": "o2",
              "label": "قَلَمُ رَصَاصٍ",
              "icon": "pencil"
            },
            {
              "id": "o3",
              "label": "كِتَابٌ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "مَادَّةٌ مُطَهِّرَةٌ",
              "icon": "cleaner"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l104_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرْ مَا نَفْعَلُهُ بِأَرْضِيَّةٍ مُتَّسِخَةٍ.",
        "audioKey": "l104_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نُنَظِّفُهَا",
              "icon": "floor"
            },
            {
              "id": "o2",
              "label": "نَكْتُبُ عَلَيْهَا",
              "icon": "pencil"
            },
            {
              "id": "o3",
              "label": "نَضَعُ الطَّعَامَ عَلَيْهَا",
              "icon": "food"
            },
            {
              "id": "o4",
              "label": "نَتْرُكُهَا مُتَّسِخَةً",
              "icon": "prohibited"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l104_ex3_q2",
        "mission": 3,
        "prompt": "اِخْتَرْ مَا نَفْعَلُهُ بِطَاوِلَةٍ مُتَّسِخَةٍ.",
        "audioKey": "l104_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نَتْرُكُهَا مُتَّسِخَةً",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "نَمْسَحُهَا",
              "icon": "table"
            },
            {
              "id": "o3",
              "label": "نَكْتُبُ عَلَيْهَا",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "نَضَعُ الْوَسَخَ عَلَيْهَا",
              "icon": "prohibited"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l104_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرْ السُّلُوكَ الصَّحِيحَ قَبْلَ الْأَكْلِ.",
        "audioKey": "l104_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نَتْرُكُ أَيْدِيَنَا مُتَّسِخَةً",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "نَلْمَسُ الْمُنَظِّفَ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "نَغْسِلُ أَيْدِيَنَا",
              "icon": "handwash"
            },
            {
              "id": "o4",
              "label": "نَضَعُ الْوَسَخَ عَلَى الطَّاوِلَةِ",
              "icon": "prohibited"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l104_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرْ السُّلُوكَ الصَّحِيحَ بَعْدَ التَّنْظِيفِ.",
        "audioKey": "l104_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نَضَعُ الطَّعَامَ فَوْقَ الْمُنَظِّفِ",
              "icon": "food"
            },
            {
              "id": "o2",
              "label": "نُعِيدُ الْوَسَخَ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "نَلْعَبُ بِالْمُنَظِّفِ",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "نُطَهِّرُ عِنْدَ الْحَاجَةِ",
              "icon": "cleaner"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l104_ex4_q1",
        "mission": 4,
        "prompt": "اِخْتَرْ الْعِبَارَةَ الَّتِي تَصِفُ التَّنْظِيفَ.",
        "audioKey": "l104_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يُزِيلُ الْأَوْسَاخَ",
              "icon": "soap"
            },
            {
              "id": "o2",
              "label": "يَزِيدُ الْأَوْسَاخَ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "يَسْتَعْمَلُ لِلْكِتَابَةِ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "يَسْتَعْمَلُ لِلْقِرَاءَةِ",
              "icon": "book"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l104_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرْ الْعِبَارَةَ الَّتِي تَصِفُ التَّطْهِيرَ.",
        "audioKey": "l104_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يَزِيدُ الْجَرَاثِيمَ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "يُسَاعِدُ عَلَى التَّخَلُّصِ مِنَ الْجَرَاثِيمِ",
              "icon": "germs"
            },
            {
              "id": "o3",
              "label": "يَسْتَعْمَلُ لِلرَّسْمِ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "يَسْتَعْمَلُ لِلْقِرَاءَةِ",
              "icon": "book"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l104_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ التَّرْتِيبَ الْمُنَاسِبَ لِلْعِنَايَةِ بِسَطْحٍ مُتَّسِخٍ.",
        "audioKey": "l104_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "رَسْمٌ ثُمَّ قِرَاءَةٌ",
              "icon": "pencil+book"
            },
            {
              "id": "o2",
              "label": "تَطْهِيرٌ ثُمَّ تَوْسِيخٌ",
              "icon": "cleaner+prohibited"
            },
            {
              "id": "o3",
              "label": "تَنْظِيفٌ ثُمَّ تَطْهِيرٌ عِنْدَ الْحَاجَةِ",
              "icon": "soap+cleaner"
            },
            {
              "id": "o4",
              "label": "طَعَامٌ ثُمَّ مُنَظِّفٌ",
              "icon": "food+cleaner"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l104_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلْ: لِلْمُحَافَظَةِ عَلَى النَّظَافَةِ ...",
        "audioKey": "l104_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "نَضَعُ الْقُمَامَةَ عَلَى الْأَرْضِ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "نَتْرُكُ الْأَوْسَاخَ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "نَلْعَبُ بِالْمُنَظِّفِ",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "نُنَظِّفُ بِانْتِظَامٍ",
              "icon": "soap"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  },
  "107": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l107_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ مَنْ يُسْمَحُ لَهُ بِفَتْحِ عُبْوَةِ مَادَّةِ التَّنْظِيفِ.",
        "audioKey": "l107_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "شَخْصٌ بَالِغٌ",
              "icon": "adult"
            },
            {
              "id": "o2",
              "label": "طِفْلٌ وَحْدَهُ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "أَيُّ طِفْلٍ",
              "icon": "prohibited"
            },
            {
              "id": "o4",
              "label": "لَا أَحَدَ",
              "icon": "prohibited"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l107_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ السُّلُوكَ الصَّحِيحَ مَعَ سَائِلٍ مَجْهُولٍ.",
        "audioKey": "l107_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَشْرَبُهُ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "لَا أَتَذَوَّقُهُ",
              "icon": "unknown-liquid"
            },
            {
              "id": "o3",
              "label": "أَلْعَبُ بِهِ",
              "icon": "prohibited"
            },
            {
              "id": "o4",
              "label": "أَسْكُبُهُ عَلَى جِسْمِي",
              "icon": "prohibited"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l107_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَكَانَ الْآمِنَ لِحِفْظِ مَوَادِّ التَّنْظِيفِ.",
        "audioKey": "l107_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "بَيْنَ الْأَلْعَابِ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "قُرْبَ الطَّعَامِ",
              "icon": "food"
            },
            {
              "id": "o3",
              "label": "خِزَانَةٌ مُغْلَقَةٌ",
              "icon": "lock"
            },
            {
              "id": "o4",
              "label": "فِي مُتَنَاوَلِ الْأَطْفَالِ",
              "icon": "prohibited"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l107_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ مَا يَجِبُ إِبْعَادُهُ عَنِ الْأَغْذِيَةِ.",
        "audioKey": "l107_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمَاءُ الصَّالِحُ لِلشُّرْبِ",
              "icon": "water"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "مَوَادُّ التَّنْظِيفِ",
              "icon": "cleaner"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l107_ex2_q1",
        "mission": 2,
        "prompt": "اِخْتَرْ مَا تَفْعَلُهُ قَبْلَ فَتْحِ عُبْوَةِ تَنْظِيفٍ.",
        "audioKey": "l107_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْمِي نَفْسِي",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَطْلُبُ إِذْنَ شَخْصٍ بَالِغٍ",
              "icon": "adult"
            },
            {
              "id": "o2",
              "label": "أَفْتَحُهَا وَحْدِي",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "أَتَذَوَّقُهَا",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أَلْعَبُ بِهَا",
              "icon": "warning"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l107_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرْ السُّلُوكَ الَّذِي يَحْمِي الطِّفْلَ مِنَ الْخَطَرِ.",
        "audioKey": "l107_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْمِي نَفْسِي",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَفْتَحُ الْعُبْوَةَ",
              "icon": "warning"
            },
            {
              "id": "o2",
              "label": "لَا أَلْعَبُ بِالْمُنَظِّفِ",
              "icon": "safe"
            },
            {
              "id": "o3",
              "label": "أَتَذَوَّقُ الْمُنَظِّفَ",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أَضَعُهُ قُرْبَ الطَّعَامِ",
              "icon": "food"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l107_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرْ السُّلُوكَ الْخَطِرَ.",
        "audioKey": "l107_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْمِي نَفْسِي",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أُخْبِرُ شَخْصًا بَالِغًا",
              "icon": "adult"
            },
            {
              "id": "o2",
              "label": "أَبْتَعِدُ عَنْهُ",
              "icon": "safe"
            },
            {
              "id": "o3",
              "label": "أَتَذَوَّقُ سَائِلًا مَجْهُولًا",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أَحْفَظُ الْمُنَظِّفَ فِي مَكَانٍ آمِنٍ",
              "icon": "lock"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l107_ex2_q4",
        "mission": 2,
        "prompt": "اِخْتَرْ مَا تَفْعَلُهُ عِنْدَ رُؤْيَةِ عُبْوَةٍ عَلَيْهَا رَمْزُ الْخَطَرِ.",
        "audioKey": "l107_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْمِي نَفْسِي",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَلْعَبُ بِهَا",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "أَفْتَحُهَا",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "أَتَذَوَّقُهَا",
              "icon": "prohibited"
            },
            {
              "id": "o4",
              "label": "أَبْتَعِدُ وَأُخْبِرُ بَالِغًا",
              "icon": "warning"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l107_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلْ: لَا أَفْتَحُ عُبْوَةَ التَّنْظِيفِ دُونَ ...",
        "audioKey": "l107_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "إِذْنِ شَخْصٍ بَالِغٍ",
              "icon": "adult"
            },
            {
              "id": "o2",
              "label": "قَلَمٍ",
              "icon": "pencil"
            },
            {
              "id": "o3",
              "label": "كِتَابٍ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "طَعَامٍ",
              "icon": "food"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l107_ex3_q2",
        "mission": 3,
        "prompt": "أَكْمِلْ: لَا أَتَذَوَّقُ ...",
        "audioKey": "l107_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمَاءَ الصَّالِحَ لِلشُّرْبِ",
              "icon": "water"
            },
            {
              "id": "o2",
              "label": "سَائِلًا مَجْهُولًا",
              "icon": "unknown-liquid"
            },
            {
              "id": "o3",
              "label": "الْحَلِيبَ",
              "icon": "milk"
            },
            {
              "id": "o4",
              "label": "الْعَصِيرَ",
              "icon": "juice"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l107_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَكَانَ الَّذِي لَا نَضَعُ فِيهِ الْمُنَظِّفَ.",
        "audioKey": "l107_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "فِي مَكَانٍ خَاصٍّ",
              "icon": "shelf"
            },
            {
              "id": "o2",
              "label": "فِي خِزَانَةٍ مُغْلَقَةٍ",
              "icon": "lock"
            },
            {
              "id": "o3",
              "label": "قُرْبَ الطَّعَامِ",
              "icon": "food"
            },
            {
              "id": "o4",
              "label": "بَعِيدًا عَنِ الْأَطْفَالِ",
              "icon": "safe"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l107_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرْ الشَّخْصَ الَّذِي نَطْلُبُ مُسَاعَدَتَهُ.",
        "audioKey": "l107_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَيَّ طِفْلٍ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "طِفْلًا صَغِيرًا",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "لَا أَحَدَ",
              "icon": "prohibited"
            },
            {
              "id": "o4",
              "label": "شَخْصًا بَالِغًا",
              "icon": "adult"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l107_ex4_q1",
        "mission": 4,
        "prompt": "اِخْتَرْ الْعِبَارَةَ الَّتِي تَصِفُ التَّصَرُّفَ الْآمِنَ.",
        "audioKey": "l107_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَصَرَّفُ بِأَمَانٍ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أُبْعِدُ الْمُنَظِّفَاتِ عَنِ الطَّعَامِ",
              "icon": "safe"
            },
            {
              "id": "o2",
              "label": "أَضَعُ الْمُنَظِّفَاتِ مَعَ الطَّعَامِ",
              "icon": "food"
            },
            {
              "id": "o3",
              "label": "أَشْرَبُ سَائِلًا مَجْهُولًا",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أَلْعَبُ بِعُبْوَةِ الْمُنَظِّفِ",
              "icon": "warning"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l107_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرْ التَّصَرُّفَ الَّذِي نَتَجَنَّبُهُ.",
        "audioKey": "l107_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَصَرَّفُ بِأَمَانٍ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "إِخْبَارُ شَخْصٍ بَالِغٍ",
              "icon": "adult"
            },
            {
              "id": "o2",
              "label": "شُرْبُ سَائِلٍ مَجْهُولٍ",
              "icon": "warning"
            },
            {
              "id": "o3",
              "label": "إِغْلَاقُ خِزَانَةِ الْمُنَظِّفَاتِ",
              "icon": "lock"
            },
            {
              "id": "o4",
              "label": "الِابْتِعَادُ عَنِ الْخَطَرِ",
              "icon": "safe"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l107_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ التَّصَرُّفَ الصَّحِيحَ مَعَ مَادَّةٍ خَطِرَةٍ.",
        "audioKey": "l107_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَصَرَّفُ بِأَمَانٍ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَتَذَوَّقُهَا",
              "icon": "warning"
            },
            {
              "id": "o2",
              "label": "أَفْتَحُهَا",
              "icon": "warning"
            },
            {
              "id": "o3",
              "label": "لَا أَلْمَسُهَا وَحْدِي",
              "icon": "safe"
            },
            {
              "id": "o4",
              "label": "أَلْعَبُ بِهَا",
              "icon": "warning"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l107_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلْ: عِنْدَ رُؤْيَةِ مَادَّةٍ خَطِرَةٍ ...",
        "audioKey": "l107_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَصَرَّفُ بِأَمَانٍ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَلْعَبُ بِهَا",
              "icon": "warning"
            },
            {
              "id": "o2",
              "label": "أَتَذَوَّقُهَا",
              "icon": "warning"
            },
            {
              "id": "o3",
              "label": "أَلْمَسُهَا",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أُخْبِرُ شَخْصًا بَالِغًا",
              "icon": "adult"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  },
  "111": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l111_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ مَادَّةَ تَنْظِيفٍ سَائِلَةً.",
        "audioKey": "l111_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُنَظِّفٌ سَائِلٌ",
              "icon": "cleaner"
            },
            {
              "id": "o2",
              "label": "قِطْعَةُ صَابُونٍ",
              "icon": "soap"
            },
            {
              "id": "o3",
              "label": "مَسْحُوقُ تَنْظِيفٍ",
              "icon": "powder"
            },
            {
              "id": "o4",
              "label": "كِتَابٌ",
              "icon": "book"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l111_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ مَادَّةَ تَنْظِيفٍ صُلْبَةً.",
        "audioKey": "l111_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُنَظِّفٌ سَائِلٌ",
              "icon": "cleaner"
            },
            {
              "id": "o2",
              "label": "قِطْعَةُ صَابُونٍ",
              "icon": "soap"
            },
            {
              "id": "o3",
              "label": "مَاءٌ",
              "icon": "water"
            },
            {
              "id": "o4",
              "label": "عَصِيرٌ",
              "icon": "juice"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l111_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ مَادَّةَ تَنْظِيفٍ مَسْحُوقَةً.",
        "audioKey": "l111_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "زَيْتٌ",
              "icon": "oil"
            },
            {
              "id": "o2",
              "label": "مَاءٌ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "مَسْحُوقُ تَنْظِيفٍ",
              "icon": "powder"
            },
            {
              "id": "o4",
              "label": "كِتَابٌ",
              "icon": "book"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l111_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ الرَّمْزَ الَّذِي يَدُلُّ عَلَى الْخَطَرِ.",
        "audioKey": "l111_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَتَعَرَّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "رَمْزُ الْخَطَرِ",
              "icon": "warning"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l111_ex2_q1",
        "mission": 2,
        "prompt": "أَكْمِلْ: مَادَّةُ التَّنْظِيفِ الَّتِي تَنْسَابُ تَكُونُ ...",
        "audioKey": "l111_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "سَائِلَةً",
              "icon": "liquid"
            },
            {
              "id": "o2",
              "label": "صُلْبَةً",
              "icon": "solid"
            },
            {
              "id": "o3",
              "label": "كِتَابًا",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "قَلَمًا",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l111_ex2_q2",
        "mission": 2,
        "prompt": "أَكْمِلْ: مَادَّةُ التَّنْظِيفِ الَّتِي تَكُونُ حُبَيْبَاتٍ دَقِيقَةً تَكُونُ ...",
        "audioKey": "l111_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "سَائِلَةً",
              "icon": "liquid"
            },
            {
              "id": "o2",
              "label": "مَسْحُوقَةً",
              "icon": "powder"
            },
            {
              "id": "o3",
              "label": "كِتَابًا",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "مَاءً",
              "icon": "water"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l111_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي يُمْكِنُ سَكْبُهَا.",
        "audioKey": "l111_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "قِطْعَةُ الصَّابُونِ",
              "icon": "soap"
            },
            {
              "id": "o3",
              "label": "الْمُنَظِّفُ السَّائِلُ",
              "icon": "cleaner"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l111_ex2_q4",
        "mission": 2,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَحْتَفِظُ بِشَكْلِهَا.",
        "audioKey": "l111_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            },
            {
              "id": "o2",
              "label": "الْمُنَظِّفُ السَّائِلُ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o4",
              "label": "قِطْعَةُ الصَّابُونِ",
              "icon": "soap"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l111_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَشْبَهُ الْحُبَيْبَاتِ الدَّقِيقَةَ.",
        "audioKey": "l111_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مَسْحُوقُ التَّنْظِيفِ",
              "icon": "powder"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْكِتَابُ",
              "icon": "book"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l111_ex3_q2",
        "mission": 3,
        "prompt": "اِخْتَرْ التَّصَرُّفَ الْآمِنَ عِنْدَ رُؤْيَةِ رَمْزِ الْخَطَرِ.",
        "audioKey": "l111_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَفْتَحُ الْعُبْوَةَ",
              "icon": "warning"
            },
            {
              "id": "o2",
              "label": "أَبْتَعِدُ وَأُخْبِرُ بَالِغًا",
              "icon": "safe"
            },
            {
              "id": "o3",
              "label": "أَتَذَوَّقُهَا",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "أَلْعَبُ بِهَا",
              "icon": "warning"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l111_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرْ مَنْ يَسْتَعْمِلُ الْمَادَّةَ الْخَطِرَةَ.",
        "audioKey": "l111_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَيُّ طِفْلٍ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "طِفْلٌ وَحْدَهُ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "شَخْصٌ بَالِغٌ",
              "icon": "adult"
            },
            {
              "id": "o4",
              "label": "لَا أَحَدَ",
              "icon": "prohibited"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l111_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَكَانَ الْآمِنَ لِحِفْظِ الْمَادَّةِ الْخَطِرَةِ.",
        "audioKey": "l111_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "فِي مُتَنَاوَلِ الْأَطْفَالِ",
              "icon": "prohibited"
            },
            {
              "id": "o2",
              "label": "قُرْبَ الطَّعَامِ",
              "icon": "food"
            },
            {
              "id": "o3",
              "label": "بَيْنَ الْأَلْعَابِ",
              "icon": "prohibited"
            },
            {
              "id": "o4",
              "label": "خِزَانَةٌ مُغْلَقَةٌ",
              "icon": "lock"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l111_ex4_q1",
        "mission": 4,
        "prompt": "اِخْتَرْ الْوَصْفَ الصَّحِيحَ لِلْمُنَظِّفِ السَّائِلِ.",
        "audioKey": "l111_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْذَرُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يَنْسَابُ وَيُمْكِنُ سَكْبُهُ",
              "icon": "liquid"
            },
            {
              "id": "o2",
              "label": "يَحْتَفِظُ بِشَكْلِهِ",
              "icon": "solid"
            },
            {
              "id": "o3",
              "label": "هُوَ كِتَابٌ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "هُوَ قَلَمٌ",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l111_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرْ الْوَصْفَ الصَّحِيحَ لِقِطْعَةِ الصَّابُونِ.",
        "audioKey": "l111_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْذَرُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مَادَّةٌ سَائِلَةٌ",
              "icon": "liquid"
            },
            {
              "id": "o2",
              "label": "مَادَّةٌ صُلْبَةٌ",
              "icon": "soap"
            },
            {
              "id": "o3",
              "label": "مَسْحُوقٌ",
              "icon": "powder"
            },
            {
              "id": "o4",
              "label": "مَاءٌ",
              "icon": "water"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l111_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ الْوَصْفَ الصَّحِيحَ لِمَسْحُوقِ التَّنْظِيفِ.",
        "audioKey": "l111_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْذَرُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قِطْعَةٌ صُلْبَةٌ كَالْكِتَابِ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "مَادَّةٌ سَائِلَةٌ",
              "icon": "liquid"
            },
            {
              "id": "o3",
              "label": "مَادَّةٌ مَسْحُوقَةٌ",
              "icon": "powder"
            },
            {
              "id": "o4",
              "label": "مَاءٌ",
              "icon": "water"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l111_ex4_q4",
        "mission": 4,
        "prompt": "أَكْمِلْ: رَمْزُ الْخَطَرِ يَدْعُونِي إِلَى ...",
        "audioKey": "l111_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَحْذَرُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْفَتْحِ",
              "icon": "warning"
            },
            {
              "id": "o2",
              "label": "اللَّعِبِ",
              "icon": "prohibited"
            },
            {
              "id": "o3",
              "label": "التَّذَوُّقِ",
              "icon": "warning"
            },
            {
              "id": "o4",
              "label": "الْحَذَرِ",
              "icon": "warning"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  },
  "113": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l113_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ أَدَاةَ الْكِتَابَةِ بِالرَّصَاصِ.",
        "audioKey": "l113_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُرَاجِعُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ",
              "icon": "wood"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l113_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ أَدَاةَ الْكِتَابَةِ بِالْحِبْرِ.",
        "audioKey": "l113_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُرَاجِعُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْمِمْحَاةُ",
              "icon": "eraser"
            },
            {
              "id": "o2",
              "label": "قَلَمُ الْحِبْرِ",
              "icon": "pen"
            },
            {
              "id": "o3",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o4",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l113_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الصُّلْبَةَ.",
        "audioKey": "l113_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُرَاجِعُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            },
            {
              "id": "o2",
              "label": "الْمَاءُ",
              "icon": "water"
            },
            {
              "id": "o3",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "الزَّيْتُ",
              "icon": "oil"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l113_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ.",
        "audioKey": "l113_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُرَاجِعُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "الْمَاءُ",
              "icon": "water"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l113_ex2_q1",
        "mission": 2,
        "prompt": "اِخْتَرْ الْجِسْمَ الَّذِي يَطْفُو فَوْقَ الْمَاءِ.",
        "audioKey": "l113_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْفِلِّينَةُ",
              "icon": "cork"
            },
            {
              "id": "o2",
              "label": "الْقِطْعَةُ النَّقْدِيَّةُ",
              "icon": "coin"
            },
            {
              "id": "o3",
              "label": "قَلَمٌ مَعْدِنِيٌّ",
              "icon": "pen"
            },
            {
              "id": "o4",
              "label": "حَجَرٌ",
              "icon": "solid"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l113_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرْ الْجِسْمَ الَّذِي يَغُوصُ فِي الْمَاءِ.",
        "audioKey": "l113_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْفِلِّينَةُ",
              "icon": "cork"
            },
            {
              "id": "o2",
              "label": "الْقِطْعَةُ النَّقْدِيَّةُ",
              "icon": "coin"
            },
            {
              "id": "o3",
              "label": "قَارُورَةٌ بِلَاسْتِيكِيَّةٌ فَارِغَةٌ",
              "icon": "empty-bottle"
            },
            {
              "id": "o4",
              "label": "وَرَقَةُ شَجَرٍ",
              "icon": "leaf"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l113_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرْ الْجِسْمَ الَّذِي يَطْفُو عَادَةً فَوْقَ الْمَاءِ.",
        "audioKey": "l113_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "حَجَرٌ",
              "icon": "solid"
            },
            {
              "id": "o2",
              "label": "الْقِطْعَةُ النَّقْدِيَّةُ",
              "icon": "coin"
            },
            {
              "id": "o3",
              "label": "قَارُورَةٌ بِلَاسْتِيكِيَّةٌ فَارِغَةٌ",
              "icon": "empty-bottle"
            },
            {
              "id": "o4",
              "label": "قَلَمٌ مَعْدِنِيٌّ",
              "icon": "pen"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l113_ex2_q4",
        "mission": 2,
        "prompt": "اِخْتَرْ الْجِسْمَ الَّذِي يَطْفُو عَادَةً فَوْقَ الْمَاءِ.",
        "audioKey": "l113_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قَلَمٌ مَعْدِنِيٌّ",
              "icon": "pen"
            },
            {
              "id": "o2",
              "label": "الْقِطْعَةُ النَّقْدِيَّةُ",
              "icon": "coin"
            },
            {
              "id": "o3",
              "label": "حَجَرٌ",
              "icon": "solid"
            },
            {
              "id": "o4",
              "label": "وَرَقَةُ شَجَرٍ",
              "icon": "leaf"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l113_ex3_q1",
        "mission": 3,
        "prompt": "أَكْمِلْ: الْجِسْمُ الَّذِي يَبْقَى فَوْقَ الْمَاءِ ...",
        "audioKey": "l113_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُجَرِّبُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يَطْفُو",
              "icon": "float"
            },
            {
              "id": "o2",
              "label": "يَغُوصُ",
              "icon": "sink"
            },
            {
              "id": "o3",
              "label": "يَذُوبُ",
              "icon": "dissolve"
            },
            {
              "id": "o4",
              "label": "يُسْكَبُ",
              "icon": "pour"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l113_ex3_q2",
        "mission": 3,
        "prompt": "أَكْمِلْ: الْجِسْمُ الَّذِي يَنْزِلُ إِلَى أَسْفَلِ الْمَاءِ ...",
        "audioKey": "l113_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُجَرِّبُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "يَطْفُو",
              "icon": "float"
            },
            {
              "id": "o2",
              "label": "يَغُوصُ",
              "icon": "sink"
            },
            {
              "id": "o3",
              "label": "يَذُوبُ",
              "icon": "dissolve"
            },
            {
              "id": "o4",
              "label": "يُسْكَبُ",
              "icon": "pour"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l113_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَذُوبُ فِي الْمَاءِ.",
        "audioKey": "l113_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُجَرِّبُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o3",
              "label": "السُّكَّرُ",
              "icon": "sugar"
            },
            {
              "id": "o4",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l113_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي لَا تَذُوبُ فِي الْمَاءِ.",
        "audioKey": "l113_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُجَرِّبُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مَسْحُوقٌ قَابِلٌ لِلذَّوَبَانِ",
              "icon": "dissolve"
            },
            {
              "id": "o2",
              "label": "السُّكَّرُ",
              "icon": "sugar"
            },
            {
              "id": "o3",
              "label": "الْمِلْحُ",
              "icon": "sugar"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ",
              "icon": "wood"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l113_ex4_q1",
        "mission": 4,
        "prompt": "أَكْمِلْ: الْمَادَّةُ الَّتِي تَخْتَفِي فِي الْمَاءِ ...",
        "audioKey": "l113_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تَذُوبُ",
              "icon": "dissolve"
            },
            {
              "id": "o2",
              "label": "تَطْفُو",
              "icon": "float"
            },
            {
              "id": "o3",
              "label": "تَغُوصُ",
              "icon": "sink"
            },
            {
              "id": "o4",
              "label": "تَبْقَى كَمَا هِيَ",
              "icon": "no-dissolve"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l113_ex4_q2",
        "mission": 4,
        "prompt": "أَكْمِلْ: الْمَادَّةُ الَّتِي تَبْقَى ظَاهِرَةً فِي الْمَاءِ ...",
        "audioKey": "l113_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "تَذُوبُ",
              "icon": "dissolve"
            },
            {
              "id": "o2",
              "label": "لَا تَذُوبُ",
              "icon": "no-dissolve"
            },
            {
              "id": "o3",
              "label": "تَطْفُو دَائِمًا",
              "icon": "float"
            },
            {
              "id": "o4",
              "label": "تَخْتَفِي",
              "icon": "dissolve"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l113_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ مَا نَسْتَعْمِلُهُ لِمُلَاحَظَةِ الطَّفْوِ وَالْغَوْصِ.",
        "audioKey": "l113_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قَلَمًا",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "كِتَابًا",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "كَأْسَ مَاءٍ",
              "icon": "glass+water"
            },
            {
              "id": "o4",
              "label": "بِسْكُوِيتًا",
              "icon": "cookie"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l113_ex4_q4",
        "mission": 4,
        "prompt": "اِخْتَرْ مَا نَسْتَعْمِلُهُ لِمُلَاحَظَةِ الذَّوَبَانِ.",
        "audioKey": "l113_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مِمْحَاةً",
              "icon": "eraser"
            },
            {
              "id": "o2",
              "label": "كِتَابًا",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "قَلَمًا",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "كَأْسَ مَاءٍ",
              "icon": "glass+water"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  },
  "116": {
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ",
      "3": "أُطَبِّقُ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "questions": [
      {
        "id": "l116_ex1_q1",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الْغِذَائِيَّةَ الصُّلْبَةَ.",
        "audioKey": "l116_ex1_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o2",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o3",
              "label": "مَادَّةُ التَّنْظِيفِ",
              "icon": "cleaner"
            },
            {
              "id": "o4",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l116_ex1_q2",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الْغِذَائِيَّةَ السَّائِلَةَ.",
        "audioKey": "l116_ex1_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o2",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o3",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "الْمِمْحَاةُ",
              "icon": "eraser"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l116_ex1_q3",
        "mission": 1,
        "prompt": "اِخْتَرْ الْمَادَّةَ الْغِذَائِيَّةَ الَّتِي تَذُوبُ فِي الْمَاءِ.",
        "audioKey": "l116_ex1_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o3",
              "label": "السُّكَّرُ",
              "icon": "sugar"
            },
            {
              "id": "o4",
              "label": "قَلَمُ الْحِبْرِ",
              "icon": "pen"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l116_ex1_q4",
        "mission": 1,
        "prompt": "اِخْتَرْ أَدَاةَ الْكِتَابَةِ الَّتِي يَزُولُ أَثَرُهَا بِالْمِمْحَاةِ بِسُهُولَةٍ.",
        "audioKey": "l116_ex1_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُصَنِّفُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o2",
              "label": "قَلَمُ الْحِبْرِ",
              "icon": "pen"
            },
            {
              "id": "o3",
              "label": "مَادَّةُ التَّنْظِيفِ",
              "icon": "cleaner"
            },
            {
              "id": "o4",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l116_ex2_q1",
        "mission": 2,
        "prompt": "اِخْتَرْ مَادَّةَ التَّنْظِيفِ السَّائِلَةَ.",
        "audioKey": "l116_ex2_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُنَظِّفٌ سَائِلٌ",
              "icon": "cleaner"
            },
            {
              "id": "o2",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o3",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l116_ex2_q2",
        "mission": 2,
        "prompt": "اِخْتَرْ أَدَاةَ الْكِتَابَةِ الَّتِي لَا يَزُولُ أَثَرُهَا بِالْمِمْحَاةِ بِسُهُولَةٍ.",
        "audioKey": "l116_ex2_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "قَلَمُ الْحِبْرِ",
              "icon": "pen"
            },
            {
              "id": "o3",
              "label": "الْمِمْحَاةُ",
              "icon": "eraser"
            },
            {
              "id": "o4",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l116_ex2_q3",
        "mission": 2,
        "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ الَّتِي تَنْسَابُ وَيُمْكِنُ سَكْبُهَا.",
        "audioKey": "l116_ex2_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o2",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o3",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o4",
              "label": "الْخَشَبُ",
              "icon": "wood"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l116_ex2_q4",
        "mission": 2,
        "prompt": "أَكْمِلْ: الْمَادَّةُ السَّائِلَةُ تَأْخُذُ شَكْلَ ...",
        "audioKey": "l116_ex2_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُمَيِّزُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْقَلَمِ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "الْكِتَابِ",
              "icon": "book"
            },
            {
              "id": "o3",
              "label": "الْخَشَبِ",
              "icon": "wood"
            },
            {
              "id": "o4",
              "label": "الْإِنَاءِ",
              "icon": "glass"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l116_ex3_q1",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي يُمْكِنُ سَكْبُهَا.",
        "audioKey": "l116_ex3_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o2",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o3",
              "label": "الْكِتَابُ",
              "icon": "book"
            },
            {
              "id": "o4",
              "label": "الْمِمْحَاةُ",
              "icon": "eraser"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l116_ex3_q2",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الَّتِي تَذُوبُ فِي الْمَاءِ.",
        "audioKey": "l116_ex3_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o2",
              "label": "السُّكَّرُ",
              "icon": "sugar"
            },
            {
              "id": "o3",
              "label": "الْقَلَمُ",
              "icon": "pencil"
            },
            {
              "id": "o4",
              "label": "الْكِتَابُ",
              "icon": "book"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l116_ex3_q3",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ الصُّلْبَةَ مِنَ الْمَوَادِّ الْغِذَائِيَّةِ.",
        "audioKey": "l116_ex3_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الزَّيْتُ",
              "icon": "oil"
            },
            {
              "id": "o2",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o3",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o4",
              "label": "الْعَصِيرُ",
              "icon": "juice"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l116_ex3_q4",
        "mission": 3,
        "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ مِنَ الْمَوَادِّ الْغِذَائِيَّةِ.",
        "audioKey": "l116_ex3_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أُطَبِّقُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْخَشَبُ",
              "icon": "wood"
            },
            {
              "id": "o2",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o3",
              "label": "السُّكَّرُ",
              "icon": "sugar"
            },
            {
              "id": "o4",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            }
          ],
          "correctId": "o4"
        }
      },
      {
        "id": "l116_ex4_q1",
        "mission": 4,
        "prompt": "اِخْتَرْ مَادَّةَ تَنْظِيفٍ مِنْ بَيْنِ هَذِهِ الْمَوَادِّ.",
        "audioKey": "l116_ex4_q1",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مُنَظِّفٌ سَائِلٌ",
              "icon": "cleaner"
            },
            {
              "id": "o2",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o3",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            },
            {
              "id": "o4",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            }
          ],
          "correctId": "o1"
        }
      },
      {
        "id": "l116_ex4_q2",
        "mission": 4,
        "prompt": "اِخْتَرْ أَدَاةً مَدْرَسِيَّةً مِنْ بَيْنِ هَذِهِ الْمَوَادِّ.",
        "audioKey": "l116_ex4_q2",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "الْحَلِيبُ",
              "icon": "milk"
            },
            {
              "id": "o2",
              "label": "قَلَمُ الرَّصَاصِ",
              "icon": "pencil"
            },
            {
              "id": "o3",
              "label": "مُنَظِّفٌ سَائِلٌ",
              "icon": "cleaner"
            },
            {
              "id": "o4",
              "label": "الْبِسْكُوِيتُ",
              "icon": "cookie"
            }
          ],
          "correctId": "o2"
        }
      },
      {
        "id": "l116_ex4_q3",
        "mission": 4,
        "prompt": "اِخْتَرْ الْوَصْفَ الصَّحِيحَ لِلْحَلِيبِ.",
        "audioKey": "l116_ex4_q3",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "أَدَاةٌ مَدْرَسِيَّةٌ",
              "icon": "pencil"
            },
            {
              "id": "o2",
              "label": "مَادَّةُ تَنْظِيفٍ",
              "icon": "cleaner"
            },
            {
              "id": "o3",
              "label": "مَادَّةٌ غِذَائِيَّةٌ سَائِلَةٌ",
              "icon": "milk"
            },
            {
              "id": "o4",
              "label": "مَادَّةٌ صُلْبَةٌ",
              "icon": "solid"
            }
          ],
          "correctId": "o3"
        }
      },
      {
        "id": "l116_ex4_q4",
        "mission": 4,
        "prompt": "اِخْتَرْ الْوَصْفَ الصَّحِيحَ لِقَلَمِ الرَّصَاصِ.",
        "audioKey": "l116_ex4_q4",
        "visualSymbol": "⭐",
        "visualLabel": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ",
        "premiumIconChoice": {
          "options": [
            {
              "id": "o1",
              "label": "مَادَّةٌ سَائِلَةٌ",
              "icon": "liquid"
            },
            {
              "id": "o2",
              "label": "مَادَّةٌ غِذَائِيَّةٌ",
              "icon": "food"
            },
            {
              "id": "o3",
              "label": "مَادَّةُ تَنْظِيفٍ",
              "icon": "cleaner"
            },
            {
              "id": "o4",
              "label": "أَدَاةٌ مَدْرَسِيَّةٌ يَزُولُ أَثَرُهَا بِالْمِمْحَاةِ",
              "icon": "pencil"
            }
          ],
          "correctId": "o4"
        }
      }
    ]
  }
} as unknown as Record<number, LessonConfig>;

const AUDIO_BASES: Record<number,string> = {
  88: LESSON_88_CONTENT.audio_base + "/exercises",
  104: LESSON_104_CONTENT.audio_base + "/exercises",
  107: LESSON_107_CONTENT.audio_base + "/exercises",
  111: LESSON_111_CONTENT.audio_base + "/exercises",
  113: LESSON_113_CONTENT.audio_base + "/exercises",
  116: LESSON_116_CONTENT.audio_base + "/exercises",
};

const NEXT: Record<number,number> = {
  88: 89,
  104: 105,
  107: 108,
  111: 112,
  113: 114,
  116: 117,
};

function ScienceExercises({
  lessonNum,
}: {
  lessonNum: number;
}) {
  const config = LESSONS[lessonNum];

  function renderActivity({
    question,
    locked,
    showResult,
    submitResult,
  }: UnifiedLessonExerciseRenderContextV2<
    ScienceQuestion
  >) {
    return question.premiumIconChoice ? (
      <SciencePremiumIconChoiceLabV2
        key={`${question.id}-premium-choice`}
        {...question.premiumIconChoice}
        locked={locked}
        showResult={showResult}
        onResult={submitResult}
      />
    ) : null;
  }

  return (
    <UnifiedLessonExercisesV2
      lessonKey={"lesson" + lessonNum}
      audioBase={AUDIO_BASES[lessonNum]}
      questions={config.questions}
      missionTitles={config.missionTitles}
      missionCount={4}
      completionMessage="أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
      nextLessonKey={"lesson" + NEXT[lessonNum]}
      nextPath={"/lesson-v2/" + NEXT[lessonNum]}
      nextLabel="الدَّرْسُ التَّالِي"
      renderActivity={renderActivity}
    />
  );
}

export const Lesson88ScienceExercises =
  () => <ScienceExercises lessonNum={88} />;

export const Lesson104ScienceExercises =
  () => <ScienceExercises lessonNum={104} />;

export const Lesson107ScienceExercises =
  () => <ScienceExercises lessonNum={107} />;

export const Lesson111ScienceExercises =
  () => <ScienceExercises lessonNum={111} />;

export const Lesson113ScienceExercises =
  () => <ScienceExercises lessonNum={113} />;

export const Lesson116ScienceExercises =
  () => <ScienceExercises lessonNum={116} />;
