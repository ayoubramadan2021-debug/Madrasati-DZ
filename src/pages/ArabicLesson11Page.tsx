import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson11 from "../features/lesson-v2/content/arabic/lesson11";

export default function ArabicLesson11Page() {
  const navigate = useNavigate();
  return <WorldIntroSceneV2 slides={arabicLesson11.slides} audio_base={arabicLesson11.audio_base} onDone={() => navigate(arabicLesson11.exercisePath)} />;
}
