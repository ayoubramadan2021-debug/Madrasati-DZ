# نقطة الاستئناف — Taalim-DZ
> **آخر تحديث:** 2026-06-09 (مساءً)
> **الحالة:** Clean slate جاهز لبناء Lesson Template v2 ✅

---

## 📍 أين توقّفنا

### الإنجاز الكبير اليوم
✅ **Refactor كامل: clean slate لبناء v2**
- DB: 4 أعمدة جديدة في lessons + جدولان جديدان (world_unlocks, exercise_attempts)
- حذف 11 ملف exercise قديم + 3 pages قديمة + 3 routes
- 3388 سطر كود قديم محذوف
- مستند 00_LESSON_BLUEPRINT.md المرجعي جاهز

### آخر commit
- 25257b7 refactor: clean slate for lesson template v2
- (محلي، لم يُرفع لـorigin/dev بعد)

---

## ⏭️ الجلسة القادمة: الأيام 3-5 — درس نموذجي

### المهمة
بناء `LessonTemplate.tsx` + 4 scenes + درس "الأعداد من 1 إلى 5 (1)" كنموذج كامل.

### الـTODO قبل الجلسة
1. ⏳ **توليد صورة DALL-E** لخلفية الفصل (بدون شخصيات):
   > Empty Algerian primary school classroom interior, soft warm morning light through windows, green chalkboard, wooden desks, Algerian flag, no people, Pixar 3D style, wide angle, child-friendly

2. ⏳ ضغطها بـcwebp ووضعها في:
   `public/lessons/v2/classroom-bg.webp`

### الـTODO في الجلسة
- بناء مجلد `src/features/lesson-v2/` بالكامل
- بناء `LessonTemplate.tsx` (القالب الموحد)
- بناء 4 scenes components
- بناء أفاتارات SVG لخليل وتالين (داخل الكود، لا PNG)
- بناء رسومات SVG للأعداد والتفاحات
- إنشاء أول درس فعلي في Supabase

---

## 📚 المراجع
- docs/00_LESSON_BLUEPRINT.md ← **المرجع الأساسي**
- docs/01_MASTER_CONTEXT.md
- docs/05_DATABASE_SCHEMA.md
- WorldIntroSceneV2.tsx ← نموذج بصري للجودة المستهدفة

---

## 🎙️ كيف تبدأ الجلسة القادمة
> أيوب من Taalim-DZ. اقرأ docs/00_RESUME_HERE.md ثم docs/00_LESSON_BLUEPRINT.md. نواصل بناء LessonTemplate v2.

ثم الصق الصورة الجديدة للخلفية.
