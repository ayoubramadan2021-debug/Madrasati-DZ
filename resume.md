
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
---

## Lesson 15 completed — أُعَيِّنُ الرُّتْبَةَ بِالعَدَدِ

Status: completed locally on branch `batch-lessons-14-18`.

### Content
- Route: `/lesson-v2/lesson15`
- Exercises route: `/lesson15-exercises`
- Supabase id: `11111111-1111-1111-1111-000000000015`
- Title: `أُعَيِّنُ الرُّتْبَةَ بِالعَدَدِ`
- Topic: استعمال العدد / العد لتعيين الرتبة.
- Teacher: Khalil.
- Images: `public/lessons/v2/lesson15-order/s1.webp` to `s6.webp`.
- Lesson audio: `public/audio/lesson_15_order_rank`.

### Exercises
- Custom engine: `RankOrderExerciseV2`.
- Page: `src/pages/Lesson15ExercisesPage.tsx`.
- Exercise content:
  - `lesson15_exercise1.ts`: القاطرات، 5 أسئلة.
  - `lesson15_exercise2.ts`: السيارات، 5 أسئلة.
  - `lesson15_exercise3.ts`: البطاقات، 5 أسئلة، with wording `مَا الرُّتْبَةُ`.
  - `lesson15_exercise4.ts`: السلسلة، 5 أسئلة.
- Exercise audio:
  - `public/audio/lesson_15_exercise1`
  - `public/audio/lesson_15_exercise2`
  - `public/audio/lesson_15_exercise3`
  - `public/audio/lesson_15_exercise4`

### Integration
- `LessonV2Page.tsx` imports and maps `LESSON_15_CONTENT`.
- `v2Registry.ts` maps `11111111-1111-1111-1111-000000000015` to `lesson15`.
- `App.tsx` includes `/lesson15-exercises`.

### Deployment note
Do not deploy to Netlify yet. Keep collecting lessons 15–18 on `batch-lessons-14-18` and deploy together later.


---

## Navigation fix after Lesson 15

- Updated `Lesson14ExercisesPage.tsx`.
- Lesson 14 completion now points to `nextLessonKey="lesson15"`.
- Rule to keep: after completing lesson N, the completion icon/button must point to lesson N+1.

---

## Lesson 16 completed — أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي

Status: completed locally on branch `batch-lessons-14-18`.

### Content
- Route: `/lesson-v2/lesson16`
- Exercises route: `/lesson16-exercises`
- Title: `أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي`
- Topic: الحركة، الصحة، السلوك الآمن وغير الآمن.
- Lesson audio base: `/audio/lesson_16_health_movement`
- Voice: Taline voice using `ar-DZ-AminaNeural`.
- Karaoke JSON is word-level and matched to the mp3 duration.

### Exercises
- Exercise page: `src/pages/Lesson16ExercisesPage.tsx`
- Exercise content files:
  - `src/features/lesson-v2/content/lesson16_exercise1.ts`
  - `src/features/lesson-v2/content/lesson16_exercise2.ts`
  - `src/features/lesson-v2/content/lesson16_exercise3.ts`
  - `src/features/lesson-v2/content/lesson16_exercise4.ts`
- Exercise audio folders:
  - `public/audio/lesson_16_exercise1`
  - `public/audio/lesson_16_exercise2`
  - `public/audio/lesson_16_exercise3`
  - `public/audio/lesson_16_exercise4`

### Integration
- `LessonV2Page.tsx` imports and maps `LESSON_16_CONTENT`.
- `v2Registry.ts` maps lesson 16 to `lesson16`.
- `App.tsx` includes `/lesson16-exercises`.
- Lesson 15 completion links to lesson 16.

---

## Lesson 17 completed — أَسْتَخْرِجُ مَعْلُومَةً

Status: completed locally and committed on branch `batch-lessons-14-18`.

Commit:
- `e3d2b6d Add lesson 17 extract information with audio exercises`

### Content
- Route: `/lesson-v2/lesson17`
- Exercises route: `/lesson17-exercises`
- Title: `أَسْتَخْرِجُ مَعْلُومَةً`
- Topic: استخراج المعلومة من الصورة أو البطاقة أو اللوحة دون تخمين.
- Main rule for children: `أَنْظُرُ، أَبْحَثُ، ثُمَّ أُجِيبُ دُونَ تَخْمِينٍ`.
- Lesson content file:
  - `src/features/lesson-v2/content/lesson17.ts`
- Scenario and engine planning file:
  - `lesson-plans/lesson-17-scenario-and-engines.md`
- Images:
  - `public/lessons/v2/lesson17-info/s1.webp`
  - `public/lessons/v2/lesson17-info/s2.webp`
  - `public/lessons/v2/lesson17-info/s3.webp`
  - `public/lessons/v2/lesson17-info/s4.webp`
  - `public/lessons/v2/lesson17-info/s5.webp`
  - `public/lessons/v2/lesson17-info/s6.webp`

