# HANDOFF

<!-- LESSON36_REFERENCE_START -->
## Handoff — التمارين Premium الموحدة

تم إنهاء تمارين الدرس 36 واعتمادها مرجعًا للدروس 38 إلى 45.

المرجع:

- `docs/LESSON_36_UNIFIED_PREMIUM_EXERCISES_REFERENCE.md`

مراحل الدرس 36:

- ex1 → `TapSelectExerciseV2`
- ex2 → `CountTapExerciseV2`
- ex3 → `DirectOperationExerciseV2`
- ex4 → `EquationChoiceExerciseV2`

قبل تنفيذ أي تمرين جديد:

1. قراءة محتوى التمرين الفعلي.
2. تحديد الهدف التعليمي.
3. قراءة المحرك المرتبط حاليًا.
4. اختيار محرك عام مناسب.
5. استعمال `UnifiedExerciseScreenV2`.
6. فحص المحرك بواسطة `esbuild`.
7. تنفيذ `npm run build`.

يمنع إنشاء واجهة Premium مستقلة داخل كل محرك.
<!-- LESSON36_REFERENCE_END -->

<!-- HANDOFF-LESSONS-36-45:START -->
## التسليم التقني للدروس 36 إلى 45

آخر تحديث: **2026-07-26 10:08**
الفرع: `handoff-premium-secure-20260723_103324`

### الدروس

| الدرس | العنوان |
|---:|---|
| 36 | مرجع المحرك الموحّد |
| 37 | قراءة جدول |
| 38 | التنفس |
| 39 | رحلة القطار المرتب |
| 40 | أقارن وأرتب |
| 41 | صفوف وأعمدة في لوحة اللعب |
| 42 | قلبي ينبض |
| 43 | أكتشف ضعف عدد أصغر من عشرة |
| 44 | أكتشف نصف عدد أصغر من عشرين |
| 45 | إتمام جدول |

### الملفات الأساسية

- `UnifiedExerciseScreenV2`
- `UnifiedExerciseHeaderV2`
- `UnifiedExerciseKaraokeV2`
- `UnifiedExerciseAnswersV2`
- `UnifiedExerciseFeedbackV2`
- `LessonExercisesPage.tsx`
- `World2LessonPage.tsx`

### قواعد الاستمرار

- يرسل التمرين `index={questionIndex}`.
- الرأس الموحّد يعرض `index + 1`.
- كل تمرين يحتوي على 4 متغيرات.
- كل سؤال صوتي يحتاج ملفي `MP3` و`JSON`.
- الكاريوكي يعتمد `WordBoundary`.
- لا تظهر الإجابة الصحيحة قبل تفاعل الطفل.
- لا تضاف ملفات النسخ الاحتياطية أو سكربتات الاختبار إلى Git.

### الحصيلة

- الدروس المضافة أو المحدّثة: **10**
- الدروس الجديدة: **9**
- التمارين الجديدة: **36**
- المتغيرات والأسئلة: **144**
<!-- HANDOFF-LESSONS-36-45:END -->

<!-- LESSON46-HANDOFF-START -->
## Handoff — Lesson 46

Lesson: `قَلْبِي يَنْبِضُ (2)`

Status: complete and build verified.

Updated: 2026-07-26 20:39

### Runtime files

- Lesson page:
  `src/pages/World2LessonPage.tsx`
- Exercises routing:
  `src/pages/LessonExercisesPage.tsx`
- Exercises component:
  `src/features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises.tsx`

### Lesson registration

`LESSON_ALIASES["46"]` contains:

- title: `قَلْبِي يَنْبِضُ (2)`
- audioToken: `lesson_46_my_heart_beats_2`
- exercisePath: `/lesson-v2/46/exercises`

The lesson `onDone` handler routes lesson 46 to:

`/lesson-v2/46/exercises`

### Supabase requirements

A lesson is rejected as incomplete when:

- normalized slides are empty, or
- `audioBase` is empty.

Lesson 46 uses a text JSON value in `content` containing:

- `slides`
- `audio_base`

The required audio base is:

`/audio/teachers/khalil/lesson_46_my_heart_beats_2`

Each scene uses:

