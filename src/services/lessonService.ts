import { supabase } from "../lib/supabaseClient";

export async function getLessons(subject_id: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("subject_id", subject_id);

  if (error) throw error;

  return data;
}
