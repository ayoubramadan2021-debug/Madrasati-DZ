import { supabase } from "../lib/supabaseClient";

export async function saveProgress(
  profile_id: string,
  lesson_id: string,
  exercise_id: string,
  points: number,
  completed: boolean
) {
  const { data, error } = await supabase
    .from("progress")
    .insert([
      {
        profile_id,
        lesson_id,
        exercise_id,
        points,
        completed,
      },
    ]);

  if (error) throw error;

  return data;
}

export async function getProgress(profile_id: string) {
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("profile_id", profile_id);

  if (error) throw error;

  return data;
}
