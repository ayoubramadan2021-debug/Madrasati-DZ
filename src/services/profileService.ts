import { supabase } from "../lib/supabaseClient";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function upsertProfile(profile: any) {
  const { supabase } = await import("../lib/supabaseClient");
  const { data, error } = await supabase
    .from("profiles")
    .upsert([profile])
    .select()
    .single();
  return { data, error };
}

// إضافة XP للمستخدم (تحفيزي). يجلب الحالي، يضيف، يحفظ.
export async function addXp(userId: string, amount: number) {
  const { data: prof, error: e1 } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .single();
  if (e1) throw e1;
  const newXp = (prof?.xp || 0) + amount;
  const { error: e2 } = await supabase
    .from("profiles")
    .update({ xp: newXp })
    .eq("id", userId);
  if (e2) throw e2;
  return newXp;
}
