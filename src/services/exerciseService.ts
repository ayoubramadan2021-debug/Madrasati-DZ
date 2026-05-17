import { supabase } from "../lib/supabaseClient";
import { saveProgress } from "./progressService";

export async function getExercises(lesson_id: string) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson_id", lesson_id);

  if (error) throw error;

  return data;
}

export async function submitExercise(
  profile_id: string,
  lesson_id: string,
  exercise_id: string,
  userAnswer: string,
  correctAnswer: string
) {
  const correct = userAnswer.trim() === correctAnswer.trim();
  const points = correct ? 10 : 0;

  await saveProgress(
    profile_id,
    lesson_id,
    exercise_id,
    points,
    correct
  );

  return { correct, points };
}
