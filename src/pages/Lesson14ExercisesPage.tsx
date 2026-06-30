import { useState } from "react";

import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import CountSelectV2 from "../features/lesson-v2/exercises-v2/CountSelectV2";
import MemoryQuantityExerciseV2 from "../features/lesson-v2/exercises-v2/MemoryQuantityExerciseV2";
import MemoryBuildQuantityExerciseV2 from "../features/lesson-v2/exercises-v2/MemoryBuildQuantityExerciseV2";
import MemorySameQuantityExerciseV2 from "../features/lesson-v2/exercises-v2/MemorySameQuantityExerciseV2";

import {
  LESSON_14_EXERCISE_1,
  LESSON_14_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson14_exercise1";

import {
  LESSON_14_EXERCISE_2_MEMORY,
  LESSON_14_EXERCISE_2_MEMORY_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson14_exercise2_memory";

import {
  LESSON_14_EXERCISE_3_MEMORY_BUILD,
  LESSON_14_EXERCISE_3_MEMORY_BUILD_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson14_exercise3_memory_build";

import {
  LESSON_14_EXERCISE_4_SAME_QUANTITY,
  LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson14_exercise4_same_quantity";

type Stage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4a"
  | "ex4b"
  | "ex4c"
  | "ex4d"
  | "ex4e"
  | "done";

function sameQuantityItem(index: number) {
  return [LESSON_14_EXERCISE_4_SAME_QUANTITY[index]];
}

export default function Lesson14ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <CountSelectV2
        key="ex1"
        items={LESSON_14_EXERCISE_1}
        audio_base={LESSON_14_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <MemoryQuantityExerciseV2
        key="ex2"
        items={LESSON_14_EXERCISE_2_MEMORY}
        audio_base={LESSON_14_EXERCISE_2_MEMORY_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <MemoryBuildQuantityExerciseV2
        key="ex3"
        items={LESSON_14_EXERCISE_3_MEMORY_BUILD}
        audio_base={LESSON_14_EXERCISE_3_MEMORY_BUILD_AUDIO_BASE}
        onComplete={() => setStage("ex4a")}
      />
    );

  if (stage === "ex4a")
    return (
      <MemorySameQuantityExerciseV2
        key="ex4a"
        items={sameQuantityItem(0)}
        audio_base={LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE}
        progress_current={1}
        progress_total={5}
        onComplete={() => setStage("ex4b")}
      />
    );

  if (stage === "ex4b")
    return (
      <MemorySameQuantityExerciseV2
        key="ex4b"
        items={sameQuantityItem(1)}
        audio_base={LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE}
        progress_current={2}
        progress_total={5}
        onComplete={() => setStage("ex4c")}
      />
    );

  if (stage === "ex4c")
    return (
      <MemorySameQuantityExerciseV2
        key="ex4c"
        items={sameQuantityItem(2)}
        audio_base={LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE}
        progress_current={3}
        progress_total={5}
        onComplete={() => setStage("ex4d")}
      />
    );

  if (stage === "ex4d")
    return (
      <MemorySameQuantityExerciseV2
        key="ex4d"
        items={sameQuantityItem(3)}
        audio_base={LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE}
        progress_current={4}
        progress_total={5}
        onComplete={() => setStage("ex4e")}
      />
    );

  if (stage === "ex4e")
    return (
      <MemorySameQuantityExerciseV2
        key="ex4e"
        items={sameQuantityItem(4)}
        audio_base={LESSON_14_EXERCISE_4_SAME_QUANTITY_AUDIO_BASE}
        progress_current={5}
        progress_total={5}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَتَذَكَّرُ الكَمِّيَّةَ وَتَعْرِفُ المَجْمُوعَاتِ المُتَسَاوِيَةَ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
