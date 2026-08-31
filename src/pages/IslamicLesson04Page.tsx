import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import islamicLesson04 from "../features/lesson-v2/content/islamic/lesson04";

export default function IslamicLesson04Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={islamicLesson04.slides}
      audio_base={islamicLesson04.audio_base}
      onDone={() => navigate(islamicLesson04.exercisePath)}
    />
  );
}
