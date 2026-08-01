
## Lesson 49 completed
Lesson 49 is complete and registered in the Games and Entertainment world.

- Route: `/world2-lesson/49`
- Exercises: `/lesson-v2/49/exercises`
- Supabase sort order: `17`
- Previous lesson: `lesson48`
- Next lesson: `lesson50`
- Images: `public/lessons/v2/lesson49-food-sources/`
- Audio: `public/audio/teachers/taline/lesson_49_food_sources/`
- Engine: `FoodSourcesExerciseV2.tsx`
- Four missions with sixteen questions
- Question audio stops immediately when an answer is selected

<!-- LESSON50_START -->
## Lesson 50 — Knowledge Review

### Status
- Local lesson and exercise flow completed.
- Build verified successfully.
- Lesson 49 transitions to lesson 50.

### Main files
- `src/features/lesson-v2/content/lesson50.ts`
- `src/pages/Lesson50Page.tsx`
- `src/pages/Lesson50ExercisesPage.tsx`
- `src/features/lesson-v2/content/lesson50_types.ts`
- `src/features/lesson-v2/content/lesson50_exercise1.ts`
- `src/features/lesson-v2/content/lesson50_exercise2.ts`
- `src/features/lesson-v2/content/lesson50_exercise3.ts`
- `src/features/lesson-v2/content/lesson50_exercise4.ts`
- `src/features/lesson-v2/exercises-v2/Lesson50ReviewExerciseV2.tsx`

### Assets
- Images: `public/lessons/v2/lesson50/s1.webp` → `s6.webp`
- Narration: `public/audio/teachers/khalil/lesson_50_games_review`
- Exercise audio: `public/audio/teachers/khalil/lesson_50_games_review/exercises`
- Voice: `ar-DZ-IsmaelNeural`, rate `-5%`, pitch `+4Hz`

### Routes
- `/lesson-v2/lesson50`
- `/world2-lesson/50`
- `/lesson-v2/50/exercises`

### Exercise structure
- Mission 1: directions and arrows.
- Mission 2: double and half.
- Mission 3: counting and ranking.
- Mission 4: breathing and heartbeat.
- Total: 16 questions.

### Next step
Register lesson 50 in Supabase with world sort order `18`, then verify that it appears after lesson 49.
<!-- LESSON50_END -->

<!-- LESSON51_HANDOFF_START -->
## Lesson 51 handoff — Bilan 1

آخر تحديث: `2026-07-30 23:14 +0100`

### الحالة النهائية

الدرس 51 مكتمل من حيث المحتوى، الصور، الصوت، الكاريوكي، التمارين، المسارات، التسجيل في العالم، والبناء النهائي.

### الهوية

- Arabic title: `الْحَصِيلَةُ 1 — أُجَنِّدُ مَعَارِفِي فِي مَدِينَةِ الْأَلْعَابِ وَالتَّرْفِيهِ`
- French title: `Bilan 1 — Je mobilise mes acquis dans la cité des jeux et des loisirs`
- Lesson key: `lesson51`
- Lesson number: `51`
- Teacher: `taline`
- Audio token: `lesson_51_bilan_1`
- World ID: `5daed3bb-7e62-4a5a-93a1-f6dec60df810`
- Supabase order: `19`
- Next lesson key currently prepared as: `lesson52`

### المسارات

- `/world2-lesson/51`
- `/lesson-v2/lesson51`
- `/lesson-v2/51/exercises`

### المشاهد

- الصور: `public/lessons/v2/lesson51/s1.webp` إلى `s6.webp`
- القياس القياسي: `1024×1536`
- صوت المشاهد:
  `public/audio/teachers/taline/lesson_51_bilan_1`
- الحزمة: 6 MP3 + 6 Karaoke JSON + `narration.json`

### التمارين

أربع مهمات، كل مهمة تضم أربعة أسئلة:

1. الترتيب وتحديد الأول والثاني والثالث.
2. بناء ناتج الجمع بصريًا حتى العدد 19.
3. اختيار عملية الجمع التي تمثل مجموعتين بصريتين.
4. إكمال عملية الجمع الصحيحة بوضع العدد الناقص.

### المحرك المخصص للمهمة الثانية

- الملف:
  `src/features/lesson-v2/exercises-v2/Lesson51VisualAdditionExerciseV2.tsx`
- يعرض مجموعتين كاملتين من العناصر.
- يسمح بإضافة عنصر، حذف عنصر، المسح والتحقق من الناتج.
- يدعم النتائج حتى 19.
- لا يعتمد على خيارات نصية جاهزة.
- يستعمل `lesson51-bounded-emoji-group` لمنع خروج الرموز من الإطار.
- حجم وشبكة الإيموجي يتكيفان مع عدد العناصر.
- يستعمل `UnifiedExerciseFeedbackV2`.
- النجاح: `🌟 أَحْسَنْتَ!`
- الخطأ: `حَاوِلْ مَرَّةً أُخْرَى ✨`

