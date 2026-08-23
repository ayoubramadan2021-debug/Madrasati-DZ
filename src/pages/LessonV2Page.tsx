import { useEffect } from "react";
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
import { LESSON_31_CONTENT } from "../features/lesson-v2/content/lesson31";

import { LESSON_32_CONTENT } from "../features/lesson-v2/content/lesson32";

import { lesson53 as LESSON_53_CONTENT } from "../features/lesson-v2/content/lesson53";
import { lesson54 as LESSON_54_CONTENT } from "../features/lesson-v2/content/lesson54";
import { lesson55 as LESSON_55_CONTENT } from "../features/lesson-v2/content/lesson55";
import { lesson56 as LESSON_56_CONTENT } from "../features/lesson-v2/content/lesson56";
import { lesson57 as LESSON_57_CONTENT } from "../features/lesson-v2/content/lesson57";
import { lesson58 as LESSON_58_CONTENT } from "../features/lesson-v2/content/lesson58";
import { lesson59 as LESSON_59_CONTENT } from "../features/lesson-v2/content/lesson59";
import { lesson60 as LESSON_60_CONTENT } from "../features/lesson-v2/content/lesson60";
import { lesson61 as LESSON_61_CONTENT } from "../features/lesson-v2/content/lesson61";
import { lesson62 as LESSON_62_CONTENT } from "../features/lesson-v2/content/lesson62";
import { lesson63 as LESSON_63_CONTENT } from "../features/lesson-v2/content/lesson63";
import { lesson64 as LESSON_64_CONTENT } from "../features/lesson-v2/content/lesson64";
import { lesson65 as LESSON_65_CONTENT } from "../features/lesson-v2/content/lesson65";
import { lesson66 as LESSON_66_CONTENT } from "../features/lesson-v2/content/lesson66";
import { lesson67 as LESSON_67_CONTENT } from "../features/lesson-v2/content/lesson67";
import { lesson68 as LESSON_68_CONTENT } from "../features/lesson-v2/content/lesson68";
import { lesson69 as LESSON_69_CONTENT } from "../features/lesson-v2/content/lesson69";
import { lesson70 as LESSON_70_CONTENT } from "../features/lesson-v2/content/lesson70";
import { lesson71 as LESSON_71_CONTENT } from "../features/lesson-v2/content/lesson71";
import { lesson72 as LESSON_72_CONTENT } from "../features/lesson-v2/content/lesson72";
import { lesson73 as LESSON_73_CONTENT } from "../features/lesson-v2/content/lesson73";
import { lesson74 as LESSON_74_CONTENT } from "../features/lesson-v2/content/lesson74";
import { lesson75 as LESSON_75_CONTENT } from "../features/lesson-v2/content/lesson75";
import { lesson76 as LESSON_76_CONTENT } from "../features/lesson-v2/content/lesson76";
import { lesson77 as LESSON_77_CONTENT } from "../features/lesson-v2/content/lesson77";
import { lesson78 as LESSON_78_CONTENT } from "../features/lesson-v2/content/lesson78";
import { lesson79 as LESSON_79_CONTENT } from "../features/lesson-v2/content/lesson79";
import { lesson80 as LESSON_80_CONTENT } from "../features/lesson-v2/content/lesson80";
import { lesson81 as LESSON_81_CONTENT } from "../features/lesson-v2/content/lesson81";
import { lesson82 as LESSON_82_CONTENT } from "../features/lesson-v2/content/lesson82";
import { lesson83 as LESSON_83_CONTENT } from "../features/lesson-v2/content/lesson83";
import { lesson84 as LESSON_84_CONTENT } from "../features/lesson-v2/content/lesson84";
import { lesson85 as LESSON_85_CONTENT } from "../features/lesson-v2/content/lesson85";
import LESSON_86_CONTENT from "../features/lesson-v2/content/lesson86";


import LESSON_87_CONTENT from "../features/lesson-v2/content/lesson87";
import LESSON_88_CONTENT from "../features/lesson-v2/content/lesson88";
import LESSON_89_CONTENT from "../features/lesson-v2/content/lesson89";
import LESSON_90_CONTENT from "../features/lesson-v2/content/lesson90";
import LESSON_91_CONTENT from "../features/lesson-v2/content/lesson91";
import LESSON_92_CONTENT from "../features/lesson-v2/content/lesson92";
import LESSON_93_CONTENT from "../features/lesson-v2/content/lesson93";
import LESSON_94_CONTENT from "../features/lesson-v2/content/lesson94";
import LESSON_95_CONTENT from "../features/lesson-v2/content/lesson95";
import LESSON_96_CONTENT from "../features/lesson-v2/content/lesson96";
import LESSON_97_CONTENT from "../features/lesson-v2/content/lesson97";
import LESSON_98_CONTENT from "../features/lesson-v2/content/lesson98";
import LESSON_99_CONTENT from "../features/lesson-v2/content/lesson99";
import LESSON_100_CONTENT from "../features/lesson-v2/content/lesson100";
import LESSON_101_CONTENT from "../features/lesson-v2/content/lesson101";
import LESSON_102_CONTENT from "../features/lesson-v2/content/lesson102";
import LESSON_103_CONTENT from "../features/lesson-v2/content/lesson103";
import LESSON_104_CONTENT from "../features/lesson-v2/content/lesson104";
import LESSON_105_CONTENT from "../features/lesson-v2/content/lesson105";
import LESSON_106_CONTENT from "../features/lesson-v2/content/lesson106";
import LESSON_107_CONTENT from "../features/lesson-v2/content/lesson107";
import LESSON_108_CONTENT from "../features/lesson-v2/content/lesson108";
import LESSON_109_CONTENT from "../features/lesson-v2/content/lesson109";
import LESSON_110_CONTENT from "../features/lesson-v2/content/lesson110";
import LESSON_111_CONTENT from "../features/lesson-v2/content/lesson111";
import LESSON_112_CONTENT from "../features/lesson-v2/content/lesson112";
import LESSON_113_CONTENT from "../features/lesson-v2/content/lesson113";
import LESSON_114_CONTENT from "../features/lesson-v2/content/lesson114";
import LESSON_115_CONTENT from "../features/lesson-v2/content/lesson115";
import LESSON_116_CONTENT from "../features/lesson-v2/content/lesson116";

