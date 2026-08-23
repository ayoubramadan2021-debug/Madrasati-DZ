import type { UnifiedLessonExerciseQuestionV2 } from "../exercises-v2/UnifiedLessonExercisesV2";
import { LESSON_52_EXERCISE_1 } from "./lesson52_exercise1";

export type Lesson52ActivityKind = "image-choice" | "drag-premium" | "effort-premium" | "pulse-premium";
export type Lesson52UnifiedQuestion = UnifiedLessonExerciseQuestionV2 & {
  activityKind: Lesson52ActivityKind;
  roundIndex: number;
  raw?: any;
};

const DRAG_RUNTIME = [
  {
    "question": "اِسْحَبْ كُلَّ مَكَانٍ إِلَى التَّصْنِيفِ الصَّحِيحِ.",
    "audio": "l52_ex2_q1_activity_order"
  },
  {
    "question": "اِسْحَبْ كُلَّ نَشَاطٍ إِلَى الْمَكَانِ الْمُنَاسِبِ.",
    "audio": "l52_ex2_q2_after_running"
  },
  {
    "question": "اِسْحَبْ كُلَّ خَطَرٍ إِلَى التَّصَرُّفِ الصَّحِيحِ.",
    "audio": "l52_ex2_q3_pulse_order"
  },
  {
    "question": "اِسْحَبْ كُلَّ وَصْفٍ إِلَى الْمَكَانِ الَّذِي يُنَاسِبُهُ.",
    "audio": "l52_ex2_q4_place_decision"
  }
] as const;
const EFFORT_RUNTIME = [
  {
    "question": "هَلْ تَكُونُ هَذِهِ الْحَالَةُ قَبْلَ الْجَهْدِ أَمْ بَعْدَهُ؟",
    "audio": "l52_ex3_q1_breathing"
  },
  {
    "question": "هَلْ تَكُونُ هَذِهِ الْحَالَةُ قَبْلَ الْجَهْدِ أَمْ بَعْدَهُ؟",
    "audio": "l52_ex3_q2_heartbeat"
  },
  {
    "question": "مَتَى أَقُومُ بِهَذَا السُّلُوكِ الصِّحِّيِّ؟",
    "audio": "l52_ex3_q3_healthy_behavior"
  },
  {
    "question": "مَتَى أَقُومُ بِهَذَا السُّلُوكِ الصِّحِّيِّ؟",
    "audio": "l52_ex3_q4_places"
  }
] as const;
const PULSE_RUNTIME = [
  {
    "question": "اِخْتَرِ الصُّورَةَ الَّتِي تُظْهِرُ مَوْضِعَ الْقَلْبِ.",
    "audio": "l52_ex4_q1_chest"
  },
  {
    "question": "اِخْتَرِ الصُّورَةَ الَّتِي تُظْهِرُ قِيَاسَ النَّبْضِ عِنْدَ الْمِعْصَمِ.",
    "audio": "l52_ex4_q2_wrist"
  },
  {
    "question": "بَعْدَ الْجَرْيِ، أَيْنَ أَقِيسُ نَبْضِي؟",
    "audio": "l52_ex4_q3_after_running"
  },
  {
    "question": "أَيُّ صُورَةٍ تُظْهِرُ التَّعَبَ وَسُرْعَةَ التَّنَفُّسِ بَعْدَ الْجَرْيِ؟",
    "audio": "l52_ex4_q4_heart_place"
  }
] as const;

function ex1Questions(): Lesson52UnifiedQuestion[] {
  return Array.from(LESSON_52_EXERCISE_1 as readonly any[]).map((item,index) => ({
    id: `l52_m1_${item.id ?? index}`, mission: 1,
    prompt: String(item.question ?? ""),
    audioKey: String(item.question_audio_key ?? ""),
    activityKind: "image-choice", roundIndex: index, raw: item,
    backgroundImage: "/lessons/v2/lesson52/s1.webp",
  }));
}

function runtimeQuestions(mission:number, kind:Lesson52ActivityKind, items:readonly {question:string;audio:string}[], backgroundImage:string): Lesson52UnifiedQuestion[] {
  return items.map((item,index) => ({
    id:`l52_m${mission}_${index+1}`, mission, prompt:item.question, audioKey:item.audio,
    activityKind:kind, roundIndex:index, backgroundImage,
  }));
}

export const LESSON_52_UNIFIED_AUDIO_BASE = "/audio/teachers/khalil/lesson_52_bilan_2/exercises";
export const LESSON_52_UNIFIED_QUESTIONS: Lesson52UnifiedQuestion[] = [
  ...ex1Questions(),
  ...runtimeQuestions(2,"drag-premium",DRAG_RUNTIME,"/lessons/v2/lesson52/exercises/s1.webp"),
  ...runtimeQuestions(3,"effort-premium",EFFORT_RUNTIME,"/lessons/v2/lesson52/exercises/s5.webp"),
  ...runtimeQuestions(4,"pulse-premium",PULSE_RUNTIME,"/lessons/v2/lesson52/exercise4/s1.webp"),
];
