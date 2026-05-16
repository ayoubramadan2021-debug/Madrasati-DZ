import { supabase } from "../lib/supabaseClient";

export async function createQuiz({
  title,
  subject,
  grade,
  questions,
}) {
  const { data, error } = await supabase
    .from("quizzes")
    .insert([
      {
        title,
        subject,
        grade: Number(grade),
        questions,
      },
    ])
    .select();

  return { data, error };
}

export async function getQuizzes() {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET QUIZZES ERROR:", error);
    return [];
  }

  return data;
}

export async function getQuizzesByGradeAndSubject(grade, subject) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("grade", Number(grade))
    .eq("subject", subject)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET FILTERED QUIZZES ERROR:", error);
    return [];
  }

  return data;
}

export async function getQuizById(id) {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("GET QUIZ ERROR:", error);
    return null;
  }

  return data;
}

export async function deleteQuiz(id) {
  const { error } = await supabase
    .from("quizzes")
    .delete()
    .eq("id", id);

  return { error };
}
