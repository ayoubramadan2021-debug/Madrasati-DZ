import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string().min(3, "عنوان الدرس يجب أن يحتوي على 3 أحرف على الأقل"),
  subject: z.string().min(1, "اختر المادة"),
  grade: z.coerce.number().min(1, "اختر السنة").max(5, "السنة غير صحيحة"),
  content: z.string().min(10, "محتوى الدرس يجب أن يحتوي على 10 أحرف على الأقل"),
});

export type LessonFormValues = z.infer<typeof lessonSchema>;
