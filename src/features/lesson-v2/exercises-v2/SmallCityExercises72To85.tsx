import type {
  CSSProperties,
} from "react";

import UnifiedLessonExercisesV2, {
  type UnifiedLessonExerciseQuestionV2,
  type UnifiedLessonExerciseRenderContextV2,
} from "./UnifiedLessonExercisesV2";

import SmallCityOrderLabV2, {
  type SmallCityOrderItemV2,
} from "./SmallCityOrderLabV2";

import PremiumIconChoiceLabV2, {
  type PremiumIconChoiceDataV2,
} from "./PremiumIconChoiceLabV2";

import PremiumTimeClockLabV2, {
  type PremiumTimeClockDataV2,
} from "./PremiumTimeClockLabV2";

import PremiumTimelineOrderLabV2, {
  type PremiumTimelineOrderDataV2,
} from "./PremiumTimelineOrderLabV2";

import AnalogClockChoiceLabV2, {
  type AnalogClockChoiceDataV2,
} from "./AnalogClockChoiceLabV2";

import SmallNumberOperationLabV2, {
  type SmallNumberOperationDataV2,
} from "./SmallNumberOperationLabV2";

import RevealNumberChoiceLabV2, {
  type RevealNumberChoiceDataV2,
} from "./RevealNumberChoiceLabV2";

import PremiumNumberLabV2, {
  type PremiumNumberLabDataV2,
} from "./PremiumNumberLabV2";


import PremiumNumberCompareLabV2, {
  type PremiumNumberCompareDataV2,
} from "./PremiumNumberCompareLabV2";
type Mission =
  | 1
  | 2
  | 3
  | 4;

type SmallCityQuestion =
  UnifiedLessonExerciseQuestionV2 & {
    mission: Mission;
    visualSymbol: string;
    visualLabel: string;
    orderItems?: SmallCityOrderItemV2[];
    correctOrder?: string[];
    numberLab?: PremiumNumberLabDataV2;
    numberCompare?: PremiumNumberCompareDataV2;
    numberSequence?: (number | null)[];
    mentalOperation?: {
      left: number;
      operator: "+" | "-";
      right: number;
    tensValueDisplay?: {
      tens: number;
      value: number;
    revealNumberChoice?: RevealNumberChoiceDataV2;
    smallNumberOperation?: SmallNumberOperationDataV2;
    analogClockChoice?: AnalogClockChoiceDataV2;
    premiumIconChoice?: PremiumIconChoiceDataV2;
    premiumClock?: PremiumTimeClockDataV2;
    premiumTimeline?: PremiumTimelineOrderDataV2;
    };
    };
  };

type LessonConfig = {
  lessonKey: string;
  audioBase: string;
  missionTitles: Record<Mission, string>;
  completionMessage: string;
  nextPath?: string;
  questions: SmallCityQuestion[];
};

const SMALL_CITY_HOME =
  "/world/"
  + "b2c0405e-4559-4813-9a73-82b4f0ab4f4c";

const SMALL_CITY_QUIZ =
  SMALL_CITY_HOME
  + "/quiz";

const choice = (
  id: string,
  content: string,
) => ({
  id,
  content,
});

const LESSONS: Record<
  number,
  LessonConfig
