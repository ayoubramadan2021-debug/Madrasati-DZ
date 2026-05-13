import { supabase } from "../lib/supabaseClient";

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("GET PROFILE ERROR:", error);
    return null;
  }

  return data;
}

export async function upsertProfile({
  id,
  full_name,
  age,
  birth_date,
  birth_place,
  grade,
  bio,
}) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert([
      {
        id,
        full_name,
        age: age ? Number(age) : null,
        birth_date: birth_date || null,
        birth_place,
        grade: Number(grade || 1),
        bio,
      },
    ])
    .select();

  if (error) {
    console.log("UPSERT PROFILE ERROR:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createDemoProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        full_name: "تلميذ تجريبي",
        points: 0,
        grade: 1,
      },
    ])
    .select();

  if (error) return null;
  return data;
}

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) return [];
  return data;
}
