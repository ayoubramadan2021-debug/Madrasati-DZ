import type {
  Lesson31VisualChoiceItem,
} from "../exercises-v2/lesson31/Lesson31VisualChoiceEngineV2";

export const LESSON_31_EXERCISE_2:
  Lesson31VisualChoiceItem[] = [
  {
    question:
      "اِخْتَرِ الوَجْبَةَ المُتَوَازِنَةَ.",

    question_audio_key: "ex2_q1",

    left: {
      title: "فَاكِهَةٌ وَسَنْدَوِيتشٌ وَمَاءٌ",
      items: ["🍎", "🥪", "💧"],
      borderColor: "#22a866",
      background: "#effff6",
    },

    right: {
      title: "حَلْوَى وَبَطَاطَا وَمَشْرُوبٌ غَازِيٌّ",
      items: ["🍬", "🍟", "🥤"],
      borderColor: "#e34848",
      background: "#fff2f2",
    },

    correct: "left",
  },
  {
    question:
      "اِخْتَرِ الوَجْبَةَ الَّتِي تَحْتَوِي عَلَى الحَلِيبِ وَالمَوْزِ وَالخُبْزِ.",

    question_audio_key: "ex2_q2",

    left: {
      title: "حَلْوَى وَكَعْكَةٌ وَمَشْرُوبٌ غَازِيٌّ",
      items: ["🍭", "🍰", "🥤"],
      borderColor: "#e34848",
      background: "#fff2f2",
    },

    right: {
      title: "حَلِيبٌ وَمَوْزٌ وَخُبْزٌ",
      items: ["🥛", "🍌", "🥖"],
      borderColor: "#22a866",
      background: "#effff6",
    },

    correct: "right",
  },
  {
    question:
      "اِخْتَرِ المَشْرُوبَ الأَفْضَلَ لِلرِّحْلَةِ.",

    question_audio_key: "ex2_q3",

    left: {
      title: "المَاءُ",
      items: ["💧"],
      borderColor: "#338fd0",
      background: "#eef8ff",
    },

    right: {
      title: "المَشْرُوبُ الغَازِيُّ",
      items: ["🥤"],
      borderColor: "#e34848",
      background: "#fff2f2",
    },

    correct: "left",
  },
  {
    question:
      "اِخْتَرِ الوَجْبَةَ غَيْرَ المُتَوَازِنَةِ.",

    question_audio_key: "ex2_q4",

    left: {
      title: "بُرْتُقَالٌ وَسَنْدَوِيتشٌ وَحَلِيبٌ",
      items: ["🍊", "🥪", "🥛"],
      borderColor: "#22a866",
      background: "#effff6",
    },

    right: {
      title: "حَلْوَى وَبَطَاطَا وَمَشْرُوبٌ غَازِيٌّ",
      items: ["🍬", "🍟", "🥤"],
      borderColor: "#e34848",
      background: "#fff2f2",
    },

    correct: "right",
  },
];
