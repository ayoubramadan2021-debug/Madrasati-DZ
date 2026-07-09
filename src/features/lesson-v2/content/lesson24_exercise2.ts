import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

export const LESSON_24_EXERCISE_2_AUDIO_BASE = "/audio/teachers/khalil/lesson_24_exercises";

export const LESSON_24_EXERCISE_2: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى مَعْنَاهَا",
    question_audio_key: "l24_drag_q1",
    pairs: [
      {
        draggable: { kind: "word", value: "البِدَايَةُ" },
        target: { kind: "word", value: "نَبْدَأُ مِنْ هُنَا" },
        match_id: "start",
      },
      {
        draggable: { kind: "word", value: "النِّهَايَةُ" },
        target: { kind: "word", value: "نَصِلُ إِلَى هُنَا" },
        match_id: "end",
      },
      {
        draggable: { kind: "word", value: "المَسَارُ" },
        target: { kind: "word", value: "الطَّرِيقُ الَّذِي نَتْبَعُهُ" },
        match_id: "path",
      },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ مَسَارٍ إِلَى وَصْفِهِ",
    question_audio_key: "l24_drag_q2",
    pairs: [
      {
        draggable: { kind: "word", value: "مُسْتَقِيمٌ" },
        target: { kind: "word", value: "لَا يَنْحَنِي" },
        match_id: "straight",
      },
      {
        draggable: { kind: "word", value: "مُنْحَنٍ" },
        target: { kind: "word", value: "فِيهِ اِنْحِنَاءٌ" },
        match_id: "curve",
      },
      {
        draggable: { kind: "word", value: "اِتْبَعْ" },
        target: { kind: "word", value: "سِرْ فَوْقَ المَسَارِ" },
        match_id: "follow",
      },
    ],
  },
  {
    question: "رَكِّبْ أَجْزَاءَ المَسَارِ الصَّحِيحَةَ",
    question_audio_key: "l24_drag_q3",
    pairs: [
      {
        draggable: { kind: "word", value: "نُقْطَةٌ خَضْرَاءُ" },
        target: { kind: "word", value: "البِدَايَةُ" },
        match_id: "green",
      },
      {
        draggable: { kind: "word", value: "نُقْطَةٌ حَمْرَاءُ" },
        target: { kind: "word", value: "النِّهَايَةُ" },
        match_id: "red",
      },
      {
        draggable: { kind: "word", value: "خَطٌّ مَنْقُوطٌ" },
        target: { kind: "word", value: "أَرْسُمُ فَوْقَهُ" },
        match_id: "dotted",
      },
    ],
  },
];
