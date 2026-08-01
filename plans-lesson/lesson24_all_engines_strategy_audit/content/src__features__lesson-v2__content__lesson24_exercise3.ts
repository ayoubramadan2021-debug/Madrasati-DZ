import type { TracePathItem } from "../exercises-v2/PathTraceExerciseV2";

export const LESSON_24_EXERCISE_3_AUDIO_BASE = "/audio/teachers/khalil/lesson_24_exercises";

export const LESSON_24_EXERCISE_3: TracePathItem[] = [
  {
    question: "اُرْسُمْ مَسَارًا مُسْتَقِيمًا",
    question_audio_key: "l24_final_trace_q1",
    path_d: "M 42 86 L 258 86",
    start: { x: 42, y: 86 },
    end: { x: 258, y: 86 },
    color: "#1FA463",
  },
  {
    question: "اُرْسُمْ مَسَارًا مُنْحَنِيًا",
    question_audio_key: "l24_final_trace_q2",
    path_d: "M 42 104 C 100 34, 180 132, 258 70",
    start: { x: 42, y: 104 },
    end: { x: 258, y: 70 },
    color: "#2F80ED",
  },
  {
    question: "اِتْبَعِ المَسَارَ مِنَ البِدَايَةِ إِلَى النِّهَايَةِ",
    question_audio_key: "l24_final_trace_q3",
    path_d: "M 42 86 L 96 86 L 150 86 L 204 86 L 258 86",
    start: { x: 42, y: 86 },
    end: { x: 258, y: 86 },
    color: "#1FA463",
  },
  {
    question: "اِتْبَعِ المَسَارَ المُنْحَنِي بِإِصْبَعِكَ",
    question_audio_key: "l24_final_trace_q4",
    path_d: "M 42 98 C 78 44, 130 42, 154 86 C 178 128, 226 106, 258 66",
    start: { x: 42, y: 98 },
    end: { x: 258, y: 66 },
    color: "#2F80ED",
  },
  {
    question: "اُرْسُمْ مِنَ النُّقْطَةِ الذَّهَبِيَّةِ إِلَى النِّهَايَةِ",
    question_audio_key: "l24_final_trace_q5",
    path_d: "M 42 104 C 96 52, 150 124, 204 58 C 226 34, 246 48, 258 70",
    start: { x: 42, y: 104 },
    end: { x: 258, y: 70 },
    color: "#2F80ED",
  },
];
