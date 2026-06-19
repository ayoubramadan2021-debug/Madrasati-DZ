import { useNavigate, useParams } from "react-router-dom";
import WorldIntroSceneV2 from "../features/exercises/templates/WorldIntroSceneV2";
import { LESSON_1_CONTENT } from "../features/lesson-v2/content/lesson1";
import { LESSON_2_CONTENT } from "../features/lesson-v2/content/lesson2";
import { LESSON_3_CONTENT } from "../features/lesson-v2/content/lesson3";
import { LESSON_4_CONTENT } from "../features/lesson-v2/content/lesson4";
import { LESSON_5_CONTENT } from "../features/lesson-v2/content/lesson5";
import { LESSON_6_CONTENT } from "../features/lesson-v2/content/lesson6";
import { LESSON_7_CONTENT } from "../features/lesson-v2/content/lesson7";
import { LESSON_8_CONTENT } from "../features/lesson-v2/content/lesson8";
import { LESSON_9_CONTENT } from "../features/lesson-v2/content/lesson9";
import { LESSON_10_CONTENT } from "../features/lesson-v2/content/lesson10";

/**
 * LessonV2Page — صفحة الدرس الديناميكية
 * 
 * يحدّد الدرس من lessonId في الـURL:
 *   /lesson-v2/lesson1  → الأعداد 1-5
 *   /lesson-v2/lesson2  → بيت تالين (المواقع)
 *   /lesson-v2          → الدرس 1 (افتراضي)
 */

const LESSONS_MAP: Record<string, typeof LESSON_1_CONTENT> = {
  lesson1: LESSON_1_CONTENT,
  lesson2: LESSON_2_CONTENT,
  lesson3: LESSON_3_CONTENT,
  lesson4: LESSON_4_CONTENT,
  lesson5: LESSON_5_CONTENT,
  lesson6: LESSON_6_CONTENT,
  lesson7: LESSON_7_CONTENT,
  lesson8: LESSON_8_CONTENT,
  lesson9: LESSON_9_CONTENT,
  lesson10: LESSON_10_CONTENT,
};

export default function LessonV2Page() {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  // اختر الدرس من الـURL، أو الدرس 1 افتراضياً
  const lesson = (lessonId && LESSONS_MAP[lessonId]) || LESSON_1_CONTENT;

  const handleDone = () => {
    // عند انتهاء الدرس، انتقل لتمارينه
    if (lessonId) {
      lessonId === "lesson2" ? navigate("/lesson2-exercises") : lessonId === "lesson3" ? navigate("/lesson3-exercises") : lessonId === "lesson4" ? navigate("/lesson4-exercises") : lessonId === "lesson5" ? navigate("/lesson5-exercises") : lessonId === "lesson6" ? navigate("/lesson6-exercises") : lessonId === "lesson7" ? navigate("/lesson7-exercises") : lessonId === "lesson8" ? navigate("/lesson8-exercises") : lessonId === "lesson9" ? navigate("/lesson9-exercises") : lessonId === "lesson10" ? navigate("/lesson10-exercises") : navigate(`/lesson-v2/${lessonId}/exercises`);
    } else {
      navigate("/lesson-exercises");
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