- `key`
- `image`
- `text`

### Lesson assets

Images:

`public/lessons/v2/lesson46/s1.webp` through `s6.webp`

Audio directory:

`public/audio/teachers/khalil/lesson_46_my_heart_beats_2`

Narration audio:

- `lesson46_s1.mp3` through `lesson46_s6.mp3`

Karaoke files:

- `lesson46_s1.json` through `lesson46_s6.json`

Narration map:

- `narration.json`

WordBoundary format:

- `text`: displayed word.
- `offset`: start time in milliseconds.
- `duration`: word duration in milliseconds.

### Exercises

Total:

- 4 exercises.
- 16 questions.
- 4 questions per exercise.
- 16 MP3 files.
- 16 karaoke JSON files.

Audio location:

`public/audio/teachers/khalil/lesson_46_my_heart_beats_2/exercises`

File naming:

- `l46_ex1_q1.mp3/json`
- through
- `l46_ex4_q4.mp3/json`

### Exercise engine

The implementation uses:

- `UnifiedExerciseScreenV2`
- `UnifiedExerciseAnswersV2`
- `LessonCompleteV2`
- unified feedback behavior
- synchronized karaoke highlighting

### Exercise structure

1. `أُمَيِّزُ الْحَالَةَ`
2. `أَفْهَمُ نَبْضَ الْقَلْبِ`
3. `أُقَارِنُ بَيْنَ الْحَرَكَةِ وَالرَّاحَةِ`
4. `أُرَاجِعُ مَا تَعَلَّمْتُ`

### UI rules

- Do not show icons that reveal the correct answer.
- Do not show check or cross icons inside choices.
- Do not show different heart counts that reveal pulse speed.
- Do not show the correct answer after a wrong attempt.
- Keep `showCorrect={false}`.
- Keep answer order varied but stable during each question.
- The comparison illustration shows only the two states.
- The learner must discover the result.

### First question final text

The final visible, spoken and karaoke text is:

`اِخْتَرِ الصُّورَةَ الَّتِي تُبَيِّنُ التَّلَامِيذَ أَثْنَاءَ الْحَرَكَةِ.`

Do not restore:

`بَعْدَ الْحَرَكَةِ`

The following files must remain synchronized after text changes:

- React prompt.
- MP3 narration.
- WordBoundary JSON.

### Errors not to repeat

1. Do not insert plain descriptive text in `content`.
2. Do not omit `audio_base`.
3. Do not forget the local lesson alias.
4. Do not mismatch audio keys and filenames.
5. Do not mix 100-nanosecond timing with milliseconds.
6. Do not reveal answers using icons or captions.
7. Do not change visible text without regenerating audio and karaoke.
8. Do not assume six scenes alone means the lesson data is complete.

### Next target

Continue with lesson 47 using the same verified workflow.
<!-- LESSON46-HANDOFF-END -->

<!-- LESSON48_HANDOFF_START -->
## تسليم الدرس 48

آخر تحديث: 2026-07-29

التسلسل النهائي:

/world2-lesson/48
→ World2LessonPage
→ /lesson-v2/48/exercises
→ Lesson48ExercisesPage
→ NumbersTo39ExerciseV2

الدرس 36 هو المرجع الرسمي في:

- LESSON_ALIASES
- World2LessonPage.onDone
- مسارات التمارين الرقمية
- شاشة الإتمام
- حركة الكأس والنجوم

ملفات الدرس 48:

- src/pages/World2LessonPage.tsx
- src/pages/Lesson48Page.tsx
- src/pages/Lesson48ExercisesPage.tsx
- src/features/lesson-v2/content/lesson48.ts
- src/features/lesson-v2/content/lesson48_types.ts
- src/features/lesson-v2/content/lesson48_exercise1.ts
- src/features/lesson-v2/content/lesson48_exercise2.ts
- src/features/lesson-v2/content/lesson48_exercise3.ts
- src/features/lesson-v2/content/lesson48_exercise4.ts
- src/features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2.tsx

أداة التحقق:

bash scripts/lesson48/verify_lesson48_release.sh
<!-- LESSON48_HANDOFF_END -->

<!-- LESSONS_64_69_START -->

