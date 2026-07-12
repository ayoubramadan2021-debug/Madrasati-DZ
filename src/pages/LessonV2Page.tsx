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
import { LESSON_11_CONTENT } from "../features/lesson-v2/content/lesson11";
import { LESSON_12_CONTENT } from "../features/lesson-v2/content/lesson12";
import { LESSON_13_CONTENT } from "../features/lesson-v2/content/lesson13";
import { LESSON_14_CONTENT } from "../features/lesson-v2/content/lesson14";
import { LESSON_15_CONTENT } from "../features/lesson-v2/content/lesson15";
import { LESSON_16_CONTENT } from "../features/lesson-v2/content/lesson16";
import { LESSON_17_CONTENT } from "../features/lesson-v2/content/lesson17";
import { LESSON_18_CONTENT } from "../features/lesson-v2/content/lesson18";
import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";
import { LESSON_20_CONTENT } from "../features/lesson-v2/content/lesson20";
import { LESSON_21_CONTENT } from "../features/lesson-v2/content/lesson21";
import { LESSON_22_CONTENT } from "../features/lesson-v2/content/lesson22";
import { LESSON_23_CONTENT } from "../features/lesson-v2/content/lesson23";
import { LESSON_24_CONTENT } from "../features/lesson-v2/content/lesson24";
import { LESSON_25_CONTENT } from "../features/lesson-v2/content/lesson25";
import { LESSON_26_CONTENT } from "../features/lesson-v2/content/lesson26";
import { LESSON_27_CONTENT } from "../features/lesson-v2/content/lesson27";
import { LESSON_28_CONTENT } from "../features/lesson-v2/content/lesson28";
import { LESSON_29_CONTENT } from "../features/lesson-v2/content/lesson29";
import { LESSON_30_CONTENT } from "../features/lesson-v2/content/lesson30";

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
  lesson11: LESSON_11_CONTENT,
  lesson12: LESSON_12_CONTENT,
  lesson13: LESSON_13_CONTENT,
  lesson14: LESSON_14_CONTENT,
  lesson15: LESSON_15_CONTENT,
  lesson16: LESSON_16_CONTENT,
  lesson17: LESSON_17_CONTENT,
  lesson18: LESSON_18_CONTENT,
  lesson19: LESSON_19_CONTENT,
  lesson20: LESSON_20_CONTENT,
  lesson21: LESSON_21_CONTENT,
  lesson22: LESSON_22_CONTENT,
  lesson23: LESSON_23_CONTENT,
  lesson24: LESSON_24_CONTENT,
  lesson25: LESSON_25_CONTENT,
  lesson26: LESSON_26_CONTENT,
  lesson27: LESSON_27_CONTENT,
  lesson28: LESSON_28_CONTENT,
  lesson29: LESSON_29_CONTENT,
  lesson30: LESSON_30_CONTENT,
};

export default function LessonV2Page() {
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const lesson = (lessonId && LESSONS_MAP[lessonId]) || LESSON_1_CONTENT;

  const handleDone = () => {
    lessonId === "lesson2" ? navigate("/lesson2-exercises")
      : lessonId === "lesson3" ? navigate("/lesson3-exercises")
      : lessonId === "lesson4" ? navigate("/lesson4-exercises")
      : lessonId === "lesson5" ? navigate("/lesson5-exercises")
      : lessonId === "lesson6" ? navigate("/lesson6-exercises")
      : lessonId === "lesson7" ? navigate("/lesson7-exercises")
      : lessonId === "lesson8" ? navigate("/lesson8-exercises")
      : lessonId === "lesson9" ? navigate("/lesson9-exercises")
      : lessonId === "lesson10" ? navigate("/lesson10-exercises")
      : lessonId === "lesson11" ? navigate("/lesson11-exercises")
      : lessonId === "lesson12" ? navigate("/lesson12-exercises")
      : lessonId === "lesson13" ? navigate("/lesson13-exercises")
      : lessonId === "lesson14" ? navigate("/lesson14-exercises")
      : lessonId === "lesson15" ? navigate("/lesson15-exercises")
      : lessonId === "lesson16" ? navigate("/lesson16-exercises")
      : lessonId === "lesson17" ? navigate("/lesson17-exercises")
      : lessonId === "lesson18" ? navigate("/lesson18-exercises")
      : lessonId === "lesson19" ? navigate("/lesson19-exercises")
      : lessonId === "lesson20" ? navigate("/lesson20-exercises")
      : lessonId === "lesson21" ? navigate("/lesson21-exercises")
      : lessonId === "lesson22"
      ? navigate("/lesson22-exercises")
      : lessonId === "lesson23"
      ? navigate("/lesson23-exercises")
      : lessonId === "lesson24"
      ? navigate("/lesson24-exercises")
      : navigate(`/lesson-v2/${lessonId}/exercises`);
  };

  return (
    <WorldIntroSceneV2
      audio_base={lesson.audio_base}
      slides={lesson.scenes}
      onDone={handleDone}
    />
  );
}
