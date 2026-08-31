import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import islamicLesson06 from "../features/lesson-v2/content/islamic/lesson06";

export default function IslamicLesson06Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={islamicLesson06.slides}
      audio_base={islamicLesson06.audio_base}
      onDone={() =>
        navigate(islamicLesson06.exercisePath)
      }
    />
  );
}
