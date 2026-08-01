# Handoff — Lesson 47

## الحالة

- مكتمل ومتحقق منه.
- التاريخ: `2026-07-28T14:47:10+0100`.
- الفرع: `handoff-premium-secure-20260723_103324`.

## Supabase

- الجدول: `public.lessons`.
- world_id: `5daed3bb-7e62-4a5a-93a1-f6dec60df810`.
- sort_order: `15`.
- lesson_type: `lesson_v2`.
- template_version: `2`.
- المشاهد: `6`.

## المسارات

```text
/lesson-v2/lesson47
/lesson-v2/lesson47/exercises
```

## الملفات الرئيسية

```text
src/features/lesson-v2/content/lesson47.ts
src/features/lesson-v2/content/lesson47_types.ts
src/features/lesson-v2/content/lesson47_exercise1.ts
src/features/lesson-v2/content/lesson47_exercise2.ts
src/features/lesson-v2/content/lesson47_exercise3.ts
src/features/lesson-v2/content/lesson47_exercise4.ts
src/features/lesson-v2/exercises-v2/GridNavigationExerciseV2.tsx
src/pages/Lesson47Page.tsx
src/pages/Lesson47ExercisesPage.tsx
src/pages/World2LessonPage.tsx
```

## الصوت والصور

```text
public/lessons/v2/lesson47-grid-navigation/
public/audio/teachers/taline/lesson_47_grid_navigation/
```

## التمارين

- 4 مهمات × 4 أسئلة = 16.
- UnifiedExerciseScreenV2.
- UnifiedExerciseAnswersV2.
- تغذية راجعة موحدة.
- أصوات نجاح ومحاولة موحدة.
- انتقال بعد 760ms.
- WordBoundary متزامن.

## الإصلاحات المحفوظة

- تصحيح `قِرَاءَةَ` في المشهد السادس.
- ربط زر «هيا نتدرب» من `World2LessonPage.tsx`.
- ربط الدرس 46 بمسار `/lesson-v2/lesson47`.
- إزالة الأسهم من خيارات الاتجاه النصية.
- جعل السهم فوق رقم الخطوة.
- تبسيط صياغة الأسئلة لطفل عمره 6 سنوات.
- توحيد صفحة النهاية وتصغير الكأس والأزرار.
- معالجة كاش الصوت وتأخر الكاريوكي.

## المرجع الدائم

```text
scripts/lesson47/README.md
scripts/lesson47/verify_lesson47.sh
scripts/lesson47/register_lesson47_supabase.sql
scripts/lesson47/update_scene6_supabase.sql
scripts/lesson47/supabase_diagnostics.sql
```

## قبل أي رفع جديد

```bash
bash scripts/lesson47/verify_lesson47.sh ~/madrasati-dz
```

## إصلاح كاريوكي تمارين الدرس 47 — النسخة النهائية

- تم تجاوز مشكلة WordBoundary = 0 في Edge TTS على Termux.
- أصبح الصوت يُولد بواسطة edge-tts مع ملف VTT فعلي.
- تُحوّل إشارات VTT إلى توقيت كلمات السؤال.
- لا يتم استعمال ملفات MP3 أو JSON القديمة عند فشل التوليد.
- لا يوجد KARAOKE_LEAD_MS تقديري.
- تم تغيير رمز الكاش لمنع Chrome من تشغيل نسخة قديمة.
