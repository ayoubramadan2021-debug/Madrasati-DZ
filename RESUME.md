
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

