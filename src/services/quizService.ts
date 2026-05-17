import { supabase } from "../lib/supabaseClient";
import { saveProgress } from "./progressService";

export async function getQuizzes(lesson_id: string) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", lesson_id);

  if (error) throw error;
  return data;
}

export async function submitQuiz(
  profile_id: string,
  lesson_id: string,
  quiz_id: string,
  answer: string,
  correct_answer: string
) {
  const correct = answer === correct_answer;
  const points = correct ? 15 : 0;

  await saveProgress(
    profile_id,
    lesson_id,
    quiz_id,
    points,
    correct
  );

  return { correct, points };
}
