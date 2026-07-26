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