## تحديث الدروس 64 إلى 69

آخر تحديث: 2026-08-05 15:28

الفرع: handoff-premium-secure-20260723_103324

الحالة: مكتملة، مفحوصة، وجاهزة على Git.

### الدروس المكتملة

- الدرس 64: نَبَاتَاتٌ تَعِيشُ مَعَنَا (2) — 6 مشاهد، audio_base: /audio/teachers/khalil/lesson_64_plants_with_us_2، exercisePath: /lesson-v2/64/exercises، nextLessonKey: lesson65.
- الدرس 65: وَضْعِيَّاتُ جَمْعٍ وَأَوْ طَرْحٍ (2) — 6 مشاهد، audio_base: /audio/teachers/taline/lesson_65_add_subtract_situations_2، exercisePath: /lesson-v2/65/exercises، nextLessonKey: lesson66.
- الدرس 66: أُجَنِّدُ مَعَارِفِي (3) — 6 مشاهد، audio_base: /audio/teachers/khalil/lesson_66_mobilize_knowledge_3، exercisePath: /lesson-v2/66/exercises، nextLessonKey: lesson67.
- الدرس 67: الْحَصِيلَةُ 3 — لُغَةٌ عَرَبِيَّةٌ — 6 مشاهد، audio_base: /audio/teachers/taline/lesson_67_assessment_3_arabic، exercisePath: /lesson-v2/67/exercises، nextLessonKey: lesson68.
- الدرس 68: الْحَصِيلَةُ 3 — رِيَاضِيَّاتٌ — 6 مشاهد، audio_base: /audio/teachers/khalil/lesson_68_assessment_3_math، exercisePath: /lesson-v2/68/exercises، nextLessonKey: lesson69.
- الدرس 69: الْحَصِيلَةُ 3 — تَرْبِيَةٌ عِلْمِيَّةٌ — 6 مشاهد، audio_base: /audio/teachers/taline/lesson_69_assessment_3_science، exercisePath: /lesson-v2/69/exercises، nextLessonKey: نهاية العالم.

### الإصلاحات المعتمدة

- ربط الدروس 64 إلى 69 داخل LessonV2Page.tsx.
- تثبيت التسلسل 63 ثم 64 ثم 65 ثم 66 ثم 67 ثم 68 ثم 69.
- مطابقة الصور والنصوص والصوت والكاريوكي في المشاهد الستة.
- تصحيح الدرس 64: المشهد 4 لفوائد النباتات والمشهد 5 لحماية النباتات.
- تصحيح الدرس 65: المشهد s3 للطرح والمشهد s4 للجمع.
- تحديث خاتمة الدرس 69 إلى: أحسنتم أتممتم عالم المحمية الطبيعية بنجاح، هيا نتدرب معًا.
- إصلاح مدد كلمات كاريوكي المشهد السادس في الدرس 69.
- إصلاح حالة shown داخل WorldIntroSceneV2 عند تغيير المشهد.
- نجاح npm run build.

### التشغيل المحلي

cd ~/madrasati-dz
npm run dev -- --host 0.0.0.0

الرابط الأول: http://localhost:5173/lesson-v2/64
الرابط الأخير: http://localhost:5173/lesson-v2/69

### المرحلة التالية

- إنشاء وتدقيق تمارين الدروس 64 إلى 69 بالاعتماد على هيكل الدرس 52.
- الحفاظ على بنية WorldIntroSceneV2 والصوت والكاريوكي الحالية.

<!-- LESSONS_64_69_END -->

<!-- LESSONS_70_85_START -->

## إنجاز الدروس 70 إلى 85 — عالم المدينة الصغيرة

تاريخ التثبيت: 2026-08-10

تم إنجاز وتدقيق طبقة الشرح للدروس 70 إلى 85 في عالم المدينة الصغيرة، مع الصور والصوت والكرايوكي ومزامنة المحتوى.

### حالة الدروس

