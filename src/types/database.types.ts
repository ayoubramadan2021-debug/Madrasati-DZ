export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          points: number | null;
          total_points: number | null;
          grade: number | null;
          role: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          points?: number | null;
          total_points?: number | null;
          grade?: number | null;
          role?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          points?: number | null;
          total_points?: number | null;
          grade?: number | null;
          role?: string | null;
          created_at?: string | null;
        };
      };

      lessons: {
        Row: {
          id: string;
          title: string;
          content: string | null;
          subject: string | null;
          grade: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          content?: string | null;
          subject?: string | null;
          grade?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string | null;
          subject?: string | null;
          grade?: number | null;
          created_at?: string | null;
        };
      };

      exercises: {
        Row: {
          id: string;
          title: string | null;
          subject: string | null;
          grade: number | null;
          question: string;
          options: Json | null;
          correct_answer: string | null;
          lesson_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title?: string | null;
          subject?: string | null;
          grade?: number | null;
          question: string;
          options?: Json | null;
          correct_answer?: string | null;
          lesson_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          subject?: string | null;
          grade?: number | null;
          question?: string;
          options?: Json | null;
          correct_answer?: string | null;
          lesson_id?: string | null;
          created_at?: string | null;
        };
      };

      favorites: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          item_type: string;
          title: string;
          subject: string | null;
          grade: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          item_type: string;
          title: string;
          subject?: string | null;
          grade?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_id?: string;
          item_type?: string;
          title?: string;
          subject?: string | null;
          grade?: number | null;
          created_at?: string | null;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          is_read: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body: string;
          is_read?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string;
          is_read?: boolean | null;
          created_at?: string | null;
        };
      };

      progress: {
        Row: {
          id: string;
          profile_id: string;
          lesson_id: string | null;
          exercise_id: string | null;
          completed: boolean | null;
          points: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id: string;
          lesson_id?: string | null;
          exercise_id?: string | null;
          completed?: boolean | null;
          points?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          profile_id?: string;
          lesson_id?: string | null;
          exercise_id?: string | null;
          completed?: boolean | null;
          points?: number | null;
          created_at?: string | null;
        };
      };
    };
  };
};
