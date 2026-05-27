import { supabase } from "../lib/supabaseClient";
import type { ProgressItem } from "../types/global";

export async function getUserProgress(userId: string): Promise<ProgressItem[]> {
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId);

    if (error) return [];

    return (data as ProgressItem[]) || [];
  } catch {
    return [];
  }
}

export function calculatePoints(progress: ProgressItem[]) {
  return progress.reduce((sum, item) => sum + Number(item.points || 0), 0);
}

export function calculateCompleted(progress: ProgressItem[]) {
  return progress.filter(p => p.completed).length;
}

export async function saveProgress(
  user_id: string,
  lesson_id: string,
  points: number,
  completed: boolean
) {
  const { data, error } = await supabase
    .from("progress")
    .upsert([{ user_id, lesson_id, points, completed }], {
      onConflict: "user_id,lesson_id",
    });
  if (error) throw error;
  return data;
}
