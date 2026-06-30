
---

## ✅ تحديث الدرس 13 — الأعداد من 1 إلى 10

تم إنجاز ودمج الدرس 13 وتمارينه داخل نظام Lesson V2.

### محتوى الدرس
- عنوان الدرس: **أَعُدُّ الأَشْيَاءَ (الأعداد 1-10)**.
- مشاهد تعليمية للأعداد من 1 إلى 10.
- إصلاح المشهد الختامي وإزالة أي عناصر عدّ غير مناسبة منه.
- ضبط النصوص العربية والتشكيل قدر الإمكان.
- تحديث الصور والأصوات وملفات الكاريوكي الخاصة بالدرس.

### تمارين الدرس 13
تم تجهيز وربط أربعة أنشطة:

1. **النشاط 1:** عدّ الأشياء واختيار العدد الصحيح.
2. **النشاط 2:** اختيار الصورة التي تحتوي على العدد المطلوب.
   - إصلاح عرض الصور باستعمال `image_fit: "contain"` حتى لا تُقصّ الصور، خصوصًا صورة البالونات.
3. **النشاط 3:** سحب الرقم إلى الكمية المناسبة.
4. **النشاط 4:** كتابة الأعداد من 1 إلى 10 باستعمال `TraceExerciseV2`.
   - إضافة دعم الرقم 10 داخل `TraceExerciseV2`.
   - تغيير العبارة من "تتبع الرقم" إلى "اكتب الرقم".
   - إصلاح ملفات الكاريوكي JSON الخاصة بالنشاط الرابع.

### إصلاحات إضافية
- تغيير مصطلح **دُمَى** إلى **لُعَب** لتفادي مشاكل نطق الصوت.
- توليد وإصلاح ملفات الصوت والكاريـوكي للتمارين.
- ربط نهاية الدرس 12 بزر **الدرس التالي** للانتقال إلى الدرس 13.
- إبقاء الدرس 13 كآخر درس مع أزرار اختبار العالم والرئيسية.

### ملفات مهمة
- `src/features/lesson-v2/content/lesson13.ts`
- `src/features/lesson-v2/content/lesson13_exercise1.ts`
- `src/features/lesson-v2/content/lesson13_exercise2.ts`
- `src/features/lesson-v2/content/lesson13_exercise3.ts`
- `src/features/lesson-v2/content/lesson13_exercise4.ts`
- `src/pages/Lesson13ExercisesPage.tsx`
- `src/pages/Lesson12ExercisesPage.tsx`
- `src/features/lesson-v2/exercises-v2/TapSelectImagesV2.tsx`
- `src/features/lesson-v2/exercises-v2/TraceExerciseV2.tsx`
- `public/audio/lesson_13_counting/`
- `public/audio/lesson_13_exercises/`


---

## Lesson 14 completed — أَتَذَكَّرُ الكَمِّيَّةَ بِالعَدَدِ

Status: completed locally and registered in Supabase.

### Main lesson
- Added lesson 14 content in `src/features/lesson-v2/content/lesson14.ts`.
- Added 6 scene images in `public/lessons/v2/lesson14/`.
- Audio base:
  - `/audio/lesson_14_memory_quantity`
- Taline voice uses `ar-DZ-AminaNeural`.
- Karaoke timing adjusted to match audio, with `KARAOKE_LEAD_MS = 0`.
- `WorldIntroSceneV2.tsx` handles lesson scene rendering, karaoke, scene counter, and animated temoji.
- Animated temoji requires:
  - `items_count`
  - `items_emoji_list`
  - `count_word_indices`

### Exercises
Created and used memory-focused engines:
- `MemoryQuantityExerciseV2`
- `MemoryBuildQuantityExerciseV2`
- `MemorySameQuantityExerciseV2`

Final exercise flow:
1. `CountSelectV2` — count and choose the number that remembers the quantity.
2. `MemoryQuantityExerciseV2` — see quantity, hide it, choose remembered number.
3. `MemoryBuildQuantityExerciseV2` — rebuild the same quantity from memory.
4. `MemorySameQuantityExerciseV2` — choose the group with the same quantity.

Writing exercise was removed because it was less aligned with the lesson objective.

### Supabase
Lesson 14 was added officially to the `lessons` table:
- id: `11111111-1111-1111-1111-000000000014`
- title: `أَتَذَكَّرُ الكَمِّيَّةَ بِالعَدَدِ`
- sort_order: `14`
- same `world_id` as lesson 13.

### Routing / linking
- `v2Registry.ts` maps:
  - `11111111-1111-1111-1111-000000000014` → `lesson14`
- `/lesson-v2/lesson14` works.
- `/lesson14-exercises` works.
- Lesson 13 completion links to lesson 14 with `nextLessonKey="lesson14"`.
- Lesson 14 appears in the world/board from Supabase.

### Deployment note
Do not deploy to Netlify yet.
Plan: collect five lessons, then deploy together.
