import { supabase } from "../lib/supabaseClient";

export async function hasCompletedProgress(userId, lessonId) {
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("profile_id", userId)
    .eq("lesson_id", lessonId)
    .limit(1);

  if (error) {
    console.log("CHECK PROGRESS ERROR:", error);
    return false;
  }

  return data && data.length > 0;
}

export async function saveProgress({
  userId,
  lessonId,
  points,
}) {
  const alreadyDone = await hasCompletedProgress(
    userId,
    lessonId
  );

  if (alreadyDone) {
    return {
      data: null,
      error: null,
      alreadyDone: true,
    };
  }

  const { data, error } = await supabase
    .from("progress")
    .insert([
      {
        profile_id: userId,
        lesson_id: lessonId,
        completed: true,
        points,
      },
    ])
    .select();

  if (error) {
    console.log("SAVE PROGRESS ERROR:", error);
    return { data: null, error };
  }

  await addPointsToProfile(userId, points);

  return {
    data,
    error: null,
    alreadyDone: false,
  };
}

export async function addPointsToProfile(userId, points) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_points")
    .eq("id", userId)
    .single();

  const currentPoints = Number(
    profile?.total_points || 0
  );

  const newPoints =
    currentPoints + Number(points || 0);

  const { data, error } = await supabase
    .from("profiles")
    .update({
      total_points: newPoints,
      points: newPoints,
    })
    .eq("id", userId)
    .select();

  if (error) {
    console.log(
      "UPDATE PROFILE POINTS ERROR:",
      error
    );
  }

  return data;
}

export async function getUserProgress(userId) {
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log("GET PROGRESS ERROR:", error);
    return [];
  }

  return data;
}
