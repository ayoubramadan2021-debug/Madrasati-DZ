import WorldIntroSceneV2 from
  "../features/exercises/templates/WorldIntroSceneV2";

import {
  lesson49,
} from "../features/lesson-v2/content/lesson49";

export default function Lesson49Page() {
  return (
    <WorldIntroSceneV2
      audio_base={lesson49.audio_base}
      slides={lesson49.slides}
      karaoke_lead_ms={180}
      onDone={() => {
        window.location.href =
          "/lesson-v2/49/exercises";
      }}
    />
  );
}
