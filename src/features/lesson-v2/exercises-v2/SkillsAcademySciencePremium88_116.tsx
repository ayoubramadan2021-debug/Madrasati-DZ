import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import SciencePremiumSkillLabV2, {
  type SciencePremiumSkillActivityV2,
} from "./SciencePremiumSkillLabV2";

type ScienceSkillQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    scienceSkill:SciencePremiumSkillActivityV2;
  };

type LessonConfig = {
  lessonKey:string;
  audioBase:string;
  questions:ScienceSkillQuestion[];
  missionTitles:Record<number,string>;
  nextPath:string;
  completionMessage:string;
};

const LESSONS = (
{
  "88": {
    "lessonKey": "lesson88",
    "audioBase": "/audio/teachers/khalil/lesson_88_diverse_objects_1/exercises",
    "questions": [
      {
          "id": "l88_ex1_q1",
          "mission": 1,
          "prompt": "اِخْتَرْ الْمَادَّةَ الصُّلْبَةَ.",
          "audioKey": "l88_ex1_q1",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 2,
                    "options": [
                              {
                                        "icon": "oil",
                                        "label": "الزَّيْتُ"
                              },
                              {
                                        "icon": "juice",
                                        "label": "الْعَصِيرُ"
                              },
                              {
                                        "icon": "book",
                                        "label": "الْكِتَابُ"
                              },
                              {
                                        "icon": "water",
                                        "label": "الْمَاءُ"
                              }
                    ],
                    "visual": {
                              "icon": "hero-liquid",
                              "label": "أُلاحِظُ صُوَرَةَ الْمَوَادِّ"
                    }
          }
},
      {
          "id": "l88_ex1_q2",
          "mission": 1,
          "prompt": "اِخْتَرْ الْمَادَّةَ السَّائِلَةَ.",
          "audioKey": "l88_ex1_q2",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 0,
                    "options": [
                              {
                                        "icon": "water",
                                        "label": "الْمَاءُ"
                              },
                              {
                                        "icon": "wood",
                                        "label": "الْخَشَبُ"
                              },
                              {
                                        "icon": "pencil",
                                        "label": "قَلَمُ الرَّصَاصِ"
                              },
                              {
                                        "icon": "book",
                                        "label": "الْكِتَابُ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex1_q3",
          "mission": 1,
          "prompt": "اِخْتَرْ مَا يَحْتَفِظُ بِشَكْلِهِ.",
          "audioKey": "l88_ex1_q3",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 3,
                    "options": [
                              {
                                        "icon": "juice",
                                        "label": "الْعَصِيرُ"
                              },
                              {
                                        "icon": "water",
                                        "label": "الْمَاءُ"
                              },
                              {
                                        "icon": "oil",
                                        "label": "الزَّيْتُ"
                              },
                              {
                                        "icon": "wood",
                                        "label": "الْخَشَبُ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex1_q4",
          "mission": 1,
          "prompt": "اِخْتَرْ مَا يُمْكِنُ سَكْبُهُ.",
          "audioKey": "l88_ex1_q4",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 1,
                    "options": [
                              {
                                        "icon": "book",
                                        "label": "الْكِتَابُ"
                              },
                              {
                                        "icon": "oil",
                                        "label": "الزَّيْتُ"
                              },
                              {
                                        "icon": "wood",
                                        "label": "الْخَشَبُ"
                              },
                              {
                                        "icon": "cookie",
                                        "label": "الْبِسْكُوِيتُ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex2_q1",
          "mission": 2,
          "prompt": "صَنِّفِ الْكِتَابَ: أَجِسْمٌ صُلْبٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
          "audioKey": "l88_ex2_q1",
          "scienceSkill": {
                    "mode": "dragBin",
                    "item": {
                              "icon": "book",
                              "label": "الْكِتَابُ"
                    },
                    "bins": [
                              {
                                        "icon": "wood",
                                        "label": "جِسْمٌ صُلْبٌ"
                              },
                              {
                                        "icon": "water",
                                        "label": "مَادَّةٌ سَائِلَةٌ"
                              }
                    ],
                    "answer": 0
          }
},
      {
          "id": "l88_ex2_q2",
          "mission": 2,
          "prompt": "صَنِّفِ الْعَصِيرَ: أَجِسْمٌ صُلْبٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
          "audioKey": "l88_ex2_q2",
          "scienceSkill": {
                    "mode": "dragBin",
                    "item": {
                              "icon": "juice",
                              "label": "الْعَصِيرُ"
                    },
                    "bins": [
                              {
                                        "icon": "wood",
                                        "label": "جِسْمٌ صُلْبٌ"
                              },
                              {
                                        "icon": "water",
                                        "label": "مَادَّةٌ سَائِلَةٌ"
                              }
                    ],
                    "answer": 1
          }
},
      {
          "id": "l88_ex2_q3",
          "mission": 2,
          "prompt": "صَنِّفْ قَلَمَ الرَّصَاصِ: أَجِسْمٌ صُلْبٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
          "audioKey": "l88_ex2_q3",
          "scienceSkill": {
                    "mode": "dragBin",
                    "item": {
                              "icon": "pencil",
                              "label": "قَلَمُ الرَّصَاصِ"
                    },
                    "bins": [
                              {
                                        "icon": "wood",
                                        "label": "جِسْمٌ صُلْبٌ"
                              },
                              {
                                        "icon": "water",
                                        "label": "مَادَّةٌ سَائِلَةٌ"
                              }
                    ],
                    "answer": 0
          }
},
      {
          "id": "l88_ex2_q4",
          "mission": 2,
          "prompt": "صَنِّفِ الزَّيْتَ: أَجِسْمٌ صُلْبٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
          "audioKey": "l88_ex2_q4",
          "scienceSkill": {
                    "mode": "dragBin",
                    "item": {
                              "icon": "oil",
                              "label": "الزَّيْتُ"
                    },
                    "bins": [
                              {
                                        "icon": "wood",
                                        "label": "جِسْمٌ صُلْبٌ"
                              },
                              {
                                        "icon": "water",
                                        "label": "مَادَّةٌ سَائِلَةٌ"
                              }
                    ],
                    "answer": 1
          }
},
      {
          "id": "l88_ex3_q1",
          "mission": 3,
          "prompt": "مَا الْمَادَّةُ الَّتِي نَسْكُبُهَا فِي التَّجْرِبَةِ؟",
          "audioKey": "l88_ex3_q1",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 2,
                    "options": [
                              {
                                        "icon": "",
                                        "label": "الْخَشَبُ"
                              },
                              {
                                        "icon": "",
                                        "label": "الْكِتَابُ"
                              },
                              {
                                        "icon": "",
                                        "label": "الْمَاءُ"
                              },
                              {
                                        "icon": "",
                                        "label": "الْمِمْحَاةُ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex3_q2",
          "mission": 3,
          "prompt": "إِلَى أَيِّ إِنَاءٍ نَسْكُبُ الْمَاءَ؟",
          "audioKey": "l88_ex3_q2",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 0,
                    "options": [
                              {
                                        "icon": "",
                                        "label": "إِلَى الْكَأْسِ"
                              },
                              {
                                        "icon": "",
                                        "label": "إِلَى الْمِمْحَاةِ"
                              },
                              {
                                        "icon": "",
                                        "label": "إِلَى الْكِتَابِ"
                              },
                              {
                                        "icon": "",
                                        "label": "إِلَى الْخَشَبِ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex3_q3",
          "mission": 3,
          "prompt": "عِنْدَ نَقْلِ السَّائِلِ، مَا الَّذِي يَتَغَيَّرُ؟",
          "audioKey": "l88_ex3_q3",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 3,
                    "options": [
                              {
                                        "icon": "",
                                        "label": "لَوْنُ السَّائِلِ"
                              },
                              {
                                        "icon": "",
                                        "label": "أَنَّهُ سَائِلٌ"
                              },
                              {
                                        "icon": "",
                                        "label": "اِسْمُ السَّائِلِ"
                              },
                              {
                                        "icon": "",
                                        "label": "شَكْلُ السَّائِلِ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex3_q4",
          "mission": 3,
          "prompt": "عِنْدَ نَقْلِ السَّائِلِ، مَا الَّذِي لَا يَتَغَيَّرُ؟",
          "audioKey": "l88_ex3_q4",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 1,
                    "options": [
                              {
                                        "icon": "",
                                        "label": "يَأْخُذُ شَكْلَ الْكِتَابِ"
                              },
                              {
                                        "icon": "",
                                        "label": "يَبْقَى سَائِلًا"
                              },
                              {
                                        "icon": "",
                                        "label": "يُصْبِحُ صُلْبًا"
                              },
                              {
                                        "icon": "",
                                        "label": "يَخْتَفِي"
                              }
                    ]
          }
},
      {
          "id": "l88_ex4_q1",
          "mission": 4,
          "prompt": "نُرِيدُ تَحْضِيرَ شَرَابٍ. أَيُّ زَوْجٍ نَحْتَاجُ؟",
          "audioKey": "l88_ex4_q1",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 2,
                    "options": [
                              {
                                        "icon": "book+pencil",
                                        "label": "كِتَابٌ وَقَلَمٌ"
                              },
                              {
                                        "icon": "book+cookie",
                                        "label": "كِتَابٌ وَبِسْكُوِيتٌ"
                              },
                              {
                                        "icon": "water+glass-empty",
                                        "label": "مَاءٌ وَكَأْسٌ"
                              },
                              {
                                        "icon": "wood+eraser",
                                        "label": "خَشَبٌ وَمِمْحَاةٌ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex4_q2",
          "mission": 4,
          "prompt": "أَيُّ زَوْجٍ يَبْقَى شَكْلُهُ ثَابِتًا دَاخِلَ الْحَقِيبَةِ؟",
          "audioKey": "l88_ex4_q2",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 0,
                    "options": [
                              {
                                        "icon": "book+pencil",
                                        "label": "كِتَابٌ وَقَلَمٌ"
                              },
                              {
                                        "icon": "oil+water",
                                        "label": "زَيْتٌ وَمَاءٌ"
                              },
                              {
                                        "icon": "juice+oil",
                                        "label": "عَصِيرٌ وَزَيْتٌ"
                              },
                              {
                                        "icon": "water+juice",
                                        "label": "مَاءٌ وَعَصِيرٌ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex4_q3",
          "mission": 4,
          "prompt": "أَيُّ زَوْجٍ يُمَثِّلُ مَادَّتَيْنِ سَائِلَتَيْنِ؟",
          "audioKey": "l88_ex4_q3",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 3,
                    "options": [
                              {
                                        "icon": "book+wood",
                                        "label": "كِتَابٌ وَخَشَبٌ"
                              },
                              {
                                        "icon": "book+cookie",
                                        "label": "كِتَابٌ وَبِسْكُوِيتٌ"
                              },
                              {
                                        "icon": "pencil+eraser",
                                        "label": "قَلَمٌ وَمِمْحَاةٌ"
                              },
                              {
                                        "icon": "water+juice",
                                        "label": "مَاءٌ وَعَصِيرٌ"
                              }
                    ]
          }
},
      {
          "id": "l88_ex4_q4",
          "mission": 4,
          "prompt": "اِخْتَرْ جِسْمَيْنِ صُلْبَيْنِ يَحْتَفِظَانِ بِشَكْلِهِمَا.",
          "audioKey": "l88_ex4_q4",
          "scienceSkill": {
                    "mode": "choice",
                    "answer": 1,
                    "options": [
                              {
                                        "icon": "book+water",
                                        "label": "كِتَابٌ وَمَاءٌ"
                              },
                              {
                                        "icon": "book+wood",
                                        "label": "كِتَابٌ وَخَشَبٌ"
                              },
                              {
                                        "icon": "water+juice",
                                        "label": "مَاءٌ وَعَصِيرٌ"
                              },
                              {
                                        "icon": "oil+water",
                                        "label": "زَيْتٌ وَمَاءٌ"
                              }
                    ]
          }
}
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُصَنِّفُ",
      "3": "أُجَرِّبُ السَّوَائِلَ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "nextPath": "/lesson-v2/89",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "92": {
    "lessonKey": "lesson92",
    "audioBase": "/audio/teachers/khalil/lesson_92_varied_objects_2/exercises",
    "missionTitles": {
      "1": "أَتَعَرَّفُ مَا يَذُوبُ",
      "2": "أُمَيِّزُ",
      "3": "أُلَاحِظُ أَثَرَ الْحَرَارَةِ",
      "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
    },
    "completionMessage": "أَحْسَنْتَ! تَعَلَّمْتَ أَنَّ بَعْضَ الْمَوَادِّ الصُّلْبَةِ تَذُوبُ بِالْحَرَارَةِ.",
    "nextPath": "/lesson-v2/93",
    "questions": [
      {
        "id": "l92_ex1_q1",
        "mission": 1,
        "prompt": "أَشِرْ إِلَى الشُّوكُولَاطَةِ.",
        "audioKey": "l92_ex1_q1",
        "scienceSkill": {
          "mode": "choice",
          "answer": 0,
          "options": [
            {
              "icon": "chocolate-92",
              "label": ""
            },
            {
              "icon": "orange-92",
              "label": ""
            },
            {
              "icon": "table-92",
              "label": ""
            },
            {
              "icon": "icecream-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex1_q2",
        "mission": 1,
        "prompt": "أَشِرْ إِلَى الزُّبْدَةِ.",
        "audioKey": "l92_ex1_q2",
        "scienceSkill": {
          "mode": "choice",
          "answer": 2,
          "options": [
            {
              "icon": "orange-92",
              "label": ""
            },
            {
              "icon": "table-92",
              "label": ""
            },
            {
              "icon": "butter-92",
              "label": ""
            },
            {
              "icon": "icecream-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex1_q3",
        "mission": 1,
        "prompt": "هَلْ تَذُوبُ الشُّوكُولَاطَةُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex1_q3",
        "scienceSkill": {
          "mode": "choice",
          "visual": {
            "icon": "chocolate-92",
            "label": ""
          },
          "answer": 0,
          "options": [
            {
              "icon": "",
              "label": "نَعَمْ."
            },
            {
              "icon": "",
              "label": "لَا."
            }
          ]
        }
      },
      {
        "id": "l92_ex1_q4",
        "mission": 1,
        "prompt": "هَلْ تَذُوبُ الزُّبْدَةُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex1_q4",
        "scienceSkill": {
          "mode": "choice",
          "visual": {
            "icon": "butter-92",
            "label": ""
          },
          "answer": 1,
          "options": [
            {
              "icon": "",
              "label": "لَا."
            },
            {
              "icon": "",
              "label": "نَعَمْ."
            }
          ]
        }
      },
      {
        "id": "l92_ex2_q1",
        "mission": 2,
        "prompt": "أَيُّهُمَا يَذُوبُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex2_q1",
        "scienceSkill": {
          "mode": "choice",
          "answer": 1,
          "options": [
            {
              "icon": "table-92",
              "label": ""
            },
            {
              "icon": "chocolate-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex2_q2",
        "mission": 2,
        "prompt": "أَيُّهُمَا يَذُوبُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex2_q2",
        "scienceSkill": {
          "mode": "choice",
          "answer": 0,
          "options": [
            {
              "icon": "butter-92",
              "label": ""
            },
            {
              "icon": "orange-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex2_q3",
        "mission": 2,
        "prompt": "هَلْ تَذُوبُ الطَّاوِلَةُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex2_q3",
        "scienceSkill": {
          "mode": "choice",
          "visual": {
            "icon": "table-92",
            "label": ""
          },
          "answer": 1,
          "options": [
            {
              "icon": "",
              "label": "نَعَمْ."
            },
            {
              "icon": "",
              "label": "لَا."
            }
          ]
        }
      },
      {
        "id": "l92_ex2_q4",
        "mission": 2,
        "prompt": "هَلْ تَذُوبُ الْمُثَلَّجَاتُ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex2_q4",
        "scienceSkill": {
          "mode": "choice",
          "visual": {
            "icon": "icecream-92",
            "label": ""
          },
          "answer": 0,
          "options": [
            {
              "icon": "",
              "label": "نَعَمْ."
            },
            {
              "icon": "",
              "label": "لَا."
            }
          ]
        }
      },
      {
        "id": "l92_ex3_q1",
        "mission": 3,
        "prompt": "مَاذَا حَدَثَ لِلشُّوكُولَاطَةِ بِالْحَرَارَةِ؟",
        "audioKey": "l92_ex3_q1",
        "scienceSkill": {
          "mode": "choice",
          "answer": 0,
          "options": [
            {
              "icon": "",
              "label": "ذَابَتْ."
            },
            {
              "icon": "",
              "label": "لَمْ تَذُبْ."
            }
          ]
        }
      },
      {
  "id": "l92_ex3_q2",
  "mission": 3,
  "prompt": "مَاذَا حَدَثَ لِلزُّبْدَةِ بِالْحَرَارَةِ؟",
  "audioKey": "l92_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "ذَابَتْ."
      },
      {
        "icon": "",
        "label": "لَمْ تَذُبْ."
      }
    ]
  }
},
      {
  "id": "l92_ex3_q3",
  "mission": 3,
  "prompt": "بَعْدَ الْحَرَارَةِ، كَيْفَ أَصْبَحَتِ الشُّوكُولَاطَةُ؟",
  "audioKey": "l92_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "ذَائِبَةً."
      },
      {
        "icon": "",
        "label": "صُلْبَةً."
      }
    ]
  }
},
      {
  "id": "l92_ex3_q4",
  "mission": 3,
  "prompt": "بَعْدَ الْحَرَارَةِ، كَيْفَ أَصْبَحَتِ الزُّبْدَةُ؟",
  "audioKey": "l92_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "ذَائِبَةً."
      },
      {
        "icon": "",
        "label": "صُلْبَةً."
      }
    ]
  }
},
      {
        "id": "l92_ex4_q1",
        "mission": 4,
        "prompt": "أَشِرْ إِلَى جِسْمٍ يَذُوبُ بِالْحَرَارَةِ.",
        "audioKey": "l92_ex4_q1",
        "scienceSkill": {
          "mode": "choice",
          "answer": 0,
          "options": [
            {
              "icon": "chocolate-92",
              "label": ""
            },
            {
              "icon": "table-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex4_q2",
        "mission": 4,
        "prompt": "أَشِرْ إِلَى جِسْمٍ يَذُوبُ بِالْحَرَارَةِ.",
        "audioKey": "l92_ex4_q2",
        "scienceSkill": {
          "mode": "choice",
          "answer": 1,
          "options": [
            {
              "icon": "orange-92",
              "label": ""
            },
            {
              "icon": "butter-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex4_q3",
        "mission": 4,
        "prompt": "أَيُّ جِسْمٍ يَذُوبُ فِي مَكَانٍ دَافِئٍ؟",
        "audioKey": "l92_ex4_q3",
        "scienceSkill": {
          "mode": "choice",
          "answer": 1,
          "options": [
            {
              "icon": "orange-92",
              "label": ""
            },
            {
              "icon": "icecream-92",
              "label": ""
            }
          ]
        }
      },
      {
        "id": "l92_ex4_q4",
        "mission": 4,
        "prompt": "مَتَى تَذُوبُ بَعْضُ الْمَوَادِّ الصُّلْبَةِ؟",
        "audioKey": "l92_ex4_q4",
        "scienceSkill": {
          "mode": "choice",
          "answer": 0,
          "options": [
            {
              "icon": "",
              "label": "عِنْدَ تَعَرُّضِهَا لِلْحَرَارَةِ."
            },
            {
              "icon": "",
              "label": "عِنْدَ تَعَرُّضِهَا لِلْبُرُودَةِ."
            }
          ]
        }
      }
    ]
  },
  "104": {
    "lessonKey": "lesson104",
    "audioBase": "/audio/teachers/khalil/lesson_104_cleaning_disinfection_products/exercises",
    "questions": [
      {
  "id": "l104_ex1_q1",
  "mission": 1,
  "prompt": "غَسْلُ الْفَوَاكِهِ بِالْمَاءِ لِإِزَالَةِ الْأَوْسَاخِ يُعَدُّ:",
  "audioKey": "l104_ex1_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "disinfectant",
        "label": "تَطْهِيرٌ"
      },
      {
        "icon": "sponge",
        "label": "تَنْظِيفٌ"
      }
    ]
  }
},
      {
  "id": "l104_ex1_q2",
  "mission": 1,
  "prompt": "مَسْحُ أَرْضِيَّةِ الْمَنْزِلِ لِإِزَالَةِ الْأَوْسَاخِ يُعَدُّ:",
  "audioKey": "l104_ex1_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "mop",
        "label": "تَنْظِيفٌ"
      },
      {
        "icon": "disinfectant",
        "label": "تَطْهِيرٌ"
      }
    ]
  }
},
      {
  "id": "l104_ex1_q3",
  "mission": 1,
  "prompt": "اِسْتِعْمَالُ مُطَهِّرٍ لِلْقَضَاءِ عَلَى الْجَرَاثِيمِ يُعَدُّ:",
  "audioKey": "l104_ex1_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "sponge",
        "label": "تَنْظِيفٌ"
      },
      {
        "icon": "disinfectant",
        "label": "تَطْهِيرٌ"
      }
    ]
  }
},
      {
  "id": "l104_ex1_q4",
  "mission": 1,
  "prompt": "إِزَالَةُ الْغُبَارِ وَالْأَوْسَاخِ مِنَ الطَّاوِلَةِ تُعَدُّ:",
  "audioKey": "l104_ex1_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "sponge",
        "label": "تَنْظِيفٌ"
      },
      {
        "icon": "disinfectant",
        "label": "تَطْهِيرٌ"
      }
    ]
  }
},
      {
  "id": "l104_ex2_q1",
  "mission": 2,
  "prompt": "مَا الْأَدَاةُ الْأَنْسَبُ لِمَسْحِ أَرْضِيَّةِ الْمَنْزِلِ؟",
  "audioKey": "l104_ex2_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "sponge",
        "label": "الْإِسْفَنْجَةُ"
      },
      {
        "icon": "soap",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "mop",
        "label": "الْمِمْسَحَةُ"
      },
      {
        "icon": "disinfectant",
        "label": "الْمُطَهِّرُ"
      }
    ]
  }
},
      {
  "id": "l104_ex2_q2",
  "mission": 2,
  "prompt": "مَا الْأَدَاةُ الْأَنْسَبُ لِفَرْكِ سَطْحٍ مُتَّسِخٍ؟",
  "audioKey": "l104_ex2_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "sponge",
        "label": "الْإِسْفَنْجَةُ"
      },
      {
        "icon": "mop",
        "label": "الْمِمْسَحَةُ"
      },
      {
        "icon": "bucket",
        "label": "الدَّلْوُ"
      },
      {
        "icon": "soap",
        "label": "الصَّابُونُ"
      }
    ]
  }
},
      {
  "id": "l104_ex2_q3",
  "mission": 2,
  "prompt": "مَا الْمَادَّةُ الَّتِي نَسْتَعْمِلُهَا لِغَسْلِ الْيَدَيْنِ؟",
  "audioKey": "l104_ex2_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "bucket",
        "label": "الدَّلْوُ"
      },
      {
        "icon": "sponge",
        "label": "الْإِسْفَنْجَةُ"
      },
      {
        "icon": "mop",
        "label": "الْمِمْسَحَةُ"
      },
      {
        "icon": "soap",
        "label": "الصَّابُونُ"
      }
    ]
  }
},
      {
  "id": "l104_ex2_q4",
  "mission": 2,
  "prompt": "مَا الْمَادَّةُ الْمُخَصَّصَةُ لِلْقَضَاءِ عَلَى الْجَرَاثِيمِ؟",
  "audioKey": "l104_ex2_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "cleaner",
        "label": "سَائِلُ التَّنْظِيفِ"
      },
      {
        "icon": "disinfectant",
        "label": "الْمُطَهِّرُ"
      },
      {
        "icon": "bucket",
        "label": "الدَّلْوُ"
      },
      {
        "icon": "mop",
        "label": "الْمِمْسَحَةُ"
      }
    ]
  }
},
      {
  "id": "l104_ex3_q1",
  "mission": 3,
  "prompt": "مَا الْخُطْوَةُ الْأُولَى عِنْدَ غَسْلِ الْيَدَيْنِ؟",
  "audioKey": "l104_ex3_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "أُبَلِّلُ يَدَيَّ بِالْمَاءِ"
      },
      {
        "icon": "",
        "label": "أُجَفِّفُ يَدَيَّ"
      },
      {
        "icon": "",
        "label": "أَضَعُ الصَّابُونَ"
      },
      {
        "icon": "",
        "label": "أَشْطُفُ يَدَيَّ"
      }
    ]
  }
},
      {
  "id": "l104_ex3_q2",
  "mission": 3,
  "prompt": "بَعْدَ تَبْلِيلِ الْيَدَيْنِ بِالْمَاءِ، مَاذَا أَفْعَلُ؟",
  "audioKey": "l104_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "",
        "label": "أُجَفِّفُ يَدَيَّ"
      },
      {
        "icon": "",
        "label": "أَشْطُفُ يَدَيَّ"
      },
      {
        "icon": "",
        "label": "أَضَعُ الصَّابُونَ"
      },
      {
        "icon": "",
        "label": "أُغْلِقُ الصُّنْبُورَ"
      }
    ]
  }
},
      {
  "id": "l104_ex3_q3",
  "mission": 3,
  "prompt": "بَعْدَ وَضْعِ الصَّابُونِ، مَاذَا أَفْعَلُ؟",
  "audioKey": "l104_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "أُجَفِّفُ يَدَيَّ"
      },
      {
        "icon": "",
        "label": "أَفْرُكُ يَدَيَّ جَيِّدًا"
      },
      {
        "icon": "",
        "label": "أَضَعُ الْمِمْسَحَةَ"
      },
      {
        "icon": "",
        "label": "أَمْسَحُ الطَّاوِلَةَ"
      }
    ]
  }
},
      {
  "id": "l104_ex3_q4",
  "mission": 3,
  "prompt": "بَعْدَ شَطْفِ الْيَدَيْنِ بِالْمَاءِ، مَاذَا أَفْعَلُ؟",
  "audioKey": "l104_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "",
        "label": "أَضَعُ الصَّابُونَ مِنْ جَدِيدٍ"
      },
      {
        "icon": "",
        "label": "أَلْمَسُ الْأَوْسَاخَ"
      },
      {
        "icon": "",
        "label": "أَضَعُ الْمُطَهِّرَ عَلَى الطَّاوِلَةِ"
      },
      {
        "icon": "",
        "label": "أُجَفِّفُ يَدَيَّ"
      }
    ]
  }
},
      {
  "id": "l104_ex4_q1",
  "mission": 4,
  "prompt": "قَبْلَ أَكْلِ تُفَّاحَةٍ، مَاذَا نَفْعَلُ؟",
  "audioKey": "l104_ex4_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "نَضَعُهَا عَلَى الْأَرْضِ"
      },
      {
        "icon": "",
        "label": "نَغْسِلُهَا بِالْمَاءِ"
      },
      {
        "icon": "",
        "label": "نُلَوِّنُهَا"
      },
      {
        "icon": "",
        "label": "نَتْرُكُهَا مُتَّسِخَةً"
      }
    ]
  }
},
      {
  "id": "l104_ex4_q2",
  "mission": 4,
  "prompt": "مَاذَا نُزِيلُ بِعَمَلِيَّةِ التَّنْظِيفِ؟",
  "audioKey": "l104_ex4_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "",
        "label": "شَكْلَ الْجِسْمِ"
      },
      {
        "icon": "",
        "label": "اسْمَ الْجِسْمِ"
      },
      {
        "icon": "",
        "label": "لَوْنَ الْجِسْمِ"
      },
      {
        "icon": "",
        "label": "الْأَوْسَاخَ"
      }
    ]
  }
},
      {
  "id": "l104_ex4_q3",
  "mission": 4,
  "prompt": "مَا الْهَدَفُ مِنَ التَّطْهِيرِ؟",
  "audioKey": "l104_ex4_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "الْقَضَاءُ عَلَى الْجَرَاثِيمِ"
      },
      {
        "icon": "",
        "label": "تَلْوِينُ السُّطُوحِ"
      },
      {
        "icon": "",
        "label": "تَغْيِيرُ شَكْلِ الْأَشْيَاءِ"
      },
      {
        "icon": "",
        "label": "تَرْكُ الْأَوْسَاخِ"
      }
    ]
  }
},
      {
  "id": "l104_ex4_q4",
  "mission": 4,
  "prompt": "اِخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ.",
  "audioKey": "l104_ex4_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "",
        "label": "التَّنْظِيفُ وَالتَّطْهِيرُ شَيْءٌ وَاحِدٌ."
      },
      {
        "icon": "",
        "label": "التَّطْهِيرُ يَعْنِي إِزَالَةَ الْغُبَارِ فَقَطْ."
      },
      {
        "icon": "",
        "label": "التَّنْظِيفُ يُزِيلُ الْأَوْسَاخَ، وَالتَّطْهِيرُ يَقْضِي عَلَى الْجَرَاثِيمِ."
      },
      {
        "icon": "",
        "label": "لَا نَحْتَاجُ إِلَى النَّظَافَةِ."
      }
    ]
  }
}
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُمَيِّزُ بَيْنَ التَّنْظِيفِ وَالتَّطْهِيرِ",
      "3": "أُرَتِّبُ الْخُطُوَاتِ",
      "4": "أُصَنِّفُ الْأَعْمَالَ"
    },
    "nextPath": "/lesson-v2/105",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "107": {
    "lessonKey": "lesson107",
    "audioBase": "/audio/teachers/taline/lesson_107_cleaning_disinfection_safety/exercises",
    "questions": [
      {
  "id": "l107_ex1_q1",
  "mission": 1,
  "prompt": "رَأَيْتَ رَمْزَ الْخَطَرِ عَلَى قَارُورَةٍ. مَا التَّصَرُّفُ الصَّحِيحُ؟",
  "audioKey": "l107_ex1_q1",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "warning-cleaner",
      "label": "مَادَّةٌ تَحْمِلُ رَمْزَ الْخَطَرِ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "لَا تَفْتَحْهَا وَأَخْبِرْ شَخْصًا كَبِيرًا."
      },
      {
        "icon": "",
        "label": "اِفْتَحْهَا وَحْدَكَ."
      }
    ]
  }
},
      {
  "id": "l107_ex1_q2",
  "mission": 1,
  "prompt": "وَجَدْتَ مَادَّةَ تَنْظِيفٍ لَا تَعْرِفُهَا. هَلْ يَجُوزُ لَكَ تَذَوُّقُهَا؟",
  "audioKey": "l107_ex1_q2",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "cleaner-107",
      "label": "مَادَّةُ تَنْظِيفٍ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، تَذَوَّقْهَا."
      },
      {
        "icon": "",
        "label": "لَا، لَا تَتَذَوَّقْهَا."
      }
    ]
  }
},
      {
  "id": "l107_ex1_q3",
  "mission": 1,
  "prompt": "وَجَدْتَ سَائِلًا مَجْهُولًا. هَلْ يَجُوزُ لَكَ سَكْبُهُ عَلَى جِسْمِكَ؟",
  "audioKey": "l107_ex1_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "warning-cleaner",
      "label": "سَائِلٌ مَجْهُولٌ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "لَا، لَا تَسْكُبْهُ عَلَى جِسْمِكَ."
      },
      {
        "icon": "",
        "label": "نَعَمْ، اُسْكُبْهُ عَلَى جِسْمِكَ."
      }
    ]
  }
},
      {
  "id": "l107_ex1_q4",
  "mission": 1,
  "prompt": "قَبْلَ اسْتِعْمَالِ مَادَّةٍ تَحْمِلُ تَحْذِيرًا، مَاذَا يَجِبُ أَنْ تَفْعَلَ؟",
  "audioKey": "l107_ex1_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "warning-cleaner",
      "label": "تَحْذِيرٌ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "اِسْتَعْمِلْهَا وَحْدَكَ."
      },
      {
        "icon": "",
        "label": "اِسْتَعِنْ بِشَخْصٍ كَبِيرٍ."
      }
    ]
  }
},
      {
  "id": "l107_ex2_q1",
  "mission": 2,
  "prompt": "أَيْنَ يَجِبُ أَنْ تُحْفَظَ مَوَادُّ التَّنْظِيفِ بِأَمَانٍ؟",
  "audioKey": "l107_ex2_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "",
        "label": "بِجَانِبِ الْأَغْذِيَةِ"
      },
      {
        "icon": "",
        "label": "فَوْقَ طَاوِلَةِ الطِّفْلِ"
      },
      {
        "icon": "",
        "label": "عَلَى الْأَرْضِ"
      },
      {
        "icon": "",
        "label": "فِي خِزَانَةٍ مُغْلَقَةٍ بَعِيدَةٍ عَنِ الْأَطْفَالِ"
      }
    ]
  }
},
      {
  "id": "l107_ex2_q2",
  "mission": 2,
  "prompt": "أَيُّ مَكَانٍ غَيْرُ آمِنٍ لِحِفْظِ مُنَظِّفِ الْمَنْزِلِ؟",
  "audioKey": "l107_ex2_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "مَكَانٌ مُرْتَفِعٌ"
      },
      {
        "icon": "",
        "label": "مَكَانٌ يَصِلُ إِلَيْهِ الطِّفْلُ بِسُهُولَةٍ"
      },
      {
        "icon": "",
        "label": "خِزَانَةٌ مُغْلَقَةٌ"
      },
      {
        "icon": "",
        "label": "مَكَانٌ خَاصٌّ بِمَوَادِّ التَّنْظِيفِ"
      }
    ]
  }
},
      {
  "id": "l107_ex2_q3",
  "mission": 2,
  "prompt": "هَلْ تُحْفَظُ مُنَظِّفَاتُ الْمَنْزِلِ بِجَانِبِ الْأَغْذِيَةِ؟",
  "audioKey": "l107_ex2_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "لَا، يَجِبُ إِبْعَادُهَا عَنِ الْأَغْذِيَةِ."
      },
      {
        "icon": "",
        "label": "نَعَمْ، إِذَا كَانَتِ الْقَارُورَةُ مُغْلَقَةً."
      },
      {
        "icon": "",
        "label": "نَعَمْ، إِذَا كَانَتْ فِي مَكَانٍ مُرْتَفِعٍ."
      },
      {
        "icon": "",
        "label": "يُمْكِنُ وَضْعُهَا مَعَ الْمَشْرُوبَاتِ."
      }
    ]
  }
},
      {
  "id": "l107_ex2_q4",
  "mission": 2,
  "prompt": "مَا الْقَاعِدَةُ الصَّحِيحَةُ لِحِفْظِ مَوَادِّ التَّنْظِيفِ؟",
  "audioKey": "l107_ex2_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "",
        "label": "ضَعْهَا مَعَ الْأَغْذِيَةِ."
      },
      {
        "icon": "",
        "label": "اُتْرُكْهَا عَلَى الْأَرْضِ."
      },
      {
        "icon": "",
        "label": "احْفَظْهَا فِي مَكَانٍ خَاصٍّ وَمُغْلَقٍ بَعِيدًا عَنِ الْأَطْفَالِ."
      },
      {
        "icon": "",
        "label": "ضَعْهَا فَوْقَ طَاوِلَةِ الطِّفْلِ."
      }
    ]
  }
},
      {
  "id": "l107_ex3_q1",
  "mission": 3,
  "prompt": "وَجَدْتَ قَارُورَةً لَا تَعْرِفُ مَا فِيهَا. مَاذَا تَفْعَلُ؟",
  "audioKey": "l107_ex3_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "اِفْتَحْهَا وَشُمَّ مَا فِيهَا."
      },
      {
        "icon": "",
        "label": "لَا تَلْمَسْهَا وَأَخْبِرْ شَخْصًا كَبِيرًا."
      }
    ]
  }
},
      {
  "id": "l107_ex3_q2",
  "mission": 3,
  "prompt": "اِنْسَكَبَتْ مَادَّةُ تَنْظِيفٍ عَلَى الْأَرْضِ أَمَامَكَ. مَاذَا تَفْعَلُ؟",
  "audioKey": "l107_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "اِبْتَعِدْ عَنْهَا وَأَخْبِرْ شَخْصًا كَبِيرًا."
      },
      {
        "icon": "",
        "label": "اِلْمَسْهَا بِيَدِكَ."
      }
    ]
  }
},
      {
  "id": "l107_ex3_q3",
  "mission": 3,
  "prompt": "أَرَدْتَ اسْتِعْمَالَ مُطَهِّرٍ. مَا الَّذِي يَجِبُ أَنْ تَفْعَلَهُ؟",
  "audioKey": "l107_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "اِسْتَعْمِلْهُ وَحْدَكَ."
      },
      {
        "icon": "",
        "label": "اُطْلُبْ مُسَاعَدَةَ شَخْصٍ كَبِيرٍ."
      }
    ]
  }
},
      {
  "id": "l107_ex3_q4",
  "mission": 3,
  "prompt": "هَلْ يَجُوزُ لَكَ خَلْطُ مَوَادِّ التَّنْظِيفِ بَعْضِهَا بِبَعْضٍ؟",
  "audioKey": "l107_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "لَا، لَا تَخْلِطْهَا."
      },
      {
        "icon": "",
        "label": "نَعَمْ، اُخْلِطْهَا."
      }
    ]
  }
},
      {
  "id": "l107_ex4_q1",
  "mission": 4,
  "prompt": "وَجَدْتَ مُنَظِّفًا بِجَانِبِ الْأَغْذِيَةِ. مَا التَّصَرُّفُ الصَّحِيحُ؟",
  "audioKey": "l107_ex4_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "اُتْرُكْهُ بِجَانِبِ الْأَغْذِيَةِ."
      },
      {
        "icon": "",
        "label": "أَخْبِرْ شَخْصًا كَبِيرًا لِيَضَعَهُ فِي مَكَانٍ آمِنٍ."
      },
      {
        "icon": "",
        "label": "اِفْتَحِ الْقَارُورَةَ."
      },
      {
        "icon": "",
        "label": "ضَعْهُ مَعَ الْمَشْرُوبَاتِ."
      }
    ]
  }
},
      {
  "id": "l107_ex4_q2",
  "mission": 4,
  "prompt": "رَأَيْتَ رَمْزَ الْخَطَرِ عَلَى قَارُورَةٍ. مَا التَّصَرُّفُ الصَّحِيحُ؟",
  "audioKey": "l107_ex4_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "",
        "label": "تَذَوَّقْ مَا بِدَاخِلِهَا."
      },
      {
        "icon": "",
        "label": "اِفْتَحْهَا لِتَعْرِفَ مَا فِيهَا."
      },
      {
        "icon": "",
        "label": "لَا تَلْمَسْهَا وَأَخْبِرْ شَخْصًا كَبِيرًا."
      },
      {
        "icon": "",
        "label": "اِلْعَبْ بِهَا وَهِيَ مُغْلَقَةٌ."
      }
    ]
  }
},
      {
  "id": "l107_ex4_q3",
  "mission": 4,
  "prompt": "أَيُّ عِبَارَةٍ تَدُلُّ عَلَى تَصَرُّفٍ آمِنٍ مَعَ مَوَادِّ التَّنْظِيفِ؟",
  "audioKey": "l107_ex4_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "اِسْتَعْمِلْهَا بِحَذَرٍ وَبِمُسَاعَدَةِ شَخْصٍ كَبِيرٍ."
      },
      {
        "icon": "",
        "label": "تَذَوَّقْهَا لِتَعْرِفَ نَوْعَهَا."
      },
      {
        "icon": "",
        "label": "ضَعْهَا مَعَ الْأَغْذِيَةِ."
      },
      {
        "icon": "",
        "label": "اُتْرُكْهَا فِي مُتَنَاوَلِ الْأَطْفَالِ."
      }
    ]
  }
},
      {
  "id": "l107_ex4_q4",
  "mission": 4,
  "prompt": "أَيْنَ يَجِبُ أَنْ تُحْفَظَ الْمَوَادُّ الَّتِي قَدْ تَكُونُ خَطِرَةً؟",
  "audioKey": "l107_ex4_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "",
        "label": "مَعَ الْأَلْعَابِ"
      },
      {
        "icon": "",
        "label": "بِجَانِبِ الْأَغْذِيَةِ"
      },
      {
        "icon": "",
        "label": "فَوْقَ طَاوِلَةِ الطِّفْلِ"
      },
      {
        "icon": "",
        "label": "فِي خِزَانَةٍ مُغْلَقَةٍ بَعِيدَةٍ عَنِ الْأَطْفَالِ"
      }
    ]
  }
}
    ],
    "missionTitles": {
      "1": "آمِنٌ أَمْ خَطِرٌ؟",
      "2": "أُصَنِّفُ الْمَوَاقِفَ",
      "3": "أَخْتَارُ التَّصَرُّفَ الصَّحِيحَ",
      "4": "أُرَتِّبُ خُطُوَاتِ السَّلَامَةِ"
    },
    "nextPath": "/lesson-v2/108",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "111": {
    "lessonKey": "lesson111",
    "audioBase": "/audio/teachers/taline/lesson_111_home_cleaning_disinfection_products/exercises",
    "questions": [
      {
  "id": "l111_ex1_q1",
  "mission": 1,
  "prompt": "أَيُّ صُورَةٍ تُمَثِّلُ صَابُونًا صُلْبًا؟",
  "audioKey": "l111_ex1_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex1_q2",
  "mission": 1,
  "prompt": "أَيُّ صُورَةٍ تُمَثِّلُ مَسْحُوقَ غَسِيلٍ؟",
  "audioKey": "l111_ex1_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "disinfectant-111",
        "label": ""
      },
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex1_q3",
  "mission": 1,
  "prompt": "أَيُّ صُورَةٍ تُمَثِّلُ مُنَظِّفًا سَائِلًا؟",
  "audioKey": "l111_ex1_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "powder-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex1_q4",
  "mission": 1,
  "prompt": "أَيُّ صُورَةٍ تُمَثِّلُ مُطَهِّرًا سَائِلًا؟",
  "audioKey": "l111_ex1_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex2_q1",
  "mission": 2,
  "prompt": "لَاحِظِ الصَّابُونَ. هَلْ هُوَ مَادَّةٌ صُلْبَةٌ أَمْ سَائِلَةٌ؟",
  "audioKey": "l111_ex2_q1",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "soap-111",
      "label": "الصَّابُونُ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ]
  }
},
      {
  "id": "l111_ex2_q2",
  "mission": 2,
  "prompt": "لَاحِظِ الْمُنَظِّفَ. هَلْ هُوَ مَادَّةٌ صُلْبَةٌ أَمْ سَائِلَةٌ؟",
  "audioKey": "l111_ex2_q2",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "cleaner-111",
      "label": "الْمُنَظِّفُ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ]
  }
},
      {
  "id": "l111_ex2_q3",
  "mission": 2,
  "prompt": "لَاحِظْ مَسْحُوقَ الْغَسِيلِ. هَلْ هُوَ مَادَّةٌ صُلْبَةٌ أَمْ سَائِلَةٌ؟",
  "audioKey": "l111_ex2_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "powder-111",
      "label": "مَسْحُوقُ الْغَسِيلِ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ]
  }
},
      {
  "id": "l111_ex2_q4",
  "mission": 2,
  "prompt": "لَاحِظِ الْمُطَهِّرَ. هَلْ هُوَ مَادَّةٌ صُلْبَةٌ أَمْ سَائِلَةٌ؟",
  "audioKey": "l111_ex2_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "disinfectant-111",
      "label": "الْمُطَهِّرُ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ]
  }
},
      {
  "id": "l111_ex3_q1",
  "mission": 3,
  "prompt": "أَرَدْتَ غَسْلَ الثِّيَابِ. أَيُّ مُنْتَجٍ تَخْتَارُ؟",
  "audioKey": "l111_ex3_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "disinfectant-111",
        "label": ""
      },
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex3_q2",
  "mission": 3,
  "prompt": "أَرَدْتَ مُنَظِّفًا سَائِلًا لِلتَّنْظِيفِ. أَيُّ مُنْتَجٍ تَخْتَارُ؟",
  "audioKey": "l111_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "powder-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex3_q3",
  "mission": 3,
  "prompt": "أَرَدْتَ مُنْتَجًا لِلتَّطْهِيرِ. أَيُّ مُنْتَجٍ تَخْتَارُ؟",
  "audioKey": "l111_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex3_q4",
  "mission": 3,
  "prompt": "أَرَدْتَ مَادَّةَ نَظَافَةٍ صُلْبَةً. أَيُّ مُنْتَجٍ تَخْتَارُ؟",
  "audioKey": "l111_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "soap-111",
        "label": ""
      },
      {
        "icon": "cleaner-111",
        "label": ""
      },
      {
        "icon": "disinfectant-111",
        "label": ""
      },
      {
        "icon": "powder-111",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l111_ex4_q1",
  "mission": 4,
  "prompt": "مَاذَا يَعْنِي وُجُودُ رَمْزِ الْخَطَرِ عَلَى عُبْوَةِ مَادَّةِ نَظَافَةٍ؟",
  "audioKey": "l111_ex4_q1",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "warning-111",
      "label": "عُبْوَةٌ تَحْمِلُ رَمْزَ الْخَطَرِ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "الْمَادَّةُ لِلَّعِبِ."
      },
      {
        "icon": "",
        "label": "قَدْ تَكُونُ الْمَادَّةُ خَطِرَةً وَيَجِبُ الْحَذَرُ."
      },
      {
        "icon": "",
        "label": "الْمَادَّةُ طَعَامٌ."
      },
      {
        "icon": "",
        "label": "الْعُبْوَةُ فَارِغَةٌ."
      }
    ]
  }
},
      {
  "id": "l111_ex4_q2",
  "mission": 4,
  "prompt": "أَيُّ عِبَارَةٍ صَحِيحَةٌ عَنْ مَوَادِّ النَّظَافَةِ وَالتَّطْهِيرِ؟",
  "audioKey": "l111_ex4_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "",
        "label": "كُلُّهَا سَائِلَةٌ."
      },
      {
        "icon": "",
        "label": "كُلُّهَا صُلْبَةٌ."
      },
      {
        "icon": "",
        "label": "مِنْهَا مَوَادُّ سَائِلَةٌ وَمِنْهَا مَوَادُّ صُلْبَةٌ."
      },
      {
        "icon": "",
        "label": "كُلُّهَا لَهَا الشَّكْلُ نَفْسُهُ."
      }
    ]
  }
},
      {
  "id": "l111_ex4_q3",
  "mission": 4,
  "prompt": "أَمَامَكَ صَابُونٌ صُلْبٌ وَمُنَظِّفٌ سَائِلٌ. مَاذَا تَسْتَنْتِجُ؟",
  "audioKey": "l111_ex4_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَوَادُّ النَّظَافَةِ مُتَنَوِّعَةٌ فِي أَشْكَالِهَا."
      },
      {
        "icon": "",
        "label": "كُلُّ مَوَادِّ النَّظَافَةِ سَائِلَةٌ."
      },
      {
        "icon": "",
        "label": "كُلُّ مَوَادِّ النَّظَافَةِ صُلْبَةٌ."
      },
      {
        "icon": "",
        "label": "لَا تُوجَدُ مَوَادُّ نَظَافَةٍ صُلْبَةٌ."
      }
    ]
  }
},
      {
  "id": "l111_ex4_q4",
  "mission": 4,
  "prompt": "اِخْتَرِ الْخُلَاصَةَ الصَّحِيحَةَ لِلدَّرْسِ.",
  "audioKey": "l111_ex4_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "",
        "label": "مَوَادُّ النَّظَافَةِ نَوْعٌ وَاحِدٌ فَقَطْ."
      },
      {
        "icon": "",
        "label": "لَا تَحْمِلُ عُبُوَاتُ النَّظَافَةِ أَيَّ رُمُوزٍ."
      },
      {
        "icon": "",
        "label": "كُلُّ مَوَادِّ النَّظَافَةِ آمِنَةٌ دَائِمًا."
      },
      {
        "icon": "",
        "label": "مَوَادُّ النَّظَافَةِ وَالتَّطْهِيرِ مُتَنَوِّعَةٌ؛ مِنْهَا الصُّلْبُ وَالسَّائِلُ، وَبَعْضُهَا يَحْمِلُ رَمْزَ الْخَطَرِ."
      }
    ]
  }
}
    ],
    "missionTitles": {
      "1": "أَتَعَرَّفُ",
      "2": "أُصَنِّفُ الْمَوَادَّ",
      "3": "أَتَصَرَّفُ بِحَذَرٍ",
      "4": "أَرْبِطُ الْمَادَّةَ بِحَالَتِهَا"
    },
    "nextPath": "/lesson-v2/112",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "113": {
    "lessonKey": "lesson113",
    "audioBase": "/audio/teachers/taline/lesson_113_mobilize_my_knowledge/exercises",
    "questions": [
      {
  "id": "l113_ex1_q1",
  "mission": 1,
  "prompt": "أَشِرْ إِلَى قَلَمِ الرَّصَاصِ.",
  "audioKey": "l113_ex1_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "pencil-113",
        "label": ""
      },
      {
        "icon": "eraser-113",
        "label": ""
      },
      {
        "icon": "pen-113",
        "label": ""
      },
      {
        "icon": "book-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex1_q2",
  "mission": 1,
  "prompt": "أَشِرْ إِلَى الْمِمْحَاةِ.",
  "audioKey": "l113_ex1_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "pen-113",
        "label": ""
      },
      {
        "icon": "book-113",
        "label": ""
      },
      {
        "icon": "eraser-113",
        "label": ""
      },
      {
        "icon": "pencil-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex1_q3",
  "mission": 1,
  "prompt": "أَيُّ أَدَاةٍ نَمْحُو بِهَا؟",
  "audioKey": "l113_ex1_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "book-113",
        "label": ""
      },
      {
        "icon": "eraser-113",
        "label": ""
      },
      {
        "icon": "pen-113",
        "label": ""
      },
      {
        "icon": "pencil-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex1_q4",
  "mission": 1,
  "prompt": "أَيُّ أَدَاةٍ نَرْسُمُ بِهَا؟",
  "audioKey": "l113_ex1_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "eraser-113",
        "label": ""
      },
      {
        "icon": "book-113",
        "label": ""
      },
      {
        "icon": "pen-113",
        "label": ""
      },
      {
        "icon": "pencil-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex2_q1",
  "mission": 2,
  "prompt": "الْحِبْرُ: مَادَّةٌ سَائِلَةٌ أَمْ مَادَّةٌ صُلْبَةٌ؟",
  "audioKey": "l113_ex2_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ],
    "visual": {
      "icon": "ink-113",
      "label": ""
    }
  }
},
      {
  "id": "l113_ex2_q2",
  "mission": 2,
  "prompt": "الرَّمْلُ: مَادَّةٌ صُلْبَةٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
  "audioKey": "l113_ex2_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ],
    "visual": {
      "icon": "sand-113",
      "label": ""
    }
  }
},
      {
  "id": "l113_ex2_q3",
  "mission": 2,
  "prompt": "الصُّوفُ: مَادَّةٌ صُلْبَةٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
  "audioKey": "l113_ex2_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ],
    "visual": {
      "icon": "wool-113",
      "label": ""
    }
  }
},
      {
  "id": "l113_ex2_q4",
  "mission": 2,
  "prompt": "قِطْعَةُ الْقُمَاشِ: مَادَّةٌ صُلْبَةٌ أَمْ مَادَّةٌ سَائِلَةٌ؟",
  "audioKey": "l113_ex2_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "مَادَّةٌ صُلْبَةٌ"
      },
      {
        "icon": "",
        "label": "مَادَّةٌ سَائِلَةٌ"
      }
    ],
    "visual": {
      "icon": "cloth-113",
      "label": ""
    }
  }
},
      {
  "id": "l113_ex3_q1",
  "mission": 3,
  "prompt": "الْفَلِّينَةُ: هَلْ تَطْفُو فَوْقَ الْمَاءِ؟",
  "audioKey": "l113_ex3_q1",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "cork-113",
      "label": "الْفَلِّينَةُ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، تَطْفُو."
      },
      {
        "icon": "",
        "label": "لَا، لَا تَطْفُو."
      }
    ]
  }
},
      {
  "id": "l113_ex3_q2",
  "mission": 3,
  "prompt": "الْقِطْعَةُ النَّقْدِيَّةُ: هَلْ تَطْفُو فَوْقَ الْمَاءِ؟",
  "audioKey": "l113_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "coin-113",
      "label": "الْقِطْعَةُ النَّقْدِيَّةُ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، تَطْفُو."
      },
      {
        "icon": "",
        "label": "لَا، لَا تَطْفُو."
      }
    ]
  }
},
      {
  "id": "l113_ex3_q3",
  "mission": 3,
  "prompt": "الْقَارُورَةُ الْبِلَاسْتِيكِيَّةُ الْفَارِغَةُ: هَلْ تَطْفُو فَوْقَ الْمَاءِ؟",
  "audioKey": "l113_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "bottle-empty-113",
      "label": "قَارُورَةٌ بِلَاسْتِيكِيَّةٌ فَارِغَةٌ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، تَطْفُو."
      },
      {
        "icon": "",
        "label": "لَا، لَا تَطْفُو."
      }
    ]
  }
},
      {
  "id": "l113_ex3_q4",
  "mission": 3,
  "prompt": "الْقِطْعَةُ النَّقْدِيَّةُ: هَلْ تَذُوبُ فِي الْمَاءِ؟",
  "audioKey": "l113_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "coin-113",
      "label": "الْقِطْعَةُ النَّقْدِيَّةُ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، تَذُوبُ."
      },
      {
        "icon": "",
        "label": "لَا، لَا تَذُوبُ."
      }
    ]
  }
},
      {
  "id": "l113_ex4_q1",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى جِسْمٍ يَطْفُو فَوْقَ الْمَاءِ.",
  "audioKey": "l113_ex4_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "cork-113",
        "label": ""
      },
      {
        "icon": "coin-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex4_q2",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى جِسْمٍ لَا يَطْفُو فَوْقَ الْمَاءِ.",
  "audioKey": "l113_ex4_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "cork-113",
        "label": ""
      },
      {
        "icon": "coin-113",
        "label": ""
      }
    ]
  }
},
      {
  "id": "l113_ex4_q3",
  "mission": 4,
  "prompt": "اِخْتَرْ خَصَائِصَ الْفَلِّينَةِ.",
  "audioKey": "l113_ex4_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "cork-113",
      "label": "الْفَلِّينَةُ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "جِسْمٌ صُلْبٌ وَيَطْفُو فَوْقَ الْمَاءِ."
      },
      {
        "icon": "",
        "label": "جِسْمٌ صُلْبٌ وَلَا يَطْفُو فَوْقَ الْمَاءِ."
      }
    ]
  }
},
      {
  "id": "l113_ex4_q4",
  "mission": 4,
  "prompt": "اِخْتَرْ خَصَائِصَ الْقِطْعَةِ النَّقْدِيَّةِ.",
  "audioKey": "l113_ex4_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "coin-113",
      "label": "الْقِطْعَةُ النَّقْدِيَّةُ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "جِسْمٌ صُلْبٌ وَيَطْفُو فَوْقَ الْمَاءِ."
      },
      {
        "icon": "",
        "label": "جِسْمٌ صُلْبٌ وَلَا يَطْفُو فَوْقَ الْمَاءِ."
      }
    ]
  }
}
    ],
    "missionTitles": {
      "1": "أُرَاجِعُ الْمَوَادَّ وَالْأَدَوَاتِ",
      "2": "أُجَرِّبُ الطَّفْوَ وَالْغَوْصَ",
      "3": "أُجَرِّبُ الذَّوَبَانَ",
      "4": "أُصَنِّفُ النَّتَائِجَ"
    },
    "nextPath": "/lesson-v2/114",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
  "116": {
    "lessonKey": "lesson116",
    "audioBase": "/audio/teachers/khalil/lesson_116_classify_store_products/exercises",
    "questions": [
      {
  "id": "l116_ex1_q1",
  "mission": 1,
  "prompt": "أَشِرْ إِلَى مَادَّةٍ غِذَائِيَّةٍ سَائِلَةٍ.",
  "audioKey": "l116_ex1_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "cookie-116",
        "label": "الْبِسْكُوِيتُ"
      },
      {
        "icon": "cleaner-116",
        "label": "الْمُنَظِّفُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      }
    ]
  }
},
      {
  "id": "l116_ex1_q2",
  "mission": 1,
  "prompt": "أَشِرْ إِلَى مَادَّةٍ غِذَائِيَّةٍ صُلْبَةٍ.",
  "audioKey": "l116_ex1_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "cleaner-116",
        "label": "الْمُنَظِّفُ"
      },
      {
        "icon": "cookie-116",
        "label": "الْبِسْكُوِيتُ"
      },
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      }
    ]
  }
},
      {
  "id": "l116_ex1_q3",
  "mission": 1,
  "prompt": "أَشِرْ إِلَى مَادَّةٍ غِذَائِيَّةٍ تَذُوبُ فِي الْمَاءِ.",
  "audioKey": "l116_ex1_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "cookie-116",
        "label": "الْبِسْكُوِيتُ"
      },
      {
        "icon": "sugar-116",
        "label": "السُّكَّرُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      },
      {
        "icon": "cleaner-116",
        "label": "الْمُنَظِّفُ"
      }
    ]
  }
},
      {
  "id": "l116_ex1_q4",
  "mission": 1,
  "prompt": "هَلْ يَذُوبُ السُّكَّرُ فِي الْمَاءِ؟",
  "audioKey": "l116_ex1_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "sugar-116",
      "label": "السُّكَّرُ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، يَذُوبُ."
      },
      {
        "icon": "",
        "label": "لَا، لَا يَذُوبُ."
      }
    ]
  }
},
      {
  "id": "l116_ex2_q1",
  "mission": 2,
  "prompt": "أَشِرْ إِلَى مَادَّةٍ سَائِلَةٍ لِلتَّنْظِيفِ.",
  "audioKey": "l116_ex2_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      },
      {
        "icon": "cleaner-116",
        "label": "الْمُنَظِّفُ"
      }
    ]
  }
},
      {
  "id": "l116_ex2_q2",
  "mission": 2,
  "prompt": "أَشِرْ إِلَى مَادَّةِ نَظَافَةٍ لَا تَطْفُو فَوْقَ الْمَاءِ.",
  "audioKey": "l116_ex2_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "cookie-116",
        "label": "الْبِسْكُوِيتُ"
      },
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      }
    ]
  }
},
      {
  "id": "l116_ex2_q3",
  "mission": 2,
  "prompt": "هَلِ الْمُنَظِّفُ مَادَّةٌ سَائِلَةٌ؟",
  "audioKey": "l116_ex2_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "cleaner-116",
      "label": "الْمُنَظِّفُ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ، هُوَ سَائِلٌ."
      },
      {
        "icon": "",
        "label": "لَا، هُوَ صُلْبٌ."
      }
    ]
  }
},
      {
  "id": "l116_ex2_q4",
  "mission": 2,
  "prompt": "هَلْ قِطْعَةُ الصَّابُونِ مَادَّةٌ صُلْبَةٌ؟",
  "audioKey": "l116_ex2_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "soap-116",
      "label": "قِطْعَةُ الصَّابُونِ"
    },
    "answer": 1,
    "options": [
      {
        "icon": "",
        "label": "لَا، هِيَ سَائِلَةٌ."
      },
      {
        "icon": "",
        "label": "نَعَمْ، هِيَ صُلْبَةٌ."
      }
    ]
  }
},
      {
  "id": "l116_ex3_q1",
  "mission": 3,
  "prompt": "أَشِرْ إِلَى الْأَدَاةِ الَّتِي نَمْحُو أَثَرَهَا بِسُهُولَةٍ.",
  "audioKey": "l116_ex3_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      },
      {
        "icon": "book-116",
        "label": "الْكِتَابُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      },
      {
        "icon": "eraser-116",
        "label": "الْمِمْحَاةُ"
      }
    ]
  }
},
      {
  "id": "l116_ex3_q2",
  "mission": 3,
  "prompt": "أَشِرْ إِلَى الْأَدَاةِ الَّتِي يَصْعُبُ مَحْوُ أَثَرِهَا.",
  "audioKey": "l116_ex3_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      },
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      },
      {
        "icon": "eraser-116",
        "label": "الْمِمْحَاةُ"
      },
      {
        "icon": "book-116",
        "label": "الْكِتَابُ"
      }
    ]
  }
},
      {
  "id": "l116_ex3_q3",
  "mission": 3,
  "prompt": "هَلْ نَمْحُو أَثَرَ قَلَمِ الرَّصَاصِ بِسُهُولَةٍ؟",
  "audioKey": "l116_ex3_q3",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "pencil-116",
      "label": "قَلَمُ الرَّصَاصِ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ."
      },
      {
        "icon": "",
        "label": "لَا."
      }
    ]
  }
},
      {
  "id": "l116_ex3_q4",
  "mission": 3,
  "prompt": "هَلْ يَصْعُبُ مَحْوُ أَثَرِ قَلَمِ الْحِبْرِ؟",
  "audioKey": "l116_ex3_q4",
  "scienceSkill": {
    "mode": "choice",
    "visual": {
      "icon": "pen-116",
      "label": "قَلَمُ الْحِبْرِ"
    },
    "answer": 0,
    "options": [
      {
        "icon": "",
        "label": "نَعَمْ."
      },
      {
        "icon": "",
        "label": "لَا."
      }
    ]
  }
},
      {
  "id": "l116_ex4_q1",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى الْمَادَّةِ الْغِذَائِيَّةِ السَّائِلَةِ.",
  "audioKey": "l116_ex4_q1",
  "scienceSkill": {
    "mode": "choice",
    "answer": 1,
    "options": [
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "sugar-116",
        "label": "السُّكَّرُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      }
    ]
  }
},
      {
  "id": "l116_ex4_q2",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى الْمَادَّةِ الْغِذَائِيَّةِ الَّتِي تَذُوبُ فِي الْمَاءِ.",
  "audioKey": "l116_ex4_q2",
  "scienceSkill": {
    "mode": "choice",
    "answer": 3,
    "options": [
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      },
      {
        "icon": "sugar-116",
        "label": "السُّكَّرُ"
      }
    ]
  }
},
      {
  "id": "l116_ex4_q3",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى مَادَّةِ النَّظَافَةِ الَّتِي لَا تَطْفُو فَوْقَ الْمَاءِ.",
  "audioKey": "l116_ex4_q3",
  "scienceSkill": {
    "mode": "choice",
    "answer": 2,
    "options": [
      {
        "icon": "milk-116",
        "label": "الْحَلِيبُ"
      },
      {
        "icon": "cleaner-116",
        "label": "الْمُنَظِّفُ"
      },
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      },
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      }
    ]
  }
},
      {
  "id": "l116_ex4_q4",
  "mission": 4,
  "prompt": "أَشِرْ إِلَى الْأَدَاةِ الَّتِي نَمْحُو أَثَرَهَا بِسُهُولَةٍ.",
  "audioKey": "l116_ex4_q4",
  "scienceSkill": {
    "mode": "choice",
    "answer": 0,
    "options": [
      {
        "icon": "pencil-116",
        "label": "قَلَمُ الرَّصَاصِ"
      },
      {
        "icon": "pen-116",
        "label": "قَلَمُ الْحِبْرِ"
      },
      {
        "icon": "book-116",
        "label": "الْكِتَابُ"
      },
      {
        "icon": "soap-116",
        "label": "الصَّابُونُ"
      }
    ]
  }
}
    ],
    "missionTitles": {
      "1": "أُرَتِّبُ مُشْتَرَيَاتِ الْمَتْجَرِ",
      "2": "أَخْتَبِرُ خَصَائِصَ الْمَوَادِّ",
      "3": "أَخْتَارُ بِدِقَّةٍ",
      "4": "أُصَنِّفُ الْمُشْتَرَيَاتِ"
    },
    "nextPath": "/lesson-v2/117",
    "completionMessage": "أَحْسَنْتَ يَا بَطَلُ! أَتْمَمْتَ التَّمَارِينَ بِنَجَاحٍ."
  },
