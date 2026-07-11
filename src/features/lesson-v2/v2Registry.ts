// يربط معرّف صف الدرس في Supabase بمفتاح درس v2 في الكود.
// الدروس 1-21 كانت مربوطة بـ UUID ثابت.
// الدروس الجديدة نربطها أيضًا عبر sort_order لأن id في Supabase من نوع uuid.

export const V2_LESSON_MAP: Record<string, string> = {
  "11111111-1111-1111-1111-000000000001": "lesson1",
  "11111111-1111-1111-1111-000000000002": "lesson2",
  "11111111-1111-1111-1111-000000000003": "lesson3",
  "11111111-1111-1111-1111-000000000004": "lesson4",
  "11111111-1111-1111-1111-000000000005": "lesson5",
  "11111111-1111-1111-1111-000000000006": "lesson6",
  "11111111-1111-1111-1111-000000000007": "lesson7",
  "11111111-1111-1111-1111-000000000008": "lesson8",
  "11111111-1111-1111-1111-000000000009": "lesson9",
  "11111111-1111-1111-1111-000000000010": "lesson10",
  "11111111-1111-1111-1111-000000000011": "lesson11",
  "11111111-1111-1111-1111-000000000012": "lesson12",
  "11111111-1111-1111-1111-000000000013": "lesson13",
  "11111111-1111-1111-1111-000000000014": "lesson14",
  "11111111-1111-1111-1111-000000000015": "lesson15",
  "11111111-1111-1111-1111-000000000016": "lesson16",
  "11111111-1111-1111-1111-000000000017": "lesson17",
  "11111111-1111-1111-1111-000000000018": "lesson18",
  "11111111-1111-1111-1111-000000000019": "lesson19",
  "11111111-1111-1111-1111-000000000020": "lesson20",
  "11111111-1111-1111-1111-000000000021": "lesson21",
};

export const V2_SORT_ORDER_MAP: Record<number, string> = {
  1: "lesson1",
  2: "lesson2",
  3: "lesson3",
  4: "lesson4",
  5: "lesson5",
  6: "lesson6",
  7: "lesson7",
  8: "lesson8",
  9: "lesson9",
  10: "lesson10",
  11: "lesson11",
  12: "lesson12",
  13: "lesson13",
  14: "lesson14",
  15: "lesson15",
  16: "lesson16",
  17: "lesson17",
  18: "lesson18",
  19: "lesson19",
  20: "lesson20",
  21: "lesson21",
  22: "lesson22",
  23: "lesson23",
  24: "lesson24",
  25: "lesson25",
  26: "lesson26",
  27: "lesson27",
  28: "lesson28",
};

export function getV2Key(lessonId: string): string | null {
  return V2_LESSON_MAP[lessonId] ?? null;
}

export function getV2KeyByLesson(lesson: any): string | null {
  const byId = lesson?.id ? V2_LESSON_MAP[String(lesson.id)] : null;
  if (byId) return byId;

  const order = Number(lesson?.sort_order);
  if (Number.isFinite(order) && V2_SORT_ORDER_MAP[order]) {
    return V2_SORT_ORDER_MAP[order];
  }

  return null;
}