### Lesson audio
- Lesson audio base: `/audio/lesson_17_info`
- Voice: Taline voice using `ar-DZ-AminaNeural`.
- Active audio keys:
  - `s1_intro`
  - `s2_picture`
  - `s3_board`
  - `s4_colors`
  - `s5_no_guess`
  - `s6_closing`
- Karaoke JSON is word-level and generated to match mp3 duration using `ffprobe`.

### Exercises
Final exercise flow has 4 exercises only, each with 5 questions:

1. `lesson17_exercise1.ts`
   - استخراج معلومة من الصورة.
   - Uses image `s2.webp`.

2. `lesson17_exercise2.ts`
   - استخراج معلومة من البطاقة/لوحة المعلومات.
   - Uses image `s3.webp`.

3. `lesson17_exercise3.ts`
   - العد والمقارنة من الصورة.
   - Uses image `s4.webp`.

4. `lesson17_exercise4.ts`
   - لا أخمّن عند غياب المعلومة.
   - Uses image `s5.webp`.

Exercise page:
- `src/pages/Lesson17ExercisesPage.tsx`

Exercise audio folders:
- `public/audio/lesson_17_exercise1`
- `public/audio/lesson_17_exercise2`
- `public/audio/lesson_17_exercise3`
- `public/audio/lesson_17_exercise4`

### Important fixes made during Lesson 17
- Removed old fifth exercise from the active flow.
- Correct answers were redistributed across different option positions so children do not learn to always tap the first/right icon.
- Exercise audio and karaoke were added for all 20 questions.
- Lesson text was rewritten so it matches the images, especially the scene with red and blue balls.
- The lesson was simplified for a 6-year-old child with short, clear actions:
  - look
  - search
  - answer
  - do not guess

### Integration
- `LessonV2Page.tsx` imports and maps `LESSON_17_CONTENT`.
- `v2Registry.ts` maps lesson 17 to `lesson17`.
- `App.tsx` includes `/lesson17-exercises`.
- Local build succeeded before commit.

### Deployment note
Do not deploy to Netlify yet.
Continue collecting lessons 14–18 on branch `batch-lessons-14-18`, then deploy together later.

---

## Lesson 18 completed — أُعَيِّنُ المَوْقِعَ فِي الفَضَاءِ

Status: completed locally, added to Supabase, and ready for batch deployment later.

### Content
- Route: `/lesson-v2/lesson18`
- Exercises route: `/lesson18-exercises`
- Supabase id: `11111111-1111-1111-1111-000000000018`
- Title: `أُعَيِّنُ المَوْقِعَ فِي الفَضَاءِ`
- Subject: `math`
- Topic: تحديد مواقع الأشياء في الفضاء.
- Core vocabulary:
  - `يَمِين / يَسَار`
  - `فَوْق / تَحْت`
  - `أَمَام / خَلْف`
  - `دَاخِل / خَارِج`

### Images
- Final images were approved and used as-is.
- Image folder:
  - `public/lessons/v2/lesson18-position/`
- Files:
  - `s1.webp` introduction
  - `s2.webp` right/left
  - `s3.webp` above/below
  - `s4.webp` front/behind
  - `s5.webp` inside/outside
  - `s6.webp` summary
- Important rule kept from lesson 17:
  - Use the final approved image as the source of truth.
  - Text and exercises must match the actual image, not the original prompt if they differ.
  - Keep a large empty lower area for karaoke text.

### Lesson audio and karaoke
- Audio base:
  - `/audio/lesson_18_positions`
- Voice:
  - Taline voice: `ar-DZ-AminaNeural`
- Audio was regenerated at `+10%` speed.
- Karaoke was adjusted with a small positive offset to reduce early highlighting.
- The word `أُنْظُرُوا` was corrected in lesson scenes.

### Exercises
Created 4 exercise files, each with 5 questions:
1. `lesson18_exercise1.ts` — right / left
2. `lesson18_exercise2.ts` — above / below
3. `lesson18_exercise3.ts` — front / behind
4. `lesson18_exercise4.ts` — inside / outside

Exercise page:
- `src/pages/Lesson18ExercisesPage.tsx`

Exercise engine:
- `RankOrderExerciseV2`

Exercise audio:
- `public/audio/lesson_18_exercise1`
- `public/audio/lesson_18_exercise2`
- `public/audio/lesson_18_exercise3`
- `public/audio/lesson_18_exercise4`

### Integration
- `LessonV2Page.tsx` imports and maps `LESSON_18_CONTENT`.
- `v2Registry.ts` maps:
  - `11111111-1111-1111-1111-000000000018` → `lesson18`
- `App.tsx` includes:
  - `/lesson18-exercises`
- Lesson 17 completion links to lesson 18 with:
  - `nextLessonKey="lesson18"`

### Supabase
Lesson 18 was inserted into `lessons` using only existing columns:
- `id`
- `title`
- `subject`
- `grade`
- `sort_order`
- `world_id`
- `template_version`

Columns not available in current schema and therefore avoided:
- `is_published`
- `type`
- `duration_seconds`

### Deployment note
Do not deploy to Netlify yet.
Lessons not deployed to Netlify yet:
- 14
- 15
- 16
- 17
- 18

