import { supabase } from "../lib/supabaseClient";

export const api = {
  auth: {
    session: () => supabase.auth.getSession(),
  },

  profile: {
    get: (id: string) =>
      supabase.from("profiles").select("*").eq("id", id).single(),
  },

  progress: {
    getByUser: (userId: string) =>
      supabase.from("progress").select("*").eq("profile_id", userId),
  },

  lessons: {
    getBySubject: (subjectId: string) =>
      supabase.from("lessons").select("*").eq("subject_id", subjectId),
  },

  exercises: {
    getByLesson: (lessonId: string) =>
      supabase.from("exercises").select("*").eq("lesson_id", lessonId),
  },

  quizzes: {
    getByLesson: (lessonId: string) =>
      supabase.from("quizzes").select("*").eq("lesson_id", lessonId),
  },
};
