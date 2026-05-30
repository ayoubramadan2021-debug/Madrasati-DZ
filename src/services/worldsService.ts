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

// جلب تقدّم العوالم للمستخدم الحالي
export async function getMyWorldProgress() {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) return [];
  const { data, error } = await supabase
    .from("world_progress")
    .select("world_id, status, best_score")
    .eq("user_id", uid);
  if (error) throw error;
  return data || [];
}

// تسجيل نجاح عالم: يكمله ويفتح التالي
export async function completeWorld(world_id: string, score: number, nextWorldId: string | null) {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth.user?.id;
  if (!uid) throw new Error("not authenticated");

  // العالم الحالي: مكتمل
  await supabase.from("world_progress").upsert({
    user_id: uid, world_id, status: "completed", best_score: score,
    completed_at: new Date().toISOString(),
  }, { onConflict: "user_id,world_id" });

  // العالم التالي: مفتوح
  if (nextWorldId) {
    await supabase.from("world_progress").upsert({
      user_id: uid, world_id: nextWorldId, status: "unlocked",
      unlocked_at: new Date().toISOString(),
    }, { onConflict: "user_id,world_id" });
  }
}
