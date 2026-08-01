import WorldIntroSceneV2 from
  "../features/exercises/templates/WorldIntroSceneV2";

import {
  lesson50,
} from "../features/lesson-v2/content/lesson50";

export default function Lesson50Page() {
  return (
    <WorldIntroSceneV2
      audio_base={lesson50.audio_base}
      slides={lesson50.slides}
      karaoke_lead_ms={180}
      onDone={() => {
        window.location.href =
          "/lesson-v2/50/exercises";
      }}
    />
  );
}
