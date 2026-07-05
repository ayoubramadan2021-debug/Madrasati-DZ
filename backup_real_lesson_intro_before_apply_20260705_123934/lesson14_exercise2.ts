import type { TapSelectImageItem } from "../exercises-v2/TapSelectImagesV2";

const G6 = "/lessons/v2/lesson14/exercises/group6cubes.svg";
const G7 = "/lessons/v2/lesson14/exercises/group7balls.svg";
const G5 = "/lessons/v2/lesson14/exercises/group5cubes.svg";
const G8 = "/lessons/v2/lesson14/exercises/group8balls.svg";

export const LESSON_14_EXERCISE_2: TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا سِتَّةُ مُكَعَّبَاتٍ.",
    question_audio_key: "l14_ex2_q1",
    options: [G5, G6, G7, G8],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا سَبْعُ كُرَاتٍ.",
    question_audio_key: "l14_ex2_q2",
    options: [G6, G8, G7, G5],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا العَدَدُ خَمْسَةٌ.",
    question_audio_key: "l14_ex2_q3",
    options: [G7, G6, G5, G8],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الصُّورَةَ الَّتِي فِيهَا أَكْبَرُ كَمِّيَّةٍ.",
    question_audio_key: "l14_ex2_q4",
    options: [G6, G5, G8, G7],
    correct_index: 2,
    image_fit: "contain",
  },
];

export const LESSON_14_EXERCISE_2_AUDIO_BASE = "/audio/lesson_14_exercises";
