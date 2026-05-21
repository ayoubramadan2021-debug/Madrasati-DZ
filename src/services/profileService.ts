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
