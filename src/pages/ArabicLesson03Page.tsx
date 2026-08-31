import { useNavigate } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import arabicLesson03 from "../features/lesson-v2/content/arabic/lesson03";

export default function ArabicLesson03Page() {
  const navigate = useNavigate();

  return (
    <WorldIntroSceneV2
      slides={arabicLesson03.slides}
      audio_base={arabicLesson03.audio_base}
      onDone={() => navigate(arabicLesson03.exercisePath)}
    />
  );
}
