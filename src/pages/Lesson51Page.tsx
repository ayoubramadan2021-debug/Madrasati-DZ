import WorldIntroSceneV2 from
  "../features/exercises/templates/WorldIntroSceneV2";

import {
  lesson51,
} from "../features/lesson-v2/content/lesson51";

export default function Lesson51Page() {
  return (
    <WorldIntroSceneV2
      audio_base={lesson51.audio_base}
      slides={lesson51.slides}
      karaoke_lead_ms={180}
      onDone={() => {
        window.location.href =
          "/lesson-v2/51/exercises";
      }}
    />
  );
}
