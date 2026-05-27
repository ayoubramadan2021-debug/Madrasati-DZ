import { supabase } from "../lib/supabaseClient";

export async function getExercises(lesson_id: string) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("lesson_id", lesson_id);

  if (error) throw error;

  return data;
}

export async function getExercisesBySubject(
  subject: string,
  grade: number,
  page = 0,
  pageSize = 20
) {
  const from = page * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await supabase
    .from("exercises")
    .select("id, type, title, lesson_number, subject, grade", { count: "exact" })
    .eq("subject", subject)
    .eq("grade", grade)
    .eq("is_published", true)
    .order("lesson_number", { ascending: true })
    .range(from, to);
  if (error) throw error;
  const total = count ?? 0;
  return {
    items: data || [],
    total,
    page,
    pageSize,
    hasMore: from + (data?.length || 0) < total,
  };
}


export async function getExerciseById(id: string) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
