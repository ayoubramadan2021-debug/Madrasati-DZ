// الكلمات المفتاحية تُلوَّن أخضر في الكاريوكي عبر كل الدروس.
const KEYWORDS_RAW = [
  "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة",
  "أمام", "وراء", "خلف", "بجانب", "مقابل",
];

// يزيل التشكيل + يوحّد الهمزات/الألفات + التطويل والمسافات
function normalize(s: string): string {
  return s
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "") // تشكيل + تطويل
    .replace(/[أإآا]/g, "ا")                      // توحيد الألف/الهمزات
    .replace(/[ةه]/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\u0621-\u064A]/g, "")             // أي رمز غير عربي
    .trim();
}

const KEYWORD_SET = new Set(KEYWORDS_RAW.map(normalize));

export function isKeyword(word: string): boolean {
  return KEYWORD_SET.has(normalize(word));
}
