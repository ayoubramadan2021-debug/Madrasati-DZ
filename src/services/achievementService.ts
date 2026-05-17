import { supabase } from "../lib/supabaseClient";

export async function checkAchievements(profile: any, progress: any[]) {
  const achievements = [];

  if (profile?.points >= 50) {
    achievements.push("Rookie Learner");
  }

  if (progress?.length >= 10) {
    achievements.push("Active Student");
  }

  if (progress?.some((p: any) => p.completed)) {
    achievements.push("First Success");
  }

  return achievements;
}
