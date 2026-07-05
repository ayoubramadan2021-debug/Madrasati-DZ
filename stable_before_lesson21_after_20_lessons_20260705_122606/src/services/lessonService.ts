import { supabase } from "../lib/supabaseClient";

export async function getLessons(subject: string, grade?: number) {
  let query = supabase.from("lessons").select("*").eq("subject", subject);
  if (grade !== undefined) query = query.eq("grade", grade);
  const { data, error } = await query.order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}