Next step:
- Final full test of lessons 14–18.
- Then deploy once to Netlify.

---

## Lesson 19 completed — أُصَنِّفُ أَغْذِيَتِي

Status: completed locally, added to Supabase, and pushed to GitHub.  
Netlify deployment is postponed until collecting 5 new lessons because monthly deploy/build usage is limited.

### Main idea
Lesson 19 teaches first-grade children how to classify foods into simple food groups.

### Environment
- School cafeteria.
- Teacher: Taline.
- Students: Fadel, Sirine, Rahma.

### Food groups
The lesson introduces four food categories:
1. Fruits and vegetables.
2. Meat and fish.
3. Milk and dairy products.
4. Grains and grain products.

### Images
Final images were generated and approved before coding.

Image folder:
- `public/lessons/v2/lesson19-food/`

Files:
- `s1.webp` — introduction in the school cafeteria.
- `s2.webp` — fruits and vegetables.
- `s3.webp` — meat and fish.
- `s4.webp` — milk and dairy products.
- `s5.webp` — grains and grain products.
- `s6.webp` — summary board.

Important visual rules kept from lessons 18 and 19:
- Use the final approved image as the source of truth.
- Keep the lower part of the image empty for karaoke subtitles.
- Keep characters consistent.
- Use clear, large food objects.
- No text, no logos, no watermark inside images.

### Lesson content
Created:
- `src/features/lesson-v2/content/lesson19.ts`

Audio base:
- `/audio/lesson_19_food_groups`

Voice:
- Taline voice: `ar-DZ-AminaNeural`

Audio and karaoke:
- Generated lesson MP3 files.
- Generated JSON karaoke files.
- Used the same timing logic and speed approach as lesson 18.

### Exercises
Created 4 exercises, each with 5 questions:

1. `lesson19_exercise1.ts`
   - Fruits and vegetables.
   - Questions use wording like:
     - `مَا صِنْفُ التُّفَّاحِ؟`
     - Correct answers use:
       - `مِنْ صِنْفِ الفَوَاكِهِ`

2. `lesson19_exercise2.ts`
   - Meat and fish.

3. `lesson19_exercise3.ts`
   - Milk and dairy products.

4. `lesson19_exercise4.ts`
   - Grains and grain products.

Exercise page:
- `src/pages/Lesson19ExercisesPage.tsx`

Exercise engine:
- `RankOrderExerciseV2`

Important fix:
- Added `key="ex1"`, `key="ex2"`, `key="ex3"`, `key="ex4"` to force the exercise engine to reset correctly between stages.
- This fixed the missing counter and transition issue.

Exercise audio:
- `public/audio/lesson_19_exercise1`
- `public/audio/lesson_19_exercise2`
- `public/audio/lesson_19_exercise3`
- `public/audio/lesson_19_exercise4`

Each question has:
- `.mp3`
- `.json`

### Integration
Updated:
- `src/pages/LessonV2Page.tsx`
  - Imported and mapped `LESSON_19_CONTENT`.
  - Fixed `handleDone` so lesson 19 goes to `/lesson19-exercises`.

- `src/features/lesson-v2/v2Registry.ts`
  - Added:
    - `11111111-1111-1111-1111-000000000019` → `lesson19`

- `src/App.tsx`
  - Added route:
    - `/lesson19-exercises`

- `src/pages/Lesson18ExercisesPage.tsx`
  - Linked lesson 18 completion to lesson 19:
    - `nextLessonKey="lesson19"`

### Supabase
Lesson 19 was inserted into `lessons` with existing schema columns only:
- `id`
- `title`
- `subject`
- `grade`
- `sort_order`
- `world_id`
- `template_version`

Supabase id:
- `11111111-1111-1111-1111-000000000019`

Title:
- `أُصَنِّفُ أَغْذِيَتِي`

Subject:
- `science`

### Testing
Verified locally using:
- `npm run dev -- --host 0.0.0.0`

Checked:
- Lesson 18 works.
- Lesson 18 links to lesson 19.
- Lesson 19 appears in the app after Supabase insertion.
- Lesson 19 opens.
- Lesson 19 exercises open directly.
- Lesson 19 no longer redirects to generic lesson 1 exercises.
- Exercise counter and progression work after adding stage keys.

### Important rule
Do not deploy to Netlify after every lesson.

Netlify deployment rule:
- Deploy only after collecting 5 lessons and testing them together.
- This saves monthly Netlify usage because it is limited.

Current new batch after lesson 18:
- Lesson 19 completed.
- Continue collecting until the next 5-lesson batch is ready.

### Scripts created during lesson 19
- `build_lesson19_content_audio.sh`
- `build_lesson19_exercises.sh`
- `fix_lesson19_exercises.sh`
- `fix_lesson19_exercise_route.sh`
- `fix_lesson19_handle_done.sh`
- `link_lesson18_to_19.sh`

### Next step
Start lesson 20 using the same methodology:
1. Scenario.
2. Prompts.
3. Images.
4. Review images.
5. Lesson content.
6. Audio and karaoke.
7. Exercises.
8. Supabase.
9. resume.md.
10. GitHub.
