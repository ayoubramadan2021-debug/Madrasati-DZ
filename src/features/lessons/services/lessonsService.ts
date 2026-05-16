import { supabase } from "../../../lib/supabaseClient";
import type { Lesson, CreateLessonInput } from "../../../types/entities";

type LessonPayload = CreateLessonInput & {
  grade: number | string;
};

export async function createLesson({
  title,
  subject,
  grade,
  content,
}: LessonPayload): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons")
    .insert([{ title, subject, grade: Number(grade), content }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Lesson[];
}

export async function getLessons(): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Lesson[];
}

export async function getLessonsByGradeAndSubject(
  grade: number | string,
  subject: string
): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("grade", Number(grade))
    .eq("subject", subject)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson> {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Lesson;
}

export async function updateLesson(
  id: string,
  { title, subject, grade, content }: LessonPayload
): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons")
    .update({
      title,
      subject,
      grade: Number(grade),
      content,
    })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Lesson[];
}

export async function deleteLesson(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
