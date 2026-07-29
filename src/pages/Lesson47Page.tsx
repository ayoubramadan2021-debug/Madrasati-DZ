import {
  useNavigate,
} from "react-router-dom";

import WorldIntroSceneV2
  from "../features/exercises/templates/WorldIntroSceneV2";

import lesson47
  from "../features/lesson-v2/content/lesson47";

export default function
Lesson47Page() {
  const navigate =
    useNavigate();

  return (
    <WorldIntroSceneV2
      audio_base={
        lesson47.audio_base
      }
      slides={
        lesson47.slides as any
      }
      onDone={() =>
        navigate(
          lesson47.exercisePath,
        )
      }
    />
  );
}
