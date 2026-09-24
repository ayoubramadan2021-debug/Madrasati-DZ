/**
 * المصدر الوحيد لمعرفات العوالم.
 * أي معرف جديد أو تعديل يُضاف هنا فقط.
 */

/** عالم "مدرستي": العربية + التربية الإسلامية + المدنية (كما في Supabase) */
export const SCHOOL_WORLD_ID = "83975f07-bdaf-4991-9f96-27d954519f06";

/** المعرفات القديمة (قبل الربط مع Supabase) — للتوافق مع التقدم المحفوظ */
export const LEGACY_SCHOOL_WORLD_IDS: string[] = ["arabic-school-local"];

/** ضع هنا معرف عالم الرياضيات من Supabase (صاحب بوابة PT-01) */
export const MATH_WORLD_ID = "";

export function isSchoolWorld(worldId?: string | null): boolean {
  if (!worldId) return false;
  return worldId === SCHOOL_WORLD_ID || LEGACY_SCHOOL_WORLD_IDS.includes(worldId);
}

export function isMathWorld(worldId?: string | null): boolean {
  return !!MATH_WORLD_ID && worldId === MATH_WORLD_ID;
}
