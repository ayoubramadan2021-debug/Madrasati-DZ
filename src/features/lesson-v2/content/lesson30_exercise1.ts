import type {
  Lesson30CompositionCountItem,
} from "../exercises-v2/lesson30/Lesson30CompositionCountEngineV2";

export const LESSON_30_EXERCISE_AUDIO_BASE =
  "/audio/teachers/taline/lesson_30_exercises";

export const LESSON_30_EXERCISE_1:
  Lesson30CompositionCountItem[] = [
  {
    question:
      "أَرْبَعُ تُفَّاحَاتٍ حَمْرَاءَ وَسِتُّ تُفَّاحَاتٍ خَضْرَاءَ. كَمْ تُفَّاحَةً لَدَيْنَا؟",

    question_audio_key: "ex1_q1",

    leftCount: 4,
    rightCount: 6,

    leftEmoji: "🍎",
    rightEmoji: "🍏",

    leftLabel:
      "تُفَّاحٌ أَحْمَرُ",

    rightLabel:
      "تُفَّاحٌ أَخْضَرُ",

    options: [8, 9, 10],
    correct: 10,
  },
  {
    question:
      "خَمْسَةُ مُكَعَّبَاتٍ زَرْقَاءَ وَخَمْسَةُ مُكَعَّبَاتٍ صَفْرَاءَ. كَمْ مُكَعَّبًا لَدَيْنَا؟",

    question_audio_key: "ex1_q2",

    leftCount: 5,
    rightCount: 5,

    leftEmoji: "🟦",
    rightEmoji: "🟨",

    leftLabel:
      "مُكَعَّبَاتٌ زَرْقَاءُ",

    rightLabel:
      "مُكَعَّبَاتٌ صَفْرَاءُ",

    options: [9, 10, 11],
    correct: 10,
  },
  {
    question:
      "سِتُّ زَهَرَاتٍ صَفْرَاءَ وَثَلَاثُ زَهَرَاتٍ حَمْرَاءَ. كَمْ زَهْرَةً لَدَيْنَا؟",

    question_audio_key: "ex1_q3",

    leftCount: 6,
    rightCount: 3,

    leftEmoji: "🌼",
    rightEmoji: "🌺",

    leftLabel:
      "زَهَرَاتٌ صَفْرَاءُ",

    rightLabel:
      "زَهَرَاتٌ حَمْرَاءُ",

    options: [8, 9, 10],
    correct: 9,
  },
  {
    question:
      "سَبْعُ دَوَائِرَ بُرْتُقَالِيَّةٍ وَثَلَاثُ دَوَائِرَ زَرْقَاءَ. كَمْ دَائِرَةً لَدَيْنَا؟",

    question_audio_key: "ex1_q4",

    leftCount: 7,
    rightCount: 3,

    leftEmoji: "🟠",
    rightEmoji: "🔵",

    leftLabel:
      "دَوَائِرُ بُرْتُقَالِيَّةٌ",

    rightLabel:
      "دَوَائِرُ زَرْقَاءُ",

    options: [9, 10, 11],
    correct: 10,
  },
];
