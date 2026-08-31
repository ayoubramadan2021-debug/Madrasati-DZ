import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import civicsLesson09 from "../features/lesson-v2/content/civics/lesson09";

export default function CivicsLesson09Page() {
  const navigate = useNavigate();
  return <WorldIntroSceneV2 slides={civicsLesson09.slides} audio_base={civicsLesson09.audio_base} onDone={() => navigate(civicsLesson09.exercisePath)} />;
}
