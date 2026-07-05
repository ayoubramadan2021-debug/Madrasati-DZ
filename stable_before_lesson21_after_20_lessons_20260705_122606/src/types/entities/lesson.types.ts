export type Lesson = {
  id: string;
  title: string;
  content?: string | null;
  subject?: string | null;
  grade?: number | null;
  created_at?: string | null;
};

export type CreateLessonInput = {
  title: string;
  content?: string;
  subject?: string;
  grade?: number;
};

export type UpdateLessonInput = Partial<CreateLessonInput>;
