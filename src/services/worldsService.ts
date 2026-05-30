import { supabase } from "../lib/supabaseClient";

// جلب عوالم مادة/سنة معيّنة، مرتّبة، المنشورة فقط
export async function getWorlds(subject: string, grade: number) {
  const { data, error } = await supabase
    .from("worlds")
    .select("*")
    .eq("subject", subject)
    .eq("grade", grade)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

// جلب عالم واحد بمعرّفه
export async function getWorldById(id: string) {
  const { data, error } = await supabase
    .from("worlds")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// جلب دروس عالم معيّن، مرتّبة
export async function getWorldLessons(world_id: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("world_id", world_id)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

// جلب اختبار عالم معيّن (المنشور)
export async function getWorldQuiz(world_id: string) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("world_id", world_id)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}
