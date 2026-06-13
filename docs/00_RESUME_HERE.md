# نقطة الاستئناف — Taalim-DZ
> آخر تحديث: 2026-06-13
> الحالة: الدرس 1 كامل ✅ — الدرس 2 (3/5 تمارين) ⏳ — تكامل WorldPage مكتمل ✅

## ما أُنجز

### تكامل دروس v2 بـnavigation ✅ (جلسة 2026-06-13)
- صفّان في جدول `lessons` بـUUIDs ثابتة:
  - `11111111-…-000000000001` → "الأعداد من 1 إلى 5" (sort_order 1)
  - `11111111-…-000000000002` → "بَيْتُ تَالِينْ" (sort_order 2)
  - كلاهما world_id `b0a43712-…`, template_version 2
- registry محلي: `src/features/lesson-v2/v2Registry.ts` (UUID → مفتاح v2)
- `WorldPage.tsx` سطر onClick: getV2Key(l.id) → `/lesson-v2/<key>` أو `/lesson/<id>`
- مؤكّد بصرياً: الدرسان يظهران في WorldPage والنقر يفتحهما — لا URL يدوي
- commit: f41d539 (على dev، غير مدفوع)

### الدرس 1: "الأعداد من 1 إلى 5" ✅
- 6 scenes + 5 تمارين × 5 أسئلة = 25 سؤال

### الدرس 2: "بَيْتُ تَالِينْ" (المواقع) — 3/5 تمارين
- 6 scenes + 6 TTS + Twemoji
- المنجزة: TapSelectWordsV2, TapSelectImagesV2, DragMatchExerciseV2 (kind="image")

## ما تبقى
- الدرس 2: تمرين 4 (GroupSort/MatchPair) + تمرين 5 (OddOneOut) + TTS لهما
- تجميلي مؤجّل: مظهر إيموجي التفاح فوق scenes الدرس 1، وعدّاد الشرائح يعرض "6/3"
  (الكود والأصول مطابقة للمرفوع — الفرق المحلي كان cache المتصفح)
- ربط درس v2 جديد: صف في `lessons` + سطر في `v2Registry.ts` + مفتاح في LESSONS_MAP

## دروس مكتسبة
1. جدول `lessons` كان فارغاً — افحص DB الفعلي قبل البناء على افتراضات الذاكرة
2. UUIDs ثابتة صريحة في INSERT تجعل الregistry معروفاً مسبقاً
3. `template_version` موجود أصلاً في schema — لا migration إضافي
4. على الموبايل: sed لاستبدال سطر واحد آمن؛ heredoc rewrite قد لا يُنفَّذ صامتاً — تحقّق دائماً بـgrep بعده

## كيف تبدأ الجلسة القادمة
> أيوب من Taalim-DZ. أكمل الدرس 2 — تمرينان متبقيان (4: GroupSort، 5: OddOneOut) + TTS.
> اقرأ docs/00_RESUME_HERE.md.
