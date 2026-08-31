import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson07 from "../features/lesson-v2/content/arabic/lesson07";

export default function ArabicLesson07Page() {
  const navigate = useNavigate();
  return <WorldIntroSceneV2 slides={arabicLesson07.slides} audio_base={arabicLesson07.audio_base} onDone={() => navigate(arabicLesson07.exercisePath)} />;
}
