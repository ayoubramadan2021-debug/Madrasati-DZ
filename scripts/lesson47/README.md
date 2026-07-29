# Lesson 47 — Runbook

## الهوية

- الدرس العام: 47
- العنوان: التَّنَقُّلُ عَلَى مَرْصُوفَةٍ
- الفرنسية: Se déplacer sur un quadrillage
- المعلمة: تالين
- العالم: عالم الألعاب
- Supabase `world_id`: `5daed3bb-7e62-4a5a-93a1-f6dec60df810`
- ترتيب الدرس داخل العالم: `sort_order = 15`
- لا نستعمل `sort_order = 47`.

## المسارات الصحيحة

```text
/lesson-v2/lesson47
/lesson-v2/lesson47/exercises
```

الدرس القادم بعد 46 يجب أن يفتح:

```text
/lesson-v2/lesson47
```

وليس:

```text
/world2-lesson/47
```

## ملاحظات الربط

- صفحة الدرس الفعلية في عالم الألعاب تمر عبر `World2LessonPage.tsx`.
- لا يكفي ربط `Lesson47Page.tsx` وحده.
- يجب اختبار المسار المباشر أولًا، ثم زر «هيا نتدرب» من داخل العالم.

## الصور والصوت

```text
public/lessons/v2/lesson47-grid-navigation/
public/audio/teachers/taline/lesson_47_grid_navigation/
```

- ست صور: `s1.webp` إلى `s6.webp`.
- ستة ملفات صوت للدرس وستة ملفات WordBoundary.
- صوت التمارين داخل مجلد `exercises`.
- كلمة المشهد السادس الصحيحة: `قِرَاءَةَ`.

## التمارين

- 4 مهمات × 4 أسئلة = 16 سؤالًا.
- المحرك: `UnifiedExerciseScreenV2`.
- الإجابات: `UnifiedExerciseAnswersV2`.
- التغذية الراجعة والأصوات موحدة.
- الانتقال التلقائي بعد `760ms`.
- لا نضع سهمًا بجانب خيارات الاتجاه النصية لأنه يكشف الإجابة.
- شريط الخطوات: السهم فوق رقم الخطوة.
- صياغة السؤال يجب أن تطابق نوع الخيارات.

## الكاريوكي

- المصدر: WordBoundary بصيغة `text / offset / duration`.
- لا نعتمد على `timeupdate` وحده عند وجود تأخير ملحوظ.
- يمكن استعمال `requestAnimationFrame` مع تقديم خفيف يقارب `70ms`.
- بعد إعادة توليد MP3 وJSON يجب كسر كاش المتصفح.

## صفحة النهاية

تستعمل الصفحة الموحدة:

- كأس بحجم متناسق.
- الدرس التالي.
- إعادة التمارين.
- اختبار العالم.

## Termux

- التعديلات الصغيرة تُرسل كسكربت مباشر `cat <<'EOF'`.
- لا نستعمل `/tmp` للملفات المؤقتة؛ نضعها داخل جذر المشروع ثم نحذفها.
- قبل Git نشغّل:

```bash
bash scripts/lesson47/verify_lesson47.sh ~/madrasati-dz
```
