/*
 * واجهة تمارين الدرس 31 موحّدة مع الواجهة الناجحة للدرس 32.
 * محركات الدرس 31 وبياناته تبقى مستقلة، بينما منطق:
 * - الكاريوكي التدريجي
 * - الكلمة الذهبية
 * - 🌟 أَحْسَنْتَ!
 * - حَاوِلْ مَرَّةً أُخْرَى ✨
 * - الاحتفال وشريط الإرشاد
 * يُستخدم حرفيًا من النظام الموحّد الناجح.
 */

export {
  Lesson32ExerciseFrame as Lesson31ExerciseFrame,
  lesson32Styles as lesson31Styles,
  playLesson32Feedback as playExerciseFeedback,
} from "../lesson32/Lesson32ExerciseUI";

export type {
  Lesson32FeedbackState as Lesson31FeedbackState,
} from "../lesson32/Lesson32ExerciseUI";
