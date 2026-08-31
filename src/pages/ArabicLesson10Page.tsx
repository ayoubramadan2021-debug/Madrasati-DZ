import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson10 from "../features/lesson-v2/content/arabic/lesson10";

export default function ArabicLesson10Page() {
  const navigate = useNavigate();
  return <WorldIntroSceneV2 slides={arabicLesson10.slides} audio_base={arabicLesson10.audio_base} onDone={() => navigate(arabicLesson10.exercisePath)} />;
}
