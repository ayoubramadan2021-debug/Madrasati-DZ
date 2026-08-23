
---

## Lesson 16 — أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي

### الحالة
- تم بناء الدرس 16 بنجاح على الفرع `batch-lessons-14-18`.
- الدرس يظهر بالرابط المباشر:
  - `/lesson-v2/lesson16?test=1`
- تم بناء تمارين الدرس 16:
  - `/lesson16-exercises`
- تم ربط نهاية تمارين الدرس 15 بالدرس 16.
- تم رفع الدرس 16 إلى Supabase بعد نسخ ديناميكي من الدرس 15 وتغيير:
  - `id`
  - `title`
  - `sort_order`

### الصور
الصور موجودة في:

- `public/lessons/v2/lesson16-health/s1.webp`
- `public/lessons/v2/lesson16-health/s2.webp`
- `public/lessons/v2/lesson16-health/s3.webp`
- `public/lessons/v2/lesson16-health/s4.webp`
- `public/lessons/v2/lesson16-health/s5.webp`
- `public/lessons/v2/lesson16-health/s6.webp`

### الصوت
صوت الدرس موجود في:

- `public/audio/lesson_16_health_movement`

أصوات التمارين موجودة في:

- `public/audio/lesson_16_exercise1`
- `public/audio/lesson_16_exercise2`
- `public/audio/lesson_16_exercise3`
- `public/audio/lesson_16_exercise4`

### الملفات المضافة
- `src/features/lesson-v2/content/lesson16.ts`
- `src/pages/Lesson16ExercisesPage.tsx`
- `src/features/lesson-v2/content/lesson16_exercise1.ts`
- `src/features/lesson-v2/content/lesson16_exercise2.ts`
- `src/features/lesson-v2/content/lesson16_exercise3.ts`
- `src/features/lesson-v2/content/lesson16_exercise4.ts`
- `supabase/manual_sql/lesson16_health_movement.sql`

### ملاحظات مهمة
- لا يتم رفع Netlify الآن.
- نواصل تجميع الدروس على الفرع `batch-lessons-14-18`.
- من الآن فصاعدًا دوال Supabase يجب أن تكون ديناميكية أو مبنية بعد التحقق من الأعمدة، ولا نضيف أعمدة غير مؤكدة مثل `slug` أو `is_published` أو `updated_at`.

<!-- STABLE_RELEASE_2026_08_23 -->
## Stable release checkpoint — 2026-08-23

**Status:** stable and ready for Git + Netlify production deployment.

- Lessons 1–116 are the complete Grade 1 lesson range currently in the project.
- Lesson 116 remains the absolute final lesson; do not create Lesson 117.
- Lessons and exercises are currently working correctly in runtime validation.
- Lessons 25–32 exercise routing was repaired in `src/pages/LessonExercisesPage.tsx`; each lesson now reaches its dedicated `LessonNNExercisesPage`.
- Canonical `exercisePath` was restored for lessons 25–32 as `/lesson-v2/NN/exercises`.
- Lesson 52 unified-engine migration is complete and runtime-confirmed.
- `UnifiedLessonExercisesV2.tsx` remains protected and should not be modified casually.
- Custom interaction adapters may remain where needed; unified orchestration remains the architectural direction.
- Do not resume broad migration/audit work unless a real runtime regression appears.
- No Lesson 117.
- Release checkpoint prepared at: 2026-08-23 14:11.

### Recommended next action
Treat this revision as the current stable baseline. Future work should start from a fresh branch/commit after verifying the deployed Netlify production build.
