import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson01 from "../features/lesson-v2/content/arabic/lesson01";

export default function ArabicLesson01Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={arabicLesson01.slides}
      audio_base={arabicLesson01.audio_base}
      onDone={() => navigate(arabicLesson01.exercisePath)}
    />
  );
}
