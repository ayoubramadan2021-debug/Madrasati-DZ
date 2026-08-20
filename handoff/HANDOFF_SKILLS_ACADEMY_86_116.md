# MADRASATI-DZ — HANDOFF

# عالم أكاديمية المهارات

## STATUS

COMPLETED PROTECTED BASELINE

## WORLD ID

`b3187e1b-58da-441d-ae43-d4be486e7c12`

## LESSON RANGE

Lesson 86 → Lesson 116

عدد الدروس: 31

sort_order = 1 → 31

## FIXED CHARACTERS

- الأستاذ خليل
- الأستاذة تالين
- فاضل
- رحمة
- سيرين

## VOICES

- khalil = ar-DZ-IsmaelNeural
- taline = ar-DZ-AminaNeural

## LESSON STRUCTURE

- id
- lessonKey
- num
- world_id
- sort_order
- title
- title_fr
- teacher
- voice
- audio_base
- exercisePath
- nextLessonKey
- objectives
- slides

## SCENES

كل درس يحتوي s1 إلى s6.

كل Scene يحتوي:

- key
- audio_key
- title
- image
- scene_image
- text

المشهد السادس فقط:

- is_closing: true
- cta_text: هَيَّا نَتَدَرَّبُ

## IMAGE STANDARD

- 1024×1536
- Vertical 2:3
- Premium semi-realistic educational 3D
- WebP quality 95
- method 6

## AUDIO STANDARD

- REAL WordBoundary
- MP3
- JSON
- karaoke.json
- JSON == Karaoke

## CANONICAL TEXT RULE

lessonXXXCanonicalText هو المصدر المرجعي للنص.

عند تغيير نص مشهد واحد يعاد فقط:

- MP3
- JSON
- karaoke.json

لنفس المشهد.

## LAST LESSONS

- Lesson 114 — sort_order 29 — khalil
- Lesson 115 — sort_order 30 — taline
- Lesson 116 — sort_order 31 — khalil

Lesson 116 title:

أُصَنِّفُ الْمَوَادَّ فِي الْمَتْجَرِ

nextLessonKey = lesson117

## SUPABASE

Lessons 86 → 116 uploaded.

## BUILD

BUILD SUCCESS

## NEXT DEVELOPMENT POINT

lesson117

<!-- SKILLS_ACADEMY_HANDOFF_START -->
# HANDOFF — Skills Academy — Lessons 86 → 116

آخر تحديث: 2026-08-20
الحالة: **COMPLETE / BUILD PASSING**

## Git

- Branch:
  `handoff-premium-secure-20260723_103324`
- نطاق هذا التسليم:
  `lesson86 → lesson116`
- العدد:
  `31 lessons`
- التغطية:
  `100%`

## الحالة النهائية

تم إنجاز وربط جميع دروس وتمارين عالم أكاديمية المهارات من 86 إلى 116.

لكل درس:

- ملف محتوى موجود.
- `world_id` مربوط بعالم أكاديمية المهارات.
- مسار التمارين موجود.
- Route فعّال.
- تنفيذ التمارين موجود.
- 4 مهام.
- 16 سؤالًا.
- صور ومصادر مرئية مرتبطة.
- صوت الدرس والتمارين حسب البنية المعتمدة.
- JSON / Karaoke حسب نظام الصوت المستخدم.

نتيجة التدقيق النهائي:

- Lessons: `31/31`
- Missing lessons: `0`
- Exercise routes: `31/31`
- Question coverage: `16 × 31 = 496`
- Missions: `4 × 31 = 124`
- Coverage: `100%`
- Final build: `PASS`

## نهاية العالم

الدرس 116 هو آخر درس في هذا العالم.

بعد إنهاء تمارينه:

- لا يوجد Lesson 117.
- الزر الأخضر اسمه:
  `العودة إلى العالم`
- الوجهة:
  قائمة دروس عالم أكاديمية المهارات.

## قواعد يجب الحفاظ عليها

1. لا يتم تعديل:
   `src/features/lesson-v2/exercises-v2/UnifiedLessonExercisesV2.tsx`

2. Architecture:
   `DATA CHANGES / ENGINE STAYS UNIFIED`

3. أي تعديل نصي في prompt أو TTS يتطلب مزامنة الصوت وJSON/Karaoke.

4. التعديل البصري فقط لا يتطلب إعادة توليد الصوت.

5. صور answer cards التي تم تخصيصها تبقى scoped للدرس المعني ولا يطبق تعديل عالمي على Renderer.

## ملفات تنفيذ التمارين الرئيسية

- `GeometryPremiumExercises86_100_110.tsx`
- `SkillsAcademyGeometryExercises86_100_110.tsx`
- `SkillsAcademyNumberExercises87To112.tsx`
- `SkillsAcademyNumberPremium87_91_102.tsx`
- `SkillsAcademyScienceExercises88To116.tsx`
- `SkillsAcademySciencePremium88_116.tsx`
- `SciencePremiumSkillLabV2.tsx`
- `SciencePremiumIconChoiceLabV2.tsx`
- `Lesson96CalculatorExercises.tsx`
- `Lesson97GridDrawingExercises.tsx`
- `Lesson98WritingDrawingToolsExercises.tsx`
- `Lesson101ToolsLeaveTracesExercises.tsx`
- `Lesson103NoCarryAdditionExercises.tsx`
- `Lesson106Calculator2Exercises.tsx`
- `Lesson108DaysOfWeekExercises.tsx`
- `Lesson109AdditionSubtractionSituations3Exercises.tsx`
- `Lesson114SchoolCleanlinessExercises.tsx`
- `Lesson115Bilan5Exercises.tsx`

## دروس ذات تنفيذ مخصص

- 96: Calculator 1
- 97: Grid Drawing
- 98: Writing / Drawing Tools
- 101: Tools Leave Traces
- 103: No-Carry Addition
- 106: Calculator 2
- 108: Days of Week
- 109: Addition/Subtraction Situations 3
- 114: School Cleanliness
- 115: Bilan 5

## Lesson 95 visual status

تم اعتماد نظام صور 3D للدرس 95، بما فيه:

- الثلج
- الماء
- الحرارة
- الثلاجة
- الذوبان
- العصير
- الزيت
- الكتاب
- العناصر البصرية الإضافية الخاصة بالاختيارات

صور answer cards الخاصة بالدرس 95 مضبوطة على `118px` بشكل scoped.

## الخطوة التالية

عالم أكاديمية المهارات 86 → 116 أصبح نقطة تسليم مستقرة.

أي عمل لاحق يفضّل أن يبدأ من commit التسليم الخاص بهذا العالم بدل إعادة فتح الدروس المكتملة إلا عند وجود bug واضح.

**END OF SKILLS ACADEMY HANDOFF**
<!-- SKILLS_ACADEMY_HANDOFF_END -->