"95": {
  "lessonKey": "lesson95",
  "audioBase": "/audio/teachers/khalil/lesson_95_snow_turns_into_water/exercises",
  "questions": [
    {
      "id": "l95_ex1_q1",
      "mission": 1,
      "prompt": "مَاذَا يُصْبِحُ الثَّلْجُ بَعْدَ ذَوَبَانِهِ؟",
      "audioKey": "l95_ex1_q1",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-water",
            "label": "مَاءٌ"
          },
          {
            "icon": "l95-juice",
            "label": "عَصِيرٌ"
          },
          {
            "icon": "l95-oil",
            "label": "زَيْتٌ"
          },
          {
            "icon": "l95-book",
            "label": "كِتَابٌ"
          }
        ],
        "visual": {
          "icon": "l95-melt",
          "label": "الثَّلْجُ بَعْدَ الذَّوَبَانِ"
        }
      }
    },
    {
      "id": "l95_ex1_q2",
      "mission": 1,
      "prompt": "الْمَاءُ النَّاتِجُ عَنْ ذَوَبَانِ الثَّلْجِ فِي أَيِّ حَالَةٍ؟",
      "audioKey": "l95_ex1_q2",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-water",
            "label": "سَائِلَةٌ"
          },
          {
            "icon": "l95-ice",
            "label": "صُلْبَةٌ"
          },
          {
            "icon": "l95-chair",
            "label": "خَشَبِيَّةٌ"
          },
          {
            "icon": "l95-oil",
            "label": "زَيْتِيَّةٌ"
          }
        ],
        "visual": {
          "icon": "l95-water",
          "label": "أُلَاحِظُ الْمَاءَ"
        }
      }
    },
    {
      "id": "l95_ex1_q3",
      "mission": 1,
      "prompt": "الثَّلْجُ قَبْلَ أَنْ يَذُوبَ فِي أَيِّ حَالَةٍ؟",
      "audioKey": "l95_ex1_q3",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-ice",
            "label": "صُلْبَةٌ"
          },
          {
            "icon": "l95-water",
            "label": "سَائِلَةٌ"
          },
          {
            "icon": "l95-juice",
            "label": "عَصِيرِيَّةٌ"
          },
          {
            "icon": "l95-oil",
            "label": "زَيْتِيَّةٌ"
          }
        ],
        "visual": {
          "icon": "l95-ice",
          "label": "أُلَاحِظُ جِسْمًا بَارِدًا"
        }
      }
    },
    {
      "id": "l95_ex1_q4",
      "mission": 1,
      "prompt": "أَيُّ تَحَوُّلٍ يَصِفُ مَا يَحْدُثُ لِلثَّلْجِ؟",
      "audioKey": "l95_ex1_q4",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-melt",
            "label": "ثَلْجٌ يَذُوبُ فَيَصْبَحُ مَاءً"
          },
          {
            "icon": "l95-book",
            "label": "ثَلْجٌ يَصْبَحُ كِتَابًا"
          },
          {
            "icon": "l95-guitar",
            "label": "ثَلْجٌ يَصْبَحُ خَشَبًا"
          },
          {
            "icon": "l95-oil",
            "label": "ثَلْجٌ يَصْبَحُ زَيْتًا"
          }
        ],
        "visual": {
          "icon": "l95-melt",
          "label": "مِنَ الثَّلْجِ إِلَى الْمَاءِ"
        }
      }
    },
    {
      "id": "l95_ex2_q1",
      "mission": 2,
      "prompt": "مَا السَّبَبُ الَّذِي يَجْعَلُ الثَّلْجَ يَذُوبُ؟",
      "audioKey": "l95_ex2_q1",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-sun",
            "label": "الْحَرَارَةُ"
          },
          {
            "icon": "l95-water",
            "label": "الْمَاءُ"
          },
          {
            "icon": "l95-chair",
            "label": "الْخَشَبُ"
          },
          {
            "icon": "l95-book",
            "label": "الْكِتَابُ"
          }
        ],
        "visual": {
          "icon": "l95-fire",
          "label": "أَبْحَثُ عَنْ سَبَبِ الذَّوَبَانِ"
        }
      }
    },
    {
      "id": "l95_ex2_q2",
      "mission": 2,
      "prompt": "مَاذَا يَحْدُثُ لِلْمَاءِ عِنْدَ شِدَّةِ الْبُرُودَةِ؟",
      "audioKey": "l95_ex2_q2",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-ice",
            "label": "يَتَجَمَّدُ"
          },
          {
            "icon": "l95-water",
            "label": "يَبْقَى دَافِئًا"
          },
          {
            "icon": "l95-book",
            "label": "يُصْبِحُ كِتَابًا"
          },
          {
            "icon": "l95-guitar",
            "label": "يُصْبِحُ خَشَبًا"
          }
        ],
        "visual": {
          "icon": "l95-cold",
          "label": "الْمَاءُ فِي الْبَرْدِ الشَّدِيدِ"
        }
      }
    },
    {
      "id": "l95_ex2_q3",
      "mission": 2,
      "prompt": "لِمَاذَا يَظْهَرُ الْجَلِيدُ فِي الشِّتَاءِ؟",
      "audioKey": "l95_ex2_q3",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-cold",
            "label": "بِسَبَبِ شِدَّةِ الْبُرُودَةِ"
          },
          {
            "icon": "l95-water",
            "label": "بِسَبَبِ الْمَاءِ الدَّافِئِ"
          },
          {
            "icon": "l95-book",
            "label": "بِسَبَبِ الْكُتُبِ"
          },
          {
            "icon": "l95-chair",
            "label": "بِسَبَبِ الْخَشَبِ"
          }
        ],
        "visual": {
          "icon": "l95-mountain",
          "label": "الْجَلِيدُ وَالطَّقْسُ الْبَارِدُ"
        }
      }
    },
    {
      "id": "l95_ex2_q4",
      "mission": 2,
      "prompt": "مَاذَا يَحْدُثُ لِلثَّلْجِ فِي مَكَانٍ دَافِئٍ؟",
      "audioKey": "l95_ex2_q4",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-melt",
            "label": "يَذُوبُ"
          },
          {
            "icon": "l95-book",
            "label": "يَتَحَوَّلُ إِلَى كِتَابٍ"
          },
          {
            "icon": "l95-guitar",
            "label": "يَتَحَوَّلُ إِلَى خَشَبٍ"
          },
          {
            "icon": "l95-oil",
            "label": "يَتَحَوَّلُ إِلَى زَيْتٍ"
          }
        ],
        "visual": {
          "icon": "l95-warm",
          "label": "الثَّلْجُ فِي مَكَانٍ دَافِئٍ"
        }
      }
    },
    {
      "id": "l95_ex3_q1",
      "mission": 3,
      "prompt": "أَيْنَ يَذُوبُ الثَّلْجُ أَسْرَعَ؟",
      "audioKey": "l95_ex3_q1",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-warm",
            "label": "فِي مَكَانٍ دَافِئٍ"
          },
          {
            "icon": "l95-coldplace",
            "label": "فِي مَكَانٍ شَدِيدِ الْبُرُودَةِ"
          },
          {
            "icon": "l95-book",
            "label": "فَوْقَ كِتَابٍ"
          },
          {
            "icon": "l95-chair",
            "label": "فَوْقَ قِطْعَةِ خَشَبٍ بَارِدَةٍ"
          }
        ],
        "visual": {
          "icon": "l95-warm",
          "label": "أُقَارِنُ بَيْنَ مَكَانٍ بَارِدٍ وَمَكَانٍ دَافِئٍ"
        }
      }
    },
    {
      "id": "l95_ex3_q2",
      "mission": 3,
      "prompt": "أَيُّ شَيْءٍ لَا يُسَبِّبُ ذَوَبَانَ الثَّلْجِ؟",
      "audioKey": "l95_ex3_q2",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-fridge",
            "label": "ثَلَّاجَةٌ"
          },
          {
            "icon": "l95-sun",
            "label": "مَصْدَرُ حَرَارَةٍ"
          },
          {
            "icon": "l95-warmwater",
            "label": "مَاءٌ دَافِئٌ"
          },
          {
            "icon": "l95-warm",
            "label": "مَكَانٌ دَافِئٌ"
          }
        ],
        "visual": {
          "icon": "l95-ice",
          "label": "أَخْتَارُ الشَّيْءَ غَيْرَ الْمُسَبِّبِ لِلذَّوَبَانِ"
        }
      }
    },
    {
      "id": "l95_ex3_q3",
      "mission": 3,
      "prompt": "مَاذَا نَتَوَقَّعُ إِذَا تَرَكْنَا قِطْعَةَ ثَلْجٍ فِي مَكَانٍ دَافِئٍ؟",
      "audioKey": "l95_ex3_q3",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-melt",
            "label": "تَذُوبُ تَدْرِيجِيًّا"
          },
          {
            "icon": "l95-book",
            "label": "تُصْبِحُ كِتَابًا"
          },
          {
            "icon": "l95-guitar",
            "label": "تُصْبِحُ خَشَبًا"
          },
          {
            "icon": "l95-oil",
            "label": "تُصْبِحُ زَيْتًا"
          }
        ],
        "visual": {
          "icon": "l95-melt",
          "label": "أَتَوَقَّعُ مَا سَيَحْدُثُ"
        }
      }
    },
    {
      "id": "l95_ex3_q4",
      "mission": 3,
      "prompt": "بَعْدَ ذَوَبَانِ الثَّلْجِ، هَلْ يُمْكِنُنَا سَكْبُ النَّاتِجِ؟",
      "audioKey": "l95_ex3_q4",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-water",
            "label": "نَعَمْ، لِأَنَّهُ مَاءٌ سَائِلٌ"
          },
          {
            "icon": "l95-book",
            "label": "لَا، لِأَنَّهُ كِتَابٌ"
          },
          {
            "icon": "l95-chair",
            "label": "لَا، لِأَنَّهُ خَشَبٌ"
          },
          {
            "icon": "l95-oil",
            "label": "لَا، لِأَنَّهُ حَجَرٌ"
          }
        ],
        "visual": {
          "icon": "l95-water",
          "label": "أُجَرِّبُ صَبَّ الْمَاءِ"
        }
      }
    },
    {
      "id": "l95_ex4_q1",
      "mission": 4,
      "prompt": "أَيُّ عِبَارَةٍ تُمَثِّلُ التَّحَوُّلَ الصَّحِيحَ؟",
      "audioKey": "l95_ex4_q1",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-melt",
            "label": "ثَلْجٌ مَعَ الْحَرَارَةِ يُصْبِحُ مَاءً"
          },
          {
            "icon": "l95-book",
            "label": "ثَلْجٌ مَعَ الْحَرَارَةِ يُصْبِحُ كِتَابًا"
          },
          {
            "icon": "l95-guitar",
            "label": "مَاءٌ مَعَ الْحَرَارَةِ يُصْبِحُ خَشَبًا"
          },
          {
            "icon": "l95-oil",
            "label": "ثَلْجٌ مَعَ الْبُرُودَةِ يُصْبِحُ زَيْتًا"
          }
        ],
        "visual": {
          "icon": "l95-melt",
          "label": "أَرْبِطُ السَّبَبَ بِالنَّتِيجَةِ"
        }
      }
    },
    {
      "id": "l95_ex4_q2",
      "mission": 4,
      "prompt": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
      "audioKey": "l95_ex4_q2",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-solid-liquid",
            "label": "الثَّلْجُ صُلْبٌ وَالْمَاءُ النَّاتِجُ سَائِلٌ"
          },
          {
            "icon": "l95-water",
            "label": "الثَّلْجُ سَائِلٌ وَالْمَاءُ صُلْبٌ"
          },
          {
            "icon": "l95-chair",
            "label": "الثَّلْجُ خَشَبٌ"
          },
          {
            "icon": "l95-oil",
            "label": "الْمَاءُ زَيْتٌ"
          }
        ],
        "visual": {
          "icon": "l95-solid-liquid",
          "label": "أُقَارِنُ بَيْنَ الثَّلْجِ وَالْمَاءِ"
        }
      }
    },
    {
      "id": "l95_ex4_q3",
      "mission": 4,
      "prompt": "مَا الَّذِي سَبَّبَ ذَوَبَانَ الثَّلْجِ؟",
      "audioKey": "l95_ex4_q3",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-fire",
            "label": "الْحَرَارَةُ"
          },
          {
            "icon": "l95-book",
            "label": "الْكِتَابُ"
          },
          {
            "icon": "l95-guitar",
            "label": "الْخَشَبُ"
          },
          {
            "icon": "l95-juice",
            "label": "الْعَصِيرُ"
          }
        ],
        "visual": {
          "icon": "l95-sun",
          "label": "أُحَدِّدُ سَبَبَ التَّحَوُّلِ"
        }
      }
    },
    {
      "id": "l95_ex4_q4",
      "mission": 4,
      "prompt": "مَا خُلَاصَةُ الدَّرْسِ؟",
      "audioKey": "l95_ex4_q4",
      "scienceSkill": {
        "mode": "choice",
        "answer": 0,
        "options": [
          {
            "icon": "l95-melt",
            "label": "الثَّلْجُ يَذُوبُ بِالْحَرَارَةِ وَيَتَحَوَّلُ إِلَى مَاءٍ"
          },
          {
            "icon": "l95-book",
            "label": "الثَّلْجُ يَتَحَوَّلُ إِلَى كِتَابٍ"
          },
          {
            "icon": "l95-chair",
            "label": "الثَّلْجُ يَتَحَوَّلُ إِلَى خَشَبٍ"
          },
          {
            "icon": "l95-oil",
            "label": "الثَّلْجُ يَتَحَوَّلُ إِلَى زَيْتٍ"
          }
        ],
        "visual": {
          "icon": "l95-melt",
          "label": "أَسْتَنْتِجُ"
        }
      }
    }
  ],
  "missionTitles": {
    "1": "أَتَعَرَّفُ إِلَى التَّحَوُّلِ",
    "2": "الْبُرُودَةُ وَالْحَرَارَةُ",
    "3": "أُلَاحِظُ أَثَرَ الْحَرَارَةِ",
    "4": "أَسْتَعْمِلُ مَا تَعَلَّمْتُ"
  },
  "nextPath": "/lesson-v2/96",
  "completionMessage": "أَحْسَنْتَ! تَعَلَّمْتَ أَنَّ الثَّلْجَ عِنْدَ تَعَرُّضِهِ لِلْحَرَارَةِ يَذُوبُ وَيَتَحَوَّلُ إِلَى مَاءٍ."
}
}
) as unknown as Record<number,LessonConfig>;

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}:UnifiedLessonExerciseRenderContextV2<ScienceSkillQuestion>) {
  return (
    <SciencePremiumSkillLabV2
      questionId={question.id}
      activity={question.scienceSkill}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

function ScienceSkillLesson({
  lessonNum,
}:{
  lessonNum:88|92|95|104|107|111|113|116;
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
      nextPath={
        lessonNum === 116
          ? "/world/b3187e1b-58da-441d-ae43-d4be486e7c12"
          : (config.nextPath)
      }
      nextLabel={
        lessonNum === 116
          ? "العودة إلى العالم"
          : "الدَّرْسُ التَّالِي"
      }
      renderActivity={renderActivity}
    />
  );
}

export const Lesson88SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={88}/>;
export const Lesson92SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={92}/>;

export const Lesson104SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={104}/>;
export const Lesson107SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={107}/>;
export const Lesson111SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={111}/>;
export const Lesson113SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={113}/>;
export const Lesson116SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={116}/>;
export const Lesson95SciencePremiumExercises =
  ()=><ScienceSkillLesson lessonNum={95}/>;
