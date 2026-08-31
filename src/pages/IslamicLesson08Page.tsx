import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import islamicLesson08 from "../features/lesson-v2/content/islamic/lesson08";

export default function IslamicLesson08Page() {
  const navigate = useNavigate();
  return <WorldIntroSceneV2 slides={islamicLesson08.slides} audio_base={islamicLesson08.audio_base} onDone={() => navigate(islamicLesson08.exercisePath)} />;
}
