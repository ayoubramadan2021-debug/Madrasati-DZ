import {
  useState,
} from "react";

import LessonCompleteV2 from
  "../features/lesson-v2/components/LessonCompleteV2";

import FoodSourcesExerciseV2 from
  "../features/lesson-v2/exercises-v2/FoodSourcesExerciseV2";

import {
  lesson49Exercise1,
} from "../features/lesson-v2/content/lesson49_exercise1";

import {
  lesson49Exercise2,
} from "../features/lesson-v2/content/lesson49_exercise2";

import {
  lesson49Exercise3,
} from "../features/lesson-v2/content/lesson49_exercise3";

import {
  lesson49Exercise4,
} from "../features/lesson-v2/content/lesson49_exercise4";

const AUDIO_BASE =
  "/audio/teachers/taline/lesson_49_food_sources/exercises";

const WORLD_ID =
  "5daed3bb-7e62-4a5a-93a1-f6dec60df810";

const missions = [
  {
    title:
      "المَهَمَّةُ الأُولَى: أُحَدِّدُ مَصْدَرَ الْغِذَاءِ",
    items: lesson49Exercise1,
  },

  {
    title:
      "المَهَمَّةُ الثَّانِيَةُ: أُصَنِّفُ الْأَغْذِيَةَ",
    items: lesson49Exercise2,
  },

  {
    title:
      "المَهَمَّةُ الثَّالِثَةُ: أَخْتَارُ الْوَجْبَةَ الصِّحِّيَّةَ",
    items: lesson49Exercise3,
  },

  {
    title:
      "المَهَمَّةُ الرَّابِعَةُ: أُكَوِّنُ وَجْبَةً مُتَوَازِنَةً",
    items: lesson49Exercise4,
  },
] as const;

const LessonComplete =
  LessonCompleteV2 as any;

export default function Lesson49ExercisesPage() {
  const [missionIndex, setMissionIndex] =
    useState(0);

  const mission =
    missions[missionIndex];

  if (!mission) {
    const nextPath =
      "/world2-lesson/50";

    const quizPath =
      `/world/${WORLD_ID}/quiz`;

    return (
      <LessonComplete
        title="أَحْسَنْتَ يَا بَطَلُ!"
        subtitle="أَتْمَمْتَ تَمَارِينَ مَصَادِرِ الْأَغْذِيَةِ وَالْوَجْبَةِ الصِّحِّيَّةِ."
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
    <FoodSourcesExerciseV2
      key={missionIndex}
      items={mission.items}
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
