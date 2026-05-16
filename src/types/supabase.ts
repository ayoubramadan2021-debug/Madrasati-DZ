export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: string | null;
          grade: number | null;
          age: number | null;
          birth_place: string | null;
          birth_date: string | null;
          points: number | null;
          created_at: string | null;
        };

        Insert: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: string | null;
          grade?: number | null;
          age?: number | null;
          birth_place?: string | null;
          birth_date?: string | null;
          points?: number | null;
          created_at?: string | null;
        };

        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: string | null;
          grade?: number | null;
          age?: number | null;
          birth_place?: string | null;
          birth_date?: string | null;
          points?: number | null;
          created_at?: string | null;
        };
      };

      lessons: {
        Row: {
          id: string;
          title: string;
          subject: string;
          grade: number;
          content: string | null;
          created_at: string | null;
        };

        Insert: {
          id?: string;
          title: string;
          subject: string;
          grade: number;
          content?: string | null;
          created_at?: string | null;
        };

        Update: {
          id?: string;
          title?: string;
          subject?: string;
          grade?: number;
          content?: string | null;
          created_at?: string | null;
        };
      };

      exercises: {
        Row: {
          id: string;
          lesson_id: string | null;
          question: string;
          answer: string;
          created_at: string | null;
        };

        Insert: {
          id?: string;
          lesson_id?: string | null;
          question: string;
          answer: string;
          created_at?: string | null;
        };

        Update: {
          id?: string;
          lesson_id?: string | null;
          question?: string;
          answer?: string;
          created_at?: string | null;
        };
      };

      progress: {
        Row: {
          id: string;
          profile_id: string | null;
          lesson_id: string | null;
          exercise_id: string | null;
          completed: boolean | null;
          points: number | null;
          created_at: string | null;
        };

        Insert: {
          id?: string;
          profile_id?: string | null;
          lesson_id?: string | null;
          exercise_id?: string | null;
          completed?: boolean | null;
          points?: number | null;
          created_at?: string | null;
        };

        Update: {
          id?: string;
          profile_id?: string | null;
          lesson_id?: string | null;
          exercise_id?: string | null;
          completed?: boolean | null;
          points?: number | null;
          created_at?: string | null;
        };
      };
    };
  };
}
