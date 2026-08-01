import {
  useNavigate,
} from "react-router-dom";

import WorldIntroSceneV2
  from "../features/exercises/templates/WorldIntroSceneV2";

import lesson48
  from "../features/lesson-v2/content/lesson48";

export default function
Lesson48Page() {
  const navigate =
    useNavigate();

  return (
    <WorldIntroSceneV2
      audio_base={
        lesson48.audio_base
      }
      slides={
        lesson48.slides as any
      }
      onDone={() => navigate("/lesson-v2/lesson48/exercises")}
    />
  );
}
