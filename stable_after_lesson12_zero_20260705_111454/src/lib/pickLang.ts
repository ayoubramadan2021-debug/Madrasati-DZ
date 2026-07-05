// يقرأ حقلاً قد يكون نصاً عادياً (قديم) أو كائناً ثنائي اللغة (جديد)
// مثال جديد: { ar: "نص", fr: "texte" }
// مثال قديم: "نص"  → يُرجَع كما هو في كل اللغات

type Bilingual = { ar?: string; fr?: string };

export function pickLang(
  field: string | Bilingual | null | undefined,
  lang: string
): string {
  if (field == null) return "";
  // نصّ عادي (بيانات قديمة) → أرجعه كما هو
  if (typeof field === "string") return field;
  // كائن ثنائي اللغة → اختر اللغة، مع تراجع للعربية ثم الفرنسية
  return field[lang as "ar" | "fr"] ?? field.ar ?? field.fr ?? "";
}
