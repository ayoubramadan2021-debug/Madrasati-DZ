// يربط معرّف صف الدرس في Supabase بمفتاح درس v2 في الكود.
// أضف صفاً هنا لكل درس v2 جديد تربطه بالـnavigation.
export const V2_LESSON_MAP: Record<string, string> = {
  "11111111-1111-1111-1111-000000000001": "lesson1",
  "11111111-1111-1111-1111-000000000002": "lesson2",
  "11111111-1111-1111-1111-000000000003": "lesson3",
};

export function getV2Key(lessonId: string): string | null {
  return V2_LESSON_MAP[lessonId] ?? null;
}
