// الكلمات المفتاحية تُلوَّن أخضر في جملة الكاريوكي عبر كل الدروس.
const KEYWORDS_RAW = [
  // الأعداد 1-5
  "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة",
  // المواقع المكانية
  "أمام", "وراء", "خلف", "بجانب", "مقابل",
  // الحواس الخمس
  "السمع", "الرؤية", "اللمس", "الشم", "الذوق",
  "سمع", "رؤية", "لمس", "شم", "ذوق",
  "أكثر", "أقل", "بقدر",
];

// يزيل التشكيل + يوحّد الهمزات/الألفات + التطويل والمسافات
function normalize(s) {
  return s
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآا]/g, "ا")
    .replace(/[ةه]/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\u0621-\u064A]/g, "")
    .trim();
}

const KEYWORD_SET = new Set(KEYWORDS_RAW.map(normalize));

export function isKeyword(word) {
  return KEYWORD_SET.has(normalize(word));
}
