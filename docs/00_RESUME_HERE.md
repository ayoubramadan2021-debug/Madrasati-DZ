# نقطة الاستئناف — Taalim-DZ
> آخر تحديث: 2026-06-13
> الحالة: الدرس 1 كامل ✅ — الدرس 2 (3/5 تمارين) ⏳ — تكامل + تحسينات كاريوكي/صوت ✅

## نسق العمل: رفع مباشر (push dev → merge main → نشر Netlify). دقائق Netlify ~76% حتى 22 جوان.

## ما أُنجز هذه الجلسة (2026-06-13)
- **تكامل v2 بـnavigation**: صفّان في `lessons` (UUIDs ثابتة, world_id b0a43712, template_version 2)
  + registry `v2Registry.ts` + WorldPage.openLesson. توجيه تمارين الدرس 2 → `/lesson2-exercises`.
- **svg تفاح مخصّص** (`public/twemoji/1f34e.svg`).
- **تحسينات الكاريوكي/الصوت (كل التمارين السبعة + DialogBubble)**:
  1. إصلاح تداخل الصوت: stop() محصّن (muted + currentTime=0 + pause) قبل صوت "أحسنت".
  2. إصلاح الوميض: الكلمات مخفية قبل بدء الصوت (`isShown = activeKey ? shown.has(i) : false`).
  3. الكلمات المفتاحية خضراء في جملة الكاريوكي فقط (`keywords.ts` + `isKeyword(w.text)`).
     (تراجعنا عن تلوين أزرار الخيارات — غير مرغوب.)
- **نص الزر**: "هَيَّا إِلَى التَّمَارِين" → "هَيَّا نَتَدَرَّب" (cta_text في lesson1/lesson2).

## الدرس 1 ✅ — 6 scenes + 5 تمارين
## الدرس 2 "بَيْتُ تَالِينْ" — 3/5 تمارين (TapSelectWords/Images, DragMatch)

## ما تبقى
- الدرس 2: تمرين 4 (GroupSort/MatchPair) + تمرين 5 (OddOneOut) + TTS لهما
- **bug صغير مؤجّل**: عدّاد الشرائح مقلوب (يعرض total/current مثل "6/2" بدل "2/6")
- **تحقّق بصري معلّق**: تأكيد اختفاء الوميض فعلياً عبر كل أنواع التمارين
- دَين تقني: توحيد LessonExercisesPage ليقرأ lessonId بدل صفحة لكل درس

## دروس مكتسبة
1. sed: استخدم فاصلاً غير `#`/`|` عند وجودهما في النص (لون hex، `||`) — استخدم `@`
2. sed متعدد الأسطر يفشل على Termux — استبدال سطر واحد، أو Python replace+write كامل
3. أكّد بصرياً قبل تعميم منطق على عدة ملفات

## كيف تبدأ الجلسة القادمة
> أيوب من Taalim-DZ. أكمل الدرس 2 — تمرينان (4: GroupSort، 5: OddOneOut) + TTS.
> اقرأ docs/00_RESUME_HERE.md.
