import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import Lesson50ReviewExerciseV2 from
  "../features/lesson-v2/exercises-v2/Lesson50ReviewExerciseV2";

import {
  lesson50Exercise1,
} from "../features/lesson-v2/content/lesson50_exercise1";

import {
  lesson50Exercise2,
} from "../features/lesson-v2/content/lesson50_exercise2";

import {
  lesson50Exercise3,
} from "../features/lesson-v2/content/lesson50_exercise3";

import {
  lesson50Exercise4,
} from "../features/lesson-v2/content/lesson50_exercise4";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_50_games_review/exercises";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const missions = [
  {
    title: "الْمَهَمَّةُ الْأُولَى: أَتَنَقَّلُ بِالْأَسْهُمِ",
    items: lesson50Exercise1,
  },
  {
    title: "الْمَهَمَّةُ الثَّانِيَةُ: أَكْتَشِفُ الضِّعْفَ وَالنِّصْفَ",
    items: lesson50Exercise2,
  },
  {
    title: "الْمَهَمَّةُ الثَّالِثَةُ: أَعُدُّ وَأُرَتِّبُ",
    items: lesson50Exercise3,
  },
  {
    title: "الْمَهَمَّةُ الرَّابِعَةُ: أُرَاقِبُ جِسْمِي بَعْدَ الْجُهْدِ",
    items: lesson50Exercise4,
  },
] as const;

const LessonComplete =
  LessonCompleteV2 as any;

export default function Lesson50ExercisesPage() {
  const [missionIndex, setMissionIndex] =
    useState(0);

  const mission =
    missions[missionIndex];

  if (!mission) {
    const nextPath =
      "/world2-lesson/51";

    const quizPath =
      `/world/${WORLD_ID}/quiz`;

    return (
      <LessonComplete
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle="أَتْمَمْتَ تَمَارِينَ تَجْنِيدِ الْمَعَارِفِ."
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

  return (
    <Lesson50ReviewExerciseV2
      key={missionIndex}
      items={mission.items as any}
      audio_base={AUDIO_BASE}
      missionTitle={mission.title}
      onComplete={() => {
        setMissionIndex(
          (current) => current + 1,
        );
      }}
    />
  );
}
