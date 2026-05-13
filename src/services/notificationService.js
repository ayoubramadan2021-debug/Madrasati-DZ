import { supabase } from "../lib/supabaseClient";

export async function createNotification({
  userId,
  title,
  body,
}) {
  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: userId,
        title,
        body,
      },
    ])
    .select();

  return { data, error };
}

export async function getNotifications(userId) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET NOTIFICATIONS ERROR:", error);
    return [];
  }

  return data;
}

export async function markNotificationAsRead(id) {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id)
    .select();

  return { data, error };
}
