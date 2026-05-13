import { supabase } from "../lib/supabaseClient";

export async function createExercise({
  title,
  subject,
  grade,
  question,
  options,
  correctAnswer,
}) {
  const { data, error } = await supabase
    .from("exercises")
    .insert([
      {
        title,
        subject,
        grade: Number(grade),
        question,
        options,
        correct_answer: correctAnswer,
      },
    ])
    .select();

  return { data, error };
}

export async function getExercises() {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET EXERCISES ERROR:", error);
    return [];
  }

  return data;
}

export async function getExercisesByGradeAndSubject(grade, subject) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("grade", Number(grade))
    .eq("subject", subject)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function getExerciseById(id) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function deleteExercise(id) {
  const { error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", id);

  return { error };
}
