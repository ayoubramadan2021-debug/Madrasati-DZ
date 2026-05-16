import { supabase } from "../lib/supabaseClient";

export async function createSupportMessage({ userId, email, message }) {
  const { data, error } = await supabase
    .from("support_messages")
    .insert([{ user_id: userId, email, message }])
    .select();

  return { data, error };
}

export async function getMySupportMessages(userId) {
  const { data, error } = await supabase
    .from("support_messages")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function getAllSupportMessages() {
  const { data, error } = await supabase
    .from("support_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET ALL SUPPORT ERROR:", error);
    return [];
  }

  return data;
}

export async function replyToSupportMessage({ id, reply }) {
  const { data, error } = await supabase
    .from("support_messages")
    .update({
      reply,
      is_resolved: true,
    })
    .eq("id", id)
    .select();

  return { data, error };
}