type LessonV2ContentEntry = {
  audio_base: string;
  scenes?: unknown;
  slides?: unknown;
};

const LESSONS_MAP: Record<string, LessonV2ContentEntry> = {
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
  lesson31: LESSON_31_CONTENT,
  lesson32: LESSON_32_CONTENT,

  lesson53: LESSON_53_CONTENT,
  lesson54: LESSON_54_CONTENT,
  lesson55: LESSON_55_CONTENT,
  lesson56: LESSON_56_CONTENT,
  lesson57: LESSON_57_CONTENT,
  lesson58: LESSON_58_CONTENT,
  lesson59: LESSON_59_CONTENT,
  lesson60: LESSON_60_CONTENT,
  lesson61: LESSON_61_CONTENT,
  lesson62: LESSON_62_CONTENT,
  lesson63: LESSON_63_CONTENT,

  lesson64: LESSON_64_CONTENT,
  lesson65: LESSON_65_CONTENT,
  lesson66: LESSON_66_CONTENT,
  lesson67: LESSON_67_CONTENT,
  lesson68: LESSON_68_CONTENT,
  lesson69: LESSON_69_CONTENT,
  lesson70: LESSON_70_CONTENT,
  lesson71: LESSON_71_CONTENT,
  lesson72: LESSON_72_CONTENT,
  lesson73: LESSON_73_CONTENT,
  lesson74: LESSON_74_CONTENT,
  lesson75: LESSON_75_CONTENT,
  lesson76: LESSON_76_CONTENT,
  lesson77: LESSON_77_CONTENT,
  lesson78: LESSON_78_CONTENT,
  lesson79: LESSON_79_CONTENT,
  lesson80: LESSON_80_CONTENT,
  lesson81: LESSON_81_CONTENT,
  lesson82: LESSON_82_CONTENT,
  lesson83: LESSON_83_CONTENT,
  lesson84: LESSON_84_CONTENT,
  lesson85: LESSON_85_CONTENT,
  lesson87: LESSON_87_CONTENT,
  lesson88: LESSON_88_CONTENT,
  lesson89: LESSON_89_CONTENT,
  lesson90: LESSON_90_CONTENT,
  lesson91: LESSON_91_CONTENT,
  lesson92: LESSON_92_CONTENT,
  lesson93: LESSON_93_CONTENT,
  lesson94: LESSON_94_CONTENT,
  lesson95: LESSON_95_CONTENT,
  lesson96: LESSON_96_CONTENT,
  lesson97: LESSON_97_CONTENT,
  lesson98: LESSON_98_CONTENT,
  lesson99: LESSON_99_CONTENT,
  lesson100: LESSON_100_CONTENT,
  lesson101: LESSON_101_CONTENT,
  lesson102: LESSON_102_CONTENT,
  lesson103: LESSON_103_CONTENT,
  lesson104: LESSON_104_CONTENT,
  lesson105: LESSON_105_CONTENT,
  lesson106: LESSON_106_CONTENT,
  lesson107: LESSON_107_CONTENT,
  lesson108: LESSON_108_CONTENT,
  lesson109: LESSON_109_CONTENT,
  lesson110: LESSON_110_CONTENT,
  lesson111: LESSON_111_CONTENT,
  lesson112: LESSON_112_CONTENT,
  lesson113: LESSON_113_CONTENT,
  lesson114: LESSON_114_CONTENT,
  lesson115: LESSON_115_CONTENT,
  lesson116: LESSON_116_CONTENT,
  lesson86: LESSON_86_CONTENT,
};

export default function LessonV2Page() {
const navigate = useNavigate();
  const { lessonId } = useParams();

  const normalizedLessonKey =
    lessonId && /^\d+$/.test(lessonId)
      ? `lesson${lessonId}`
      : lessonId;

  const lesson =
    ((normalizedLessonKey &&
      LESSONS_MAP[normalizedLessonKey]) ||
    LESSON_1_CONTENT);

  const exerciseLessonId =
    normalizedLessonKey?.replace(
      /^lesson/,
      "",
    );

  const lessonScenes =
    (lesson as any).scenes ??
    (lesson as any).slides ??
    [];

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
      : navigate(`/lesson-v2/${exerciseLessonId}/exercises`);
  };

  return (
    <WorldIntroSceneV2
      audio_base={lesson.audio_base}
      slides={lessonScenes}
      onDone={handleDone}
    />
  );
}
