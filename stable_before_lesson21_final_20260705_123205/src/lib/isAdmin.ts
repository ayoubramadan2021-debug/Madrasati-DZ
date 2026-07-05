import { supabase } from "./supabaseClient";

export async function isAdmin() {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin";
}
