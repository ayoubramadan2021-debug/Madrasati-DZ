import { supabase } from "../lib/supabaseClient";

export async function createLesson({ title, subject, grade, content }) {
  const { data, error } = await supabase
    .from("lessons")
    .insert([{ title, subject, grade: Number(grade), content }])
    .select();

  return { data, error };
}

export async function getLessons() {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET LESSONS ERROR:", error);
    return [];
  }

  return data;
}

export async function getLessonsByGradeAndSubject(grade, subject) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("grade", Number(grade))
    .eq("subject", subject)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function getLessonById(id) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function deleteLesson(id) {
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  return { error };
}
