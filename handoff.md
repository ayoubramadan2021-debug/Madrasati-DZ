
---

## HANDOFF-64-69-WORLD-INTRO-20260807

### الحالة الحالية

الدروس 64–69 أصبحت تحتوي على محركات تمارين مستقلة ومربوطة في `LessonExercisesPage.tsx`.

يجب عند أي تعديل لاحق الحفاظ على:

1. `Lesson64PlantsWithUs2Exercises.tsx`
2. `Lesson65AddSubtractSituations2Exercises.tsx`
3. `Lesson66MobilizeKnowledge3Exercises.tsx`
4. `Lesson67Assessment3ArabicExercises.tsx`
5. `Lesson68Assessment3MathExercises.tsx`
6. `Lesson69Assessment3ScienceExercises.tsx`

### نهاية الدرس 69

الدرس 69 هو نهاية عالم المحمية الطبيعية.

نهاية التمارين يجب أن تستخدم شاشة الإكمال الموحدة، وأن تعيد إلى:

`/world/827a3923-94f7-4b33-99e6-2d3c8d957e0c`

مع الحفاظ على اختبار العالم.

### مقدمات العوالم

`WorldPage.tsx` يدعم الآن مقدمات محلية مخصصة مع الحفاظ على بيانات `intro_content` للعوالم الأخرى.

#### عالم المحمية الطبيعية

المعرّف:

`827a3923-94f7-4b33-99e6-2d3c8d957e0c`

الملف المحلي:

`src/features/world-intro/naturalReserveIntro.ts`

السلوك:

- دخول العالم يفتح قائمة الدروس.
- `شاهد المقدمة` يفتح المقدمة.
- 6 مشاهد.
- النهاية ترجع إلى قائمة العالم.

#### عالم المدرسة

المعرّف:

`b0a43712-8b45-428d-bea2-55ff3de52d3a`

الملف المحلي:

`src/features/world-intro/schoolWorldIntro.ts`

الصور:

`public/scenes/world_1_intro/`

الصوت:

`public/audio/world_1_intro_v2/`

قواعد الصور:

- 1024×1536.
- WebP.
- قرابة 40% من الجزء السفلي خالٍ من الشخصيات والعناصر المهمة.
- لا نصوص مطبوعة داخل الصورة.
- الجزء السفلي امتداد طبيعي بصري للجزء العلوي.

الشخصيات المرجعية:

- الأستاذ خليل.
- الأستاذة تالين.
- فاضل.
- سيرين.
- رحمة.

المشهد الثالث:

`مَرْحَبًا بِكُمْ يَا أَعِزَّائِي، هَذِهِ الْأُسْتَاذَةُ تَالِينُ، وَأَنَا الْأُسْتَاذُ خَلِيلٌ.`

المشهد السادس ختامي وزره:

`ابْدَأِ الْمُغَامَرَةَ`

### تحذير

لا تعِد تشغيل سكريبتات توليد الصوت القديمة أو سكريبتات `WordBoundary` السابقة. النسخ الحالية هي المرجع المعتمد.

<!-- MADRASATI_W01_FAMILY_HANDOFF_START -->
# Handoff — Arabic Grade 1 / World 1 «عائلتي»

World 1 is complete through Lesson 11 and is the current production-release checkpoint.

## Preserve
- lessons 1–11
- Lesson 11 = 16 activities / 4 missions
- unified engine contract
- Lesson 10/11 validated runtime shell
- final Lesson 11 card has only world return + restart
- restart text = إِعَادَةُ التَّطْبِيقَاتِ
- family world icon = 🏡

## Next work
World 2 = **المدرسة**, lessons 12–20.

Letter-intensive Arabic lessons:
- 12: م / ب
- 14: ر / ل
- 16: ت / د

For letter lessons, accuracy and visual clarity are mandatory:
word/context → target-word zoom → isolate letter → pronounce →
animate correct Arabic stroke → show only valid joining forms →
reinforce with textbook words → reading/writing/discrimination.
<!-- MADRASATI_W01_FAMILY_HANDOFF_END -->
