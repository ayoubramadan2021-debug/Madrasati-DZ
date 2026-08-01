import WorldIntroSceneV2 from
  "../features/exercises/templates/WorldIntroSceneV2";

import {
  lesson52,
} from "../features/lesson-v2/content/lesson52";

export default function Lesson52Page() {
  const openExercises = () => {
    window.location.href =
      "/lesson-v2/52/exercises?from=lesson52";
  };

  return (
    <WorldIntroSceneV2
      audio_base={lesson52.audio_base}
      slides={lesson52.slides}
      karaoke_lead_ms={180}
      onDone={openExercises}
    />
  );
}
