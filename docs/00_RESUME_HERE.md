# نقطة الاستئناف — Taalim-DZ
> آخر تحديث: 2026-06-13
> الحالة: الدرس 1 كامل ✅ — الدرس 2 (3/5 تمارين) ⏳ — تكامل WorldPage + تمارين v2 يعمل ✅

## نسق العمل الجديد (مهم)
> من الآن: الدروس تُرفع مباشرة للتطبيق (push إلى dev → نشر Netlify) على نفس نسق هذه الجلسة.
> توقّف التحفّظ السابق على دقائق Netlify — الدفع المباشر معتمد.

## ما أُنجز هذه الجلسة (2026-06-13)
- **تكامل v2 بـnavigation**: صفّان في `lessons` (UUIDs ثابتة `11111111-…-0001/0002`,
  world_id `b0a43712-…`, template_version 2). registry `src/features/lesson-v2/v2Registry.ts`
  يربط UUID → مفتاح v2. WorldPage.onClick: getV2Key(l.id) → `/lesson-v2/<key>` أو `/lesson/<id>`.
- **توجيه تمارين الدرس 2**: LessonV2Page يوجّه lesson2 → `/lesson2-exercises` (صفحته الخاصة)،
  والباقي → `/lesson-v2/<id>/exercises`. (سبب العطل: LessonExercisesPage مثبّتة على تمارين الدرس 1.)
- **أصول**: استبدال svg التفاح `public/twemoji/1f34e.svg` برسم مخصّص.

## الدرس 1 ✅ — 6 scenes + 5 تمارين × 5 = 25 سؤال
## الدرس 2 "بَيْتُ تَالِينْ" (المواقع) — 3/5 تمارين
- TapSelectWordsV2, TapSelectImagesV2, DragMatchExerciseV2 (kind="image")

## ما تبقى
- الدرس 2: تمرين 4 (GroupSort/MatchPair) + تمرين 5 (OddOneOut) + TTS لهما
- **دَين تقني**: LessonExercisesPage مثبّتة لكل درس بشكل منفصل — توحيدها لاحقاً في صفحة
  تقرأ lessonId وتختار مجموعة التمارين من خريطة (بدل صفحة لكل درس).
- ربط درس v2 جديد: صف في `lessons` + سطر في v2Registry.ts + مفتاح في LESSONS_MAP

## دروس مكتسبة
1. جدول `lessons` كان فارغاً — افحص DB الفعلي قبل البناء على افتراضات الذاكرة
2. على الموبايل: sed لاستبدال سطر واحد آمن؛ heredoc rewrite قد لا يُنفَّذ صامتاً — تحقّق بـgrep بعده
3. UUIDs ثابتة صريحة في INSERT تجعل الregistry معروفاً مسبقاً

## كيف تبدأ الجلسة القادمة
> أيوب من Taalim-DZ. أكمل الدرس 2 — تمرينان متبقيان (4: GroupSort، 5: OddOneOut) + TTS.
> اقرأ docs/00_RESUME_HERE.md. (الدروس تُرفع مباشرة الآن.)
