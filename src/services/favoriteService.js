import { supabase } from "../lib/supabaseClient";

export async function addFavorite({
  userId,
  itemId,
  itemType,
  title,
  subject,
  grade,
}) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([
      {
        user_id: userId,
        item_id: itemId,
        item_type: itemType,
        title,
        subject,
        grade: Number(grade || 1),
      },
    ])
    .select();

  return { data, error };
}

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET FAVORITES ERROR:", error);
    return [];
  }

  return data;
}

export async function removeFavorite(id) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", id);

  return { error };
}
