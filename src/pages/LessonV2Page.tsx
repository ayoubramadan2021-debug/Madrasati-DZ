import { useNavigate, useParams } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import { LESSON_1_CONTENT } from "../features/lesson-v2/content/lesson1";

export default function LessonV2Page() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const lesson = LESSON_1_CONTENT;

  const handleDone = () => {
    if (lessonId) {
      navigate(`/lesson/${lessonId}/exercises`);
    } else {
      navigate(-1);
    }
  };

  return (
    <WorldIntroSceneV2
      audio_base={lesson.audio_base}
      slides={lesson.scenes}
      onDone={handleDone}
    />
  );
}
