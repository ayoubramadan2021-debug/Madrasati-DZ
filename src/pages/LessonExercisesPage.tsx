import GeneratedLessonExercises from "../features/lesson-v2/generated/GeneratedLessonExercises";
import { GENERATED_CURRICULUM_REGISTRY } from "../features/lesson-v2/generated/registry";
import "../features/lesson-v2/exercises-v2/lesson35-neutral-theme.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";

import CompareExerciseV2 from "../features/lesson-v2/exercises-v2/CompareExerciseV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
import SortSequenceExerciseV2 from "../features/lesson-v2/exercises-v2/SortSequenceExerciseV2";
import TapSelectExerciseV2 from "../features/lesson-v2/exercises-v2/TapSelectExerciseV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import TraceExerciseV2 from "../features/lesson-v2/exercises-v2/TraceExerciseV2";
import UnitMeasurePathV2 from "../features/lesson-v2/exercises-v2/UnitMeasurePathV2";

import {
  LESSON_1_EXERCISE_1,
  LESSON_1_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise1";
import {
  LESSON_1_EXERCISE_2,
  LESSON_1_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise2";
import {
  LESSON_1_EXERCISE_3,
  LESSON_1_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise3";
import {
  LESSON_1_EXERCISE_4,
  LESSON_1_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise4";
import {
  LESSON_1_EXERCISE_5,
  LESSON_1_EXERCISE_5_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson1_exercise5";

import {
  LESSON_33_EXERCISE_1,
  LESSON_33_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson33_exercise1";
import {
  LESSON_33_EXERCISE_2,
  LESSON_33_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson33_exercise2";
import {
  LESSON_33_EXERCISE_3,
  LESSON_33_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson33_exercise3";
import {
  LESSON_33_EXERCISE_4,
  LESSON_33_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson33_exercise4";

import {
  LESSON_34_EXERCISE_1,
  LESSON_34_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson34_exercise1";
import {
  LESSON_34_EXERCISE_2,
  LESSON_34_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson34_exercise2";
import {
  LESSON_34_EXERCISE_3,
  LESSON_34_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson34_exercise3";
import {
  LESSON_34_EXERCISE_4,
  LESSON_34_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson34_exercise4";

import {
  LESSON_35_EXERCISE_1,
  LESSON_35_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson35_exercise1";
import {
  LESSON_35_EXERCISE_2,
  LESSON_35_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson35_exercise2";
import {
  LESSON_35_EXERCISE_3,
  LESSON_35_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson35_exercise3";
import {
  LESSON_35_EXERCISE_4,
  LESSON_35_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson35_exercise4";

const WORLD2_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const WORLD2_QUIZ =
  `/world/${WORLD2_ID}/quiz`;

const WORLD2_HOME =
  `/world/${WORLD2_ID}`;

type SchoolStage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "ex5"
  | "done";

type WorldStage =
  | "ex1"
  | "ex2"
  | "ex3"
  | "ex4"
  | "done";

function SchoolLessonOneExercises() {
  const [stage, setStage] =
    useState<SchoolStage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectExerciseV2
        items={LESSON_1_EXERCISE_1}
        audio_base={LESSON_1_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <CountTapExerciseV2
        items={LESSON_1_EXERCISE_2}
        audio_base={LESSON_1_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <DragMatchExerciseV2
        items={LESSON_1_EXERCISE_3}
        audio_base={LESSON_1_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <SortSequenceExerciseV2
        items={LESSON_1_EXERCISE_4}
        audio_base={LESSON_1_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("ex5")}
      />
    );
  }

  if (stage === "ex5") {
    return (
      <TraceExerciseV2
        items={LESSON_1_EXERCISE_5}
        audio_base={LESSON_1_EXERCISE_5_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson1"
      message="أَكْمَلْتَ تَمَارِينَ الدَّرْسِ."
      onReplay={() => setStage("ex1")}
      nextLessonKey="lesson2"
    />
  );
}

function Lesson33Exercises() {
  const [stage, setStage] =
    useState<WorldStage>("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson33"
        message="أَكْمَلْتَ تَمَارِينَ قِيَاسِ الأَطْوَالِ وَمُقَارَنَتِهَا."
        onReplay={() => setStage("ex1")}
        nextPath="/world2-lesson/34"
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <UnitMeasurePathV2
          key="world2-33-unit-placement"
          items={LESSON_33_EXERCISE_1}
          audio_base={LESSON_33_EXERCISE_1_AUDIO_BASE}
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <UnitMeasurePathV2
          key="world2-33-measure-compare"
          items={LESSON_33_EXERCISE_2}
          audio_base={LESSON_33_EXERCISE_2_AUDIO_BASE}
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <UnitMeasurePathV2
          key="world2-33-story-calculate"
          items={LESSON_33_EXERCISE_3}
          audio_base={LESSON_33_EXERCISE_3_AUDIO_BASE}
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <UnitMeasurePathV2
          key="world2-33-map-challenge"
          items={LESSON_33_EXERCISE_4}
          audio_base={LESSON_33_EXERCISE_4_AUDIO_BASE}
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2>
  );
}

function Lesson34Exercises() {
  const [stage, setStage] =
    useState<WorldStage>("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson34"
        message="أَكْمَلْتَ تَمَارِينَ مَسَالِكِ عَالَمِ الأَلْعَابِ."
        onReplay={() => setStage("ex1")}
        nextPath="/world2-lesson/35"
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <CompareExerciseV2
          key="world2-34-compare"
          items={LESSON_34_EXERCISE_1}
          audio_base={LESSON_34_EXERCISE_1_AUDIO_BASE}
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <TapSelectImagesV2
          key="world2-34-map"
          items={LESSON_34_EXERCISE_2}
          audio_base={LESSON_34_EXERCISE_2_AUDIO_BASE}
          background_image="/lessons/v2/lesson34-amusement-paths/s9.webp"
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <RankOrderExerciseV2
          key="world2-34-rank"
          items={LESSON_34_EXERCISE_3}
          audio_base={LESSON_34_EXERCISE_3_AUDIO_BASE}
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <TapSelectImagesV2
          key="world2-34-safe"
          items={LESSON_34_EXERCISE_4}
          audio_base={LESSON_34_EXERCISE_4_AUDIO_BASE}
          background_image="/lessons/v2/lesson34-amusement-paths/s11.webp"
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2>
  );
}

function Lesson35Exercises() {
  const [stage, setStage] =
    useState<WorldStage>("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson35"
        message="أَكْمَلْتَ تَمَارِينَ التَّنَفُّسِ الجَيِّدِ فِي عَالَمِ المَرَحِ."
        onReplay={() => setStage("ex1")}
        nextPath={WORLD2_HOME}
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <div className="lesson35-neutral-theme"><ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <CompareExerciseV2
          key="world2-35-compare"
          items={LESSON_35_EXERCISE_1}
          audio_base={LESSON_35_EXERCISE_1_AUDIO_BASE}
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <RankOrderExerciseV2
          key="world2-35-rank"
          items={LESSON_35_EXERCISE_2}
          audio_base={LESSON_35_EXERCISE_2_AUDIO_BASE}
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <TapSelectImagesV2
          key="world2-35-behavior"
          items={LESSON_35_EXERCISE_3}
          audio_base={LESSON_35_EXERCISE_3_AUDIO_BASE}
          background_image="/lessons/v2/lesson35-amusement-breathing/s16.webp"
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <TapSelectImagesV2
          key="world2-35-apply"
          items={LESSON_35_EXERCISE_4}
          audio_base={LESSON_35_EXERCISE_4_AUDIO_BASE}
          background_image="/lessons/v2/lesson35-amusement-breathing/s17.webp"
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2></div>
  );
}

export default function LessonExercisesPage() {
  const { lessonId } =
    useParams<{ lessonId?: string }>();

  if (lessonId === "33") {
    return <Lesson33Exercises />;
  }

  if (lessonId === "34") {
    return <Lesson34Exercises />;
  }

  if (lessonId === "35") {
    return <Lesson35Exercises />;
  }

  const generatedManifest =
    lessonId
      ? GENERATED_CURRICULUM_REGISTRY[
          lessonId as keyof typeof GENERATED_CURRICULUM_REGISTRY
        ]
      : undefined;

  if (generatedManifest) {
    return (
      <GeneratedLessonExercises
        manifestPath={generatedManifest}
      />
    );
  }

  return <SchoolLessonOneExercises />;
}
