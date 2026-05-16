import { z } from "zod";

export const exerciseSchema = z.object({
  title: z.string().min(3, "عنوان التمرين قصير جدًا"),
  subject: z.string().min(1, "المادة مطلوبة"),
  grade: z.coerce.number().min(1).max(5),
  question: z.string().min(5, "السؤال قصير جدًا"),
  options: z.array(z.string()).min(2),
  correctAnswer: z.string().min(1, "الإجابة الصحيحة مطلوبة"),
});
