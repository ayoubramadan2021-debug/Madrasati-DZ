import type { AppTheme } from "./theme.types";

export type PageProps = {
  theme: AppTheme;
  setThemeName: (themeName: string) => void;
};

export type BasicUser = {
  id: string;
  email?: string;
};

export type BasicProfile = {
  id?: string;
  full_name?: string;
  name?: string;
  email?: string;
  grade?: number;
  age?: number;
  birth_place?: string;
  points?: number;
  total_points?: number;
};

export type BasicProgress = {
  id?: string;
  lesson_id?: string;
  lesson_title?: string;
  completed?: boolean;
  points?: number;
};

export type ParentStudent = {
  id?: string;
  name?: string;
  full_name?: string;
  email?: string;
  grade?: number;
  points?: number;
  lessons?: number;
  exercises?: number;
  quizzes?: number;
  progress: BasicProgress[];
};