### صوت التمارين

المجلد:
`public/audio/teachers/taline/lesson_51_bilan_1/exercises`

المحتوى:

- 16 ملف MP3.
- 16 ملف Karaoke JSON.
- `narration.json` يحتوي على 16 سؤالًا.

### الملفات البرمجية الأساسية

- `src/features/lesson-v2/content/lesson51.ts`
- `src/features/lesson-v2/content/lesson51_types.ts`
- `src/features/lesson-v2/content/lesson51_visual_addition_types.ts`
- `src/features/lesson-v2/content/lesson51_exercise1.ts`
- `src/features/lesson-v2/content/lesson51_exercise2.ts`
- `src/features/lesson-v2/content/lesson51_exercise3.ts`
- `src/features/lesson-v2/content/lesson51_exercise4.ts`
- `src/features/lesson-v2/exercises-v2/Lesson51BilanExerciseV2.tsx`
- `src/features/lesson-v2/exercises-v2/Lesson51VisualAdditionExerciseV2.tsx`
- `src/pages/Lesson51Page.tsx`
- `src/pages/Lesson51ExercisesPage.tsx`

### الربط

- `src/App.tsx` يحتوي على Route الدرس والتمارين.
- `src/pages/World2LessonPage.tsx` يحتوي تعريف الدرس 51.
- `src/pages/Lesson50ExercisesPage.tsx` يفتح `/world2-lesson/51` عند الانتقال للدرس التالي.
- `src/features/lesson-v2/content/lesson50.ts` يشير إلى `lesson51`.

### التحقق

- الصور: 6.
- مشاهد الدرس: 6.
- أصوات المشاهد: 6.
- تمارين الدرس: 4.
- الأسئلة: 16.
- أصوات الأسئلة: 16.
- الكاريوكي: مكتمل.
- `npm run build`: ناجح.

### الخطوة التالية

البدء بتدقيق الدرس 52 من قاعدة البيانات والملفات قبل تحديد عنوانه أو محتواه.
<!-- LESSON51_HANDOFF_END -->

<!-- LESSON52_FINAL_START -->
## الدرس 52 — الحصيلة الثانية

**الحالة:** مكتمل وجاهز للنشر
**آخر تحديث:** 2026-08-01
**فرع العمل:** `handoff-premium-secure-20260723_103324`

### التسجيل والمسارات

- رقم الدرس: `52`
- العالم: عالم الألعاب والترفيه
- `world_id`: `5daed3bb-7e62-4a5a-93a1-f6dec60df810`
- `sort_order`: `20`
- مسار العالم: `/world2-lesson/52`
- مسار الدرس: `/lesson-v2/lesson52`
- مسار التمارين: `/lesson-v2/52/exercises`

### محتوى الدرس

- المشاهد التعليمية مكتملة.
- الصوت والكلمات المتزامنة Karaoke مكتملة.
- المشهد السادس ينتقل إلى التمارين عبر «هيا نتدرب».
- صوت الأستاذ: `khalil`.
- المسار الصوتي الأساسي:
  `public/audio/teachers/khalil/lesson_52_bilan_2`

### التمارين

- البنية: `ex1 → ex2 → ex3 → ex4 → done`
- العدد: 4 تمارين × 4 وضعيات = 16 وضعية.
- التمرين الأول: اختيار المشهد أو المكان الصحيح بالصور.
- التمرين الثاني: سحب وتصنيف الأماكن والأنشطة.
- التمرين الثالث: المقارنة بين حالة الجسم قبل الجهد وبعده.
- التمرين الرابع: اختيار مشاهد القلب والنبض والتعب بالصور.
- التمارين تستعمل الهيكل المرجعي نفسه مع التشغيل التلقائي والصوت والكاريوكي.
- التمرينان الثاني والثالث يعرضان الخيارات بعرض الشاشة.
- التمرين الرابع يستعمل 8 صور WebP بدقة 1024×1024.

### الملفات الأساسية

- `src/pages/Lesson52Page.tsx`
- `src/pages/Lesson52ExercisesPage.tsx`
- `src/features/lesson-v2/exercises-v2/Lesson52PremiumHealthExercisesV2.tsx`
- `src/features/lesson-v2/exercises-v2/TapSelectImagesV2.tsx`
- `public/lessons/v2/lesson52`
- `public/audio/teachers/khalil/lesson_52_bilan_2`

### التحقق

- `npm run build`: ناجح.
- صور التمرين الرابع: 8/8.
- أصوات وضعيات التمارين: 16/16.
- ملفات Karaoke: 16/16.
- صيغة Karaoke: `text + offset + duration`.

<!-- LESSON52_FINAL_END -->