> = {

  72: {
    lessonKey: "lesson72",
    audioBase: "/audio/teachers/khalil/lesson_72_numbers_to_69_1/exercises",
    missionTitles: {
      1: "أَتَعَرَّفُ إِلَى الْعَشَرَاتِ وَالْوَحَدَاتِ",
      2: "أَعُدُّ بِالْعَشَرَاتِ",
      3: "أُمَثِّلُ الْأَعْدَادَ",
      4: "أُرَتِّبُ الْأَعْدَادَ",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تَقْرَأُ وَتُمَثِّلُ الْأَعْدَادَ إِلَى 69.",
    nextPath: "/lesson-v2/73",
    questions: [
      // ======================================================
      // MISSION 1 — العشرات والوحدات
      // 4 ANSWERS PER QUESTION
      // ======================================================

      {
        id: "l72_ex1_q1",
        mission: 1,
        visualSymbol: "🔢",
        visualLabel: "عشرات ووحدات",
        prompt: "مَا الْعَدَدُ الصَّحِيحُ؟",
        numberLab: {
          mode: "tensUnits",
          tens: 4,
          units: 3,
        },
        audioKey: "l72_ex1_q1",
        choices: [
          choice("a", "34"),
          choice("b", "47"),
          choice("c", "43"),
          choice("d", "40"),
        ],
        answer: "c",
        columns: 2,
      },

      {
        id: "l72_ex1_q2",
        mission: 1,
        visualSymbol: "🔢",
        visualLabel: "عشرات ووحدات",
        prompt: "مَا الْعَدَدُ الصَّحِيحُ؟",
        numberLab: {
          mode: "tensUnits",
          tens: 6,
          units: 2,
        },
        audioKey: "l72_ex1_q2",
        choices: [
          choice("a", "26"),
          choice("b", "62"),
          choice("c", "60"),
          choice("d", "66"),
        ],
        answer: "b",
        columns: 2,
      },

      {
        id: "l72_ex1_q3",
        mission: 1,
        visualSymbol: "🔟",
        visualLabel: "أحدد العشرات",
        prompt: "كَمْ عَشْرَةً فِي الْعَدَدِ 58؟",
        numberLab: {
          mode: "numberBreakdown",
          number: 58,
          focus: "tens",
        },
        audioKey: "l72_ex1_q3",
        choices: [
          choice("a", "5"),
          choice("b", "8"),
          choice("c", "4"),
          choice("d", "6"),
        ],
        answer: "a",
        columns: 2,
      },

      {
        id: "l72_ex1_q4",
        mission: 1,
        visualSymbol: "1️⃣",
        visualLabel: "أحدد الوحدات",
        prompt: "كَمْ وَحْدَةً فِي الْعَدَدِ 39؟",
        numberLab: {
          mode: "numberBreakdown",
          number: 39,
          focus: "units",
        },
        audioKey: "l72_ex1_q4",
        choices: [
          choice("a", "3"),
          choice("b", "8"),
          choice("c", "9"),
          choice("d", "6"),
        ],
        answer: "c",
        columns: 2,
      },


      // ======================================================
      // MISSION 2 — أعد بالعشرات
      // 4 ANSWERS PER QUESTION
      // ======================================================

      {
        id: "l72_ex2_q1",
        mission: 2,
        visualSymbol: "🔟",
        visualLabel: "أعد بالعشرات",
        prompt: "ثَلَاثُ عَشَرَاتٍ تُسَاوِي كَمْ؟",
        numberLab: {
          mode: "tensValue",
          tens: 3,
        },
        audioKey: "l72_ex2_q1",
        choices: [
          choice("a", "13"),
          choice("b", "30"),
          choice("c", "3"),
          choice("d", "33"),
        ],
        answer: "b",
        columns: 2,
      },

      {
        id: "l72_ex2_q2",
        mission: 2,
        visualSymbol: "🔟",
        visualLabel: "أعد بالعشرات",
        prompt: "خَمْسُ عَشَرَاتٍ تُسَاوِي كَمْ؟",
        numberLab: {
          mode: "tensValue",
          tens: 5,
        },
        audioKey: "l72_ex2_q2",
        choices: [
          choice("a", "50"),
          choice("b", "15"),
          choice("c", "5"),
          choice("d", "55"),
        ],
        answer: "a",
        columns: 2,
      },

      {
        id: "l72_ex2_q3",
        mission: 2,
        visualSymbol: "🔟",
        visualLabel: "أعد بالعشرات",
        prompt: "سِتُّ عَشَرَاتٍ تُسَاوِي كَمْ؟",
        numberLab: {
          mode: "tensValue",
          tens: 6,
        },
        audioKey: "l72_ex2_q3",
        choices: [
          choice("a", "16"),
          choice("b", "6"),
          choice("c", "60"),
          choice("d", "66"),
        ],
        answer: "c",
        columns: 2,
      },

      {
        id: "l72_ex2_q4",
        mission: 2,
        visualSymbol: "🧮",
        visualLabel: "أحسب العدد",
        prompt: "مَا الْعَدَدُ الصَّحِيحُ؟",
        numberLab: {
          mode: "tensUnits",
          tens: 4,
          units: 7,
        },
        audioKey: "l72_ex2_q4",
        choices: [
          choice("a", "40"),
          choice("b", "47"),
          choice("c", "74"),
          choice("d", "44"),
        ],
        answer: "b",
        columns: 2,
      },


      // ======================================================
      // MISSION 3 — عشرات + وحدات
      // يُسَاوِي with damma
      // 4 ANSWERS PER QUESTION
      // ======================================================

      {
        id: "l72_ex3_q1",
        mission: 3,
        visualSymbol: "🧮",
        visualLabel: "أمثل العدد",
        prompt: "20 زَائِدَ 6 يُسَاوِي كَمْ؟",
        numberLab: {
          mode: "expanded",
          number: 26,
        },
        audioKey: "l72_ex3_q1",
        choices: [
          choice("a", "26"),
          choice("b", "62"),
          choice("c", "16"),
          choice("d", "20"),
        ],
        answer: "a",
        columns: 2,
      },

      {
        id: "l72_ex3_q2",
        mission: 3,
        visualSymbol: "🧮",
        visualLabel: "أمثل العدد",
        prompt: "40 زَائِدَ 9 يُسَاوِي كَمْ؟",
        numberLab: {
          mode: "expanded",
          number: 49,
        },
        audioKey: "l72_ex3_q2",
        choices: [
          choice("a", "94"),
          choice("b", "40"),
          choice("c", "49"),
          choice("d", "45"),
        ],
        answer: "c",
        columns: 2,
      },

      {
        id: "l72_ex3_q3",
        mission: 3,
        visualSymbol: "🧮",
        visualLabel: "أمثل العدد",
        prompt: "50 زَائِدَ 3 يُسَاوِي كَمْ؟",
        numberLab: {
          mode: "expanded",
          number: 53,
        },
        audioKey: "l72_ex3_q3",
        choices: [
          choice("a", "50"),
          choice("b", "53"),
          choice("c", "35"),
          choice("d", "55"),
        ],
        answer: "b",
        columns: 2,
      },

      {
        id: "l72_ex3_q4",
        mission: 3,
        visualSymbol: "🧮",
        visualLabel: "أمثل العدد",
        prompt: "60 زَائِدَ 8 يُسَاوِي كَمْ؟",
        numberLab: {
          mode: "expanded",
          number: 68,
        },
        audioKey: "l72_ex3_q4",
        choices: [
          choice("a", "68"),
          choice("b", "86"),
          choice("c", "60"),
          choice("d", "66"),
        ],
        answer: "a",
        columns: 2,
      },


      // ======================================================
      // MISSION 4 — ORDER RESULTS
      // 4 OPERATIONS
      // ASC / DESC / ASC / DESC
      // ======================================================

      {
        id: "l72_ex4_q1",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "من الأصغر إلى الأكبر",
        prompt: "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l72_ex4_q1",
        orderItems: [
          {
            id: "i3",
            label: "40 + 2",
          },
          {
            id: "i1",
            label: "20 + 3",
          },
          {
            id: "i4",
            label: "50 + 6",
          },
          {
            id: "i2",
            label: "30 + 4",
          },
        ],
        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l72_ex4_q2",
        mission: 4,
        visualSymbol: "↘️",
        visualLabel: "من الأكبر إلى الأصغر",
        prompt: "رَتِّبِ النَّتَائِجَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",
        audioKey: "l72_ex4_q2",
        orderItems: [
          {
            id: "i3",
            label: "40 + 7",
          },
          {
            id: "i1",
            label: "60 + 5",
          },
          {
            id: "i4",
            label: "30 + 9",
          },
          {
            id: "i2",
            label: "50 + 8",
          },
        ],
        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l72_ex4_q3",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "من الأصغر إلى الأكبر",
        prompt: "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l72_ex4_q3",
        orderItems: [
          {
            id: "i4",
            label: "40 + 9",
          },
          {
            id: "i2",
            label: "20 + 5",
          },
          {
            id: "i1",
            label: "10 + 8",
          },
          {
            id: "i3",
            label: "30 + 3",
          },
        ],
        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l72_ex4_q4",
        mission: 4,
        visualSymbol: "↘️",
        visualLabel: "من الأكبر إلى الأصغر",
        prompt: "رَتِّبِ النَّتَائِجَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",
        audioKey: "l72_ex4_q4",
        orderItems: [
          {
            id: "i3",
            label: "40 + 6",
          },
          {
            id: "i1",
            label: "60 + 7",
          },
          {
            id: "i4",
            label: "30 + 2",
          },
          {
            id: "i2",
            label: "50 + 4",
          },
        ],
        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },
    ],
  },
  73: {
    lessonKey: "lesson73",
    audioBase: "/audio/teachers/taline/lesson_73_order_events/exercises",
    missionTitles: {
      1: "أَتَعَرَّفُ إِلَى تَرْتِيبِ الْأَحْدَاثِ",
      2: "أَسْتَعْمِلُ قَبْلَ وَبَعْدَ",
      3: "أَرْبِطُ الْحَدَثَ بِوَقْتِهِ",
      4: "أُرَتِّبُ الْأَحْدَاثَ",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُرَتِّبُ الْأَحْدَاثَ وَتَسْتَعْمِلُ قَبْلَ وَبَعْدَ.",
    nextPath: "/lesson-v2/74",
    questions: [
      {
        id: "l73_ex1_q1",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يَحْدُثُ أَوَّلًا فِي بِدَايَةِ الْيَوْمِ؟",

        audioKey:
          "l73_ex1_q1",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🌙",
              label: "النَّوْمُ لَيْلًا",
            },
            {
              id: "b",
              icon: "🏫",
              label: "الْعَوْدَةُ مِنَ الْمَدْرَسَةِ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "الِاسْتِيقَاظُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex1_q2",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يَأْتِي بَعْدَ الِاسْتِيقَاظِ عَادَةً؟",

        audioKey:
          "l73_ex1_q2",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "إِنْهَاءُ الْيَوْمِ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "الِاسْتِعْدَادُ لِلْيَوْمِ",
            },
            {
              id: "c",
              icon: "🌙",
              label: "النَّوْمُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex1_q3",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يَحْدُثُ قَبْلَ النَّوْمِ لَيْلًا؟",

        audioKey:
          "l73_ex1_q3",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "نُنْهِي أَنْشِطَةَ الْيَوْمِ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "نَسْتَيْقِظُ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "نَبْدَأُ الدِّرَاسَةَ صَبَاحًا",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex1_q4",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "بَعْدَ انْتِهَاءِ الدِّرَاسَةِ نَقُومُ بِمَاذَا؟",

        audioKey:
          "l73_ex1_q4",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "نَسْتَيْقِظُ",
            },
            {
              id: "b",
              icon: "🧼",
              label: "نَبْدَأُ يَوْمًا جَدِيدًا",
            },
            {
              id: "c",
              icon: "🟡",
              label: "نَعُودُ إِلَى الْبَيْتِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex2_q1",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "إِذَا اسْتَيْقَظْتُ ثُمَّ ذَهَبْتُ إِلَى الْمَدْرَسَةِ، فَالِاسْتِيقَاظُ حَدَثَ...",

        audioKey:
          "l73_ex2_q1",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "فِي الْوَقْتِ نَفْسِهِ",
            },
            {
              id: "b",
              icon: "🏫",
              label: "قَبْلَ الذَّهَابِ إِلَى الْمَدْرَسَةِ",
            },
            {
              id: "c",
              icon: "🏫",
              label: "بَعْدَ الذَّهَابِ إِلَى الْمَدْرَسَةِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex2_q2",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "إِذَا دَرَسْتُ ثُمَّ لَعِبْتُ، فَاللَّعِبُ حَدَثَ...",

        audioKey:
          "l73_ex2_q2",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "📘",
              label: "بَعْدَ الدِّرَاسَةِ",
            },
            {
              id: "b",
              icon: "📘",
              label: "قَبْلَ الدِّرَاسَةِ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "مَعَ الِاسْتِيقَاظِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex2_q3",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ كَلِمَةٍ نَسْتَعْمِلُهَا لِحَدَثٍ وَقَعَ أَوَّلًا؟",

        audioKey:
          "l73_ex2_q3",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "➡️",
              label: "بَعْدَ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "أَطْوَلَ",
            },
            {
              id: "c",
              icon: "⬅️",
              label: "قَبْلَ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex2_q4",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ كَلِمَةٍ نَسْتَعْمِلُهَا لِحَدَثٍ وَقَعَ ثَانِيًا؟",

        audioKey:
          "l73_ex2_q4",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "أَقْصَرَ",
            },
            {
              id: "b",
              icon: "➡️",
              label: "بَعْدَ",
            },
            {
              id: "c",
              icon: "⬅️",
              label: "قَبْلَ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex3_q1",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ وَقْتٍ يُنَاسِبُ الذَّهَابَ إِلَى الْمَدْرَسَةِ؟",

        audioKey:
          "l73_ex3_q1",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "🌅",
              label: "الصَّبَاحُ",
            },
            {
              id: "b",
              icon: "🌙",
              label: "مُنْتَصَفُ اللَّيْلِ",
            },
            {
              id: "c",
              icon: "🌙",
              label: "أَثْنَاءُ النَّوْمِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex3_q2",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ وَقْتٍ يُنَاسِبُ النَّوْمَ؟",

        audioKey:
          "l73_ex3_q2",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🌅",
              label: "الصَّبَاحُ فِي الْقِسْمِ",
            },
            {
              id: "b",
              icon: "🕐",
              label: "وَقْتُ الدَّرْسِ",
            },
            {
              id: "c",
              icon: "🌙",
              label: "اللَّيْلُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex3_q3",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "الْحَدَثُ الَّذِي يَقَعُ فِي وَقْتٍ أَبْكَرَ يَكُونُ...",

        audioKey:
          "l73_ex3_q3",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🧰",
              label: "مِنْ دُونِ تَرْتِيبٍ",
            },
            {
              id: "b",
              icon: "⬅️",
              label: "قَبْلَ الْحَدَثِ الْمُتَأَخِّرِ",
            },
            {
              id: "c",
              icon: "➡️",
              label: "بَعْدَهُ دَائِمًا",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex3_q4",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَاذَا نَسْتَعْمِلُ لِمَعْرِفَةِ وَقْتِ الْحَدَثِ؟",

        audioKey:
          "l73_ex3_q4",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "السَّاعَةَ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "الْمِسْطَرَةَ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "الْمِمْحَاةَ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l73_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "قِصَّةُ الصَّبَاحِ",
        prompt: "رَتِّبْ أَحْدَاثَ الصَّبَاحِ.",
        audioKey: "l73_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🥣✨", label: "تَنَاوُلُ الْفُطُورِ" },
            { id: "i1", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "i4", icon: "🎒🏫", label: "الذَّهَابُ إِلَى الْمَدْرَسَةِ" },
            { id: "i2", icon: "🧼💧", label: "غَسْلُ الْوَجْهِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l73_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "قِصَّةُ حِصَّةِ الرِّيَاضَةِ",
        prompt: "رَتِّبْ أَحْدَاثَ حِصَّةِ الرِّيَاضَةِ.",
        audioKey: "l73_ex4_q2",
        premiumTimeline: {
          items: [
            { id: "i2", icon: "🔥", label: "الْإِحْمَاءُ" },
            { id: "i4", icon: "💧", label: "شُرْبُ الْمَاءِ" },
            { id: "i1", icon: "👟", label: "ارْتِدَاءُ حِذَاءِ الرِّيَاضَةِ" },
            { id: "i3", icon: "🏃", label: "أَدَاءُ التَّمَارِينِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l73_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "قِصَّةُ الْمَسَاءِ",
        prompt: "رَتِّبْ أَحْدَاثَ الْمَسَاءِ فِي الْبَيْتِ.",
        audioKey: "l73_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🍽️", label: "تَنَاوُلُ الْعَشَاءِ" },
            { id: "i1", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i4", icon: "🌙", label: "النَّوْمُ" },
            { id: "i2", icon: "📚", label: "إِنْجَازُ الْوَاجِبِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l73_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "قِصَّةُ رِحْلَةٍ",
        prompt: "رَتِّبْ أَحْدَاثَ رِحْلَةٍ قَصِيرَةٍ.",
        audioKey: "l73_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i2", icon: "🚌", label: "رُكُوبُ الْحَافِلَةِ" },
            { id: "i1", icon: "🎒", label: "تَجْهِيزُ الْحَقِيبَةِ" },
            { id: "i3", icon: "🌳", label: "زِيَارَةُ الْحَدِيقَةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
  74: {
    lessonKey: "lesson74",
    audioBase: "/audio/teachers/khalil/lesson_74_numbers_to_69_2/exercises",

    missionTitles: {
      1: "أَبْنِي مَجْمُوعَاتِ الْعَشَرَاتِ",
      2: "أُكَوِّنُ الْعَدَدَ وَأُفَكِّكُهُ",
      3: "أُقَارِنُ الْأَعْدَادَ",
      4: "أُرَتِّبُ الْأَعْدَادَ",
    },

    completionMessage:
      "مُمْتَازٌ! أَصْبَحْتَ تُكَوِّنُ وَتُفَكِّكُ وَتُقَارِنُ الْأَعْدَادَ إِلَى 69.",

    nextPath:
      "/lesson-v2/75",

    questions: [
      {
        id: "l74_ex1_q1",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "عَشْرَةٌ كَامِلَةٌ",

        prompt:
          "عَشَرَةُ عَنَاصِرَ تُسَاوِي كَمْ؟",

        audioKey:
          "l74_ex1_q1",

        revealNumberChoice: {
          mode: "tensGroups",

          tens: 1,

          correctValue: 10,

          choices: [
            {
              id: "a",
              label: "1",
              value: 1,
            },
            {
              id: "b",
              label: "10",
              value: 10,
            },
            {
              id: "c",
              label: "20",
              value: 20,
            },
            {
              id: "d",
              label: "11",
              value: 11,
            },
          ],
        },
      },

      {
        id: "l74_ex1_q2",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أَعُدُّ بِالْعَشَرَاتِ",

        prompt:
          "أَرْبَعُ مَجْمُوعَاتٍ مِنْ عَشَرَةٍ تُسَاوِي كَمْ؟",

        audioKey:
          "l74_ex1_q2",

        revealNumberChoice: {
          mode: "tensGroups",

          tens: 4,

          correctValue: 40,

          choices: [
            {
              id: "a",
              label: "4",
              value: 4,
            },
            {
              id: "b",
              label: "14",
              value: 14,
            },
            {
              id: "c",
              label: "40",
              value: 40,
            },
            {
              id: "d",
              label: "44",
              value: 44,
            },
          ],
        },
      },

      {
        id: "l74_ex1_q3",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أَعُدُّ بِالْعَشَرَاتِ",

        prompt:
          "خَمْسُ مَجْمُوعَاتٍ مِنْ عَشَرَةٍ تُسَاوِي كَمْ؟",

        audioKey:
          "l74_ex1_q3",

        revealNumberChoice: {
          mode: "tensGroups",

          tens: 5,

          correctValue: 50,

          choices: [
            {
              id: "a",
              label: "15",
              value: 15,
            },
            {
              id: "b",
              label: "50",
              value: 50,
            },
            {
              id: "c",
              label: "5",
              value: 5,
            },
            {
              id: "d",
              label: "55",
              value: 55,
            },
          ],
        },
      },

      {
        id: "l74_ex1_q4",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أَعُدُّ بِالْعَشَرَاتِ",

        prompt:
          "سِتُّ مَجْمُوعَاتٍ مِنْ عَشَرَةٍ تُسَاوِي كَمْ؟",

        audioKey:
          "l74_ex1_q4",

        revealNumberChoice: {
          mode: "tensGroups",

          tens: 6,

          correctValue: 60,

          choices: [
            {
              id: "a",
              label: "60",
              value: 60,
            },
            {
              id: "b",
              label: "16",
              value: 16,
            },
            {
              id: "c",
              label: "6",
              value: 6,
            },
            {
              id: "d",
              label: "66",
              value: 66,
            },
          ],
        },
      },

      {
        id: "l74_ex2_q1",
        mission: 2,

        visualSymbol: "🔢",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "54 فِيهِ كَمْ عَشْرَةً وَكَمْ وَحْدَةً؟",

        numberLab: {
          mode: "numberBreakdown",
          number: 54,
        },

        audioKey:
          "l74_ex2_q1",

        choices: [
          choice(
            "a",
            "5 عَشَرَاتٍ وَ4 وَحَدَاتٍ",
          ),

          choice(
            "b",
            "4 عَشَرَاتٍ وَ5 وَحَدَاتٍ",
          ),

          choice(
            "c",
            "5 عَشَرَاتٍ وَوَحْدَةٌ وَاحِدَةٌ",
          ),

          choice(
            "d",
            "4 عَشَرَاتٍ وَ4 وَحَدَاتٍ",
          ),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l74_ex2_q2",
        mission: 2,

        visualSymbol: "🔢",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "61 فِيهِ كَمْ عَشْرَةً وَكَمْ وَحْدَةً؟",

        numberLab: {
          mode: "numberBreakdown",
          number: 61,
        },

        audioKey:
          "l74_ex2_q2",

        choices: [
          choice(
            "a",
            "6 عَشَرَاتٍ وَوَحْدَةٌ وَاحِدَةٌ",
          ),

          choice(
            "b",
            "عَشْرَةٌ وَاحِدَةٌ وَ6 وَحَدَاتٍ",
          ),

          choice(
            "c",
            "6 عَشَرَاتٍ وَ6 وَحَدَاتٍ",
          ),

          choice(
            "d",
            "5 عَشَرَاتٍ وَوَحْدَةٌ وَاحِدَةٌ",
          ),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l74_ex2_q3",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُكَوِّنُ الْعَدَدَ",

        prompt:
          "3 عَشَرَاتٍ وَ8 وَحَدَاتٍ. مَا الْعَدَدُ؟",

        numberLab: {
          mode: "tensUnits",
          tens: 3,
          units: 8,
        },

        audioKey:
          "l74_ex2_q3",

        choices: [
          choice("a", "83"),
          choice("b", "30"),
          choice("c", "38"),
          choice("d", "48"),
        ],

        answer: "c",
        columns: 2,
      },

      {
        id: "l74_ex2_q4",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُكَوِّنُ الْعَدَدَ",

        prompt:
          "5 عَشَرَاتٍ وَ9 وَحَدَاتٍ. مَا الْعَدَدُ؟",

        numberLab: {
          mode: "tensUnits",
          tens: 5,
          units: 9,
        },

        audioKey:
          "l74_ex2_q4",

        choices: [
          choice("a", "50"),
          choice("b", "59"),
          choice("c", "95"),
          choice("d", "69"),
        ],

        answer: "b",
        columns: 2,
      },

      {
        id: "l74_ex3_q1",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْأَكْبَرَ",

        prompt:
          "أَيُّهُمَا أَكْبَرُ: 62 أَمْ 56؟",

        numberCompare: {
          mode: "pickGreater",
          left: 62,
          right: 56,
        },

        audioKey:
          "l74_ex3_q1",
      },

      {
        id: "l74_ex3_q2",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْأَصْغَرَ",

        prompt:
          "أَيُّهُمَا أَصْغَرُ: 48 أَمْ 53؟",

        numberCompare: {
          mode: "pickSmaller",
          left: 48,
          right: 53,
        },

        audioKey:
          "l74_ex3_q2",
      },

      {
        id: "l74_ex3_q3",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْعَلَامَةَ",

        prompt:
          "اخْتَرِ الْعَلَامَةَ الصَّحِيحَةَ بَيْنَ 67 وَ61.",

        numberCompare: {
          mode: "pickSign",
          left: 67,
          right: 61,
        },

        audioKey:
          "l74_ex3_q3",
      },

      {
        id: "l74_ex3_q4",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْعَلَامَةَ",

        prompt:
          "اخْتَرِ الْعَلَامَةَ الصَّحِيحَةَ بَيْنَ 45 وَ54.",

        numberCompare: {
          mode: "pickSign",
          left: 45,
          right: 54,
        },

        audioKey:
          "l74_ex3_q4",
      },

      {
        id: "l74_ex4_q1",
        mission: 4,

        visualSymbol: "↗️",
        visualLabel:
          "مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

        prompt:
          "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l74_ex4_q1",

        orderItems: [
          {
            id: "i3",
            label: "46",
          },
          {
            id: "i1",
            label: "32",
          },
          {
            id: "i4",
            label: "58",
          },
          {
            id: "i2",
            label: "41",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l74_ex4_q2",
        mission: 4,

        visualSymbol: "↘️",
        visualLabel:
          "مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ",

        prompt:
          "رَتِّبِ الْأَعْدَادَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",

        audioKey:
          "l74_ex4_q2",

        orderItems: [
          {
            id: "i2",
            label: "55",
          },
          {
            id: "i1",
            label: "63",
          },
          {
            id: "i4",
            label: "41",
          },
          {
            id: "i3",
            label: "49",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l74_ex4_q3",
        mission: 4,

        visualSymbol: "↗️",
        visualLabel:
          "مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

        prompt:
          "ابْدَأْ بِالْأَصْغَرِ، ثُمَّ رَتِّبِ الْأَعْدَادَ.",

        audioKey:
          "l74_ex4_q3",

        orderItems: [
          {
            id: "i3",
            label: "59",
          },
          {
            id: "i1",
            label: "52",
          },
          {
            id: "i4",
            label: "61",
          },
          {
            id: "i2",
            label: "57",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l74_ex4_q4",
        mission: 4,

        visualSymbol: "↘️",
        visualLabel:
          "مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ",

        prompt:
          "ابْدَأْ بِالْأَكْبَرِ، ثُمَّ رَتِّبِ الْأَعْدَادَ.",

        audioKey:
          "l74_ex4_q4",

        orderItems: [
          {
            id: "i3",
            label: "60",
          },
          {
            id: "i1",
            label: "69",
          },
          {
            id: "i4",
            label: "56",
          },
          {
            id: "i2",
            label: "65",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },
    ],
  },
  75: {
    lessonKey: "lesson75",

    audioBase:
      "/audio/teachers/khalil/lesson_75_numbers_to_69_3/exercises",

    missionTitles: {
      1: "أُكْمِلُ السِّلْسِلَةَ الْعَدَدِيَّةَ",
      2: "أُفَكِّكُ الْعَدَدَ وَأُكَوِّنُهُ",
      3: "أُقَارِنُ الْأَعْدَادَ",
      4: "أُرَتِّبُ الْأَعْدَادَ",
    },

    completionMessage:
      "أَحْسَنْتَ! أَتْقَنْتَ السِّلْسِلَةَ وَالتَّفْكِيكَ وَالْمُقَارَنَةَ وَالتَّرْتِيبَ إِلَى 69.",

    nextPath:
      "/lesson-v2/76",

    questions: [
      {
        id: "l75_ex1_q1",
        mission: 1,

        visualSymbol:
          "🔢",

        visualLabel:
          "أُكْمِلُ السِّلْسِلَةَ",

        prompt:
          "مَا الْعَدَدُ الَّذِي يَأْتِي بَعْدَ 39؟",

        audioKey:
          "l75_ex1_q1",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            38,
            39,
            null,
            41,
          ],

          correctValue:
            40,

          choices: [
            {
              id: "a",
              label: "38",
              value: 38,
            },
            {
              id: "b",
              label: "40",
              value: 40,
            },
            {
              id: "c",
              label: "49",
              value: 49,
            },
            {
              id: "d",
              label: "30",
              value: 30,
            },
          ],
        },
      },

      {
        id: "l75_ex1_q2",
        mission: 1,

        visualSymbol:
          "🔢",

        visualLabel:
          "أُكْمِلُ السِّلْسِلَةَ",

        prompt:
          "مَا الْعَدَدُ الَّذِي يَأْتِي بَعْدَ 47؟",

        audioKey:
          "l75_ex1_q2",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            46,
            47,
            null,
            49,
          ],

          correctValue:
            48,

          choices: [
            {
              id: "a",
              label: "57",
              value: 57,
            },
            {
              id: "b",
              label: "48",
              value: 48,
            },
            {
              id: "c",
              label: "46",
              value: 46,
            },
            {
              id: "d",
              label: "50",
              value: 50,
            },
          ],
        },
      },

      {
        id: "l75_ex1_q3",
        mission: 1,

        visualSymbol:
          "🔢",

        visualLabel:
          "أَجِدُ الْعَدَدَ النَّاقِصَ",

        prompt:
          "أَكْمِلْ: 51، 52، ...، 54.",

        audioKey:
          "l75_ex1_q3",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            51,
            52,
            null,
            54,
          ],

          correctValue:
            53,

          choices: [
            {
              id: "a",
              label: "53",
              value: 53,
            },
            {
              id: "b",
              label: "55",
              value: 55,
            },
            {
              id: "c",
              label: "43",
              value: 43,
            },
            {
              id: "d",
              label: "52",
              value: 52,
            },
          ],
        },
      },

      {
        id: "l75_ex1_q4",
        mission: 1,

        visualSymbol:
          "🔢",

        visualLabel:
          "أَجِدُ الْعَدَدَ النَّاقِصَ",

        prompt:
          "أَكْمِلْ: 66، 67، ...، 69.",

        audioKey:
          "l75_ex1_q4",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            66,
            67,
            null,
            69,
          ],

          correctValue:
            68,

          choices: [
            {
              id: "a",
              label: "65",
              value: 65,
            },
            {
              id: "b",
              label: "70",
              value: 70,
            },
            {
              id: "c",
              label: "68",
              value: 68,
            },
            {
              id: "d",
              label: "58",
              value: 58,
            },
          ],
        },
      },

      {
        id: "l75_ex2_q1",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "فَكِّكِ الْعَدَدَ 58.",

        numberLab: {
          mode: "numberBreakdown",
          number: 58,
        },

        audioKey:
          "l75_ex2_q1",

        choices: [
          choice("a", "50 + 8"),
          choice("b", "50 + 5"),
          choice("c", "40 + 8"),
          choice("d", "58 + 8"),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l75_ex2_q2",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "فَكِّكِ الْعَدَدَ 64.",

        numberLab: {
          mode: "numberBreakdown",
          number: 64,
        },

        audioKey:
          "l75_ex2_q2",

        choices: [
          choice("a", "60 + 4"),
          choice("b", "60 + 6"),
          choice("c", "40 + 6"),
          choice("d", "50 + 4"),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l75_ex2_q3",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُكَوِّنُ الْعَدَدَ",

        prompt:
          "3 عَشَرَاتٍ وَ7 وَحَدَاتٍ. مَا الْعَدَدُ؟",

        numberLab: {
          mode: "tensUnits",
          tens: 3,
          units: 7,
        },

        audioKey:
          "l75_ex2_q3",

        choices: [
          choice("a", "73"),
          choice("b", "30"),
          choice("c", "37"),
          choice("d", "47"),
        ],

        answer: "c",
        columns: 2,
      },

      {
        id: "l75_ex2_q4",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُكَوِّنُ الْعَدَدَ",

        prompt:
          "6 عَشَرَاتٍ وَ5 وَحَدَاتٍ. مَا الْعَدَدُ؟",

        numberLab: {
          mode: "tensUnits",
          tens: 6,
          units: 5,
        },

        audioKey:
          "l75_ex2_q4",

        choices: [
          choice("a", "60"),
          choice("b", "65"),
          choice("c", "56"),
          choice("d", "75"),
        ],

        answer: "b",
        columns: 2,
      },


      {
        id: "l75_ex3_q1",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْأَكْبَرَ",

        prompt:
          "أَيُّهُمَا أَكْبَرُ: 62 أَمْ 56؟",

        numberCompare: {
          mode: "pickGreater",
          left: 62,
          right: 56,
        },

        audioKey:
          "l75_ex3_q1",
      },

      {
        id: "l75_ex3_q2",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْأَصْغَرَ",

        prompt:
          "أَيُّهُمَا أَصْغَرُ: 43 أَمْ 49؟",

        numberCompare: {
          mode: "pickSmaller",
          left: 43,
          right: 49,
        },

        audioKey:
          "l75_ex3_q2",
      },

      {
        id: "l75_ex3_q3",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْعَلَامَةَ",

        prompt:
          "اخْتَرِ الْعَلَامَةَ الصَّحِيحَةَ بَيْنَ 58 وَ58.",

        numberCompare: {
          mode: "pickSign",
          left: 58,
          right: 58,
        },

        audioKey:
          "l75_ex3_q3",
      },

      {
        id: "l75_ex3_q4",
        mission: 3,

        visualSymbol: "⚖️",
        visualLabel:
          "أَخْتَارُ الْعَلَامَةَ",

        prompt:
          "اخْتَرِ الْعَلَامَةَ الصَّحِيحَةَ بَيْنَ 69 وَ63.",

        numberCompare: {
          mode: "pickSign",
          left: 69,
          right: 63,
        },

        audioKey:
          "l75_ex3_q4",
      },


      {
        id: "l75_ex4_q1",
        mission: 4,

        visualSymbol: "↗️",
        visualLabel:
          "مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

        prompt:
          "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l75_ex4_q1",

        orderItems: [
          {
            id: "i2",
            label: "40",
          },
          {
            id: "i1",
            label: "39",
          },
          {
            id: "i4",
            label: "44",
          },
          {
            id: "i3",
            label: "41",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l75_ex4_q2",
        mission: 4,

        visualSymbol: "↘️",
        visualLabel:
          "مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ",

        prompt:
          "رَتِّبِ الْأَعْدَادَ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",

        audioKey:
          "l75_ex4_q2",

        orderItems: [
          {
            id: "i3",
            label: "52",
          },
          {
            id: "i1",
            label: "58",
          },
          {
            id: "i4",
            label: "48",
          },
          {
            id: "i2",
            label: "55",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l75_ex4_q3",
        mission: 4,

        visualSymbol: "↗️",
        visualLabel:
          "مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

        prompt:
          "ابْدَأْ بِالْأَصْغَرِ، ثُمَّ رَتِّبِ الْأَعْدَادَ.",

        audioKey:
          "l75_ex4_q3",

        orderItems: [
          {
            id: "i3",
            label: "62",
          },
          {
            id: "i1",
            label: "56",
          },
          {
            id: "i4",
            label: "67",
          },
          {
            id: "i2",
            label: "59",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l75_ex4_q4",
        mission: 4,

        visualSymbol: "↘️",
        visualLabel:
          "مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ",

        prompt:
          "ابْدَأْ بِالْأَكْبَرِ، ثُمَّ رَتِّبِ الْأَعْدَادَ.",

        audioKey:
          "l75_ex4_q4",

        orderItems: [
          {
            id: "i4",
            label: "44",
          },
          {
            id: "i1",
            label: "69",
          },
          {
            id: "i3",
            label: "59",
          },
          {
            id: "i2",
            label: "64",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },
    ],
  },
  76: {
    lessonKey: "lesson76",
    audioBase: "/audio/teachers/taline/lesson_76_event_in_time/exercises",
    missionTitles: {
      1: "أُحَدِّدُ مَوْقِعَ الْحَدَثِ",
      2: "أَسْتَعْمِلُ قَبْلَ وَبَعْدَ",
      3: "أَرْبِطُ الْحَدَثَ بِالزَّمَنِ",
      4: "أُرَتِّبُ الْأَحْدَاثَ",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُحَدِّدُ مَوْقِعَ الْحَدَثِ فِي الزَّمَنِ.",
    nextPath: "/lesson-v2/77",
    questions: [
      {
        id: "l76_ex1_q1",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ حَدَثٍ يَقَعُ فِي بِدَايَةِ يَوْمِنَا؟",

        audioKey:
          "l76_ex1_q1",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🌙",
              label: "النَّوْمُ لَيْلًا",
            },
            {
              id: "b",
              icon: "🔵",
              label: "نِهَايَةُ الْيَوْمِ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "الِاسْتِيقَاظُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex1_q2",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ حَدَثٍ يَقَعُ عَادَةً فِي نِهَايَةِ الْيَوْمِ؟",

        audioKey:
          "l76_ex1_q2",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🏫",
              label: "الذَّهَابُ إِلَى الْمَدْرَسَةِ",
            },
            {
              id: "b",
              icon: "🌙",
              label: "النَّوْمُ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "الِاسْتِيقَاظُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex1_q3",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يَأْتِي قَبْلَ الْعَوْدَةِ مِنَ الْمَدْرَسَةِ؟",

        audioKey:
          "l76_ex1_q3",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "📘",
              label: "الدِّرَاسَةُ",
            },
            {
              id: "b",
              icon: "🌙",
              label: "النَّوْمُ",
            },
            {
              id: "c",
              icon: "🌅",
              label: "الِاسْتِيقَاظُ لِيَوْمٍ جَدِيدٍ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex1_q4",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يَأْتِي بَعْدَ الِاسْتِيقَاظِ؟",

        audioKey:
          "l76_ex1_q4",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🌙",
              label: "النَّوْمُ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "نِهَايَةُ الْيَوْمِ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "الِاسْتِعْدَادُ لِلْيَوْمِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex2_q1",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "الْوِلَادَةُ تَحْدُثُ ... الدُّخُولِ إِلَى الْمَدْرَسَةِ.",

        audioKey:
          "l76_ex2_q1",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "فِي الْوَقْتِ نَفْسِهِ",
            },
            {
              id: "b",
              icon: "⬅️",
              label: "قَبْلَ",
            },
            {
              id: "c",
              icon: "➡️",
              label: "بَعْدَ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex2_q2",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "الدُّخُولُ إِلَى الْمَدْرَسَةِ يَحْدُثُ ... الْوِلَادَةِ.",

        audioKey:
          "l76_ex2_q2",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "➡️",
              label: "بَعْدَ",
            },
            {
              id: "b",
              icon: "⬅️",
              label: "قَبْلَ",
            },
            {
              id: "c",
              icon: "🕐",
              label: "فِي الْوَقْتِ نَفْسِهِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex2_q3",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "إِذَا أَكَلْتُ ثُمَّ غَسَلْتُ أَسْنَانِي، فَغَسْلُ الْأَسْنَانِ حَدَثَ...",

        audioKey:
          "l76_ex2_q3",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "⬅️",
              label: "قَبْلَ الْأَكْلِ",
            },
            {
              id: "b",
              icon: "🌅",
              label: "قَبْلَ الِاسْتِيقَاظِ",
            },
            {
              id: "c",
              icon: "➡️",
              label: "بَعْدَ الْأَكْلِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex2_q4",
        mission: 2,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "إِذَا لَعِبْتُ بَعْدَ إِنْجَازِ الْوَاجِبِ، فَالْوَاجِبُ حَدَثَ...",

        audioKey:
          "l76_ex2_q4",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🌙",
              label: "بَعْدَ النَّوْمِ",
            },
            {
              id: "b",
              icon: "🧩",
              label: "قَبْلَ اللَّعِبِ",
            },
            {
              id: "c",
              icon: "🧩",
              label: "بَعْدَ اللَّعِبِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l76_ex3_q1",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أُحَدِّدُ مَوْقِعَ الْحَدَثِ",
        prompt: "أَيْنَ نَضَعُ وَقْتَ الْغَدَاءِ فِي يَوْمِنَا؟",
        audioKey: "l76_ex3_q1",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "🌅", label: "الصَّبَاحُ" },
            { id: "b", icon: "☀️", label: "الظُّهْرُ" },
            { id: "c", icon: "🌇", label: "الْمَسَاءُ" },
            { id: "d", icon: "🌙", label: "اللَّيْلُ" },
          ],
        },
      },
      {
        id: "l76_ex3_q2",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "بَيْنَ حَدَثَيْنِ",
        prompt: "أَيُّ حَدَثٍ يَقَعُ بَيْنَ الِاسْتِيقَاظِ وَالنَّوْمِ؟",
        audioKey: "l76_ex3_q2",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🌙", label: "النَّوْمُ" },
            { id: "b", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "c", icon: "🏫", label: "الذَّهَابُ إِلَى الْمَدْرَسَةِ" },
            { id: "d", icon: "🌌", label: "مُنْتَصَفُ اللَّيْلِ" },
          ],
        },
      },
      {
        id: "l76_ex3_q3",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "قَبْلَ أَمْ بَعْدَ؟",
        prompt: "الْفُطُورُ قَبْلَ الذَّهَابِ إِلَى الْمَدْرَسَةِ. مَتَى نَذْهَبُ إِلَى الْمَدْرَسَةِ؟",
        audioKey: "l76_ex3_q3",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "⬅️", label: "قَبْلَ الْفُطُورِ" },
            { id: "b", icon: "➡️", label: "بَعْدَ الْفُطُورِ" },
            { id: "c", icon: "🌙", label: "أَثْنَاءَ النَّوْمِ" },
            { id: "d", icon: "🌅", label: "قَبْلَ الِاسْتِيقَاظِ" },
          ],
        },
      },
      {
        id: "l76_ex3_q4",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "مَاذَا يَأْتِي بَعْدَ؟",
        prompt: "غَسَلْنَا أَيْدِيَنَا قَبْلَ الْأَكْلِ. مَاذَا يَأْتِي بَعْدَ غَسْلِ الْيَدَيْنِ؟",
        audioKey: "l76_ex3_q4",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "🍽️", label: "الْأَكْلُ" },
            { id: "b", icon: "🧩", label: "اللَّعِبُ" },
            { id: "c", icon: "🌙", label: "النَّوْمُ" },
            { id: "d", icon: "🏫", label: "الذَّهَابُ إِلَى الْمَدْرَسَةِ" },
          ],
        },
      },
      {
        id: "l76_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مَحَطَّاتٌ فِي الزَّمَنِ",
        prompt: "رَتِّبْ مَحَطَّاتِ يَوْمٍ دِرَاسِيٍّ.",
        audioKey: "l76_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🍎", label: "الِاسْتِرَاحَةُ فِي الْمَدْرَسَةِ" },
            { id: "i1", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "i4", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i2", icon: "🏫", label: "الْوُصُولُ إِلَى الْمَدْرَسَةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l76_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مَرَاحِلُ الْحَيَاةِ",
        prompt: "رَتِّبْ مَرَاحِلَ حَيَاةِ الطِّفْلِ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l76_ex4_q2",
        premiumTimeline: {
        items: [
          {
            id: "i3",
            icon: "🎨",
            label: "طِفْلُ الرَّوْضَةِ",
          },
          {
            id: "i1",
            icon: "👶",
            label: "رَضِيعٌ",
          },
          {
            id: "i4",
            icon: "🏫",
            label: "تِلْمِيذُ الْمَدْرَسَةِ الِابْتِدَائِيَّةِ",
          },
          {
            id: "i2",
            icon: "🧒",
            label: "طِفْلٌ صَغِيرٌ",
          },
        ],
        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },
      },
      {
        id: "l76_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَسَلْسُلُ الْعِنَايَةِ",
        prompt: "رَتِّبْ خُطُوَاتِ الْعِنَايَةِ بِالْأَسْنَانِ بَعْدَ الْأَكْلِ.",
        audioKey: "l76_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🪥✨", label: "تَنْظِيفُ الْأَسْنَانِ" },
            { id: "i1", icon: "🍽️", label: "الِانْتِهَاءُ مِنَ الْأَكْلِ" },
            { id: "i4", icon: "💧", label: "مَضْمَضَةُ الْفَمِ" },
            { id: "i2", icon: "🪥", label: "أَخْذُ الْفُرْشَاةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l76_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "زِيَارَةٌ مُرَتَّبَةٌ",
        prompt: "رَتِّبْ أَحْدَاثَ زِيَارَةِ الطَّبِيبِ.",
        audioKey: "l76_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i2", icon: "🪑", label: "الِانْتِظَارُ فِي الْقَاعَةِ" },
            { id: "i4", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i1", icon: "🚶", label: "الذَّهَابُ إِلَى الْعِيَادَةِ" },
            { id: "i3", icon: "🩺", label: "مُقَابَلَةُ الطَّبِيبِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
  77: {
    lessonKey: "lesson77",
    audioBase: "/audio/teachers/khalil/lesson_77_familiar_solids/exercises",
    missionTitles: {
      1: "أُسَمِّي الْمُجَسَّمَاتِ",
      2: "أَتَعَرَّفُ إِلَى خَصَائِصِهَا",
      3: "أُمَيِّزُ التَّدَحْرُجَ وَالِانْزِلَاقَ",
      4: "أُصَنِّفُ الْمُجَسَّمَاتِ",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُمَيِّزُ الْمُجَسَّمَاتِ الْمَأْلُوفَةَ وَخَصَائِصَهَا.",
    nextPath: "/lesson-v2/78",
    questions: [
      {
        id: "l77_ex1_q1",
        mission: 1,
        visualSymbol: "⚽",
        visualLabel: "أسمي المجسم",
        prompt: "أَيُّ مُجَسَّمٍ يُشْبِهُ الْكُرَةَ الَّتِي نَلْعَبُ بِهَا؟",
        audioKey: "l77_ex1_q1",
        choices: [
          choice("a", "الْمُكَعَّبُ"),
          choice("b", "الْهَرَمُ"),
          choice("c", "الْكُرَةُ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l77_ex1_q2",
        mission: 1,
        visualSymbol: "🧊",
        visualLabel: "أسمي المجسم",
        prompt: "أَيُّ مُجَسَّمٍ لَهُ شَكْلُ صُنْدُوقٍ مُتَسَاوِي الْأَوْجُهِ؟",
        audioKey: "l77_ex1_q2",
        choices: [
          choice("a", "الْأُسْطُوَانَةُ"),
          choice("b", "الْمُكَعَّبُ"),
          choice("c", "الْكُرَةُ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l77_ex1_q3",
        mission: 1,
        visualSymbol: "🥫",
        visualLabel: "أسمي المجسم",
        prompt: "عُلْبَةُ الْمَشْرُوبِ تُشْبِهُ...",
        audioKey: "l77_ex1_q3",
        choices: [
          choice("a", "الْأُسْطُوَانَةَ"),
          choice("b", "الْكُرَةَ"),
          choice("c", "الْهَرَمَ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l77_ex1_q4",
        mission: 1,
        visualSymbol: "📦",
        visualLabel: "أسمي المجسم",
        prompt: "عُلْبَةُ الْأَحْذِيَةِ تُشْبِهُ...",
        audioKey: "l77_ex1_q4",
        choices: [
          choice("a", "الْكُرَةَ"),
          choice("b", "الْهَرَمَ"),
          choice("c", "مُتَوَازِيَ الْمُسْتَطِيلَاتِ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l77_ex2_q1",
        mission: 2,
        visualSymbol: "⚽",
        visualLabel: "خصائص المجسم",
        prompt: "أَيُّ مُجَسَّمٍ لَهُ سَطْحٌ مُنْحَنٍ مِنْ جَمِيعِ الْجِهَاتِ؟",
        audioKey: "l77_ex2_q1",
        choices: [
          choice("a", "الْهَرَمُ"),
          choice("b", "الْكُرَةُ"),
          choice("c", "الْمُكَعَّبُ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l77_ex2_q2",
        mission: 2,
        visualSymbol: "🧊",
        visualLabel: "خصائص المجسم",
        prompt: "أَيُّ مُجَسَّمٍ لَهُ أَوْجُهٌ مُسَطَّحَةٌ؟",
        audioKey: "l77_ex2_q2",
        choices: [
          choice("a", "الْمُكَعَّبُ"),
          choice("b", "الْكُرَةُ"),
          choice("c", "كِلَاهُمَا لَا أَوْجُهَ لَهُ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l77_ex2_q3",
        mission: 2,
        visualSymbol: "🥫",
        visualLabel: "خصائص المجسم",
        prompt: "أَيُّ مُجَسَّمٍ لَهُ سَطْحٌ مُنْحَنٍ وَوَجْهَانِ مُسَطَّحَانِ؟",
        audioKey: "l77_ex2_q3",
        choices: [
          choice("a", "الْكُرَةُ"),
          choice("b", "الْمُكَعَّبُ"),
          choice("c", "الْأُسْطُوَانَةُ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l77_ex2_q4",
        mission: 2,
        visualSymbol: "🔺",
        visualLabel: "خصائص المجسم",
        prompt: "أَيُّ مُجَسَّمٍ يَنْتَهِي بِرَأْسٍ فِي الْأَعْلَى؟",
        audioKey: "l77_ex2_q4",
        choices: [
          choice("a", "الْمُكَعَّبُ"),
          choice("b", "الْهَرَمُ"),
          choice("c", "الْكُرَةُ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l77_ex3_q1",
        mission: 3,
        visualSymbol: "⚽",
        visualLabel: "يتدحرج أم ينزلق",
        prompt: "أَيُّ مُجَسَّمٍ يَتَدَحْرَجُ بِسُهُولَةٍ؟",
        audioKey: "l77_ex3_q1",
        choices: [
          choice("a", "الْكُرَةُ"),
          choice("b", "الْمُكَعَّبُ"),
          choice("c", "مُتَوَازِي الْمُسْتَطِيلَاتِ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l77_ex3_q2",
        mission: 3,
        visualSymbol: "🧊",
        visualLabel: "يتدحرج أم ينزلق",
        prompt: "أَيُّ مُجَسَّمٍ يَنْزَلِقُ عَلَى وَجْهٍ مُسَطَّحٍ؟",
        audioKey: "l77_ex3_q2",
        choices: [
          choice("a", "الْكُرَةُ فَقَطْ"),
          choice("b", "لَا شَيْءَ"),
          choice("c", "الْمُكَعَّبُ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l77_ex3_q3",
        mission: 3,
        visualSymbol: "🥫",
        visualLabel: "يتدحرج أم ينزلق",
        prompt: "الْأُسْطُوَانَةُ يُمْكِنُ أَنْ...",
        audioKey: "l77_ex3_q3",
        choices: [
          choice("a", "تَطِيرَ"),
          choice("b", "تَتَدَحْرَجَ أَوْ تَنْزَلِقَ"),
          choice("c", "لَا تَتَحَرَّكَ أَبَدًا"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l77_ex3_q4",
        mission: 3,
        visualSymbol: "⚽",
        visualLabel: "يتدحرج أم ينزلق",
        prompt: "سَبَبُ تَدَحْرُجِ الْكُرَةِ هُوَ...",
        audioKey: "l77_ex3_q4",
        choices: [
          choice("a", "سَطْحُهَا الْمُنْحَنِي"),
          choice("b", "لَوْنُهَا"),
          choice("c", "حَجْمُهَا فَقَطْ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l77_ex4_q1",
        mission: 4,
        visualSymbol: "⚽",
        visualLabel: "تصنيف",
        prompt: "أَيُّ شَيْءٍ نُصَنِّفُهُ مَعَ الْكُرَةِ؟",
        audioKey: "l77_ex4_q1",
        choices: [
          choice("a", "عُلْبَةُ الْأَحْذِيَةِ"),
          choice("b", "مُكَعَّبُ اللَّعِبِ"),
          choice("c", "كُرَةُ الْقَدَمِ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l77_ex4_q2",
        mission: 4,
        visualSymbol: "🥫",
        visualLabel: "تصنيف",
        prompt: "أَيُّ شَيْءٍ نُصَنِّفُهُ مَعَ الْأُسْطُوَانَةِ؟",
        audioKey: "l77_ex4_q2",
        choices: [
          choice("a", "الْهَرَمُ"),
          choice("b", "عُلْبَةُ الْمَشْرُوبِ"),
          choice("c", "الْكُرَةُ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l77_ex4_q3",
        mission: 4,
        visualSymbol: "📦",
        visualLabel: "تصنيف",
        prompt: "أَيُّ شَيْءٍ نُصَنِّفُهُ مَعَ مُتَوَازِي الْمُسْتَطِيلَاتِ؟",
        audioKey: "l77_ex4_q3",
        choices: [
          choice("a", "عُلْبَةُ الْأَحْذِيَةِ"),
          choice("b", "الْكُرَةُ"),
          choice("c", "الْكُرَةُ الصَّغِيرَةُ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l77_ex4_q4",
        mission: 4,
        visualSymbol: "🧩",
        visualLabel: "تصنيف",
        prompt: "عِنْدَ التَّصْنِيفِ نَنْظُرُ إِلَى...",
        audioKey: "l77_ex4_q4",
        choices: [
          choice("a", "اسْمِ صَاحِبِهِ"),
          choice("b", "مَكَانِ شِرَائِهِ"),
          choice("c", "شَكْلِ الْمُجَسَّمِ وَخَصَائِصِهِ"),
        ],
        answer: "c",
        columns: 2,
      },
    ],
  },
  78: {
    lessonKey: "lesson78",
    audioBase: "/audio/teachers/khalil/lesson_78_addition_subtraction_2/exercises",
    missionTitles: {
      1: "أُمَثِّلُ الْجَمْعَ",
      2: "أَحْسُبُ الْجَمْعَ",
      3: "أُمَثِّلُ الطَّرْحَ",
      4: "أُرَتِّبُ النَّتَائِجَ",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُمَثِّلُ وَتَحْسُبُ الْجَمْعَ وَالطَّرْحَ.",
    nextPath: "/lesson-v2/79",
    questions: [
      {
        id: "l78_ex1_q1",
        mission: 1,

        visualSymbol: "➕",

        visualLabel:
          "أَضُمُّ مَجْمُوعَتَيْنِ",

        prompt:
          "عِنْدَمَا نَضُمُّ مَجْمُوعَتَيْنِ نَسْتَعْمِلُ...",

        audioKey:
          "l78_ex1_q1",

        choices: [
          choice("a", "الْجَمْعُ"),
          choice("b", "الطَّرْحُ"),
          choice("c", "التَّرْتِيبُ"),
          choice("d", "الْقِيَاسُ"),
        ],

        answer: "a",

        columns: 2,
      },

      {
        id: "l78_ex1_q2",
        mission: 1,

        visualSymbol:
          "🔵",

        visualLabel:
          "أَضُمُّ الْمَجْمُوعَتَيْنِ",

        prompt:
          "3 أَقْرَاصٍ مَعَ 4 أَقْرَاصٍ تُعْطِينَا...",

        audioKey:
          "l78_ex1_q2",

        smallNumberOperation: {
          mode: "add",

          left: 3,

          right: 4,

          correctValue:
            7,

          choices: [
            {
              id: "a",
              label: "6",
              value: 6,
            },
            {
              id: "b",
              label: "7",
              value: 7,
            },
            {
              id: "c",
              label: "8",
              value: 8,
            },
            {
              id: "d",
              label: "9",
              value: 9,
            },
          ],
        },
      },

      {
        id: "l78_ex1_q3",
        mission: 1,

        visualSymbol:
          "➕",

        visualLabel:
          "أَجْمَعُ بِالْأَقْرَاصِ",

        prompt:
          "5 زَائِدَ 2 يُسَاوِي...",

        audioKey:
          "l78_ex1_q3",

        smallNumberOperation: {
          mode: "add",

          left: 5,

          right: 2,

          correctValue:
            7,

          choices: [
            {
              id: "a",
              label: "6",
              value: 6,
            },
            {
              id: "b",
              label: "8",
              value: 8,
            },
            {
              id: "c",
              label: "7",
              value: 7,
            },
            {
              id: "d",
              label: "9",
              value: 9,
            },
          ],
        },
      },

      {
        id: "l78_ex1_q4",
        mission: 1,

        visualSymbol:
          "➕",

        visualLabel:
          "أَجْمَعُ بِالْأَقْرَاصِ",

        prompt:
          "6 زَائِدَ 3 يُسَاوِي...",

        audioKey:
          "l78_ex1_q4",

        smallNumberOperation: {
          mode: "add",

          left: 6,

          right: 3,

          correctValue:
            9,

          choices: [
            {
              id: "a",
              label: "8",
              value: 8,
            },
            {
              id: "b",
              label: "10",
              value: 10,
            },
            {
              id: "c",
              label: "7",
              value: 7,
            },
            {
              id: "d",
              label: "9",
              value: 9,
            },
          ],
        },
      },

      {
        id: "l78_ex2_q1",
        mission: 2,

        visualSymbol:
          "🧮",

        visualLabel:
          "أَجْمَعُ وَأَكْشِفُ النَّاتِجَ",

        prompt:
          "8 + 5 = ؟",

        audioKey:
          "l78_ex2_q1",

        smallNumberOperation: {
          mode: "add",

          left: 8,

          right: 5,

          correctValue:
            13,

          choices: [
            {
              id: "a",
              label: "12",
              value: 12,
            },
            {
              id: "b",
              label: "13",
              value: 13,
            },
            {
              id: "c",
              label: "14",
              value: 14,
            },
            {
              id: "d",
              label: "11",
              value: 11,
            },
          ],
        },
      },

      {
        id: "l78_ex2_q2",
        mission: 2,

        visualSymbol:
          "🧮",

        visualLabel:
          "أَجْمَعُ وَأَكْشِفُ النَّاتِجَ",

        prompt:
          "7 + 6 = ؟",

        audioKey:
          "l78_ex2_q2",

        smallNumberOperation: {
          mode: "add",

          left: 7,

          right: 6,

          correctValue:
            13,

          choices: [
            {
              id: "a",
              label: "13",
              value: 13,
            },
            {
              id: "b",
              label: "12",
              value: 12,
            },
            {
              id: "c",
              label: "14",
              value: 14,
            },
            {
              id: "d",
              label: "11",
              value: 11,
            },
          ],
        },
      },

      {
        id: "l78_ex2_q3",
        mission: 2,

        visualSymbol:
          "🧮",

        visualLabel:
          "أَجْمَعُ وَأَكْشِفُ النَّاتِجَ",

        prompt:
          "9 + 4 = ؟",

        audioKey:
          "l78_ex2_q3",

        smallNumberOperation: {
          mode: "add",

          left: 9,

          right: 4,

          correctValue:
            13,

          choices: [
            {
              id: "a",
              label: "14",
              value: 14,
            },
            {
              id: "b",
              label: "12",
              value: 12,
            },
            {
              id: "c",
              label: "13",
              value: 13,
            },
            {
              id: "d",
              label: "15",
              value: 15,
            },
          ],
        },
      },

      {
        id: "l78_ex2_q4",
        mission: 2,

        visualSymbol:
          "🧮",

        visualLabel:
          "أَجْمَعُ وَأَكْشِفُ النَّاتِجَ",

        prompt:
          "10 + 7 = ؟",

        audioKey:
          "l78_ex2_q4",

        smallNumberOperation: {
          mode: "add",

          left: 10,

          right: 7,

          correctValue:
            17,

          choices: [
            {
              id: "a",
              label: "16",
              value: 16,
            },
            {
              id: "b",
              label: "18",
              value: 18,
            },
            {
              id: "c",
              label: "17",
              value: 17,
            },
            {
              id: "d",
              label: "15",
              value: 15,
            },
          ],
        },
      },

      {
        id: "l78_ex3_q1",
        mission: 3,

        visualSymbol: "➖",

        visualLabel:
          "أُزِيلُ مِنَ الْمَجْمُوعَةِ",

        prompt:
          "عِنْدَمَا نُزِيلُ عَنَاصِرَ مِنْ مَجْمُوعَةٍ نَسْتَعْمِلُ...",

        audioKey:
          "l78_ex3_q1",

        choices: [
          choice("a", "الطَّرْحُ"),
          choice("b", "الْجَمْعُ"),
          choice("c", "التَّرْتِيبُ"),
          choice("d", "الْعَدُّ"),
        ],

        answer: "a",

        columns: 2,
      },

      {
        id: "l78_ex3_q2",
        mission: 3,

        visualSymbol:
          "➖",

        visualLabel:
          "أَشْطُبُ ثُمَّ أَعُدُّ الْبَاقِيَ",

        prompt:
          "9 - 3 = ؟",

        audioKey:
          "l78_ex3_q2",

        smallNumberOperation: {
          mode: "subtract",

          left: 9,

          right: 3,

          correctValue:
            6,

          choices: [
            {
              id: "a",
              label: "5",
              value: 5,
            },
            {
              id: "b",
              label: "6",
              value: 6,
            },
            {
              id: "c",
              label: "7",
              value: 7,
            },
            {
              id: "d",
              label: "4",
              value: 4,
            },
          ],
        },
      },

      {
        id: "l78_ex3_q3",
        mission: 3,

        visualSymbol:
          "➖",

        visualLabel:
          "أَشْطُبُ ثُمَّ أَعُدُّ الْبَاقِيَ",

        prompt:
          "12 - 5 = ؟",

        audioKey:
          "l78_ex3_q3",

        smallNumberOperation: {
          mode: "subtract",

          left: 12,

          right: 5,

          correctValue:
            7,

          choices: [
            {
              id: "a",
              label: "6",
              value: 6,
            },
            {
              id: "b",
              label: "8",
              value: 8,
            },
            {
              id: "c",
              label: "7",
              value: 7,
            },
            {
              id: "d",
              label: "5",
              value: 5,
            },
          ],
        },
      },

      {
        id: "l78_ex3_q4",
        mission: 3,

        visualSymbol:
          "➖",

        visualLabel:
          "أَشْطُبُ ثُمَّ أَعُدُّ الْبَاقِيَ",

        prompt:
          "15 - 4 = ؟",

        audioKey:
          "l78_ex3_q4",

        smallNumberOperation: {
          mode: "subtract",

          left: 15,

          right: 4,

          correctValue:
            11,

          choices: [
            {
              id: "a",
              label: "10",
              value: 10,
            },
            {
              id: "b",
              label: "12",
              value: 12,
            },
            {
              id: "c",
              label: "9",
              value: 9,
            },
            {
              id: "d",
              label: "11",
              value: 11,
            },
          ],
        },
      },

      {
        id: "l78_ex4_q1",
        mission: 4,

        visualSymbol: "↗️",

        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l78_ex4_q1",

        orderItems: [
          {
            id: "i3",
            label: "5 + 4",
          },
          {
            id: "i1",
            label: "2 + 3",
          },
          {
            id: "i4",
            label: "6 + 5",
          },
          {
            id: "i2",
            label: "4 + 3",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l78_ex4_q2",
        mission: 4,

        visualSymbol: "↗️",

        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l78_ex4_q2",

        orderItems: [
          {
            id: "i4",
            label: "12 - 3",
          },
          {
            id: "i2",
            label: "8 - 4",
          },
          {
            id: "i1",
            label: "7 - 5",
          },
          {
            id: "i3",
            label: "10 - 4",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l78_ex4_q3",
        mission: 4,

        visualSymbol: "↗️",

        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l78_ex4_q3",

        orderItems: [
          {
            id: "i3",
            label: "10 - 2",
          },
          {
            id: "i1",
            label: "8 - 5",
          },
          {
            id: "i4",
            label: "6 + 5",
          },
          {
            id: "i2",
            label: "2 + 4",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l78_ex4_q4",
        mission: 4,

        visualSymbol: "↗️",

        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l78_ex4_q4",

        orderItems: [
          {
            id: "i2",
            label: "4 + 3",
          },
          {
            id: "i4",
            label: "8 + 5",
          },
          {
            id: "i1",
            label: "9 - 7",
          },
          {
            id: "i3",
            label: "12 - 3",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

    ],
  },
  79: {
    lessonKey: "lesson79",
    audioBase: "/audio/teachers/taline/lesson_79_read_clock_1/exercises",
    missionTitles: {
      1: "أَتَعَرَّفُ إِلَى عَقْرَبَيِ السَّاعَةِ",
      2: "أَقْرَأُ سَاعَاتٍ كَامِلَةً",
      3: "أَرْبِطُ الْوَقْتَ بِالنَّشَاطِ",
      4: "أُرَتِّبُ الْأَوْقَاتَ",
    },
    completionMessage: "رَائِعٌ! أَصْبَحْتَ تَقْرَأُ السَّاعَاتِ الْكَامِلَةَ وَتَرْبِطُهَا بِأَنْشِطَتِكَ.",
    nextPath: "/lesson-v2/80",
    questions: [
      {
        id: "l79_ex1_q1",
        mission: 1,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "أَيُّ عَقْرَبٍ يُشِيرُ إِلَى السَّاعَاتِ؟",

        audioKey:
          "l79_ex1_q1",

        premiumClock: {
          mode:
            "identify",

          hour:
            4,

          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "الْعَقْرَبُ الطَّوِيلُ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "لَا أَحَدَ مِنْهُمَا",
            },
            {
              id: "c",
              icon: "🟡",
              label: "الْعَقْرَبُ الْقَصِيرُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex1_q2",
        mission: 1,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "أَيُّ عَقْرَبٍ يُسَاعِدُنَا عَلَى قِرَاءَةِ الدَّقَائِقِ؟",

        audioKey:
          "l79_ex1_q2",

        premiumClock: {
          mode:
            "identify",

          hour:
            4,

          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "إِطَارُ السَّاعَةِ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "الْعَقْرَبُ الطَّوِيلُ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "الْعَقْرَبُ الْقَصِيرُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex1_q3",
        mission: 1,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "فِي السَّاعَةِ الْكَامِلَةِ يَكُونُ عَقْرَبُ الدَّقَائِقِ عِنْدَ...",

        audioKey:
          "l79_ex1_q3",

        premiumClock: {
          mode:
            "identify",

          hour:
            4,

          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "12",
            },
            {
              id: "b",
              icon: "🔵",
              label: "6",
            },
            {
              id: "c",
              icon: "🟡",
              label: "3",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex1_q4",
        mission: 1,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "إِذَا كَانَ عَقْرَبُ الدَّقَائِقِ عِنْدَ 12 نَقْرَأُ...",

        audioKey:
          "l79_ex1_q4",

        premiumClock: {
          mode:
            "identify",

          hour:
            4,

          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "نِصْفَ سَاعَةٍ",
            },
            {
              id: "b",
              icon: "🕐",
              label: "رُبْعَ سَاعَةٍ",
            },
            {
              id: "c",
              icon: "🕐",
              label: "سَاعَةً كَامِلَةً",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex2_q1",
        mission: 2,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "الْعَقْرَبُ الْقَصِيرُ عَلَى 4 وَالطَّوِيلُ عَلَى 12. كَمِ السَّاعَةُ؟",

        audioKey:
          "l79_ex2_q1",

        premiumClock: {
          mode:
            "read",

          hour:
            4,

          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "3:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "4:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "5:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "7:00",
            },
          ],
        },
      },
      {
        id: "l79_ex2_q2",
        mission: 2,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "الْعَقْرَبُ الْقَصِيرُ عَلَى 7 وَالطَّوِيلُ عَلَى 12. كَمِ السَّاعَةُ؟",

        audioKey:
          "l79_ex2_q2",

        premiumClock: {
          mode:
            "read",

          hour:
            7,

          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "6:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "8:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "7:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "9:00",
            },
          ],
        },
      },
      {
        id: "l79_ex2_q3",
        mission: 2,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "الْعَقْرَبُ الْقَصِيرُ عَلَى 9 وَالطَّوِيلُ عَلَى 12. كَمِ السَّاعَةُ؟",

        audioKey:
          "l79_ex2_q3",

        premiumClock: {
          mode:
            "read",

          hour:
            9,

          correctId:
            "d",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "8:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "10:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "12:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "9:00",
            },
          ],
        },
      },
      {
        id: "l79_ex2_q4",
        mission: 2,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "الْعَقْرَبُ الْقَصِيرُ عَلَى 2 وَالطَّوِيلُ عَلَى 12. كَمِ السَّاعَةُ؟",

        audioKey:
          "l79_ex2_q4",

        premiumClock: {
          mode:
            "read",

          hour:
            2,

          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "2:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "3:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "12:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "1:00",
            },
          ],
        },
      },
      {
        id: "l79_ex3_q1",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ وَقْتٍ يُنَاسِبُ الِاسْتِيقَاظَ لِلْمَدْرَسَةِ؟",

        audioKey:
          "l79_ex3_q1",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "🌅",
              label: "السَّابِعَةُ صَبَاحًا",
            },
            {
              id: "b",
              icon: "🌙",
              label: "الْوَاحِدَةُ لَيْلًا",
            },
            {
              id: "c",
              icon: "🌙",
              label: "مُنْتَصَفُ اللَّيْلِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex3_q2",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "أَيُّ وَقْتٍ يُنَاسِبُ النَّوْمَ؟",

        audioKey:
          "l79_ex3_q2",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🌅",
              label: "وَقْتُ الدِّرَاسَةِ صَبَاحًا",
            },
            {
              id: "b",
              icon: "🔵",
              label: "أَثْنَاءُ الْحِصَّةِ",
            },
            {
              id: "c",
              icon: "🌙",
              label: "اللَّيْلُ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex3_q3",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "السَّاعَةُ تُسَاعِدُنَا عَلَى...",

        audioKey:
          "l79_ex3_q3",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "قِيَاسِ الطُّولِ",
            },
            {
              id: "b",
              icon: "⏰",
              label: "تَنْظِيمِ مَوَاعِيدِنَا",
            },
            {
              id: "c",
              icon: "🟡",
              label: "مَعْرِفَةِ الْأَلْوَانِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex3_q4",
        mission: 3,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "لِلدِّرَاسَةِ وَاللَّعِبِ وَالرَّاحَةِ...",

        audioKey:
          "l79_ex3_q4",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "أَوْقَاتٌ مُخْتَلِفَةٌ",
            },
            {
              id: "b",
              icon: "🕐",
              label: "وَقْتٌ وَاحِدٌ دَائِمًا",
            },
            {
              id: "c",
              icon: "🕐",
              label: "لَا وَقْتَ لَهَا",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l79_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "أُرَتِّبُ السَّاعَاتِ",
        prompt: "رَتِّبِ الْأَوْقَاتَ مِنَ الْأَبْكَرِ إِلَى الْمُتَأَخِّرِ.",
        audioKey: "l79_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🕑", label: "14:00" },
            { id: "i1", icon: "🕖", label: "07:00" },
            { id: "i4", icon: "🕗", label: "20:00" },
            { id: "i2", icon: "🕘", label: "09:00" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l79_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مِنَ الصَّبَاحِ إِلَى الْمَسَاءِ",
        prompt: "رَتِّبِ السَّاعَاتِ مِنَ الصَّبَاحِ إِلَى الْمَسَاءِ.",
        audioKey: "l79_ex4_q2",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🕖", label: "19:00" },
            { id: "i2", icon: "🕙", label: "10:00" },
            { id: "i1", icon: "🕕", label: "06:00" },
            { id: "i3", icon: "🕒", label: "15:00" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l79_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "السَّاعَةُ وَالنَّشَاطُ",
        prompt: "رَتِّبْ أَوْقَاتَ هَذِهِ الْأَنْشِطَةِ.",
        audioKey: "l79_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "⚽", label: "17:00 — اللَّعِبُ" },
            { id: "i1", icon: "🏫", label: "08:00 — الْمَدْرَسَةُ" },
            { id: "i4", icon: "🌙", label: "21:00 — النَّوْمُ" },
            { id: "i2", icon: "🍲", label: "12:00 — الْغَدَاءُ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l79_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "سَاعَاتُ يَوْمِ الْعُطْلَةِ",
        prompt: "رَتِّبْ أَوْقَاتِ يَوْمِ الْعُطْلَةِ.",
        audioKey: "l79_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i2", icon: "🌳", label: "11:00 — نُزْهَةٌ" },
            { id: "i4", icon: "🌙", label: "22:00 — النَّوْمُ" },
            { id: "i1", icon: "🥣", label: "09:00 — الْفُطُورُ" },
            { id: "i3", icon: "🧩", label: "16:00 — اللَّعِبُ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
  94: {
  "lessonKey": "lesson94",
  "audioBase": "/audio/teachers/khalil/lesson_94_reading_clock_2/exercises",
  "missionTitles": {
    "1": "أَقْرَأُ السَّاعَةَ",
    "2": "أَكْتُبُ التَّوْقِيتَ بَعْدَ مُنْتَصَفِ النَّهَارِ",
    "3": "أُمَيِّزُ أَوْقَاتَ الْيَوْمِ",
    "4": "أَرْبِطُ السَّاعَةَ بِالتَّوْقِيتِ"
  },
  "completionMessage": "أَحْسَنْتَ! أَصْبَحْتَ تَقْرَأُ السَّاعَةَ وَتَكْتُبُ التَّوْقِيتَ قَبْلَ مُنْتَصَفِ النَّهَارِ وَبَعْدَهُ.",
  "nextPath": "/lesson-v2/95",
  "questions": [
    {
      "id": "l94_ex1_q1",
      "mission": 1,
      "visualSymbol": "🕗",
      "visualLabel": "اِقْرَأِ السَّاعَةَ",
      "prompt": "كَمِ السَّاعَةُ؟",
      "audioKey": "l94_ex1_q1",
      "premiumClock": {
        "mode": "identify",
        "hour": 8,
        "correctId": "b",
        "options": [
          {
            "id": "a",
            "icon": "🕕",
            "label": "06:00"
          },
          {
            "id": "b",
            "icon": "🕗",
            "label": "08:00"
          },
          {
            "id": "c",
            "icon": "🕙",
            "label": "10:00"
          },
          {
            "id": "d",
            "icon": "🕛",
            "label": "12:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex1_q2",
      "mission": 1,
      "visualSymbol": "🕙",
      "visualLabel": "اِقْرَأِ السَّاعَةَ",
      "prompt": "كَمِ السَّاعَةُ؟",
      "audioKey": "l94_ex1_q2",
      "premiumClock": {
        "mode": "identify",
        "hour": 10,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕖",
            "label": "07:00"
          },
          {
            "id": "b",
            "icon": "🕘",
            "label": "09:00"
          },
          {
            "id": "c",
            "icon": "🕙",
            "label": "10:00"
          },
          {
            "id": "d",
            "icon": "🕚",
            "label": "11:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex1_q3",
      "mission": 1,
      "visualSymbol": "🕕",
      "visualLabel": "اِقْرَأِ السَّاعَةَ",
      "prompt": "كَمِ السَّاعَةُ؟",
      "audioKey": "l94_ex1_q3",
      "premiumClock": {
        "mode": "identify",
        "hour": 6,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕒",
            "label": "03:00"
          },
          {
            "id": "b",
            "icon": "🕔",
            "label": "05:00"
          },
          {
            "id": "c",
            "icon": "🕕",
            "label": "06:00"
          },
          {
            "id": "d",
            "icon": "🕗",
            "label": "08:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex1_q4",
      "mission": 1,
      "visualSymbol": "🕚",
      "visualLabel": "اِقْرَأِ السَّاعَةَ",
      "prompt": "كَمِ السَّاعَةُ؟",
      "audioKey": "l94_ex1_q4",
      "premiumClock": {
        "mode": "identify",
        "hour": 11,
        "correctId": "d",
        "options": [
          {
            "id": "a",
            "icon": "🕗",
            "label": "08:00"
          },
          {
            "id": "b",
            "icon": "🕘",
            "label": "09:00"
          },
          {
            "id": "c",
            "icon": "🕙",
            "label": "10:00"
          },
          {
            "id": "d",
            "icon": "🕚",
            "label": "11:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex2_q1",
      "mission": 2,
      "visualSymbol": "🕐",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex2_q1",
      "premiumClock": {
        "mode": "identify",
        "hour": 1,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕐",
            "label": "01:00"
          },
          {
            "id": "b",
            "icon": "🕚",
            "label": "11:00"
          },
          {
            "id": "c",
            "icon": "🕐",
            "label": "13:00"
          },
          {
            "id": "d",
            "icon": "🕘",
            "label": "21:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex2_q2",
      "mission": 2,
      "visualSymbol": "🕒",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex2_q2",
      "premiumClock": {
        "mode": "identify",
        "hour": 3,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕒",
            "label": "03:00"
          },
          {
            "id": "b",
            "icon": "🕐",
            "label": "13:00"
          },
          {
            "id": "c",
            "icon": "🕒",
            "label": "15:00"
          },
          {
            "id": "d",
            "icon": "🕚",
            "label": "23:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex2_q3",
      "mission": 2,
      "visualSymbol": "🕔",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex2_q3",
      "premiumClock": {
        "mode": "identify",
        "hour": 5,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕔",
            "label": "05:00"
          },
          {
            "id": "b",
            "icon": "🕒",
            "label": "15:00"
          },
          {
            "id": "c",
            "icon": "🕔",
            "label": "17:00"
          },
          {
            "id": "d",
            "icon": "🕘",
            "label": "21:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex2_q4",
      "mission": 2,
      "visualSymbol": "🕚",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex2_q4",
      "premiumClock": {
        "mode": "identify",
        "hour": 11,
        "correctId": "d",
        "options": [
          {
            "id": "a",
            "icon": "🕚",
            "label": "11:00"
          },
          {
            "id": "b",
            "icon": "🕘",
            "label": "21:00"
          },
          {
            "id": "c",
            "icon": "🕙",
            "label": "22:00"
          },
          {
            "id": "d",
            "icon": "🕚",
            "label": "23:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex3_q1",
      "mission": 3,
      "visualSymbol": "🕗",
      "visualLabel": "08:00",
      "prompt": "التَّوْقِيتُ 08:00. هَلْ هُوَ قَبْلَ مُنْتَصَفِ النَّهَارِ أَمْ بَعْدَهُ؟",
      "audioKey": "l94_ex3_q1",
      "premiumClock": {
        "mode": "identify",
        "hour": 8,
        "correctId": "a",
        "options": [
          {
            "id": "a",
            "icon": "🌅",
            "label": "قَبْلَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "b",
            "icon": "🌇",
            "label": "بَعْدَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "c",
            "icon": "☀️",
            "label": "مُنْتَصَفُ النَّهَارِ"
          },
          {
            "id": "d",
            "icon": "🌙",
            "label": "مُنْتَصَفُ اللَّيْلِ"
          }
        ]
      }
    },
    {
      "id": "l94_ex3_q2",
      "mission": 3,
      "visualSymbol": "🕚",
      "visualLabel": "11:00",
      "prompt": "التَّوْقِيتُ 11:00. هَلْ هُوَ قَبْلَ مُنْتَصَفِ النَّهَارِ أَمْ بَعْدَهُ؟",
      "audioKey": "l94_ex3_q2",
      "premiumClock": {
        "mode": "identify",
        "hour": 11,
        "correctId": "a",
        "options": [
          {
            "id": "a",
            "icon": "🌅",
            "label": "قَبْلَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "b",
            "icon": "🌇",
            "label": "بَعْدَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "c",
            "icon": "☀️",
            "label": "مُنْتَصَفُ النَّهَارِ"
          },
          {
            "id": "d",
            "icon": "🌙",
            "label": "مُنْتَصَفُ اللَّيْلِ"
          }
        ]
      }
    },
    {
      "id": "l94_ex3_q3",
      "mission": 3,
      "visualSymbol": "🕒",
      "visualLabel": "15:00",
      "prompt": "التَّوْقِيتُ 15:00. هَلْ هُوَ قَبْلَ مُنْتَصَفِ النَّهَارِ أَمْ بَعْدَهُ؟",
      "audioKey": "l94_ex3_q3",
      "premiumClock": {
        "mode": "identify",
        "hour": 3,
        "correctId": "b",
        "options": [
          {
            "id": "a",
            "icon": "🌅",
            "label": "قَبْلَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "b",
            "icon": "🌇",
            "label": "بَعْدَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "c",
            "icon": "☀️",
            "label": "مُنْتَصَفُ النَّهَارِ"
          },
          {
            "id": "d",
            "icon": "🌙",
            "label": "مُنْتَصَفُ اللَّيْلِ"
          }
        ]
      }
    },
    {
      "id": "l94_ex3_q4",
      "mission": 3,
      "visualSymbol": "🕚",
      "visualLabel": "23:00",
      "prompt": "التَّوْقِيتُ 23:00. هَلْ هُوَ قَبْلَ مُنْتَصَفِ النَّهَارِ أَمْ بَعْدَهُ؟",
      "audioKey": "l94_ex3_q4",
      "premiumClock": {
        "mode": "identify",
        "hour": 11,
        "correctId": "b",
        "options": [
          {
            "id": "a",
            "icon": "🌅",
            "label": "قَبْلَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "b",
            "icon": "🌇",
            "label": "بَعْدَ مُنْتَصَفِ النَّهَارِ"
          },
          {
            "id": "c",
            "icon": "☀️",
            "label": "مُنْتَصَفُ النَّهَارِ"
          },
          {
            "id": "d",
            "icon": "🌙",
            "label": "مُنْتَصَفُ اللَّيْلِ"
          }
        ]
      }
    },
    {
      "id": "l94_ex4_q1",
      "mission": 4,
      "visualSymbol": "🕗",
      "visualLabel": "صَبَاحًا",
      "prompt": "السَّاعَةُ الثَّامِنَةُ صَبَاحًا، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex4_q1",
      "premiumClock": {
        "mode": "identify",
        "hour": 8,
        "correctId": "b",
        "options": [
          {
            "id": "a",
            "icon": "🕕",
            "label": "06:00"
          },
          {
            "id": "b",
            "icon": "🕗",
            "label": "08:00"
          },
          {
            "id": "c",
            "icon": "🕕",
            "label": "18:00"
          },
          {
            "id": "d",
            "icon": "🕗",
            "label": "20:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex4_q2",
      "mission": 4,
      "visualSymbol": "🕐",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "السَّاعَةُ الْوَاحِدَةُ بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex4_q2",
      "premiumClock": {
        "mode": "identify",
        "hour": 1,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕐",
            "label": "01:00"
          },
          {
            "id": "b",
            "icon": "🕚",
            "label": "11:00"
          },
          {
            "id": "c",
            "icon": "🕐",
            "label": "13:00"
          },
          {
            "id": "d",
            "icon": "🕘",
            "label": "21:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex4_q3",
      "mission": 4,
      "visualSymbol": "🕔",
      "visualLabel": "بَعْدَ مُنْتَصَفِ النَّهَارِ",
      "prompt": "السَّاعَةُ الْخَامِسَةُ بَعْدَ مُنْتَصَفِ النَّهَارِ، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex4_q3",
      "premiumClock": {
        "mode": "identify",
        "hour": 5,
        "correctId": "c",
        "options": [
          {
            "id": "a",
            "icon": "🕔",
            "label": "05:00"
          },
          {
            "id": "b",
            "icon": "🕒",
            "label": "15:00"
          },
          {
            "id": "c",
            "icon": "🕔",
            "label": "17:00"
          },
          {
            "id": "d",
            "icon": "🕖",
            "label": "19:00"
          }
        ]
      }
    },
    {
      "id": "l94_ex4_q4",
      "mission": 4,
      "visualSymbol": "🕚",
      "visualLabel": "لَيْلًا",
      "prompt": "السَّاعَةُ الْحَادِيَةَ عَشْرَةَ لَيْلًا، مَا التَّوْقِيتُ الصَّحِيحُ؟",
      "audioKey": "l94_ex4_q4",
      "premiumClock": {
        "mode": "identify",
        "hour": 11,
        "correctId": "d",
        "options": [
          {
            "id": "a",
            "icon": "🕚",
            "label": "11:00"
          },
          {
            "id": "b",
            "icon": "🕘",
            "label": "21:00"
          },
          {
            "id": "c",
            "icon": "🕙",
            "label": "22:00"
          },
          {
            "id": "d",
            "icon": "🕚",
            "label": "23:00"
          }
        ]
      }
    }
  ]
},
  80: {
    lessonKey: "lesson80",
    audioBase: "/audio/teachers/taline/lesson_80_organize_time/exercises",
    missionTitles: {
      1: "أَخْتَارُ الْوَقْتَ الْمُنَاسِبَ",
      2: "أُنَظِّمُ أَنْشِطَتِي",
      3: "أُوَازِنُ بَيْنَ أَنْشِطَتِي",
      4: "أُرَتِّبُ يَوْمِي",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُنَظِّمُ وَقْتَكَ بَيْنَ الدِّرَاسَةِ وَاللَّعِبِ وَالرَّاحَةِ.",
    nextPath: "/lesson-v2/81",
    questions: [
      {
        id: "l80_ex1_q1",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "مَا الَّذِي يُسَاعِدُنَا عَلَى إِنْجَازِ أَعْمَالِنَا؟",

        audioKey:
          "l80_ex1_q1",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "تَضْيِيعُ الْوَقْتِ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "تَرْكُ كُلِّ الْأَعْمَالِ",
            },
            {
              id: "c",
              icon: "🧰",
              label: "تَنْظِيمُ الْوَقْتِ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l80_ex1_q2",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "فِي وَقْتِ الدِّرَاسَةِ مِنَ الْأَفْضَلِ أَنْ...",

        audioKey:
          "l80_ex1_q2",

        premiumIconChoice: {
          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "📘",
              label: "نَتْرُكَ الْوَاجِبَ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "نَدْرُسَ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "نَنَامَ دَائِمًا",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l80_ex1_q3",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "فِي وَقْتِ الرَّاحَةِ مِنَ الْمُنَاسِبِ أَنْ...",

        audioKey:
          "l80_ex1_q3",

        premiumIconChoice: {
          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "نَسْتَرِيحَ",
            },
            {
              id: "b",
              icon: "🌙",
              label: "نُهْمِلَ النَّوْمَ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "نَعْمَلَ دُونَ تَوَقُّفٍ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l80_ex1_q4",
        mission: 1,

        visualSymbol: "✨",

        visualLabel:
          "أَخْتَارُ بِالصُّورَةِ",

        prompt:
          "بَعْدَ اسْتِعْمَالِ الْأَدَوَاتِ نُعِيدُهَا إِلَى...",

        audioKey:
          "l80_ex1_q4",

        premiumIconChoice: {
          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "أَيِّ مَكَانٍ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "خَارِجَ الْبَيْتِ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "مَكَانِهَا",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l80_ex2_q1",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَخْتَارُ خُطَّةً مُنَظَّمَةً",
        prompt: "أَيُّ خُطَّةٍ تُمَثِّلُ يَوْمًا مُنَظَّمًا؟",
        audioKey: "l80_ex2_q1",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "📚⚽", label: "دِرَاسَةٌ وَرَاحَةٌ وَلَعِبٌ" },
            { id: "b", icon: "🎮", label: "لَعِبٌ فَقَطْ" },
            { id: "c", icon: "📚", label: "دِرَاسَةٌ بِلَا رَاحَةٍ" },
            { id: "d", icon: "🛌", label: "نَوْمٌ طَوَالَ النَّهَارِ" },
          ],
        },
      },
      {
        id: "l80_ex2_q2",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أُنَظِّمُ أَدَوَاتِي",
        prompt: "بَعْدَ اسْتِعْمَالِ الْأَدَوَاتِ، أَيْنَ نَضَعُهَا؟",
        audioKey: "l80_ex2_q2",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🪑", label: "عَلَى الْكُرْسِيِّ" },
            { id: "b", icon: "🚪", label: "قُرْبَ الْبَابِ" },
            { id: "c", icon: "🧰", label: "فِي مَكَانِهَا" },
            { id: "d", icon: "🛏️", label: "فَوْقَ السَّرِيرِ" },
          ],
        },
      },
      {
        id: "l80_ex2_q3",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أُخَطِّطُ لِمَا بَعْدَ الْمَدْرَسَةِ",
        prompt: "أَيُّ خُطَّةٍ أَفْضَلُ بَعْدَ الْمَدْرَسَةِ؟",
        audioKey: "l80_ex2_q3",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "🎮", label: "لَعِبٌ ثُمَّ نِسْيَانُ الْوَاجِبِ" },
            { id: "b", icon: "🛋️📚⚽", label: "رَاحَةٌ قَصِيرَةٌ ثُمَّ وَاجِبٌ ثُمَّ لَعِبٌ" },
            { id: "c", icon: "🛌", label: "نَوْمٌ حَتَّى الْمَسَاءِ" },
            { id: "d", icon: "📺", label: "مُشَاهَدَةٌ طَوِيلَةٌ" },
          ],
        },
      },
      {
        id: "l80_ex2_q4",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أُوَازِنُ يَوْمِي",
        prompt: "أَيُّ نَشَاطٍ نَحْتَاجُ إِلَيْهِ كُلَّ يَوْمٍ لِنَسْتَعِيدَ نَشَاطَنَا؟",
        audioKey: "l80_ex2_q4",
        premiumIconChoice: {
          correctId: "d",
          options: [
            { id: "a", icon: "🎮", label: "اللَّعِبُ الْإِلِكْتُرُونِيُّ" },
            { id: "b", icon: "🛍️", label: "التَّسَوُّقُ" },
            { id: "c", icon: "🎨", label: "الرَّسْمُ" },
            { id: "d", icon: "😴", label: "النَّوْمُ وَالرَّاحَةُ" },
          ],
        },
      },
      {
        id: "l80_ex3_q1",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "يَوْمِي الْمُتَوَازِنُ",
        prompt: "اخْتَرِ الْيَوْمَ الْمُتَوَازِنَ.",
        audioKey: "l80_ex3_q1",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🎮", label: "لَعِبٌ طَوَالَ الْيَوْمِ" },
            { id: "b", icon: "📚", label: "دِرَاسَةٌ دُونَ رَاحَةٍ" },
            { id: "c", icon: "📚⚽😴", label: "دِرَاسَةٌ وَلَعِبٌ وَرَاحَةٌ" },
            { id: "d", icon: "🛌", label: "نَوْمٌ مُعْظَمَ الْيَوْمِ" },
          ],
        },
      },
      {
        id: "l80_ex3_q2",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أَكْتَشِفُ الْخَطَأَ",
        prompt: "أَيْنَ الْخَطَأُ فِي خُطَّةٍ فِيهَا لَعِبٌ طَوَالَ الْيَوْمِ؟",
        audioKey: "l80_ex3_q2",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "📚", label: "لَا وَقْتَ لِلدِّرَاسَةِ" },
            { id: "b", icon: "🍎", label: "فِيهَا فَاكِهَةٌ" },
            { id: "c", icon: "🧼", label: "فِيهَا نَظَافَةٌ" },
            { id: "d", icon: "🎒", label: "فِيهَا حَقِيبَةٌ" },
          ],
        },
      },
      {
        id: "l80_ex3_q3",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أَفْهَمُ فَائِدَةَ الرَّاحَةِ",
        prompt: "لِمَاذَا نَضَعُ وَقْتًا لِلرَّاحَةِ بَيْنَ الْأَعْمَالِ؟",
        audioKey: "l80_ex3_q3",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "⏳", label: "لِنُضَيِّعَ الْوَقْتَ" },
            { id: "b", icon: "⚡", label: "لِنَسْتَعِيدَ نَشَاطَنَا" },
            { id: "c", icon: "❌", label: "لِنَتْرُكَ الْوَاجِبَ" },
            { id: "d", icon: "🌙", label: "لِنَنَامَ طَوَالَ النَّهَارِ" },
          ],
        },
      },
      {
        id: "l80_ex3_q4",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أَبْنِي خُطَّةَ يَوْمِي",
        prompt: "أَيُّ خُطَّةٍ تَحْفَظُ وَقْتَ الدِّرَاسَةِ وَاللَّعِبِ وَالنَّوْمِ؟",
        audioKey: "l80_ex3_q4",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "📚⚽🌙", label: "لِكُلِّ نَشَاطٍ وَقْتٌ" },
            { id: "b", icon: "🎮", label: "اللَّعِبُ فَقَطْ" },
            { id: "c", icon: "📚", label: "الدِّرَاسَةُ فَقَطْ" },
            { id: "d", icon: "🌙", label: "النَّوْمُ فَقَطْ" },
          ],
        },
      },
      {
        id: "l80_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "خُطَّةُ مَا بَعْدَ الْمَدْرَسَةِ",
        prompt: "رَتِّبْ خُطَّةَ مَا بَعْدَ الْمَدْرَسَةِ.",
        audioKey: "l80_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "📚", label: "إِنْجَازُ الْوَاجِبِ" },
            { id: "i1", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i4", icon: "⚽", label: "اللَّعِبُ" },
            { id: "i2", icon: "🛋️", label: "رَاحَةٌ قَصِيرَةٌ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l80_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "رُوتِينُ النَّوْمِ",
        prompt: "رَتِّبْ خُطُوَاتِ الِاسْتِعْدَادِ لِلنَّوْمِ.",
        audioKey: "l80_ex4_q2",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "👕", label: "ارْتِدَاءُ مَلَابِسِ النَّوْمِ" },
            { id: "i1", icon: "🎒", label: "تَجْهِيزُ حَقِيبَةِ الْغَدِ" },
            { id: "i4", icon: "🌙", label: "النَّوْمُ" },
            { id: "i2", icon: "🪥", label: "تَنْظِيفُ الْأَسْنَانِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l80_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "صَبَاحٌ مُنَظَّمٌ",
        prompt: "رَتِّبْ صَبَاحَ يَوْمِ الْعُطْلَةِ.",
        audioKey: "l80_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🌳", label: "نُزْهَةٌ عَائِلِيَّةٌ" },
            { id: "i2", icon: "🥣", label: "تَنَاوُلُ الْفُطُورِ" },
            { id: "i1", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "i3", icon: "🧹", label: "تَرْتِيبُ الْغُرْفَةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l80_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مَهَمَّةٌ مُنَظَّمَةٌ",
        prompt: "رَتِّبْ خُطُوَاتِ إِنْجَازِ الْوَاجِبِ.",
        audioKey: "l80_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i2", icon: "✏️", label: "حَلُّ الْوَاجِبِ" },
            { id: "i4", icon: "🧰", label: "إِعَادَةُ الْأَدَوَاتِ" },
            { id: "i1", icon: "📚", label: "تَجْهِيزُ الْمَكْتَبِ" },
            { id: "i3", icon: "✅", label: "مُرَاجَعَةُ الْإِجَابَاتِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
  81: {
    lessonKey: "lesson81",

    audioBase:
      "/audio/teachers/khalil/lesson_81_mental_calculation_1/exercises",

    missionTitles: {
      1: "أَعُدُّ بِالْعَشَرَاتِ",
      2: "أُفَكِّكُ وَأُرَكِّبُ ذِهْنِيًّا",
      3: "أَحْسُبُ بِسُرْعَةٍ",
      4: "أُرَتِّبُ الْعَشَرَاتِ وَالنَّتَائِجَ",
    },

    completionMessage:
      "أَحْسَنْتَ! أَصْبَحْتَ تَسْتَعْمِلُ الْعَشَرَاتِ وَتَفْكِيكَ الْأَعْدَادِ لِتَحْسُبَ ذِهْنِيًّا.",

    nextPath:
      "/lesson-v2/82",

    questions: [
      {
        id: "l81_ex1_q1",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أَعُدُّ بِالْعَشَرَاتِ",

        prompt:
          "مَا الْعَشْرَةُ الَّتِي تَأْتِي بَعْدَ 20؟",

        audioKey:
          "l81_ex1_q1",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            10,
            20,
            null,
            40,
          ],

          correctValue: 30,

          choices: [
            {
              id: "a",
              label: "10",
              value: 10,
            },
            {
              id: "b",
              label: "30",
              value: 30,
            },
            {
              id: "c",
              label: "21",
              value: 21,
            },
            {
              id: "d",
              label: "40",
              value: 40,
            },
          ],
        },
      },

      {
        id: "l81_ex1_q2",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أَعُدُّ بِالْعَشَرَاتِ",

        prompt:
          "مَا الْعَشْرَةُ الَّتِي تَأْتِي بَعْدَ 40؟",

        audioKey:
          "l81_ex1_q2",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            30,
            40,
            null,
            60,
          ],

          correctValue: 50,

          choices: [
            {
              id: "a",
              label: "30",
              value: 30,
            },
            {
              id: "b",
              label: "41",
              value: 41,
            },
            {
              id: "c",
              label: "50",
              value: 50,
            },
            {
              id: "d",
              label: "60",
              value: 60,
            },
          ],
        },
      },

      {
        id: "l81_ex1_q3",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أُكْمِلُ نَمَطَ الْعَشَرَاتِ",

        prompt:
          "أَكْمِلْ: 30، 40، 50، ...",

        audioKey:
          "l81_ex1_q3",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            30,
            40,
            50,
            null,
          ],

          correctValue: 60,

          choices: [
            {
              id: "a",
              label: "51",
              value: 51,
            },
            {
              id: "b",
              label: "60",
              value: 60,
            },
            {
              id: "c",
              label: "70",
              value: 70,
            },
            {
              id: "d",
              label: "40",
              value: 40,
            },
          ],
        },
      },

      {
        id: "l81_ex1_q4",
        mission: 1,

        visualSymbol: "🔟",
        visualLabel:
          "أُكْمِلُ نَمَطَ الْعَشَرَاتِ",

        prompt:
          "أَكْمِلْ: 50، 60، 70، ...",

        audioKey:
          "l81_ex1_q4",

        revealNumberChoice: {
          mode: "sequence",

          sequence: [
            50,
            60,
            70,
            null,
          ],

          correctValue: 80,

          choices: [
            {
              id: "a",
              label: "71",
              value: 71,
            },
            {
              id: "b",
              label: "80",
              value: 80,
            },
            {
              id: "c",
              label: "90",
              value: 90,
            },
            {
              id: "d",
              label: "60",
              value: 60,
            },
          ],
        },
      },

      {
        id: "l81_ex2_q1",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "فَكِّكِ الْعَدَدَ 47.",

        numberLab: {
          mode: "numberBreakdown",
          number: 47,
        },

        audioKey:
          "l81_ex2_q1",

        choices: [
          choice("a", "40 + 7"),
          choice("b", "40 + 4"),
          choice("c", "70 + 4"),
          choice("d", "30 + 7"),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l81_ex2_q2",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُفَكِّكُ الْعَدَدَ",

        prompt:
          "فَكِّكِ الْعَدَدَ 63.",

        numberLab: {
          mode: "numberBreakdown",
          number: 63,
        },

        audioKey:
          "l81_ex2_q2",

        choices: [
          choice("a", "60 + 3"),
          choice("b", "60 + 6"),
          choice("c", "30 + 6"),
          choice("d", "50 + 3"),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l81_ex2_q3",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُرَكِّبُ الْعَدَدَ",

        prompt:
          "50 زَائِدَ 6 يُسَاوِي كَمْ؟",

        numberLab: {
          mode: "expanded",
          number: 56,
        },

        audioKey:
          "l81_ex2_q3",

        choices: [
          choice("a", "56"),
          choice("b", "65"),
          choice("c", "55"),
          choice("d", "46"),
        ],

        answer: "a",
        columns: 2,
      },

      {
        id: "l81_ex2_q4",
        mission: 2,

        visualSymbol: "🧮",
        visualLabel:
          "أُرَكِّبُ الْعَدَدَ",

        prompt:
          "30 زَائِدَ 9 يُسَاوِي كَمْ؟",

        numberLab: {
          mode: "expanded",
          number: 39,
        },

        audioKey:
          "l81_ex2_q4",

        choices: [
          choice("a", "39"),
          choice("b", "93"),
          choice("c", "30"),
          choice("d", "49"),
        ],

        answer: "a",
        columns: 2,
      },


      {
        id: "l81_ex3_q1",
        mission: 3,

        visualSymbol: "⚡",
        visualLabel:
          "أَجْمَعُ الْعَشَرَاتِ ذِهْنِيًّا",

        prompt:
          "20 زَائِدَ 30 يُسَاوِي كَمْ؟",

        mentalOperation: {
          left: 20,
          operator: "+",
          right: 30,
        },

        audioKey:
          "l81_ex3_q1",

        choices: [
          choice("a", "40"),
          choice("b", "50"),
          choice("c", "60"),
          choice("d", "30"),
        ],

        answer: "b",
        columns: 2,
      },

      {
        id: "l81_ex3_q2",
        mission: 3,

        visualSymbol: "⚡",
        visualLabel:
          "أَجْمَعُ الْعَشَرَاتِ ذِهْنِيًّا",

        prompt:
          "40 زَائِدَ 20 يُسَاوِي كَمْ؟",

        mentalOperation: {
          left: 40,
          operator: "+",
          right: 20,
        },

        audioKey:
          "l81_ex3_q2",

        choices: [
          choice("a", "50"),
          choice("b", "60"),
          choice("c", "70"),
          choice("d", "20"),
        ],

        answer: "b",
        columns: 2,
      },

      {
        id: "l81_ex3_q3",
        mission: 3,

        visualSymbol: "⚡",
        visualLabel:
          "أَطْرَحُ الْعَشَرَاتِ ذِهْنِيًّا",

        prompt:
          "70 نَاقِصَ 20 يُسَاوِي كَمْ؟",

        mentalOperation: {
          left: 70,
          operator: "-",
          right: 20,
        },

        audioKey:
          "l81_ex3_q3",

        choices: [
          choice("a", "40"),
          choice("b", "50"),
          choice("c", "60"),
          choice("d", "90"),
        ],

        answer: "b",
        columns: 2,
      },

      {
        id: "l81_ex3_q4",
        mission: 3,

        visualSymbol: "⚡",
        visualLabel:
          "أَطْرَحُ الْعَشَرَاتِ ذِهْنِيًّا",

        prompt:
          "60 نَاقِصَ 30 يُسَاوِي كَمْ؟",

        mentalOperation: {
          left: 60,
          operator: "-",
          right: 30,
        },

        audioKey:
          "l81_ex3_q4",

        choices: [
          choice("a", "20"),
          choice("b", "30"),
          choice("c", "40"),
          choice("d", "90"),
        ],

        answer: "b",
        columns: 2,
      },


      {
        id: "l81_ex4_q1",
        mission: 4,

        visualSymbol: "↗️",
        visualLabel:
          "مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ",

        prompt:
          "رَتِّبِ الْعَشَرَاتِ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l81_ex4_q1",

        orderItems: [
          { id: "i4", label: "50" },
          { id: "i1", label: "20" },
          { id: "i3", label: "40" },
          { id: "i2", label: "30" },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l81_ex4_q2",
        mission: 4,

        visualSymbol: "↘️",
        visualLabel:
          "مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ",

        prompt:
          "رَتِّبِ الْعَشَرَاتِ مِنَ الْأَكْبَرِ إِلَى الْأَصْغَرِ.",

        audioKey:
          "l81_ex4_q2",

        orderItems: [
          { id: "i1", label: "60" },
          { id: "i4", label: "30" },
          { id: "i2", label: "50" },
          { id: "i3", label: "40" },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l81_ex4_q3",
        mission: 4,

        visualSymbol: "🧠",
        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "رَتِّبِ النَّتَائِجَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",

        audioKey:
          "l81_ex4_q3",

        orderItems: [
          {
            id: "i2",
            label: "20 + 20",
          },
          {
            id: "i4",
            label: "30 + 30",
          },
          {
            id: "i1",
            label: "40 - 20",
          },
          {
            id: "i3",
            label: "70 - 20",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },

      {
        id: "l81_ex4_q4",
        mission: 4,

        visualSymbol: "🧠",
        visualLabel:
          "أَحْسُبُ ثُمَّ أُرَتِّبُ",

        prompt:
          "ابْدَأْ بِالنَّتِيجَةِ الْأَكْبَرِ، ثُمَّ رَتِّبِ النَّتَائِجَ.",

        audioKey:
          "l81_ex4_q4",

        orderItems: [
          {
            id: "i3",
            label: "60 - 30",
          },
          {
            id: "i1",
            label: "40 + 20",
          },
          {
            id: "i4",
            label: "50 - 40",
          },
          {
            id: "i2",
            label: "70 - 20",
          },
        ],

        correctOrder: [
          "i1",
          "i2",
          "i3",
          "i4",
        ],
      },
    ],
  },
  82: {
    lessonKey: "lesson82",
    audioBase: "/audio/teachers/taline/lesson_82_mothers_day/exercises",
    missionTitles: {
      1: "أَسْتَعْمِلُ الْعَدَّ",
      2: "أُوَظِّفُ الْمُجَسَّمَاتِ",
      3: "أَسْتَعْمِلُ النُّقُودَ",
      4: "أُرَتِّبُ الْقِيَمَ",
    },
    completionMessage: "أَحْسَنْتَ! وَظَّفْتَ الْعَدَّ وَالْمُقَارَنَةَ وَالْمُجَسَّمَاتِ وَالنُّقُودَ فِي وَضْعِيَّةٍ حَيَاتِيَّةٍ.",
    nextPath: "/lesson-v2/83",
    questions: [
      {
        id: "l82_ex1_q1",
        mission: 1,
        visualSymbol: "📿",
        visualLabel: "أعد وأقارن",
        prompt: "إِذَا كَانَ فِي عِقْدٍ 24 خَرَزَةً وَفِي آخَرَ 31، فَأَيُّهُمَا أَكْثَرُ؟",
        audioKey: "l82_ex1_q1",
        choices: [
          choice("a", "24"),
          choice("b", "مُتَسَاوِيَانِ"),
          choice("c", "31"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l82_ex1_q2",
        mission: 1,
        visualSymbol: "📿",
        visualLabel: "أعد وأقارن",
        prompt: "أَيُّهُمَا أَصْغَرُ: 28 أَمْ 35؟",
        audioKey: "l82_ex1_q2",
        choices: [
          choice("a", "مُتَسَاوِيَانِ"),
          choice("b", "28"),
          choice("c", "35"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l82_ex1_q3",
        mission: 1,
        visualSymbol: "📿",
        visualLabel: "أعد وأقارن",
        prompt: "40 خَرَزَةً أَكْثَرُ مِنْ...",
        audioKey: "l82_ex1_q3",
        choices: [
          choice("a", "32"),
          choice("b", "45"),
          choice("c", "50"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l82_ex1_q4",
        mission: 1,
        visualSymbol: "⚖️",
        visualLabel: "أعد وأقارن",
        prompt: "أَيُّ عَلَامَةٍ تُنَاسِبُ: 36 ... 29؟",
        audioKey: "l82_ex1_q4",
        choices: [
          choice("a", "<"),
          choice("b", "="),
          choice("c", ">"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l82_ex2_q1",
        mission: 2,
        visualSymbol: "🎁",
        visualLabel: "المجسمات",
        prompt: "عُلْبَةُ هَدِيَّةٍ مُتَسَاوِيَةُ الْأَوْجُهِ قَدْ تُشْبِهُ...",
        audioKey: "l82_ex2_q1",
        choices: [
          choice("a", "الْأُسْطُوَانَةَ"),
          choice("b", "الْمُكَعَّبَ"),
          choice("c", "الْكُرَةَ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l82_ex2_q2",
        mission: 2,
        visualSymbol: "📦",
        visualLabel: "المجسمات",
        prompt: "عُلْبَةٌ طَوِيلَةٌ مُسْتَطِيلَةٌ قَدْ تُشْبِهُ...",
        audioKey: "l82_ex2_q2",
        choices: [
          choice("a", "مُتَوَازِيَ الْمُسْتَطِيلَاتِ"),
          choice("b", "الْكُرَةَ"),
          choice("c", "الْهَرَمَ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l82_ex2_q3",
        mission: 2,
        visualSymbol: "🔵",
        visualLabel: "المجسمات",
        prompt: "كُرَةٌ زُخْرُفِيَّةٌ تُشْبِهُ...",
        audioKey: "l82_ex2_q3",
        choices: [
          choice("a", "الْمُكَعَّبَ"),
          choice("b", "الْهَرَمَ"),
          choice("c", "الْكُرَةَ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l82_ex2_q4",
        mission: 2,
        visualSymbol: "🧩",
        visualLabel: "المجسمات",
        prompt: "عِنْدَ تَعَرُّفِ الْمُجَسَّمِ نَنْظُرُ إِلَى...",
        audioKey: "l82_ex2_q4",
        choices: [
          choice("a", "لَوْنِهِ فَقَطْ"),
          choice("b", "شَكْلِهِ وَخَصَائِصِهِ"),
          choice("c", "ثَمَنِهِ فَقَطْ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l82_ex3_q1",
        mission: 3,
        visualSymbol: "💰",
        visualLabel: "النقود",
        prompt: "مَعِي 50 دِينَارًا، أَيُّ ثَمَنٍ أَسْتَطِيعُ دَفْعَهُ؟",
        audioKey: "l82_ex3_q1",
        choices: [
          choice("a", "45 دِينَارًا"),
          choice("b", "65 دِينَارًا"),
          choice("c", "80 دِينَارًا"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l82_ex3_q2",
        mission: 3,
        visualSymbol: "💰",
        visualLabel: "النقود",
        prompt: "أَيُّ ثَمَنٍ أَكْبَرُ؟",
        audioKey: "l82_ex3_q2",
        choices: [
          choice("a", "40 دِينَارًا"),
          choice("b", "30 دِينَارًا"),
          choice("c", "60 دِينَارًا"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l82_ex3_q3",
        mission: 3,
        visualSymbol: "💰",
        visualLabel: "النقود",
        prompt: "أَيُّ ثَمَنٍ أَصْغَرُ؟",
        audioKey: "l82_ex3_q3",
        choices: [
          choice("a", "65 دِينَارًا"),
          choice("b", "25 دِينَارًا"),
          choice("c", "55 دِينَارًا"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l82_ex3_q4",
        mission: 3,
        visualSymbol: "🎁",
        visualLabel: "النقود",
        prompt: "إِذَا كَانَ مَعِي 60 دِينَارًا وَثَمَنُ الْهَدِيَّةِ 55، فَالْمَبْلَغُ...",
        audioKey: "l82_ex3_q4",
        choices: [
          choice("a", "كَافٍ"),
          choice("b", "غَيْرُ كَافٍ"),
          choice("c", "أَقَلُّ مِنَ الثَّمَنِ"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l82_ex4_q1",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "ترتيب الأسعار",
        prompt: "رَتِّبِ الْأَسْعَارَ مِنَ الْأَقَلِّ إِلَى الْأَكْبَرِ.",
        audioKey: "l82_ex4_q1",
        orderItems: [
          { id: "i2", label: "40 دِينَارًا" },
          { id: "i1", label: "20 دِينَارًا" },
          { id: "i3", label: "60 دِينَارًا" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l82_ex4_q2",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "ترتيب الكميات",
        prompt: "رَتِّبِ الْكَمِّيَّاتِ مِنَ الْأَقَلِّ إِلَى الْأَكْبَرِ.",
        audioKey: "l82_ex4_q2",
        orderItems: [
          { id: "i2", label: "27" },
          { id: "i1", label: "18" },
          { id: "i3", label: "36" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l82_ex4_q3",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "ترتيب الأسعار",
        prompt: "رَتِّبِ الْأَسْعَارَ مِنَ الْأَقَلِّ إِلَى الْأَكْبَرِ.",
        audioKey: "l82_ex4_q3",
        orderItems: [
          { id: "i2", label: "50 دِينَارًا" },
          { id: "i1", label: "25 دِينَارًا" },
          { id: "i3", label: "65 دِينَارًا" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l82_ex4_q4",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "ترتيب",
        prompt: "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l82_ex4_q4",
        orderItems: [
          { id: "i2", label: "31" },
          { id: "i1", label: "24" },
          { id: "i3", label: "48" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
    ],
  },
  83: {
    lessonKey: "lesson83",
    audioBase: "/audio/teachers/taline/lesson_83_my_day_and_time/exercises",
    missionTitles: {
      1: "أُمَيِّزُ أَوْقَاتَ الْيَوْمِ",
      2: "أَرْبِطُ النَّشَاطَ بِوَقْتِهِ",
      3: "أَقْرَأُ السَّاعَةَ",
      4: "أُرَتِّبُ يَوْمِي",
    },
    completionMessage: "أَحْسَنْتَ! رَبَطْتَ أَنْشِطَةَ يَوْمِكَ بِالصَّبَاحِ وَالْمَسَاءِ وَاللَّيْلِ.",
    nextPath: "/lesson-v2/84",
    questions: [
      {
        id: "l83_ex1_q1",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أَرَاجِعُ أَوْقَاتَ الْيَوْمِ",
        prompt: "أَيُّ وَقْتٍ يَبْدَأُ فِيهِ يَوْمُنَا عَادَةً؟",
        audioKey: "l83_ex1_q1",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "🌅", label: "الصَّبَاحُ" },
            { id: "b", icon: "☀️", label: "الظُّهْرُ" },
            { id: "c", icon: "🌇", label: "الْمَسَاءُ" },
            { id: "d", icon: "🌙", label: "اللَّيْلُ" },
          ],
        },
      },
      {
        id: "l83_ex1_q2",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أَرْبِطُ أَوْقَاتَ الْيَوْمِ",
        prompt: "أَيُّ وَقْتٍ يَأْتِي بَعْدَ الظُّهْرِ؟",
        audioKey: "l83_ex1_q2",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🌙", label: "اللَّيْلُ" },
            { id: "b", icon: "🌅", label: "الصَّبَاحُ" },
            { id: "c", icon: "🌇", label: "الْمَسَاءُ" },
            { id: "d", icon: "🌄", label: "الْفَجْرُ" },
          ],
        },
      },
      {
        id: "l83_ex1_q3",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "مَا قَبْلَ اللَّيْلِ؟",
        prompt: "أَيُّ وَقْتٍ يَسْبِقُ اللَّيْلَ؟",
        audioKey: "l83_ex1_q3",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "☀️", label: "الظُّهْرُ" },
            { id: "b", icon: "🌇", label: "الْمَسَاءُ" },
            { id: "c", icon: "🌅", label: "الصَّبَاحُ" },
            { id: "d", icon: "🌄", label: "الْفَجْرُ" },
          ],
        },
      },
      {
        id: "l83_ex1_q4",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أُرَتِّبُ أَوْقَاتِ الْيَوْمِ",
        prompt: "أَيُّ تَسَلْسُلٍ صَحِيحٌ لِأَوْقَاتِ الْيَوْمِ؟",
        audioKey: "l83_ex1_q4",
        premiumIconChoice: {
          correctId: "d",
          options: [
            { id: "a", icon: "🔀", label: "لَيْلٌ، صَبَاحٌ، مَسَاءٌ، ظُهْرٌ" },
            { id: "b", icon: "🔀", label: "مَسَاءٌ، صَبَاحٌ، لَيْلٌ، ظُهْرٌ" },
            { id: "c", icon: "🔀", label: "ظُهْرٌ، لَيْلٌ، صَبَاحٌ، مَسَاءٌ" },
            { id: "d", icon: "🧭", label: "صَبَاحٌ، ظُهْرٌ، مَسَاءٌ، لَيْلٌ" },
          ],
        },
      },
      {
        id: "l83_ex2_q1",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَرْبِطُ النَّشَاطَ بِوَقْتِهِ",
        prompt: "أَيُّ وَقْتٍ يُنَاسِبُ بَدْءَ الدِّرَاسَةِ فِي الْمَدْرَسَةِ؟",
        audioKey: "l83_ex2_q1",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "🌅🏫", label: "الصَّبَاحُ" },
            { id: "b", icon: "🌙", label: "اللَّيْلُ" },
            { id: "c", icon: "🌇", label: "الْمَسَاءُ الْمُتَأَخِّرُ" },
            { id: "d", icon: "🌌", label: "مُنْتَصَفُ اللَّيْلِ" },
          ],
        },
      },
      {
        id: "l83_ex2_q2",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَرْبِطُ النَّوْمَ بِوَقْتِهِ",
        prompt: "مَتَى نَسْتَعِدُّ لِلنَّوْمِ؟",
        audioKey: "l83_ex2_q2",
        premiumIconChoice: {
          correctId: "d",
          options: [
            { id: "a", icon: "🌅", label: "فِي الصَّبَاحِ" },
            { id: "b", icon: "☀️", label: "عِنْدَ الظُّهْرِ" },
            { id: "c", icon: "🏫", label: "أَثْنَاءَ الدِّرَاسَةِ" },
            { id: "d", icon: "🌙", label: "فِي اللَّيْلِ" },
          ],
        },
      },
      {
        id: "l83_ex2_q3",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَسْتَعْمِلُ أَدَاةً لِلتَّنْظِيمِ",
        prompt: "أَيُّ أَدَاةٍ تُسَاعِدُنَا عَلَى تَذَكُّرِ مَوَاعِيدِنَا؟",
        audioKey: "l83_ex2_q3",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "⚽", label: "الْكُرَةُ" },
            { id: "b", icon: "📅", label: "جَدْوَلٌ صَغِيرٌ" },
            { id: "c", icon: "🧸", label: "اللُّعْبَةُ" },
            { id: "d", icon: "🥄", label: "الْمِلْعَقَةُ" },
          ],
        },
      },
      {
        id: "l83_ex2_q4",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَفْهَمُ فَائِدَةَ التَّنْظِيمِ",
        prompt: "إِذَا خَصَّصْنَا لِكُلِّ نَشَاطٍ وَقْتًا، فَكَيْفَ يَصْبَحُ يَوْمُنَا؟",
        audioKey: "l83_ex2_q4",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🌪️", label: "فَوْضَوِيًّا" },
            { id: "b", icon: "❓", label: "مَنْسِيًّا" },
            { id: "c", icon: "✨📅", label: "مُنَظَّمًا" },
            { id: "d", icon: "🛌", label: "كُلَّهُ نَوْمًا" },
          ],
        },
      },
      {
        id: "l83_ex3_q1",
        mission: 3,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "عَقْرَبُ السَّاعَاتِ هُوَ...",

        audioKey:
          "l83_ex3_q1",

        premiumClock: {
          mode:
            "identify",

          hour:
            8,

          correctId:
            "a",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "الْقَصِيرُ",
            },
            {
              id: "b",
              icon: "🔵",
              label: "الطَّوِيلُ",
            },
            {
              id: "c",
              icon: "🟡",
              label: "غَيْرُ مَوْجُودٍ",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l83_ex3_q2",
        mission: 3,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "فِي السَّاعَةِ الْكَامِلَةِ يَكُونُ عَقْرَبُ الدَّقَائِقِ عِنْدَ...",

        audioKey:
          "l83_ex3_q2",

        premiumClock: {
          mode:
            "identify",

          hour:
            8,

          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "⭐",
              label: "3",
            },
            {
              id: "b",
              icon: "🔵",
              label: "6",
            },
            {
              id: "c",
              icon: "🟡",
              label: "12",
            },
            {
              id: "d",
              icon: "🔷",
              label: "غَيْرُ ذَلِكَ",
            },
          ],
        },
      },
      {
        id: "l83_ex3_q3",
        mission: 3,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "إِذَا كَانَ الْعَقْرَبُ الْقَصِيرُ عَلَى 8 وَالطَّوِيلُ عَلَى 12 فَالْوَقْتُ...",

        audioKey:
          "l83_ex3_q3",

        premiumClock: {
          mode:
            "read",

          hour:
            8,

          correctId:
            "b",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "7:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "8:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "9:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "6:00",
            },
          ],
        },
      },
      {
        id: "l83_ex3_q4",
        mission: 3,

        visualSymbol: "🕐",

        visualLabel:
          "سَاعَةٌ تَفَاعُلِيَّةٌ",

        prompt:
          "إِذَا كَانَ الْعَقْرَبُ الْقَصِيرُ عَلَى 6 وَالطَّوِيلُ عَلَى 12 فَالْوَقْتُ...",

        audioKey:
          "l83_ex3_q4",

        premiumClock: {
          mode:
            "read",

          hour:
            6,

          correctId:
            "c",

          options: [
            {
              id: "a",
              icon: "🕐",
              label: "8:00",
            },
            {
              id: "b",
              icon: "🕐",
              label: "5:00",
            },
            {
              id: "c",
              icon: "🕐",
              label: "6:00",
            },
            {
              id: "d",
              icon: "🕐",
              label: "7:00",
            },
          ],
        },
      },
      {
        id: "l83_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مُرَاجَعَةُ الْيَوْمِ",
        prompt: "رَتِّبْ أَوْقَاتَ الْيَوْمِ.",
        audioKey: "l83_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🌇", label: "الْمَسَاءُ" },
            { id: "i1", icon: "🌅", label: "الصَّبَاحُ" },
            { id: "i4", icon: "🌙", label: "اللَّيْلُ" },
            { id: "i2", icon: "☀️", label: "الظُّهْرُ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l83_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَسَلْسُلُ حِصَّةٍ",
        prompt: "رَتِّبْ أَحْدَاثَ حِصَّةٍ دِرَاسِيَّةٍ.",
        audioKey: "l83_ex4_q2",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🚪", label: "الْخُرُوجُ مِنَ الْقِسْمِ" },
            { id: "i2", icon: "👂", label: "الِاسْتِمَاعُ لِلْمُعَلِّمِ" },
            { id: "i1", icon: "🏫", label: "الدُّخُولُ إِلَى الْقِسْمِ" },
            { id: "i3", icon: "✏️", label: "حَلُّ تَمْرِينٍ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l83_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "مُرَاجَعَةُ السَّاعَةِ",
        prompt: "رَتِّبْ هَذِهِ السَّاعَاتِ.",
        audioKey: "l83_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🕘", label: "21:00" },
            { id: "i2", icon: "🕛", label: "12:00" },
            { id: "i1", icon: "🕖", label: "07:00" },
            { id: "i3", icon: "🕕", label: "18:00" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l83_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَحَدٍّ مُخْتَلِطٌ",
        prompt: "رَتِّبْ أَحْدَاثَ نُزْهَةٍ عَائِلِيَّةٍ.",
        audioKey: "l83_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🧺", label: "تَنَاوُلُ وَجْبَةٍ فِي الْحَدِيقَةِ" },
            { id: "i1", icon: "🎒", label: "تَجْهِيزُ الْحَقِيبَةِ" },
            { id: "i4", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i2", icon: "🚗", label: "الذَّهَابُ إِلَى الْحَدِيقَةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
  84: {
    lessonKey: "lesson84",
    audioBase: "/audio/teachers/khalil/lesson_84_assessment_4/exercises",
    missionTitles: {
      1: "أُرَاجِعُ الْأَشْكَالَ وَالْأَعْدَادَ",
      2: "أُرَاجِعُ السَّاعَةَ وَالنُّقُودَ",
      3: "أُرَاجِعُ الْجَمْعَ وَالْمُقَارَنَةَ",
      4: "أُرَتِّبُ وَأُثَبِّتُ مُكْتَسَبَاتِي",
    },
    completionMessage: "أَحْسَنْتَ! أَتْمَمْتَ مُرَاجَعَةَ مُكْتَسَبَاتِ الْحَصِيلَةِ الرَّابِعَةِ.",
    nextPath: "/lesson-v2/85",
    questions: [
      {
        id: "l84_ex1_q1",
        mission: 1,
        visualSymbol: "🔺",
        visualLabel: "مراجعة الأشكال",
        prompt: "أَيُّ شَكْلٍ لَهُ ثَلَاثَةُ أَضْلَاعٍ؟",
        audioKey: "l84_ex1_q1",
        choices: [
          choice("a", "الْمُرَبَّعُ"),
          choice("b", "الْمُسْتَطِيلُ"),
          choice("c", "الْمُثَلَّثُ"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l84_ex1_q2",
        mission: 1,
        visualSymbol: "⬜",
        visualLabel: "مراجعة الأشكال",
        prompt: "أَيُّ شَكْلٍ لَهُ أَرْبَعَةُ أَضْلَاعٍ مُتَسَاوِيَةٍ؟",
        audioKey: "l84_ex1_q2",
        choices: [
          choice("a", "الدَّائِرَةُ"),
          choice("b", "الْمُرَبَّعُ"),
          choice("c", "الْمُثَلَّثُ"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l84_ex1_q3",
        mission: 1,
        visualSymbol: "🔢",
        visualLabel: "مراجعة الأعداد",
        prompt: "5 عَشَرَاتٍ وَ8 وَحَدَاتٍ تُمَثِّلُ...",
        audioKey: "l84_ex1_q3",
        choices: [
          choice("a", "58"),
          choice("b", "85"),
          choice("c", "50"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l84_ex1_q4",
        mission: 1,
        visualSymbol: "🔢",
        visualLabel: "مراجعة الأعداد",
        prompt: "6 عَشَرَاتٍ وَ2 وَحْدَتَانِ تُمَثِّلُ...",
        audioKey: "l84_ex1_q4",
        choices: [
          choice("a", "26"),
          choice("b", "60"),
          choice("c", "62"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l84_ex2_q1",
        mission: 2,
        visualSymbol: "🕕",
        visualLabel: "مراجعة الساعة",
        prompt: "السَّادِسَةُ مَسَاءً تُكْتَبُ رَقْمِيًّا...",
        audioKey: "l84_ex2_q1",
        choices: [
          choice("a", "16:00"),
          choice("b", "18:00"),
          choice("c", "06:00 صَبَاحًا"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l84_ex2_q2",
        mission: 2,
        visualSymbol: "🕛",
        visualLabel: "مراجعة الساعة",
        prompt: "فِي السَّاعَةِ الْكَامِلَةِ عَقْرَبُ الدَّقَائِقِ يَكُونُ عِنْدَ...",
        audioKey: "l84_ex2_q2",
        choices: [
          choice("a", "12"),
          choice("b", "6"),
          choice("c", "9"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l84_ex2_q3",
        mission: 2,
        visualSymbol: "💰",
        visualLabel: "مراجعة النقود",
        prompt: "أَيُّ مَجْمُوعٍ يُكَوِّنُ 65 دِينَارًا؟",
        audioKey: "l84_ex2_q3",
        choices: [
          choice("a", "50 + 5"),
          choice("b", "20 + 20 + 5"),
          choice("c", "50 + 10 + 5"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l84_ex2_q4",
        mission: 2,
        visualSymbol: "💰",
        visualLabel: "مراجعة النقود",
        prompt: "مَعِي 70 دِينَارًا وَثَمَنُ شَيْءٍ 65. هَلِ الْمَبْلَغُ كَافٍ؟",
        audioKey: "l84_ex2_q4",
        choices: [
          choice("a", "الْمَبْلَغَانِ مُتَسَاوِيَانِ"),
          choice("b", "نَعَمْ"),
          choice("c", "لَا"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l84_ex3_q1",
        mission: 3,
        visualSymbol: "➕",
        visualLabel: "مراجعة الحساب",
        prompt: "20 + 30 = ؟",
        audioKey: "l84_ex3_q1",
        choices: [
          choice("a", "50"),
          choice("b", "40"),
          choice("c", "60"),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l84_ex3_q2",
        mission: 3,
        visualSymbol: "➕",
        visualLabel: "مراجعة الحساب",
        prompt: "35 + 4 = ؟",
        audioKey: "l84_ex3_q2",
        choices: [
          choice("a", "31"),
          choice("b", "49"),
          choice("c", "39"),
        ],
        answer: "c",
        columns: 2,
      },
      {
        id: "l84_ex3_q3",
        mission: 3,
        visualSymbol: "⚖️",
        visualLabel: "مراجعة المقارنة",
        prompt: "أَيُّهُمَا أَكْبَرُ: 62 أَمْ 56؟",
        audioKey: "l84_ex3_q3",
        choices: [
          choice("a", "مُتَسَاوِيَانِ"),
          choice("b", "62"),
          choice("c", "56"),
        ],
        answer: "b",
        columns: 2,
      },
      {
        id: "l84_ex3_q4",
        mission: 3,
        visualSymbol: "⚖️",
        visualLabel: "مراجعة المقارنة",
        prompt: "أَيُّ عَلَامَةٍ تُنَاسِبُ: 48 ... 53؟",
        audioKey: "l84_ex3_q4",
        choices: [
          choice("a", "<"),
          choice("b", ">"),
          choice("c", "="),
        ],
        answer: "a",
        columns: 2,
      },
      {
        id: "l84_ex4_q1",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "مراجعة",
        prompt: "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l84_ex4_q1",
        orderItems: [
          { id: "i2", label: "48" },
          { id: "i1", label: "39" },
          { id: "i3", label: "57" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l84_ex4_q2",
        mission: 4,
        visualSymbol: "↗️",
        visualLabel: "مراجعة",
        prompt: "رَتِّبِ الْأَعْدَادَ مِنَ الْأَصْغَرِ إِلَى الْأَكْبَرِ.",
        audioKey: "l84_ex4_q2",
        orderItems: [
          { id: "i2", label: "62" },
          { id: "i1", label: "50" },
          { id: "i3", label: "69" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l84_ex4_q3",
        mission: 4,
        visualSymbol: "⏱️",
        visualLabel: "مراجعة",
        prompt: "رَتِّبِ الْأَوْقَاتَ مِنَ الْأَبْكَرِ إِلَى الْمُتَأَخِّرِ.",
        audioKey: "l84_ex4_q3",
        orderItems: [
          { id: "i2", label: "الثَّانِيَةُ عَشْرَةَ ظُهْرًا" },
          { id: "i1", label: "السَّادِسَةُ صَبَاحًا" },
          { id: "i3", label: "السَّادِسَةُ مَسَاءً" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
      {
        id: "l84_ex4_q4",
        mission: 4,
        visualSymbol: "💰",
        visualLabel: "مراجعة",
        prompt: "رَتِّبِ الْمَبَالِغَ مِنَ الْأَقَلِّ إِلَى الْأَكْبَرِ.",
        audioKey: "l84_ex4_q4",
        orderItems: [
          { id: "i2", label: "50 دِينَارًا" },
          { id: "i1", label: "20 دِينَارًا" },
          { id: "i3", label: "65 دِينَارًا" },
        ],
        correctOrder: ["i1", "i2", "i3"],
      },
    ],
  },
  85: {
    lessonKey: "lesson85",
    audioBase: "/audio/teachers/khalil/lesson_85_organize_time_events/exercises",
    missionTitles: {
      1: "أُمَيِّزُ الِاسْتِعْمَالَ الْجَيِّدَ لِلْوَقْتِ",
      2: "أُنَظِّمُ أَنْشِطَتِي",
      3: "أَسْتَعْمِلُ قَبْلَ وَبَعْدَ",
      4: "أُرَتِّبُ أَحْدَاثِي",
    },
    completionMessage: "أَحْسَنْتَ! أَصْبَحْتَ تُنَظِّمُ وَقْتَكَ وَتُرَتِّبُ أَحْدَاثَكَ.",
    nextPath: SMALL_CITY_HOME,
    questions: [
      {
        id: "l85_ex1_q1",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "تَحَدِّي حُسْنِ اسْتِعْمَالِ الْوَقْتِ",
        prompt: "لَدَيْكَ وَقْتٌ قَبْلَ الْخُرُوجِ إِلَى الْمَدْرَسَةِ. مَاذَا تُنْجِزُ أَوَّلًا؟",
        audioKey: "l85_ex1_q1",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "🎮", label: "أَبْدَأُ لَعِبًا طَوِيلًا" },
            { id: "b", icon: "⭐", label: "أُجَهِّزُ حَقِيبَتِي" },
            { id: "c", icon: "📺", label: "أُشَاهِدُ التِّلْفَازَ" },
            { id: "d", icon: "🧸", label: "أَنْثُرُ أَلْعَابِي" },
          ],
        },
      },
      {
        id: "l85_ex1_q2",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أَكْتَشِفُ مُضَيِّعَ الْوَقْتِ",
        prompt: "أَيُّ تَصَرُّفٍ يُضَيِّعُ وَقْتَ الْوَاجِبِ؟",
        audioKey: "l85_ex1_q2",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "✏️", label: "الْبَدْءُ فِي الْوَاجِبِ" },
            { id: "b", icon: "🧰", label: "تَجْهِيزُ الْأَدَوَاتِ" },
            { id: "c", icon: "🎮", label: "اللَّعِبُ دُونَ تَوَقُّفٍ" },
            { id: "d", icon: "✅", label: "مُرَاجَعَةُ الْعَمَلِ" },
          ],
        },
      },
      {
        id: "l85_ex1_q3",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أُقَيِّمُ خُطَّةَ يَوْمٍ",
        prompt: "أَيُّ يَوْمٍ فِيهِ وَقْتٌ لِلدِّرَاسَةِ وَاللَّعِبِ وَالرَّاحَةِ؟",
        audioKey: "l85_ex1_q3",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "⚖️", label: "يَوْمٌ مُتَوَازِنٌ" },
            { id: "b", icon: "🎮", label: "لَعِبٌ فَقَطْ" },
            { id: "c", icon: "📚", label: "دِرَاسَةٌ فَقَطْ" },
            { id: "d", icon: "🛌", label: "نَوْمٌ فَقَطْ" },
          ],
        },
      },
      {
        id: "l85_ex1_q4",
        mission: 1,
        visualSymbol: "✦",
        visualLabel: "أَخْتَارُ السُّلُوكَ الْأَفْضَلَ",
        prompt: "أَيُّ جُمْلَةٍ تَدُلُّ عَلَى حُسْنِ اسْتِعْمَالِ الْوَقْتِ؟",
        audioKey: "l85_ex1_q4",
        premiumIconChoice: {
          correctId: "d",
          options: [
            { id: "a", icon: "🎮", label: "أَلْعَبُ طَوَالَ الْيَوْمِ" },
            { id: "b", icon: "❌", label: "أَتْرُكُ أَعْمَالِي" },
            { id: "c", icon: "🌙", label: "أَسْهَرُ كُلَّ لَيْلَةٍ" },
            { id: "d", icon: "⭐", label: "لِكُلِّ عَمَلٍ وَقْتٌ" },
          ],
        },
      },
      {
        id: "l85_ex2_q1",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَخْتَارُ خُطَّةَ مَا بَعْدَ الْمَدْرَسَةِ",
        prompt: "عُدْتَ مِنَ الْمَدْرَسَةِ. أَيُّ خُطَّةٍ أَفْضَلُ؟",
        audioKey: "l85_ex2_q1",
        premiumIconChoice: {
          correctId: "b",
          options: [
            { id: "a", icon: "🎮", label: "لَعِبٌ حَتَّى النَّوْمِ" },
            { id: "b", icon: "📋", label: "رَاحَةٌ قَصِيرَةٌ ثُمَّ وَاجِبٌ ثُمَّ لَعِبٌ" },
            { id: "c", icon: "📺", label: "مُشَاهَدَةٌ طَوِيلَةٌ" },
            { id: "d", icon: "🛌", label: "نَوْمٌ حَتَّى اللَّيْلِ" },
          ],
        },
      },
      {
        id: "l85_ex2_q2",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أُنَظِّمُ بَعْدَ الْعَمَلِ",
        prompt: "انْتَهَيْتَ مِنَ الرَّسْمِ. مَاذَا تَفْعَلُ بِالْأَدَوَاتِ؟",
        audioKey: "l85_ex2_q2",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "⭐", label: "أُعِيدُهَا إِلَى مَكَانِهَا" },
            { id: "b", icon: "🪑", label: "أَتْرُكُهَا عَلَى الْكُرْسِيِّ" },
            { id: "c", icon: "🛏️", label: "أَضَعُهَا فَوْقَ السَّرِيرِ" },
            { id: "d", icon: "🚪", label: "أَتْرُكُهَا قُرْبَ الْبَابِ" },
          ],
        },
      },
      {
        id: "l85_ex2_q3",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أُقَارِنُ الْجَدَاوِلَ",
        prompt: "أَيُّ جَدْوَلٍ يَحْفَظُ وَقْتَ الدِّرَاسَةِ وَالرَّاحَةِ؟",
        audioKey: "l85_ex2_q3",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🎮", label: "لَعِبٌ فَقَطْ" },
            { id: "b", icon: "📚", label: "دِرَاسَةٌ دُونَ تَوَقُّفٍ" },
            { id: "c", icon: "⚖️", label: "دِرَاسَةٌ وَرَاحَةٌ وَلَعِبٌ" },
            { id: "d", icon: "📺", label: "شَاشَةٌ طَوِيلَةٌ" },
          ],
        },
      },
      {
        id: "l85_ex2_q4",
        mission: 2,
        visualSymbol: "✦",
        visualLabel: "أَسْتَعْمِلُ أَدَاةَ تَذَكُّرٍ",
        prompt: "مَا الَّذِي يُسَاعِدُنَا عَلَى تَذَكُّرِ أَعْمَالِنَا؟",
        audioKey: "l85_ex2_q4",
        premiumIconChoice: {
          correctId: "d",
          options: [
            { id: "a", icon: "🧸", label: "لُعْبَةٌ" },
            { id: "b", icon: "⚽", label: "كُرَةٌ" },
            { id: "c", icon: "🥤", label: "كَأْسٌ" },
            { id: "d", icon: "⭐", label: "بِطَاقَةُ مَهَامٍّ" },
          ],
        },
      },
      {
        id: "l85_ex3_q1",
        mission: 3,
        visualSymbol: "◷",
        visualLabel: "أَرْبِطُ السَّاعَةَ بِالنَّشَاطِ",
        prompt: "السَّاعَةُ السَّابِعَةُ صَبَاحًا. أَيُّ نَشَاطٍ يُنَاسِبُ هَذَا الْوَقْتَ؟",
        audioKey: "l85_ex3_q1",
        premiumClock: {
          mode: "read",
          hour: 7,
          correctId: "a",
          options: [
            { id: "a", icon: "🎒", label: "الِاسْتِعْدَادُ لِلْمَدْرَسَةِ" },
            { id: "b", icon: "🍽️", label: "تَنَاوُلُ الْعَشَاءِ" },
            { id: "c", icon: "🌙", label: "النَّوْمُ" },
            { id: "d", icon: "🌇", label: "لَعِبُ الْمَسَاءِ" },
          ],
        },
      },
      {
        id: "l85_ex3_q2",
        mission: 3,
        visualSymbol: "◷",
        visualLabel: "أَخْتَارُ نَشَاطَ الْمَسَاءِ",
        prompt: "السَّاعَةُ الثَّامِنَةُ مَسَاءً. أَيُّ نَشَاطٍ يُنَاسِبُ هَذَا الْوَقْتَ؟",
        audioKey: "l85_ex3_q2",
        premiumClock: {
          mode: "read",
          hour: 8,
          correctId: "b",
          options: [
            { id: "a", icon: "🏫", label: "الدُّخُولُ إِلَى الْمَدْرَسَةِ" },
            { id: "b", icon: "🍽️", label: "الْعَشَاءُ وَالِاسْتِعْدَادُ لِلنَّوْمِ" },
            { id: "c", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "d", icon: "☀️", label: "الْغَدَاءُ" },
          ],
        },
      },
      {
        id: "l85_ex3_q3",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أَكْتَشِفُ الْحَدَثَ الْوَسَطِيَّ",
        prompt: "فِي تَسَلْسُلِ: فُطُورٌ، مَدْرَسَةٌ، غَدَاءٌ. أَيُّ حَدَثٍ فِي الْوَسَطِ؟",
        audioKey: "l85_ex3_q3",
        premiumIconChoice: {
          correctId: "c",
          options: [
            { id: "a", icon: "🥣", label: "الْفُطُورُ" },
            { id: "b", icon: "🍲", label: "الْغَدَاءُ" },
            { id: "c", icon: "🏫", label: "الْمَدْرَسَةُ" },
            { id: "d", icon: "🌙", label: "النَّوْمُ" },
          ],
        },
      },
      {
        id: "l85_ex3_q4",
        mission: 3,
        visualSymbol: "✦",
        visualLabel: "أَخْتَارُ الْحَدَثَ الْمُنَاسِبَ",
        prompt: "بَعْدَ الْوَاجِبِ وَقَبْلَ النَّوْمِ، أَيُّ نَشَاطٍ مُنَاسِبٌ؟",
        audioKey: "l85_ex3_q4",
        premiumIconChoice: {
          correctId: "a",
          options: [
            { id: "a", icon: "🧩", label: "لَعِبٌ قَصِيرٌ أَوْ رَاحَةٌ" },
            { id: "b", icon: "🏫", label: "الذَّهَابُ إِلَى الْمَدْرَسَةِ" },
            { id: "c", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "d", icon: "📚", label: "بَدْءُ يَوْمٍ دِرَاسِيٍّ جَدِيدٍ" },
          ],
        },
      },
      {
        id: "l85_ex4_q1",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَحَدِّي الصَّبَاحِ",
        prompt: "رَتِّبْ خُطُوَاتِ الِاسْتِعْدَادِ لِلْمَدْرَسَةِ.",
        audioKey: "l85_ex4_q1",
        premiumTimeline: {
          items: [
            { id: "i4", icon: "🎒", label: "حَمْلُ الْحَقِيبَةِ" },
            { id: "i2", icon: "🧼", label: "غَسْلُ الْوَجْهِ" },
            { id: "i1", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "i3", icon: "🥣", label: "تَنَاوُلُ الْفُطُورِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l85_ex4_q2",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَحَدِّي الْمَسَاءِ",
        prompt: "رَتِّبْ خُطَّةَ الْمَسَاءِ بَعْدَ الْمَدْرَسَةِ.",
        audioKey: "l85_ex4_q2",
        premiumTimeline: {
          items: [
            { id: "i2", icon: "📚", label: "إِنْجَازُ الْوَاجِبِ" },
            { id: "i4", icon: "🍽️", label: "تَنَاوُلُ الْعَشَاءِ" },
            { id: "i1", icon: "🍎", label: "وَجْبَةٌ خَفِيفَةٌ وَرَاحَةٌ" },
            { id: "i3", icon: "⚽", label: "لَعِبٌ قَصِيرٌ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l85_ex4_q3",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "تَحَدِّي يَوْمٍ خَاصٍّ",
        prompt: "رَتِّبْ أَحْدَاثَ يَوْمِ الْمُسَابَقَةِ.",
        audioKey: "l85_ex4_q3",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "🏆", label: "الْمُشَارَكَةُ فِي الْمُسَابَقَةِ" },
            { id: "i1", icon: "🎒", label: "تَجْهِيزُ الْأَدَوَاتِ" },
            { id: "i4", icon: "🏠", label: "الْعَوْدَةُ إِلَى الْبَيْتِ" },
            { id: "i2", icon: "🚶", label: "الذَّهَابُ إِلَى مَكَانِ الْمُسَابَقَةِ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
      {
        id: "l85_ex4_q4",
        mission: 4,
        visualSymbol: "◈",
        visualLabel: "التَّحَدِّي النِّهَائِيُّ",
        prompt: "رَتِّبْ يَوْمًا مُنَظَّمًا مِنَ الْبِدَايَةِ إِلَى النِّهَايَةِ.",
        audioKey: "l85_ex4_q4",
        premiumTimeline: {
          items: [
            { id: "i3", icon: "📚", label: "إِنْجَازُ الْوَاجِبِ" },
            { id: "i1", icon: "🌅", label: "الِاسْتِيقَاظُ" },
            { id: "i4", icon: "🌙", label: "النَّوْمُ فِي وَقْتِهِ" },
            { id: "i2", icon: "🏫", label: "الدِّرَاسَةُ" },
          ],
          correctOrder: ["i1", "i2", "i3", "i4"],
        },
      },
    ],
  },
};

function renderActivity({
  question,
  locked,
  showResult,
  submitResult,
}: UnifiedLessonExerciseRenderContextV2<
  SmallCityQuestion
>) {
  return (
    <div style={styles.card}>
      <div style={styles.visual}>
        <div
          aria-hidden="true"
          style={styles.symbol}
        >
          {question.visualSymbol}
        </div>

        <div
          style={styles.visualLabel}
        >
          {question.visualLabel}
        </div>
      </div>

      {question.numberSequence
        ? (
            <div
              aria-label="سلسلة عددية"
              style={styles.sequenceRow}
            >
              {question.numberSequence.map(
                (value, index) => (
                  <div
                    key={`${question.id}-seq-${index}`}
                    style={{
                      ...styles.sequenceBox,
                      ...(value === null
                        ? styles.sequenceBlank
                        : {}),
                    }}
                  >
                    {value === null ? "؟" : value}
                  </div>
                ),
              )}
            </div>
          )
        : null}

      {question.mentalOperation
        ? (
            <div
              aria-label="عملية حساب ذهني"
              style={{
                display: "grid",
                gap: 12,
                padding: 12,
                borderRadius: 20,
                background:
                  "linear-gradient(180deg,#F4F9FF,#FFFFFF)",
                border:
                  "2px solid #B9D8F3",
              }}
            >
              <div
                dir="ltr"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr auto 1fr auto 1fr",
                  gap: 8,
                  alignItems: "center",
                  textAlign: "center",
                  color: "#17365F",
                  fontSize:
                    "clamp(30px,9vw,50px)",
                  fontWeight: 1000,
                }}
              >
                <span>
                  {question.mentalOperation.left}
                </span>

                <span
                  style={{
                    color: "#C48716",
                  }}
                >
                  {question.mentalOperation.operator}
                </span>

                <span>
                  {question.mentalOperation.right}
                </span>

                <span>=</span>

                <span
                  style={{
                    color: "#C48716",
                  }}
                >
                  ؟
                </span>
              </div>

              <div
                dir="ltr"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(0,1fr) auto minmax(0,1fr)",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor(
                        question
                          .mentalOperation
                          .left
                        / 10,
                      ),
                    ),
                  }).map(
                    (_, index) => (
                      <span
                        key={`${question.id}-mental-left-${index}`}
                        style={{
                          minWidth: 28,
                          padding: "5px 4px",
                          borderRadius: 8,
                          background:
                            "#FFF3D6",
                          color:
                            "#8A5B00",
                          border:
                            "1px solid #E8A020",
                          fontSize: 12,
                          fontWeight: 900,
                          textAlign:
                            "center",
                        }}
                      >
                        10
                      </span>
                    ),
                  )}
                </div>

                <strong
                  style={{
                    color: "#C48716",
                    fontSize: 24,
                  }}
                >
                  {question.mentalOperation.operator}
                </strong>

                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor(
                        question
                          .mentalOperation
                          .right
                        / 10,
                      ),
                    ),
                  }).map(
                    (_, index) => (
                      <span
                        key={`${question.id}-mental-right-${index}`}
                        style={{
                          minWidth: 28,
                          padding: "5px 4px",
                          borderRadius: 8,
                          background:
                            "#E9F4FF",
                          color:
                            "#175A96",
                          border:
                            "1px solid #8FC2EA",
                          fontSize: 12,
                          fontWeight: 900,
                          textAlign:
                            "center",
                        }}
                      >
                        10
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          )
        : null}

      {question.tensValueDisplay
        ? (
            <div
              aria-label="مجموعات العشرات والقيمة الصحيحة"
              style={{
                width: "100%",
                display: "grid",
                gap: 12,
                padding: 12,
                borderRadius: 20,
                background:
                  "linear-gradient(180deg,#FFF9ED,#FFFFFF)",
                border:
                  "2px solid #F1D28C",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {Array.from({
                  length:
                    question
                      .tensValueDisplay
                      .tens,
                }).map(
                  (_, index) => (
                    <div
                      key={`${question.id}-tens-${index}`}
                      aria-hidden="true"
                      style={{
                        width: 34,
                        minHeight: 78,
                        borderRadius: 10,
                        border:
                          "2px solid #D8A83E",
                        background:
                          "repeating-linear-gradient(180deg,#FFE49E 0,#FFE49E 5px,#FFF5D6 5px,#FFF5D6 8px)",
                        display: "grid",
                        placeItems: "center",
                        color: "#765000",
                        fontWeight: 1000,
                        fontSize: 13,
                      }}
                    >
                      10
                    </div>
                  ),
                )}
              </div>

              <div
                dir="ltr"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: "#52606D",
                    fontSize:
                      "clamp(24px,7vw,34px)",
                    fontWeight: 1000,
                  }}
                >
                  =
                </span>

                <strong
                  style={{
                    minWidth: 90,
                    padding:
                      "8px 18px",
                    borderRadius: 18,
                    background:
                      "#17365F",
                    color: "#FFFFFF",
                    fontSize:
                      "clamp(34px,10vw,52px)",
                    lineHeight: 1,
                    textAlign: "center",
                    boxShadow:
                      "0 8px 18px rgba(23,54,95,.18)",
                  }}
                >
                  {
                    question
                      .tensValueDisplay
                      .value
                  }
                </strong>
              </div>
            </div>
          )
        : null}

      {question.premiumClock
        ? (
            <PremiumTimeClockLabV2
              key={`${question.id}-premium-clock`}
              {...question.premiumClock}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.premiumTimeline
        ? (
            <PremiumTimelineOrderLabV2
              key={`${question.id}-premium-timeline`}
              {...question.premiumTimeline}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.premiumIconChoice
        ? (
            <PremiumIconChoiceLabV2
              key={`${question.id}-premium-icon-choice`}
              {...question.premiumIconChoice}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.analogClockChoice
        ? (
            <AnalogClockChoiceLabV2
              key={`${question.id}-analog-clock`}
              {...question.analogClockChoice}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.smallNumberOperation
        ? (
            <SmallNumberOperationLabV2
              key={`${question.id}-small-number-operation`}
              {...question.smallNumberOperation}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.revealNumberChoice
        ? (
            <RevealNumberChoiceLabV2
              key={`${question.id}-reveal-number`}
              {...question.revealNumberChoice}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.numberLab
        ? (
            <PremiumNumberLabV2
              key={`${question.id}-number-lab`}
              {...question.numberLab}
              locked={locked}
              showResult={showResult}
            />
          )
        : null}

      {question.numberCompare
        ? (
            <PremiumNumberCompareLabV2
              key={`${question.id}-number-compare`}
              {...question.numberCompare}
              locked={locked}
              showResult={showResult}
              onResult={submitResult}
            />
          )
        : null}

      {question.orderItems
        && question.correctOrder
        ? (
            <SmallCityOrderLabV2
              key={question.id}
              items={
                question.orderItems
              }
              correctOrder={
                question.correctOrder
              }
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
SmallCityLessonExercises72To85({
  lessonNum,
}: {
  lessonNum: number;
}) {
  const config =
    LESSONS[lessonNum];

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

      nextLabel={
        lessonNum === 85
          ? "العودة إلى العالم"
          : "الدرس التالي"
      }

      quizPath={
        SMALL_CITY_QUIZ
      }

      renderActivity={
        renderActivity
      }
    />
  );
}

export const Lesson72Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={72}
    />
  );

export const Lesson73Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={73}
    />
  );

export const Lesson74Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={74}
    />
  );

export const Lesson75Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={75}
    />
  );

export const Lesson76Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={76}
    />
  );

export const Lesson77Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={77}
    />
  );

export const Lesson78Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={78}
    />
  );

export const Lesson79Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={79}
    />
  );

export const Lesson94TimeExercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={94}
    />
  );

export const Lesson80Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={80}
    />
  );

export const Lesson81Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={81}
    />
  );

export const Lesson82Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={82}
    />
  );

export const Lesson83Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={83}
    />
  );

export const Lesson84Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={84}
    />
  );

export const Lesson85Exercises =
  () => (
    <SmallCityLessonExercises72To85
      lessonNum={85}
    />
  );

const styles: Record<
  string,
  CSSProperties
> = {
  card: {
    width: "100%",
    display: "grid",
    gap: 14,
  },

  sequenceRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4,minmax(0,1fr))",
    gap: 8,
    direction: "ltr",
  },

  sequenceBox: {
    minHeight: 62,
    borderRadius: 16,
    border: "2px solid #D9E5F1",
    background: "#FFFFFF",
    color: "#17365F",
    display: "grid",
    placeItems: "center",
    fontSize:
      "clamp(26px,7vw,38px)",
    fontWeight: 1000,
    boxShadow:
      "0 8px 18px rgba(23,54,95,.07)",
  },

  sequenceBlank: {
    border:
      "3px dashed #E8A020",
    background: "#FFF9ED",
    color: "#C48716",
  },

  visual: {
    minHeight: 105,
    borderRadius: 22,
    background:
      "linear-gradient(180deg,#FFF9ED,#FFFFFF)",
    border:
      "2px solid #E8A020",
    display: "grid",
    placeItems: "center",
    padding: 12,
    textAlign: "center",
  },

  symbol: {
    fontSize: 38,
    fontWeight: 900,
  },

  visualLabel: {
    fontSize: 18,
    color: "#17365F",
    fontWeight: 900,
  },
};
