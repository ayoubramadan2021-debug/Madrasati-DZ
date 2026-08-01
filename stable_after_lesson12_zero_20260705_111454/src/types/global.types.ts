export type Grade = 1 | 2 | 3 | 4 | 5;

export type Subject =
  | "arabic"
  | "math"
  | "french"
  | "islamic"
  | "civic"
  | "science"
  | "history"
  | "geography";

export type UserRole = "student" | "parent" | "teacher" | "admin";

export interface Student {
  id: string;
  name: string;
  grade: Grade;
  points: number;
  role: UserRole;
  created_at?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  subject?: Subject;
  grade?: Grade;
}

export interface Exercise {
  id: string;
  lesson_id?: string;
  question: string;
  answer: string;
  points?: number;
}

export interface Progress {
  id: string;
  profile_id: string;
  lesson_id?: string;
  exercise_id?: string;
  points: number;
  completed: boolean;
}

export interface Favorite {
  id: string;
  profile_id: string;
  lesson_id?: string;
  created_at?: string;
}

export interface AppNotification {
  id: string;
  profile_id?: string;
  title: string;
  message: string;
  read?: boolean;
  created_at?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  grade: Grade;
  points: number;
}
