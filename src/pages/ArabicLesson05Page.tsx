import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson05 from "../features/lesson-v2/content/arabic/lesson05";

export default function ArabicLesson05Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={arabicLesson05.slides}
      audio_base={arabicLesson05.audio_base}
      onDone={() => navigate(arabicLesson05.exercisePath)}
    />
  );
}
