import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const SCENE_2 = "/lessons/v2/lesson2-house/scene-2-tv-sofa.webp";
const SCENE_3 = "/lessons/v2/lesson2-house/scene-3-window-sofa.webp";
const SCENE_4 = "/lessons/v2/lesson2-house/scene-4-fridge-oven.webp";
const SCENE_5 = "/lessons/v2/lesson2-house/scene-5-bed-window.webp";

export const LESSON_2_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى صُورَتِهَا الْمُنَاسِبَةِ",
    question_audio_key: "l2_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: { kind: "word", value: "أَمَامَ" }, target: { kind: "image", src: SCENE_2 } },
      { match_id: "p2", draggable: { kind: "word", value: "وَرَاءَ" }, target: { kind: "image", src: SCENE_3 } },
      { match_id: "p3", draggable: { kind: "word", value: "بِجَانِبِ" }, target: { kind: "image", src: SCENE_4 } },
    ],
  },
  {
    question: "اِرْبِطْ كُلَّ كَلِمَةٍ بِالصُّورَةِ الَّتِي تَدُلُّ عَلَيْهَا",
    question_audio_key: "l2_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: { kind: "word", value: "بِجَانِبِ" }, target: { kind: "image", src: SCENE_4 } },
      { match_id: "p2", draggable: { kind: "word", value: "مُقَابِلَ" }, target: { kind: "image", src: SCENE_5 } },
      { match_id: "p3", draggable: { kind: "word", value: "أَمَامَ" }, target: { kind: "image", src: SCENE_2 } },
    ],
  },
  {
    question: "صِلْ كُلَّ مُفْرَدَةٍ بِمَوْقِعِهَا فِي الصُّورَةِ",
    question_audio_key: "l2_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: { kind: "word", value: "وَرَاءَ" }, target: { kind: "image", src: SCENE_3 } },
      { match_id: "p2", draggable: { kind: "word", value: "مُقَابِلَ" }, target: { kind: "image", src: SCENE_5 } },
      { match_id: "p3", draggable: { kind: "word", value: "بِجَانِبِ" }, target: { kind: "image", src: SCENE_4 } },
    ],
  },
  {
    question: "تَحَدِّي. اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى مَكَانِهَا",
    question_audio_key: "l2_ex3_q4",
    pairs: [
      { match_id: "p1", draggable: { kind: "word", value: "أَمَامَ" }, target: { kind: "image", src: SCENE_2 } },
      { match_id: "p2", draggable: { kind: "word", value: "وَرَاءَ" }, target: { kind: "image", src: SCENE_3 } },
      { match_id: "p3", draggable: { kind: "word", value: "بِجَانِبِ" }, target: { kind: "image", src: SCENE_4 } },
      { match_id: "p4", draggable: { kind: "word", value: "مُقَابِلَ" }, target: { kind: "image", src: SCENE_5 } },
    ],
  },
  {
    question: "اِبْحَثْ عَنِ الْمَوَاقِعِ وَاِرْبِطْهَا بِالْكَلِمَاتِ",
    question_audio_key: "l2_ex3_q5",
    pairs: [
      { match_id: "p1", draggable: { kind: "word", value: "مُقَابِلَ" }, target: { kind: "image", src: SCENE_5 } },
      { match_id: "p2", draggable: { kind: "word", value: "أَمَامَ" }, target: { kind: "image", src: SCENE_2 } },
      { match_id: "p3", draggable: { kind: "word", value: "بِجَانِبِ" }, target: { kind: "image", src: SCENE_4 } },
      { match_id: "p4", draggable: { kind: "word", value: "وَرَاءَ" }, target: { kind: "image", src: SCENE_3 } },
    ],
  },
];

export const LESSON_2_EXERCISE_3_AUDIO_BASE = "/audio/lesson_2_exercises";
