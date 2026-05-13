import { supabase } from "../lib/supabaseClient";

export async function isAdmin(userId) {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("ADMIN CHECK ERROR:", error);
    return false;
  }

  return data?.role === "admin";
}
