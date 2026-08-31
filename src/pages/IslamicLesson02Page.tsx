import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import islamicLesson02 from "../features/lesson-v2/content/islamic/lesson02";

export default function IslamicLesson02Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={islamicLesson02.slides}
      audio_base={islamicLesson02.audio_base}
      onDone={() => navigate(islamicLesson02.exercisePath)}
    />
  );
}
