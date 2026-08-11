import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import Lesson51BilanExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson51BilanExerciseV2";

import Lesson51VisualAdditionExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson51VisualAdditionExerciseV2";

import {
  lesson51Exercise1,
} from "../features/lesson-v2/content/lesson51_exercise1";

import {
  lesson51Exercise2,
} from "../features/lesson-v2/content/lesson51_exercise2";

import {
  lesson51Exercise3,
} from "../features/lesson-v2/content/lesson51_exercise3";

import {
  lesson51Exercise4,
} from "../features/lesson-v2/content/lesson51_exercise4";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_51_bilan_1/exercises";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const missions = [
  {
    kind: "choice",
    title:
      "الْمَهَمَّةُ الْأُولَى: أُرَتِّبُ وَأُحَدِّدُ الْمَرْتَبَةَ",
    items: lesson51Exercise1,
  },
  {
    kind: "visual-addition",
    title:
      "الْمَهَمَّةُ الثَّانِيَةُ: أَبْنِي نَاتِجَ الْجَمْعِ",
    items: lesson51Exercise2,
  },
  {
    kind: "choice",
    title:
      "الْمَهَمَّةُ الثَّالِثَةُ: أَخْتَارُ عَمَلِيَّةَ الْجَمْعِ الصَّحِيحَةَ",
    items: lesson51Exercise3,
  },
  {
    kind: "choice",
    title:
      "الْمَهَمَّةُ الرَّابِعَةُ: أُكْمِلُ عَمَلِيَّةَ الْجَمْعِ الصَّحِيحَةَ",
    items: lesson51Exercise4,
  },
] as const;

const LessonComplete =
  LessonCompleteV2 as any;

export default function
Lesson51ExercisesPage() {
  const [
    missionIndex,
    setMissionIndex,
  ] = useState(0);

  const mission =
    missions[missionIndex];

  if (!mission) {
    const nextPath =
      "/world2-lesson/52";

    const quizPath =
      `/world/${WORLD_ID}/quiz`;

    return (
      <LessonComplete
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle="أَتْمَمْتَ تَمَارِينَ الْحَصِيلَةِ الْأُولَى."
        nextLessonPath={nextPath}
        nextPath={nextPath}
        quizPath={quizPath}
        worldQuizPath={quizPath}
        onNext={() => {
          window.location.href =
            nextPath;
        }}
        onReplay={() => {
          setMissionIndex(0);
        }}
        onRetry={() => {
          setMissionIndex(0);
        }}
        onWorldQuiz={() => {
          window.location.href =
            quizPath;
        }}
      />
    );
  }

  const completeMission = () => {
    setMissionIndex(
      (current) =>
        current + 1,
    );
  };

  if (
    mission.kind ===
    "visual-addition"
  ) {
    return (
      <Lesson51VisualAdditionExerciseV2
        key={missionIndex}
        items={
          mission.items as
            typeof lesson51Exercise2
        }
        audio_base={AUDIO_BASE}
        missionTitle={mission.title}
        onComplete={
          completeMission
        }
      />
    );
  }

  return (
    <Lesson51BilanExerciseV2
      key={missionIndex}
      items={mission.items as any}
      audio_base={AUDIO_BASE}
      missionTitle={mission.title}
      onComplete={
        completeMission
      }
    />
  );
}
