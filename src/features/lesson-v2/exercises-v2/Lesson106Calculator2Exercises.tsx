import UnifiedLessonExercisesV2 from "./UnifiedLessonExercisesV2";
import { CalculatorLab } from "./Lesson96CalculatorExercises";

const QUESTIONS:any[] = [
  {
    "id": "l106_ex1_q1",
    "mission": 1,
    "prompt": "اِخْتَرِ الْعَمَلِيَّةَ الَّتِي تُظْهِرُ الْعَدَدَ خَمْسَةً وَعِشْرِينَ، دُونَ اسْتِعْمَالِ الزِّرَّيْنِ اثْنَيْنِ وَخَمْسَةٍ.",
    "audioKey": "l106_ex1_q1",
    "calculatorActivity": {
      "title": "أَظْهِرْ 25 دُونَ 2 وَ5",
      "visual": {
        "kind": "screen",
        "value": "25"
      },
      "options": [
        {
          "kind": "text",
          "value": "31 − 6",
          "label": "31 − 6 ="
        },
        {
          "kind": "text",
          "value": "13 + 12",
          "label": "13 + 12 ="
        },
        {
          "kind": "text",
          "value": "30 − 4",
          "label": "30 − 4 ="
        },
        {
          "kind": "text",
          "value": "15 + 10",
          "label": "15 + 10 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "2",
        "5"
      ],
      "correctScreenValue": "25"
    }
  },
  {
    "id": "l106_ex1_q2",
    "mission": 1,
    "prompt": "اِخْتَرِ الْعَمَلِيَّةَ الَّتِي تُظْهِرُ الْعَدَدَ اثْنَيْ عَشَرَ، دُونَ اسْتِعْمَالِ الزِّرَّيْنِ وَاحِدٍ وَاثْنَيْنِ.",
    "audioKey": "l106_ex1_q2",
    "calculatorActivity": {
      "title": "أَظْهِرْ 12 دُونَ 1 وَ2",
      "visual": {
        "kind": "screen",
        "value": "12"
      },
      "options": [
        {
          "kind": "text",
          "value": "6 + 6",
          "label": "6 + 6 ="
        },
        {
          "kind": "text",
          "value": "8 + 5",
          "label": "8 + 5 ="
        },
        {
          "kind": "text",
          "value": "7 + 2",
          "label": "7 + 2 ="
        },
        {
          "kind": "text",
          "value": "11 + 1",
          "label": "11 + 1 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "1",
        "2"
      ],
      "correctScreenValue": "12"
    }
  },
  {
    "id": "l106_ex1_q3",
    "mission": 1,
    "prompt": "اِخْتَرِ الْعَمَلِيَّةَ الَّتِي تُظْهِرُ الْعَدَدَ ثَمَانِيَةَ عَشَرَ، دُونَ اسْتِعْمَالِ الزِّرَّيْنِ وَاحِدٍ وَثَمَانِيَةٍ.",
    "audioKey": "l106_ex1_q3",
    "calculatorActivity": {
      "title": "أَظْهِرْ 18 دُونَ 1 وَ8",
      "visual": {
        "kind": "screen",
        "value": "18"
      },
      "options": [
        {
          "kind": "text",
          "value": "9 + 9",
          "label": "9 + 9 ="
        },
        {
          "kind": "text",
          "value": "10 + 8",
          "label": "10 + 8 ="
        },
        {
          "kind": "text",
          "value": "13 + 5",
          "label": "13 + 5 ="
        },
        {
          "kind": "text",
          "value": "7 + 11",
          "label": "7 + 11 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "1",
        "8"
      ],
      "correctScreenValue": "18"
    }
  },
  {
    "id": "l106_ex1_q4",
    "mission": 1,
    "prompt": "اِخْتَرِ الْعَمَلِيَّةَ الَّتِي تُظْهِرُ الْعَدَدَ أَرْبَعَةً وَعِشْرِينَ، دُونَ اسْتِعْمَالِ الزِّرَّيْنِ اثْنَيْنِ وَأَرْبَعَةٍ.",
    "audioKey": "l106_ex1_q4",
    "calculatorActivity": {
      "title": "أَظْهِرْ 24 دُونَ 2 وَ4",
      "visual": {
        "kind": "screen",
        "value": "24"
      },
      "options": [
        {
          "kind": "text",
          "value": "30 − 6",
          "label": "30 − 6 ="
        },
        {
          "kind": "text",
          "value": "12 + 12",
          "label": "12 + 12 ="
        },
        {
          "kind": "text",
          "value": "20 + 4",
          "label": "20 + 4 ="
        },
        {
          "kind": "text",
          "value": "25 − 1",
          "label": "25 − 1 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "2",
        "4"
      ],
      "correctScreenValue": "24"
    }
  },
  {
    "id": "l106_ex2_q1",
    "mission": 2,
    "prompt": "أَيُّ عَمَلِيَّةٍ تُعْطِي سِتَّةً وَثَلَاثِينَ، دُونَ اسْتِعْمَالِ الثَّلَاثَةِ وَالسِّتَّةِ؟",
    "audioKey": "l106_ex2_q1",
    "calculatorActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ الصَّحِيحَةَ",
      "visual": {
        "kind": "screen",
        "value": "36"
      },
      "options": [
        {
          "kind": "text",
          "value": "40 − 4",
          "label": "40 − 4 ="
        },
        {
          "kind": "text",
          "value": "30 + 6",
          "label": "30 + 6 ="
        },
        {
          "kind": "text",
          "value": "20 + 16",
          "label": "20 + 16 ="
        },
        {
          "kind": "text",
          "value": "32 + 4",
          "label": "32 + 4 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "3",
        "6"
      ],
      "correctScreenValue": "36"
    }
  },
  {
    "id": "l106_ex2_q2",
    "mission": 2,
    "prompt": "أَيُّ عَمَلِيَّةٍ تُعْطِي أَرْبَعِينَ، دُونَ اسْتِعْمَالِ الْأَرْبَعَةِ وَالصِّفْرِ؟",
    "audioKey": "l106_ex2_q2",
    "calculatorActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ الصَّحِيحَةَ",
      "visual": {
        "kind": "screen",
        "value": "40"
      },
      "options": [
        {
          "kind": "text",
          "value": "44 − 4",
          "label": "44 − 4 ="
        },
        {
          "kind": "text",
          "value": "25 + 15",
          "label": "25 + 15 ="
        },
        {
          "kind": "text",
          "value": "30 + 10",
          "label": "30 + 10 ="
        },
        {
          "kind": "text",
          "value": "50 − 10",
          "label": "50 − 10 ="
        }
      ],
      "answer": 1,
      "forbiddenKeys": [
        "4",
        "0"
      ],
      "correctScreenValue": "40"
    }
  },
  {
    "id": "l106_ex2_q3",
    "mission": 2,
    "prompt": "أَيُّ عَمَلِيَّةٍ تُعْطِي سَبْعَةً وَعِشْرِينَ، دُونَ اسْتِعْمَالِ الاثْنَيْنِ وَالسَّبْعَةِ؟",
    "audioKey": "l106_ex2_q3",
    "calculatorActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ الصَّحِيحَةَ",
      "visual": {
        "kind": "screen",
        "value": "27"
      },
      "options": [
        {
          "kind": "text",
          "value": "18 + 8",
          "label": "18 + 8 ="
        },
        {
          "kind": "text",
          "value": "35 − 7",
          "label": "35 − 7 ="
        },
        {
          "kind": "text",
          "value": "30 − 3",
          "label": "30 − 3 ="
        },
        {
          "kind": "text",
          "value": "22 + 5",
          "label": "22 + 5 ="
        }
      ],
      "answer": 2,
      "forbiddenKeys": [
        "2",
        "7"
      ],
      "correctScreenValue": "27"
    }
  },
  {
    "id": "l106_ex2_q4",
    "mission": 2,
    "prompt": "أَيُّ عَمَلِيَّةٍ تُعْطِي خَمْسَةً وَأَرْبَعِينَ، دُونَ اسْتِعْمَالِ الْأَرْبَعَةِ وَالْخَمْسَةِ؟",
    "audioKey": "l106_ex2_q4",
    "calculatorActivity": {
      "title": "أَخْتَارُ الْعَمَلِيَّةَ الصَّحِيحَةَ",
      "visual": {
        "kind": "screen",
        "value": "45"
      },
      "options": [
        {
          "kind": "text",
          "value": "40 + 5",
          "label": "40 + 5 ="
        },
        {
          "kind": "text",
          "value": "50 − 5",
          "label": "50 − 5 ="
        },
        {
          "kind": "text",
          "value": "21 + 23",
          "label": "21 + 23 ="
        },
        {
          "kind": "text",
          "value": "22 + 23",
          "label": "22 + 23 ="
        }
      ],
      "answer": 3,
      "forbiddenKeys": [
        "4",
        "5"
      ],
      "correctScreenValue": "45"
    }
  },
  {
    "id": "l106_ex3_q1",
    "mission": 3,
    "prompt": "اِخْتَرِ الْمُحَاوَلَةَ الْمَقْبُولَةَ لِإِظْهَارِ خَمْسَةٍ وَعِشْرِينَ، دُونَ اسْتِعْمَالِ اثْنَيْنِ وَخَمْسَةٍ.",
    "audioKey": "l106_ex3_q1",
    "calculatorActivity": {
      "title": "أَيُّ مُحَاوَلَةٍ مَقْبُولَةٌ؟",
      "visual": {
        "kind": "screen",
        "value": "25"
      },
      "options": [
        {
          "kind": "text",
          "value": "14 + 11",
          "label": "14 + 11 ="
        },
        {
          "kind": "text",
          "value": "13 + 12",
          "label": "13 + 12 ="
        },
        {
          "kind": "text",
          "value": "30 − 4",
          "label": "30 − 4 ="
        },
        {
          "kind": "text",
          "value": "25 + 0",
          "label": "25 + 0 ="
        }
      ],
      "answer": 0,
      "forbiddenKeys": [
        "2",
        "5"
      ],
      "correctScreenValue": "25"
    }
  },
  {
    "id": "l106_ex3_q2",
    "mission": 3,
    "prompt": "اِخْتَرِ الْمُحَاوَلَةَ الْمَقْبُولَةَ لِإِظْهَارِ اثْنَيْ عَشَرَ، دُونَ اسْتِعْمَالِ وَاحِدٍ وَاثْنَيْنِ.",
    "audioKey": "l106_ex3_q2",
    "calculatorActivity": {
      "title": "أَيُّ مُحَاوَلَةٍ مَقْبُولَةٌ؟",
      "visual": {
        "kind": "screen",
        "value": "12"
      },
      "options": [
        {
          "kind": "text",
          "value": "10 + 2",
          "label": "10 + 2 ="
        },
        {
          "kind": "text",
          "value": "6 + 6",
          "label": "6 + 6 ="
        },
        {
          "kind": "text",
          "value": "13 − 1",
          "label": "13 − 1 ="
        },
        {
          "kind": "text",
          "value": "7 + 2",
          "label": "7 + 2 ="
        }
      ],
      "answer": 1,
      "forbiddenKeys": [
        "1",
        "2"
      ],
      "correctScreenValue": "12"
    }
  },
  {
    "id": "l106_ex3_q3",
    "mission": 3,
    "prompt": "اِخْتَرِ الْمُحَاوَلَةَ الْمَقْبُولَةَ لِإِظْهَارِ سِتَّةٍ وَثَلَاثِينَ، دُونَ اسْتِعْمَالِ ثَلَاثَةٍ وَسِتَّةٍ.",
    "audioKey": "l106_ex3_q3",
    "calculatorActivity": {
      "title": "أَيُّ مُحَاوَلَةٍ مَقْبُولَةٌ؟",
      "visual": {
        "kind": "screen",
        "value": "36"
      },
      "options": [
        {
          "kind": "text",
          "value": "30 + 6",
          "label": "30 + 6 ="
        },
        {
          "kind": "text",
          "value": "32 + 4",
          "label": "32 + 4 ="
        },
        {
          "kind": "text",
          "value": "40 − 4",
          "label": "40 − 4 ="
        },
        {
          "kind": "text",
          "value": "16 + 20",
          "label": "16 + 20 ="
        }
      ],
      "answer": 2,
      "forbiddenKeys": [
        "3",
        "6"
      ],
      "correctScreenValue": "36"
    }
  },
  {
    "id": "l106_ex3_q4",
    "mission": 3,
    "prompt": "اِخْتَرِ الْمُحَاوَلَةَ الْمَقْبُولَةَ لِإِظْهَارِ خَمْسَةٍ وَأَرْبَعِينَ، دُونَ اسْتِعْمَالِ أَرْبَعَةٍ وَخَمْسَةٍ.",
    "audioKey": "l106_ex3_q4",
    "calculatorActivity": {
      "title": "أَيُّ مُحَاوَلَةٍ مَقْبُولَةٌ؟",
      "visual": {
        "kind": "screen",
        "value": "45"
      },
      "options": [
        {
          "kind": "text",
          "value": "40 + 5",
          "label": "40 + 5 ="
        },
        {
          "kind": "text",
          "value": "22 + 23",
          "label": "22 + 23 ="
        },
        {
          "kind": "text",
          "value": "50 − 5",
          "label": "50 − 5 ="
        },
        {
          "kind": "text",
          "value": "21 + 23",
          "label": "21 + 23 ="
        }
      ],
      "answer": 1,
      "forbiddenKeys": [
        "4",
        "5"
      ],
      "correctScreenValue": "45"
    }
  },
  {
    "id": "l106_ex4_q1",
    "mission": 4,
    "prompt": "يَظْهَرُ سَبْعَةٌ وَثَلَاثُونَ، وَنُرِيدُ سِتَّةً وَثَلَاثِينَ. مَاذَا نَفْعَلُ؟",
    "audioKey": "l106_ex4_q1",
    "calculatorActivity": {
      "title": "مِنْ 37 إِلَى 36",
      "visual": {
        "kind": "screen",
        "value": "37"
      },
      "options": [
        {
          "kind": "text",
          "value": "− 1",
          "label": "− 1"
        },
        {
          "kind": "text",
          "value": "+ 1",
          "label": "+ 1"
        },
        {
          "kind": "text",
          "value": "− 2",
          "label": "− 2"
        },
        {
          "kind": "text",
          "value": "+ 2",
          "label": "+ 2"
        }
      ],
      "answer": 0,
      "correctScreenValue": "36"
    }
  },
  {
    "id": "l106_ex4_q2",
    "mission": 4,
    "prompt": "يَظْهَرُ ثَمَانِيَةٌ وَعِشْرُونَ، وَنُرِيدُ ثَلَاثِينَ. مَاذَا نَفْعَلُ؟",
    "audioKey": "l106_ex4_q2",
    "calculatorActivity": {
      "title": "مِنْ 28 إِلَى 30",
      "visual": {
        "kind": "screen",
        "value": "28"
      },
      "options": [
        {
          "kind": "text",
          "value": "− 2",
          "label": "− 2"
        },
        {
          "kind": "text",
          "value": "+ 2",
          "label": "+ 2"
        },
        {
          "kind": "text",
          "value": "+ 1",
          "label": "+ 1"
        },
        {
          "kind": "text",
          "value": "− 1",
          "label": "− 1"
        }
      ],
      "answer": 1,
      "correctScreenValue": "30"
    }
  },
  {
    "id": "l106_ex4_q3",
    "mission": 4,
    "prompt": "يَظْهَرُ خَمْسَةٌ وَأَرْبَعُونَ، وَنُرِيدُ أَرْبَعِينَ. مَاذَا نَفْعَلُ؟",
    "audioKey": "l106_ex4_q3",
    "calculatorActivity": {
      "title": "مِنْ 45 إِلَى 40",
      "visual": {
        "kind": "screen",
        "value": "45"
      },
      "options": [
        {
          "kind": "text",
          "value": "+ 5",
          "label": "+ 5"
        },
        {
          "kind": "text",
          "value": "− 4",
          "label": "− 4"
        },
        {
          "kind": "text",
          "value": "− 5",
          "label": "− 5"
        },
        {
          "kind": "text",
          "value": "+ 4",
          "label": "+ 4"
        }
      ],
      "answer": 2,
      "correctScreenValue": "40"
    }
  },
  {
    "id": "l106_ex4_q4",
    "mission": 4,
    "prompt": "يَظْهَرُ اثْنَانِ وَثَلَاثُونَ، وَنُرِيدُ خَمْسَةً وَثَلَاثِينَ. مَاذَا نَفْعَلُ؟",
    "audioKey": "l106_ex4_q4",
    "calculatorActivity": {
      "title": "مِنْ 32 إِلَى 35",
      "visual": {
        "kind": "screen",
        "value": "32"
      },
      "options": [
        {
          "kind": "text",
          "value": "− 3",
          "label": "− 3"
        },
        {
          "kind": "text",
          "value": "+ 2",
          "label": "+ 2"
        },
        {
          "kind": "text",
          "value": "− 2",
          "label": "− 2"
        },
        {
          "kind": "text",
          "value": "+ 3",
          "label": "+ 3"
        }
      ],
      "answer": 3,
      "correctScreenValue": "35"
    }
  }
];

const MISSION_TITLES:Record<number,string> = {
  1:"أَصِلُ إِلَى الْعَدَدِ الْمَطْلُوبِ",
  2:"أَخْتَارُ الْعَمَلِيَّةَ الصَّحِيحَةَ",
  3:"أُمَيِّزُ الْمُحَاوَلَةَ الْمَقْبُولَةَ",
  4:"أُصَحِّحُ الْعَدَدَ الظَّاهِرَ",
};

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}:any) {
  return (
    <CalculatorLab
      questionId={question.id}
      activity={question.calculatorActivity}
      locked={locked}
      showResult={showResult}
      onResult={submitResult}
    />
  );
}

export const Lesson106Calculator2Exercises = () => (
  <UnifiedLessonExercisesV2
    lessonKey="lesson106"
    audioBase="/audio/teachers/khalil/lesson_106_calculator_2/exercises"
    questions={QUESTIONS}
    missionTitles={MISSION_TITLES}
    missionCount={4}
    completionMessage="أَحْسَنْتَ! أَصْبَحْتَ تَسْتَعْمِلُ الْحَاسِبَةَ لِلْحِسَابِ وَالتَّحَقُّقِ وَالتَّصْحِيحِ."
    nextPath="/lesson-v2/107"
    nextLabel="الدَّرْسُ التَّالِي"
    renderActivity={renderActivity}
  />
);

export default Lesson106Calculator2Exercises;