- الدرس 70: مكتمل ضمن بداية عالم المدينة الصغيرة.
- الدرس 71: الْمُدَّةُ الزَّمَنِيَّةُ — مكتمل.
- الدرس 72: الْأَعْدَادُ إِلَى 69 (1) — مكتمل.
- الدرس 73: تَرْتِيبُ الْأَحْدَاثِ — مكتمل.
- الدرس 74: الْأَعْدَادُ إِلَى 69 (2) — مكتمل.
- الدرس 75: الْأَعْدَادُ إِلَى 69 (3) — مكتمل.
- الدرس 76: أُحَدِّدُ مَوْقِعَ حَدَثٍ فِي الزَّمَنِ — مكتمل.
- الدرس 77: مُجَسَّمَاتٌ مَأْلُوفَةٌ — مكتمل.
- الدرس 78: الْجَمْعُ وَالطَّرْحُ لِلْأَعْدَادِ الصَّغِيرَةِ (2) — مكتمل.
- الدرس 79: قِرَاءَةُ السَّاعَةِ (1) — مكتمل.
- الدرس 80: أُنَظِّمُ وَقْتِي — مكتمل.
- الدرس 81: الْحِسَابُ الذِّهْنِيُّ (1) — مكتمل.
- الدرس 82: أُجَنِّدُ مَعَارِفِي – عِيدُ الْأُمِّ — مكتمل.
- الدرس 83: أُجَنِّدُ مَعَارِفِي – يَوْمِي وَوَقْتِي — مكتمل.
- الدرس 84: الْحَصِيلَةُ 4 – أُرَاجِعُ مُكْتَسَبَاتِي — مكتمل.
- الدرس 85: الْحَصِيلَةُ 4 – أُنَظِّمُ وَقْتِي وَأُرَتِّبُ أَحْدَاثِي — مكتمل.

### الملفات الأساسية

- `src/features/lesson-v2/content/lesson70.ts` إلى `lesson85.ts`
- `src/features/lesson-v2/data/small-city/lessons_71_85.json`
- صور الدروس داخل `public/lessons/v2/`
- الصوت والتوقيت داخل `public/audio/teachers/`
- أداة البناء الأساسية: `build_small_city_lessons_71_85.sh`

### تصحيحات نهائية مهمة

- الدرس 75: تمت مراجعة تطابق النصوص والصور، وتصحيح المشاهد المستهدفة ومزامنة الصوت والكرايوكي.
- الدرس 76: تثبيت الصياغة العربية الصحيحة في المشهد 3.
- الدرس 79: تحسين المشاهد المرتبطة بقراءة الساعة والمساحات المخصصة للكرايوكي.
- الدرس 81: تصحيح صور المشاهد 2 و4 و6 للحساب الذهني.
- الدرس 82: تمت استعادة المشهدين 4 و6 إلى النسختين الأصليتين الصحيحتين.
- الدرس 85: جُعل نص كل مشهد في جملتين قصيرتين ومتوازنتين، وأعيدت مزامنة MP3 وJSON والكرايوكي.
- ملفات توقيت الكاريوكي تستخدم البنية:
  `{ "text": "...", "offset": ..., "duration": ... }`
  وليس المفتاح القديم `word`.

### قواعد العمل المثبتة

- الـDataset هو مصدر الحقيقة للدروس 71–85 قبل تشغيل builder.
- لا يُعاد تشغيل builder على درس تم تصحيحه يدويًا إلا بعد التأكد أن الـDataset يحمل النص النهائي.
- عند تعذر WordBoundary في Edge TTS يمكن إنشاء timing يدوي، لكن يجب أن يستعمل المفتاح `text`.
- يجب أن يكون ملف `.json` مطابقًا لملف `.karaoke.json`.
- الصور التعليمية العمودية 1024×1536، مع مساحة سفلية مناسبة للكرايوكي.
- لا يتم استعمال `git add -A`.
- لا توجد حاجة إلى تحديث Supabase لهذه التعديلات المحلية ما لم يُطلب ذلك صراحة.

### التحقق

- الصور: 6 مشاهد لكل درس.
- MP3: موجودة للمشاهد.
- JSON / Karaoke: موجودان ومتزامنان.
- تم التحقق من Lesson85 بصيغة الكاريوكي المستخدمة فعليًا في التطبيق.
- Production build مطلوب قبل نشر هذا milestone.

<!-- LESSONS_70_85_END -->
