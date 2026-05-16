export type Exercise = {
  id: string;
  title?: string | null;
  subject?: string | null;
  grade?: number | null;
  question: string;
  options?: string[] | null;
  correct_answer?: string | null;
  lesson_id?: string | null;
  created_at?: string | null;
};

export type CreateExerciseInput = {
  title?: string;
  subject?: string;
  grade?: number;
  question: string;
  options?: string[];
  correctAnswer?: string;
};

export type UpdateExerciseInput = Partial<CreateExerciseInput>;
