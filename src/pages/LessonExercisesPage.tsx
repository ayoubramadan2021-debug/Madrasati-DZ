import Lesson46HeartBeats2Exercises from "../features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises";
import Lesson64PlantsWithUs2Exercises from "../features/lesson-v2/exercises-v2/Lesson64PlantsWithUs2Exercises";
import Lesson65AddSubtractSituations2Exercises from "../features/lesson-v2/exercises-v2/Lesson65AddSubtractSituations2Exercises";
import Lesson66MobilizeKnowledge3Exercises from "../features/lesson-v2/exercises-v2/Lesson66MobilizeKnowledge3Exercises";
import Lesson67Assessment3ArabicExercises from "../features/lesson-v2/exercises-v2/Lesson67Assessment3ArabicExercises";
import Lesson68Assessment3MathExercises from "../features/lesson-v2/exercises-v2/Lesson68Assessment3MathExercises";
import Lesson69Assessment3ScienceExercises from "../features/lesson-v2/exercises-v2/Lesson69Assessment3ScienceExercises";
import Lesson45CompleteTableExercises from "../features/lesson-v2/exercises-v2/Lesson45CompleteTableExercises";
import Lesson44HalfExercises from "../features/lesson-v2/exercises-v2/Lesson44HalfExercises";
import Lesson43DoubleExercises from "../features/lesson-v2/exercises-v2/Lesson43DoubleExercises";
import Lesson42HeartExercises from "../features/lesson-v2/exercises-v2/Lesson42HeartExercises";
import Lesson41GridExercises from "../features/lesson-v2/exercises-v2/Lesson41GridExercises";
import TableReadingExerciseV2 from "../features/lesson-v2/exercises-v2/TableReadingExerciseV2";
import {
  LESSON_37_EXERCISE_1,
  LESSON_37_EXERCISES_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson37_exercise1";

import {
  LESSON_37_EXERCISE_2,
} from "../features/lesson-v2/content/lesson37_exercise2";

import {
  LESSON_37_EXERCISE_3,
} from "../features/lesson-v2/content/lesson37_exercise3";

import {
  LESSON_37_EXERCISE_4,
} from "../features/lesson-v2/content/lesson37_exercise4";

import GeneratedLessonExercises from "../features/lesson-v2/generated/GeneratedLessonExercises";
import { GENERATED_CURRICULUM_REGISTRY } from "../features/lesson-v2/generated/registry";
import "../features/lesson-v2/exercises-v2/lesson35-neutral-theme.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Lesson53ExercisesPage from "./Lesson53ExercisesPage";
import Lesson54ExercisesPage from "./Lesson54ExercisesPage";
import Lesson55ExercisesPage from "./Lesson55ExercisesPage";
import Lesson56ExercisesPage from "./Lesson56ExercisesPage";
import Lesson57ExercisesPage from "./Lesson57ExercisesPage";
import Lesson58ExercisesPage from "./Lesson58ExercisesPage";
import Lesson59ExercisesPage from "./Lesson59ExercisesPage";
import Lesson60ExercisesPage from "./Lesson60ExercisesPage";
import Lesson61ExercisesPage from "./Lesson61ExercisesPage";
import Lesson62ExercisesPage from "./Lesson62ExercisesPage";
import Lesson63ExercisesPage from "./Lesson63ExercisesPage";

import ExerciseFullscreenShellV2 from "../features/lesson-v2/components/ExerciseFullscreenShellV2";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";

import CompareExerciseV2 from "../features/lesson-v2/exercises-v2/CompareExerciseV2";
import CountTapExerciseV2 from "../features/lesson-v2/exercises-v2/CountTapExerciseV2";
import DragMatchExerciseV2 from "../features/lesson-v2/exercises-v2/DragMatchExerciseV2";
import DirectOperationExerciseV2 from "../features/lesson-v2/exercises-v2/DirectOperationExerciseV2";
import EquationChoiceExerciseV2 from "../features/lesson-v2/exercises-v2/EquationChoiceExerciseV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";
import SortSequenceExerciseV2 from "../features/lesson-v2/exercises-v2/SortSequenceExerciseV2";
import TapSelectExerciseV2 from "../features/lesson-v2/exercises-v2/TapSelectExerciseV2";
import TapSelectImagesV2 from "../features/lesson-v2/exercises-v2/TapSelectImagesV2";
import TapSelectWordsV2 from "../features/lesson-v2/exercises-v2/TapSelectWordsV2";
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

import {
  LESSON_36_EXERCISE_1,
  LESSON_36_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise1";
import {
  LESSON_36_EXERCISE_2,
  LESSON_36_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise2";
import {
  LESSON_36_EXERCISE_3,
  LESSON_36_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise3";
import {
  LESSON_36_EXERCISE_4,
  LESSON_36_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson36_exercise4";

import {
  LESSON_39_EXERCISE_1,
  LESSON_39_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson39_exercise1";

import {
  LESSON_39_EXERCISE_2,
  LESSON_39_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson39_exercise2";

import {
  LESSON_39_EXERCISE_3,
  LESSON_39_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson39_exercise3";

import {
  LESSON_39_EXERCISE_4,
  LESSON_39_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson39_exercise4";

import {
  LESSON_40_EXERCISE_1,
  LESSON_40_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson40_exercise1";

import {
  LESSON_40_EXERCISE_2,
  LESSON_40_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson40_exercise2";

import {
  LESSON_40_EXERCISE_3,
  LESSON_40_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson40_exercise3";

import {
  LESSON_40_EXERCISE_4,
  LESSON_40_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson40_exercise4";

const WORLD2_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const WORLD2_QUIZ =
  `/world/${WORLD2_ID}/quiz`;

import {
  LESSON_38_EXERCISE_1,
  LESSON_38_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson38_exercise1";

import {
  LESSON_38_EXERCISE_2,
  LESSON_38_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson38_exercise2";

import {
  LESSON_38_EXERCISE_3,
  LESSON_38_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson38_exercise3";

import {
  LESSON_38_EXERCISE_4,
  LESSON_38_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson38_exercise4";


import { useEffect } from "react";
import "../features/lesson-v2/components/lesson53-69-typography.css";
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

type Lesson36Stage =
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

function Lesson36Exercises() {
  const [stage, setStage] =
    useState<Lesson36Stage>("ex1");

  if (stage === "ex1") {
    return (
      <TapSelectExerciseV2
        key="lesson36-ex1-count"
        items={LESSON_36_EXERCISE_1}
        audio_base={LESSON_36_EXERCISE_1_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s1.webp"
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <CountTapExerciseV2
        key="lesson36-ex2-identify"
        items={LESSON_36_EXERCISE_2}
        audio_base={LESSON_36_EXERCISE_2_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s2.webp"
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <DirectOperationExerciseV2
        key="lesson36-ex3-direct-operation"
        items={LESSON_36_EXERCISE_3}
        audio_base={LESSON_36_EXERCISE_3_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s3.webp"
        onComplete={() => setStage("ex4")}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <EquationChoiceExerciseV2
        key="lesson36-ex4-equation-choice"
        items={LESSON_36_EXERCISE_4}
        audio_base={LESSON_36_EXERCISE_4_AUDIO_BASE}
        background_image="/lessons/v2/lesson36/s4.webp"
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson36"
      message="أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ إِلَى 19."
      onReplay={() => setStage("ex1")}
      nextPath={WORLD2_HOME}
      quizPath={WORLD2_QUIZ}
    />
  );
}

function Lesson37Exercises() {
  const [stage, setStage] =
    useState<
      "ex1" |
      "ex2" |
      "ex3" |
      "ex4" |
      "done"
    >("ex1");

  if (stage === "ex1") {
    return (
      <TableReadingExerciseV2
        key="lesson37-read-cell"
        items={LESSON_37_EXERCISE_1}
        audio_base={LESSON_37_EXERCISES_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );
  }

  if (stage === "ex2") {
    return (
      <TableReadingExerciseV2
        key="lesson37-read-row"
        items={LESSON_37_EXERCISE_2}
        audio_base={LESSON_37_EXERCISES_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );
  }

  if (stage === "ex3") {
    return (
      <TableReadingExerciseV2
        key="lesson37-read-column"
        items={LESSON_37_EXERCISE_3}
        audio_base={LESSON_37_EXERCISES_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );
  }

  if (stage === "ex4") {
    return (
      <TableReadingExerciseV2
        key="lesson37-table-inference"
        items={LESSON_37_EXERCISE_4}
        audio_base={LESSON_37_EXERCISES_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );
  }

  return (
    <LessonCompleteV2
      lessonKey="lesson37"
      message="أَكْمَلْتَ تَمَارِينَ قِرَاءَةِ الْجَدْوَلِ."
      onReplay={() => setStage("ex1")}
      nextPath="/world2-lesson/38"
      quizPath={WORLD2_QUIZ}
    />
  );
}

function Lesson38Exercises() {
  const [stage, setStage] =
    useState<WorldStage>("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson38"
        message="أَكْمَلْتَ تَمَارِينَ أَنَا أَتَنَفَّسُ."
        onReplay={() => setStage("ex1")}
        nextPath="/world2-lesson/39"
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <TapSelectImagesV2
          key="world2-38-air-path"
          items={LESSON_38_EXERCISE_1}
          audio_base={
            LESSON_38_EXERCISE_1_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson38/s1.webp"
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <TapSelectImagesV2
          key="world2-38-activity-breathing"
          items={LESSON_38_EXERCISE_2}
          audio_base={
            LESSON_38_EXERCISE_2_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson38/s2.webp"
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <TapSelectImagesV2
          key="world2-38-clean-air"
          items={LESSON_38_EXERCISE_3}
          audio_base={
            LESSON_38_EXERCISE_3_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson38/s3.webp"
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <TapSelectImagesV2
          key="world2-38-review"
          items={LESSON_38_EXERCISE_4}
          audio_base={
            LESSON_38_EXERCISE_4_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson38/s4.webp"
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2>
  );
}

function Lesson39Exercises() {
  const [stage, setStage] =
    useState<WorldStage>("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson39"
        message="أَصْبَحْتَ مُفَتِّشَ القِطَارِ المُرَتَّبِ!"
        onReplay={() => setStage("ex1")}
        nextPath="/world2-lesson/40"
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <TapSelectWordsV2
          key="lesson39-wagon-rank"
          items={LESSON_39_EXERCISE_1}
          audio_base={
            LESSON_39_EXERCISE_1_AUDIO_BASE
          }
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <TapSelectImagesV2
          key="lesson39-scene-choice"
          items={LESSON_39_EXERCISE_2}
          audio_base={
            LESSON_39_EXERCISE_2_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson39/s2.webp"
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <RankOrderExerciseV2
          key="lesson39-order"
          items={LESSON_39_EXERCISE_3}
          audio_base={
            LESSON_39_EXERCISE_3_AUDIO_BASE
          }
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <TapSelectWordsV2
          key="lesson39-before-after"
          items={LESSON_39_EXERCISE_4}
          audio_base={
            LESSON_39_EXERCISE_4_AUDIO_BASE
          }
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2>
  );
}

function Lesson40Exercises() {
  const [stage, setStage] = useState<
    "ex1" | "ex2" | "ex3" | "ex4" | "done"
  >("ex1");

  if (stage === "done") {
    return (
      <LessonCompleteV2
        lessonKey="lesson40"
        message="أَحْسَنْتَ! أَصْبَحْتَ بَطَلَ المُقَارَنَةِ وَالتَّرْتِيبِ."
        onReplay={() => setStage("ex1")}
        nextPath="/world2-lesson/41"
        nextLabel="الدرس التالي"
        quizPath={WORLD2_QUIZ}
      />
    );
  }

  return (
    <ExerciseFullscreenShellV2>
      {stage === "ex1" && (
        <TapSelectWordsV2
          key="lesson40-compare-words"
          items={LESSON_40_EXERCISE_1}
          audio_base={
            LESSON_40_EXERCISE_1_AUDIO_BASE
          }
          onComplete={() => setStage("ex2")}
        />
      )}

      {stage === "ex2" && (
        <TapSelectImagesV2
          key="lesson40-compare-images"
          items={LESSON_40_EXERCISE_2}
          audio_base={
            LESSON_40_EXERCISE_2_AUDIO_BASE
          }
          background_image="/lessons/v2/lesson40/exercises/supplies-overview.webp"
          onComplete={() => setStage("ex3")}
        />
      )}

      {stage === "ex3" && (
        <RankOrderExerciseV2
          key="lesson40-quantity-order"
          items={LESSON_40_EXERCISE_3}
          audio_base={
            LESSON_40_EXERCISE_3_AUDIO_BASE
          }
          onComplete={() => setStage("ex4")}
        />
      )}

      {stage === "ex4" && (
        <TapSelectWordsV2
          key="lesson40-bear-size"
          items={LESSON_40_EXERCISE_4}
          audio_base={
            LESSON_40_EXERCISE_4_AUDIO_BASE
          }
          onComplete={() => setStage("done")}
        />
      )}
    </ExerciseFullscreenShellV2>
  );
}

export default function LessonExercisesPage() {

  const mdzExercisePathname =
    typeof window !== "undefined"
      ? window.location.pathname
      : "";

  useEffect(() => {
    const lessonMatch =
      mdzExercisePathname.match(
        /\/lesson-v2\/(\d+)\/exercises\/?$/,
      );

    const lessonNumber =
      Number(lessonMatch?.[1]);

    const useCurrentTypography =
      Number.isInteger(lessonNumber) &&
      lessonNumber >= 53 &&
      lessonNumber <= 69;

    if (useCurrentTypography) {
      document.documentElement.setAttribute(
        "data-madrasati-exercise-typography",
        "lesson64",
      );
    } else {
      document.documentElement.removeAttribute(
        "data-madrasati-exercise-typography",
      );
    }

    return () => {
      if (
        document.documentElement.getAttribute(
          "data-madrasati-exercise-typography",
        ) === "lesson64"
      ) {
        document.documentElement.removeAttribute(
          "data-madrasati-exercise-typography",
        );
      }
    };
  }, [mdzExercisePathname]);

  const { lessonId } =
    useParams<{ lessonId?: string }>();
  if (lessonId === "53") return <Lesson53ExercisesPage />;
  if (lessonId === "54") return <Lesson54ExercisesPage />;
  if (lessonId === "55") return <Lesson55ExercisesPage />;
  if (lessonId === "56") return <Lesson56ExercisesPage />;
  if (lessonId === "57") return <Lesson57ExercisesPage />;
  if (lessonId === "58") return <Lesson58ExercisesPage />;
  if (lessonId === "59") return <Lesson59ExercisesPage />;
  if (lessonId === "60") return <Lesson60ExercisesPage />;
  if (lessonId === "61") return <Lesson61ExercisesPage />;
  if (lessonId === "62") return <Lesson62ExercisesPage />;
  if (lessonId === "63") return <Lesson63ExercisesPage />;
  if (lessonId === "64") return <Lesson64PlantsWithUs2Exercises />;

  if (lessonId === "65") return <Lesson65AddSubtractSituations2Exercises />;
  if (lessonId === "66") return <Lesson66MobilizeKnowledge3Exercises />;
  if (lessonId === "67") return <Lesson67Assessment3ArabicExercises />;
  if (lessonId === "68") return <Lesson68Assessment3MathExercises />;
  if (lessonId === "69") return <Lesson69Assessment3ScienceExercises />;
  if (lessonId === "46") return <Lesson46HeartBeats2Exercises />;

  if (lessonId === "45") return <Lesson45CompleteTableExercises />;

  if (lessonId === "44") return <Lesson44HalfExercises />;

  if (lessonId === "43") return <Lesson43DoubleExercises />;

  if (lessonId === "42") return <Lesson42HeartExercises />;


  if (lessonId === "41") return <Lesson41GridExercises />;


  if (lessonId === "33") {
    return <Lesson33Exercises />;
  }

  if (lessonId === "34") {
    return <Lesson34Exercises />;
  }

  if (lessonId === "35") {
    return <Lesson35Exercises />;
  }

  if (lessonId === "37") {
    return <Lesson37Exercises />;
  }

  if (lessonId === "36") {
    return <Lesson36Exercises />;
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


  if (lessonId === "38") {
    return <Lesson38Exercises />;
  }


  if (lessonId === "39") {
    return <Lesson39Exercises />;
  }


  if (lessonId === "40") {
    return <Lesson40Exercises />;
  }

  return <SchoolLessonOneExercises />;
}
