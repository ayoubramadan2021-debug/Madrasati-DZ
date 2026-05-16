export type Progress = {
  id?: string;
  profile_id?: string;
  lesson_id?: string | null;
  exercise_id?: string | null;
  lesson_title?: string;
  completed?: boolean | null;
  points?: number | null;
  created_at?: string | null;
};

export type SaveProgressInput = {
  userId: string;
  lessonId: string;
  points: number;
};
